/**
 * Noakhali Kitchen — Build-Time Recipe Prerenderer
 * Generates static, accessible, AI-readable HTML pages for all recipes
 * into dist/recipes/:slug/index.html and dist/recipe/:slug/index.html.
 */

const fs = require("fs");
const path = require("path");

// Mock image asset imports when loaded in Node environment
require.extensions[".jpg"] = (m, f) => { m.exports = f; };
require.extensions[".png"] = (m, f) => { m.exports = f; };
require.extensions[".webp"] = (m, f) => { m.exports = f; };
require.extensions[".svg"] = (m, f) => { m.exports = f; };

require("tsx/cjs");

const { RECIPES } = require("../src/data/recipes.ts");
const { renderRecipePage } = require("./renderRecipeHtml.cjs");

const DIST_DIR = path.join(process.cwd(), "dist");
const DIST_INDEX = path.join(DIST_DIR, "index.html");
const DIST_ASSETS = path.join(DIST_DIR, "assets");

function prerenderAllRecipes() {
  if (!fs.existsSync(DIST_INDEX)) {
    console.error("[Prerender] Error: dist/index.html not found! Run vite build first.");
    process.exit(1);
  }

  const baseHtmlTemplate = fs.readFileSync(DIST_INDEX, "utf8");
  console.log(`[Prerender] Starting static HTML generation for ${RECIPES.length} recipes...`);

  let count = 0;
  for (const recipe of RECIPES) {
    const renderedHtml = renderRecipePage(recipe, baseHtmlTemplate, {
      origin: "https://www.noakhalikitchen.com",
      distAssetsDir: DIST_ASSETS,
    });

    // 1. Write to dist/recipes/:slug/index.html (Canonical path)
    const recipesOutDir = path.join(DIST_DIR, "recipes", recipe.slug);
    fs.mkdirSync(recipesOutDir, { recursive: true });
    fs.writeFileSync(path.join(recipesOutDir, "index.html"), renderedHtml, "utf8");

    // 2. Write to dist/recipe/:slug/index.html (Singular alias path)
    const singularOutDir = path.join(DIST_DIR, "recipe", recipe.slug);
    fs.mkdirSync(singularOutDir, { recursive: true });
    fs.writeFileSync(path.join(singularOutDir, "index.html"), renderedHtml, "utf8");

    count++;
  }

  // 3. Create dist/200.html as native SPA fallback
  fs.copyFileSync(DIST_INDEX, path.join(DIST_DIR, "200.html"));
  console.log(`[Prerender] Created dist/200.html native SPA fallback`);

  console.log(`[Prerender] Successfully generated static accessible HTML for ${count} recipes!`);
  console.log(`[Prerender] Output folders populated: dist/recipes/ (x${count}) and dist/recipe/ (x${count})`);
}

prerenderAllRecipes();
