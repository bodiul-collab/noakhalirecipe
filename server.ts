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

// Grounded AI Assistant Endpoint for Noakhali Kitchen
app.post("/api/assistant", async (req, res) => {
  try {
    const { query, mode = "general", location, conversationHistory = [] } = req.body;

    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "A valid search or question query is required." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback when API key is not yet set
      res.json({
        text: `Welcome to Noakhali Kitchen! You asked: "${query}".\n\nOur kitchen specializes in authentic Halal home cooking, regional culinary heritage, Halal ingredient verification, and culinary knowledge. To enable live web search grounding, please ensure your GEMINI_API_KEY is configured in your project settings. In the meantime, explore our curated recipe index, category hubs, and kitchen tools!`,
        groundingSources: [],
        mode: "local_fallback",
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

    let modelName = "gemini-2.5-flash";
    // Default to Google Search Grounding for current information and ingredient checks
    const toolsConfig = [{ googleSearch: {} }];

    const configPayload: any = {
      systemInstruction,
      tools: toolsConfig,
    };

    const response = await ai.models.generateContent({
      model: modelName,
      contents: query,
      config: configPayload,
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
    console.error("Error in /api/assistant:", error);
    res.status(500).json({
      error: "Unable to process request with AI assistant at this moment.",
      message: error?.message || "Internal server error",
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
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Noakhali Kitchen server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
