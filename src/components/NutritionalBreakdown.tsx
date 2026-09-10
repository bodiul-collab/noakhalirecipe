import React, { useState, useMemo } from "react";
import {
  Flame,
  PieChart,
  Scale,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  Utensils,
} from "lucide-react";
import { Recipe } from "../types";
import {
  calculateNutritionForPortion,
  PORTION_PRESETS,
  IngredientNutrientEstimate,
} from "../utils/nutritionEstimator";

interface NutritionalBreakdownProps {
  recipe: Recipe;
}

export const NutritionalBreakdown: React.FC<NutritionalBreakdownProps> = ({ recipe }) => {
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");
  const [isIngredientsExpanded, setIsIngredientsExpanded] = useState<boolean>(true);

  // Compute breakdown dynamically based on selected portion
  const nutrition = useMemo(() => {
    return calculateNutritionForPortion(recipe, portionMultiplier);
  }, [recipe, portionMultiplier]);

  // Filtered ingredients
  const filteredIngredients = useMemo(() => {
    if (activeCategoryFilter === "All") return nutrition.ingredientBreakdown;
    return nutrition.ingredientBreakdown.filter(
      (item) => item.category === activeCategoryFilter
    );
  }, [nutrition.ingredientBreakdown, activeCategoryFilter]);

  const categories = ["All", "Protein", "Grains & Carbs", "Fats & Dairy", "Produce & Aromatics"];

  return (
    <div className="bg-white rounded-xl border border-[#E6E1D8] p-5 sm:p-7 space-y-6 shadow-xs">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F3F2EE]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#FFF9F0] border border-[#F8CD78] flex items-center justify-center text-[#E97520]">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
              Nutritional Breakdown &amp; Macro Estimator
            </h2>
          </div>
          <p className="text-xs text-[#77736D] mt-1">
            Dynamic calorie and macronutrient estimates calculated using recipe ingredient ratios and portion sizing.
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D7A52] bg-[#FAF9F6] border border-[#2D7A52]/20 px-2.5 py-1 rounded-full self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2D7A52]" />
          100% Pork &amp; Alcohol Free
        </span>
      </div>

      {/* Portion Size Selector */}
      <div className="space-y-3 bg-[#FAF9F6] p-4 sm:p-5 rounded-xl border border-[#E6E1D8] print:bg-white print:p-2.5 print:border-gray-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#E97520]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#30302F]">
              Portion Basis:
            </span>
            <span className="text-xs font-semibold text-[#E97520] bg-white px-2 py-0.5 rounded border border-[#E6E1D8]">
              {nutrition.portionLabel} ({nutrition.portionMultiplier.toFixed(2)}x)
            </span>
          </div>

          {/* Precision Stepper */}
          <div className="flex items-center gap-1 self-start sm:self-auto print:hidden">
            <span className="text-[11px] text-[#77736D] mr-1">Multiplier:</span>
            <button
              onClick={() => setPortionMultiplier((prev) => Math.max(0.5, Math.round((prev - 0.25) * 100) / 100))}
              disabled={portionMultiplier <= 0.5}
              className="w-6 h-6 rounded bg-white border border-[#E6E1D8] flex items-center justify-center text-xs font-bold text-[#30302F] disabled:opacity-40 hover:bg-[#F3F2EE] cursor-pointer"
              title="Decrease portion"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-mono text-xs font-bold px-2 text-[#30302F] min-w-[40px] text-center">
              {portionMultiplier.toFixed(2)}x
            </span>
            <button
              onClick={() => setPortionMultiplier((prev) => Math.min(2.5, Math.round((prev + 0.25) * 100) / 100))}
              disabled={portionMultiplier >= 2.5}
              className="w-6 h-6 rounded bg-white border border-[#E6E1D8] flex items-center justify-center text-xs font-bold text-[#30302F] disabled:opacity-40 hover:bg-[#F3F2EE] cursor-pointer"
              title="Increase portion"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Portion Preset Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 print:hidden">
          {PORTION_PRESETS.map((preset) => {
            const isSelected = Math.abs(preset.multiplier - portionMultiplier) < 0.05;
            return (
              <button
                key={preset.multiplier}
                onClick={() => setPortionMultiplier(preset.multiplier)}
                className={`px-3 py-2 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#30302F] text-white border-[#30302F] shadow-xs"
                    : "bg-white text-[#30302F] border-[#E6E1D8] hover:border-[#8A857E]"
                }`}
              >
                <div className="font-bold truncate">{preset.label}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? "text-[#F8CD78]" : "text-[#77736D]"}`}>
                  {preset.multiplier}x plate
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-[#77736D] italic">
          {nutrition.portionDescription}
        </p>
      </div>

      {/* Main Calories & Primary Macros Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Calories Card */}
        <div className="p-4 rounded-xl bg-[#FFF9F0] border border-[#F8CD78] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D75D17]">
              Energy
            </span>
            <Flame className="w-3.5 h-3.5 text-[#E97520]" />
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial">
              {nutrition.calories}
            </div>
            <span className="text-[10px] text-[#77736D]">kcal per portion</span>
          </div>
          <div className="text-[10px] font-medium text-[#D75D17] border-t border-[#F8CD78]/60 pt-1.5">
            {nutrition.dailyValuePercentages.calories}% Daily Value
          </div>
        </div>

        {/* Protein Card */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Protein
            </span>
            <span className="text-[10px] font-bold text-emerald-700">{nutrition.macroRatios.proteinPercent}% cals</span>
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif-editorial">
              {nutrition.proteinGrams}
              <span className="text-sm font-normal ml-0.5">g</span>
            </div>
            <span className="text-[10px] text-emerald-700">Muscle &amp; recovery</span>
          </div>
          <div className="text-[10px] font-medium text-emerald-800 border-t border-emerald-200/70 pt-1.5">
            {nutrition.dailyValuePercentages.protein}% Daily Value
          </div>
        </div>

        {/* Carbohydrates Card */}
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Carbs
            </span>
            <span className="text-[10px] font-bold text-amber-700">{nutrition.macroRatios.carbsPercent}% cals</span>
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif-editorial">
              {nutrition.carbsGrams}
              <span className="text-sm font-normal ml-0.5">g</span>
            </div>
            <span className="text-[10px] text-amber-700">Rice, lentils &amp; veg</span>
          </div>
          <div className="text-[10px] font-medium text-amber-800 border-t border-amber-200/70 pt-1.5">
            {nutrition.dailyValuePercentages.carbs}% Daily Value
          </div>
        </div>

        {/* Fats Card */}
        <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800">
              Total Fat
            </span>
            <span className="text-[10px] font-bold text-orange-700">{nutrition.macroRatios.fatPercent}% cals</span>
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-3xl font-bold text-orange-950 font-serif-editorial">
              {nutrition.fatGrams}
              <span className="text-sm font-normal ml-0.5">g</span>
            </div>
            <span className="text-[10px] text-orange-700">Ghee &amp; natural oils</span>
          </div>
          <div className="text-[10px] font-medium text-orange-800 border-t border-orange-200/70 pt-1.5">
            {nutrition.dailyValuePercentages.fat}% Daily Value
          </div>
        </div>
      </div>

      {/* Visual Macro Ratio Bar */}
      <div className="space-y-2 p-4 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8]">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#30302F] flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-[#77736D]" />
            Macronutrient Calorie Distribution
          </span>
          <span className="text-[11px] text-[#77736D]">
            Protein: 4 kcal/g &bull; Carbs: 4 kcal/g &bull; Fat: 9 kcal/g
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${nutrition.macroRatios.proteinPercent}%` }}
            className="bg-emerald-600 transition-all duration-300"
            title={`Protein: ${nutrition.macroRatios.proteinPercent}%`}
          />
          <div
            style={{ width: `${nutrition.macroRatios.carbsPercent}%` }}
            className="bg-amber-500 transition-all duration-300"
            title={`Carbohydrates: ${nutrition.macroRatios.carbsPercent}%`}
          />
          <div
            style={{ width: `${nutrition.macroRatios.fatPercent}%` }}
            className="bg-orange-500 transition-all duration-300"
            title={`Fat: ${nutrition.macroRatios.fatPercent}%`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] text-[#77736D]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            <span>Protein: <strong>{nutrition.macroRatios.proteinPercent}%</strong> ({nutrition.proteinGrams}g)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Carbohydrates: <strong>{nutrition.macroRatios.carbsPercent}%</strong> ({nutrition.carbsGrams}g)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
            <span>Fat: <strong>{nutrition.macroRatios.fatPercent}%</strong> ({nutrition.fatGrams}g)</span>
          </div>
        </div>
      </div>

      {/* Secondary Nutrients & Sodium Warning */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-white border border-[#E6E1D8] rounded-lg">
          <span className="text-[#77736D] block text-[10px] uppercase font-bold">Dietary Fiber</span>
          <span className="text-base font-bold text-[#30302F]">{nutrition.fiberGrams}g</span>
          <span className="text-[10px] text-[#8A857E] block mt-0.5">
            {nutrition.dailyValuePercentages.fiber}% Daily Value
          </span>
        </div>

        <div className="p-3 bg-white border border-[#E6E1D8] rounded-lg">
          <span className="text-[#77736D] block text-[10px] uppercase font-bold">Sodium</span>
          <span className="text-base font-bold text-[#30302F]">{nutrition.sodiumMg}mg</span>
          <span className="text-[10px] text-[#8A857E] block mt-0.5">
            {nutrition.dailyValuePercentages.sodium}% Daily Value
          </span>
        </div>

        <div className="p-3 bg-white border border-[#E6E1D8] rounded-lg">
          <span className="text-[#77736D] block text-[10px] uppercase font-bold">Total Servings in Pot</span>
          <span className="text-base font-bold text-[#30302F]">{recipe.servings} Servings</span>
          <span className="text-[10px] text-[#8A857E] block mt-0.5">
            {(recipe.servings / portionMultiplier).toFixed(1)} portions this size
          </span>
        </div>

        <div className="p-3 bg-white border border-[#E6E1D8] rounded-lg">
          <span className="text-[#77736D] block text-[10px] uppercase font-bold">Halal Standard</span>
          <span className="text-base font-bold text-[#2D7A52] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pure &amp; Tayyib
          </span>
          <span className="text-[10px] text-[#8A857E] block mt-0.5">Zero pork, lard, or wine</span>
        </div>
      </div>

      {/* Ingredient-Level Contribution Section */}
      <div className="space-y-3 pt-4 border-t border-[#F3F2EE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <button
              onClick={() => setIsIngredientsExpanded(!isIngredientsExpanded)}
              className="flex items-center gap-2 text-base font-bold text-[#242423] font-serif-editorial hover:text-[#E97520] cursor-pointer"
            >
              <span>Ingredient Calorie &amp; Macro Contribution</span>
              <span className="print:hidden">
                {isIngredientsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#77736D]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#77736D]" />
                )}
              </span>
            </button>
            <p className="text-xs text-[#77736D]">
              Breakdown of how each recipe ingredient contributes calories and nutrients to your {nutrition.portionLabel.toLowerCase()}.
            </p>
          </div>

          {/* Category Filter Chips */}
          {isIngredientsExpanded && (
            <div className="flex flex-wrap gap-1 print:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeCategoryFilter === cat
                      ? "bg-[#30302F] text-white"
                      : "bg-[#FAF9F6] text-[#77736D] hover:bg-[#F3F2EE] border border-[#E6E1D8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ingredients Table / List */}
        <div
          className={`${
            isIngredientsExpanded ? "block" : "hidden print:block"
          } border border-[#E6E1D8] print:border-gray-300 rounded-xl overflow-hidden bg-white`}
        >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] text-[#77736D] uppercase text-[10px] tracking-wider border-b border-[#E6E1D8]">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">Ingredient in Recipe</th>
                    <th className="py-2.5 px-3 font-bold">Category</th>
                    <th className="py-2.5 px-3 font-bold text-right">Est. Calories</th>
                    <th className="py-2.5 px-3 font-bold text-right">% Meal</th>
                    <th className="py-2.5 px-4 font-bold text-right">Primary Macros (P / C / F)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F2EE]">
                  {filteredIngredients.map((item, idx) => {
                    const badgeColor =
                      item.category === "Protein"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : item.category === "Grains & Carbs"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : item.category === "Fats & Dairy"
                        ? "bg-orange-50 text-orange-800 border-orange-200"
                        : "bg-stone-50 text-stone-700 border-stone-200";

                    return (
                      <tr key={idx} className="hover:bg-[#FAF9F6]/80 transition-colors">
                        <td className="py-2.5 px-4 font-medium text-[#30302F]">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-[#8A857E] text-[11px] block">
                            Recipe amount: {item.amount} {item.unit || ""}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${badgeColor}`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#30302F]">
                          ~{item.estimatedCalories} kcal
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <div className="w-12 bg-gray-100 rounded-full h-1.5 overflow-hidden hidden sm:block">
                              <div
                                style={{ width: `${Math.min(100, item.percentageOfTotal * 2)}%` }}
                                className="bg-[#E97520] h-full rounded-full"
                              />
                            </div>
                            <span className="text-[11px] font-mono text-[#77736D]">
                              {item.percentageOfTotal}%
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono text-[11px] text-[#77736D]">
                          <span className="text-emerald-700 font-semibold">{item.proteinGrams}g P</span> &bull;{" "}
                          <span className="text-amber-700 font-semibold">{item.carbsGrams}g C</span> &bull;{" "}
                          <span className="text-orange-700 font-semibold">{item.fatGrams}g F</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-[#FAF9F6] border-t border-[#E6E1D8] text-[11px] text-[#77736D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
              <span>
                💡 Values are nutritional approximations based on standard ingredient tables, trimmed cuts, and typical cooking absorption.
              </span>
              <span className="font-semibold text-[#30302F]">
                Reference: 2,000 kcal/day diet
              </span>
            </div>
          </div>
        </div>

      {/* Culinary Health & Dietary Guidance Note */}
      <div className="p-4 rounded-lg bg-[#FFF9F0] border border-[#F8CD78]/60 flex items-start gap-3 text-xs">
        <Sparkles className="w-4 h-4 text-[#E97520] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-[#30302F] block">
            Healthful Halal Preparation Advice:
          </strong>
          <p className="text-[#77736D] leading-relaxed">
            To tailor this dish for lighter calorie goals, consider measuring ghee or cooking oil with a tablespoon rather than free-pouring, or serve with a side of high-fiber cucumber-mint yogurt raita to enhance satiety without spiking carbohydrates.
          </p>
        </div>
      </div>
    </div>
  );
};
