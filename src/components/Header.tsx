import React, { useState, useEffect } from "react";
import { NoakhaliLogo } from "./NoakhaliLogo";
import {
  Bookmark,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Utensils,
  BookOpen,
  Layers,
  FileText,
  Wrench,
  Info,
  Home,
  ShieldCheck,
  ArrowRight,
  Mail,
  Moon,
  Sun,
  Minimize2,
  Maximize2,
  Compass,
  ShoppingBag,
} from "lucide-react";

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSearch?: () => void;
  onOpenAssistant: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  density?: "tight" | "relaxed";
  onToggleDensity?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  savedCount,
  onOpenSaved,
  onOpenSearch,
  onOpenAssistant,
  theme = "dark",
  onToggleTheme,
  density = "tight",
  onToggleDensity,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Complete, clean primary navigation links
  const navLinks = [
    { label: "Home", route: "/" },
    { label: "Recipes", route: "/recipes" },
    { label: "Categories", route: "/category", hasDropdown: true },
    { label: "Guides", route: "/guides" },
    { label: "Food Culture", route: "/culture" },
    { label: "Halal Pantry", route: "/pantry" },
    { label: "Tools", route: "/tools" },
    { label: "About", route: "/about" },
  ];

  const featuredCategories = [
    { label: "Halal Chicken", route: "/category/halal-chicken", desc: "Curries, biryanis & roast" },
    { label: "Halal Beef & Lamb", route: "/category/halal-beef", desc: "Bhuna, kebabs & tehari" },
    { label: "Halal Meal Prep", route: "/category/halal-meal-prep", desc: "Bowls, batch cooking & lunches" },
    { label: "Halal Drinks", route: "/category/halal-drinks", desc: "Borhani, lassi & sharbat" },
    { label: "Fish & Seafood", route: "/category/halal-seafood", desc: "Ilish, prawns & soups" },
    { label: "Halal Kids Meals", route: "/category/halal-kids-meal", desc: "Tenders, sliders & pastas" },
    { label: "Halal Desserts", route: "/category/halal-desserts", desc: "Kheer, halwa & sweets" },
    { label: "Halal Street Food", route: "/category/halal-street-food", desc: "Satay, pad thai & snacks" },
    { label: "Halal Rice & Curry", route: "/category/halal-rice-curry", desc: "Khichuri, pilaf & staples" },
    { label: "Halal Vegetarian", route: "/category/halal-vegetarian", desc: "Dals, paneer & sabzi" },
  ];

  return (
    <header
      className={`w-full z-50 sticky top-0 transition-all duration-200 print:hidden ${
        isScrolled
          ? "bg-white/98 dark:bg-[#1C1C1A]/98 backdrop-blur-md shadow-md border-b border-[#E6E1D8] dark:border-[#30302F]"
          : "bg-white dark:bg-[#1C1C1A] shadow-[0_1px_4px_rgba(0,0,0,0.05)] border-b border-[#E6E1D8]/80 dark:border-[#30302F]"
      }`}
    >
      {/* Top Thin Utility Bar */}
      <div className="w-full bg-[#242423] text-[#E6E1D8] text-xs font-sans border-b border-[#30302F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-2 tracking-wide font-normal truncate min-w-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2D7A52] shrink-0" />
            <span className="truncate text-[11px] sm:text-xs text-[#E6E1D8]">
              100% Halal Verified &bull; Traditional Heritage &bull; Family-Friendly
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#A8A49E] shrink-0">
            <button
              onClick={() => onNavigate("/about")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate("/contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate("/blog")}
              className="hover:text-[#E7A52B] transition-colors cursor-pointer"
            >
              Culinary Guides
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate("/")}
          className="group flex items-center text-left focus:outline-none shrink min-w-0 transition-transform hover:opacity-95 cursor-pointer py-1"
          aria-label="Noākhāli Kitchen Home"
        >
          <NoakhaliLogo size="md" theme={theme} />
        </button>

        {/* Decongested Desktop Navigation (Clean, Spacious, Uncrowded) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-[#3F3C38] dark:text-[#EDE8DF]">
          {navLinks.map((link) => {
            const isActive =
              link.route === "/"
                ? currentRoute === "/" || currentRoute === ""
                : link.route === "/recipes"
                ? currentRoute === "/recipes" || currentRoute.startsWith("/recipe/") || currentRoute.startsWith("/recipes/")
                : currentRoute === link.route || currentRoute.startsWith(link.route + "/");

            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group py-4"
                  onMouseEnter={() => setCategoryDropdownOpen(true)}
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => {
                        setCategoryDropdownOpen(false);
                        onNavigate("/category");
                      }}
                      className={`transition-colors cursor-pointer py-1 ${
                        isActive
                          ? "text-[#E97520] font-semibold"
                          : "text-[#3F3C38] dark:text-[#EDE8DF] hover:text-[#E97520] dark:hover:text-[#F8CD78]"
                      }`}
                    >
                      <span>{link.label}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategoryDropdownOpen((prev) => !prev);
                      }}
                      className="text-[#8A857E] hover:text-[#E97520] transition-transform p-0.5 cursor-pointer"
                      aria-label="Toggle categories dropdown"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          categoryDropdownOpen ? "rotate-180 text-[#E97520]" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {isActive && (
                    <span className="absolute bottom-3 left-0 right-0 h-0.5 bg-[#E97520] rounded-full" />
                  )}

                  {/* Elegant Category Dropdown Sheet */}
                  {categoryDropdownOpen && (
                    <div className="absolute top-[calc(100%-6px)] left-1/2 -translate-x-1/2 w-80 bg-white dark:bg-[#242423] border border-[#E6E1D8] dark:border-[#33322E] shadow-xl rounded-xl p-3 z-50 animate-in fade-in-50 duration-150">
                      <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-[#F3F2EE] dark:border-[#33322E]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A857E] dark:text-[#A8A49E]">
                          Explore Recipes by Category
                        </span>
                        <button
                          onClick={() => {
                            setCategoryDropdownOpen(false);
                            onNavigate("/category");
                          }}
                          className="text-[11px] font-bold text-[#E97520] hover:underline cursor-pointer"
                        >
                          All (10)
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-0.5">
                        {featuredCategories.map((sub) => (
                          <button
                            key={sub.route}
                            onClick={() => {
                              setCategoryDropdownOpen(false);
                              onNavigate(sub.route);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#FFF9F0] dark:hover:bg-[#302B24] hover:text-[#E97520] transition-colors group/item flex items-center justify-between cursor-pointer"
                          >
                            <div>
                              <div className="text-xs font-semibold text-[#30302F] dark:text-[#EDE8DF] group-hover/item:text-[#E97520]">
                                {sub.label}
                              </div>
                              <div className="text-[10px] text-[#8A857E] dark:text-[#A8A49E]">
                                {sub.desc}
                              </div>
                            </div>
                            <ChevronDown className="w-3 h-3 text-[#B5B0A6] -rotate-90 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-[#F3F2EE] dark:border-[#33322E] mt-2 pt-2 px-1">
                        <button
                          onClick={() => {
                            setCategoryDropdownOpen(false);
                            onNavigate("/category");
                          }}
                          className="w-full text-center py-1.5 text-xs font-bold text-[#E97520] bg-[#FFF9F0] dark:bg-[#302B24] hover:bg-[#F8CD78]/30 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Browse All Categories Hub</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.route)}
                className={`transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? "text-[#E97520] font-semibold"
                    : "text-[#3F3C38] dark:text-[#EDE8DF] hover:text-[#E97520] dark:hover:text-[#F8CD78]"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E97520] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Utility Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Density (Tight / Relaxed Mood) Toggle - Desktop only */}
          {onToggleDensity && (
            <button
              onClick={onToggleDensity}
              className="hidden md:flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-[#55504A] hover:text-[#E97520] bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] rounded-lg transition-colors cursor-pointer"
              aria-label={`Density mood: ${density === "tight" ? "Tight" : "Relaxed"}`}
              title={`Layout Density: ${density === "tight" ? "Tight Mood (Compact)" : "Relaxed Mood (Spacious)"}. Click to toggle.`}
            >
              {density === "tight" ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-[#E97520]" />
                  <span className="text-[11px] font-bold hidden lg:inline text-[#E97520]">Tight</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#8A857E]" />
                  <span className="text-[11px] font-medium hidden lg:inline text-[#8A857E]">Relaxed</span>
                </>
              )}
            </button>
          )}

          {/* Theme (Dark / Light) Toggle - Tablet/Desktop */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="hidden sm:flex p-2 text-[#3F3C38] hover:text-[#E97520] hover:bg-[#FAF9F6] rounded-lg transition-colors cursor-pointer"
              aria-label={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
              title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === "dark" ? (
                <Sun className="w-4.5 h-4.5 text-[#F8CD78]" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-[#30302F]" />
              )}
            </button>
          )}

          {/* AI Chef Assistant Trigger - Desktop/Tablet */}
          <button
            onClick={onOpenAssistant}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF9F0] border border-[#F8CD78] text-[#D75D17] hover:bg-[#F8CD78]/40 hover:border-[#E97520] text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-2xs"
            title="Ask Noakhali Kitchen AI Culinary Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
            <span className="hidden lg:inline">Ask AI Chef</span>
          </button>

          {/* Saved Recipes Trigger - Tablet/Desktop (Mobile has dedicated bottom bar) */}
          <button
            onClick={onOpenSaved}
            className="hidden sm:flex relative p-2 text-[#3F3C38] hover:text-[#E97520] hover:bg-[#FAF9F6] rounded-lg transition-colors cursor-pointer"
            aria-label="View Saved Recipes"
            title="Saved Recipes"
          >
            <Bookmark className="w-4.5 h-4.5" />
            {savedCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#E97520] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* 3-Line Mobile/Tablet Menu Button in Right Corner */}
          <button
            type="button"
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 text-[#242423] hover:text-[#E97520] hover:bg-[#FFF9F0] active:bg-[#F3F2EE] rounded-lg transition-colors shrink-0 flex items-center justify-center border border-[#E6E1D8] bg-[#FAF9F6] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#E97520]/40 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open 3-line navigation menu"}
            aria-expanded={mobileMenuOpen}
            title={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5.5 h-5.5 text-[#E97520]" />
            ) : (
              <Menu className="w-5.5 h-5.5 text-[#242423]" />
            )}
          </button>
        </div>
      </div>

      {/* Clean, Decongested Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b border-[#E6E1D8] px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-70px)] overflow-y-auto shadow-2xl">
          {/* Mobile Drawer Brand Header */}
          <div className="pb-3 border-b border-[#E6E1D8] flex items-center justify-between">
            <NoakhaliLogo size="sm" showSubtitle={true} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-[#77736D] hover:text-[#242423] rounded-md hover:bg-[#FAF9F6]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Primary Navigation Cards */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#8A857E] uppercase tracking-wider px-2 pb-1">
              Explore Kitchen
            </div>

            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute === "/"
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <Home className="w-4 h-4 text-[#8A857E]" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/recipes");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute.startsWith("/recipes")
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#8A857E]" />
                <span>All Recipes Catalog</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/category");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute.startsWith("/category")
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <Layers className="w-4 h-4 text-[#8A857E]" />
                <span>Recipe Categories</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/guides");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute.startsWith("/guides")
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <FileText className="w-4 h-4 text-[#8A857E]" />
                <span>Cooking Guides Hub</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/culture");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute.startsWith("/culture")
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <Compass className="w-4 h-4 text-[#8A857E]" />
                <span>Food Culture &amp; Heritage</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/pantry");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute.startsWith("/pantry")
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-[#8A857E]" />
                <span>Halal Pantry &amp; Nutrition</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/tools");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute.startsWith("/tools")
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <Wrench className="w-4 h-4 text-[#8A857E]" />
                <span>Kitchen Utilities &amp; Equipment</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/about");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute === "/about"
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <Info className="w-4 h-4 text-[#8A857E]" />
                <span>About Noakhali Kitchen</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/contact");
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  currentRoute.startsWith("/contact")
                    ? "bg-[#FFF9F0] text-[#E97520] font-bold"
                    : "text-[#30302F] hover:bg-[#FAF9F6]"
                }`}
              >
                <Mail className="w-4 h-4 text-[#8A857E]" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>

          {/* Popular Categories Grid */}
          <div className="pt-3 border-t border-[#F3F2EE] space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-bold text-[#8A857E] uppercase tracking-wider">
                Popular Categories
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("/category");
                }}
                className="text-[11px] font-bold text-[#E97520] hover:underline"
              >
                View All &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {featuredCategories.slice(0, 6).map((sub) => (
                <button
                  key={sub.route}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(sub.route);
                  }}
                  className="text-left px-3 py-2 text-xs font-medium text-[#3F3C38] bg-[#FAF9F6] border border-[#E6E1D8] hover:border-[#E97520] hover:text-[#E97520] rounded-lg truncate transition-colors"
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Appearance & Layout Controls for Mobile */}
          <div className="pt-3 border-t border-[#F3F2EE] space-y-2">
            <div className="text-[11px] font-bold text-[#8A857E] uppercase tracking-wider px-1">
              Preferences
            </div>
            <div className="grid grid-cols-2 gap-2">
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg transition-colors cursor-pointer text-[#30302F]"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4 text-[#F8CD78]" />
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-[#30302F]" />
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>
              )}

              {onToggleDensity && (
                <button
                  type="button"
                  onClick={onToggleDensity}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg transition-colors cursor-pointer text-[#30302F]"
                >
                  {density === "tight" ? (
                    <>
                      <Minimize2 className="w-4 h-4 text-[#E97520]" />
                      <span className="text-[#E97520]">Tight Mood</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4 text-[#8A857E]" />
                      <span>Relaxed Mood</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Bottom Mobile Action Buttons */}
          <div className="pt-3 border-t border-[#F3F2EE] grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#D75D17] bg-[#FFF9F0] py-2.5 rounded-lg border border-[#F8CD78] hover:bg-[#F8CD78]/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
              <span>Ask AI Chef</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSaved();
              }}
              className="flex items-center justify-center gap-1.5 text-xs text-[#30302F] font-semibold bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] py-2.5 rounded-lg transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#E97520]" />
              <span>Saved ({savedCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

