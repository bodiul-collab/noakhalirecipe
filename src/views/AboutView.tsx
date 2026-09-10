import React from "react";
import { ShieldCheck, Heart, Users, Utensils } from "lucide-react";
import { IMAGES } from "../data/assets";
import { AboutSection } from "../components/AboutSection";

export const AboutView: React.FC<{ onNavigate: (route: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="w-full bg-[#FAF9F6] pb-16">
      {/* Featured Primary About Section: Exact uploaded asset on right, text on left */}
      <AboutSection onNavigate={onNavigate} isStandalonePage={true} className="border-b" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Story Section with Visual Card */}
        <div className="bg-white rounded-2xl border border-[#E6E1D8] p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden border border-[#E6E1D8]">
              <img
                src={IMAGES.heroBiryani}
                alt="Noakhali Kitchen culinary heritage feast"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97520] font-subheading">
                REGIONAL HERITAGE &bull; SOUTHEASTERN BENGAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial">
                Born From Generations of Hospitality
              </h2>
              <p className="text-sm sm:text-base text-[#3F3C38] leading-relaxed">
                Named after the historic coastal river delta district of Noakhali in southeastern Bengal—celebrated for its fertile coconut groves, prized river king prawns, fragrant Kalijeera rice, and legendary slow-braised feast traditions (Mezban)—Noakhali Kitchen was founded on a simple conviction: <strong>Halal cooking should be rich in flavor, pure in ingredients, and open to every family table.</strong>
              </p>
              <p className="text-sm text-[#55514B] leading-relaxed">
                We believe that food is not only nourishment, but a manifestation of gratitude, kinship, and spiritual mindfulness. We preserve authentic techniques like slow caramelization of onions, stone-grinding whole spices, and patience in tempering mustard oil.
              </p>
            </div>
          </div>
        </div>

        {/* The Four Core Pillars */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial">
              Our Four Culinary Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#2D7A52]/30 flex items-center justify-center text-[#2D7A52]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#30302F]">
                1. Strictly 100% Pork-Free &amp; Pure
              </h3>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Every single recipe published on Noakhali Kitchen is strictly free from pork, lard, non-halal animal fats, and intoxicants. We only develop recipes with wholesome Halal meats, fresh seafood, and vegetarian staples.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E97520]/30 flex items-center justify-center text-[#E97520]">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#30302F]">
                2. Rigorous Ingredient Verification
              </h3>
              <p className="text-xs text-[#77736D] leading-relaxed">
                We demystify confusing additives: commercial gelatins, cheese rennets, E-numbers (like E471 and E120), and flavor extracts. Our researched guides provide clear plant-based alternatives like agar-agar and microbial enzymes.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E7A52B]/30 flex items-center justify-center text-[#E7A52B]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#30302F]">
                3. Tested Home Kitchen Practicality
              </h3>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Our recipes are tested repeatedly in real home kitchens. We measure exact cooking times, provide interactive serving scalers, and offer realistic ingredient substitutions for everyday cooks.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#30302F]/30 flex items-center justify-center text-[#30302F]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#30302F]">
                4. Community &amp; Local Discovery
              </h3>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Good Halal food extends beyond our own kitchens. Our Halal Directory and AI assistant help families discover neighborhood butchers, authentic restaurants, and community mosques wherever they travel.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Team */}
        <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-[#242423] font-serif-editorial text-center">
            The Editorial Board
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] space-y-2">
              <h3 className="text-sm font-bold text-[#30302F]">Chef Tariq Rahman</h3>
              <p className="text-xs text-[#E97520] font-semibold">Culinary Director &amp; Recipe Developer</p>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Third-generation cook specializing in traditional South Asian slow-braises, Dum biryani techniques, and festive banquet dishes.
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] space-y-2">
              <h3 className="text-sm font-bold text-[#30302F]">Dr. Aaminah Siddiqui</h3>
              <p className="text-xs text-[#2D7A52] font-semibold">Food Scientist &amp; Halal Standards Researcher</p>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Food science specialist analyzing ingredient supply chains, enzyme manufacturing, and commercial food labeling standards for Muslim consumers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
