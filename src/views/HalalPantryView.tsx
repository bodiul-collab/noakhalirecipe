import React, { useState, useEffect } from "react";
import {
  Package,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Info,
  ExternalLink,
} from "lucide-react";
import { HALAL_PANTRY_SECTIONS } from "../data/pantry";
import { HalalPantrySection, Recipe } from "../types";

interface HalalPantryViewProps {
  initialSlug?: string;
  onNavigate: (route: string) => void;
  onSelectRecipe?: (recipe: Recipe) => void;
}

export const HalalPantryView: React.FC<HalalPantryViewProps> = ({
  initialSlug,
  onNavigate,
  onSelectRecipe,
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    initialSlug || "all"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (initialSlug) {
      setSelectedSectionId(initialSlug);
    }
  }, [initialSlug]);

  const displayedSections = HALAL_PANTRY_SECTIONS.filter((sec) => {
    if (selectedSectionId !== "all" && sec.slug !== selectedSectionId && sec.id !== selectedSectionId) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.subtitle.toLowerCase().includes(q) ||
      sec.description.toLowerCase().includes(q) ||
      sec.keyStaples.some(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.purpose.toLowerCase().includes(q) ||
          s.halalVerificationNotes.toLowerCase().includes(q)
      )
    );
  });

  return (
    <div className="w-full bg-[#FAF9F6] dark:bg-[#141413] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Editorial Architecture Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D7A52] bg-[#EBF5F0] dark:bg-[#16291E] px-3.5 py-1.5 rounded-full border border-[#2D7A52]/30">
            <ShieldCheck className="w-4 h-4 text-[#2D7A52]" />
            HALAL PANTRY ARCHITECTURE &amp; VERIFICATION STANDARDS
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] dark:text-[#EDE8DF] font-heading uppercase tracking-wide">
            The Halal Pantry &amp; Nutrition Guide
          </h1>

          <p className="text-sm sm:text-base text-[#77736D] dark:text-[#A8A49E] font-description italic leading-relaxed">
            A comprehensive reference framework for sourcing pure, unadulterated kitchen staples, whole dates, raw honey, single-origin spices, and verifying dietary supplements with complete religious and nutritional confidence.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#8A857E]">
            <Info className="w-3.5 h-3.5 text-[#E97520]" />
            <span>Educational architecture &amp; ingredient audit framework &bull; Zero medical claims</span>
          </div>
        </div>

        {/* Search and Category Filter Pills */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77736D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search staples, verification notes, vitamins, oils, honey..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#1E1E1C] border border-[#E6E1D8] dark:border-[#33322E] rounded-lg text-[#30302F] dark:text-[#EDE8DF] placeholder-[#8A857E] focus:outline-none focus:border-[#E97520]"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedSectionId("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedSectionId === "all"
                  ? "bg-[#30302F] text-white dark:bg-[#E97520]"
                  : "bg-white dark:bg-[#1E1E1C] text-[#77736D] dark:text-[#A8A49E] border border-[#E6E1D8] dark:border-[#33322E] hover:border-[#30302F]"
              }`}
            >
              All Sections
            </button>
            {HALAL_PANTRY_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSectionId === sec.slug
                    ? "bg-[#30302F] text-white dark:bg-[#E97520]"
                    : "bg-white dark:bg-[#1E1E1C] text-[#77736D] dark:text-[#A8A49E] border border-[#E6E1D8] dark:border-[#33322E] hover:border-[#30302F]"
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>

        {/* Pantry Architecture Sections */}
        <div className="space-y-10">
          {displayedSections.map((sec) => (
            <div
              key={sec.id}
              className="bg-white dark:bg-[#1E1E1C] rounded-2xl border border-[#E6E1D8] dark:border-[#33322E] shadow-xs overflow-hidden"
            >
              {/* Section Header */}
              <div className="p-6 sm:p-8 bg-[#FAF9F6] dark:bg-[#242423] border-b border-[#E6E1D8] dark:border-[#33322E] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#E97520]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
                      Architecture Category
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#242423] dark:text-[#EDE8DF] font-serif-editorial">
                    {sec.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#77736D] dark:text-[#A8A49E] font-medium">
                    {sec.subtitle}
                  </p>
                </div>

                {/* Verification Guidance Callout */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1E1E1C] border border-[#E6E1D8] dark:border-[#33322E] max-w-md text-xs space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#2D7A52] font-bold uppercase tracking-wider text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Halal Audit Standard</span>
                  </div>
                  <p className="text-[#3F3C38] dark:text-[#EDE8DF] leading-relaxed">
                    {sec.verificationGuidance}
                  </p>
                </div>
              </div>

              {/* Items Grid */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {sec.keyStaples.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl border border-[#F3F2EE] dark:border-[#2D2D2A] bg-[#FAF9F6]/60 dark:bg-[#1A1A18] hover:border-[#E97520]/40 transition-colors space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-[#242423] dark:text-white font-serif-editorial">
                          {item.name}
                        </h3>
                        {item.bengaliOrRegionalName && (
                          <span className="text-[11px] font-mono text-[#8A857E] bg-white dark:bg-[#242423] px-2 py-0.5 rounded border border-[#E6E1D8] dark:border-[#33322E]">
                            {item.bengaliOrRegionalName}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#77736D] dark:text-[#A8A49E] leading-relaxed">
                        {item.purpose}
                      </p>
                    </div>

                    {/* Verification Standard Box */}
                    <div className="pt-2.5 border-t border-[#F3F2EE] dark:border-[#2D2D2A] flex items-start gap-2 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D7A52] shrink-0 mt-0.5" />
                      <div className="text-[11px] text-[#3F3C38] dark:text-[#EDE8DF] leading-tight">
                        <span className="font-semibold text-[#2D7A52]">Verification Note: </span>
                        {item.halalVerificationNotes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Educational Foundation Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF9F0] dark:bg-[#242018] border border-[#F8CD78]/60 dark:border-[#E7A52B]/40 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D75D17]" />
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#242423] dark:text-white font-heading">
              Future Halal Commerce &amp; Brand Partnership Standards
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#3F3C38] dark:text-[#EDE8DF] leading-relaxed max-w-4xl">
            Noakhali Kitchen adheres to a strict editorial policy. In future releases, pantry products, certified honey, single-estate spices, and vitamins featured on this platform will only be listed after rigorous third-party accreditation verification and physical supply chain audit. We never populate placeholders with unvetted third parties.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate("/recipes")}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E97520] hover:text-[#D75D17] cursor-pointer"
            >
              <span>Explore Halal Recipes Using These Staples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
