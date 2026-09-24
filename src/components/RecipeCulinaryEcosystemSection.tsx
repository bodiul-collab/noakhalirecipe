import React from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { Recipe } from "../types";
import { FOOD_CULTURE_ARTICLES } from "../data/foodCulture";
import { KITCHEN_EQUIPMENT } from "../data/kitchenEquipment";
import { RECIPES } from "../data/recipes";

// 1. WHAT MAKES THIS DISH SPECIAL BANNER
export const RecipeWhySpecialBanner: React.FC<{ whySpecial?: string }> = ({ whySpecial }) => {
  if (!whySpecial) return null;

  return (
    <div className="p-4 sm:p-5 bg-[#FFF9F0] border-l-4 border-[#E97520] rounded-r-xl border-y border-r border-[#F8CD78]/50 space-y-2 shadow-2xs">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D75D17] flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
        THE AUTHENTIC CULINARY SECRET
      </span>
      <h3 className="text-sm sm:text-base font-bold text-[#30302F] font-heading">
        What Sets This Recipe Apart
      </h3>
      <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed italic">
        "{whySpecial}"
      </p>
    </div>
  );
};

// 2. CULINARY ECOSYSTEM: TIPS, PITFALLS, CULTURE, GEAR & RELATED RECIPES
export const RecipeCulinaryEcosystem: React.FC<{
  recipe: Recipe;
  onNavigate: (route: string) => void;
  onSelectRecipe: (slug: string) => void;
}> = ({ recipe, onNavigate, onSelectRecipe }) => {
  const relatedCulture = recipe.relatedCultureSlug
    ? FOOD_CULTURE_ARTICLES.find((c) => c.slug === recipe.relatedCultureSlug)
    : null;

  const relatedTool = recipe.relatedKitchenToolId
    ? KITCHEN_EQUIPMENT.find((t) => t.id === recipe.relatedKitchenToolId)
    : null;

  const relatedRecipes = (recipe.relatedRecipeSlugs || [])
    .map((slug) => RECIPES.find((r) => r.slug === slug))
    .filter(Boolean) as Recipe[];

  return (
    <div className="space-y-6 pt-2">
      {/* Chef's Crucial Tips & Common Mistakes */}
      {((recipe.cookingTips && recipe.cookingTips.length > 0) ||
        (recipe.commonMistakes && recipe.commonMistakes.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipe.cookingTips && recipe.cookingTips.length > 0 && (
            <div className="p-5 bg-[#F4F9F4] rounded-xl border border-[#D1E7DD] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#198754]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F5132] font-heading">
                  Chef's Crucial Cooking Tips
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-[#2F4F4F]">
                {recipe.cookingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#198754] font-bold mt-0.5">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.commonMistakes && recipe.commonMistakes.length > 0 && (
            <div className="p-5 bg-[#FFF8F6] rounded-xl border border-[#F8D7DA] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#DC3545]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#842029] font-heading">
                  Common Pitfalls &amp; Mistakes to Avoid
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-[#58151C]">
                {recipe.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#DC3545] font-bold mt-0.5">&bull;</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Connected Food Culture & Heritage */}
      {relatedCulture && (
        <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-3 shadow-2xs print:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E97520] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              CULINARY HERITAGE &amp; FOOD CULTURE
            </span>
            <button
              onClick={() => onNavigate(`/food-culture/${relatedCulture.slug}`)}
              className="text-xs font-bold text-[#E97520] hover:underline cursor-pointer flex items-center gap-1"
            >
              Read Article <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {relatedCulture.heroImage && (
              <img
                src={relatedCulture.heroImage}
                alt={relatedCulture.title}
                className="w-full sm:w-36 h-24 object-cover rounded-lg border border-[#E6E1D8] shrink-0"
              />
            )}
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-[#242423] font-serif-editorial">
                {relatedCulture.title}
              </h4>
              <p className="text-xs text-[#77736D] line-clamp-2 leading-relaxed">
                {relatedCulture.excerpt}
              </p>
              <button
                onClick={() => onNavigate(`/food-culture/${relatedCulture.slug}`)}
                className="text-[11px] font-semibold text-[#30302F] hover:text-[#E97520] transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                Explore the historical roots of this recipe &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Kitchen Equipment */}
      {relatedTool && (
        <div className="p-5 sm:p-6 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] space-y-3 shadow-2xs print:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D] flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#E97520]" />
              RECOMMENDED KITCHEN EQUIPMENT
            </span>
            <button
              onClick={() => onNavigate("/tools")}
              className="text-xs font-bold text-[#E97520] hover:underline cursor-pointer flex items-center gap-1"
            >
              All Kitchen Tools <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#242423]">{relatedTool.title}</h4>
              {relatedTool.badge && (
                <span className="text-[10px] font-bold text-[#D75D17] bg-[#FFF9F0] border border-[#F8CD78] px-2 py-0.5 rounded">
                  {relatedTool.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-[#77736D] leading-relaxed">
              {relatedTool.recommendedUse}
            </p>
            {relatedTool.practicalTips && relatedTool.practicalTips.length > 0 && (
              <p className="text-[11px] text-[#8C867D] italic">
                <strong>Chef's Gear Tip:</strong> {relatedTool.practicalTips[0]}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Connected Companion Recipes */}
      {relatedRecipes.length > 0 && (
        <div className="p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-4 shadow-2xs print:hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E97520] block">
                COMPANION RECIPES
              </span>
              <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                More Authentic Recipes You Will Love
              </h3>
            </div>
            <button
              onClick={() => onNavigate("/recipes")}
              className="text-xs font-bold text-[#E97520] hover:underline cursor-pointer"
            >
              Browse All Recipes &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedRecipes.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRecipe(r.slug)}
                className="text-left p-3 rounded-lg border border-[#E6E1D8] hover:border-[#E97520] bg-[#FAF9F6] transition-all cursor-pointer group flex flex-col justify-between space-y-2.5"
              >
                <div className="space-y-2">
                  <div className="relative rounded-md overflow-hidden aspect-video bg-[#E6E1D8]">
                    <img
                      src={r.heroImage}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] block">
                    {r.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#30302F] group-hover:text-[#E97520] transition-colors line-clamp-2 leading-snug">
                    {r.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#77736D] pt-1 border-t border-[#EAE6DF]">
                  <span>{r.totalTimeMinutes} mins</span>
                  <span className="font-semibold text-[#E97520] group-hover:underline">
                    View Recipe &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
