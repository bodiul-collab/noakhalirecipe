export interface RecipeIngredient {
  amount: string;
  unit?: string;
  name: string;
  notes?: string;
}

export interface RecipeInstruction {
  step?: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface RecipeNutrition {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  saturatedFatGrams?: number;
  fiberGrams?: number;
  sodiumMg?: number;
  servingSizeDescription?: string;
  perServing?: {
    calories?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatGrams?: number;
    fiberGrams?: number;
    sodiumMg?: number;
  };
  totalRecipe?: {
    calories?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatGrams?: number;
    fiberGrams?: number;
    sodiumMg?: number;
  };
}

export interface RecipeAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface RecipeFAQ {
  question: string;
  answer: string;
}

export interface RecipeIngredientSubstitute {
  original: string;
  substitute: string;
  notes: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  cuisine: string;
  description: string;
  introStory?: string;
  heroImage: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Advanced" | "Expert";
  calories: number;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  isRegionalHeritage?: boolean;
  whySpecial?: string;
  halalNotes?: string;
  potentialCautionNotes?: string;
  cookingTips?: string[];
  commonMistakes?: string[];
  seoTitle?: string;
  seoDescription?: string;
  kitchenToolId?: string;
  relatedKitchenToolId?: string;
  relatedRecipes?: string[];
  relatedGuides?: string[];
  relatedGuideSlugs?: string[];
  relatedRecipeSlugs?: string[];
  relatedCulture?: string;
  relatedCultureSlug?: string;
  ingredients: RecipeIngredient[];
  ingredientSubstitutes?: RecipeIngredientSubstitute[];
  substitutions?: RecipeIngredientSubstitute[];
  instructions: RecipeInstruction[];
  chefNotes?: string[];
  nutrition: RecipeNutrition;
  storageInstructions?: string;
  freezingInstructions?: string;
  servingSuggestions?: string[];
  faqs?: RecipeFAQ[];
  author: RecipeAuthor;
  updatedDate: string;
  tags: string[];
}

export interface RecipeCollection {
  id: string;
  name: string;
  description: string;
  recipeIds: string[];
  color: string;
  icon: string;
  createdAt: number;
}

export interface UserRecipeRating {
  recipeId: string;
  rating: number;
  reviewText?: string;
  ratedAt: string;
  updatedAt?: string;
}

export interface CookingGuide {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  publishedDate: string;
  updatedDate: string;
  readTimeMinutes: number;
  relatedRecipeSlugs: string[];
  relatedGuideSlugs?: string[];
  tags?: string[];
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  troubleshooting?: Array<{
    problem?: string;
    issue?: string;
    cause?: string;
    fix?: string;
    solution?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface FoodCultureArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
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
  relatedRecipeSlugs?: string[];
}

export interface KitchenToolItem {
  id: string;
  title: string;
  category: string;
  description: string;
  recommendedUse: string;
  practicalTips: string[];
  relatedRecipeSlugs: string[];
  badge?: string;
  affiliateUrl?: string;
}

export type KitchenEquipmentItem = KitchenToolItem;

export interface AffiliateProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  whyItMatters: string;
  bestFor: string;
  affiliateUrl: string;
  disclosureRequired: boolean;
}

export type AffiliateProduct = AffiliateProductItem;

export interface PantryStapleItem {
  name: string;
  bengaliOrRegionalName?: string;
  purpose: string;
  halalVerificationNotes: string;
}

export interface HalalPantrySection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  verificationGuidance: string;
  keyStaples: PantryStapleItem[];
}

export type PantryItem = PantryStapleItem;

export interface CategoryHub {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  featuredRecipeSlugs: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  halalPointers?: string[];
}

export type RecipeCategory = CategoryHub;

export interface ECodeItem {
  code: string;
  name: string;
  status: "Halal" | "Haram" | "Mushbooh (Doubtful)" | "Check Source";
  source: string;
  description: string;
  verificationAdvice: string;
}

export type HalalECode = ECodeItem;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  heroImage?: string;
  author?: {
    name: string;
    role: string;
  };
  publishedDate?: string;
  updatedDate?: string;
  readTimeMinutes?: number;
  relatedRecipeSlugs?: string[];
  tags?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}
