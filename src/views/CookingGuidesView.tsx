import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChefHat,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { COOKING_GUIDES } from "../data/guides";
import { RECIPES } from "../data/recipes";
import { CookingGuide, Recipe } from "../types";

interface CookingGuidesViewProps {
  initialSlug?: string;
  onNavigate: (route: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

const CATEGORIES = [
  "All",
  "Cooking Techniques",
  "Spice Guides",
  "Ingredient Guides",
  "Ingredient Substitutions",
  "Beginner Cooking",
  "Kitchen Tips",
] as const;

export const CookingGuidesView: React.FC<CookingGuidesViewProps> = ({
  initialSlug,
  onNavigate,
  onSelectRecipe,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setActiveSlug(initialSlug || null);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [initialSlug]);

  const currentGuide = COOKING_GUIDES.find((g) => g.slug === activeSlug);

  // Filter guides
  const filteredGuides = COOKING_GUIDES.filter((guide) => {
    const matchesCategory =
      selectedCategory === "All" || guide.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // If viewing a single guide
  if (currentGuide) {
    const relatedRecipes = RECIPES.filter((r) =>
      currentGuide.relatedRecipeSlugs?.includes(r.slug)
    );

    return (
      <div className="w-full bg-[#FAF9F6] dark:bg-[#141413] py-8 sm:py-12">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#77736D] dark:text-[#A8A49E]">
            <button onClick={() => onNavigate("/")} className="hover:text-[#30302F] dark:hover:text-white cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setActiveSlug(null);
                onNavigate("/guides");
              }}
              className="hover:text-[#30302F] dark:hover:text-white cursor-pointer"
            >
              Cooking Guides
            </button>
            <span>/</span>
            <span className="text-[#30302F] dark:text-white font-bold truncate max-w-[220px]">
              {currentGuide.title}
            </span>
          </nav>

          <button
            onClick={() => {
              setActiveSlug(null);
              onNavigate("/guides");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49E] hover:text-[#30302F] dark:hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Guides
          </button>

          <article className="bg-white dark:bg-[#1E1E1C] rounded-xl border border-[#E6E1D8] dark:border-[#33322E] shadow-sm p-6 sm:p-10 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] bg-[#FFF9F0] dark:bg-[#2A241A] px-2.5 py-1 rounded border border-[#F8CD78]/40 dark:border-[#E7A52B]/30">
                  {currentGuide.category}
                </span>
                <span className="text-xs text-[#77736D] dark:text-[#A8A49E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentGuide.readTimeMinutes} Min Read
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] dark:text-[#EDE8DF] font-serif-editorial leading-tight">
                {currentGuide.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#77736D] dark:text-[#A8A49E] border-b border-[#F3F2EE] dark:border-[#2D2D2A] pb-4">
                <span className="font-bold text-[#30302F] dark:text-white">By {currentGuide.author.name}</span>
                <span>&bull;</span>
                <span>{currentGuide.author.role}</span>
                <span>&bull;</span>
                <span>Updated {currentGuide.updatedDate}</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="aspect-[16/10] rounded-lg overflow-hidden border border-[#E6E1D8] dark:border-[#33322E] bg-[#FAF9F6]">
              <img
                src={currentGuide.heroImage}
                alt={currentGuide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-[#3F3C38] dark:text-[#EDE8DF] space-y-4">
              {currentGuide.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="text-lg sm:text-xl font-bold text-[#242423] dark:text-white font-serif-editorial mt-6 mb-2 border-b border-[#F3F2EE] dark:border-[#2D2D2A] pb-1.5"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ")) {
                  return (
                    <div key={idx} className="space-y-1.5 pl-2 my-2">
                      {paragraph.split("\n").map((line, i) => (
                        <p key={i} className="pl-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2">
                      {paragraph.split("\n").map((li, i) => (
                        <li key={i}>{li.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            {/* FAQs if present */}
            {currentGuide.faqs && currentGuide.faqs.length > 0 && (
              <div className="pt-6 border-t border-[#E6E1D8] dark:border-[#33322E] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#242423] dark:text-white font-heading">
                  <HelpCircle className="w-4 h-4 text-[#E97520]" />
                  Frequently Asked Questions
                </div>
                <div className="space-y-3">
                  {currentGuide.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-[#FAF9F6] dark:bg-[#242423] border border-[#E6E1D8] dark:border-[#33322E] space-y-1"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-[#30302F] dark:text-white">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-[#77736D] dark:text-[#A8A49E] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Related Recipes (Internal Linking) */}
            {relatedRecipes.length > 0 && (
              <div className="pt-6 border-t border-[#E6E1D8] dark:border-[#33322E] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#242423] dark:text-white font-serif-editorial">
                    Cook With This Guide: Recommended Recipes
                  </h3>
                  <span className="text-xs text-[#E97520] font-bold">100% Halal</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedRecipes.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => onSelectRecipe(r)}
                      className="group p-3 rounded-lg border border-[#E6E1D8] dark:border-[#33322E] hover:border-[#E97520] dark:hover:border-[#E97520] bg-[#FAF9F6] dark:bg-[#242423] transition-all cursor-pointer flex items-center gap-3"
                    >
                      <img
                        src={r.heroImage}
                        alt={r.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] block truncate">
                          {r.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#30302F] dark:text-[#EDE8DF] group-hover:text-[#E97520] transition-colors truncate">
                          {r.title}
                        </h4>
                        <span className="text-[11px] text-[#77736D] dark:text-[#A8A49E]">
                          {r.prepTimeMinutes + r.cookTimeMinutes} mins &bull; {r.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    );
  }

  // Guide Index View
  return (
    <div className="w-full bg-[#FAF9F6] dark:bg-[#141413] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E97520] bg-[#FFF9F0] dark:bg-[#2A241A] px-3 py-1 rounded-full border border-[#F8CD78]/40">
            <BookOpen className="w-3.5 h-3.5" />
            CULINARY MASTERY &bull; STEP-BY-STEP
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] dark:text-[#EDE8DF] font-heading uppercase tracking-wide">
            Halal Cooking Guides
          </h1>
          <p className="text-sm sm:text-base text-[#77736D] dark:text-[#A8A49E] font-description italic">
            Practical techniques, spice ratio breakdowns, ingredient substitutions, and essential tips to elevate your everyday cooking with complete confidence.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77736D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by technique, spice, or ingredient..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#1E1E1C] border border-[#E6E1D8] dark:border-[#33322E] rounded-lg text-[#30302F] dark:text-[#EDE8DF] placeholder-[#8A857E] focus:outline-none focus:border-[#E97520]"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#30302F] text-white dark:bg-[#E97520]"
                    : "bg-white dark:bg-[#1E1E1C] text-[#77736D] dark:text-[#A8A49E] border border-[#E6E1D8] dark:border-[#33322E] hover:border-[#30302F]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => {
                setActiveSlug(guide.slug);
                onNavigate(`/guides/${guide.slug}`);
              }}
              className="group bg-white dark:bg-[#1E1E1C] rounded-xl border border-[#E6E1D8] dark:border-[#33322E] overflow-hidden hover:border-[#E97520] dark:hover:border-[#E97520] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-[16/10] bg-[#242423] overflow-hidden relative">
                <img
                  src={guide.heroImage}
                  alt={guide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-[#F8CD78] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {guide.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8A857E] mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTimeMinutes} min read
                    </span>
                    <span>By {guide.author.name}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#242423] dark:text-[#EDE8DF] font-serif-editorial group-hover:text-[#E97520] transition-colors leading-snug line-clamp-2">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#77736D] dark:text-[#A8A49E] leading-relaxed line-clamp-3 mt-1.5">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3F2EE] dark:border-[#2D2D2A] text-xs font-bold text-[#E97520] flex items-center justify-between">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
