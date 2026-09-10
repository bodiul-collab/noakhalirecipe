import {
  KitchenIngredient,
  UnitDefinition,
  KITCHEN_UNITS,
  KITCHEN_INGREDIENTS,
} from "../data/kitchenIngredients";

export interface ConversionResult {
  numericResult: number;
  formattedResult: string;
  fractionalResult?: string;
  approxKitchenScoop?: string;
  conversionType: "weight-to-weight" | "volume-to-volume" | "volume-to-weight" | "weight-to-volume";
  formulaExplanation: string;
  densityUsed: number;
}

/**
 * Converts kitchen values across Imperial and Metric systems,
 * seamlessly factoring in ingredient density for volume <-> weight transitions.
 */
export function convertKitchenMeasurement(
  amount: number,
  fromUnitId: string,
  toUnitId: string,
  ingredientId: string
): ConversionResult {
  const fromUnit = KITCHEN_UNITS.find((u) => u.id === fromUnitId) || KITCHEN_UNITS[0];
  const toUnit = KITCHEN_UNITS.find((u) => u.id === toUnitId) || KITCHEN_UNITS[4];
  const ingredient =
    KITCHEN_INGREDIENTS.find((i) => i.id === ingredientId) || KITCHEN_INGREDIENTS[0];

  const density = ingredient.densityGPerMl;
  let resultInToUnit = 0;
  let convType: ConversionResult["conversionType"] = "weight-to-weight";
  let explanation = "";

  if (amount <= 0 || isNaN(amount)) {
    return {
      numericResult: 0,
      formattedResult: "0",
      conversionType: "weight-to-weight",
      formulaExplanation: "Enter an amount greater than 0 to calculate.",
      densityUsed: density,
    };
  }

  // 1. Weight -> Weight
  if (fromUnit.type === "weight" && toUnit.type === "weight") {
    convType = "weight-to-weight";
    const grams = amount * fromUnit.baseFactor;
    resultInToUnit = grams / toUnit.baseFactor;
    explanation = `${amount} ${fromUnit.shortName} × ${fromUnit.baseFactor}g = ${formatCleanNumber(
      grams
    )}g ÷ ${toUnit.baseFactor}g = ${formatCleanNumber(resultInToUnit)} ${toUnit.shortName}`;
  }

  // 2. Volume -> Volume
  else if (fromUnit.type === "volume" && toUnit.type === "volume") {
    convType = "volume-to-volume";
    const ml = amount * fromUnit.baseFactor;
    resultInToUnit = ml / toUnit.baseFactor;
    explanation = `${amount} ${fromUnit.shortName} × ${fromUnit.baseFactor} ml = ${formatCleanNumber(
      ml
    )} ml ÷ ${toUnit.baseFactor} ml = ${formatCleanNumber(resultInToUnit)} ${toUnit.shortName}`;
  }

  // 3. Volume -> Weight (e.g. cups to grams, fl oz to ounces)
  else if (fromUnit.type === "volume" && toUnit.type === "weight") {
    convType = "volume-to-weight";
    const ml = amount * fromUnit.baseFactor;
    const grams = ml * density;
    resultInToUnit = grams / toUnit.baseFactor;
    explanation = `${amount} ${fromUnit.shortName} (${formatCleanNumber(ml)} ml) × ${density} g/ml (${ingredient.name}) = ${formatCleanNumber(grams)}g = ${formatCleanNumber(resultInToUnit)} ${toUnit.shortName}`;
  }

  // 4. Weight -> Volume (e.g. grams to cups, ounces to tbsp)
  else {
    convType = "weight-to-volume";
    const grams = amount * fromUnit.baseFactor;
    const ml = grams / density;
    resultInToUnit = ml / toUnit.baseFactor;
    explanation = `${amount} ${fromUnit.shortName} (${formatCleanNumber(grams)}g) ÷ ${density} g/ml (${ingredient.name}) = ${formatCleanNumber(ml)} ml = ${formatCleanNumber(resultInToUnit)} ${toUnit.shortName}`;
  }

  // Precision rules
  const formattedResult = formatCleanNumber(resultInToUnit);
  const fractional = formatKitchenFraction(resultInToUnit, toUnit.id);
  const approxKitchenScoop = getPracticalKitchenScoop(resultInToUnit, toUnit);

  return {
    numericResult: resultInToUnit,
    formattedResult,
    fractionalResult: fractional,
    approxKitchenScoop,
    conversionType: convType,
    formulaExplanation: explanation,
    densityUsed: density,
  };
}

/**
 * Formats a decimal number cleanly for kitchen readability
 */
export function formatCleanNumber(num: number): string {
  if (num === 0) return "0";
  if (num >= 100) return (Math.round(num * 10) / 10).toLocaleString("en-US", { maximumFractionDigits: 1 });
  if (num >= 10) return (Math.round(num * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (num >= 1) return (Math.round(num * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
  return (Math.round(num * 1000) / 1000).toLocaleString("en-US", { maximumFractionDigits: 3 });
}

/**
 * Converts decimals to standard cooking fractions (¼, ½, ¾, ⅓, ⅔, ⅛)
 */
export function formatKitchenFraction(val: number, unitId: string): string | undefined {
  // Only appropriate for cups, tbsp, tsp, pints, etc.
  if (!["cup", "metric_cup", "tbsp", "tsp", "pt", "qt"].includes(unitId)) {
    return undefined;
  }

  const whole = Math.floor(val);
  const remainder = val - whole;

  const fractions: [number, string][] = [
    [0.125, "⅛"],
    [0.25, "¼"],
    [0.333, "⅓"],
    [0.375, "⅜"],
    [0.5, "½"],
    [0.625, "⅝"],
    [0.666, "⅔"],
    [0.75, "¾"],
    [0.875, "⅞"],
  ];

  for (const [fracVal, symbol] of fractions) {
    if (Math.abs(remainder - fracVal) < 0.04) {
      return whole > 0 ? `${whole} ${symbol}` : symbol;
    }
  }

  // If close to next whole
  if (remainder >= 0.96) {
    return `${whole + 1}`;
  }

  return undefined;
}

/**
 * Generates an intuitive scoop estimation for home cooks
 */
function getPracticalKitchenScoop(val: number, unit: UnitDefinition): string | undefined {
  if (unit.id === "cup") {
    if (val >= 0.95 && val <= 1.05) return "1 level cup";
    if (val >= 0.48 && val <= 0.52) return "½ cup";
    if (val >= 0.23 && val <= 0.27) return "¼ cup (or 4 level tablespoons)";
    if (val >= 0.73 && val <= 0.77) return "¾ cup (or ½ cup + 4 tbsp)";
    if (val > 1) {
      const whole = Math.floor(val);
      const remCups = val - whole;
      const tbsp = Math.round(remCups * 16);
      if (tbsp > 0 && tbsp < 16) {
        return `≈ ${whole} ${whole === 1 ? "cup" : "cups"} + ${tbsp} tbsp`;
      }
    }
  }

  if (unit.id === "tbsp") {
    if (val > 3.9 && val < 4.1) return "¼ cup";
    if (val > 7.9 && val < 8.1) return "½ cup";
    if (val > 15.8 && val < 16.2) return "1 full cup";
  }

  if (unit.id === "g") {
    if (val >= 990 && val <= 1010) return "≈ 1 kilogram";
    if (val >= 450 && val <= 456) return "≈ 1 standard pound (16 oz)";
  }

  if (unit.id === "oz") {
    if (val >= 15.8 && val <= 16.2) return "≈ 1 pound";
  }

  return undefined;
}

export interface QuickPreset {
  id: string;
  label: string;
  amount: number;
  fromUnit: string;
  toUnit: string;
  ingredientId: string;
  badge: string;
}

export const POPULAR_CONVERSION_PRESETS: QuickPreset[] = [
  {
    id: "flour_cup_g",
    label: "1 cup All-Purpose Flour → Grams",
    amount: 1,
    fromUnit: "cup",
    toUnit: "g",
    ingredientId: "all_purpose_flour",
    badge: "125g",
  },
  {
    id: "sugar_cup_g",
    label: "1 cup White Sugar → Grams",
    amount: 1,
    fromUnit: "cup",
    toUnit: "g",
    ingredientId: "granulated_sugar",
    badge: "200g",
  },
  {
    id: "ghee_cup_g",
    label: "1 cup Pure Ghee → Grams",
    amount: 1,
    fromUnit: "cup",
    toUnit: "g",
    ingredientId: "pure_cow_ghee",
    badge: "220g",
  },
  {
    id: "rice_cup_g",
    label: "1 cup Basmati Rice → Grams",
    amount: 1,
    fromUnit: "cup",
    toUnit: "g",
    ingredientId: "basmati_rice",
    badge: "190g",
  },
  {
    id: "g_to_oz_100",
    label: "100 grams → Ounces",
    amount: 100,
    fromUnit: "g",
    toUnit: "oz",
    ingredientId: "all_purpose_flour",
    badge: "3.53 oz",
  },
  {
    id: "lb_to_g_1",
    label: "1 pound → Grams",
    amount: 1,
    fromUnit: "lb",
    toUnit: "g",
    ingredientId: "water_broth",
    badge: "453.6g",
  },
  {
    id: "ml_to_cup_250",
    label: "250 ml → US Cups",
    amount: 250,
    fromUnit: "ml",
    toUnit: "cup",
    ingredientId: "water_broth",
    badge: "1.06 cups",
  },
  {
    id: "tbsp_to_ml_1",
    label: "1 tablespoon → Milliliters",
    amount: 1,
    fromUnit: "tbsp",
    toUnit: "ml",
    ingredientId: "water_broth",
    badge: "14.8 ml",
  },
  {
    id: "oil_cup_g",
    label: "1 cup Olive Oil → Grams",
    amount: 1,
    fromUnit: "cup",
    toUnit: "g",
    ingredientId: "olive_oil",
    badge: "216g",
  },
  {
    id: "salt_tsp_g",
    label: "1 tsp Table Salt → Grams",
    amount: 1,
    fromUnit: "tsp",
    toUnit: "g",
    ingredientId: "fine_sea_salt",
    badge: "6.1g",
  },
];
