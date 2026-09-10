import React, { useState } from "react";
import {
  Star,
  Clock,
  ChefHat,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  BookOpen,
  Wrench,
  ChevronRight,
  Compass,
  Search,
} from "lucide-react";
import { Hero } from "../components/Hero";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeCollectionGrid } from "../components/RecipeCollectionGrid";
import { HalalCheck } from "../components/HalalCheck";
import { AboutSection } from "../components/AboutSection";
import { AdSlot } from "../components/AdSlot";
import { NoakhaliLogo } from "../components/NoakhaliLogo";
import { RECIPES } from "../data/recipes";
import { CATEGORIES } from "../data/categories";
import { DIRECTORY_LISTINGS } from "../data/directory";
import { BLOG_POSTS } from "../data/blog";
import { IMAGES } from "../data/assets";
import { Recipe, RecipeCollection } from "../types";

interface HomeViewProps {
  onNavigate: (route: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  savedRecipeIds: Set<string>;
  onToggleSaveRecipe: (recipe: Recipe) => void;
  onOpenAssistant: () => void;
  collections?: RecipeCollection[];
  onOpenCollections?: (recipe: Recipe) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectRecipe,
  savedRecipeIds,
  onToggleSaveRecipe,
  onOpenAssistant,
  collections = [],
  onOpenCollections,
}) => {
  const [selectedDirectoryCat, setSelectedDirectoryCat] = useState<string>("all");
  const [directoryCitySearch, setDirectoryCitySearch] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const signatureHeritageRecipe =
    RECIPES.find((r) => r.slug === "noakhali-shorshe-ilish") || RECIPES[0];
  const trendingRecipes = RECIPES.slice(0, 4);
  const featuredEditorialRecipe =
    RECIPES.find((r) => r.slug === "shahi-chicken-roast") || RECIPES[1];
  const regionalRecipes = [
    signatureHeritageRecipe,
    ...RECIPES.filter((r) => r.id !== signatureHeritageRecipe.id && r.isRegionalHeritage).slice(0, 3),
  ];

  const filteredDirectory = DIRECTORY_LISTINGS.filter((item) => {
    const matchesCat =
      selectedDirectoryCat === "all" || item.category === selectedDirectoryCat;
    const matchesCity =
      !directoryCitySearch.trim() ||
      item.city.toLowerCase().includes(directoryCitySearch.toLowerCase()) ||
      item.name.toLowerCase().includes(directoryCitySearch.toLowerCase());
    return matchesCat && matchesCity;
  }).slice(0, 4);

  return (
    <div className="w-full">
      {/* 4. Editorial Hero */}
      <Hero
        onExploreRecipes={() => onNavigate("/recipes")}
        onFindHalalNearYou={() => onNavigate("/directory")}
        onOpenFeaturedRecipe={() => onSelectRecipe(signatureHeritageRecipe)}
      />

      {/* 5. Trending Recipes Section */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E6E1D8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E97520] font-subheading">
              <Star className="w-3.5 h-3.5 fill-[#E7A52B] text-[#E7A52B]" />
              TRENDING NOW
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#242423] font-heading tracking-wide uppercase">
              Recipes Everyone Is Talking About
            </h2>
            <p className="text-sm text-[#77736D] font-description italic">
              Start with the comforting Halal favorites our readers return to again and again.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={savedRecipeIds.has(recipe.id)}
                onToggleSave={onToggleSaveRecipe}
                onClick={onSelectRecipe}
                collections={collections}
                onOpenCollections={onOpenCollections}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate("/recipes")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#30302F] text-xs font-bold uppercase tracking-wider text-[#30302F] hover:bg-[#30302F] hover:text-white transition-colors cursor-pointer"
            >
              Browse Complete Recipe Index
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Featured Recipe Editorial Asymmetrical Composition */}
      <section className="py-14 sm:py-18 bg-[#FFF9F0] border-b border-[#E6E1D8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image Side */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E6E1D8] shadow-md bg-white">
                <img
                  src={featuredEditorialRecipe.heroImage || IMAGES.chickenRoast}
                  alt={featuredEditorialRecipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg border border-[#E6E1D8] shadow-sm hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#E97520] font-bold">
                  ★ {featuredEditorialRecipe.rating}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#30302F]">Reader Favorite</p>
                  <p className="text-[11px] text-[#77736D]">{featuredEditorialRecipe.reviewCount}+ Verified Reviews</p>
                </div>
              </div>
            </div>

            {/* Content Story Side */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E97520] font-subheading">
                <Sparkles className="w-4 h-4 text-[#E97520]" />
                FEATURED EDITORIAL RECIPE
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#242423] font-heading leading-tight tracking-wide uppercase">
                {featuredEditorialRecipe.title}
              </h2>

              <p className="text-base sm:text-lg text-[#3F3C38] leading-relaxed font-description italic">
                “{featuredEditorialRecipe.description}”
              </p>

              <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#E6E1D8] text-xs">
                <div>
                  <span className="text-[#8A857E] block text-[11px]">PREP TIME</span>
                  <span className="font-bold text-[#30302F]">
                    {featuredEditorialRecipe.prepTimeMinutes} mins
                  </span>
                </div>
                <div>
                  <span className="text-[#8A857E] block text-[11px]">COOK TIME</span>
                  <span className="font-bold text-[#30302F]">
                    {featuredEditorialRecipe.cookTimeMinutes} mins
                  </span>
                </div>
                <div>
                  <span className="text-[#8A857E] block text-[11px]">DIFFICULTY</span>
                  <span className="font-bold text-[#E97520]">
                    {featuredEditorialRecipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Halal Note */}
              <HalalCheck
                title="Halal Verification"
                notes={featuredEditorialRecipe.halalNotes}
              />

              <div className="pt-2">
                <button
                  onClick={() => onSelectRecipe(featuredEditorialRecipe)}
                  className="px-6 py-3 bg-[#E97520] hover:bg-[#D75D17] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center gap-2 cursor-pointer"
                >
                  VIEW FULL RECIPE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tasteful AdSlot */}
      <div className="max-w-[1280px] mx-auto px-4">
        <AdSlot slotId="home-after-featured" format="horizontal" />
      </div>

      {/* 7. Category Hubs Grid */}
      <section className="py-14 sm:py-18 bg-[#FAF9F6] border-b border-[#E6E1D8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97520] block mb-1 font-subheading">
                RECIPE HUBS
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#242423] font-heading tracking-wide uppercase">
                Explore Halal Recipes by Category
              </h2>
            </div>
            <button
              onClick={() => onNavigate("/category")}
              className="text-xs font-bold uppercase tracking-wider text-[#30302F] hover:text-[#E97520] flex items-center gap-1 self-start md:self-auto cursor-pointer"
            >
              All {CATEGORIES.length} Hubs &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const count = RECIPES.filter(
                (r) =>
                  r.categorySlug === cat.slug ||
                  Boolean(cat.featuredRecipeSlugs?.includes(r.slug))
              ).length;
              return (
                <div
                  key={cat.id}
                  onClick={() => onNavigate(`/category/${cat.slug}`)}
                  className="group bg-white rounded-lg border border-[#E6E1D8] overflow-hidden hover:border-[#F8CD78] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  {cat.image && (
                    <div className="w-full h-36 bg-[#FAF9F6] overflow-hidden relative">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#242423] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs border border-[#E6E1D8]">
                        {count} {count === 1 ? "RECIPE" : "RECIPES"}
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {!cat.image && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#E97520]">
                            {count} {count === 1 ? "RECIPE" : "RECIPES"}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#77736D] group-hover:text-[#E97520] group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-[#30302F] font-serif-editorial group-hover:text-[#E97520] transition-colors mb-2">
                        {cat.title}
                      </h3>

                      <p className="text-xs text-[#77736D] leading-relaxed line-clamp-2">
                        {cat.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F3F2EE] text-[11px] font-semibold text-[#30302F] group-hover:text-[#E97520] flex items-center justify-between">
                      <span>View Category Collection</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Halal Discovery Homepage Section: Find Halal Food & Community Near You */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E6E1D8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Interactive Search & Filters */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2D7A52]">
                <MapPin className="w-4 h-4 text-[#2D7A52]" />
                HALAL DIRECTORY &bull; VERIFIED PLACES
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] font-serif-editorial">
                Find Halal Food &amp; Community Near You
              </h2>

              <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
                Discover verified Halal restaurants, zabiha butchers, specialty groceries,
                and local mosques with Jummah prayer schedules.
              </p>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "All Places" },
                  { id: "restaurants", label: "Restaurants" },
                  { id: "butchers", label: "Butchers" },
                  { id: "groceries", label: "Groceries" },
                  { id: "mosques", label: "Mosques & Jummah" },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setSelectedDirectoryCat(chip.id)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                      selectedDirectoryCat === chip.id
                        ? "bg-[#30302F] text-white"
                        : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#30302F]"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* City Filter Input */}
              <div className="relative">
                <input
                  type="text"
                  value={directoryCitySearch}
                  onChange={(e) => setDirectoryCitySearch(e.target.value)}
                  placeholder="Filter by city (e.g. Jackson Heights, Boston)..."
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F]"
                />
                <Search className="w-3.5 h-3.5 text-[#8A857E] absolute right-3 top-3" />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate("/directory")}
                  className="px-6 py-3 bg-[#30302F] hover:bg-[#242423] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#E7A52B]" />
                  EXPLORE FULL DIRECTORY
                </button>

                <button
                  onClick={onOpenAssistant}
                  className="px-4 py-3 bg-[#FFF9F0] hover:bg-[#F8CD78]/30 border border-[#F8CD78] text-[#D75D17] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E97520]" />
                  Find Near Me (AI Maps)
                </button>
              </div>
            </div>

            {/* Right Column: Listing Cards Preview */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDirectory.length === 0 ? (
                <div className="col-span-2 p-8 text-center bg-[#FAF9F6] rounded-lg border border-[#E6E1D8]">
                  <p className="text-xs text-[#77736D]">
                    No verified directory locations matching "{directoryCitySearch}".
                  </p>
                  <button
                    onClick={() => {
                      setDirectoryCitySearch("");
                      setSelectedDirectoryCat("all");
                    }}
                    className="mt-2 text-xs text-[#E97520] font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredDirectory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg p-4 flex flex-col justify-between hover:border-[#30302F] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[10px] font-bold text-[#2D7A52] bg-[#2D7A52]/10 px-2 py-0.5 rounded">
                          {item.halalClassification}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#30302F] font-serif-editorial mb-1">
                        {item.name}
                      </h4>

                      <p className="text-xs text-[#77736D] flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-[#E97520] shrink-0" />
                        <span>{item.address}, {item.city}, {item.state}</span>
                      </p>

                      <p className="text-[11px] text-[#8A857E] line-clamp-2">
                        {item.halalDetails}
                      </p>

                      {item.jummahInfo && (
                        <div className="mt-2 text-[11px] text-[#2D7A52] bg-white p-2 rounded border border-[#E6E1D8]">
                          <strong>Jummah:</strong> {item.jummahInfo}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E6E1D8] flex items-center justify-between">
                      <a
                        href={item.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#E97520] hover:text-[#D75D17] flex items-center gap-1"
                      >
                        Directions (Maps) &rarr;
                      </a>
                      <span className="text-[10px] text-[#8A857E]">
                        Verified: {item.lastVerifiedDate}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Popular Regional Recipes / Recipe Collection Grid */}
      <section className="py-14 sm:py-18 bg-[#f7f5f0] border-b border-[#E6E1D8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E97520] font-subheading">
              CULINARY HERITAGE &bull; 100% HALAL DISHES
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#242423] font-heading tracking-wide uppercase">
              Bengali &amp; South Asian Signature Collection
            </h2>
            <p className="text-sm text-[#77736D] font-description italic">
              Authentic family recipes perfected through generations—hover over each card to experience dynamic 3D depth and 2x image zoom.
            </p>
          </div>

          <RecipeCollectionGrid
            onSelectRecipeBySlug={(slug) => {
              const r = RECIPES.find((item) => item.slug === slug);
              if (r) {
                onSelectRecipe(r);
              }
            }}
          />

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate("/recipes")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#30302F] text-xs font-bold uppercase tracking-wider text-[#30302F] hover:bg-[#30302F] hover:text-white transition-colors cursor-pointer font-ui"
            >
              Explore All Regional Classics
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* About Noakhali Kitchen Section */}
      <AboutSection onNavigate={onNavigate} />

      {/* 10. Practical Kitchen Tools Teaser */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E6E1D8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
              KITCHEN UTILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] font-serif-editorial">
              Practical Kitchen Tools for Everyday Cooks
            </h2>
            <p className="text-sm text-[#77736D]">
              Scale ingredient quantities, convert baking units, and check food additives with our instant online utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Recipe Serving Scaler",
                desc: "Instantly multiply or reduce ingredient measurements for dinner parties or solo dining.",
                tool: "scaler",
                badge: "Interactive",
              },
              {
                title: "Halal E-Code Checker",
                desc: "Search additives, gelatin origins, and enzymes with clear Halal status guidance.",
                tool: "ecodes",
                badge: "Verified",
              },
              {
                title: "Kitchen Unit Converter",
                desc: "Convert fluid ounces, cups, grams, milliliters, and spoons accurately.",
                tool: "converter",
                badge: "Accurate",
              },
              {
                title: "Oven Temperature Guide",
                desc: "Switch between Fahrenheit, Celsius, Gas Marks, and fan-assisted settings.",
                tool: "oven",
                badge: "Quick",
              },
            ].map((tool, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(`/tools`)}
                className="group p-5 rounded-lg border border-[#E6E1D8] bg-[#FAF9F6] hover:border-[#E97520] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D7A52] bg-[#2D7A52]/10 px-2 py-0.5 rounded">
                      {tool.badge}
                    </span>
                    <Wrench className="w-4 h-4 text-[#77736D] group-hover:text-[#E97520]" />
                  </div>
                  <h3 className="text-base font-bold text-[#30302F] font-serif-editorial mb-2 group-hover:text-[#E97520]">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[#77736D] leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E6E1D8] text-xs font-bold text-[#E97520] flex items-center gap-1">
                  Open Tool &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Latest Food Guides Editorial Section */}
      <section className="py-14 sm:py-18 bg-[#FAF9F6] border-b border-[#E6E1D8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97520] block mb-1">
                EDITORIAL GUIDES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] font-serif-editorial">
                The Halal Food Journal
              </h2>
            </div>
            <button
              onClick={() => onNavigate("/blog")}
              className="text-xs font-bold uppercase tracking-wider text-[#30302F] hover:text-[#E97520] flex items-center gap-1 self-start md:self-auto cursor-pointer"
            >
              Read All Articles &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigate(`/blog/${post.slug}`)}
                className="group bg-white rounded-lg border border-[#E6E1D8] overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#30302F]">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] mb-1.5">
                    {post.category} &bull; {post.readTimeMinutes} min read
                  </span>

                  <h3 className="text-base font-bold text-[#242423] font-serif-editorial group-hover:text-[#E97520] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#77736D] leading-relaxed line-clamp-2 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="pt-3 border-t border-[#F3F2EE] text-[11px] text-[#8A857E] flex items-center justify-between">
                    <span>By {post.author.name}</span>
                    <span className="text-[#E97520] font-bold">Read &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Warm Editorial Newsletter Block */}
      <section className="py-16 sm:py-20 bg-[#F8CD78] text-center border-b border-[#E7A52B]/40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex justify-center mb-2">
            <div className="inline-flex items-center px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#30302F]/15 shadow-sm hover:shadow-md transition-shadow">
              <NoakhaliLogo size="md" />
            </div>
          </div>

          <span className="text-xs font-bold tracking-widest uppercase text-[#30302F] bg-white/70 px-3 py-1 rounded-full border border-[#30302F]/10 inline-block">
            STAY CONNECTED
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] font-serif-editorial">
            Bring Better Halal Meals Home.
          </h2>

          <p className="text-sm sm:text-base text-[#3F3C38] leading-relaxed">
            Get practical recipes, cooking tips, food guides, and new discoveries from Noakhali Kitchen.
          </p>

          {emailSubscribed ? (
            <div className="p-4 rounded-xl bg-white text-[#2D7A52] font-semibold text-sm border border-[#2D7A52]/20 shadow-xs max-w-md mx-auto">
              ✓ Jazakallah Khair! You have been subscribed to Noakhali Kitchen updates.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded text-xs bg-white text-[#30302F] border border-[#30302F]/20 focus:outline-none focus:border-[#30302F]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#30302F] hover:bg-[#242423] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          )}

          <span className="text-[11px] text-[#3F3C38]/80 block">
            No spam. Strictly respectful of your inbox privacy.
          </span>
        </div>
      </section>
    </div>
  );
};
