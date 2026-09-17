import React from "react";
import { Home, BookOpen, Layers, Wrench, Bookmark } from "lucide-react";

interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  onNavigate,
  onOpenSaved,
  savedCount,
}) => {
  const isHome = currentRoute === "/";
  const isRecipes = currentRoute === "/recipes" || currentRoute.startsWith("/recipe/");
  const isCategories = currentRoute === "/category" || currentRoute.startsWith("/category/");
  const isTools = currentRoute === "/tools" || currentRoute === "/converter" || currentRoute === "/scaler";

  return (
    <nav
      id="mobile-bottom-menu-bar"
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6E1D8] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] print:hidden safe-area-bottom"
    >
      <div className="grid grid-cols-5 h-14 max-w-[480px] mx-auto px-1">
        {/* Home */}
        <button
          onClick={() => onNavigate("/")}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium tracking-wide transition-colors cursor-pointer ${
            isHome ? "text-[#E97520] font-bold" : "text-[#77736D] hover:text-[#30302F]"
          }`}
          aria-label="Home"
        >
          <Home className={`w-4.5 h-4.5 ${isHome ? "text-[#E97520]" : "text-[#77736D]"}`} />
          <span className="truncate">Home</span>
        </button>

        {/* Recipes */}
        <button
          onClick={() => onNavigate("/recipes")}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium tracking-wide transition-colors cursor-pointer ${
            isRecipes ? "text-[#E97520] font-bold" : "text-[#77736D] hover:text-[#30302F]"
          }`}
          aria-label="Recipes"
        >
          <BookOpen className={`w-4.5 h-4.5 ${isRecipes ? "text-[#E97520]" : "text-[#77736D]"}`} />
          <span className="truncate">Recipes</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => onNavigate("/category")}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium tracking-wide transition-colors cursor-pointer ${
            isCategories ? "text-[#E97520] font-bold" : "text-[#77736D] hover:text-[#30302F]"
          }`}
          aria-label="Categories"
        >
          <Layers className={`w-4.5 h-4.5 ${isCategories ? "text-[#E97520]" : "text-[#77736D]"}`} />
          <span className="truncate">Categories</span>
        </button>

        {/* Kitchen Tools */}
        <button
          onClick={() => onNavigate("/tools")}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium tracking-wide transition-colors cursor-pointer ${
            isTools ? "text-[#E97520] font-bold" : "text-[#77736D] hover:text-[#30302F]"
          }`}
          aria-label="Kitchen Tools"
        >
          <Wrench className={`w-4.5 h-4.5 ${isTools ? "text-[#E97520]" : "text-[#77736D]"}`} />
          <span className="truncate">Tools</span>
        </button>

        {/* Saved Recipes */}
        <button
          onClick={onOpenSaved}
          className="relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium tracking-wide text-[#77736D] hover:text-[#E97520] transition-colors cursor-pointer"
          aria-label="Saved Recipes"
        >
          <div className="relative">
            <Bookmark className="w-4.5 h-4.5 text-[#77736D]" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E97520] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </div>
          <span className="truncate">Saved</span>
        </button>
      </div>
    </nav>
  );
};

