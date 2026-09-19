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
  whySpecial?: string;
  cookingTips?: string[];
  commonMistakes?: string[];
  relatedRecipeSlugs?: string[];
  relatedGuideSlugs?: string[];
  relatedCultureSlug?: string;
  relatedKitchenToolId?: string;
  seoTitle?: string;
  seoDescription?: string;
  youtubeUrl?: string;
  youtubeVideoId?: string;
  videoTitle?: string;
  videoDuration?: string;
  videoChapters?: VideoChapter[];
  videoProduction?: VideoProductionData;
}

export interface VideoChapter {
  time: string; // e.g. "00:00", "01:45"
  title: string;
}

export interface ShortClipItem {
  title: string;
  focus: "Ingredient Preparation" | "Key Cooking Technique" | "Sizzling Moment" | "Final Dish Reveal";
  description: string;
  targetSeconds: string;
}

export interface VideoProductionData {
  status: "Editorial Planning" | "Scripted" | "In Visual Production" | "Ready for YouTube" | "Published";
  targetDuration: string; // e.g. "12-15 min"
  hook: string; // 0:00-0:20 Hook description
  introduction: string; // 0:20-0:50 Recipe intro
  ingredientsVisual: string; // 0:50-2:00 Ingredients shot
  preparationVisual: string; // 2:00-4:00 Prep process
  cookingVisual: string; // 4:00-10:30 Cooking process
  keyTechnique: string; // 10:30-12:00 Key technique
  finalDishVisual: string; // 12:00-13:00 Plating
  servingVisual: string; // 13:00-14:00 Serving suggestions
  ctaOutro: string; // 14:00-15:00 Outro and CTA
  cinematographyNotes: string[];
  voiceoverSample: string;
  youtubeOptimizedTitle: string;
  youtubeDescription: string;
  shortsClips: ShortClipItem[];
}

export interface CookingVideo {
  id: string;
  slug: string;
  title: string;
  description: string;
  recipeSlug: string;
  recipeTitle: string;
  categorySlug: string;
  categoryTitle: string;
  thumbnail: string;
  duration?: string; // e.g. "13:40"
  youtubeVideoId?: string;
  youtubeUrl?: string;
  publishedDate: string;
  relatedRecipeSlugs?: string[];
  relatedGuideSlugs?: string[];
  featured?: boolean;
  videoChapters?: VideoChapter[];
  channelPlaceholder?: string;
  productionNotes?: string;
}

export interface CookingGuide {
  id: string;
  slug: string;
  title: string;
  category:
    | "Cooking Techniques"
    | "Spice Guides"
    | "Ingredient Guides"
    | "Ingredient Substitutions"
    | "Beginner Cooking"
    | "Kitchen Tips";
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
  tags?: string[];
  relatedRecipeSlugs: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface FoodCultureArticle {
  id: string;
  slug: string;
  title: string;
  category:
    | "Bangladeshi Food Culture"
    | "Regional Foods"
    | "Halal Food Traditions"
    | "Ramadan & Eid Food Culture"
    | "South Asian Food Stories";
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

export interface KitchenToolItem {
  id: string;
  title: string;
  category: "Useful Kitchen Equipment" | "Recipe-Specific Tools" | "Kitchen Essentials";
  description: string;
  recommendedUse: string;
  practicalTips: string[];
  relatedRecipeSlugs: string[];
  badge?: string;
}

export interface HalalPantrySection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  verificationGuidance: string;
  keyStaples: Array<{
    name: string;
    bengaliOrRegionalName?: string;
    purpose: string;
    halalVerificationNotes: string;
  }>;
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
