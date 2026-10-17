import React, { useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  CookingPot,
  Compass,
  ShieldCheck,
  Flame,
  Award,
} from "lucide-react";
import { Hero } from "../components/Hero";
import { RecipeCard } from "../components/RecipeCard";
import { AboutSection } from "../components/AboutSection";
import { RECIPES } from "../data/recipes";
import { COOKING_GUIDES } from "../data/guides";
import { FOOD_CULTURE_ARTICLES } from "../data/foodCulture";
import { Recipe, RecipeCollection } from "../types";
import { updatePageSeo } from "../utils/seoHead";

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
  useEffect(() => {
    const cleanup = updatePageSeo({
      title: "Noakhali Kitchen — Authentic Halal Recipes & Food Culture",
      description:
        "Authentic Halal recipes, regional culinary heritage, food guides, cooking techniques, practical kitchen tools, and ingredient verification.",
      canonicalUrl: "https://www.noakhalikitchen.com/",
      ogType: "website",
    });
    return cleanup;
  }, []);

  const signatureRecipe =
    RECIPES.find((r) => r.slug === "noakhali-shorshe-ilish") ||
    RECIPES.find((r) => r.slug === "kacchi-biryani") ||
    RECIPES[0];

  const featuredRecipes = RECIPES.filter((r) => r.isFeatured || r.isTrending).slice(0, 6);
  const recentGuides = COOKING_GUIDES.slice(0, 3);
  const culturalStories = FOOD_CULTURE_ARTICLES.slice(0, 3);

  return (
    <div className="w-full bg-[#FAF9F6] dark:bg-[#141413]">
      {/* Hero Section */}
      <Hero
        onExploreRecipes={() => onNavigate("/recipes")}
        onExploreGuides={() => onNavigate("/guides")}
        onOpenFeaturedRecipe={() => {
          if (signatureRecipe) onSelectRecipe(signatureRecipe);
        }}
      />

      {/* Main Content Hub */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* Featured & Trending Halal Recipes */}
        <section aria-labelledby="featured-recipes-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E1D8] dark:border-[#33322E] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E97520] mb-1">
                <Flame className="w-3.5 h-3.5" />
                TESTED &bull; 100% HALAL VERIFIED
              </div>
              <h2
                id="featured-recipes-heading"
                className="text-2xl sm:text-3xl font-bold text-[#242423] dark:text-[#EDE8DF] font-heading"
              >
                Featured Kitchen Creations
              </h2>
              <p className="text-xs sm:text-sm text-[#77736D] dark:text-[#A8A49E] mt-0.5">
                From slow-braised celebratory biryanis to everyday family dinners.
              </p>
            </div>
            <button
              onClick={() => onNavigate("/recipes")}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#30302F] dark:text-white hover:text-[#E97520] transition-colors cursor-pointer shrink-0"
            >
              <span>Explore All Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
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
        </section>

        {/* Cooking Guides & Culinary Techniques */}
        <section aria-labelledby="cooking-guides-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E1D8] dark:border-[#33322E] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E97520] mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                MASTER THE CRAFT
              </div>
              <h2
                id="cooking-guides-heading"
                className="text-2xl sm:text-3xl font-bold text-[#242423] dark:text-[#EDE8DF] font-heading"
              >
                Culinary Guides &amp; Techniques
              </h2>
              <p className="text-xs sm:text-sm text-[#77736D] dark:text-[#A8A49E] mt-0.5">
                Food science principles, blooming aromatics, and authentic ancestral techniques.
              </p>
            </div>
            <button
              onClick={() => onNavigate("/guides")}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#30302F] dark:text-white hover:text-[#E97520] transition-colors cursor-pointer shrink-0"
            >
              <span>All Cooking Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentGuides.map((guide) => (
              <article
                key={guide.id}
                onClick={() => onNavigate(`/guides/${guide.slug}`)}
                className="group bg-white dark:bg-[#1E1E1C] rounded-xl border border-[#E6E1D8] dark:border-[#33322E] overflow-hidden hover:border-[#E97520] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#FAF9F6] relative">
                  <img
                    src={guide.heroImage}
                    alt={guide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 dark:bg-[#1E1E1C]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-[#E97520] border border-[#E6E1D8]/60 dark:border-[#33322E]">
                    {guide.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-[#242423] dark:text-[#EDE8DF] group-hover:text-[#E97520] transition-colors font-serif-editorial leading-snug line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#77736D] dark:text-[#A8A49E] line-clamp-2 mt-2 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F3F2EE] dark:border-[#2D2D2A] flex items-center justify-between text-xs text-[#77736D] dark:text-[#A8A49E]">
                    <span>By {guide.author.name}</span>
                    <span className="font-bold text-[#E97520]">Read Guide &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Food Culture & Culinary Anthropology */}
        <section aria-labelledby="food-culture-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E1D8] dark:border-[#33322E] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E97520] mb-1">
                <Compass className="w-3.5 h-3.5" />
                LIVING HERITAGE
              </div>
              <h2
                id="food-culture-heading"
                className="text-2xl sm:text-3xl font-bold text-[#242423] dark:text-[#EDE8DF] font-heading"
              >
                Food Culture &amp; Heritage
              </h2>
              <p className="text-xs sm:text-sm text-[#77736D] dark:text-[#A8A49E] mt-0.5">
                Festive foodways, regional delta traditions, and ethical Halal culinary philosophy.
              </p>
            </div>
            <button
              onClick={() => onNavigate("/culture")}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#30302F] dark:text-white hover:text-[#E97520] transition-colors cursor-pointer shrink-0"
            >
              <span>All Cultural Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {culturalStories.map((story) => (
              <article
                key={story.id}
                onClick={() => onNavigate(`/culture/${story.slug}`)}
                className="group bg-white dark:bg-[#1E1E1C] rounded-xl border border-[#E6E1D8] dark:border-[#33322E] overflow-hidden hover:border-[#E97520] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#FAF9F6] relative">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 dark:bg-[#1E1E1C]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-[#E97520] border border-[#E6E1D8]/60 dark:border-[#33322E]">
                    {story.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-[#242423] dark:text-[#EDE8DF] group-hover:text-[#E97520] transition-colors font-serif-editorial leading-snug line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-xs text-[#77736D] dark:text-[#A8A49E] line-clamp-2 mt-2 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F3F2EE] dark:border-[#2D2D2A] flex items-center justify-between text-xs text-[#77736D] dark:text-[#A8A49E]">
                    <span>By {story.author.name}</span>
                    <span className="font-bold text-[#E97520]">Read Story &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Kitchen Tools & Cookware Spotlight */}
        <section className="bg-white dark:bg-[#1E1E1C] rounded-2xl border border-[#E6E1D8] dark:border-[#33322E] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97520] block">
                KITCHEN TOOLS &bull; PANTRY ESSENTIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] dark:text-[#EDE8DF] font-heading">
                Authentic Cookware &amp; Tested Kitchen Gear
              </h2>
              <p className="text-xs sm:text-sm text-[#4D4943] dark:text-[#A8A49E] leading-relaxed">
                Discover the traditional dekchis, pre-seasoned cast iron kadais, precision digital scales, and stone mortars that give Bengali and Halal home cooking its signature depth.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onNavigate("/tools")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#30302F] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                <CookingPot className="w-4 h-4 text-[#E7A52B]" />
                <span>Explore Kitchen Tools</span>
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection onNavigate={onNavigate} />
      </div>
    </div>
  );
};
