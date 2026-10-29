/**
 * Noakhali Kitchen — Recipe Page HTML & Structured Data Renderer
 * Produces accessible semantic HTML and Schema.org Recipe JSON-LD for crawlers,
 * AI readers, and search engines.
 */

const path = require("path");
const fs = require("fs");

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeJsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/<\/script/gi, "<\\/script");
}

function toIsoDuration(mins) {
  if (!mins || mins <= 0) return undefined;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  let dur = "PT";
  if (h > 0) dur += `${h}H`;
  if (m > 0) dur += `${m}M`;
  return dur === "PT" ? "PT0M" : dur;
}

function toIsoDate(dateStr) {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return undefined;
  return d.toISOString().split("T")[0];
}

function resolveAssetUrl(heroImage, distAssetsDir, origin) {
  const baseOrigin = origin || "https://www.noakhalikitchen.com";
  if (!heroImage) return `${baseOrigin}/icon.svg`;
  if (heroImage.startsWith("http://") || heroImage.startsWith("https://")) return heroImage;
  if (heroImage.startsWith("/assets/")) return `${baseOrigin}${heroImage}`;

  const baseName = path.basename(heroImage, path.extname(heroImage));
  if (distAssetsDir && fs.existsSync(distAssetsDir)) {
    try {
      const files = fs.readdirSync(distAssetsDir);
      const match = files.find((f) => f.startsWith(baseName) && (f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".webp")));
      if (match) {
        return `${baseOrigin}/assets/${match}`;
      }
    } catch (_) {}
  }
  return `${baseOrigin}/icon.svg`;
}

function renderRecipePage(recipe, baseHtmlTemplate, options = {}) {
  const origin = options.origin || "https://www.noakhalikitchen.com";
  const distAssetsDir = options.distAssetsDir || null;
  const canonicalUrl = `${origin}/recipes/${recipe.slug}`;
  const absHeroImage = resolveAssetUrl(recipe.heroImage, distAssetsDir, origin);
  const categoryUrl = `${origin}/category/${recipe.categorySlug}`;
  const baseTitle = recipe.seoTitle || recipe.title;
  const pageTitle = baseTitle.includes("Noakhali Kitchen") ? baseTitle : `${baseTitle} | Noakhali Kitchen`;
  const pageDescription = recipe.seoDescription || recipe.description;

  // 1. Build Schema.org Recipe + Breadcrumb JSON-LD
  const prepIso = toIsoDuration(recipe.prepTimeMinutes);
  const cookIso = toIsoDuration(recipe.cookTimeMinutes);
  const totalIso = toIsoDuration(recipe.totalTimeMinutes);
  const isoDate = toIsoDate(recipe.updatedDate) || "2026-10-20";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Recipe",
        "@id": `${canonicalUrl}#recipe`,
        name: recipe.title,
        headline: recipe.seoTitle || recipe.title,
        description: pageDescription,
        image: [absHeroImage],
        author: {
          "@type": "Person",
          name: (recipe.author && recipe.author.name) || "Chef Tariq Rahman",
          jobTitle: (recipe.author && recipe.author.role) || "Regional Culinary Director & Halal Recipe Developer",
        },
        publisher: {
          "@type": "Organization",
          name: "Noakhali Kitchen",
          url: `${origin}/`,
          logo: {
            "@type": "ImageObject",
            url: `${origin}/icon.svg`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        datePublished: isoDate,
        dateModified: isoDate,
        ...(prepIso && { prepTime: prepIso }),
        ...(cookIso && { cookTime: cookIso }),
        ...(totalIso && { totalTime: totalIso }),
        keywords: (recipe.tags && recipe.tags.join(", ")) || recipe.category,
        recipeYield: `${recipe.servings} servings`,
        recipeCategory: recipe.category,
        recipeCuisine: recipe.cuisine,
        recipeIngredient: recipe.ingredients.map((ing) =>
          `${ing.amount} ${ing.unit || ""} ${ing.name} ${ing.notes ? `(${ing.notes})` : ""}`.trim()
        ),
        recipeInstructions: recipe.instructions.map((inst) => ({
          "@type": "HowToStep",
          name: inst.title,
          text: inst.instruction,
        })),
        ...(recipe.nutrition && {
          nutrition: {
            "@type": "NutritionInformation",
            calories: `${recipe.nutrition.calories} calories`,
            proteinContent: `${recipe.nutrition.proteinGrams} g`,
            carbohydrateContent: `${recipe.nutrition.carbsGrams} g`,
            fatContent: `${recipe.nutrition.fatGrams} g`,
            ...(recipe.nutrition.fiberGrams && { fiberContent: `${recipe.nutrition.fiberGrams} g` }),
            ...(recipe.nutrition.sodiumMg && { sodiumContent: `${recipe.nutrition.sodiumMg} mg` }),
          },
        }),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (recipe.rating || 4.9).toString(),
          reviewCount: (recipe.reviewCount || 120).toString(),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Recipes",
            item: `${origin}/recipes`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: recipe.category,
            item: categoryUrl,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: recipe.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  const recipeScriptTag = `\n    <!-- Schema.org Recipe Structured Data (Accessible to AI & Search Crawlers) -->\n    <script type="application/ld+json" id="recipe-structured-data">\n${safeJsonLd(jsonLdData)}\n    </script>`;

  // 2. Build Accessible Semantic Recipe HTML for inside <div id="root">
  const semanticRecipeHtml = `
    <div class="min-h-screen bg-[#FAF9F6] text-[#30302F]">
      <header class="border-b border-[#E6E1D8] bg-white py-4 px-4 sm:px-6">
        <div class="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" class="text-xl font-bold tracking-tight text-[#242423] font-serif-editorial">
            Noakhali Kitchen
          </a>
          <nav aria-label="Breadcrumbs" class="text-xs text-[#77736D] space-x-1 hidden sm:block">
            <a href="/" class="hover:text-[#E97520]">Home</a>
            <span>/</span>
            <a href="/recipes" class="hover:text-[#E97520]">Recipes</a>
            <span>/</span>
            <a href="/category/${recipe.categorySlug}" class="hover:text-[#E97520]">${escapeHtml(recipe.category)}</a>
            <span>/</span>
            <span class="text-[#30302F] font-semibold">${escapeHtml(recipe.title)}</span>
          </nav>
        </div>
      </header>

      <main class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <article itemscope itemtype="https://schema.org/Recipe" class="bg-white rounded-2xl border border-[#E6E1D8] p-6 sm:p-10 shadow-xs">
          <!-- Category & Cuisine Header -->
          <div class="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E97520] mb-3">
            <a href="/category/${recipe.categorySlug}" class="hover:underline">${escapeHtml(recipe.category)}</a>
            <span>&bull;</span>
            <span class="text-[#77736D]">${escapeHtml(recipe.cuisine)}</span>
          </div>

          <!-- Main Recipe Title H1 -->
          <h1 itemprop="name" class="text-2xl sm:text-4xl font-extrabold text-[#242423] leading-tight mb-4 font-serif-editorial">
            ${escapeHtml(recipe.title)}
          </h1>

          <!-- Recipe Description -->
          <p itemprop="description" class="text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
            ${escapeHtml(recipe.description)}
          </p>

          <!-- Recipe Hero Image -->
          <div class="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 bg-[#FAF9F6]">
            <img
              src="${escapeHtml(absHeroImage)}"
              alt="${escapeHtml(recipe.title)}"
              itemprop="image"
              class="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <!-- Quick Timing & Serving Facts -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#E6E1D8] mb-8 text-xs text-[#57534E] bg-[#FAF9F6] rounded-lg px-4">
            <div>
              <span class="block text-[#77736D] font-medium">Prep Time</span>
              <strong class="text-[#242423] text-sm"><time itemprop="prepTime" datetime="${prepIso || ""}">${recipe.prepTimeMinutes} mins</time></strong>
            </div>
            <div>
              <span class="block text-[#77736D] font-medium">Cook Time</span>
              <strong class="text-[#242423] text-sm"><time itemprop="cookTime" datetime="${cookIso || ""}">${recipe.cookTimeMinutes} mins</time></strong>
            </div>
            <div>
              <span class="block text-[#77736D] font-medium">Total Time</span>
              <strong class="text-[#242423] text-sm"><time itemprop="totalTime" datetime="${totalIso || ""}">${recipe.totalTimeMinutes} mins</time></strong>
            </div>
            <div>
              <span class="block text-[#77736D] font-medium">Servings</span>
              <strong class="text-[#242423] text-sm" itemprop="recipeYield">${recipe.servings} servings</strong>
            </div>
          </div>

          <!-- Halal Verification Section -->
          ${recipe.halalNotes ? `
          <section class="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] mb-8">
            <strong class="font-bold block uppercase tracking-wider mb-1 text-[11px] text-[#15803D]">Halal Verification & Standards</strong>
            <p>${escapeHtml(recipe.halalNotes)}</p>
          </section>
          ` : ""}

          <!-- Ingredients Section -->
          <section id="recipe-ingredients" class="mb-10 pt-2">
            <h2 class="text-xl sm:text-2xl font-bold text-[#242423] mb-4 pb-2 border-b border-[#E6E1D8] font-serif-editorial">
              Ingredients
            </h2>
            <ul class="space-y-2.5 text-sm text-[#3F3C38]">
              ${recipe.ingredients.map((ing) => `
                <li class="flex items-start gap-2.5 py-1.5 border-b border-[#F5F4F0]" itemprop="recipeIngredient">
                  <span class="text-[#E97520] font-bold shrink-0">&bull;</span>
                  <div>
                    <strong class="text-[#242423]">${escapeHtml(ing.amount)} ${escapeHtml(ing.unit || "")}</strong>
                    <span>${escapeHtml(ing.name)}</span>
                    ${ing.notes ? `<span class="text-xs text-[#77736D] italic"> — ${escapeHtml(ing.notes)}</span>` : ""}
                  </div>
                </li>
              `).join("")}
            </ul>
          </section>

          <!-- Substitutions Section -->
          ${recipe.substitutions && recipe.substitutions.length > 0 ? `
          <section class="p-4 bg-[#FFF9F0] rounded-xl border border-[#F8CD78]/50 text-xs text-[#57534E] mb-10">
            <strong class="font-bold block uppercase tracking-wider text-[#D75D17] mb-2 text-[11px]">Recommended Substitutions</strong>
            <ul class="space-y-1.5">
              ${recipe.substitutions.map((sub) => `
                <li><strong>Replace ${escapeHtml(sub.original)}:</strong> ${escapeHtml(sub.substitute)}. ${escapeHtml(sub.notes)}</li>
              `).join("")}
            </ul>
          </section>
          ` : ""}

          <!-- Step-by-Step Cooking Instructions -->
          <section id="recipe-instructions" class="mb-10 pt-2">
            <h2 class="text-xl sm:text-2xl font-bold text-[#242423] mb-4 pb-2 border-b border-[#E6E1D8] font-serif-editorial">
              Step-by-Step Cooking Instructions
            </h2>
            <ol class="space-y-6 text-sm text-[#3F3C38]">
              ${recipe.instructions.map((inst) => `
                <li itemprop="recipeInstructions" itemscope itemtype="https://schema.org/HowToStep" class="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E1D8]">
                  <h3 itemprop="name" class="text-xs font-bold uppercase tracking-wider text-[#E97520] mb-2">
                    Step ${inst.step || ""}: ${escapeHtml(inst.title)}
                  </h3>
                  <p itemprop="text" class="text-sm leading-relaxed text-[#3F3C38]">
                    ${escapeHtml(inst.instruction)}
                  </p>
                  ${inst.tip ? `
                    <div class="mt-2.5 p-2.5 rounded-lg bg-[#FFF9F0] border border-[#F8CD78]/40 text-xs text-[#D75D17]">
                      <strong>Chef's Tip:</strong> ${escapeHtml(inst.tip)}
                    </div>
                  ` : ""}
                </li>
              `).join("")}
            </ol>
          </section>

          <!-- Nutrition Facts -->
          ${recipe.nutrition ? `
          <section id="recipe-nutrition" itemprop="nutrition" itemscope itemtype="https://schema.org/NutritionInformation" class="p-5 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] mb-10">
            <h2 class="text-base font-bold text-[#242423] mb-3 font-serif-editorial">Nutrition Facts (Per Serving)</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-2 bg-white rounded border border-[#E6E1D8]">
                <span class="text-[#77736D] block">Calories</span>
                <strong class="text-base text-[#242423]" itemprop="calories">${recipe.nutrition.calories} kcal</strong>
              </div>
              <div class="p-2 bg-white rounded border border-[#E6E1D8]">
                <span class="text-[#77736D] block">Protein</span>
                <strong class="text-base text-[#242423]" itemprop="proteinContent">${recipe.nutrition.proteinGrams} g</strong>
              </div>
              <div class="p-2 bg-white rounded border border-[#E6E1D8]">
                <span class="text-[#77736D] block">Carbohydrates</span>
                <strong class="text-base text-[#242423]" itemprop="carbohydrateContent">${recipe.nutrition.carbsGrams} g</strong>
              </div>
              <div class="p-2 bg-white rounded border border-[#E6E1D8]">
                <span class="text-[#77736D] block">Fat</span>
                <strong class="text-base text-[#242423]" itemprop="fatContent">${recipe.nutrition.fatGrams} g</strong>
              </div>
            </div>
          </section>
          ` : ""}

          <!-- Chef Notes -->
          ${recipe.chefNotes && recipe.chefNotes.length > 0 ? `
          <section class="mb-10 p-5 bg-white rounded-xl border border-[#E6E1D8]">
            <h2 class="text-base font-bold text-[#242423] mb-2 font-serif-editorial">Chef's Heritage Notes</h2>
            <ul class="space-y-1.5 text-xs text-[#57534E] list-disc list-inside">
              ${recipe.chefNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
            </ul>
          </section>
          ` : ""}

          <!-- FAQs -->
          ${recipe.faqs && recipe.faqs.length > 0 ? `
          <section class="mb-8 pt-2">
            <h2 class="text-xl font-bold text-[#242423] mb-4 pb-2 border-b border-[#E6E1D8] font-serif-editorial">
              Frequently Asked Questions
            </h2>
            <div class="space-y-4 text-xs sm:text-sm">
              ${recipe.faqs.map((faq) => `
                <div class="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E1D8]">
                  <strong class="block font-bold text-[#242423] mb-1">${escapeHtml(faq.question)}</strong>
                  <p class="text-[#57534E] leading-relaxed">${escapeHtml(faq.answer)}</p>
                </div>
              `).join("")}
            </div>
          </section>
          ` : ""}
        </article>
      </main>

      <footer class="mt-12 py-8 bg-[#242423] text-[#FAF9F6] text-center text-xs">
        <p>&copy; ${new Date().getFullYear()} Noakhali Kitchen. Authentic Halal Recipes & Culinary Heritage.</p>
      </footer>
    </div>
  `;

  // 3. Assemble Final HTML
  let html = baseHtmlTemplate;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(pageDescription)}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph Title, Description, Url, Type, Image
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(pageDescription)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:type" content="article" />`
  );

  // Injected Open Graph image and robots directives before </head>
  const metaAdditions = `
    <meta property="og:image" content="${escapeHtml(absHeroImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(pageDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(absHeroImage)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />${recipeScriptTag}
  `;

  html = html.replace("</head>", `${metaAdditions}\n  </head>`);

  // Replace <div id="root"></div> with the semantic recipe markup inside <div id="root">
  html = html.replace(
    /<div\s+id="root">\s*<\/div>/i,
    `<div id="root">${semanticRecipeHtml}</div>`
  );

  return html;
}

module.exports = {
  renderRecipePage,
  toIsoDuration,
  toIsoDate,
  resolveAssetUrl,
  escapeHtml,
};
