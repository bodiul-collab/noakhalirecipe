import { Recipe } from "../types";

export interface IngredientNutrientEstimate {
  name: string;
  amount: string;
  unit?: string;
  category: "Protein" | "Grains & Carbs" | "Fats & Dairy" | "Produce & Aromatics" | "Spices & Herbs";
  estimatedCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  percentageOfTotal: number;
}

export interface NutritionPortionSummary {
  portionMultiplier: number;
  portionLabel: string;
  portionDescription: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  sodiumMg: number;
  macroRatios: {
    proteinPercent: number;
    carbsPercent: number;
    fatPercent: number;
  };
  dailyValuePercentages: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
  ingredientBreakdown: IngredientNutrientEstimate[];
}

// Typical reference portion options
export const PORTION_PRESETS = [
  {
    multiplier: 0.5,
    label: "Light / Snack",
    description: "Half portion, ideal for lighter appetites or pairing with salads",
  },
  {
    multiplier: 0.75,
    label: "Moderate Serving",
    description: "Smaller dinner plate, balanced for lower caloric targets",
  },
  {
    multiplier: 1.0,
    label: "Standard Serving",
    description: "Typical home-cooked meal plate (standard recipe serving size)",
  },
  {
    multiplier: 1.25,
    label: "Hearty Portion",
    description: "Generous helping, ideal after workouts or active days",
  },
  {
    multiplier: 1.5,
    label: "Feast Plate",
    description: "Substantial celebratory portion with ample rice and protein",
  },
];

// Helper to determine ingredient nutrition category & relative caloric density
function categorizeIngredient(name: string): {
  category: IngredientNutrientEstimate["category"];
  baseWeight: number; // relative caloric density weight
  proteinRatio: number;
  carbsRatio: number;
  fatRatio: number;
} {
  const lower = name.toLowerCase();

  // Proteins: chicken, beef, prawns, shrimp, keema, fish, egg, lentils, dal
  if (
    lower.includes("chicken") ||
    lower.includes("beef") ||
    lower.includes("mutton") ||
    lower.includes("keema") ||
    lower.includes("prawn") ||
    lower.includes("shrimp") ||
    lower.includes("fish") ||
    lower.includes("meat") ||
    lower.includes("egg")
  ) {
    return { category: "Protein", baseWeight: 45, proteinRatio: 0.7, carbsRatio: 0.05, fatRatio: 0.25 };
  }

  // Grains, Carbs, Starchy vegetables
  if (
    lower.includes("rice") ||
    lower.includes("potato") ||
    lower.includes("flour") ||
    lower.includes("dough") ||
    lower.includes("paratha") ||
    lower.includes("dal") ||
    lower.includes("lentil") ||
    lower.includes("khichuri") ||
    lower.includes("bread")
  ) {
    return { category: "Grains & Carbs", baseWeight: 35, proteinRatio: 0.1, carbsRatio: 0.82, fatRatio: 0.08 };
  }

  // Fats, Oils, Rich Dairy
  if (
    lower.includes("ghee") ||
    lower.includes("oil") ||
    lower.includes("butter") ||
    lower.includes("coconut milk") ||
    lower.includes("cream") ||
    lower.includes("yogurt") ||
    lower.includes("milk")
  ) {
    return { category: "Fats & Dairy", baseWeight: 15, proteinRatio: 0.08, carbsRatio: 0.12, fatRatio: 0.8 };
  }

  // Produce & Aromatics
  if (
    lower.includes("onion") ||
    lower.includes("beresta") ||
    lower.includes("tomato") ||
    lower.includes("garlic") ||
    lower.includes("ginger") ||
    lower.includes("peas") ||
    lower.includes("cauliflower") ||
    lower.includes("spinach") ||
    lower.includes("chili") ||
    lower.includes("vegetable")
  ) {
    return { category: "Produce & Aromatics", baseWeight: 5, proteinRatio: 0.15, carbsRatio: 0.75, fatRatio: 0.1 };
  }

  // Spices & Herbs
  return { category: "Spices & Herbs", baseWeight: 1, proteinRatio: 0.1, carbsRatio: 0.7, fatRatio: 0.2 };
}

// Calculate scaled nutrition & ingredient breakdown
export function calculateNutritionForPortion(
  recipe: Recipe,
  multiplier: number = 1.0
): NutritionPortionSummary {
  const base = recipe.nutrition;
  const scaledCalories = Math.round(base.calories * multiplier);
  const scaledProtein = Math.round(base.proteinGrams * multiplier * 10) / 10;
  const scaledCarbs = Math.round(base.carbsGrams * multiplier * 10) / 10;
  const scaledFat = Math.round(base.fatGrams * multiplier * 10) / 10;
  const scaledFiber = Math.round(base.fiberGrams * multiplier * 10) / 10;
  const scaledSodium = Math.round(base.sodiumMg * multiplier);

  // Calculate macro calorie contributions
  const proteinCals = scaledProtein * 4;
  const carbsCals = scaledCarbs * 4;
  const fatCals = scaledFat * 9;
  const totalMacroCals = Math.max(1, proteinCals + carbsCals + fatCals);

  const proteinPercent = Math.round((proteinCals / totalMacroCals) * 100);
  const carbsPercent = Math.round((carbsCals / totalMacroCals) * 100);
  const fatPercent = Math.max(0, 100 - proteinPercent - carbsPercent);

  // Daily values (based on FDA 2,000 kcal standard)
  const dailyValuePercentages = {
    calories: Math.round((scaledCalories / 2000) * 100),
    protein: Math.round((scaledProtein / 50) * 100),
    carbs: Math.round((scaledCarbs / 275) * 100),
    fat: Math.round((scaledFat / 78) * 100),
    fiber: Math.round((scaledFiber / 28) * 100),
    sodium: Math.round((scaledSodium / 2300) * 100),
  };

  // Estimate per-ingredient caloric and macro contribution
  const ingredientStats = recipe.ingredients.map((ing) => {
    const info = categorizeIngredient(ing.name);
    return {
      ing,
      ...info,
    };
  });

  const totalWeights = ingredientStats.reduce((sum, item) => sum + item.baseWeight, 0);

  const ingredientBreakdown: IngredientNutrientEstimate[] = ingredientStats.map((item) => {
    const rawShare = item.baseWeight / totalWeights;
    const ingCalories = Math.max(2, Math.round(scaledCalories * rawShare));
    const ingProtein = Math.round(scaledProtein * rawShare * item.proteinRatio * 2.5 * 10) / 10;
    const ingCarbs = Math.round(scaledCarbs * rawShare * item.carbsRatio * 1.5 * 10) / 10;
    const ingFat = Math.round(scaledFat * rawShare * item.fatRatio * 2.0 * 10) / 10;
    const percentageOfTotal = Math.round(rawShare * 100);

    return {
      name: item.ing.name,
      amount: item.ing.amount,
      unit: item.ing.unit,
      category: item.category,
      estimatedCalories: ingCalories,
      proteinGrams: ingProtein,
      carbsGrams: ingCarbs,
      fatGrams: ingFat,
      percentageOfTotal,
    };
  });

  // Sort by highest calories contribution
  ingredientBreakdown.sort((a, b) => b.estimatedCalories - a.estimatedCalories);

  // Find matching preset label or custom
  const matchedPreset = PORTION_PRESETS.find((p) => Math.abs(p.multiplier - multiplier) < 0.01);
  const portionLabel = matchedPreset
    ? matchedPreset.label
    : `Custom Portion (${multiplier.toFixed(2)}x)`;
  const portionDescription = matchedPreset
    ? matchedPreset.description
    : `Custom scaled portion based on ${multiplier.toFixed(2)}x of baseline recipe serving.`;

  return {
    portionMultiplier: multiplier,
    portionLabel,
    portionDescription,
    calories: scaledCalories,
    proteinGrams: scaledProtein,
    carbsGrams: scaledCarbs,
    fatGrams: scaledFat,
    fiberGrams: scaledFiber,
    sodiumMg: scaledSodium,
    macroRatios: {
      proteinPercent,
      carbsPercent,
      fatPercent,
    },
    dailyValuePercentages,
    ingredientBreakdown,
  };
}

export interface PerServingNutritionSummary {
  // Key per-serving figures
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  fiberGrams: number;
  sodiumMg: number;
  servingSizeDescription: string;
  baseServings: number;
  currentServings: number;

  // Caloric share (% of total kcal)
  macroCalories: {
    protein: number;
    fat: number;
    carbs: number;
    total: number;
  };
  macroPercentages: {
    proteinPercent: number;
    fatPercent: number;
    carbsPercent: number;
  };

  // FDA 2,000 kcal Daily Values
  dailyValuePercentages: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    sodium: number;
  };

  // Total whole recipe / batch figures for the active servings count
  totalBatch: {
    calories: number;
    proteinGrams: number;
    fatGrams: number;
    carbsGrams: number;
    fiberGrams: number;
    sodiumMg: number;
  };
}

/**
 * Calculates per-serving key nutritional information (calories, protein, fats, carbs)
 * along with macro percentages, daily values, and total batch figures for scaled servings.
 */
export function calculatePerServingNutrition(
  recipe: Recipe,
  targetServings?: number
): PerServingNutritionSummary {
  const baseServings = recipe.servings > 0 ? recipe.servings : 1;
  const currentServings = targetServings && targetServings > 0 ? targetServings : baseServings;

  // Resolve per-serving values (prefer explicit perServing if present, else nutrition object values)
  const calories =
    recipe.nutrition?.perServing?.calories ??
    recipe.nutrition?.calories ??
    recipe.calories ??
    0;
  const proteinGrams =
    recipe.nutrition?.perServing?.proteinGrams ??
    recipe.nutrition?.proteinGrams ??
    0;
  const fatGrams =
    recipe.nutrition?.perServing?.fatGrams ??
    recipe.nutrition?.fatGrams ??
    0;
  const carbsGrams =
    recipe.nutrition?.perServing?.carbsGrams ??
    recipe.nutrition?.carbsGrams ??
    0;
  const fiberGrams =
    recipe.nutrition?.perServing?.fiberGrams ??
    recipe.nutrition?.fiberGrams ??
    0;
  const sodiumMg =
    recipe.nutrition?.perServing?.sodiumMg ??
    recipe.nutrition?.sodiumMg ??
    0;

  const servingSizeDescription =
    recipe.nutrition?.servingSizeDescription ||
    `1 standard serving (Recipe yields ${baseServings} ${baseServings === 1 ? "portion" : "portions"})`;

  // Macro calorie contributions (Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g)
  const proteinCals = Math.round(proteinGrams * 4);
  const carbsCals = Math.round(carbsGrams * 4);
  const fatCals = Math.round(fatGrams * 9);
  const totalMacroCals = proteinCals + carbsCals + fatCals;

  const proteinPercent =
    totalMacroCals > 0 ? Math.round((proteinCals / totalMacroCals) * 100) : 0;
  const carbsPercent =
    totalMacroCals > 0 ? Math.round((carbsCals / totalMacroCals) * 100) : 0;
  const fatPercent =
    totalMacroCals > 0 ? Math.max(0, 100 - proteinPercent - carbsPercent) : 0;

  // FDA 2,000 kcal Daily Values
  const dailyValuePercentages = {
    calories: Math.round((calories / 2000) * 100),
    protein: Math.round((proteinGrams / 50) * 100),
    fat: Math.round((fatGrams / 78) * 100),
    carbs: Math.round((carbsGrams / 275) * 100),
    fiber: Math.round((fiberGrams / 28) * 100),
    sodium: Math.round((sodiumMg / 2300) * 100),
  };

  // Total batch numbers for current targetServings
  const totalBatch = {
    calories: Math.round(calories * currentServings),
    proteinGrams: Math.round(proteinGrams * currentServings * 10) / 10,
    fatGrams: Math.round(fatGrams * currentServings * 10) / 10,
    carbsGrams: Math.round(carbsGrams * currentServings * 10) / 10,
    fiberGrams: Math.round(fiberGrams * currentServings * 10) / 10,
    sodiumMg: Math.round(sodiumMg * currentServings),
  };

  return {
    calories,
    proteinGrams,
    fatGrams,
    carbsGrams,
    fiberGrams,
    sodiumMg,
    servingSizeDescription,
    baseServings,
    currentServings,
    macroCalories: {
      protein: proteinCals,
      fat: fatCals,
      carbs: carbsCals,
      total: totalMacroCals,
    },
    macroPercentages: {
      proteinPercent,
      fatPercent,
      carbsPercent,
    },
    dailyValuePercentages,
    totalBatch,
  };
}

