/**
 * Noakhali Kitchen — Production Sitemap Generator
 * Generates public/sitemap.xml containing all valid, public, canonical URLs.
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
const { COOKING_GUIDES } = require("../src/data/guides.ts");
const { FOOD_CULTURE_ARTICLES } = require("../src/data/foodCulture.ts");
const { CATEGORIES } = require("../src/data/categories.ts");
const { BLOG_POSTS } = require("../src/data/blog.ts");

const DOMAIN = "https://www.noakhalikitchen.com";

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

function generateSitemap() {
  const urlEntries = [];
  const seenUrls = new Set();

  function addUrl(pathname, lastmodDate, section) {
    const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
    const loc = cleanPath === "/" ? `${DOMAIN}/` : `${DOMAIN}${cleanPath}`;
    
    if (seenUrls.has(loc)) {
      console.warn(`[Sitemap] Skipping duplicate URL: ${loc}`);
      return;
    }
    seenUrls.add(loc);

    const formattedDate = formatDate(lastmodDate);
    urlEntries.push({
      loc,
      lastmod: formattedDate,
      section,
    });
  }

  // 1. Core Hubs & Editorial Landing Pages
  addUrl("/", null, "Core Hubs");
  addUrl("/recipes", null, "Core Hubs");
  addUrl("/guides", null, "Core Hubs");
  addUrl("/culture", null, "Core Hubs");
  addUrl("/pantry", null, "Core Hubs");
  addUrl("/tools", null, "Core Hubs");
  addUrl("/blog", null, "Core Hubs");

  // 2. Categories
  for (const cat of CATEGORIES) {
    addUrl(`/category/${cat.slug}`, null, "Categories");
  }

  // 3. Recipes (168)
  for (const recipe of RECIPES) {
    addUrl(`/recipes/${recipe.slug}`, recipe.updatedDate, "Recipes");
  }

  // 4. Cooking Guides (21)
  for (const guide of COOKING_GUIDES) {
    addUrl(`/guides/${guide.slug}`, guide.updatedDate, "Cooking Guides");
  }

  // 5. Food Culture Articles (9)
  for (const article of FOOD_CULTURE_ARTICLES) {
    addUrl(`/culture/${article.slug}`, article.updatedDate, "Food Culture");
  }

  // 6. Editorial Journal / Blog Posts (3)
  for (const post of BLOG_POSTS) {
    addUrl(`/blog/${post.slug}`, post.updatedDate, "Blog Posts");
  }

  // 7. Institutional & Legal Pages
  addUrl("/about", null, "Institutional");
  addUrl("/contact", null, "Institutional");
  addUrl("/privacy", null, "Institutional");
  addUrl("/terms", null, "Institutional");
  addUrl("/affiliate-disclosure", null, "Institutional");

  // Build XML structure
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  let currentSection = "";
  for (const item of urlEntries) {
    if (item.section !== currentSection) {
      currentSection = item.section;
      xml += `  <!-- ${currentSection} -->\n`;
    }
    xml += `  <url>\n`;
    xml += `    <loc>${item.loc}</loc>\n`;
    if (item.lastmod) {
      xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  // Output paths
  const publicDir = path.resolve(__dirname, "../public");
  const publicSitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(publicSitemapPath, xml, "utf8");
  console.log(`[Sitemap] Generated ${publicSitemapPath} (${urlEntries.length} URLs)`);

  const distDir = path.resolve(__dirname, "../dist");
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, "sitemap.xml");
    fs.writeFileSync(distSitemapPath, xml, "utf8");
    console.log(`[Sitemap] Updated ${distSitemapPath}`);
  }

  return {
    totalUrls: urlEntries.length,
    recipes: RECIPES.length,
    guides: COOKING_GUIDES.length,
    culture: FOOD_CULTURE_ARTICLES.length,
    categories: CATEGORIES.length,
    blog: BLOG_POSTS.length,
    hubsAndInstitutional: urlEntries.length - RECIPES.length - COOKING_GUIDES.length - FOOD_CULTURE_ARTICLES.length - CATEGORIES.length - BLOG_POSTS.length,
  };
}

if (require.main === module) {
  const stats = generateSitemap();
  console.log("[Sitemap Stats]:", stats);
}

module.exports = { generateSitemap };
