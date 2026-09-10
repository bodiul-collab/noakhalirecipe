import React, { useState, useMemo } from "react";
import {
  Printer,
  X,
  Check,
  Flame,
  ShieldCheck,
  ChefHat,
  Clock,
  Users,
  Image as ImageIcon,
  Minus,
  Plus,
  Scale,
  Sparkles,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Recipe } from "../types";
import { calculateNutritionForPortion } from "../utils/nutritionEstimator";
import {
  openPrintWindow,
  downloadPrintableHtml,
  triggerBrowserPrint,
  isRunningInIframe,
  PrintOptions,
} from "../utils/printableRecipeGenerator";

interface PrintRecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  initialServingsMultiplier?: number;
}

export const PrintRecipeModal: React.FC<PrintRecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
  initialServingsMultiplier = 1.0,
}) => {
  const [includeImage, setIncludeImage] = useState<boolean>(true);
  const [includeNutrition, setIncludeNutrition] = useState<boolean>(true);
  const [includeChefNotes, setIncludeChefNotes] = useState<boolean>(true);
  const [includeHalalNotes, setIncludeHalalNotes] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<"compact" | "normal" | "large">("normal");
  const [multiplier, setMultiplier] = useState<number>(initialServingsMultiplier);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  const scaledServings = Math.round(recipe.servings * multiplier);
  const inIframe = isRunningInIframe();

  // Helper to scale ingredient amounts
  const scaleAmount = (amountStr: string, mult: number): string => {
    const num = parseFloat(amountStr);
    if (isNaN(num)) return amountStr;
    const scaled = num * mult;
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
  };

  // Dynamic nutrition summary for the scaled portion
  const nutrition = useMemo(() => {
    return calculateNutritionForPortion(recipe, multiplier);
  }, [recipe, multiplier]);

  const currentOptions: PrintOptions = useMemo(
    () => ({
      multiplier,
      includeImage,
      includeNutrition,
      includeChefNotes,
      includeHalalNotes,
      fontSize,
    }),
    [multiplier, includeImage, includeNutrition, includeChefNotes, includeHalalNotes, fontSize]
  );

  if (!isOpen) return null;

  const handleTriggerPrint = () => {
    setFeedbackMsg("Launching print dialog...");
    const result = triggerBrowserPrint(recipe, currentOptions);
    if (result.openedNewTab) {
      setFeedbackMsg("Opened print-ready page in a new tab with print dialog!");
    } else {
      setFeedbackMsg("Print dialog opened!");
    }
    setTimeout(() => setFeedbackMsg(""), 5000);
  };

  const handleOpenNewTab = () => {
    openPrintWindow(recipe, currentOptions);
    setFeedbackMsg("Opened in clean print tab!");
    setTimeout(() => setFeedbackMsg(""), 4000);
  };

  const handleDownload = () => {
    downloadPrintableHtml(recipe, currentOptions);
    setFeedbackMsg("Downloaded printable HTML file to your computer!");
    setTimeout(() => setFeedbackMsg(""), 4000);
  };

  const fontSizeClass =
    fontSize === "compact"
      ? "text-xs"
      : fontSize === "large"
      ? "text-base"
      : "text-sm";

  return (
    <div
      id="print-recipe-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex flex-col items-center justify-start p-2 sm:p-6"
    >
      {/* Non-Printing Toolbar */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl border border-[#E6E1D8] mb-4 p-4 sm:p-5 print:hidden sticky top-2 z-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E6E1D8]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#30302F] flex items-center justify-center text-white">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#242423] text-base font-serif-editorial">
                Print-Friendly Recipe Preview
              </h3>
              <p className="text-xs text-[#77736D]">
                Customized for home cooking binders &amp; kitchen fridge stands.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerPrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E97520] hover:bg-[#D75D17] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
              title="Trigger browser print dialog"
            >
              <Printer className="w-4 h-4" />
              Print Recipe Now
            </button>

            <button
              onClick={handleOpenNewTab}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] text-[#30302F] rounded-lg text-xs font-semibold transition-all cursor-pointer"
              title="Open print-ready version in a fresh browser tab (bypasses iframe restrictions)"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#77736D]" />
              Open in New Tab
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] text-[#30302F] rounded-lg text-xs font-semibold transition-all cursor-pointer"
              title="Download standalone printable recipe HTML file"
            >
              <Download className="w-3.5 h-3.5 text-[#77736D]" />
              Save File
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] hover:bg-[#F3F2EE] text-[#77736D] hover:text-[#30302F] cursor-pointer"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback / Iframe Alert Bar */}
        {(feedbackMsg || inIframe) && (
          <div className="text-xs rounded-lg p-2.5 flex items-center justify-between gap-3 bg-[#FFF9F0] border border-[#F8CD78]/60 text-[#8A4F1D]">
            <div className="flex items-center gap-2">
              <span className="font-bold">Notice:</span>
              <span>
                {feedbackMsg ||
                  "Running inside preview mode. If your browser restricts popups or printer dialogs, use 'Open in New Tab' or 'Save File'."}
              </span>
            </div>
            {!feedbackMsg && (
              <button
                onClick={handleOpenNewTab}
                className="underline font-bold text-[#E97520] hover:text-[#D75D17] shrink-0 cursor-pointer"
              >
                Launch New Tab &rarr;
              </button>
            )}
          </div>
        )}

        {/* Print Configuration Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Servings Scaler */}
          <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] flex items-center justify-between">
            <span className="text-[#77736D] font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#E97520]" />
              Servings:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMultiplier((m) => Math.max(0.5, m - 0.5))}
                className="w-6 h-6 rounded bg-white border border-[#E6E1D8] flex items-center justify-center font-bold text-[#30302F] hover:bg-[#F3F2EE]"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center font-bold text-[#30302F]">
                {scaledServings}
              </span>
              <button
                onClick={() => setMultiplier((m) => Math.min(4, m + 0.5))}
                className="w-6 h-6 rounded bg-white border border-[#E6E1D8] flex items-center justify-center font-bold text-[#30302F] hover:bg-[#F3F2EE]"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Text Size */}
          <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] flex items-center justify-between">
            <span className="text-[#77736D] font-medium">Text Size:</span>
            <div className="flex items-center gap-1">
              {(["compact", "normal", "large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize transition-colors ${
                    fontSize === size
                      ? "bg-[#30302F] text-white"
                      : "bg-white text-[#77736D] border border-[#E6E1D8]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Include Image Toggle */}
          <label className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeImage}
              onChange={(e) => setIncludeImage(e.target.checked)}
              className="rounded text-[#E97520] focus:ring-[#E97520] cursor-pointer"
            />
            <span className="text-[#30302F] font-medium flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-[#77736D]" />
              Recipe Photo (Color Ink)
            </span>
          </label>

          {/* Include Nutrition Breakdown Toggle */}
          <label className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNutrition}
              onChange={(e) => setIncludeNutrition(e.target.checked)}
              className="rounded text-[#E97520] focus:ring-[#E97520] cursor-pointer"
            />
            <span className="text-[#30302F] font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#E97520]" />
              Nutritional Breakdown
            </span>
          </label>
        </div>

        {/* Secondary Toggles */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-[#77736D]">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHalalNotes}
              onChange={(e) => setIncludeHalalNotes(e.target.checked)}
              className="rounded text-[#E97520] focus:ring-[#E97520]"
            />
            <span>Include Halal Verification Notes</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeChefNotes}
              onChange={(e) => setIncludeChefNotes(e.target.checked)}
              className="rounded text-[#E97520] focus:ring-[#E97520]"
            />
            <span>Include Chef's Secrets &amp; Tips</span>
          </label>
          <span className="text-[11px] text-[#8A857E] ml-auto">
            💡 Navigation, sidebars, and advertising are stripped automatically.
          </span>
        </div>
      </div>

      {/* Printable Sheet (The exact paper page layout) */}
      <div
        id="printable-recipe-sheet"
        className={`w-full max-w-4xl bg-white rounded-lg shadow-xl print:shadow-none print:m-0 print:p-0 print:border-none p-8 sm:p-12 text-[#242423] space-y-6 ${fontSizeClass}`}
      >
        {/* Printable Header Bar */}
        <header className="pb-4 border-b-2 border-[#242423] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight uppercase font-brand-display text-[#E97520]">
                Noakhali Kitchen
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                100% Halal Verified
              </span>
            </div>
            <p className="text-xs text-[#77736D] mt-0.5">
              Authentic Halal Home Cooking &bull; https://noakhalikitchen.com/recipes/{recipe.slug}
            </p>
          </div>

          <div className="text-left sm:text-right text-[11px] text-[#77736D]">
            <div>Printed: {new Date().toLocaleDateString(undefined, { dateStyle: "medium" })}</div>
            <div className="font-semibold text-emerald-700">Strictly Pork &amp; Alcohol Free</div>
          </div>
        </header>

        {/* Recipe Title & Overview */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#E97520]">
            {recipe.category} &bull; {recipe.cuisine} &bull; Difficulty: {recipe.difficulty}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#242423] leading-tight">
            {recipe.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#55524E] leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Optional Recipe Photo (can be toggled off for ink saving) */}
        {includeImage && (
          <div className="w-full max-h-72 rounded-lg overflow-hidden border border-[#E6E1D8] bg-[#FAF9F6]">
            <img
              src={recipe.heroImage}
              alt={recipe.title}
              className="w-full h-full object-cover max-h-72"
            />
          </div>
        )}

        {/* Cooking Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] text-center text-xs">
          <div>
            <span className="text-[#77736D] block text-[10px] font-bold uppercase tracking-wider">
              Prep Time
            </span>
            <span className="font-bold text-[#242423] text-sm">
              {recipe.prepTimeMinutes} mins
            </span>
          </div>
          <div>
            <span className="text-[#77736D] block text-[10px] font-bold uppercase tracking-wider">
              Cook Time
            </span>
            <span className="font-bold text-[#242423] text-sm">
              {recipe.cookTimeMinutes} mins
            </span>
          </div>
          <div>
            <span className="text-[#77736D] block text-[10px] font-bold uppercase tracking-wider">
              Total Time
            </span>
            <span className="font-bold text-[#242423] text-sm">
              {recipe.totalTimeMinutes} mins
            </span>
          </div>
          <div>
            <span className="text-[#77736D] block text-[10px] font-bold uppercase tracking-wider">
              Servings
            </span>
            <span className="font-bold text-[#E97520] text-sm">
              {scaledServings} {scaledServings === 1 ? "Person" : "Servings"}
              {multiplier !== 1 && ` (${multiplier}x)`}
            </span>
          </div>
        </div>

        {/* Halal Verification Notes (If checked) */}
        {includeHalalNotes && Boolean(recipe.halalNotes) && (
          <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Halal Verification &amp; Sourcing Checklist:</span>
            </div>
            {Array.isArray(recipe.halalNotes) ? (
              <ul className="list-disc list-inside text-emerald-950 space-y-0.5 text-[11px]">
                {(recipe.halalNotes as string[]).map((note: string, i: number) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            ) : (
              <p className="text-emerald-950 text-[11px] leading-relaxed">
                {recipe.halalNotes}
              </p>
            )}
          </div>
        )}

        {/* Ingredients List with Checkboxes */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-1.5">
            <h2 className="text-lg font-bold text-[#242423] font-serif-editorial flex items-center gap-1.5">
              <span>Ingredients</span>
              <span className="text-xs font-normal text-[#77736D]">
                ({scaledServings} Servings)
              </span>
            </h2>
            <span className="text-[10px] text-[#77736D] italic">
              [ ] Check box as prepped
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
            {recipe.ingredients.map((ing, idx) => {
              const displayAmount = scaleAmount(ing.amount, multiplier);
              return (
                <div
                  key={idx}
                  className="flex items-start gap-2 py-1 border-b border-dashed border-[#F0ECE1]"
                >
                  <span className="font-mono text-sm leading-none text-[#77736D] shrink-0 select-none">
                    &#9634;
                  </span>
                  <div>
                    <strong className="text-[#242423]">
                      {displayAmount} {ing.unit || ""}{" "}
                    </strong>
                    <span>{ing.name}</span>
                    {ing.notes && (
                      <span className="text-[11px] text-[#77736D] italic block">
                        ({ing.notes})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step-by-Step Instructions */}
        <section className="space-y-3 pt-4 border-t border-[#E6E1D8]">
          <h2 className="text-lg font-bold text-[#242423] font-serif-editorial border-b border-[#E6E1D8] pb-1.5">
            Step-by-Step Cooking Method
          </h2>

          <div className="space-y-3.5">
            {recipe.instructions.map((inst) => (
              <div
                key={inst.step}
                className="space-y-1 pb-2 border-b border-dashed border-[#F0ECE1] last:border-none"
              >
                <div className="font-bold text-xs text-[#E97520] uppercase tracking-wider">
                  Step {inst.step}: {inst.title}
                </div>
                <p className="text-xs sm:text-sm text-[#30302F] leading-relaxed">
                  {inst.instruction}
                </p>
                {inst.tip && (
                  <div className="text-[11px] text-[#D75D17] bg-[#FFF9F0] p-1.5 rounded border border-[#F8CD78]/60 mt-1">
                    <strong>Chef's Key Tip:</strong> {inst.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Chef's Notes (If checked) */}
        {includeChefNotes && recipe.chefNotes.length > 0 && (
          <section className="p-3.5 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] space-y-1.5 text-xs">
            <h3 className="font-bold text-[#242423] flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
              <ChefHat className="w-3.5 h-3.5 text-[#E97520]" />
              Authentic Kitchen Secrets
            </h3>
            <ul className="list-disc list-inside space-y-1 text-[#55524E] text-[11px]">
              {recipe.chefNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        {/* NUTRITIONAL BREAKDOWN & MACRO ESTIMATES */}
        {includeNutrition && (
          <section className="space-y-3 pt-4 border-t-2 border-[#242423]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#E6E1D8] pb-1.5">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#E97520]" />
                <h2 className="text-lg font-bold text-[#242423] font-serif-editorial">
                  Nutritional Breakdown &amp; Macro Estimator
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#77736D]">
                Basis: {nutrition.portionLabel} ({scaledServings} servings scale)
              </span>
            </div>

            {/* Core Macronutrient Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
              <div className="p-2.5 bg-[#FFF9F0] border border-[#F8CD78] rounded-lg">
                <span className="text-[#D75D17] block text-[9px] uppercase font-bold">
                  Calories
                </span>
                <span className="font-bold text-[#242423] text-base">
                  {nutrition.calories}
                </span>
                <span className="text-[9px] text-[#77736D] block">
                  {nutrition.dailyValuePercentages.calories}% DV
                </span>
              </div>

              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <span className="text-emerald-800 block text-[9px] uppercase font-bold">
                  Protein
                </span>
                <span className="font-bold text-emerald-950 text-base">
                  {nutrition.proteinGrams}g
                </span>
                <span className="text-[9px] text-emerald-700 block">
                  {nutrition.macroRatios.proteinPercent}% cals
                </span>
              </div>

              <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg">
                <span className="text-amber-800 block text-[9px] uppercase font-bold">
                  Carbs
                </span>
                <span className="font-bold text-amber-950 text-base">
                  {nutrition.carbsGrams}g
                </span>
                <span className="text-[9px] text-amber-700 block">
                  {nutrition.macroRatios.carbsPercent}% cals
                </span>
              </div>

              <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-lg">
                <span className="text-orange-800 block text-[9px] uppercase font-bold">
                  Total Fat
                </span>
                <span className="font-bold text-orange-950 text-base">
                  {nutrition.fatGrams}g
                </span>
                <span className="text-[9px] text-orange-700 block">
                  {nutrition.macroRatios.fatPercent}% cals
                </span>
              </div>

              <div className="p-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg">
                <span className="text-[#77736D] block text-[9px] uppercase font-bold">
                  Fiber
                </span>
                <span className="font-bold text-[#242423] text-base">
                  {nutrition.fiberGrams}g
                </span>
                <span className="text-[9px] text-[#8A857E] block">
                  {nutrition.dailyValuePercentages.fiber}% DV
                </span>
              </div>

              <div className="p-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg">
                <span className="text-[#77736D] block text-[9px] uppercase font-bold">
                  Sodium
                </span>
                <span className="font-bold text-[#242423] text-base">
                  {nutrition.sodiumMg}mg
                </span>
                <span className="text-[9px] text-[#8A857E] block">
                  {nutrition.dailyValuePercentages.sodium}% DV
                </span>
              </div>
            </div>

            {/* Macro Ratio Distribution Line */}
            <div className="p-2.5 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] text-[11px] text-[#55524E] flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-[#30302F]">Macro Ratio Split:</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-800 font-semibold">
                  Protein: {nutrition.macroRatios.proteinPercent}%
                </span>
                <span>&bull;</span>
                <span className="text-amber-800 font-semibold">
                  Carbs: {nutrition.macroRatios.carbsPercent}%
                </span>
                <span>&bull;</span>
                <span className="text-orange-800 font-semibold">
                  Fat: {nutrition.macroRatios.fatPercent}%
                </span>
              </div>
            </div>

            {/* Top Ingredient Contributors Table */}
            <div className="border border-[#E6E1D8] rounded-lg overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#FAF9F6] text-[#77736D] uppercase text-[9px] tracking-wider border-b border-[#E6E1D8]">
                  <tr>
                    <th className="py-1.5 px-3 font-bold">Key Ingredient</th>
                    <th className="py-1.5 px-2 font-bold">Category</th>
                    <th className="py-1.5 px-2 font-bold text-right">Est. Calories</th>
                    <th className="py-1.5 px-3 font-bold text-right">Primary Nutrients</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F2EE]">
                  {nutrition.ingredientBreakdown.slice(0, 8).map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-1.5 px-3 font-medium text-[#242423]">
                        {item.name}
                        <span className="text-[#8A857E] text-[10px] ml-1">
                          ({scaleAmount(item.amount, multiplier)} {item.unit || ""})
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-[#77736D]">{item.category}</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-[#30302F]">
                        ~{item.estimatedCalories} kcal
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono text-[10px] text-[#77736D]">
                        {item.proteinGrams}g P &bull; {item.carbsGrams}g C &bull; {item.fatGrams}g F
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="py-1.5 px-3 bg-[#FAF9F6] border-t border-[#E6E1D8] text-[10px] text-[#77736D] italic">
                * Estimated from baseline recipe nutritional database and culinary density coefficients. Daily values based on 2,000 kcal diet.
              </div>
            </div>
          </section>
        )}

        {/* Printable Footer */}
        <footer className="pt-4 border-t border-[#E6E1D8] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#77736D] gap-2">
          <span>
            Noakhali Kitchen &bull; Curated Halal Recipes &amp; Regional Food Heritage
          </span>
          <span>
            Visit online for video guides &amp; AI Assistant: https://noakhalikitchen.com
          </span>
        </footer>
      </div>
    </div>
  );
};
