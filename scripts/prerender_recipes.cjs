/**
 * Noakhali Kitchen — Build-Time Static HTML Prerenderer
 * Generates static, crawlable, SEO-accurate HTML pages as flat .html files
 * (for HTTP 200 Pretty URLs on Cloudflare Pages without 308 trailing-slash redirects)
 * for all recipes, categories, guides, culture articles, blog posts, and hub pages.
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
const { CATEGORIES } = require("../src/data/categories.ts");
const { COOKING_GUIDES } = require("../src/data/guides.ts");
const { FOOD_CULTURE_ARTICLES } = require("../src/data/foodCulture.ts");
const { BLOG_POSTS } = require("../src/data/blog.ts");
const {
  renderRecipePage,
  resolveAssetUrl,
  escapeHtml,
} = require("./renderRecipeHtml.cjs");

const DIST_DIR = path.join(process.cwd(), "dist");
const DIST_INDEX = path.join(DIST_DIR, "index.html");
const DIST_ASSETS = path.join(DIST_DIR, "assets");
const ORIGIN = "https://www.noakhalikitchen.com";

function writeFlatHtml(relPathWithoutExt, html) {
  const cleanRel = relPathWithoutExt.replace(/^\/+/, "");
  const outPath = path.join(DIST_DIR, `${cleanRel}.html`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf8");
}

function renderSiteHeader(activePath = "/") {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/watch-and-cook", label: "Watch & Cook" },
    { href: "/category", label: "Categories" },
    { href: "/guides", label: "Guides" },
    { href: "/culture", label: "Food Culture" },
    { href: "/pantry", label: "Halal Pantry" },
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "About" },
  ];
  return `
      <header class="py-4 border-b border-[#E6E1D8] bg-white">
        <div class="max-w-[1200px] mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <a href="/" class="text-xl font-bold font-serif-editorial text-[#242423]">Noakhali Kitchen</a>
          <nav class="flex flex-wrap items-center gap-4 text-xs font-semibold">
            ${navItems
              .map(
                (item) =>
                  `<a href="${item.href}" class="${
                    activePath === item.href
                      ? "text-[#E97520] font-bold"
                      : "text-[#77736D] hover:text-[#30302F]"
                  }">${escapeHtml(item.label)}</a>`
              )
              .join("")}
          </nav>
        </div>
      </header>
  `;
}

function renderSiteFooter() {
  return `
      <footer class="mt-12 py-8 bg-[#242423] text-[#FAF9F6] text-xs">
        <div class="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; ${new Date().getFullYear()} Noakhali Kitchen. Authentic Halal Recipes &amp; Culinary Heritage.</p>
          <div class="flex flex-wrap items-center gap-4">
            <a href="/recipes" class="hover:underline">Recipes</a>
            <a href="/category" class="hover:underline">Categories</a>
            <a href="/guides" class="hover:underline">Guides</a>
            <a href="/culture" class="hover:underline">Food Culture</a>
            <a href="/about" class="hover:underline">About</a>
            <a href="/contact" class="hover:underline">Contact</a>
            <a href="/privacy" class="hover:underline">Privacy</a>
            <a href="/terms" class="hover:underline">Terms</a>
            <a href="/affiliate-disclosure" class="hover:underline">Affiliate Disclosure</a>
          </div>
        </div>
      </footer>
  `;
}

function assembleStandardPage(baseHtmlTemplate, opts) {
  const {
    title,
    description,
    canonicalUrl,
    ogType = "website",
    imageUrl,
    jsonLdData,
    bodyHtml,
  } = opts;

  let html = baseHtmlTemplate;
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(ogType)}" />`
  );

  const absImage = imageUrl ? resolveAssetUrl(imageUrl, DIST_ASSETS, ORIGIN) : `${ORIGIN}/icon.svg`;
  const jsonLdScript = jsonLdData
    ? `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLdData, null, 2).replace(/<\/script/gi, "<\\/script")}\n    </script>`
    : "";

  const headAdditions = `
    <meta property="og:image" content="${escapeHtml(absImage)}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(absImage)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />${jsonLdScript}
  `;

  html = html.replace("</head>", `${headAdditions}\n  </head>`);
  html = html.replace(
    /<div\s+id="root">\s*<\/div>/i,
    `<div id="root">${bodyHtml}</div>`
  );
  return html;
}

function renderWatchAndCookHtml(baseHtmlTemplate, recipes) {
  const canonicalUrl = `${ORIGIN}/watch-and-cook`;
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
          "@id": `${ORIGIN}/#website`,
          name: "Noakhali Kitchen",
          url: `${ORIGIN}/`,
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: videoRecipes.length,
          itemListElement: videoRecipes.map((r, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${ORIGIN}/recipes/${r.slug}`,
            name: r.video.videoTitle || r.title,
          })),
        },
      },
    ],
  };

  const semanticHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader("/watch-and-cook")}
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
              <img src="${escapeHtml(featured.video.videoThumbnail || `https://i.ytimg.com/vi/${featured.video.youtubeVideoId}/hqdefault.jpg`)}" alt="${escapeHtml(featured.title)}" class="w-full h-full object-cover" />
            </div>
            <div class="space-y-3">
              <span class="text-xs font-bold text-[#E97520] uppercase">${escapeHtml(featured.category)} &bull; ${escapeHtml(featured.cuisine)}</span>
              <h2 class="text-2xl font-bold font-serif-editorial text-[#242423]">${escapeHtml(featured.title)}</h2>
              <p class="text-sm text-[#615C55]">${escapeHtml(featured.description)}</p>
              <div class="pt-2">
                <a href="/recipes/${escapeHtml(featured.slug)}" class="inline-block px-4 py-2.5 rounded-lg bg-[#30302F] text-white text-xs font-bold hover:bg-black">
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
                <h3 class="text-base font-bold font-serif-editorial text-[#242423]">
                  <a href="/recipes/${escapeHtml(r.slug)}">${escapeHtml(r.title)}</a>
                </h3>
                <p class="text-xs text-[#615C55]">${escapeHtml(r.description)}</p>
                <div class="pt-2 border-t border-[#F3F2EE] flex items-center justify-between text-xs">
                  <span class="text-[#77736D]">${r.totalTimeMinutes} mins total</span>
                  <a href="/recipes/${escapeHtml(r.slug)}" class="text-[#E97520] font-bold hover:underline">
                    Written Recipe &rarr;
                  </a>
                </div>
              </article>
            `
              )
              .join("")}
          </div>
        </section>
      </main>
      ${renderSiteFooter()}
    </div>
  `;

  return assembleStandardPage(baseHtmlTemplate, {
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    ogType: "website",
    imageUrl: featured ? featured.heroImage : undefined,
    jsonLdData,
    bodyHtml: semanticHtml,
  });
}

function renderRecipesCatalogHtml(baseHtmlTemplate) {
  const canonicalUrl = `${ORIGIN}/recipes`;
  const title = "All Halal Recipes Catalog | Noakhali Kitchen";
  const description =
    "Explore over 170 authentic Halal recipes including traditional Bengali heritage curries, biryanis, seafood, festive pithas, drinks, and family meals.";

  const bodyHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader("/recipes")}
      <main class="max-w-[1200px] mx-auto px-4 py-10 space-y-8">
        <div class="space-y-2">
          <h1 class="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#242423]">All Halal Recipes (${RECIPES.length})</h1>
          <p class="text-sm text-[#615C55]">${escapeHtml(description)}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${CATEGORIES.map(
            (cat) =>
              `<a href="/category/${escapeHtml(cat.slug)}" class="px-3 py-1.5 rounded-full bg-white border border-[#E6E1D8] text-xs font-semibold text-[#30302F] hover:border-[#E97520]">${escapeHtml(cat.title)}</a>`
          ).join("")}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${RECIPES.map(
            (r) => `
            <article class="bg-white rounded-lg border border-[#E6E1D8] p-4 space-y-2">
              <span class="text-[11px] font-bold uppercase text-[#E97520]">${escapeHtml(r.category)}</span>
              <h2 class="text-base font-bold font-serif-editorial text-[#242423]">
                <a href="/recipes/${escapeHtml(r.slug)}">${escapeHtml(r.title)}</a>
              </h2>
              <p class="text-xs text-[#615C55]">${escapeHtml(r.description)}</p>
              <a href="/recipes/${escapeHtml(r.slug)}" class="inline-block text-xs font-bold text-[#E97520]">View Recipe &rarr;</a>
            </article>
          `
          ).join("")}
        </div>
      </main>
      ${renderSiteFooter()}
    </div>
  `;

  return assembleStandardPage(baseHtmlTemplate, {
    title,
    description,
    canonicalUrl,
    ogType: "website",
    bodyHtml,
  });
}

function renderCategoriesIndexHtml(baseHtmlTemplate) {
  const canonicalUrl = `${ORIGIN}/category`;
  const title = "Halal Recipe Categories & Culinary Hubs | Noakhali Kitchen";
  const description =
    "Browse Halal recipes categorized by protein and culinary style: chicken, beef, seafood, drinks, vegetarian dishes, and meal prep.";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Categories", item: canonicalUrl },
    ],
  };

  const bodyHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader("/category")}
      <main class="max-w-[1200px] mx-auto px-4 py-10 space-y-8">
        <h1 class="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#242423]">Halal Recipe Hubs</h1>
        <p class="text-sm text-[#615C55]">${escapeHtml(description)}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${CATEGORIES.map(
            (cat) => `
            <article class="bg-white rounded-lg border border-[#E6E1D8] p-5 space-y-2">
              <h2 class="text-lg font-bold font-serif-editorial text-[#242423]">
                <a href="/category/${escapeHtml(cat.slug)}">${escapeHtml(cat.title)}</a>
              </h2>
              <p class="text-xs text-[#615C55]">${escapeHtml(cat.shortDescription)}</p>
              <a href="/category/${escapeHtml(cat.slug)}" class="inline-block text-xs font-bold text-[#E97520]">Explore Category Hub &rarr;</a>
            </article>
          `
          ).join("")}
        </div>
      </main>
      ${renderSiteFooter()}
    </div>
  `;

  return assembleStandardPage(baseHtmlTemplate, {
    title,
    description,
    canonicalUrl,
    ogType: "website",
    jsonLdData,
    bodyHtml,
  });
}

function renderCategoryDetailHtml(baseHtmlTemplate, cat) {
  const canonicalUrl = `${ORIGIN}/category/${cat.slug}`;
  const title = `${cat.title} | Halal Recipe Collection | Noakhali Kitchen`;
  const description = cat.shortDescription || cat.fullDescription;
  const featuredOrder = cat.featuredRecipeSlugs || [];
  const categoryRecipes = RECIPES.filter(
    (r) => r.categorySlug === cat.slug || featuredOrder.includes(r.slug)
  ).sort((a, b) => {
    const ai = featuredOrder.indexOf(a.slug);
    const bi = featuredOrder.indexOf(b.slug);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${ORIGIN}/category` },
      { "@type": "ListItem", position: 3, name: cat.title, item: canonicalUrl },
    ],
  };

  const bodyHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader("/category")}
      <main class="max-w-[1200px] mx-auto px-4 py-10 space-y-8">
        <nav aria-label="Breadcrumb" class="text-xs text-[#77736D] space-x-1">
          <a href="/">Home</a> <span>/</span>
          <a href="/category">Categories</a> <span>/</span>
          <span>${escapeHtml(cat.title)}</span>
        </nav>
        <div class="bg-white rounded-xl border border-[#E6E1D8] p-6 space-y-3">
          <h1 class="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#242423]">${escapeHtml(cat.title)}</h1>
          <p class="text-sm text-[#615C55]">${escapeHtml(cat.fullDescription)}</p>
        </div>
        <h2 class="text-2xl font-bold font-serif-editorial text-[#242423]">${escapeHtml(cat.title)} Recipes (${categoryRecipes.length})</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${categoryRecipes
            .map(
              (r) => `
            <article class="bg-white rounded-lg border border-[#E6E1D8] p-4 space-y-2">
              <h3 class="text-base font-bold font-serif-editorial text-[#242423]">
                <a href="/recipes/${escapeHtml(r.slug)}">${escapeHtml(r.title)}</a>
              </h3>
              <p class="text-xs text-[#615C55]">${escapeHtml(r.description)}</p>
              <a href="/recipes/${escapeHtml(r.slug)}" class="inline-block text-xs font-bold text-[#E97520]">View Recipe &rarr;</a>
            </article>
          `
            )
            .join("")}
        </div>
      </main>
      ${renderSiteFooter()}
    </div>
  `;

  return assembleStandardPage(baseHtmlTemplate, {
    title,
    description,
    canonicalUrl,
    ogType: "website",
    imageUrl: cat.image,
    jsonLdData,
    bodyHtml,
  });
}

function renderCollectionHubHtml(baseHtmlTemplate, opts) {
  const { pathSlug, title, description, items, baseItemPath, navActive } = opts;
  const canonicalUrl = `${ORIGIN}/${pathSlug}`;
  const bodyHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader(navActive)}
      <main class="max-w-[1200px] mx-auto px-4 py-10 space-y-8">
        <h1 class="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#242423]">${escapeHtml(title)}</h1>
        <p class="text-sm text-[#615C55]">${escapeHtml(description)}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${items
            .map(
              (item) => `
            <article class="bg-white rounded-lg border border-[#E6E1D8] p-5 space-y-2">
              <span class="text-[11px] font-bold uppercase text-[#E97520]">${escapeHtml(item.category || "")}</span>
              <h2 class="text-base font-bold font-serif-editorial text-[#242423]">
                <a href="${baseItemPath}/${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a>
              </h2>
              <p class="text-xs text-[#615C55]">${escapeHtml(item.excerpt || "")}</p>
              <a href="${baseItemPath}/${escapeHtml(item.slug)}" class="inline-block text-xs font-bold text-[#E97520]">Read More &rarr;</a>
            </article>
          `
            )
            .join("")}
        </div>
      </main>
      ${renderSiteFooter()}
    </div>
  `;
  return assembleStandardPage(baseHtmlTemplate, {
    title: `${title} | Noakhali Kitchen`,
    description,
    canonicalUrl,
    ogType: "website",
    bodyHtml,
  });
}

function renderArticleDetailHtml(baseHtmlTemplate, item, sectionPath, sectionLabel) {
  const canonicalUrl = `${ORIGIN}/${sectionPath}/${item.slug}`;
  const pageTitle = item.seoTitle || `${item.title} | Noakhali Kitchen`;
  const pageDescription = item.seoDescription || item.excerpt;
  const bodyHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader(`/${sectionPath}`)}
      <main class="max-w-4xl mx-auto px-4 py-10">
        <article class="bg-white rounded-2xl border border-[#E6E1D8] p-6 sm:p-10 space-y-6">
          <nav aria-label="Breadcrumb" class="text-xs text-[#77736D] space-x-1">
            <a href="/">Home</a> <span>/</span>
            <a href="/${sectionPath}">${escapeHtml(sectionLabel)}</a> <span>/</span>
            <span>${escapeHtml(item.title)}</span>
          </nav>
          <h1 class="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#242423]">${escapeHtml(item.title)}</h1>
          <p class="text-sm text-[#615C55]">${escapeHtml(item.excerpt)}</p>
          <div class="prose max-w-none text-sm leading-relaxed text-[#3F3C38] whitespace-pre-line">${escapeHtml(item.content)}</div>
        </article>
      </main>
      ${renderSiteFooter()}
    </div>
  `;
  return assembleStandardPage(baseHtmlTemplate, {
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    ogType: "article",
    imageUrl: item.heroImage,
    bodyHtml,
  });
}

function renderStaticHubHtml(baseHtmlTemplate, slug, title, description) {
  const canonicalUrl = `${ORIGIN}/${slug}`;
  const bodyHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader(`/${slug}`)}
      <main class="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div class="bg-white rounded-2xl border border-[#E6E1D8] p-6 sm:p-10 space-y-4">
          <h1 class="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#242423]">${escapeHtml(title)}</h1>
          <p class="text-sm text-[#615C55] leading-relaxed">${escapeHtml(description)}</p>
          <div class="pt-4 flex flex-wrap gap-3 text-xs font-bold">
            <a href="/recipes" class="px-4 py-2 rounded-lg bg-[#E97520] text-white">Explore All Halal Recipes</a>
            <a href="/category" class="px-4 py-2 rounded-lg bg-[#30302F] text-white">Browse Categories</a>
            <a href="/guides" class="px-4 py-2 rounded-lg border border-[#E6E1D8] text-[#30302F]">Cooking Guides</a>
          </div>
        </div>
      </main>
      ${renderSiteFooter()}
    </div>
  `;
  return assembleStandardPage(baseHtmlTemplate, {
    title: `${title} | Noakhali Kitchen`,
    description,
    canonicalUrl,
    ogType: "website",
    bodyHtml,
  });
}

function prerenderAllPages() {
  if (!fs.existsSync(DIST_INDEX)) {
    console.error("[Prerender] Error: dist/index.html not found! Run vite build first.");
    process.exit(1);
  }

  const baseHtmlTemplate = fs.readFileSync(DIST_INDEX, "utf8");
  console.log(`[Prerender] Starting static HTML generation for ${RECIPES.length} recipes & all hub routes...`);

  // Clean up legacy nested recipe folders if any remain from older builds
  for (const dirName of ["recipes", "recipe", "watch-and-cook"]) {
    const target = path.join(DIST_DIR, dirName);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
    }
  }

  // Create dist/200.html as native SPA fallback before modifying dist/index.html
  fs.writeFileSync(path.join(DIST_DIR, "200.html"), baseHtmlTemplate, "utf8");

  // 1. Prerender all Recipes as flat .html files (HTTP 200 on Cloudflare Pretty URLs without 308 redirect)
  let count = 0;
  for (const recipe of RECIPES) {
    const renderedHtml = renderRecipePage(recipe, baseHtmlTemplate, {
      origin: ORIGIN,
      distAssetsDir: DIST_ASSETS,
    });

    writeFlatHtml(`recipes/${recipe.slug}`, renderedHtml);
    writeFlatHtml(`recipe/${recipe.slug}`, renderedHtml);
    count++;
  }

  // 2. Prerender /recipes catalog
  writeFlatHtml("recipes", renderRecipesCatalogHtml(baseHtmlTemplate));

  // 3. Prerender /watch-and-cook
  writeFlatHtml("watch-and-cook", renderWatchAndCookHtml(baseHtmlTemplate, RECIPES));

  // 4. Prerender /category & /category/:slug
  writeFlatHtml("category", renderCategoriesIndexHtml(baseHtmlTemplate));
  for (const cat of CATEGORIES) {
    writeFlatHtml(`category/${cat.slug}`, renderCategoryDetailHtml(baseHtmlTemplate, cat));
  }

  // 5. Prerender /guides & /guides/:slug
  writeFlatHtml(
    "guides",
    renderCollectionHubHtml(baseHtmlTemplate, {
      pathSlug: "guides",
      title: "Culinary Guides & Cooking Techniques",
      description:
        "Master traditional South Asian and Bengali culinary science: tempering spices, mustard oil smoke points, parboiled basmati, and Halal kitchen methods.",
      items: COOKING_GUIDES,
      baseItemPath: "/guides",
      navActive: "/guides",
    })
  );
  for (const guide of COOKING_GUIDES) {
    writeFlatHtml(`guides/${guide.slug}`, renderArticleDetailHtml(baseHtmlTemplate, guide, "guides", "Cooking Guides"));
  }

  // 6. Prerender /culture & /culture/:slug
  writeFlatHtml(
    "culture",
    renderCollectionHubHtml(baseHtmlTemplate, {
      pathSlug: "culture",
      title: "Food Culture & Culinary Heritage",
      description:
        "Explore festive Bengali foodways, regional river-delta culinary anthropology, and ethical Halal hospitality traditions.",
      items: FOOD_CULTURE_ARTICLES,
      baseItemPath: "/culture",
      navActive: "/culture",
    })
  );
  for (const article of FOOD_CULTURE_ARTICLES) {
    writeFlatHtml(`culture/${article.slug}`, renderArticleDetailHtml(baseHtmlTemplate, article, "culture", "Food Culture"));
  }

  // 7. Prerender /blog & /blog/:slug
  writeFlatHtml(
    "blog",
    renderCollectionHubHtml(baseHtmlTemplate, {
      pathSlug: "blog",
      title: "Noakhali Kitchen Editorial Journal",
      description: "Stories, pantry guides, and seasonal Halal kitchen notes from our culinary editorial team.",
      items: BLOG_POSTS,
      baseItemPath: "/blog",
      navActive: "/blog",
    })
  );
  for (const post of BLOG_POSTS) {
    writeFlatHtml(`blog/${post.slug}`, renderArticleDetailHtml(baseHtmlTemplate, post, "blog", "Editorial Journal"));
  }

  // 8. Prerender static hub & institutional pages
  const staticHubs = [
    ["pantry", "Halal Pantry & Ingredient Verification", "Trusted Halal pantry staples, ingredient verification standards, and regional spice essentials."],
    ["tools", "Kitchen Tools & Equipment Hub", "Practical cookware guides, temperature tools, and kitchen essentials for authentic home cooking."],
    ["about", "About Noakhali Kitchen", "Our mission to preserve 100% Halal-verified Bengali and South Asian culinary heritage."],
    ["contact", "Contact Noakhali Kitchen", "Get in touch with our culinary team for recipe feedback, questions, and collaborations."],
    ["privacy", "Privacy Policy", "Privacy practices and data protection policy for Noakhali Kitchen visitors."],
    ["terms", "Terms of Service", "Terms and conditions for using Noakhali Kitchen recipes, guides, and culinary tools."],
    ["affiliate-disclosure", "Affiliate Disclosure", "Transparency regarding Amazon Associate links and recommended kitchen equipment."],
  ];
  for (const [slug, hubTitle, hubDesc] of staticHubs) {
    writeFlatHtml(slug, renderStaticHubHtml(baseHtmlTemplate, slug, hubTitle, hubDesc));
  }

  // 9. Populate dist/index.html <div id="root"> with crawlable homepage links for root crawlers
  const featured = RECIPES.filter((r) => r.isFeatured || r.isTrending).slice(0, 12);
  const homeSemanticHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      ${renderSiteHeader("/")}
      <main class="max-w-[1200px] mx-auto px-4 py-10 space-y-10">
        <section class="space-y-3">
          <h1 class="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#242423]">Noakhali Kitchen — Authentic Halal Recipes &amp; Food Culture</h1>
          <p class="text-sm text-[#615C55]">Authentic Halal recipes, regional culinary heritage, food guides, cooking techniques, practical kitchen tools, and ingredient verification.</p>
        </section>
        <section class="space-y-4">
          <h2 class="text-xl font-bold font-serif-editorial text-[#242423]">Featured Halal Recipes</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${featured
              .map(
                (r) => `
              <article class="bg-white rounded-lg border border-[#E6E1D8] p-4 space-y-1.5">
                <h3 class="text-sm font-bold text-[#242423]"><a href="/recipes/${escapeHtml(r.slug)}">${escapeHtml(r.title)}</a></h3>
                <p class="text-xs text-[#615C55]">${escapeHtml(r.description)}</p>
              </article>
            `
              )
              .join("")}
          </div>
          <p><a href="/recipes" class="text-xs font-bold text-[#E97520]">Explore All ${RECIPES.length} Halal Recipes &rarr;</a></p>
        </section>
        <section class="space-y-4">
          <h2 class="text-xl font-bold font-serif-editorial text-[#242423]">Recipe Categories</h2>
          <div class="flex flex-wrap gap-3">
            ${CATEGORIES.map(
              (c) =>
                `<a href="/category/${escapeHtml(c.slug)}" class="px-3 py-1.5 rounded bg-white border border-[#E6E1D8] text-xs font-semibold">${escapeHtml(c.title)}</a>`
            ).join("")}
          </div>
        </section>
      </main>
      ${renderSiteFooter()}
    </div>
  `;
  const updatedIndex = baseHtmlTemplate.replace(
    /<div\s+id="root">\s*<\/div>/i,
    `<div id="root">${homeSemanticHtml}</div>`
  );
  fs.writeFileSync(DIST_INDEX, updatedIndex, "utf8");

  console.log(
    `[Prerender] Done: ${count} recipes (flat .html), ${CATEGORIES.length} categories, ${COOKING_GUIDES.length} guides, ${FOOD_CULTURE_ARTICLES.length} culture articles, ${BLOG_POSTS.length} blog posts, plus core hubs.`
  );
}

prerenderAllPages();
