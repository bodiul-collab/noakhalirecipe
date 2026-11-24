import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { exec } from "child_process";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for API routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Legacy /directory permanent redirect (SEO migration)
app.get(["/directory", "/directory/*"], (_req, res) => {
  res.redirect(301, "/recipes");
});

// Legacy duplicate Radhuni guide permanent 301 redirect (SEO canonical consolidation)
app.get(
  [
    "/culture/bengali-radhuni-spice-guide",
    "/culture/bengali-radhuni-spice-guide/",
    "/food-culture/bengali-radhuni-spice-guide",
    "/food-culture/bengali-radhuni-spice-guide/",
  ],
  (_req, res) => {
    res.redirect(301, "/guides/bengali-radhuni-guide");
  }
);

// Legacy Biye Barir Chicken Roast guide permanent 301 redirect to canonical guide
app.get(
  [
    "/guides/biye-barir-shahi-chicken-roast-guide",
    "/guides/biye-barir-shahi-chicken-roast-guide/",
    "/guides/biye-barir-shahi-chicken-roast",
    "/guides/biye-barir-shahi-chicken-roast/",
  ],
  (_req, res) => {
    res.redirect(301, "/guides/bengali-shahi-chicken-roast-guide");
  }
);

// Tehari vs Biryani guide alias 301 redirect
app.get(
  [
    "/guides/old-dhaka-beef-tehari-vs-biryani-guide",
    "/guides/old-dhaka-beef-tehari-vs-biryani-guide/",
  ],
  (_req, res) => {
    res.redirect(301, "/guides/old-dhaka-beef-tehari-vs-biryani");
  }
);

// Legacy Essential Bengali Spices guide alias 301 redirect to foundation guide
app.get(
  [
    "/guides/essential-bengali-spices-guide",
    "/guides/essential-bengali-spices-guide/",
  ],
  (_req, res) => {
    res.redirect(301, "/guides/how-to-build-a-bangladeshi-spice-base");
  }
);

// Prerendered Recipe Route Handler for AI readers, crawlers, and search engines
app.get(["/recipe/:slug", "/recipes/:slug"], (req, res, next) => {
  const { slug } = req.params;
  const flatRecipeHtml = path.join(process.cwd(), "dist", "recipes", `${slug}.html`);
  const nestedRecipeHtml = path.join(process.cwd(), "dist", "recipes", slug, "index.html");
  if (fs.existsSync(flatRecipeHtml)) {
    return res.sendFile(flatRecipeHtml);
  }
  if (fs.existsSync(nestedRecipeHtml)) {
    return res.sendFile(nestedRecipeHtml);
  }
  next();
});

// Prerendered Watch & Cook Discovery Hub Handler
app.get("/watch-and-cook", (_req, res, next) => {
  const flatWatchHtml = path.join(process.cwd(), "dist", "watch-and-cook.html");
  const nestedWatchHtml = path.join(process.cwd(), "dist", "watch-and-cook", "index.html");
  if (fs.existsSync(flatWatchHtml)) {
    return res.sendFile(flatWatchHtml);
  }
  if (fs.existsSync(nestedWatchHtml)) {
    return res.sendFile(nestedWatchHtml);
  }
  next();
});

// Initialize Gemini Client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

interface GeminiErrorDetails {
  httpStatus: number;
  errorCode: string;
  userMessage: string;
  rawMessage: string;
}

function parseGeminiError(error: any): GeminiErrorDetails {
  const rawMessage = typeof error?.message === "string" ? error.message : String(error || "Unknown error");
  let code = typeof error?.status === "number" ? error.status : 500;
  let errorCode = typeof error?.code === "string" ? error.code : "INTERNAL_ERROR";
  let upstreamMessage = rawMessage;

  // @google/genai often wraps the JSON error body inside error.message
  const jsonStart = rawMessage.indexOf("{");
  if (jsonStart !== -1) {
    try {
      const parsed = JSON.parse(rawMessage.slice(jsonStart));
      if (parsed?.error) {
        if (typeof parsed.error.code === "number") code = parsed.error.code;
        if (typeof parsed.error.status === "string") errorCode = parsed.error.status;
        if (typeof parsed.error.message === "string") upstreamMessage = parsed.error.message;
      }
    } catch {
      // keep rawMessage if JSON parse fails
    }
  }

  if (code === 402 || errorCode === "RESOURCE_EXHAUSTED" || code === 429) {
    const isCreditsDepleted =
      code === 402 || upstreamMessage.toLowerCase().includes("prepayment credits");
    return {
      httpStatus: code === 402 ? 402 : 429,
      errorCode: "RESOURCE_EXHAUSTED",
      userMessage: isCreditsDepleted
        ? "Gemini API prepayment credits are depleted. Please check your project billing in AI Studio or update your API key in Settings > Secrets."
        : "The AI assistant has reached its current rate limit or quota. Please wait a moment and try again, or verify your billing-enabled API key in Settings > Secrets.",
      rawMessage: upstreamMessage,
    };
  }

  if (
    code === 403 ||
    errorCode === "PERMISSION_DENIED" ||
    (code === 400 && upstreamMessage.toLowerCase().includes("api key")) ||
    errorCode === "API_KEY_INVALID"
  ) {
    return {
      httpStatus: code === 403 ? 403 : 400,
      errorCode: code === 403 ? "PERMISSION_DENIED" : "API_KEY_INVALID",
      userMessage:
        "The Gemini API key appears invalid or lacks permission. Please verify or select a valid API key in Settings > Secrets.",
      rawMessage: upstreamMessage,
    };
  }

  if (code === 404 || errorCode === "NOT_FOUND") {
    return {
      httpStatus: 404,
      errorCode: "NOT_FOUND",
      userMessage: "The configured Gemini model could not be found. Please try again shortly.",
      rawMessage: upstreamMessage,
    };
  }

  const httpStatus = code >= 400 && code < 600 ? code : 500;
  return {
    httpStatus,
    errorCode,
    userMessage: "Unable to process request with the AI culinary assistant right now. Please try again.",
    rawMessage: upstreamMessage,
  };
}

async function callGenerateContentWithRetry(
  ai: GoogleGenAI,
  params: Parameters<GoogleGenAI["models"]["generateContent"]>[0],
  maxAttempts = 2
) {
  let lastError: any;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (err: any) {
      lastError = err;
      const parsed = parseGeminiError(err);
      const isRetryable =
        parsed.httpStatus >= 500 ||
        parsed.errorCode === "UNAVAILABLE" ||
        parsed.errorCode === "DEADLINE_EXCEEDED";
      if (!isRetryable || attempt === maxAttempts) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
    }
  }
  throw lastError;
}

// Grounded AI Assistant Endpoint for Noakhali Kitchen
app.post("/api/assistant", async (req, res) => {
  try {
    const { query, mode = "general", conversationHistory = [] } = req.body || {};

    if (!query || typeof query !== "string" || !query.trim()) {
      res.status(400).json({
        error: "A valid search or question query is required.",
        errorCode: "INVALID_QUERY",
      });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: "Gemini API key is not configured.",
        errorCode: "API_KEY_MISSING",
        message:
          "Please configure GEMINI_API_KEY in Settings > Secrets to enable the AI Culinary Assistant.",
      });
      return;
    }

    const systemInstruction = `You are the official culinary assistant for Noakhali Kitchen (https://www.noakhalikitchen.com).
Your mission:
- Provide trusted, comforting, authentic Halal recipes, cooking guidance, regional food culture (Bengali, South Asian, Middle Eastern, and global Halal cuisine).
- Strictly adhere to Halal food principles: NEVER suggest pork, bacon, ham, lard, alcohol, or non-halal items.
- Halal Ingredient Verification: When an ingredient has animal derivatives (gelatin, enzymes, emulsifiers, vanilla extract with alcohol, rennet), clearly explain the verification considerations (checking packaging for certified symbols, contacting manufacturers). Never make unsupported Halal certification claims.
- Culinary & Cooking Guidance: When the user asks about Halal food preparation, cooking techniques, recipes, spice substitutions, meal planning, or pantry stocking, provide actionable, authentic, and step-by-step guidance.
- Tone: Welcoming, warm, culturally respectful, practical, objective, and culinary-forward.`;

    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(conversationHistory)) {
      const recentHistory = conversationHistory.slice(-10);
      for (const turn of recentHistory) {
        if (
          turn &&
          typeof turn.content === "string" &&
          turn.content.trim() &&
          (turn.role === "user" || turn.role === "assistant")
        ) {
          contents.push({
            role: turn.role === "assistant" ? "model" : "user",
            parts: [{ text: turn.content.trim() }],
          });
        }
      }
    }
    // Ensure the conversation starts with a user message when history begins with assistant greeting
    while (contents.length > 0 && contents[0].role !== "user") {
      contents.shift();
    }
    contents.push({
      role: "user",
      parts: [{ text: query.trim() }],
    });

    const response = await callGenerateContentWithRetry(ai, {
      model: "gemini-3.5-flash-lite",
      contents,
      config: {
        systemInstruction,
      },
    });

    const text = response.text || "No response generated.";

    // Extract web search grounding chunks
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources: Array<{ title: string; url: string; type: "web" }> = [];

    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks as any[]) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "Web Reference",
            url: chunk.web.uri,
            type: "web",
          });
        }
      }
    }

    res.json({
      text,
      groundingSources: sources,
      searchQueries: groundingMetadata?.webSearchQueries || [],
      mode,
    });
  } catch (error: any) {
    const parsed = parseGeminiError(error);
    console.error("Error in /api/assistant:", parsed.httpStatus, parsed.errorCode, parsed.rawMessage);
    res.status(parsed.httpStatus).json({
      error: parsed.userMessage,
      errorCode: parsed.errorCode,
      message: parsed.rawMessage,
    });
  }
});

// Contact and Feedback Form Submission Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }
  console.log(`[Contact & Feedback Submission] From: ${name} <${email}> | Subject: ${subject} | Length: ${message.length} chars`);
  res.json({
    success: true,
    message: `Thank you for contacting Noakhali Kitchen, ${name}! Your feedback has been received. Our editorial team will review your message and respond to ${email} within 24–48 hours.`,
  });
});

// Ads.txt route
app.get("/ads.txt", (_req, res) => {
  res.type("text/plain");
  res.send(`# Noakhali Kitchen ads.txt configuration
# Publisher IDs should be placed below once approved by Google AdSense.
# Example: google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
# Contact: support@noakhalikitchen.com
`);
});

// Robots.txt route
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.noakhalikitchen.com/sitemap.xml
`);
});

// Sitemap.xml route - serves the authoritative sitemap generated from datasets
app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml");
  const sitemapDist = path.join(process.cwd(), "dist", "sitemap.xml");
  const sitemapPublic = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemapPath = fs.existsSync(sitemapDist) ? sitemapDist : sitemapPublic;

  if (fs.existsSync(sitemapPath)) {
    res.sendFile(sitemapPath);
  } else {
    res.status(404).send("Sitemap not found");
  }
});

// Export and Download Project ZIP endpoint
app.get("/api/download-zip", (_req, res) => {
  exec("python3 scripts/export_zip.py", (err) => {
    if (err) {
      console.error("ZIP creation error:", err);
      res.status(500).json({ error: "Failed to create project ZIP" });
      return;
    }
    const zipPath = "/tmp/noakhali-kitchen-source.zip";
    res.download(zipPath, "noakhali-kitchen-app.zip", (downloadErr) => {
      if (downloadErr) {
        console.error("ZIP download error:", downloadErr);
      }
    });
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      "/assets",
      express.static(path.join(distPath, "assets"), {
        maxAge: "7d",
      })
    );
    app.use(express.static(distPath, { extensions: ["html"], maxAge: "1h" }));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Noakhali Kitchen server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
