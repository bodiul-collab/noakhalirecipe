import React, { useState, useMemo } from "react";
import {
  ArrowLeftRight,
  Scale,
  Sparkles,
  Info,
  Check,
  Copy,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Flame,
  HelpCircle,
} from "lucide-react";
import {
  KITCHEN_UNITS,
  KITCHEN_INGREDIENTS,
  KitchenIngredient,
  UnitDefinition,
} from "../data/kitchenIngredients";
import {
  convertKitchenMeasurement,
  POPULAR_CONVERSION_PRESETS,
  QuickPreset,
} from "../utils/kitchenConverter";

export const KitchenConversionTool: React.FC = () => {
  // Main state
  const [amount, setAmount] = useState<number>(1);
  const [fromUnitId, setFromUnitId] = useState<string>("cup");
  const [toUnitId, setToUnitId] = useState<string>("g");
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("all_purpose_flour");

  // Filter / Category state for ingredient picker
  const [ingredientCategory, setIngredientCategory] = useState<string>("all");
  const [ingredientSearch, setIngredientSearch] = useState<string>("");

  // UI toggles
  const [showFormulaBreakdown, setShowFormulaBreakdown] = useState<boolean>(true);
  const [showReferenceTable, setShowReferenceTable] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Quick unit mode filter (All, Weight-Weight, Volume-Volume, Vol-Weight)
  const [conversionFilter, setConversionFilter] = useState<"all" | "vol_to_wt" | "wt_to_vol" | "pure_wt" | "pure_vol">("all");

  // Active units & ingredients
  const fromUnit = useMemo(
    () => KITCHEN_UNITS.find((u) => u.id === fromUnitId) || KITCHEN_UNITS[0],
    [fromUnitId]
  );
  const toUnit = useMemo(
    () => KITCHEN_UNITS.find((u) => u.id === toUnitId) || KITCHEN_UNITS[4],
    [toUnitId]
  );
  const activeIngredient = useMemo(
    () =>
      KITCHEN_INGREDIENTS.find((i) => i.id === selectedIngredientId) ||
      KITCHEN_INGREDIENTS[0],
    [selectedIngredientId]
  );

  // Calculate live conversion
  const conversion = useMemo(() => {
    return convertKitchenMeasurement(
      amount,
      fromUnitId,
      toUnitId,
      selectedIngredientId
    );
  }, [amount, fromUnitId, toUnitId, selectedIngredientId]);

  // Swap units handler
  const handleSwapUnits = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  // Apply preset handler
  const handleApplyPreset = (preset: QuickPreset) => {
    setAmount(preset.amount);
    setFromUnitId(preset.fromUnit);
    setToUnitId(preset.toUnit);
    setSelectedIngredientId(preset.ingredientId);
  };

  // Copy result to clipboard
  const handleCopy = () => {
    const text = `${amount} ${fromUnit.name} of ${activeIngredient.name} = ${conversion.formattedResult} ${toUnit.name}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filtered ingredients for the dropdown/selector
  const filteredIngredients = useMemo(() => {
    return KITCHEN_INGREDIENTS.filter((item) => {
      const matchesCategory =
        ingredientCategory === "all" || item.category === ingredientCategory;
      const matchesSearch =
        !ingredientSearch.trim() ||
        item.name.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(ingredientSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [ingredientCategory, ingredientSearch]);

  const isCrossType = fromUnit.type !== toUnit.type;

  return (
    <div className="bg-white rounded-xl border border-[#E6E1D8] p-5 sm:p-8 space-y-7 shadow-xs">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F3F2EE]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFF9F0] border border-[#F8CD78] flex items-center justify-center text-[#E97520]">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242423] font-serif-editorial">
              Kitchen Measurement &amp; Density Converter
            </h2>
          </div>
          <p className="text-xs text-[#77736D] mt-1 max-w-2xl leading-relaxed">
            Convert seamlessly between Imperial and Metric units (e.g. grams to ounces, milliliters to cups, or cups to grams) with calibrated culinary densities for common baking &amp; cooking ingredients.
          </p>
        </div>

        {/* Reference Cheat Sheet Toggle Button */}
        <button
          type="button"
          onClick={() => setShowReferenceTable(!showReferenceTable)}
          className="text-xs font-bold text-[#30302F] bg-[#FAF9F6] border border-[#E6E1D8] hover:bg-[#F3F2EE] px-3.5 py-2 rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#E97520]" />
          <span>{showReferenceTable ? "Hide Cheat Sheet" : "Ingredient Density Matrix"}</span>
          {showReferenceTable ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#77736D]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#77736D]" />
          )}
        </button>
      </div>

      {/* Popular Presets Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A857E] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#E97520]" />
            Popular Quick Conversions:
          </span>
          <span className="text-[11px] text-[#77736D] hidden sm:inline">
            Click to load into calculator
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {POPULAR_CONVERSION_PRESETS.map((p) => {
            const isActive =
              amount === p.amount &&
              fromUnitId === p.fromUnit &&
              toUnitId === p.toUnit &&
              selectedIngredientId === p.ingredientId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-[#30302F] text-white border-[#30302F] shadow-xs"
                    : "bg-[#FAF9F6] text-[#3F3C38] border-[#E6E1D8] hover:bg-[#FFF9F0] hover:border-[#F8CD78]"
                }`}
              >
                <span>{p.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#F3F2EE] text-[#E97520]"
                  }`}
                >
                  {p.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Conversion Stage Container */}
      <div className="bg-[#FAF9F6] p-5 sm:p-6 rounded-xl border border-[#E6E1D8] space-y-5">
        {/* Ingredient Picker Row */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <label className="text-xs font-bold text-[#30302F] uppercase tracking-wider flex items-center gap-1">
              Select Ingredient
              {isCrossType ? (
                <span className="text-[10px] font-normal text-[#E97520] normal-case bg-[#FFF9F0] border border-[#F8CD78]/60 px-2 py-0.5 rounded">
                  Required for Volume ↔ Weight calculations
                </span>
              ) : (
                <span className="text-[10px] font-normal text-[#77736D] normal-case">
                  (Density: {activeIngredient.densityGPerMl} g/ml &bull; 1 Cup = {activeIngredient.cupWeightG}g)
                </span>
              )}
            </label>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
              {[
                { id: "all", label: "All" },
                { id: "flour", label: "Flours & Starches" },
                { id: "sugar", label: "Sugars & Syrups" },
                { id: "fat", label: "Ghee & Oils" },
                { id: "grain", label: "Grains & Pulses" },
                { id: "dairy", label: "Dairy & Liquids" },
                { id: "spice", label: "Salts & Spices" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setIngredientCategory(cat.id)}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    ingredientCategory === cat.id
                      ? "bg-[#30302F] text-white font-bold"
                      : "text-[#77736D] hover:bg-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedIngredientId}
              onChange={(e) => setSelectedIngredientId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E6E1D8] rounded-lg text-sm text-[#242423] font-medium focus:outline-none focus:border-[#30302F] shadow-2xs"
            >
              {filteredIngredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name} &mdash; (1 Cup = {ing.cupWeightG}g &bull; 1 Tbsp = {ing.tbspWeightG}g)
                </option>
              ))}
            </select>
          </div>

          {/* Active Ingredient Tip */}
          {activeIngredient.culinaryTip && (
            <div className="text-[11px] text-[#77736D] bg-white p-2.5 rounded-lg border border-[#E6E1D8] flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#E97520] shrink-0 mt-0.5" />
              <span>
                <strong>Chef's Measurement Tip:</strong> {activeIngredient.culinaryTip}
              </span>
            </div>
          )}
        </div>

        {/* Input Fields & Swap Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* 1. Amount Input (4 cols) */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold text-[#30302F] uppercase tracking-wider">
              Amount to Convert
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.01"
                step="0.25"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E6E1D8] rounded-lg text-base font-bold text-[#242423] focus:outline-none focus:border-[#30302F] shadow-2xs"
                placeholder="1.0"
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                {[0.5, 1, 2].map((stepVal) => (
                  <button
                    key={stepVal}
                    type="button"
                    onClick={() => setAmount((prev) => Math.max(0.25, prev + stepVal))}
                    className="px-1.5 py-0.5 text-[10px] bg-[#FAF9F6] border border-[#E6E1D8] hover:bg-[#F3F2EE] rounded text-[#77736D] cursor-pointer"
                  >
                    +{stepVal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. From Unit (3 cols) */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-bold text-[#30302F] uppercase tracking-wider">
              From Unit
            </label>
            <select
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#E6E1D8] rounded-lg text-xs sm:text-sm font-medium text-[#242423] focus:outline-none focus:border-[#30302F] shadow-2xs"
            >
              <optgroup label="Metric Weight / Mass">
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
              </optgroup>
              <optgroup label="Imperial Weight">
                <option value="oz">Ounces (oz)</option>
                <option value="lb">Pounds (lb)</option>
              </optgroup>
              <optgroup label="Metric Volume">
                <option value="ml">Milliliters (ml)</option>
                <option value="liter">Liters (L)</option>
                <option value="metric_cup">Metric Cups (250 ml)</option>
              </optgroup>
              <optgroup label="Imperial / US Volume">
                <option value="cup">US Cups (cup)</option>
                <option value="tbsp">Tablespoons (tbsp)</option>
                <option value="tsp">Teaspoons (tsp)</option>
                <option value="fl_oz">Fluid Ounces (fl oz)</option>
                <option value="pt">Pints (pt)</option>
                <option value="qt">Quarts (qt)</option>
              </optgroup>
            </select>
          </div>

          {/* 3. Swap Button (2 cols) */}
          <div className="md:col-span-2 flex justify-center py-1">
            <button
              type="button"
              onClick={handleSwapUnits}
              title="Swap units"
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-[#E6E1D8] hover:border-[#30302F] hover:bg-[#F3F2EE] text-[#30302F] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeftRight className="w-4 h-4 text-[#E97520]" />
              <span className="inline md:hidden">Swap Units</span>
            </button>
          </div>

          {/* 4. To Unit (3 cols) */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-bold text-[#30302F] uppercase tracking-wider">
              To Unit
            </label>
            <select
              value={toUnitId}
              onChange={(e) => setToUnitId(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#E6E1D8] rounded-lg text-xs sm:text-sm font-medium text-[#242423] focus:outline-none focus:border-[#30302F] shadow-2xs"
            >
              <optgroup label="Metric Weight / Mass">
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
              </optgroup>
              <optgroup label="Imperial Weight">
                <option value="oz">Ounces (oz)</option>
                <option value="lb">Pounds (lb)</option>
              </optgroup>
              <optgroup label="Metric Volume">
                <option value="ml">Milliliters (ml)</option>
                <option value="liter">Liters (L)</option>
                <option value="metric_cup">Metric Cups (250 ml)</option>
              </optgroup>
              <optgroup label="Imperial / US Volume">
                <option value="cup">US Cups (cup)</option>
                <option value="tbsp">Tablespoons (tbsp)</option>
                <option value="tsp">Teaspoons (tsp)</option>
                <option value="fl_oz">Fluid Ounces (fl oz)</option>
                <option value="pt">Pints (pt)</option>
                <option value="qt">Quarts (qt)</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Quick Stepper Presets for Amount */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#77736D] pt-1">
          <span className="font-bold text-[#30302F]">Common Portions:</span>
          {[0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAmount(v)}
              className={`px-2 py-0.5 rounded border text-[11px] font-mono transition-colors cursor-pointer ${
                amount === v
                  ? "bg-[#E97520] text-white border-[#E97520] font-bold"
                  : "bg-white border-[#E6E1D8] text-[#3F3C38] hover:bg-[#F3F2EE]"
              }`}
            >
              {v}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount(1)}
            className="text-[11px] underline ml-2 cursor-pointer hover:text-[#30302F]"
          >
            Reset to 1
          </button>
        </div>
      </div>

      {/* Converted Equivalent Showcase Card */}
      <div className="p-6 sm:p-7 bg-[#FFF9F0] rounded-xl border border-[#F8CD78] space-y-3 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs uppercase font-bold text-[#D75D17] tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
            Converted Equivalent &bull; {activeIngredient.name}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-bold text-[#30302F] bg-white border border-[#F8CD78] hover:bg-[#FAF9F6] px-3 py-1 rounded flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#77736D]" />
                <span>Copy Result</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Result Typography */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 pt-1">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#242423] font-serif-editorial">
            {amount} {fromUnit.shortName} = {conversion.formattedResult}{" "}
            <span className="text-2xl sm:text-3xl lg:text-4xl text-[#D75D17]">
              {toUnit.shortName}
            </span>
          </div>
        </div>

        {/* Supplementary Badges (Fractions & Practical Scoops) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {conversion.fractionalResult && (
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#F8CD78] text-xs font-bold text-[#242423] shadow-2xs">
              Kitchen Fraction:{" "}
              <span className="font-mono text-[#D75D17] text-sm">
                {conversion.fractionalResult} {toUnit.shortName}
              </span>
            </span>
          )}

          {conversion.approxKitchenScoop && (
            <span className="px-2.5 py-1 rounded-md bg-white/90 border border-[#F8CD78] text-xs text-[#30302F]">
              Scoop Measure:{" "}
              <strong className="text-[#30302F]">
                {conversion.approxKitchenScoop}
              </strong>
            </span>
          )}

          <span className="px-2.5 py-1 rounded-md bg-amber-100/70 text-amber-900 border border-amber-200 text-xs">
            Type:{" "}
            {conversion.conversionType === "volume-to-weight"
              ? "Volume → Mass (Density Applied)"
              : conversion.conversionType === "weight-to-volume"
              ? "Mass → Volume (Density Applied)"
              : conversion.conversionType === "volume-to-volume"
              ? "Pure Liquid / Volume"
              : "Pure Weight / Mass"}
          </span>
        </div>

        {/* Calculation Formula Breakdown Accordion */}
        <div className="pt-3 border-t border-[#F8CD78]/60 text-xs text-[#4D4943] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#77736D]">
            <span>Formula:</span>
            <span className="text-[#242423] bg-white px-2 py-0.5 rounded border border-[#F8CD78]/60">
              {conversion.formulaExplanation}
            </span>
          </div>

          <div className="text-[11px] text-[#77736D]">
            Based on USDA standard density coefficients
          </div>
        </div>
      </div>

      {/* Collapsible Reference Matrix / Cheat Sheet */}
      {showReferenceTable && (
        <div className="bg-[#FAF9F6] p-5 sm:p-6 rounded-xl border border-[#E6E1D8] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                Common Ingredients Density &amp; Weight Reference
              </h3>
              <p className="text-xs text-[#77736D]">
                Standard weights per cup, tablespoon, and teaspoon. Click any row to load it into the converter.
              </p>
            </div>

            {/* Matrix Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Filter ingredients..."
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E6E1D8] rounded-md focus:outline-none focus:border-[#30302F]"
              />
              <Search className="w-3.5 h-3.5 text-[#8A857E] absolute right-2.5 top-2" />
            </div>
          </div>

          <div className="overflow-x-auto border border-[#E6E1D8] rounded-lg bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F3F2EE] border-b border-[#E6E1D8] text-[10px] font-bold uppercase tracking-wider text-[#77736D]">
                  <th className="p-3">Ingredient</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">1 US Cup (grams)</th>
                  <th className="p-3">1 US Cup (oz)</th>
                  <th className="p-3">1 Tbsp (g)</th>
                  <th className="p-3">1 Tsp (g)</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F2EE]">
                {filteredIngredients.map((item) => {
                  const isSelected = item.id === selectedIngredientId;
                  const cupOz = (item.cupWeightG / 28.3495).toFixed(1);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-[#FFF9F0]/60 transition-colors ${
                        isSelected ? "bg-[#FFF9F0]" : ""
                      }`}
                    >
                      <td className="p-3 font-semibold text-[#242423]">
                        {item.name}
                        {item.culinaryTip && (
                          <span className="block text-[10px] text-[#77736D] font-normal mt-0.5">
                            {item.culinaryTip}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-[#77736D] capitalize">{item.category}</td>
                      <td className="p-3 font-mono font-bold text-[#30302F]">
                        {item.cupWeightG}g
                      </td>
                      <td className="p-3 font-mono text-[#77736D]">{cupOz} oz</td>
                      <td className="p-3 font-mono text-[#30302F]">{item.tbspWeightG}g</td>
                      <td className="p-3 font-mono text-[#30302F]">{item.tspWeightG}g</td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedIngredientId(item.id);
                            setFromUnitId("cup");
                            setToUnitId("g");
                            setAmount(1);
                            window.scrollTo({ top: 250, behavior: "smooth" });
                          }}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#30302F] text-white"
                              : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE]"
                          }`}
                        >
                          {isSelected ? "Selected" : "Use in Converter"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
