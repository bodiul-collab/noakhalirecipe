import express from "express";
import path from "path";
import dotenv from "dotenv";
import { exec } from "child_process";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

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
        text: `Welcome to Noakhali Kitchen! You asked: "${query}".\n\nOur kitchen specializes in authentic Halal home cooking, regional culinary heritage, Halal ingredient verification, and community discovery. To enable live web and Google Maps grounding, please ensure your GEMINI_API_KEY is configured in your project settings. In the meantime, explore our curated recipe index, category hubs, and kitchen tools below!`,
        groundingSources: [],
        mode: "local_fallback",
      });
      return;
    }

    const systemInstruction = `You are the official culinary & community assistant for Noakhali Kitchen (https://noakhalikitchen.com).
Your mission:
- Provide trusted, comforting, authentic Halal recipes, cooking guidance, regional food culture (Bengali, South Asian, Middle Eastern, and global Halal cuisine).
- Strictly adhere to Halal food principles: NEVER suggest pork, bacon, ham, lard, alcohol, or non-halal items.
- Halal Ingredient Verification: When an ingredient has animal derivatives (gelatin, enzymes, emulsifiers, vanilla extract with alcohol, rennet), clearly explain the verification considerations (checking packaging for certified symbols, contacting manufacturers). Never make unsupported Halal certification claims.
- Local Directory & Mosques: When the user inquires about Halal restaurants, butchers, groceries, mosques, or Islamic centers, provide authentic, respectful details. Always prioritize proximity if location is provided. For mosques, mention Jummah and women's prayer spaces only if verified; otherwise say "Information not confirmed."
- Tone: Welcoming, warm, culturally respectful, practical, community-oriented, objective, and culinary-forward.`;

    let modelName = "gemini-3.8-flash";
    let toolsConfig: any[] = [];
    let toolConfigOptions: any = undefined;

    if (mode === "maps" || query.toLowerCase().includes("near me") || query.toLowerCase().includes("mosque") || query.toLowerCase().includes("restaurant") || query.toLowerCase().includes("butcher") || query.toLowerCase().includes("halal grocery")) {
      toolsConfig = [{ googleMaps: {} }];
      if (location && typeof location.latitude === "number" && typeof location.longitude === "number") {
        toolConfigOptions = {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        };
      }
    } else {
      // Default to Google Search Grounding for current information and ingredient checks
      toolsConfig = [{ googleSearch: {} }];
    }

    const configPayload: any = {
      systemInstruction,
    };

    if (toolsConfig.length > 0) {
      configPayload.tools = toolsConfig;
    }
    if (toolConfigOptions) {
      configPayload.toolConfig = toolConfigOptions;
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: query,
      config: configPayload,
    });

    const text = response.text || "No response generated.";
    
    // Extract search and maps grounding chunks
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources: Array<{ title: string; url: string; type: "web" | "maps" }> = [];

    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks as any[]) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "Web Reference",
            url: chunk.web.uri,
            type: "web",
          });
        }
        if (chunk.maps?.uri) {
          sources.push({
            title: chunk.maps.title || "Google Maps Location",
            url: chunk.maps.uri,
            type: "maps",
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

Sitemap: https://noakhalikitchen.com/sitemap.xml
`);
});

// Sitemap.xml route
app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://noakhalikitchen.com/</loc><priority>1.0</priority></url>
  <url><loc>https://noakhalikitchen.com/recipes</loc><priority>0.9</priority></url>
  <url><loc>https://noakhalikitchen.com/recipes/halal-chicken-biryani</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/recipes/bengali-beef-bhuna</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/recipes/chingri-malai-curry</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/recipes/shahi-chicken-roast</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/recipes/vegetable-bhuna-khichuri</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/category/halal-chicken</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/category/halal-beef</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/category/halal-seafood</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/category/halal-vegetarian</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/category/halal-rice-curry</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/directory</loc><priority>0.9</priority></url>
  <url><loc>https://noakhalikitchen.com/directory/restaurants</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/directory/butchers</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/directory/groceries</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/directory/mosques</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/blog</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/tools</loc><priority>0.8</priority></url>
  <url><loc>https://noakhalikitchen.com/about</loc><priority>0.7</priority></url>
  <url><loc>https://noakhalikitchen.com/contact</loc><priority>0.7</priority></url>
  <url><loc>https://noakhalikitchen.com/privacy</loc><priority>0.5</priority></url>
  <url><loc>https://noakhalikitchen.com/terms</loc><priority>0.5</priority></url>
  <url><loc>https://noakhalikitchen.com/affiliate-disclosure</loc><priority>0.5</priority></url>
</urlset>`;
  res.send(sitemap);
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
