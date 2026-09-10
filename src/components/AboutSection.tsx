import React from "react";
import { CheckCircle2, Utensils, Heart, ShieldCheck } from "lucide-react";
import { IMAGES } from "../data/assets";

interface AboutSectionProps {
  onNavigate?: (route: string) => void;
  className?: string;
  isStandalonePage?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigate,
  className = "",
  isStandalonePage = false,
}) => {
  return (
    <section
      id="about-section"
      className={`py-12 sm:py-16 md:py-20 bg-white border-b border-[#E6E1D8] ${className}`}
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: About Text (Stacked above image on mobile, on the left on desktop) */}
          <div className="order-1 lg:col-span-7 space-y-5 text-left">
            {/* Editorial Eyebrow Tag & Brand Seal */}
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={IMAGES.logoFull}
                alt="Noakhali Kitchen Official Seal"
                className="w-10 h-10 rounded-full object-contain bg-white border border-[#E6E1D8] shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E6E1D8] text-xs font-bold text-[#E97520] tracking-wider uppercase font-subheading">
                <ShieldCheck className="w-4 h-4 text-[#2D7A52]" />
                ABOUT NOĀKHĀLI KITCHEN &bull; HALAL TEST KITCHEN
              </div>
            </div>

            {/* Main Title */}
            <h2
              id="about-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-[#242423] font-serif-editorial leading-[1.18] tracking-tight"
            >
              Authentic Halal Cuisine, Handcrafted With Heritage &amp; Care
            </h2>

            {/* Narrative Body Text */}
            <div className="space-y-4 text-sm sm:text-base text-[#3F3C38] leading-relaxed">
              <p>
                Welcome to <strong>Noākhāli Kitchen</strong>, your trusted home for authentic, delicious, and 100% Halal home cooking. Rooted in the storied culinary traditions of southeastern Bangladesh’s coastal delta district of Noakhali, our kitchen celebrates the harmony of river king prawns, fresh coconut milk, fragrant Kalijeera rice, and slow-braised feast specialties.
              </p>

              <p className="text-[#55514B]">
                Every single recipe published on our platform is developed, seasoned, and thoroughly tested right here in our active home test kitchen. We believe cooking should be approachable, trustworthy, and deeply comforting—honoring the warmth of maternal heirloom cooking while providing dependable measurements and step-by-step guidance for modern home cooks worldwide.
              </p>

              <p className="text-[#55514B]">
                Whether you are simmering a festive Dum Biryani for family Eid, frying golden evening street-food snacks, or preparing a quick weeknight dal, Noākhāli Kitchen guarantees strict Halal ingredient verification and zero compromise on flavor.
              </p>
            </div>

            {/* Value Pillars / Trust Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-[#242423]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D7A52] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-[#242423]">100% Halal Verified</span>
                  <span className="text-[11px] text-[#77736D]">Pork-free, alcohol-free, transparent whole ingredients</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D7A52] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-[#242423]">Tested in Our Real Kitchen</span>
                  <span className="text-[11px] text-[#77736D]">Perfected across multiple stove tests for foolproof results</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D7A52] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-[#242423]">Generational Heirloom Recipes</span>
                  <span className="text-[11px] text-[#77736D]">Passed down through maternal roots and regional coastal secrets</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D7A52] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-[#242423]">Pure Spices &amp; Fresh Aromatics</span>
                  <span className="text-[11px] text-[#77736D]">Zero artificial preservatives, coloring agents, or fillers</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate("/recipes")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#30302F] hover:bg-[#242423] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-[#E7A52B]" />
                  Explore Tested Recipes
                </button>
              )}

              {onNavigate && !isStandalonePage && (
                <button
                  type="button"
                  onClick={() => onNavigate("/about")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#30302F]/30 hover:border-[#30302F] text-[#30302F] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-white"
                >
                  <Heart className="w-4 h-4 text-[#E97520]" />
                  Read Full Kitchen Story
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Exact Uploaded Image (Immutable Original Asset, No Crop, No Distortion) */}
          <div className="order-2 lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[460px] lg:max-w-[490px] mx-auto">
              <img
                src={IMAGES.chefLadyBoss || "/chef_madam.jpg"}
                alt="Noakhali Kitchen Founder & Chef in the test kitchen holding wooden spoon over fresh prawn curry"
                className="w-full h-auto block rounded-2xl border border-[#E6E1D8] shadow-xl"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
