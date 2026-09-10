import React, { useState, useMemo } from "react";
import {
  Flame,
  PieChart,
  Scale,
  ShieldCheck,
  ArrowDown,
  Info,
  Layers,
} from "lucide-react";
import { Recipe } from "../types";
import {
  calculatePerServingNutrition,
  PerServingNutritionSummary,
} from "../utils/nutritionEstimator";

interface KeyNutritionalPerServingProps {
  recipe: Recipe;
  scaledServings?: number;
}

export const KeyNutritionalPerServing: React.FC<KeyNutritionalPerServingProps> = ({
  recipe,
  scaledServings,
}) => {
  // Mode: "perServing" or "totalBatch"
  const [viewMode, setViewMode] = useState<"perServing" | "totalBatch">("perServing");

  const effectiveServings = scaledServings && scaledServings > 0 ? scaledServings : recipe.servings;

  const nutritionSummary: PerServingNutritionSummary = useMemo(() => {
    return calculatePerServingNutrition(recipe, effectiveServings);
  }, [recipe, effectiveServings]);

  const isTotal = viewMode === "totalBatch";

  // Active values depending on view mode
  const displayCalories = isTotal
    ? nutritionSummary.totalBatch.calories
    : nutritionSummary.calories;
  const displayProtein = isTotal
    ? nutritionSummary.totalBatch.proteinGrams
    : nutritionSummary.proteinGrams;
  const displayFat = isTotal
    ? nutritionSummary.totalBatch.fatGrams
    : nutritionSummary.fatGrams;
  const displayCarbs = isTotal
    ? nutritionSummary.totalBatch.carbsGrams
    : nutritionSummary.carbsGrams;
  const displayFiber = isTotal
    ? nutritionSummary.totalBatch.fiberGrams
    : nutritionSummary.fiberGrams;
  const displaySodium = isTotal
    ? nutritionSummary.totalBatch.sodiumMg
    : nutritionSummary.sodiumMg;

  const scrollToFullBreakdown = () => {
    const el = document.getElementById("recipe-nutrition-breakdown");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="key-nutritional-info"
      className="bg-white rounded-xl border border-[#E6E1D8] p-5 sm:p-6 shadow-xs space-y-5"
    >
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F3F2EE]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#FFF9F0] border border-[#F8CD78] flex items-center justify-center text-[#E97520]">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#242423] font-serif-editorial">
              Key Nutritional Information
            </h2>
          </div>
          <p className="text-xs text-[#77736D] mt-1 flex items-center gap-1.5 flex-wrap">
            <span>
              {isTotal
                ? `Total recipe nutrition calculated for all ${effectiveServings} servings.`
                : `Calculated per single serving (${nutritionSummary.servingSizeDescription}).`}
            </span>
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-[#FAF9F6] p-1 rounded-lg border border-[#E6E1D8] self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setViewMode("perServing")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              !isTotal
                ? "bg-white text-[#242423] shadow-2xs font-bold border border-[#E6E1D8]"
                : "text-[#77736D] hover:text-[#242423]"
            }`}
          >
            Per Serving
          </button>
          <button
            type="button"
            onClick={() => setViewMode("totalBatch")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              isTotal
                ? "bg-white text-[#242423] shadow-2xs font-bold border border-[#E6E1D8]"
                : "text-[#77736D] hover:text-[#242423]"
            }`}
          >
            <Layers className="w-3 h-3 text-[#E97520]" />
            Entire Recipe ({effectiveServings} svgs)
          </button>
        </div>
      </div>

      {/* Main 4 Key Macronutrient Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Calories Card */}
        <div className="p-4 rounded-xl bg-[#FFF9F0] border border-[#F8CD78] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D75D17]">
              Energy / Calories
            </span>
            <Flame className="w-3.5 h-3.5 text-[#E97520]" />
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial">
              {displayCalories}
              <span className="text-xs sm:text-sm font-sans font-normal text-[#77736D] ml-1">
                kcal
              </span>
            </div>
            <span className="text-[11px] text-[#77736D] block">
              {isTotal ? `All ${effectiveServings} servings` : "Per serving"}
            </span>
          </div>
          <div className="text-[10px] font-medium text-[#D75D17] border-t border-[#F8CD78]/60 pt-1.5 flex items-center justify-between">
            <span>Daily Value</span>
            <span className="font-bold">
              {Math.round((displayCalories / 2000) * 100)}% DV
            </span>
          </div>
        </div>

        {/* 2. Protein Card */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Protein
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-white/80 px-1.5 py-0.5 rounded border border-emerald-200">
              {nutritionSummary.macroPercentages.proteinPercent}% cals
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif-editorial">
              {displayProtein}
              <span className="text-xs sm:text-sm font-sans font-normal text-emerald-700 ml-0.5">
                g
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 block">
              Lean halal meats &amp; legumes
            </span>
          </div>
          <div className="text-[10px] font-medium text-emerald-800 border-t border-emerald-200/70 pt-1.5 flex items-center justify-between">
            <span>Daily Value</span>
            <span className="font-bold">
              {Math.round((displayProtein / 50) * 100)}% DV
            </span>
          </div>
        </div>

        {/* 3. Total Fat Card */}
        <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800">
              Total Fat
            </span>
            <span className="text-[10px] font-bold text-orange-700 bg-white/80 px-1.5 py-0.5 rounded border border-orange-200">
              {nutritionSummary.macroPercentages.fatPercent}% cals
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-orange-950 font-serif-editorial">
              {displayFat}
              <span className="text-xs sm:text-sm font-sans font-normal text-orange-700 ml-0.5">
                g
              </span>
            </div>
            <span className="text-[11px] text-orange-700 block">
              Pure ghee, olive oil &amp; natural fats
            </span>
          </div>
          <div className="text-[10px] font-medium text-orange-800 border-t border-orange-200/70 pt-1.5 flex items-center justify-between">
            <span>Daily Value</span>
            <span className="font-bold">
              {Math.round((displayFat / 78) * 100)}% DV
            </span>
          </div>
        </div>

        {/* 4. Carbohydrates Card */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Carbohydrates
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-white/80 px-1.5 py-0.5 rounded border border-amber-200">
              {nutritionSummary.macroPercentages.carbsPercent}% cals
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif-editorial">
              {displayCarbs}
              <span className="text-xs sm:text-sm font-sans font-normal text-amber-700 ml-0.5">
                g
              </span>
            </div>
            <span className="text-[11px] text-amber-700 block">
              Grains, lentils &amp; aromatics
            </span>
          </div>
          <div className="text-[10px] font-medium text-amber-800 border-t border-amber-200/70 pt-1.5 flex items-center justify-between">
            <span>Daily Value</span>
            <span className="font-bold">
              {Math.round((displayCarbs / 275) * 100)}% DV
            </span>
          </div>
        </div>
      </div>

      {/* Visual Macro Distribution Ratio Bar */}
      <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <span className="font-bold text-[#30302F] flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-[#E97520]" />
            Macronutrient Calorie Ratio
          </span>
          <span className="text-[11px] text-[#77736D]">
            Protein: 4 kcal/g &bull; Fat: 9 kcal/g &bull; Carbs: 4 kcal/g
          </span>
        </div>

        {/* Triple-color Progress bar */}
        <div className="h-3 w-full bg-[#E6E1D8] rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${nutritionSummary.macroPercentages.proteinPercent}%` }}
            className="bg-emerald-600 h-full transition-all duration-300"
            title={`Protein: ${nutritionSummary.macroPercentages.proteinPercent}%`}
          />
          <div
            style={{ width: `${nutritionSummary.macroPercentages.carbsPercent}%` }}
            className="bg-amber-500 h-full transition-all duration-300"
            title={`Carbohydrates: ${nutritionSummary.macroPercentages.carbsPercent}%`}
          />
          <div
            style={{ width: `${nutritionSummary.macroPercentages.fatPercent}%` }}
            className="bg-orange-500 h-full transition-all duration-300"
            title={`Fat: ${nutritionSummary.macroPercentages.fatPercent}%`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#4D4943]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
            <span>
              Protein: <strong>{nutritionSummary.macroPercentages.proteinPercent}%</strong> ({displayProtein}g)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
            <span>
              Fat: <strong>{nutritionSummary.macroPercentages.fatPercent}%</strong> ({displayFat}g)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span>
              Carbs: <strong>{nutritionSummary.macroPercentages.carbsPercent}%</strong> ({displayCarbs}g)
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info & Micronutrient Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F6] border border-[#E6E1D8] text-[11px] text-[#4D4943] font-medium">
            <span className="font-bold text-[#30302F]">Dietary Fiber:</span> {displayFiber}g
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F6] border border-[#E6E1D8] text-[11px] text-[#4D4943] font-medium">
            <span className="font-bold text-[#30302F]">Sodium:</span> {displaySodium}mg
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-700" />
            100% Halal Verified
          </span>
        </div>

        <button
          type="button"
          onClick={scrollToFullBreakdown}
          className="text-xs text-[#E97520] hover:text-[#D75D17] font-bold inline-flex items-center gap-1 cursor-pointer transition-colors self-start sm:self-auto"
        >
          <span>Full Ingredient Breakdown</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
