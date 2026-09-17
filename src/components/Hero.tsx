import React from "react";
import { ArrowRight, ShieldCheck, BookOpen, Sparkles } from "lucide-react";
import { IMAGES } from "../data/assets";
import { HomepageRecipeCard } from "./HomepageRecipeCard";
import { NoakhaliLogo } from "./NoakhaliLogo";

interface HeroProps {
  onExploreRecipes: () => void;
  onExploreGuides?: () => void;
  onOpenFeaturedRecipe?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreRecipes,
  onExploreGuides,
  onOpenFeaturedRecipe,
}) => {
  return (
    <section className="relative w-full bg-[#F8CD78] overflow-hidden py-10 sm:py-14 md:py-16 border-b border-[#E7A52B]/40">
      {/* Subtle organic background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#30302F_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Perspective Hover Recipe Card */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center lg:items-start gap-3">
            <HomepageRecipeCard
              onOpenRecipe={onOpenFeaturedRecipe}
              imageSrc={IMAGES.shorsheIlish}
              brandName="Noakhali Kitchen"
              halalBadge="100% Halal Dish"
              heritageTag="✨ Signature Heritage Dish"
              title="Noakhali Shorshe Ilish (Hilsa in Golden Mustard Gravy)"
              description="Steamed hilsa steaks in golden stone-ground mustard paste, nigella seeds & cold-pressed mustard oil."
              buttonText="View Recipe →"
            />
            <button
              type="button"
              onClick={onOpenFeaturedRecipe}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#242423] hover:text-[#E97520] text-xs font-semibold border border-[#30302F]/15 transition-all shadow-xs cursor-pointer group"
              title="Direct view section for Noakhali Shorshe Ilish"
            >
              <span className="text-[#E97520] font-bold">✨ Direct View:</span>
              <span className="truncate max-w-[240px] sm:max-w-none">Noakhali Shorshe Ilish</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E97520] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: High-Impact Editorial Storytelling */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 sm:space-y-6 text-center lg:text-left">
            {/* Brand Logo & Editorial Eyebrow */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xs shadow-sm border border-[#30302F]/15 hover:shadow-md transition-all">
                <img
                  src={IMAGES.logoFull}
                  alt="Noakhali Kitchen Authentic Recipes, Timeless Flavors Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-contain bg-white border border-[#E6E1D8]/80 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left pr-1">
                  <span className="block font-black text-sm sm:text-base text-[#242423] font-heading tracking-wide uppercase leading-tight">
                    Noakhali Kitchen
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-[#E97520] font-bold tracking-wider uppercase">
                    Authentic Recipes &bull; Timeless Flavors
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 border border-[#30302F]/15 text-[#30302F] text-xs font-bold tracking-widest uppercase font-subheading shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2D7A52] animate-pulse"></span>
                HALAL &bull; HOMEMADE &bull; AUTHENTIC
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#242423] font-heading leading-[1.22] tracking-wide uppercase">
              Good Food. Trusted Halal. <br className="hidden sm:inline" />
              Made for Every Table.
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#3F3C38] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-description">
              Discover comforting regional favorites, practical weeknight meals, and
              thoughtfully researched Halal food guides—all in one welcoming kitchen.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreRecipes}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#E97520] hover:bg-[#D75D17] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-ui"
              >
                EXPLORE RECIPES
                <ArrowRight className="w-4 h-4" />
              </button>

              {onExploreGuides && (
                <button
                  onClick={onExploreGuides}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#30302F] hover:bg-[#242423] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-ui"
                >
                  <BookOpen className="w-4 h-4 text-[#E7A52B]" />
                  FOOD GUIDES &amp; BLOG
                </button>
              )}
            </div>

            {/* Trust Line */}
            <div className="pt-2 border-t border-[#30302F]/15 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-[#3F3C38] font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D7A52]" />
                Strictly no pork recipes
              </span>
              <span className="hidden sm:inline text-[#30302F]/40">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D75D17]" />
                Halal-focused ingredient verification
              </span>
              <span className="hidden sm:inline text-[#30302F]/40">&bull;</span>
              <span>Practical everyday cooking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
