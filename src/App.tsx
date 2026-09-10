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
import { DirectoryView } from "./views/DirectoryView";
import { BlogView } from "./views/BlogView";
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
    return r.replace(/^\/recipes?\//, "").split("/")[0].split("?")[0].split("#")[0] || null;
  }
  return null;
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.pathname) {
      const p = window.location.pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
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
      const path = (window.location.pathname || "/").replace(/\/+$/, "") || "/";
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

    // Halal Places & Directory
    if (path.startsWith("/directory")) {
      const dirCat = path.replace(/^\/directory\/?/, "").split("/")[0] || undefined;
      return (
        <DirectoryView
          key={`directory-${dirCat || "all"}`}
          initialCategory={dirCat}
          onOpenAssistant={() => setAssistantOpen(true)}
          onNavigate={navigate}
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

    // Kitchen Converters & Tools
    if (path.startsWith("/tools") || path === "/converter" || path === "/scaler") {
      const initialTab =
        path === "/converter" || path === "/tools/converter"
          ? "converter"
          : path === "/scaler" || path === "/tools/scaler"
          ? "scaler"
          : undefined;

      return (
        <ToolsView
          initialTab={initialTab}
          onSelectRecipe={handleSelectRecipe}
          onOpenAssistant={() => setAssistantOpen(true)}
        />
      );
    }

    // About Page
    if (path === "/about" || path.startsWith("/about/")) {
      return <AboutView onNavigate={navigate} />;
    }

    // Contact Page
    if (path === "/contact" || path.startsWith("/contact/")) {
      return <ContactView />;
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
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#FAF9F6] text-[#30302F] selection:bg-[#F8CD78] selection:text-[#30302F] pb-16 lg:pb-0">
      {/* 1 & 2. Top Header with utility bar and primary navigation */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigate}
        savedCount={savedRecipes.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onOpenSearch={() => {
          const inputEl = document.querySelector('input[placeholder*="Search recipes"]') as HTMLInputElement;
          if (inputEl) inputEl.focus();
        }}
        onOpenAssistant={() => setAssistantOpen(true)}
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
