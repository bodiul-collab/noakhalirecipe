import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { SearchUtilityRow } from "./components/SearchUtilityRow";
import { Footer } from "./components/Footer";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { SavedRecipesDrawer } from "./components/SavedRecipesDrawer";
import { CollectionModal } from "./components/CollectionModal";
import { AddToCollectionModal } from "./components/AddToCollectionModal";

import { HomeView } from "./views/HomeView";
import { RecipesView } from "./views/RecipesView";
import { CategoryView } from "./views/CategoryView";
import { BlogView } from "./views/BlogView";
import { CookingGuidesView } from "./views/CookingGuidesView";
import { FoodCultureView } from "./views/FoodCultureView";
import { HalalPantryView } from "./views/HalalPantryView";
import { ToolsView } from "./views/ToolsView";
import { AboutView } from "./views/AboutView";
import { ContactView } from "./views/ContactView";
import { LegalView } from "./views/LegalView";

import { RECIPES } from "./data/recipes";
import { Recipe, RecipeCollection } from "./types";
import {
  loadCollections,
  saveCollections,
  createCollection,
  toggleRecipeInCollection,
} from "./utils/collectionsStorage";

const isRecipeDetailRoute = (r: string) => {
  return r.startsWith("/recipe/") || (r.startsWith("/recipes/") && r !== "/recipes");
};

const extractRecipeSlug = (r: string) => {
  if (isRecipeDetailRoute(r)) {
    const raw = r.replace(/^\/recipes?\//, "").split("/")[0].split("?")[0].split("#")[0] || null;
    if (raw === "puri" || raw === "poori" || raw === "puri-recipe" || raw === "poori-recipe") {
      return "puri-poori";
    }
    if (
      raw === "beef-shatkora" ||
      raw === "shatkora-beef" ||
      raw === "sylheti-beef-shatkora" ||
      raw === "shatkora" ||
      raw === "satkara-beef" ||
      raw === "beef-satkara"
    ) {
      return "authentic-beef-shatkora";
    }
    if (
      raw === "shami-kabab" ||
      raw === "shami-kebab" ||
      raw === "beef-shami" ||
      raw === "beef-shami-kebab" ||
      raw === "shami"
    ) {
      return "beef-shami-kabab";
    }
    if (
      raw === "veggie-smash-burger" ||
      raw === "green-veggie-burger" ||
      raw === "veggie-burger-recipe" ||
      raw === "vegetarian-burger"
    ) {
      return "veggie-burger";
    }
    if (
      raw === "beef-pie" ||
      raw === "aussie-beef-pie" ||
      raw === "australian-meat-pie" ||
      raw === "aussie-meat-pie" ||
      raw === "australian-beef-meat-pie"
    ) {
      return "australian-beef-pie";
    }
    if (
      raw === "butter-salmon" ||
      raw === "salmon-makhani" ||
      raw === "salmon-butter-curry" ||
      raw === "butter-salmon-makhani"
    ) {
      return "butter-salmon-curry";
    }
    if (
      raw === "smash-burger" ||
      raw === "double-beef-burger" ||
      raw === "beef-smash-burger" ||
      raw === "double-cheeseburger" ||
      raw === "gourmet-beef-burger"
    ) {
      return "beef-burger";
    }
    if (
      raw === "blue-coconut-cloud-smoothie" ||
      raw === "erewhon-cloud-smoothie" ||
      raw === "blue-cloud-smoothie" ||
      raw === "cloud-smoothie" ||
      raw === "erewhon-smoothie"
    ) {
      return "coconut-cloud-smoothie";
    }
    if (
      raw === "earth-day-smoothie" ||
      raw === "matcha-earth-smoothie" ||
      raw === "planet-earth-smoothie" ||
      raw === "earth-day"
    ) {
      return "earth-smoothie";
    }
    if (
      raw === "haji-biryani" ||
      raw === "hazi-biryani" ||
      raw === "dhaka-haji-biryani" ||
      raw === "old-dhaka-biryani" ||
      raw === "puran-dhaka-haji-biryani" ||
      raw === "puran-dhaka-biryani"
    ) {
      return "old-dhaka-haji-biryani";
    }
    return raw;
  }
  return null;
};

// Permanent redirect handler for legacy /culture/bengali-radhuni-spice-guide
const RadhuniRedirect: React.FC<{ onRedirect: (to: string) => void }> = ({ onRedirect }) => {
  useEffect(() => {
    try {
      window.history.replaceState({}, "", "/guides/bengali-radhuni-guide");
    } catch {}
    onRedirect("/guides/bengali-radhuni-guide");
  }, [onRedirect]);
  return null;
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.pathname) {
      const p = window.location.pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
      if (p.startsWith("/directory")) {
        try {
          window.history.replaceState({}, "", "/recipes");
        } catch {}
        return "/recipes";
      }
      if (
        p === "/culture/bengali-radhuni-spice-guide" ||
        p === "/food-culture/bengali-radhuni-spice-guide" ||
        p === "/culture/bengali-radhuni-guide" ||
        p === "/food-culture/bengali-radhuni-guide"
      ) {
        try {
          window.history.replaceState({}, "", "/guides/bengali-radhuni-guide");
        } catch {}
        return "/guides/bengali-radhuni-guide";
      }
      if (
        p === "/guides/biye-barir-shahi-chicken-roast-guide" ||
        p === "/guides/biye-barir-shahi-chicken-roast"
      ) {
        try {
          window.history.replaceState({}, "", "/guides/bengali-shahi-chicken-roast-guide");
        } catch {}
        return "/guides/bengali-shahi-chicken-roast-guide";
      }
      return p || "/";
    }
    return "/";
  });

  const [selectedRecipeSlug, setSelectedRecipeSlug] = useState<string | null>(() => {
    if (typeof window !== "undefined" && window.location.pathname) {
      const p = window.location.pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
      return extractRecipeSlug(p);
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState<boolean>(false);

  // Theme (default dark) and Mood Density (default tight)
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const stored = localStorage.getItem("nk_theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {}
    return "dark";
  });

  const [density, setDensity] = useState<"tight" | "relaxed">(() => {
    try {
      const stored = localStorage.getItem("nk_density");
      if (stored === "tight" || stored === "relaxed") return stored;
    } catch {}
    return "tight";
  });

  // Sync dark class on documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("nk_theme", theme);
    } catch {}
  }, [theme]);

  // Sync tight-mode class on documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (density === "tight") {
      root.classList.add("tight-mode");
    } else {
      root.classList.remove("tight-mode");
    }
    try {
      localStorage.setItem("nk_density", density);
    } catch {}
  }, [density]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const handleToggleDensity = useCallback(() => {
    setDensity((prev) => (prev === "tight" ? "relaxed" : "tight"));
  }, []);

  // Custom Collections state with persistence
  const [collections, setCollections] = useState<RecipeCollection[]>(() => {
    return loadCollections();
  });
  const [collectionModalOpen, setCollectionModalOpen] = useState<boolean>(false);
  const [editingCollection, setEditingCollection] = useState<RecipeCollection | null>(null);
  const [recipeForCollectionModal, setRecipeForCollectionModal] = useState<Recipe | null>(null);

  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem("nk_saved_recipes");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return RECIPES.filter((r) => ids.includes(r.id));
      }
    } catch (e) {
      console.warn("Could not read localStorage for saved recipes", e);
    }
    return [RECIPES[0]]; // Default save Chicken Biryani as a starter bookmark
  });

  const savedRecipeIds = new Set(savedRecipes.map((r) => r.id));

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      let path = (window.location.pathname || "/").replace(/\/+$/, "") || "/";
      if (
        path === "/culture/bengali-radhuni-spice-guide" ||
        path === "/food-culture/bengali-radhuni-spice-guide" ||
        path === "/culture/bengali-radhuni-guide" ||
        path === "/food-culture/bengali-radhuni-guide"
      ) {
        try {
          window.history.replaceState({}, "", "/guides/bengali-radhuni-guide");
        } catch {}
        path = "/guides/bengali-radhuni-guide";
      }
      setCurrentRoute(path);
      const slug = extractRecipeSlug(path);
      setSelectedRecipeSlug(slug);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((rawRoute: string, preserveRecipeSlug = false) => {
    let route = rawRoute.trim();
    if (!route.startsWith("/")) {
      route = "/" + route;
    }
    // Normalize trailing slash
    if (route.length > 1 && route.endsWith("/")) {
      route = route.slice(0, -1);
    }

    // Redirect /directory to /recipes
    if (route.startsWith("/directory")) {
      route = "/recipes";
    }

    // Permanent 301 redirect legacy /culture/bengali-radhuni-spice-guide to canonical /guides/bengali-radhuni-guide
    if (
      route === "/culture/bengali-radhuni-spice-guide" ||
      route === "/food-culture/bengali-radhuni-spice-guide" ||
      route === "/culture/bengali-radhuni-guide" ||
      route === "/food-culture/bengali-radhuni-guide"
    ) {
      route = "/guides/bengali-radhuni-guide";
    }

    if (
      route === "/guides/biye-barir-shahi-chicken-roast-guide" ||
      route === "/guides/biye-barir-shahi-chicken-roast"
    ) {
      route = "/guides/bengali-shahi-chicken-roast-guide";
    }

    setCurrentRoute(route);

    const detailSlug = extractRecipeSlug(route);
    if (detailSlug) {
      setSelectedRecipeSlug(detailSlug);
    } else if (!preserveRecipeSlug) {
      setSelectedRecipeSlug(null);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    try {
      if (window.location.pathname !== route) {
        window.history.pushState({}, "", route);
      }
    } catch (e) {
      // Safely ignore history restriction errors
    }
  }, []);

  const handleToggleSaveRecipe = (recipe: Recipe) => {
    setSavedRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      let updated: Recipe[];
      if (exists) {
        updated = prev.filter((r) => r.id !== recipe.id);
      } else {
        updated = [...prev, recipe];
      }
      try {
        localStorage.setItem(
          "nk_saved_recipes",
          JSON.stringify(updated.map((r) => r.id))
        );
      } catch (e) {
        console.warn("Could not write to localStorage", e);
      }
      return updated;
    });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedRecipes((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem(
          "nk_saved_recipes",
          JSON.stringify(updated.map((r) => r.id))
        );
      } catch (e) {}
      return updated;
    });

    // Also remove recipe from any collections that had it
    setCollections((prev) => {
      const updated = prev.map((col) => ({
        ...col,
        recipeIds: col.recipeIds.filter((recId) => recId !== id),
      }));
      saveCollections(updated);
      return updated;
    });
  };

  // Collection management handlers
  const handleCreateCollection = (
    name: string,
    description?: string,
    color?: string,
    icon?: string
  ) => {
    const newCol = createCollection(name, description, color, icon);
    setCollections((prev) => {
      const updated = [...prev, newCol];
      saveCollections(updated);
      return updated;
    });
  };

  const handleOpenEditCollection = (collection: RecipeCollection) => {
    setEditingCollection(collection);
    setCollectionModalOpen(true);
  };

  const handleDeleteCollection = (collectionId: string) => {
    setCollections((prev) => {
      const updated = prev.filter((c) => c.id !== collectionId);
      saveCollections(updated);
      return updated;
    });
  };

  const handleToggleRecipeInCollection = (collectionId: string, recipeId: string) => {
    setCollections((prev) => {
      const targetCol = prev.find((c) => c.id === collectionId);
      const isAdding = targetCol ? !targetCol.recipeIds.includes(recipeId) : false;

      const updated = toggleRecipeInCollection(prev, collectionId, recipeId);
      saveCollections(updated);

      // If user adds recipe to a collection and it's not saved yet, bookmark it too
      if (isAdding) {
        const recipeObj = RECIPES.find((r) => r.id === recipeId);
        if (recipeObj) {
          setSavedRecipes((savedPrev) => {
            if (!savedPrev.some((r) => r.id === recipeId)) {
              const newSaved = [...savedPrev, recipeObj];
              try {
                localStorage.setItem(
                  "nk_saved_recipes",
                  JSON.stringify(newSaved.map((r) => r.id))
                );
              } catch (e) {}
              return newSaved;
            }
            return savedPrev;
          });
        }
      }

      return updated;
    });
  };

  const handleSelectRecipe = useCallback(
    (recipe: Recipe) => {
      setSelectedRecipeSlug(recipe.slug);
      const targetRoute = `/recipe/${recipe.slug}`;
      navigate(targetRoute, true);
    },
    [navigate]
  );

  const handleGlobalSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      setSearchQuery(trimmed);
      // Only navigate to /recipes if the user actually provided a search term
      if (trimmed) {
        setSelectedRecipeSlug(null);
        navigate("/recipes");
      }
    },
    [navigate]
  );

  // Determine active view based on currentRoute
  const renderCurrentView = () => {
    const rawPath = currentRoute.split("?")[0].split("#")[0].trim() || "/";
    const path = (rawPath.length > 1 && rawPath.endsWith("/")) ? rawPath.slice(0, -1) : rawPath;

    if (path === "/" || path === "") {
      return (
        <HomeView
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
          savedRecipeIds={savedRecipeIds}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          onOpenAssistant={() => setAssistantOpen(true)}
          collections={collections}
          onOpenCollections={(r) => setRecipeForCollectionModal(r)}
        />
      );
    }

    // Specific Recipe Detail View
    if (isRecipeDetailRoute(path)) {
      const pathSlug = extractRecipeSlug(path);
      const slug = pathSlug || selectedRecipeSlug;

      return (
        <RecipesView
          key={`recipe-detail-${slug || "default"}`}
          initialSlug={slug || undefined}
          onNavigate={navigate}
          savedRecipeIds={savedRecipeIds}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          initialSearchQuery={searchQuery}
          collections={collections}
          onToggleRecipeInCollection={handleToggleRecipeInCollection}
          onCreateCollection={(name) => handleCreateCollection(name)}
        />
      );
    }

    // All Recipes Catalog
    if (path === "/recipes" || path === "/recipe") {
      return (
        <RecipesView
          key="recipes-catalog"
          initialSlug={undefined}
          onNavigate={navigate}
          savedRecipeIds={savedRecipeIds}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          initialSearchQuery={searchQuery}
          collections={collections}
          onToggleRecipeInCollection={handleToggleRecipeInCollection}
          onCreateCollection={(name) => handleCreateCollection(name)}
        />
      );
    }

    // Category Hubs
    if (path === "/category" || path === "/categories") {
      return (
        <CategoryView
          key="all-categories"
          initialCategorySlug={undefined}
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
          savedRecipeIds={savedRecipeIds}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          collections={collections}
          onOpenCollections={(r) => setRecipeForCollectionModal(r)}
        />
      );
    }

    if (path.startsWith("/category/") || path.startsWith("/categories/")) {
      const catSlug = path.replace(/^\/categories?\//, "").split("/")[0];
      return (
        <CategoryView
          key={`category-${catSlug}`}
          initialCategorySlug={catSlug}
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
          savedRecipeIds={savedRecipeIds}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          collections={collections}
          onOpenCollections={(r) => setRecipeForCollectionModal(r)}
        />
      );
    }

    // Halal Places & Directory -> Seamlessly Redirect to Recipes
    if (path.startsWith("/directory")) {
      return (
        <RecipesView
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
          savedRecipeIds={savedRecipeIds}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          collections={collections}
          onOpenCollections={(r) => setRecipeForCollectionModal(r)}
        />
      );
    }

    // Cooking Guides Hub & Articles
    if (path === "/guides" || path.startsWith("/guides/") || path.startsWith("/guide/")) {
      const guideSlug = path.replace(/^\/guides?\/?/, "").split("/")[0] || undefined;
      return (
        <CookingGuidesView
          key={`guide-${guideSlug || "index"}`}
          initialSlug={guideSlug}
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
        />
      );
    }

    // Food Culture & Regional Heritage Articles
    if (
      path === "/culture" ||
      path.startsWith("/culture/") ||
      path === "/food-culture" ||
      path.startsWith("/food-culture/")
    ) {
      const cultureSlug =
        path.replace(/^\/(?:food-)?culture\/?/, "").split("/")[0] || undefined;

      // Permanent redirect legacy duplicate radhuni culture route to primary guide URL
      if (cultureSlug === "bengali-radhuni-spice-guide" || cultureSlug === "bengali-radhuni-guide") {
        return <RadhuniRedirect onRedirect={navigate} />;
      }

      return (
        <FoodCultureView
          key={`culture-${cultureSlug || "index"}`}
          initialSlug={cultureSlug}
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
        />
      );
    }

    // Halal Pantry & Nutrition Standards
    if (
      path === "/pantry" ||
      path.startsWith("/pantry/") ||
      path === "/halal-pantry" ||
      path.startsWith("/halal-pantry/")
    ) {
      const pantrySlug =
        path.replace(/^\/(?:halal-)?pantry\/?/, "").split("/")[0] || undefined;
      return (
        <HalalPantryView
          key={`pantry-${pantrySlug || "index"}`}
          initialSlug={pantrySlug}
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
        />
      );
    }

    // Culinary Guides & Blog
    if (path.startsWith("/blog")) {
      const blogSlug = path.replace(/^\/blog\/?/, "").split("/")[0] || undefined;
      return (
        <BlogView
          key={`blog-${blogSlug || "index"}`}
          initialSlug={blogSlug}
          onNavigate={navigate}
          onSelectRecipe={handleSelectRecipe}
        />
      );
    }

    // Kitchen Converters, Equipment & Tools
    if (
      path.startsWith("/tools") ||
      path === "/converter" ||
      path === "/scaler" ||
      path === "/equipment" ||
      path === "/ecodes"
    ) {
      const initialTab =
        path === "/equipment" || path === "/tools/equipment"
          ? "equipment"
          : path === "/converter" || path === "/tools/converter"
          ? "converter"
          : path === "/scaler" || path === "/tools/scaler"
          ? "scaler"
          : path === "/ecodes" || path === "/tools/ecodes"
          ? "ecodes"
          : undefined;

      return (
        <ToolsView
          key={path}
          initialTab={initialTab}
          onSelectRecipe={handleSelectRecipe}
          onOpenAssistant={() => setAssistantOpen(true)}
          onNavigate={navigate}
        />
      );
    }

    // About Page
    if (path === "/about" || path.startsWith("/about/")) {
      return <AboutView onNavigate={navigate} />;
    }

    // Contact & Feedback Page
    if (
      path === "/contact" ||
      path.startsWith("/contact/") ||
      path === "/feedback" ||
      path.startsWith("/feedback/") ||
      path === "/contact-us" ||
      path.startsWith("/contact-us/") ||
      path === "/contact-and-feedback" ||
      path === "/support" ||
      path.startsWith("/support/")
    ) {
      return <ContactView onNavigate={navigate} />;
    }

    // Legal Pages
    if (
      path === "/privacy" ||
      path === "/terms" ||
      path === "/affiliate-disclosure"
    ) {
      const tab = path === "/terms" ? "terms" : path === "/affiliate-disclosure" ? "affiliate" : "privacy";
      return <LegalView initialTab={tab} />;
    }

    // Default fallback
    return (
      <HomeView
        onNavigate={navigate}
        onSelectRecipe={handleSelectRecipe}
        savedRecipeIds={savedRecipeIds}
        onToggleSaveRecipe={handleToggleSaveRecipe}
        onOpenAssistant={() => setAssistantOpen(true)}
        collections={collections}
        onOpenCollections={(r) => setRecipeForCollectionModal(r)}
      />
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#FAF9F6] dark:bg-[#141413] text-[#30302F] dark:text-[#EDE8DF] selection:bg-[#F8CD78] selection:text-[#30302F] pb-16 lg:pb-0 transition-colors duration-200">
      {/* 1 & 2. Top Header with utility bar and primary navigation */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigate}
        savedCount={savedRecipes.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        density={density}
        onToggleDensity={handleToggleDensity}
      />

      {/* 3. Search Utility Row directly underneath header */}
      <SearchUtilityRow
        onSearch={handleGlobalSearch}
        onNavigate={navigate}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        initialQuery={searchQuery}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* 13. Comprehensive Footer with Legal & Amazon Affiliate Disclosures */}
      <Footer onNavigate={navigate} />

      {/* Dedicated Mobile Bottom Menu Bar */}
      <MobileBottomNav
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        savedCount={savedRecipes.length}
      />

      {/* Grounded AI Assistant Modal (Google Search & Maps Grounding) */}
      <AIAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onNavigateToRecipe={(slug) => {
          setSelectedRecipeSlug(slug);
          navigate(`/recipe/${slug}`, true);
          setAssistantOpen(false);
        }}
      />

      {/* Saved Recipes & Collections Drawer */}
      <SavedRecipesDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedRecipes={savedRecipes}
        onRemove={handleRemoveSaved}
        onSelectRecipe={handleSelectRecipe}
        collections={collections}
        onCreateCollection={handleCreateCollection}
        onEditCollection={handleOpenEditCollection}
        onDeleteCollection={handleDeleteCollection}
        onToggleRecipeInCollection={handleToggleRecipeInCollection}
        onOpenCreateModal={() => {
          setEditingCollection(null);
          setCollectionModalOpen(true);
        }}
      />

      {/* Collection Create/Edit Modal */}
      <CollectionModal
        isOpen={collectionModalOpen}
        onClose={() => {
          setCollectionModalOpen(false);
          setEditingCollection(null);
        }}
        initialCollection={editingCollection}
        onSave={(data) => {
          if (editingCollection) {
            setCollections((prev) => {
              const updated = prev.map((c) =>
                c.id === editingCollection.id
                  ? { ...c, ...data }
                  : c
              );
              saveCollections(updated);
              return updated;
            });
          } else {
            handleCreateCollection(
              data.name,
              data.description,
              data.color,
              data.icon
            );
          }
          setCollectionModalOpen(false);
          setEditingCollection(null);
        }}
      />

      {/* Global Add to Collection Modal */}
      {recipeForCollectionModal && (
        <AddToCollectionModal
          isOpen={Boolean(recipeForCollectionModal)}
          onClose={() => setRecipeForCollectionModal(null)}
          recipe={recipeForCollectionModal}
          collections={collections}
          onToggleRecipeInCollection={handleToggleRecipeInCollection}
          onCreateCollection={(name) => handleCreateCollection(name)}
        />
      )}
    </div>
  );
}
