export interface Recipe {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  cuisine: string;
  description: string;
  introStory: string;
  heroImage: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Advanced";
  calories: number;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  isRegionalHeritage?: boolean;
  halalNotes: string;
  potentialCautionNotes?: string;
  ingredients: Array<{
    amount: string;
    unit?: string;
    name: string;
    notes?: string;
  }>;
  substitutions: Array<{
    original: string;
    substitute: string;
    notes: string;
  }>;
  instructions: Array<{
    step: number;
    title: string;
    instruction: string;
    tip?: string;
  }>;
  chefNotes: string[];
  nutrition: RecipeNutrition;
  storageInstructions: string;
  freezingInstructions: string;
  servingSuggestions: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  updatedDate: string;
  tags: string[];
}

export interface KeyNutritionalInfo {
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  fiberGrams?: number;
  sodiumMg?: number;
}

export interface RecipeNutrition {
  calories: number; // Calories (kcal) per serving
  proteinGrams: number; // Protein (g) per serving
  carbsGrams: number; // Carbohydrates (g) per serving
  fatGrams: number; // Total Fat (g) per serving
  fiberGrams: number; // Fiber (g) per serving
  sodiumMg: number; // Sodium (mg) per serving
  servingSizeDescription?: string; // e.g. "1 bowl (approx. 380g)"
  perServing?: KeyNutritionalInfo; // Explicit per-serving key macro breakdown
  totalRecipe?: KeyNutritionalInfo; // Total whole recipe values
}

export interface CategoryHub {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  featuredRecipeSlugs: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  halalPointers: string[];
}

export type HalalClassification =
  | "100% Halal Certified"
  | "Halal Options Available"
  | "Muslim-Owned"
  | "Verification Recommended";

export interface DirectoryListing {
  id: string;
  name: string;
  category: "restaurants" | "butchers" | "groceries" | "mosques" | "islamic-centers";
  categoryLabel: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone?: string;
  website?: string;
  googleMapsUrl: string;
  halalClassification: HalalClassification;
  halalDetails: string;
  openingHours?: string;
  isOpenNow?: boolean;
  features: string[];
  jummahInfo?: string;
  womensPrayerArea?: string;
  lastVerifiedDate: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Halal Guides" | "Food Culture" | "Kitchen Skills" | "Meal Planning" | "Pantry Essentials";
  excerpt: string;
  content: string;
  heroImage: string;
  author: {
    name: string;
    role: string;
  };
  publishedDate: string;
  updatedDate: string;
  readTimeMinutes: number;
  relatedRecipeSlugs: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ECodeItem {
  code: string;
  name: string;
  status: "Halal" | "Mushbooh (Doubtful)" | "Haram" | "Check Source";
  source: string;
  description: string;
  verificationAdvice: string;
}

export interface RecipeCollection {
  id: string;
  name: string;
  description?: string;
  recipeIds: string[];
  createdAt: number;
  color?: string;
  icon?: string;
}

// Global Halal & Islamic Places Directory Types
export type SearchCategory = "restaurants" | "groceries" | "mosques";

export interface SearchLocation {
  formattedAddress: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  placeId?: string;
}

export interface PlaceResult {
  id: string;
  name: string;
  category: SearchCategory;
  categoryLabel: string;
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  isOpenNow?: boolean;
  weekdayDescriptions?: string[];
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri: string;
  photoUrl?: string;
  types?: string[];
  distanceKm?: number;
  distanceMiles?: number;
  halalNotice: string;
  source: "google" | "google_api" | "noakhali_verified" | "user_submitted" | "fallback" | "osm_live";
}

export interface PlacesSearchResult {
  places: PlaceResult[];
  nextPageToken?: string;
  status: "OK" | "ZERO_RESULTS" | "ERROR";
  errorMessage?: string;
  source: "google_api" | "fallback";
}

export interface SearchFilters {
  radiusMeters: number;
  distanceUnit: "mi" | "km";
  openNowOnly: boolean;
  minRating: number;
  sortBy: "nearest" | "highest_rated";
  subQuery?: string;
}

export interface LocationResolution {
  status: "OK" | "ZERO_RESULTS" | "AMBIGUOUS" | "ERROR";
  results: SearchLocation[];
  errorMessage?: string;
}
