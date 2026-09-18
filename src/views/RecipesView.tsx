import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  Clock,
  ChefHat,
  Bookmark,
  Printer,
  Share2,
  ChevronDown,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Sparkles,
  ArrowLeft,
  Flame,
  Download,
  ExternalLink,
  FolderHeart,
  Layers,
  RotateCw,
  X,
  Scale,
} from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { HalalCheck } from "../components/HalalCheck";
import { AdSlot } from "../components/AdSlot";
import { NutritionalBreakdown } from "../components/NutritionalBreakdown";
import { KeyNutritionalPerServing } from "../components/KeyNutritionalPerServing";
import { PrintRecipeModal } from "../components/PrintRecipeModal";
import { AddToCollectionModal } from "../components/AddToCollectionModal";
import { CookingStepTimer } from "../components/CookingStepTimer";
import { RECIPES } from "../data/recipes";
import { Recipe, RecipeCollection } from "../types";
import { openPrintWindow, downloadPrintableHtml } from "../utils/printableRecipeGenerator";
import { calculatePerServingNutrition } from "../utils/nutritionEstimator";
import { RecipeRatingCard } from "../components/RecipeRatingCard";
import { YouTubePlayer } from "../components/YouTubePlayer";
import { COOKING_GUIDES } from "../data/guides";
import {
  loadUserRatings,
  saveUserRating,
  deleteUserRating,
  calculateBlendedRating,
  UserRecipeRating,
} from "../utils/ratingsStorage";

interface RecipesViewProps {
  initialSlug?: string;
  onNavigate: (route: string) => void;
  savedRecipeIds: Set<string>;
  onToggleSaveRecipe: (recipe: Recipe) => void;
  initialSearchQuery?: string;
  collections?: RecipeCollection[];
  onToggleRecipeInCollection?: (collectionId: string, recipeId: string) => void;
  onCreateCollection?: (name: string) => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({
  initialSlug,
  onNavigate,
  savedRecipeIds,
  onToggleSaveRecipe,
  initialSearchQuery = "",
  collections = [],
  onToggleRecipeInCollection,
  onCreateCollection,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedProtein, setSelectedProtein] = useState<string>("All");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCollection, setSelectedCollection] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"rating" | "time" | "reviews">("rating");
  const [recipeForCollection, setRecipeForCollection] = useState<Recipe | null>(null);

  // State for recipe detail view
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [shareFeedback, setShareFeedback] = useState<string>("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Sync activeSlug whenever initialSlug prop updates
  useEffect(() => {
    if (initialSlug) {
      setActiveSlug(initialSlug);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      setActiveSlug(null);
    }
  }, [initialSlug]);

  // Sync searchTerm whenever search query updates from outside
  useEffect(() => {
    setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  // When activeSlug is set (e.g., viewing a recipe), scroll directly to top of page with heading
  useEffect(() => {
    if (activeSlug) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const headerEl = document.getElementById("recipe-detail-header");
      if (headerEl) {
        headerEl.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }
  }, [activeSlug]);

  const currentRecipe = useMemo(() => {
    if (!activeSlug) return null;
    return (
      RECIPES.find(
        (r) =>
          r.slug === activeSlug ||
          (r.slug === "chicken-biryani" && activeSlug === "halal-chicken-biryani") ||
          (r.slug === "halal-chicken-biryani" && activeSlug === "chicken-biryani") ||
          (r.slug === "chicken-karahi" && (activeSlug === "murgh-karahi" || activeSlug === "authentic-chicken-karahi")) ||
          (r.slug === "seekh-kebab" && (activeSlug === "sheek-kebab" || activeSlug === "seekh-kabab" || activeSlug === "beef-seekh-kebab")) ||
          (r.slug === "authentic-chicken-shawarma" && (activeSlug === "chicken-shawarma" || activeSlug === "homemade-chicken-shawarma" || activeSlug === "shawarma")) ||
          (r.slug === "crispy-falafel" && (activeSlug === "falafel" || activeSlug === "authentic-falafel" || activeSlug === "middle-eastern-falafel")) ||
          (r.slug === "hummus" && (activeSlug === "authentic-hummus" || activeSlug === "hommus" || activeSlug === "houmous")) ||
          (r.slug === "black-chana" && (activeSlug === "kalo-chola" || activeSlug === "chola-bhuna" || activeSlug === "kala-chana" || activeSlug === "bengali-chola-bhuna")) ||
          (r.slug === "egg-roll" && (activeSlug === "dimer-roll" || activeSlug === "crispy-egg-roll" || activeSlug === "crispy-egg-rolls")) ||
          (r.slug === "chicken-patty" && (activeSlug === "chicken-patties" || activeSlug === "crispy-chicken-patty" || activeSlug === "chicken-patty-crisp-and-flaky" || activeSlug === "bengali-chicken-patty")) ||
          (r.slug === "dal-piyaju-pakora" && (activeSlug === "dal-piyaju" || activeSlug === "piyaju" || activeSlug === "piyaji" || activeSlug === "dal-pakora" || activeSlug === "dal-pakoda" || activeSlug === "pakora")) ||
          (r.slug === "narkel-puli-pitha" && (activeSlug === "puli-pitha" || activeSlug === "narkel-puli" || activeSlug === "coconut-dumpling" || activeSlug === "coconut-dumplings" || activeSlug === "bhapa-puli" || activeSlug === "narkeler-puli-pitha")) ||
          (r.slug === "thandai" && (activeSlug === "shahi-thandai" || activeSlug === "kesar-thandai" || activeSlug === "kesar-pista-thandai" || activeSlug === "thandai-drink")) ||
          (r.slug === "salty-lassi" && (activeSlug === "namkeen-lassi" || activeSlug === "salted-lassi" || activeSlug === "chaas" || activeSlug === "savory-lassi" || activeSlug === "salt-lassi")) ||
          (r.slug === "borhani" && (activeSlug === "traditional-shahi-borhani" || activeSlug === "shahi-borhani" || activeSlug === "dhaka-borhani" || activeSlug === "dhaka-shahi-borhani" || activeSlug === "borhani-drink")) ||
          (r.slug === "buttermilk-chicken-alfredo-spinach-pasta" && (activeSlug === "buttermilk-chicken-alfredo" || activeSlug === "buttermilk-alfredo-chicken-spinach-pasta" || activeSlug === "buttermilk-alfredo-pasta" || activeSlug === "chicken-alfredo-spinach-pasta" || activeSlug === "buttermilk-chicken-pasta")) ||
          (r.slug === "spinach-sun-dried-tomato-pasta" && (activeSlug === "spinach-and-sun-dried-tomato-pasta" || activeSlug === "sun-dried-tomato-pasta" || activeSlug === "spinach-sundried-tomato-pasta" || activeSlug === "spinach-and-sundried-tomato-pasta" || activeSlug === "creamy-sun-dried-tomato-pasta")) ||
          (r.slug === "chicken-tikka-masala" && (activeSlug === "tikka-masala" || activeSlug === "chicken-tikka" || activeSlug === "authentic-chicken-tikka-masala" || activeSlug === "chiken-tikka-masala" || activeSlug === "shahi-chicken-tikka-masala")) ||
          (r.slug === "haleem" && (activeSlug === "bengali-haleem" || activeSlug === "shahi-haleem")) ||
          (r.slug === "bengali-chicken-roast" && activeSlug === "shahi-chicken-roast") ||
          (r.slug === "chicken-machboos-majboos-kabsa" && activeSlug === "authentic-saudi-chicken-kabsa")
      ) || null
    );
  }, [activeSlug]);

  // Custom User Ratings state persisted in localStorage
  const [userRatings, setUserRatings] = useState<Record<string, UserRecipeRating>>(() => {
    return loadUserRatings();
  });

  const handleSaveRating = (rating: number, reviewText?: string) => {
    if (!currentRecipe) return;
    const updated = saveUserRating(currentRecipe.id, rating, reviewText);
    setUserRatings((prev) => ({
      ...prev,
      [currentRecipe.id]: updated,
    }));
  };

  const handleDeleteRating = () => {
    if (!currentRecipe) return;
    deleteUserRating(currentRecipe.id);
    setUserRatings((prev) => {
      const next = { ...prev };
      delete next[currentRecipe.id];
      return next;
    });
  };

  const currentUserRating = currentRecipe ? userRatings[currentRecipe.id] || null : null;

  const blendedRating = useMemo(() => {
    if (!currentRecipe) return { rating: 5, reviewCount: 0 };
    return calculateBlendedRating(
      currentRecipe.rating,
      currentRecipe.reviewCount,
      currentUserRating?.rating || null
    );
  }, [currentRecipe, currentUserRating]);

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchesSearch =
        !searchTerm.trim() ||
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        r.ingredients.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesProtein =
        selectedProtein === "All" ||
        (selectedProtein === "Chicken" && r.categorySlug === "halal-chicken") ||
        (selectedProtein === "Beef" && r.categorySlug === "halal-beef") ||
        ((selectedProtein === "Fish & Seafood" || selectedProtein === "Fish" || selectedProtein === "Seafood") &&
          r.categorySlug === "halal-seafood") ||
        ((selectedProtein === "Kids Meal" || selectedProtein === "Halal Kids Meal") &&
          r.categorySlug === "halal-kids-meal") ||
        (selectedProtein === "Desserts" && r.categorySlug === "halal-desserts") ||
        (selectedProtein === "Street Food" && r.categorySlug === "halal-street-food") ||
        (selectedProtein === "Vegetarian" && (r.categorySlug === "halal-vegetarian" || r.tags.includes("Vegetarian") || r.tags.includes("Vegan"))) ||
        ((selectedProtein === "Ramadan & Eid" || selectedProtein === "Ramadan") &&
          (r.categorySlug === "ramadan-eid" || r.tags.includes("Ramadan") || r.tags.includes("Eid") || r.tags.includes("Iftar"))) ||
        (selectedProtein === "Drinks" && (r.categorySlug === "halal-drinks" || r.category.toLowerCase().includes("drink"))) ||
        (selectedProtein === "Meal Prep" && (r.categorySlug === "halal-meal-prep" || r.tags.includes("Meal Prep") || r.tags.includes("Halal Meal Prep")));

      const matchesCuisine =
        selectedCuisine === "All" ||
        (selectedCuisine === "Bangladeshi" &&
          (r.cuisine.toLowerCase().includes("bengali") ||
            r.cuisine.toLowerCase().includes("bangladesh") ||
            r.tags.some((t) => t.toLowerCase().includes("bengali")))) ||
        (selectedCuisine === "Indian" &&
          (r.cuisine.toLowerCase().includes("indian") ||
            r.cuisine.toLowerCase().includes("mughlai"))) ||
        (selectedCuisine === "Pakistani" &&
          (r.cuisine.toLowerCase().includes("pakistani") ||
            r.cuisine.toLowerCase().includes("lahori"))) ||
        (selectedCuisine === "Middle Eastern" &&
          (r.cuisine.toLowerCase().includes("middle eastern") ||
            r.cuisine.toLowerCase().includes("arab") ||
            r.cuisine.toLowerCase().includes("saudi") ||
            r.cuisine.toLowerCase().includes("mediterranean"))) ||
        (selectedCuisine === "Everyday Halal" &&
          (r.tags.includes("Everyday") ||
            r.tags.includes("Weeknight") ||
            r.tags.includes("Quick") ||
            r.difficulty === "Easy")) ||
        (selectedCuisine === "Ramadan & Eid" &&
          (r.categorySlug === "ramadan-eid" ||
            r.tags.includes("Ramadan") ||
            r.tags.includes("Eid") ||
            r.tags.includes("Iftar") ||
            r.tags.includes("Festive") ||
            r.tags.includes("Banquet"))) ||
        (selectedCuisine === "Desserts & Sweets" && r.categorySlug === "halal-desserts") ||
        (selectedCuisine === "Drinks" &&
          (r.categorySlug === "halal-drinks" || r.category.toLowerCase().includes("drink")));

      const matchesDifficulty =
        selectedDifficulty === "All" || r.difficulty === selectedDifficulty;

      const matchesCollection =
        selectedCollection === "All" ||
        Boolean(
          collections.find((c) => c.id === selectedCollection)?.recipeIds.includes(r.id)
        );

      return (
        matchesSearch &&
        matchesProtein &&
        matchesCuisine &&
        matchesDifficulty &&
        matchesCollection
      );
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "time") return a.totalTimeMinutes - b.totalTimeMinutes;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [
    searchTerm,
    selectedProtein,
    selectedCuisine,
    selectedDifficulty,
    selectedCollection,
    sortBy,
    collections,
  ]);

  // Handle ingredient scale
  const parseAndScaleAmount = (amountStr: string, multiplier: number) => {
    const num = parseFloat(amountStr);
    if (isNaN(num)) return amountStr;
    const scaled = num * multiplier;
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareFeedback("Recipe link copied!");
      setTimeout(() => setShareFeedback(""), 3000);
    }
  };

  // If a recipe detail is open
  if (currentRecipe) {
    const isSaved = savedRecipeIds.has(currentRecipe.id);
    const currentRecipeCollections = collections.filter((col) =>
      col.recipeIds.includes(currentRecipe.id)
    );
    const scaledServings = Math.round(currentRecipe.servings * servingMultiplier);
    const perServingNutrition = calculatePerServingNutrition(currentRecipe, scaledServings);

    // Schema JSON-LD structured data for Google Rich Snippets
    const jsonLdData = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      name: currentRecipe.title,
      image: [currentRecipe.heroImage],
      author: {
        "@type": "Person",
        name: currentRecipe.author.name,
      },
      datePublished: currentRecipe.updatedDate,
      description: currentRecipe.description,
      prepTime: `PT${currentRecipe.prepTimeMinutes}M`,
      cookTime: `PT${currentRecipe.cookTimeMinutes}M`,
      totalTime: `PT${currentRecipe.totalTimeMinutes}M`,
      keywords: currentRecipe.tags.join(", "),
      recipeYield: `${scaledServings} servings`,
      recipeCategory: currentRecipe.category,
      recipeCuisine: currentRecipe.cuisine,
      nutrition: {
        "@type": "NutritionInformation",
        calories: `${perServingNutrition.calories} calories`,
        proteinContent: `${perServingNutrition.proteinGrams} g`,
        carbohydrateContent: `${perServingNutrition.carbsGrams} g`,
        fatContent: `${perServingNutrition.fatGrams} g`,
      },
      recipeIngredient: currentRecipe.ingredients.map(
        (i) => `${i.amount} ${i.unit || ""} ${i.name} ${i.notes ? `(${i.notes})` : ""}`.trim()
      ),
      recipeInstructions: currentRecipe.instructions.map((inst) => ({
        "@type": "HowToStep",
        name: inst.title,
        text: inst.instruction,
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: blendedRating.rating.toString(),
        reviewCount: blendedRating.reviewCount.toString(),
      },
      ...(currentRecipe.youtubeVideoId
        ? {
            video: {
              "@type": "VideoObject",
              name: currentRecipe.videoTitle || currentRecipe.title,
              description: currentRecipe.description,
              thumbnailUrl: [currentRecipe.heroImage],
              uploadDate: currentRecipe.updatedDate,
              contentUrl:
                currentRecipe.youtubeUrl ||
                `https://www.youtube.com/watch?v=${currentRecipe.youtubeVideoId}`,
              embedUrl: `https://www.youtube-nocookie.com/embed/${currentRecipe.youtubeVideoId}`,
            },
          }
        : {}),
    };

    const relatedGuides = COOKING_GUIDES.filter(
      (g) =>
        g.relatedRecipeSlugs.includes(currentRecipe.slug) ||
        Boolean(currentRecipe.relatedGuideSlugs?.includes(g.slug)) ||
        Boolean(g.tags && currentRecipe.tags && currentRecipe.tags.some((t) => g.tags!.includes(t)))
    ).slice(0, 3);

    return (
      <div className="w-full bg-[#FAF9F6] py-8 sm:py-12">
        {/* Inject Recipe Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />

        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#77736D] mb-6 print:hidden">
            <button
              onClick={() => onNavigate("/")}
              className="hover:text-[#30302F] cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setActiveSlug(null);
                onNavigate("/recipes");
              }}
              className="hover:text-[#30302F] cursor-pointer"
            >
              Recipes
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate(`/category/${currentRecipe.categorySlug}`)}
              className="hover:text-[#E97520] cursor-pointer"
            >
              {currentRecipe.category}
            </button>
            <span>/</span>
            <span className="text-[#30302F] font-bold truncate max-w-[200px]">
              {currentRecipe.title}
            </span>
          </nav>

          {/* Back buttons */}
          <div className="flex items-center gap-3 mb-4 print:hidden">
            <button
              onClick={() => {
                setActiveSlug(null);
                onNavigate("/");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#30302F] hover:text-[#E97520] bg-white border border-[#E6E1D8] px-3.5 py-1.5 rounded-md shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
            <button
              onClick={() => {
                setActiveSlug(null);
                onNavigate("/recipes");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#77736D] hover:text-[#30302F] px-3 py-1.5 transition-colors cursor-pointer"
            >
              Browse All Recipes
            </button>
          </div>

          {/* Recipe Article Container */}
          <article
            id="recipe-detail-header"
            className="bg-white rounded-xl border border-[#E6E1D8] shadow-sm p-6 sm:p-10 space-y-8 scroll-mt-6"
          >
            {/* Print-Only Header */}
            <div className="hidden print:block pb-4 mb-2 border-b-2 border-[#242423]">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold font-serif-editorial text-[#242423]">
                    Noakhali Kitchen
                  </h1>
                  <p className="text-xs text-[#77736D]">
                    Authentic Halal Recipes &bull; https://noakhalikitchen.com/recipes/{currentRecipe.slug}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block border border-[#2D7A52] text-[#2D7A52] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    100% Halal Verified
                  </span>
                  <p className="text-[10px] text-[#77736D] mt-0.5">Strictly Pork &amp; Alcohol Free</p>
                </div>
              </div>
            </div>

            {/* Header Area */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97520] font-subheading">
                {currentRecipe.category} &bull; {currentRecipe.cuisine}
              </span>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-[#242423] font-heading leading-snug tracking-wide uppercase">
                {currentRecipe.title}
              </h1>

              <p className="text-sm sm:text-base text-[#4D4943] leading-relaxed font-description">
                {currentRecipe.description}
              </p>

              {/* Meta and Reviews Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[#77736D]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("recipe-rating-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center text-[#E7A52B] hover:opacity-80 transition-opacity cursor-pointer group"
                    title="Jump to Community Rating & Reviews"
                  >
                    <Star className="w-4 h-4 fill-[#E7A52B]" />
                    <span className="ml-1 font-bold text-[#30302F] group-hover:text-[#E97520]">
                      {blendedRating.rating}
                    </span>
                  </button>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("recipe-rating-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:underline hover:text-[#E97520] transition-colors cursor-pointer"
                  >
                    {blendedRating.reviewCount} reviews
                  </button>
                  {currentUserRating ? (
                    <>
                      <span>&bull;</span>
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("recipe-rating-section")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1 font-bold text-[#E97520] bg-[#FFF9F0] border border-[#F8CD78] px-2 py-0.5 rounded cursor-pointer hover:bg-[#F8CD78]/30 transition-colors"
                        title="Click to view or edit your saved rating"
                      >
                        <Star className="w-3 h-3 fill-[#E7A52B] text-[#E7A52B]" />
                        <span>You rated: {currentUserRating.rating}/5</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <span>&bull;</span>
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById("recipe-rating-section")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-[#E97520] hover:underline font-bold cursor-pointer"
                      >
                        Rate recipe
                      </button>
                    </>
                  )}
                  <span>&bull;</span>
                  <span>Updated {currentRecipe.updatedDate}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={() => onToggleSaveRecipe(currentRecipe)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                      isSaved
                        ? "bg-[#E97520] text-white"
                        : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE]"
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
                    {isSaved ? "Saved" : "Save Recipe"}
                  </button>

                  <button
                    onClick={() => setRecipeForCollection(currentRecipe)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE] hover:border-[#E97520] transition-colors cursor-pointer"
                    title="Organize into Custom Collections (e.g., Eid Feast, Weeknight Dinners)"
                  >
                    <FolderHeart className="w-3.5 h-3.5 text-[#E97520]" />
                    <span>Collections</span>
                    {currentRecipeCollections.length > 0 && (
                      <span className="bg-[#E97520] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {currentRecipeCollections.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-bold bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE] hover:border-[#E97520] transition-all cursor-pointer shadow-2xs print-keep"
                    title="Open Print-Friendly Version with Nutritional Breakdown"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#E97520]" />
                    Print Recipe
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#77736D]" />
                    Share
                  </button>
                </div>
              </div>

              {/* Collections Badges */}
              {currentRecipeCollections.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#F3F2EE]">
                  <span className="text-[11px] font-semibold text-[#77736D] flex items-center gap-1">
                    <FolderHeart className="w-3 h-3 text-[#E97520]" />
                    Collections:
                  </span>
                  {currentRecipeCollections.map((col) => (
                    <span
                      key={col.id}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full text-white inline-flex items-center gap-1 shadow-2xs"
                      style={{ backgroundColor: col.color || "#E97520" }}
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      {col.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Print-friendly shortcut bar */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#77736D] pt-1 print:hidden">
                <span className="font-semibold text-[#30302F] flex items-center gap-1">
                  <Printer className="w-3 h-3 text-[#E97520]" />
                  Print options:
                </span>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="hover:text-[#E97520] underline underline-offset-2 cursor-pointer font-medium"
                >
                  Configure &amp; Preview
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => openPrintWindow(currentRecipe, { multiplier: servingMultiplier })}
                  className="hover:text-[#E97520] underline underline-offset-2 flex items-center gap-1 cursor-pointer font-medium"
                  title="Open print sheet in a clean browser tab"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open Clean Tab
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => downloadPrintableHtml(currentRecipe, { multiplier: servingMultiplier })}
                  className="hover:text-[#E97520] underline underline-offset-2 flex items-center gap-1 cursor-pointer font-medium"
                  title="Download offline printable recipe file"
                >
                  <Download className="w-3 h-3" />
                  Download File
                </button>
              </div>

              {shareFeedback && (
                <div className="text-xs text-[#2D7A52] font-semibold print:hidden">
                  {shareFeedback}
                </div>
              )}
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#E6E1D8] bg-[#FAF9F6]">
              <img
                src={currentRecipe.heroImage}
                alt={currentRecipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#30302F]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                100% Halal Verified
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 p-3.5 sm:p-4 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] text-center text-xs">
              <div>
                <span className="text-[#8A857E] block text-[10px] font-bold uppercase tracking-wider">PREP TIME</span>
                <span className="font-bold text-[#30302F] text-sm">{currentRecipe.prepTimeMinutes} mins</span>
              </div>
              <div>
                <span className="text-[#8A857E] block text-[10px] font-bold uppercase tracking-wider">COOK TIME</span>
                <span className="font-bold text-[#30302F] text-sm">{currentRecipe.cookTimeMinutes} mins</span>
              </div>
              <div>
                <span className="text-[#8A857E] block text-[10px] font-bold uppercase tracking-wider">TOTAL TIME</span>
                <span className="font-bold text-[#30302F] text-sm">{currentRecipe.totalTimeMinutes} mins</span>
              </div>
              <div>
                <span className="text-[#8A857E] block text-[10px] font-bold uppercase tracking-wider">SERVINGS</span>
                <span className="font-bold text-[#30302F] text-sm">{scaledServings}</span>
              </div>
              <div className="bg-[#FFF9F0] border border-[#F8CD78]/60 rounded py-1 px-1">
                <span className="text-[#D75D17] block text-[10px] font-bold uppercase tracking-wider">CALORIES / SVG</span>
                <span className="font-bold text-[#242423] text-sm">{perServingNutrition.calories} kcal</span>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200/70 rounded py-1 px-1">
                <span className="text-emerald-800 block text-[10px] font-bold uppercase tracking-wider">PROTEIN / SVG</span>
                <span className="font-bold text-emerald-950 text-sm">{perServingNutrition.proteinGrams}g</span>
              </div>
              <div className="bg-orange-50/70 border border-orange-200/70 rounded py-1 px-1">
                <span className="text-orange-800 block text-[10px] font-bold uppercase tracking-wider">FAT / SVG</span>
                <span className="font-bold text-orange-950 text-sm">{perServingNutrition.fatGrams}g</span>
              </div>
            </div>

            {/* Key Nutritional Information Per Serving Card */}
            <KeyNutritionalPerServing
              recipe={currentRecipe}
              scaledServings={scaledServings}
            />

            {/* WATCH THE FULL RECIPE (Optional YouTube Video Player) */}
            {(currentRecipe.youtubeVideoId || currentRecipe.youtubeUrl) && (
              <div className="space-y-3 pt-2 print:hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E97520] animate-pulse" />
                    <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#242423] font-heading">
                      WATCH THE FULL RECIPE
                    </h2>
                  </div>
                  <span className="text-[11px] text-[#77736D] font-medium hidden sm:inline">
                    Companion Cooking Video &bull; Noakhali Kitchen YouTube
                  </span>
                </div>
                <YouTubePlayer
                  videoId={currentRecipe.youtubeVideoId}
                  videoUrl={currentRecipe.youtubeUrl}
                  title={currentRecipe.videoTitle || currentRecipe.title}
                  thumbnailUrl={currentRecipe.heroImage}
                  duration={currentRecipe.videoDuration}
                  subtitle={`Step-by-step masterclass: ${currentRecipe.title}`}
                />
              </div>
            )}

            {/* PRINT / SAVE / SCALE RECIPE Structured Action Bar */}
            <div className="p-4 bg-white rounded-xl border border-[#E6E1D8] shadow-2xs space-y-3 print:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E97520] block">
                    QUICK CHEF CONTROLS
                  </span>
                  <h3 className="text-sm font-bold text-[#242423] uppercase tracking-wider font-heading">
                    PRINT &bull; SAVE &bull; SCALE RECIPE
                  </h3>
                </div>

                {/* Quick Scaler Buttons */}
                <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-[#E6E1D8] p-1 rounded-lg text-xs">
                  <span className="text-[11px] font-semibold text-[#77736D] px-2">Scale:</span>
                  {[0.5, 1, 2, 3].map((mult) => (
                    <button
                      key={mult}
                      onClick={() => setServingMultiplier(mult)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                        servingMultiplier === mult
                          ? "bg-[#30302F] text-white"
                          : "text-[#3F3C38] hover:bg-white"
                      }`}
                    >
                      {mult}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3F2EE]">
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#30302F] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#E7A52B]" />
                  Print Recipe Card
                </button>

                <button
                  onClick={() => onToggleSaveRecipe(currentRecipe)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    isSaved
                      ? "bg-[#2D7A52] text-white border-[#2D7A52]"
                      : "bg-[#FAF9F6] border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE]"
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : "text-[#E97520]"}`} />
                  {isSaved ? "Recipe Saved in Favorites" : "Save Recipe"}
                </button>

                <button
                  onClick={() => {
                    document.getElementById("recipe-ingredients")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE] text-xs font-bold transition-all cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-[#77736D]" />
                  Jump to Ingredients Checklist
                </button>

                <button
                  onClick={() => onNavigate("/tools")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFF9F0] border border-[#F8CD78]/70 text-[#D75D17] hover:bg-[#F8CD78]/30 text-xs font-bold transition-all cursor-pointer ml-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
                  Kitchen Tools &amp; Converter
                </button>
              </div>
            </div>

            {/* Story / Intro */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#242423] font-heading tracking-wide uppercase">
                The Heritage of This Dish
              </h2>
              <p className="text-base sm:text-lg text-[#3F3C38] leading-relaxed font-description italic">
                {currentRecipe.introStory}
              </p>
            </div>

            {/* Halal Verification Component */}
            <HalalCheck
              title="Halal Verification &amp; Ingredient Notes"
              notes={currentRecipe.halalNotes}
              cautionNotes={currentRecipe.potentialCautionNotes}
            />

            {/* Ingredients Section with Scaler */}
            <div id="recipe-ingredients" className="space-y-4 pt-4 border-t border-[#E6E1D8]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                    Ingredients
                  </h2>
                  <p className="text-xs text-[#77736D]">
                    Click any ingredient to check it off as you prep.
                  </p>
                </div>

                {/* Interactive Serving Scaler Controls */}
                <div className="flex flex-wrap items-center gap-2 bg-[#FAF9F6] border border-[#E6E1D8] px-3 py-1.5 rounded-lg text-xs self-start sm:self-auto print:border-none print:bg-transparent print:p-0">
                  <span className="text-[#77736D] font-medium">Servings:</span>
                  <button
                    onClick={() => setServingMultiplier((prev) => Math.max(0.5, prev - 0.5))}
                    className="w-5 h-5 rounded bg-white border border-[#E6E1D8] flex items-center justify-center hover:bg-[#F3F2EE] cursor-pointer print:hidden"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-[#30302F] w-6 text-center">{scaledServings}</span>
                  <button
                    onClick={() => setServingMultiplier((prev) => Math.min(3, prev + 0.5))}
                    className="w-5 h-5 rounded bg-white border border-[#E6E1D8] flex items-center justify-center hover:bg-[#F3F2EE] cursor-pointer print:hidden"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  {servingMultiplier !== 1 && (
                    <button
                      onClick={() => setServingMultiplier(1)}
                      className="text-[10px] text-[#E97520] font-bold underline ml-1 cursor-pointer print:hidden"
                    >
                      Reset
                    </button>
                  )}
                  <span className="text-[11px] text-[#77736D] hidden md:inline ml-1.5 border-l border-[#E6E1D8] pl-2">
                    {perServingNutrition.calories} kcal &bull; {perServingNutrition.proteinGrams}g protein &bull; {perServingNutrition.fatGrams}g fat / serving
                  </span>
                </div>
              </div>

              {/* Kitchen Converter Quick Link */}
              <div className="flex items-center justify-between text-xs bg-[#FAF9F6] border border-[#E6E1D8] px-3 py-2 rounded-lg print:hidden">
                <span className="text-[#77736D]">
                  Need metric/imperial conversions for flour, ghee, or spices?
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("/converter")}
                  className="text-[#E97520] hover:text-[#D75D17] font-bold flex items-center gap-1.5 cursor-pointer ml-2 shrink-0 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Interactive Kitchen Converter</span>
                </button>
              </div>

              {/* Ingredient List */}
              <ul className="space-y-2 text-sm pt-2">
                {currentRecipe.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients.has(idx);
                  const displayAmount = parseAndScaleAmount(ing.amount, servingMultiplier);
                  return (
                    <li
                      key={idx}
                      onClick={() => {
                        const next = new Set(checkedIngredients);
                        if (next.has(idx)) next.delete(idx);
                        else next.add(idx);
                        setCheckedIngredients(next);
                      }}
                      className={`flex items-start gap-3 p-2.5 rounded-md transition-colors cursor-pointer border ${
                        isChecked
                          ? "bg-[#FAF9F6] text-[#8A857E] border-transparent line-through"
                          : "bg-white text-[#3F3C38] border-[#E6E1D8] hover:border-[#F8CD78]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-[#2D7A52] border-[#2D7A52] text-white"
                            : "border-[#77736D]"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <strong className="text-[#242423]">
                          {displayAmount} {ing.unit || ""}{" "}
                        </strong>
                        <span>{ing.name}</span>
                        {ing.notes && (
                          <span className="text-xs text-[#77736D] italic block sm:inline sm:ml-1">
                            — {ing.notes}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Substitutions */}
            {currentRecipe.substitutions.length > 0 && (
              <div className="p-4 bg-[#FFF9F0] rounded-lg border border-[#F8CD78]/40 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D75D17]">
                  Ingredient Substitutions
                </h3>
                <div className="space-y-2 text-xs text-[#3F3C38]">
                  {currentRecipe.substitutions.map((sub, idx) => (
                    <p key={idx}>
                      <strong>Replace {sub.original}:</strong> Use {sub.substitute}. {sub.notes}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="space-y-6 pt-4 border-t border-[#E6E1D8]">
              <div>
                <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                  Step-by-Step Instructions
                </h2>
                <p className="text-xs text-[#77736D]">
                  Mark steps complete as your cooking progresses, and use interactive timers on any step.
                </p>
              </div>

              <div className="space-y-4">
                {currentRecipe.instructions.map((inst) => {
                  const isDone = completedSteps.has(inst.step);
                  return (
                    <div
                      key={inst.step}
                      id={`recipe-step-${inst.step}`}
                      className={`p-4 rounded-lg border transition-colors ${
                        isDone
                          ? "bg-[#FAF9F6] border-[#2D7A52]/30 text-[#8A857E]"
                          : "bg-white border-[#E6E1D8] shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isDone ? "text-[#2D7A52]" : "text-[#E97520]"
                          }`}
                        >
                          Step {inst.step}: {inst.title}
                        </span>

                        <button
                          onClick={() => {
                            const next = new Set(completedSteps);
                            if (next.has(inst.step)) next.delete(inst.step);
                            else next.add(inst.step);
                            setCompletedSteps(next);
                          }}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer print:hidden ${
                            isDone
                              ? "bg-[#2D7A52] text-white"
                              : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#77736D] hover:text-[#30302F]"
                          }`}
                        >
                          {isDone ? "Completed ✓" : "Mark Done"}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-[#3F3C38] leading-relaxed">
                        {inst.instruction}
                      </p>

                      {inst.tip && (
                        <div className="mt-2 text-xs text-[#D75D17] bg-[#FFF9F0] p-2 rounded border border-[#F8CD78]/40">
                          <strong>Chef's Tip:</strong> {inst.tip}
                        </div>
                      )}

                      {/* Interactive Step Countdown Timer */}
                      <CookingStepTimer
                        stepNumber={inst.step}
                        stepTitle={inst.title}
                        stepInstruction={inst.instruction}
                        isStepDone={isDone}
                        onMarkComplete={() => {
                          const next = new Set(completedSteps);
                          next.add(inst.step);
                          setCompletedSteps(next);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chef Notes */}
            {currentRecipe.chefNotes.length > 0 && (
              <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#30302F] flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[#E97520]" />
                  Chef's Secrets
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#77736D]">
                  {currentRecipe.chefNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition Information & Macro Breakdown */}
            <div id="recipe-nutrition-breakdown">
              <NutritionalBreakdown recipe={currentRecipe} />
            </div>

            {/* Storage & Freezing Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <strong className="block text-[#30302F] font-bold mb-1 uppercase tracking-wider text-[11px]">
                  Storage Guide
                </strong>
                <p className="text-[#77736D] leading-relaxed">
                  {currentRecipe.storageInstructions}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <strong className="block text-[#30302F] font-bold mb-1 uppercase tracking-wider text-[11px]">
                  Freezing Guide
                </strong>
                <p className="text-[#77736D] leading-relaxed">
                  {currentRecipe.freezingInstructions}
                </p>
              </div>
            </div>

            {/* Serving Suggestions */}
            {currentRecipe.servingSuggestions.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#30302F]">
                  Serving Suggestions
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#77736D]">
                  {currentRecipe.servingSuggestions.map((sugg, idx) => (
                    <li key={idx}>{sugg}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recipe FAQs */}
            {currentRecipe.faqs.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E6E1D8]">
                <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                  Recipe FAQs
                </h2>
                <div className="space-y-3">
                  {currentRecipe.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] space-y-1">
                      <h4 className="text-xs font-bold text-[#30302F]">{faq.question}</h4>
                      <p className="text-xs text-[#77736D] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Community Rating & Star Review System (Persisted in LocalStorage) */}
            <div className="print:hidden">
              <RecipeRatingCard
                recipe={currentRecipe}
                userRating={currentUserRating}
                onSaveRating={handleSaveRating}
                onDeleteRating={handleDeleteRating}
              />
            </div>

            {/* Author Attribution */}
            <div className="p-4 bg-[#FFF9F0] rounded-lg border border-[#F8CD78]/40 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D75D17] block">
                  Recipe Developer
                </span>
                <span className="font-bold text-[#30302F]">{currentRecipe.author.name}</span>
                <span className="text-[#77736D] block">{currentRecipe.author.role}</span>
              </div>
              <span className="text-[11px] text-[#8A857E]">
                Noakhali Kitchen Verified Standard
              </span>
            </div>

            {/* Connected Cooking Guides (Internal Linking) */}
            {relatedGuides.length > 0 && (
              <div className="p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-4 shadow-xs print:hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E97520] block">
                      CULINARY TECHNIQUES
                    </span>
                    <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                      Guides &amp; Techniques for This Recipe
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate("/guides")}
                    className="text-xs font-bold text-[#E97520] hover:underline cursor-pointer"
                  >
                    All Cooking Guides &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedGuides.map((guide) => (
                    <button
                      key={guide.id}
                      onClick={() => onNavigate(`/guides/${guide.slug}`)}
                      className="text-left p-3.5 rounded-lg border border-[#E6E1D8] hover:border-[#E97520] bg-[#FAF9F6] transition-colors cursor-pointer group flex flex-col justify-between space-y-2.5"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520]">
                          {guide.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#30302F] group-hover:text-[#E97520] transition-colors line-clamp-2 leading-snug">
                          {guide.title}
                        </h4>
                      </div>
                      <span className="text-[11px] text-[#77736D] font-medium">
                        {guide.readTimeMinutes} min read &bull; View Guide &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Print-Only Footer */}
            <div className="hidden print:block pt-4 mt-6 border-t border-[#E6E1D8] text-[10px] text-[#77736D] text-center">
              <p>Printed from Noakhali Kitchen (https://noakhalikitchen.com) &bull; Authentic Halal Culinary Standard</p>
              <p className="mt-0.5">Strictly 100% Halal Verified &bull; Pork &amp; Alcohol Free Recipe Repository</p>
            </div>
          </article>

          {/* Post-Recipe Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 pb-2 print:hidden">
            <button
              onClick={() => {
                setActiveSlug(null);
                onNavigate("/");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E97520] hover:bg-[#D75D17] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home Page
            </button>
            <button
              onClick={() => {
                setActiveSlug(null);
                onNavigate("/recipes");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] font-bold text-xs uppercase tracking-wider shadow-2xs transition-all cursor-pointer"
            >
              Explore All Recipes &rarr;
            </button>
          </div>

          {/* Print Recipe Modal */}
          <PrintRecipeModal
            recipe={currentRecipe}
            isOpen={isPrintModalOpen}
            onClose={() => setIsPrintModalOpen(false)}
            initialServingsMultiplier={servingMultiplier}
          />

          {/* Add To Collection Modal */}
          {recipeForCollection && (
            <AddToCollectionModal
              isOpen={Boolean(recipeForCollection)}
              onClose={() => setRecipeForCollection(null)}
              recipe={recipeForCollection}
              collections={collections}
              onToggleRecipeInCollection={(colId, recId) => {
                if (onToggleRecipeInCollection) {
                  onToggleRecipeInCollection(colId, recId);
                }
              }}
              onCreateCollection={(name) => {
                if (onCreateCollection) {
                  onCreateCollection(name);
                }
              }}
            />
          )}

          {/* Ad Slot in Recipe */}
          <AdSlot slotId="recipe-bottom" format="horizontal" />
        </div>
      </div>
    );
  }

  // Recipe Index Catalog View
  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
            HALAL RECIPE INDEX
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242423] font-serif-editorial">
            Authentic Halal Recipes
          </h1>
          <p className="text-sm text-[#77736D]">
            Explore comforting, tested Halal recipes—from royal biryanis and slow-braised curries to quick weeknight family dinners.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-lg border border-[#E6E1D8] p-4 sm:p-5 mb-8 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input with Instant Refresh & Clear */}
            <div className="relative w-full md:max-w-md flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipe by name, ingredient (e.g. prawns, beef)..."
                className="w-full px-4 py-2 pr-16 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F]"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5 text-[#8A857E]">
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="p-1 hover:text-[#30302F] cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const curr = searchTerm;
                    setSearchTerm("");
                    setTimeout(() => setSearchTerm(curr), 40);
                  }}
                  className="p-1 hover:text-[#E97520] cursor-pointer transition-colors"
                  title="Auto-refresh search results"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#E97520]" />
                </button>
              </div>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 text-xs self-start md:self-auto">
              <span className="text-[#77736D] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF9F6] border border-[#E6E1D8] px-2.5 py-1.5 rounded text-xs text-[#30302F] focus:outline-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="time">Fastest Cook Time</option>
                <option value="reviews">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Cuisine & Culinary Tradition Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#F3F2EE] text-xs">
            <span className="text-[#77736D] font-semibold text-[11px] uppercase tracking-wider mr-1">
              Cuisine &amp; Tradition:
            </span>
            {[
              "All",
              "Bangladeshi",
              "Indian",
              "Pakistani",
              "Middle Eastern",
              "Everyday Halal",
              "Ramadan & Eid",
              "Desserts & Sweets",
              "Drinks",
            ].map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCuisine === cuisine
                    ? "bg-[#E97520] text-white"
                    : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#E97520]"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>

          {/* Protein Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3F2EE] text-xs">
            <span className="text-[#77736D] font-semibold text-[11px] uppercase tracking-wider mr-1">
              Category:
            </span>
            {["All", "Chicken", "Beef", "Meal Prep", "Fish & Seafood", "Kids Meal", "Desserts", "Drinks", "Street Food", "Vegetarian", "Ramadan & Eid"].map((protein) => (
              <button
                key={protein}
                onClick={() => setSelectedProtein(protein)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedProtein === protein
                    ? "bg-[#30302F] text-white"
                    : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#30302F]"
                }`}
              >
                {protein}
              </button>
            ))}

            <div className="h-4 w-px bg-[#E6E1D8] mx-1 hidden sm:inline-block"></div>

            <span className="text-[#77736D] font-semibold text-[11px] uppercase tracking-wider mr-1 hidden sm:inline">
              Difficulty:
            </span>
            {["All", "Easy", "Medium", "Advanced"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-[#E97520] text-white"
                    : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#E97520]"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Custom Collections Filter Chips */}
          {collections.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#F3F2EE] text-xs">
              <span className="text-[#77736D] font-semibold text-[11px] uppercase tracking-wider mr-1 flex items-center gap-1">
                <FolderHeart className="w-3.5 h-3.5 text-[#E97520]" />
                Collections:
              </span>
              <button
                onClick={() => setSelectedCollection("All")}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCollection === "All"
                    ? "bg-[#242423] text-white"
                    : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#30302F]"
                }`}
              >
                All
              </button>
              {collections.map((col) => {
                const isSelected = selectedCollection === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() =>
                      setSelectedCollection(isSelected ? "All" : col.id)
                    }
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "text-white shadow-2xs"
                        : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#8A857E]"
                    }`}
                    style={
                      isSelected
                        ? { backgroundColor: col.color || "#E97520" }
                        : undefined
                    }
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: isSelected
                          ? "#FFF"
                          : col.color || "#E97520",
                      }}
                    />
                    <span>{col.name}</span>
                    <span
                      className={`text-[10px] px-1 py-0.1 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[#E6E1D8] text-[#3F3C38]"
                      }`}
                    >
                      {col.recipeIds.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-lg border border-[#E6E1D8] space-y-3">
            <ChefHat className="w-12 h-12 mx-auto text-[#E6E1D8]" />
            <h3 className="text-base font-bold text-[#30302F] font-serif-editorial">
              No matching Halal recipes found
            </h3>
            <p className="text-xs text-[#77736D] max-w-sm mx-auto">
              We couldn't find recipes matching your current filters. Try resetting the search or exploring our category hubs.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedProtein("All");
                setSelectedDifficulty("All");
              }}
              className="px-4 py-2 bg-[#30302F] text-white text-xs font-bold uppercase rounded cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={savedRecipeIds.has(recipe.id)}
                onToggleSave={onToggleSaveRecipe}
                onClick={(r) => {
                  setActiveSlug(r.slug);
                  onNavigate(`/recipe/${r.slug}`, true);
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }}
                collections={collections}
                onOpenCollections={(r) => setRecipeForCollection(r)}
                userRating={userRatings[recipe.id]?.rating}
              />
            ))}
          </div>
        )}

        {/* Ad Slot */}
        <AdSlot slotId="recipes-catalog-footer" format="horizontal" />
      </div>

      {/* Add To Collection Modal */}
      {recipeForCollection && (
        <AddToCollectionModal
          isOpen={Boolean(recipeForCollection)}
          onClose={() => setRecipeForCollection(null)}
          recipe={recipeForCollection}
          collections={collections}
          onToggleRecipeInCollection={(colId, recId) => {
            if (onToggleRecipeInCollection) {
              onToggleRecipeInCollection(colId, recId);
            }
          }}
          onCreateCollection={(name) => {
            if (onCreateCollection) {
              onCreateCollection(name);
            }
          }}
        />
      )}
    </div>
  );
};
