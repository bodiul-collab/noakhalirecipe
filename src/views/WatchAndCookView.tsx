import React, { useState, useMemo, useEffect } from "react";
import {
  Play,
  Search,
  Filter,
  Video,
  Clock,
  Utensils,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Sparkles,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { RECIPES } from "../data/recipes";
import { Recipe } from "../types";
import { RecipeVideoCard } from "../components/RecipeVideoCard";
import { updatePageSeo } from "../utils/seoHead";

interface WatchAndCookViewProps {
  onNavigate: (route: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const WatchAndCookView: React.FC<WatchAndCookViewProps> = ({
  onNavigate,
  onSelectRecipe,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalVideo, setActiveModalVideo] = useState<Recipe | null>(null);

  // 1. Dynamic Video Discovery from RECIPES dataset (Single Source of Truth)
  const videoRecipes = useMemo(() => {
    return RECIPES.filter(
      (r): r is Recipe & { video: NonNullable<Recipe["video"]> } =>
        Boolean(r.video && r.video.videoEnabled && r.video.youtubeVideoId && r.video.youtubeVideoId.trim())
    );
  }, []);

  // 2. Featured Recipe (Chicken Vindaloo is the pilot showcase)
  const featuredRecipe = useMemo(() => {
    const vindaloo = videoRecipes.find((r) => r.slug === "chicken-vindaloo");
    return vindaloo || videoRecipes[0] || null;
  }, [videoRecipes]);

  // 3. Categories with active video counts
  const videoCategories = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; count: number }>();
    for (const r of videoRecipes) {
      const existing = map.get(r.categorySlug) || {
        slug: r.categorySlug,
        name: r.category,
        count: 0,
      };
      existing.count += 1;
      map.set(r.categorySlug, existing);
    }
    return Array.from(map.values());
  }, [videoRecipes]);

  // 4. Reactive Search & Category Filtering
  const filteredRecipes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return videoRecipes.filter((r) => {
      const matchesCategory =
        selectedCategory === "all" || r.categorySlug === selectedCategory;
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.video.videoTitle && r.video.videoTitle.toLowerCase().includes(q)) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [videoRecipes, selectedCategory, searchQuery]);

  // 5. Canonical SEO Metadata
  useEffect(() => {
    const cleanup = updatePageSeo({
      title: "Watch & Cook — Authentic Video Recipes | Noakhali Kitchen",
      description:
        "Watch step-by-step cooking tutorials and video guides from Noakhali Kitchen. Master rich curries, fragrant biryanis, and heritage home recipes.",
      canonicalUrl: "https://www.noakhalikitchen.com/watch-and-cook",
      ogType: "website",
      imageUrl: "https://www.noakhalikitchen.com/icon.svg",
    });
    return cleanup;
  }, []);

  // 6. JSON-LD CollectionPage & ItemList Structured Data
  const jsonLdData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.noakhalikitchen.com/watch-and-cook#webpage",
          "url": "https://www.noakhalikitchen.com/watch-and-cook",
          "name": "Watch & Cook — Authentic Video Recipes | Noakhali Kitchen",
          "description":
            "Watch step-by-step cooking tutorials and video guides from Noakhali Kitchen.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://www.noakhalikitchen.com/#website",
            "name": "Noakhali Kitchen",
            "url": "https://www.noakhalikitchen.com/",
          },
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": videoRecipes.length,
            "itemListElement": videoRecipes.map((r, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "url": `https://www.noakhalikitchen.com/recipes/${r.slug}`,
              "name": r.video.videoTitle || r.title,
            })),
          },
        },
      ],
    };
  }, [videoRecipes]);

  return (
    <div className="w-full bg-[#FAF9F6] text-[#30302F] min-h-screen pb-20">
      {/* Schema.org CollectionPage / ItemList Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Top Banner / Breadcrumbs */}
      <div className="border-b border-[#E6E1D8] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#77736D]">
            <button
              onClick={() => onNavigate("/")}
              className="hover:text-[#30302F] cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#30302F] font-bold" aria-current="page">
              Watch &amp; Cook
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-10 sm:space-y-12">
        {/* Editorial Hero Header */}
        <section className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF4EA] border border-[#F8CD78]/60 text-[#E97520] text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>Official Video Kitchen</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-editorial text-[#242423] tracking-tight">
            Watch &amp; Cook
          </h1>

          <p className="text-base sm:text-lg font-medium text-[#E97520] tracking-wide font-heading">
            Watch it. Cook it. Love it.
          </p>

          <p className="text-sm sm:text-base text-[#615C55] leading-relaxed">
            Welcome to the visual kitchen of Noakhali Kitchen. Follow our step-by-step video tutorials
            to master regional spice blending, slow braising, and time-honored heritage recipes with
            clarity and confidence.
          </p>
        </section>

        {/* Featured Video Spotlight */}
        {featuredRecipe && (
          <section
            id="featured-video-spotlight"
            aria-labelledby="featured-heading"
            className="bg-white rounded-2xl border border-[#E6E1D8] shadow-sm p-4 sm:p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3F2EE] pb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E97520] text-white shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Recipe Video
                </span>
                <span className="text-xs text-[#77736D] hidden sm:inline">&bull; Step-by-Step Masterclass</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectRecipe(featuredRecipe);
                  onNavigate(`/recipes/${featuredRecipe.slug}`);
                }}
                className="text-xs font-bold text-[#E97520] hover:text-[#D75D17] inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>Read Full Written Recipe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Interactive Video Player */}
              <div className="lg:col-span-7 w-full">
                <RecipeVideoCard
                  video={featuredRecipe.video}
                  recipeTitle={featuredRecipe.title}
                />
              </div>

              {/* Right Column: Recipe Story & Quick Facts */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E97520]">
                    {featuredRecipe.category} &bull; {featuredRecipe.cuisine}
                  </span>
                  <h2
                    id="featured-heading"
                    className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#242423] leading-snug"
                  >
                    {featuredRecipe.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#615C55] leading-relaxed">
                    {featuredRecipe.description}
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-3 gap-2.5 p-3 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] text-center text-xs">
                  <div>
                    <span className="text-[#8A857E] block text-[10px] font-bold uppercase tracking-wider">
                      PREP
                    </span>
                    <span className="font-bold text-[#30302F]">
                      {featuredRecipe.prepTimeMinutes} mins
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8A857E] block text-[10px] font-bold uppercase tracking-wider">
                      COOK
                    </span>
                    <span className="font-bold text-[#30302F]">
                      {featuredRecipe.cookTimeMinutes} mins
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8A857E] block text-[10px] font-bold uppercase tracking-wider">
                      SERVINGS
                    </span>
                    <span className="font-bold text-[#30302F]">
                      {featuredRecipe.servings}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectRecipe(featuredRecipe);
                      onNavigate(`/recipes/${featuredRecipe.slug}`);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#30302F] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#E7A52B]" />
                    <span>View Recipe &amp; Ingredients</span>
                  </button>

                  <a
                    href={featuredRecipe.video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] hover:border-[#E97520] hover:text-[#E97520] text-xs font-bold text-[#30302F] transition-all cursor-pointer"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#77736D]" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Discovery Filter & Search Bar */}
        <section
          aria-label="Filter Video Recipes"
          className="bg-white rounded-xl border border-[#E6E1D8] p-4 sm:p-5 shadow-2xs space-y-4"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#242423] font-heading uppercase tracking-wide">
                Explore Video Recipes
              </h2>
              <p className="text-xs text-[#77736D]">
                Showing {filteredRecipes.length} published video {filteredRecipes.length === 1 ? "recipe" : "recipes"}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#8A857E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipe title or dish..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E97520] focus:bg-white text-[#30302F] placeholder-[#8A857E]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A857E] hover:text-[#30302F] cursor-pointer"
                  aria-label="Clear search"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3F2EE]">
            <span className="text-[11px] font-bold text-[#8A857E] uppercase tracking-wider mr-1">
              Category:
            </span>

            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#30302F] text-white shadow-2xs"
                  : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#3F3C38] hover:border-[#E97520] hover:text-[#E97520]"
              }`}
            >
              All Videos ({videoRecipes.length})
            </button>

            {videoCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-[#30302F] text-white shadow-2xs"
                    : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#3F3C38] hover:border-[#E97520] hover:text-[#E97520]"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </section>

        {/* Video Recipes Grid */}
        <section aria-label="Video Recipes Catalog">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => {
                const thumbnail =
                  recipe.video.videoThumbnail ||
                  `https://i.ytimg.com/vi/${recipe.video.youtubeVideoId}/hqdefault.jpg`;

                return (
                  <article
                    key={recipe.id}
                    className="bg-white rounded-xl border border-[#E6E1D8] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Thumbnail Poster with Play Overlay */}
                    <div className="relative aspect-video w-full bg-[#1E1B18] overflow-hidden">
                      <img
                        src={thumbnail}
                        alt={recipe.video.videoTitle || recipe.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-all flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveModalVideo(recipe)}
                          aria-label={`Play ${recipe.title} video`}
                          className="w-12 h-12 rounded-full bg-[#E97520] hover:bg-[#D75D17] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer border border-white/80"
                        >
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </button>
                      </div>

                      {/* Category Badge Overlay */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-sm text-white">
                          {recipe.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold font-serif-editorial text-[#242423] group-hover:text-[#E97520] transition-colors leading-snug">
                          {recipe.title}
                        </h3>
                        <p className="text-xs text-[#615C55] line-clamp-2 leading-relaxed">
                          {recipe.description}
                        </p>
                      </div>

                      {/* Timings */}
                      <div className="flex items-center justify-between text-xs text-[#77736D] pt-2 border-t border-[#F3F2EE]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#E97520]" />
                          <span>{recipe.totalTimeMinutes} mins total</span>
                        </span>
                        <span>{recipe.servings} servings</span>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setActiveModalVideo(recipe)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FFF4EA] border border-[#F8CD78] text-[#E97520] hover:bg-[#FFE8D5] text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-[#E97520]" />
                          <span>Watch Video</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectRecipe(recipe);
                            onNavigate(`/recipes/${recipe.slug}`);
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE] hover:border-[#30302F] text-xs font-bold transition-colors cursor-pointer"
                        >
                          <span>Written Recipe</span>
                          <ChevronRight className="w-3 h-3 text-[#77736D]" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-[#E6E1D8] p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FFF4EA] border border-[#F8CD78]/60 flex items-center justify-center mx-auto text-[#E97520]">
                <Video className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold font-serif-editorial text-[#242423]">
                  No Video Recipes Found
                </h3>
                <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
                  We are actively producing more authentic step-by-step video tutorials. In the
                  meantime, browse our complete collection of written recipes with step-by-step instructions.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-2 rounded-lg bg-[#30302F] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("/recipes")}
                  className="px-4 py-2 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] text-xs font-bold hover:bg-[#F3F2EE] transition-colors cursor-pointer"
                >
                  Browse Written Recipes
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Family Recipe Stories Promotional Banner (No user forms/accounts) */}
        <section
          aria-label="Family Recipe Stories"
          className="rounded-2xl bg-gradient-to-br from-[#2E2823] to-[#1C1815] text-white p-6 sm:p-8 md:p-10 border border-[#3E3832] shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E97520]/20 text-[#F8CD78] border border-[#F8CD78]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cultural Heritage Initiative</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-editorial leading-tight">
              Family Recipe Stories
            </h2>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Every cherished recipe carries the warmth of home, handwritten spice proportions, and
              memories shared around the dining table. Explore our food culture and culinary heritage
              articles celebrating authentic regional traditions.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate("/culture")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E97520] hover:bg-[#D75D17] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <span>Explore Food Culture &amp; Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal Player (if a card's Play is clicked) */}
      {activeModalVideo && activeModalVideo.video && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalVideo.video.videoTitle || activeModalVideo.title}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full p-4 sm:p-6 space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#F3F2EE]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520]">
                  Video Tutorial
                </span>
                <h3 className="text-base font-bold text-[#242423] line-clamp-1 font-heading">
                  {activeModalVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalVideo(null)}
                className="text-xs font-bold text-[#77736D] hover:text-[#242423] p-1.5 rounded-lg hover:bg-[#FAF9F6] cursor-pointer"
              >
                Close &times;
              </button>
            </div>

            {/* Click-to-load Player inside Modal */}
            <RecipeVideoCard
              video={activeModalVideo.video}
              recipeTitle={activeModalVideo.title}
            />

            <div className="flex items-center justify-between pt-2 border-t border-[#F3F2EE]">
              <button
                type="button"
                onClick={() => {
                  const target = activeModalVideo;
                  setActiveModalVideo(null);
                  onSelectRecipe(target);
                  onNavigate(`/recipes/${target.slug}`);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:underline cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Go to full written recipe with ingredients &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
