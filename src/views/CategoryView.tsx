import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, ShieldCheck, BookOpen, ArrowLeft, GlassWater, CalendarCheck } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { HalalCheck } from "../components/HalalCheck";
import { CATEGORIES } from "../data/categories";
import { RECIPES } from "../data/recipes";
import { Recipe, CategoryHub, RecipeCollection } from "../types";

interface CategoryViewProps {
  initialCategorySlug?: string;
  onNavigate: (route: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  savedRecipeIds: Set<string>;
  onToggleSaveRecipe: (recipe: Recipe) => void;
  collections?: RecipeCollection[];
  onOpenCollections?: (recipe: Recipe) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  initialCategorySlug,
  onNavigate,
  onSelectRecipe,
  savedRecipeIds,
  onToggleSaveRecipe,
  collections = [],
  onOpenCollections,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    initialCategorySlug || null
  );

  useEffect(() => {
    setActiveSlug(initialCategorySlug || null);
  }, [initialCategorySlug]);

  const activeCategory = CATEGORIES.find((c) => c.slug === activeSlug);

  const handleSelectCategory = (slug: string) => {
    setActiveSlug(slug);
    onNavigate(`/category/${slug}`);
  };

  const handleBackToAllCategories = () => {
    setActiveSlug(null);
    onNavigate("/category");
  };

  // If viewing a specific category
  if (activeCategory) {
    const categoryRecipes = RECIPES.filter(
      (r) =>
        r.categorySlug === activeCategory.slug ||
        Boolean(activeCategory.featuredRecipeSlugs?.includes(r.slug))
    );

    return (
      <div className="w-full bg-[#FAF9F6] py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#77736D]">
            <button onClick={() => onNavigate("/")} className="hover:text-[#30302F] cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button
              onClick={handleBackToAllCategories}
              className="hover:text-[#30302F] cursor-pointer"
            >
              Categories
            </button>
            <span>/</span>
            <span className="text-[#30302F] font-bold">{activeCategory.title}</span>
          </nav>

          <button
            onClick={handleBackToAllCategories}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#77736D] hover:text-[#30302F] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Categories
          </button>

          {/* Hub Header */}
          <div className="bg-white rounded-xl border border-[#E6E1D8] overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="p-6 sm:p-10 space-y-4 lg:col-span-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
                    HALAL CATEGORY HUB
                  </span>
                  <span className="text-xs text-[#2D7A52] font-semibold bg-[#2D7A52]/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Halal Verified
                  </span>
                  {activeCategory.slug === "halal-drinks" && (
                    <span className="text-xs text-[#E97520] font-semibold bg-[#FFF9F0] border border-[#F8CD78] px-2 py-0.5 rounded flex items-center gap-1">
                      <GlassWater className="w-3.5 h-3.5" />
                      Alcohol-Free Artisanal Sips
                    </span>
                  )}
                  {activeCategory.slug === "halal-meal-prep" && (
                    <span className="text-xs text-[#E97520] font-semibold bg-[#FFF9F0] border border-[#F8CD78] px-2 py-0.5 rounded flex items-center gap-1">
                      <CalendarCheck className="w-3.5 h-3.5" />
                      Workweek Batch Prep & Freezer Friendly
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-[#242423] font-serif-editorial">
                  {activeCategory.title}
                </h1>

                <p className="text-sm sm:text-base text-[#77736D] leading-relaxed max-w-3xl">
                  {activeCategory.fullDescription}
                </p>

                {/* Halal Pointers */}
                <div className="pt-2">
                  <HalalCheck
                    title={`Halal Sourcing Guide: ${activeCategory.title}`}
                    notes={activeCategory.halalPointers.join(" ")}
                  />
                </div>
              </div>

              {activeCategory.image && (
                <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full bg-[#FAF9F6] border-t lg:border-t-0 lg:border-l border-[#E6E1D8]">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover max-h-[360px] lg:max-h-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                  <div className="absolute bottom-3 left-4 text-white text-xs font-medium lg:hidden">
                    {activeCategory.title} Collection
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recipes in this category */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#242423] font-serif-editorial">
                {activeCategory.title} Recipes ({categoryRecipes.length})
              </h2>
            </div>

            {categoryRecipes.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-[#E6E1D8]">
                <p className="text-xs text-[#77736D]">
                  New authentic recipes for this collection are currently being tested in the Noakhali Kitchen test lab. Check back soon!
                </p>
                <button
                  onClick={() => onNavigate("/recipes")}
                  className="mt-3 px-4 py-2 bg-[#30302F] text-white text-xs font-bold rounded cursor-pointer"
                >
                  Explore All Recipes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryRecipes.map((recipe) => (
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
            )}
          </div>

          {/* Category FAQs */}
          {activeCategory.faqs.length > 0 && (
            <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                Frequently Asked Questions: {activeCategory.title}
              </h2>
              <div className="space-y-3">
                {activeCategory.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] space-y-1">
                    <h4 className="text-xs font-bold text-[#30302F]">{faq.question}</h4>
                    <p className="text-xs text-[#77736D] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Categories Links */}
          <div className="pt-6 border-t border-[#E6E1D8]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#30302F] mb-4">
              Explore Other Category Hubs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.filter((c) => c.slug !== activeCategory.slug)
                .slice(0, 4)
                .map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => handleSelectCategory(c.slug)}
                    className="p-3 bg-white border border-[#E6E1D8] rounded-lg text-left hover:border-[#E97520] transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#30302F] block truncate">
                      {c.title}
                    </span>
                    <span className="text-[10px] text-[#77736D]">View Hub &rarr;</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // All Categories View
  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
            RECIPE COLLECTIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242423] font-serif-editorial">
            Halal Recipe Hubs
          </h1>
          <p className="text-sm text-[#77736D]">
            Browse our carefully organized collections of wholesome, Halal-tested dishes, drinks, sourcing tips, and cultural background.
          </p>
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
                onClick={() => handleSelectCategory(cat.slug)}
                className="group bg-white rounded-lg border border-[#E6E1D8] overflow-hidden hover:border-[#F8CD78] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {cat.image && (
                  <div className="w-full h-40 bg-[#FAF9F6] overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#242423] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs border border-[#E6E1D8]">
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

                    <p className="text-xs text-[#77736D] leading-relaxed line-clamp-3">
                      {cat.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#F3F2EE] flex items-center justify-between text-xs text-[#E97520] font-bold">
                    <span>Explore Category Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
