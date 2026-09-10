export interface UserRecipeRating {
  recipeId: string;
  rating: number; // 1 to 5
  reviewText?: string;
  ratedAt: string; // ISO string
  updatedAt?: string;
}

export const STORAGE_KEY_USER_RATINGS = "nk_recipe_user_ratings";

/**
 * Loads all user ratings from localStorage
 */
export function loadUserRatings(): Record<string, UserRecipeRating> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_RATINGS);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }
  } catch (error) {
    console.warn("Error reading user ratings from localStorage:", error);
  }
  return {};
}

/**
 * Gets a specific user rating for a given recipe ID
 */
export function getUserRating(recipeId: string): UserRecipeRating | null {
  const allRatings = loadUserRatings();
  return allRatings[recipeId] || null;
}

/**
 * Saves or updates a user rating for a recipe in localStorage
 */
export function saveUserRating(
  recipeId: string,
  rating: number,
  reviewText?: string
): UserRecipeRating {
  const allRatings = loadUserRatings();
  const now = new Date().toISOString();
  const existing = allRatings[recipeId];

  const ratingEntry: UserRecipeRating = {
    recipeId,
    rating: Math.max(1, Math.min(5, Math.round(rating))),
    reviewText: reviewText?.trim() || undefined,
    ratedAt: existing?.ratedAt || now,
    updatedAt: now,
  };

  allRatings[recipeId] = ratingEntry;

  try {
    localStorage.setItem(STORAGE_KEY_USER_RATINGS, JSON.stringify(allRatings));
  } catch (error) {
    console.warn("Error saving user rating to localStorage:", error);
  }

  return ratingEntry;
}

/**
 * Deletes a user rating from localStorage
 */
export function deleteUserRating(recipeId: string): void {
  const allRatings = loadUserRatings();
  if (allRatings[recipeId]) {
    delete allRatings[recipeId];
    try {
      localStorage.setItem(STORAGE_KEY_USER_RATINGS, JSON.stringify(allRatings));
    } catch (error) {
      console.warn("Error deleting user rating from localStorage:", error);
    }
  }
}

/**
 * Calculates blended aggregate rating incorporating user's local rating
 */
export function calculateBlendedRating(
  baseRating: number,
  baseReviewCount: number,
  userRating: number | null
): { rating: number; reviewCount: number } {
  if (!userRating) {
    return {
      rating: baseRating,
      reviewCount: baseReviewCount,
    };
  }

  // Weight original rating by reviewCount and add user's rating
  const totalScore = baseRating * baseReviewCount + userRating;
  const newCount = baseReviewCount + 1;
  const calculated = Math.round((totalScore / newCount) * 100) / 100;

  return {
    rating: calculated,
    reviewCount: newCount,
  };
}
