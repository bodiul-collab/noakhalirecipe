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

function renderWatchAndCookHtml(baseHtmlTemplate, recipes, options = {}) {
  const origin = options.origin || "https://www.noakhalikitchen.com";
  const canonicalUrl = `${origin}/watch-and-cook`;
  const pageTitle = "Watch & Cook — Authentic Video Recipes | Noakhali Kitchen";
  const pageDescription =
    "Watch step-by-step cooking tutorials and video guides from Noakhali Kitchen. Master rich curries, fragrant biryanis, and heritage home recipes.";

  const videoRecipes = recipes.filter(
    (r) => r.video && r.video.videoEnabled && r.video.youtubeVideoId
  );

  const featured =
    videoRecipes.find((r) => r.slug === "chicken-vindaloo") || videoRecipes[0];

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          name: "Noakhali Kitchen",
          url: `${origin}/`,
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: videoRecipes.length,
          itemListElement: videoRecipes.map((r, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${origin}/recipes/${r.slug}`,
            name: r.video.videoTitle || r.title,
          })),
        },
      },
    ],
  };

  const jsonLdScript = `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLdData, null, 2)}\n    </script>`;

  const semanticHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      <header class="py-4 border-b border-[#E6E1D8] bg-white">
        <div class="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <a href="${origin}/" class="text-xl font-bold font-serif-editorial text-[#242423]">Noakhali Kitchen</a>
          <nav class="flex items-center gap-4 text-xs font-semibold">
            <a href="${origin}/" class="text-[#77736D] hover:text-[#30302F]">Home</a>
            <a href="${origin}/recipes" class="text-[#77736D] hover:text-[#30302F]">Recipes</a>
            <a href="${canonicalUrl}" class="text-[#E97520] font-bold">Watch &amp; Cook</a>
            <a href="${origin}/category" class="text-[#77736D] hover:text-[#30302F]">Categories</a>
          </nav>
        </div>
      </header>

      <main class="max-w-[1200px] mx-auto px-4 py-10 space-y-12">
        <section class="text-center max-w-2xl mx-auto space-y-3">
          <span class="inline-block px-3 py-1 rounded-full bg-[#FFF4EA] border border-[#F8CD78]/60 text-[#E97520] text-xs font-bold uppercase tracking-wider">
            Official Video Kitchen
          </span>
          <h1 class="text-4xl sm:text-5xl font-bold font-serif-editorial text-[#242423]">Watch &amp; Cook</h1>
          <p class="text-lg font-medium text-[#E97520]">Watch it. Cook it. Love it.</p>
          <p class="text-sm text-[#615C55] leading-relaxed">
            Follow our step-by-step video tutorials to master regional spice blending, slow braising, and time-honored heritage recipes.
          </p>
        </section>

        ${
          featured
            ? `
        <section class="bg-white rounded-2xl border border-[#E6E1D8] p-6 md:p-8 shadow-sm space-y-6">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E97520] text-white">
            Featured Recipe Video
          </span>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="aspect-video w-full rounded-lg overflow-hidden bg-[#1E1B18] relative">
              <img src="${featured.video.videoThumbnail || `https://i.ytimg.com/vi/${featured.video.youtubeVideoId}/hqdefault.jpg`}" alt="${featured.title}" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <a href="${featured.video.youtubeUrl || `https://youtu.be/${featured.video.youtubeVideoId}`}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full bg-[#E97520] text-white text-xs font-bold shadow-lg">
                  &#9658; Watch on YouTube
                </a>
              </div>
            </div>
            <div class="space-y-3">
              <span class="text-xs font-bold text-[#E97520] uppercase">${featured.category} &bull; ${featured.cuisine}</span>
              <h2 class="text-2xl font-bold font-serif-editorial text-[#242423]">${featured.title}</h2>
              <p class="text-sm text-[#615C55]">${featured.description}</p>
              <div class="flex items-center gap-4 text-xs text-[#77736D] pt-2">
                <span>Prep: ${featured.prepTimeMinutes}m</span>
                <span>Cook: ${featured.cookTimeMinutes}m</span>
                <span>Yield: ${featured.servings} servings</span>
              </div>
              <div class="pt-2">
                <a href="${origin}/recipes/${featured.slug}" class="inline-block px-4 py-2.5 rounded-lg bg-[#30302F] text-white text-xs font-bold hover:bg-black">
                  View Full Written Recipe &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
        `
            : ""
        }

        <section class="space-y-6">
          <h2 class="text-xl font-bold font-serif-editorial text-[#242423]">Published Cooking Videos</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${videoRecipes
              .map(
                (r) => `
              <article class="bg-white rounded-xl border border-[#E6E1D8] p-4 space-y-3 shadow-2xs">
                <div class="aspect-video w-full rounded-lg overflow-hidden bg-[#1E1B18] relative">
                  <img src="${r.video.videoThumbnail || `https://i.ytimg.com/vi/${r.video.youtubeVideoId}/hqdefault.jpg`}" alt="${r.title}" class="w-full h-full object-cover" loading="lazy" />
                  <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <a href="${r.video.youtubeUrl || `https://youtu.be/${r.video.youtubeVideoId}`}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-[#E97520] text-white text-xs font-bold">
                      &#9658; Watch
                    </a>
                  </div>
                </div>
                <h3 class="text-base font-bold font-serif-editorial text-[#242423]">${r.title}</h3>
                <p class="text-xs text-[#615C55] line-clamp-2">${r.description}</p>
                <div class="pt-2 border-t border-[#F3F2EE] flex items-center justify-between text-xs">
                  <span class="text-[#77736D]">${r.totalTimeMinutes} mins total</span>
                  <a href="${origin}/recipes/${r.slug}" class="text-[#E97520] font-bold hover:underline">
                    Written Recipe &rarr;
                  </a>
                </div>
              </article>
            `
              )
              .join("")}
          </div>
        </section>

        <section class="p-8 rounded-2xl bg-[#2E2823] text-white space-y-3">
          <h2 class="text-xl font-bold font-serif-editorial">Family Recipe Stories</h2>
          <p class="text-xs sm:text-sm text-white/80">Every cherished recipe carries the warmth of home and handwritten memories. Explore our culinary heritage articles.</p>
          <a href="${origin}/culture" class="inline-block mt-2 px-4 py-2 rounded-lg bg-[#E97520] text-white text-xs font-bold">
            Explore Food Culture &rarr;
          </a>
        </section>
      </main>

      <footer class="mt-12 py-8 bg-[#242423] text-[#FAF9F6] text-center text-xs">
        <p>&copy; ${new Date().getFullYear()} Noakhali Kitchen. Authentic Halal Recipes &amp; Culinary Heritage.</p>
      </footer>
    </div>
  `;

  let html = baseHtmlTemplate;
  html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${pageDescription}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${pageTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${pageDescription}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:type" content="website" />`
  );

  const headAdditions = `
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDescription}" />
    <meta name="robots" content="index, follow" />${jsonLdScript}
  `;
  html = html.replace("</head>", `${headAdditions}\n  </head>`);
  html = html.replace(
    /<div\s+id="root">\s*<\/div>/i,
    `<div id="root">${semanticHtml}</div>`
  );

  return html;
}

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

  // 3. Prerender Watch & Cook Hub Page into dist/watch-and-cook/index.html
  const watchAndCookHtml = renderWatchAndCookHtml(baseHtmlTemplate, RECIPES, {
    origin: "https://www.noakhalikitchen.com",
  });
  const watchAndCookDir = path.join(DIST_DIR, "watch-and-cook");
  fs.mkdirSync(watchAndCookDir, { recursive: true });
  fs.writeFileSync(path.join(watchAndCookDir, "index.html"), watchAndCookHtml, "utf8");
  console.log(`[Prerender] Statically generated dist/watch-and-cook/index.html`);

  // 4. Create dist/200.html as native SPA fallback
  fs.copyFileSync(DIST_INDEX, path.join(DIST_DIR, "200.html"));
  console.log(`[Prerender] Created dist/200.html native SPA fallback`);

  console.log(`[Prerender] Successfully generated static accessible HTML for ${count} recipes and Watch & Cook!`);
  console.log(`[Prerender] Output folders populated: dist/recipes/ (x${count}), dist/recipe/ (x${count}), dist/watch-and-cook/`);
}

prerenderAllRecipes();
