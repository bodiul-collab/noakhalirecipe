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
  nutrition: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    fiberGrams: number;
    sodiumMg: number;
  };
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
