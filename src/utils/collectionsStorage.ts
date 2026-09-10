import { RecipeCollection } from "../types";

export const STORAGE_KEY_COLLECTIONS = "nk_recipe_collections";

export const PRESET_COLLECTION_COLORS = [
  { label: "Amber Orange", value: "#E97520" },
  { label: "Heritage Emerald", value: "#2D7A52" },
  { label: "Royal Indigo", value: "#4F46E5" },
  { label: "Ruby Crimson", value: "#DC2626" },
  { label: "Plum Violet", value: "#7C3AED" },
  { label: "Warm Gold", value: "#D97706" },
  { label: "Ocean Teal", value: "#0D9488" },
];

export const PRESET_COLLECTION_ICONS = [
  { id: "sparkles", label: "Celebration" },
  { id: "clock", label: "Quick / Weeknight" },
  { id: "utensils", label: "Dinner / Dining" },
  { id: "moon", label: "Ramadan / Iftar" },
  { id: "flame", label: "Spicy / Bhuna" },
  { id: "heart", label: "Family Favorite" },
  { id: "calendar", label: "Meal Prep" },
];

export const DEFAULT_COLLECTIONS: RecipeCollection[] = [
  {
    id: "col-eid-feast",
    name: "Eid Feast",
    description: "Celebratory centerpieces, fragrant dum biryanis, and rich heritage meats for festive gatherings.",
    recipeIds: ["rec-1", "rec-2", "rec-4"],
    color: "#E97520",
    icon: "sparkles",
    createdAt: 1710000000000,
  },
  {
    id: "col-weeknight-dinners",
    name: "Weeknight Dinners",
    description: "Approachable, nourishing Halal curries, khichuri, and quick seafood for busy weeknights.",
    recipeIds: ["rec-3", "rec-5"],
    color: "#2D7A52",
    icon: "clock",
    createdAt: 1710000001000,
  },
  {
    id: "col-ramadan-iftar",
    name: "Ramadan & Iftar",
    description: "Crisp spiced samosas, comforting lentils, and nourishing platters for evening iftars.",
    recipeIds: ["rec-6", "rec-5"],
    color: "#7C3AED",
    icon: "moon",
    createdAt: 1710000002000,
  },
];

/**
 * Loads collections from localStorage or returns default starter collections
 */
export function loadCollections(): RecipeCollection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to load collections from localStorage:", err);
  }
  return DEFAULT_COLLECTIONS;
}

/**
 * Saves collections into localStorage
 */
export function saveCollections(collections: RecipeCollection[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(collections));
  } catch (err) {
    console.warn("Failed to save collections to localStorage:", err);
  }
}

/**
 * Creates and returns a new collection
 */
export function createCollection(
  name: string,
  description: string = "",
  color: string = "#E97520",
  icon: string = "sparkles",
  initialRecipeIds: string[] = []
): RecipeCollection {
  const id = `col-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  return {
    id,
    name: name.trim(),
    description: description.trim(),
    recipeIds: initialRecipeIds,
    color,
    icon,
    createdAt: Date.now(),
  };
}

/**
 * Adds or removes a recipe from a collection
 */
export function toggleRecipeInCollection(
  collections: RecipeCollection[],
  collectionId: string,
  recipeId: string
): RecipeCollection[] {
  return collections.map((col) => {
    if (col.id !== collectionId) return col;
    const exists = col.recipeIds.includes(recipeId);
    return {
      ...col,
      recipeIds: exists
        ? col.recipeIds.filter((id) => id !== recipeId)
        : [...col.recipeIds, recipeId],
    };
  });
}

/**
 * Syncs which collections a recipe belongs to
 */
export function updateRecipeCollections(
  collections: RecipeCollection[],
  recipeId: string,
  targetCollectionIds: string[]
): RecipeCollection[] {
  const targetSet = new Set(targetCollectionIds);
  return collections.map((col) => {
    const hasRecipe = col.recipeIds.includes(recipeId);
    const shouldHave = targetSet.has(col.id);

    if (hasRecipe && !shouldHave) {
      return {
        ...col,
        recipeIds: col.recipeIds.filter((id) => id !== recipeId),
      };
    }
    if (!hasRecipe && shouldHave) {
      return {
        ...col,
        recipeIds: [...col.recipeIds, recipeId],
      };
    }
    return col;
  });
}

/**
 * Removes a recipe ID from all collections (when a user permanently unsaves/deletes)
 */
export function removeRecipeFromAllCollections(
  collections: RecipeCollection[],
  recipeId: string
): RecipeCollection[] {
  return collections.map((col) => {
    if (!col.recipeIds.includes(recipeId)) return col;
    return {
      ...col,
      recipeIds: col.recipeIds.filter((id) => id !== recipeId),
    };
  });
}
