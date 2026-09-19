import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Film,
  Clock,
  BookOpen,
  Wrench,
  ChevronDown,
  ChevronUp,
  ChefHat,
  Tv,
  Scissors,
  Volume2,
  ArrowRight,
} from "lucide-react";
import { Recipe } from "../types";
import { YouTubePlayer } from "./YouTubePlayer";
import { FOOD_CULTURE_ARTICLES } from "../data/foodCulture";
import { KITCHEN_EQUIPMENT } from "../data/kitchenEquipment";
import { RECIPES } from "../data/recipes";

// 1. WHAT MAKES THIS DISH SPECIAL BANNER
export const RecipeWhySpecialBanner: React.FC<{ whySpecial?: string }> = ({ whySpecial }) => {
  if (!whySpecial) return null;

  return (
    <div className="p-4 sm:p-5 bg-[#FFF9F0] border-l-4 border-[#E97520] rounded-r-xl border-y border-r border-[#F8CD78]/50 space-y-2 shadow-2xs">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D75D17] flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
        THE AUTHENTIC CULINARY SECRET
      </span>
      <h3 className="text-sm sm:text-base font-bold text-[#30302F] font-heading">
        What Sets This Recipe Apart
      </h3>
      <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed italic">
        "{whySpecial}"
      </p>
    </div>
  );
};

// 2. VIDEO MASTERCLASS, INTERACTIVE CHAPTERS & PRODUCTION STORYBOARD
export const RecipeVideoMasterclass: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [showStoryboard, setShowStoryboard] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);

  const hasVideo = Boolean(recipe.youtubeVideoId || recipe.youtubeUrl);
  const hasChapters = Boolean(recipe.videoChapters && recipe.videoChapters.length > 0);
  const hasProductionData = Boolean(recipe.videoProduction);

  if (!hasVideo && !hasChapters && !hasProductionData) {
    return null;
  }

  return (
    <div
      id="recipe-video-production"
      className="p-5 sm:p-7 bg-[#1F1E1D] text-white rounded-2xl shadow-md border border-[#383633] space-y-6 print:hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#383633] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E97520] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E97520]">
              NOAKHALI KITCHEN PRODUCTION ENGINE
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-serif-editorial text-[#FAF9F6]">
            {recipe.videoProduction?.youtubeOptimizedTitle ||
              recipe.videoTitle ||
              `How to Make Authentic ${recipe.title}`}
          </h3>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] px-2.5 py-1 bg-[#2C2A28] border border-[#474440] text-[#E6E1D8] font-mono rounded-md">
            {recipe.videoDuration || "12:45"} &bull; 4K 60FPS
          </span>
          <span className="text-[11px] px-2.5 py-1 bg-[#E97520]/20 border border-[#E97520]/40 text-[#E97520] font-bold rounded-md">
            Cinematic Masterclass
          </span>
        </div>
      </div>

      {/* Actual Video Player or Cinematic Production Preview */}
      {hasVideo ? (
        <YouTubePlayer
          videoId={recipe.youtubeVideoId}
          videoUrl={recipe.youtubeUrl}
          title={recipe.videoTitle || recipe.title}
          thumbnailUrl={recipe.heroImage}
          duration={recipe.videoDuration}
          subtitle={`Masterclass: ${recipe.title}`}
        />
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-[#383633] group bg-black/40">
          <img
            src={recipe.heroImage}
            alt={recipe.title}
            className="w-full h-56 sm:h-72 object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#E97520] font-bold tracking-wider uppercase">
              <Film className="w-4 h-4" />
              YouTube Companion Masterclass
            </div>
            <p className="text-sm sm:text-base font-medium text-white max-w-2xl leading-snug">
              {recipe.videoProduction?.hook ||
                "Watch the full step-by-step masterclass filmed in pristine 4K food cinematography."}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#C2BCB3]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E97520]" />
                Full runtime: {recipe.videoDuration || "12:45"}
              </span>
              <span>&bull;</span>
              <span>{recipe.videoChapters?.length || 6} Chapters</span>
              <span>&bull;</span>
              <span className="text-[#E97520] font-semibold">
                Includes 3 YouTube Shorts Clips
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Video Chapters Timeline */}
      {hasChapters && (
        <div className="space-y-3 bg-[#282624] p-4 rounded-xl border border-[#3D3A36]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E6E1D8] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#E97520]" />
              Interactive Video Chapters &amp; Timestamps
            </h4>
            <span className="text-[11px] text-[#A69F95]">
              {recipe.videoChapters!.length} segments
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.videoChapters!.map((ch, idx) => {
              const isExpanded = activeChapterIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveChapterIndex(isExpanded ? null : idx)}
                  className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                    isExpanded
                      ? "bg-[#33302C] border-[#E97520] text-white"
                      : "bg-[#201F1D] border-[#383633] text-[#C2BCB3] hover:border-[#524E48] hover:text-white"
                  }`}
                >
                  <span className="font-mono text-[11px] font-bold text-[#E97520] px-1.5 py-0.5 rounded bg-[#E97520]/10 border border-[#E97520]/30 shrink-0">
                    {ch.timestamp}
                  </span>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-xs font-bold block truncate">
                      {ch.title}
                    </span>
                    {ch.description && (
                      <p className="text-[11px] text-[#8C867D] line-clamp-1">
                        {ch.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Production Engine Storyboard & YouTube Shorts Breakdown Toggle */}
      {hasProductionData && (
        <div className="border border-[#383633] rounded-xl overflow-hidden bg-[#242220]">
          <button
            onClick={() => setShowStoryboard(!showStoryboard)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#2C2A27] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Tv className="w-4 h-4 text-[#E97520]" />
              <div>
                <span className="text-xs font-bold text-white block">
                  Production Engine Blueprint &amp; YouTube Shorts Breakdown
                </span>
                <span className="text-[11px] text-[#8C867D]">
                  Cinematography notes, audio script, and 3 vertical short clips
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#E97520] font-bold">
              {showStoryboard ? "Collapse Blueprint" : "View Blueprint"}
              {showStoryboard ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showStoryboard && (
            <div className="p-4 sm:p-6 border-t border-[#383633] space-y-5 text-xs text-[#C2BCB3]">
              {/* Storyboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#1C1B1A] rounded-lg border border-[#33312E] space-y-1.5">
                  <strong className="text-[11px] font-bold text-[#E97520] uppercase tracking-wider block flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" />
                    Cinematography &amp; Food Visuals
                  </strong>
                  <p className="text-[#A69F95] leading-relaxed">
                    {recipe.videoProduction!.cinematographyNotes}
                  </p>
                </div>

                <div className="p-3.5 bg-[#1C1B1A] rounded-lg border border-[#33312E] space-y-1.5">
                  <strong className="text-[11px] font-bold text-[#E97520] uppercase tracking-wider block flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5" />
                    Key Culinary Technique
                  </strong>
                  <p className="text-[#A69F95] leading-relaxed">
                    {recipe.videoProduction!.keyTechnique}
                  </p>
                </div>
              </div>

              {/* Voiceover Sample */}
              <div className="p-3.5 bg-[#1C1B1A] rounded-lg border border-[#33312E] space-y-1.5">
                <strong className="text-[11px] font-bold text-[#E97520] uppercase tracking-wider block flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  Authentic Voiceover Narrative
                </strong>
                <p className="text-[#D6D0C5] italic leading-relaxed">
                  "{recipe.videoProduction!.voiceoverSample}"
                </p>
              </div>

              {/* YouTube Shorts List */}
              {recipe.videoProduction!.shortsClips &&
                recipe.videoProduction!.shortsClips.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <strong className="text-[11px] font-bold text-white uppercase tracking-wider block flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#E97520]" />
                      Derived YouTube Shorts &amp; Social Micro-Clips (3 Formats)
                    </strong>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {recipe.videoProduction!.shortsClips.map((short, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 bg-[#171615] rounded-lg border border-[#2E2C2A] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-[#E97520] bg-[#E97520]/10 px-1.5 py-0.5 rounded">
                              {short.timeRange}
                            </span>
                            <span className="text-[10px] text-[#8C867D]">
                              {short.duration}
                            </span>
                          </div>
                          <span className="font-bold text-white text-[11px] block">
                            {short.title}
                          </span>
                          <p className="text-[10px] text-[#A69F95] leading-snug">
                            {short.focus}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 3. CULINARY ECOSYSTEM: TIPS, PITFALLS, CULTURE, GEAR & RELATED RECIPES
export const RecipeCulinaryEcosystem: React.FC<{
  recipe: Recipe;
  onNavigate: (route: string) => void;
  onSelectRecipe: (slug: string) => void;
}> = ({ recipe, onNavigate, onSelectRecipe }) => {
  const relatedCulture = recipe.relatedCultureSlug
    ? FOOD_CULTURE_ARTICLES.find((c) => c.slug === recipe.relatedCultureSlug)
    : null;

  const relatedTool = recipe.relatedKitchenToolId
    ? KITCHEN_EQUIPMENT.find((t) => t.id === recipe.relatedKitchenToolId)
    : null;

  const relatedRecipes = (recipe.relatedRecipeSlugs || [])
    .map((slug) => RECIPES.find((r) => r.slug === slug))
    .filter(Boolean) as Recipe[];

  return (
    <div className="space-y-6 pt-2">
      {/* Chef's Crucial Tips & Common Mistakes */}
      {((recipe.cookingTips && recipe.cookingTips.length > 0) ||
        (recipe.commonMistakes && recipe.commonMistakes.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipe.cookingTips && recipe.cookingTips.length > 0 && (
            <div className="p-5 bg-[#F4F9F4] rounded-xl border border-[#D1E7DD] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#198754]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F5132] font-heading">
                  Chef's Crucial Cooking Tips
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-[#2F4F4F]">
                {recipe.cookingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#198754] font-bold mt-0.5">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.commonMistakes && recipe.commonMistakes.length > 0 && (
            <div className="p-5 bg-[#FFF8F6] rounded-xl border border-[#F8D7DA] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#DC3545]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#842029] font-heading">
                  Common Pitfalls &amp; Mistakes to Avoid
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-[#58151C]">
                {recipe.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#DC3545] font-bold mt-0.5">&bull;</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Connected Food Culture & Heritage */}
      {relatedCulture && (
        <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-3 shadow-2xs print:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E97520] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              CULINARY HERITAGE &amp; FOOD CULTURE
            </span>
            <button
              onClick={() => onNavigate(`/food-culture/${relatedCulture.slug}`)}
              className="text-xs font-bold text-[#E97520] hover:underline cursor-pointer flex items-center gap-1"
            >
              Read Article <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {relatedCulture.heroImage && (
              <img
                src={relatedCulture.heroImage}
                alt={relatedCulture.title}
                className="w-full sm:w-36 h-24 object-cover rounded-lg border border-[#E6E1D8] shrink-0"
              />
            )}
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-[#242423] font-serif-editorial">
                {relatedCulture.title}
              </h4>
              <p className="text-xs text-[#77736D] line-clamp-2 leading-relaxed">
                {relatedCulture.excerpt}
              </p>
              <button
                onClick={() => onNavigate(`/food-culture/${relatedCulture.slug}`)}
                className="text-[11px] font-semibold text-[#30302F] hover:text-[#E97520] transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                Explore the historical roots of this recipe &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Kitchen Equipment */}
      {relatedTool && (
        <div className="p-5 sm:p-6 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] space-y-3 shadow-2xs print:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#77736D] flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#E97520]" />
              RECOMMENDED KITCHEN EQUIPMENT
            </span>
            <button
              onClick={() => onNavigate("/tools")}
              className="text-xs font-bold text-[#E97520] hover:underline cursor-pointer flex items-center gap-1"
            >
              All Kitchen Tools <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#242423]">{relatedTool.title}</h4>
              {relatedTool.badge && (
                <span className="text-[10px] font-bold text-[#D75D17] bg-[#FFF9F0] border border-[#F8CD78] px-2 py-0.5 rounded">
                  {relatedTool.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-[#77736D] leading-relaxed">
              {relatedTool.recommendedUse}
            </p>
            {relatedTool.practicalTips && relatedTool.practicalTips.length > 0 && (
              <p className="text-[11px] text-[#8C867D] italic">
                <strong>Chef's Gear Tip:</strong> {relatedTool.practicalTips[0]}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Connected Companion Recipes */}
      {relatedRecipes.length > 0 && (
        <div className="p-6 bg-white rounded-xl border border-[#E6E1D8] space-y-4 shadow-2xs print:hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E97520] block">
                COMPANION RECIPES
              </span>
              <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                More Authentic Recipes You Will Love
              </h3>
            </div>
            <button
              onClick={() => onNavigate("/recipes")}
              className="text-xs font-bold text-[#E97520] hover:underline cursor-pointer"
            >
              Browse All Recipes &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedRecipes.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRecipe(r.slug)}
                className="text-left p-3 rounded-lg border border-[#E6E1D8] hover:border-[#E97520] bg-[#FAF9F6] transition-all cursor-pointer group flex flex-col justify-between space-y-2.5"
              >
                <div className="space-y-2">
                  <div className="relative rounded-md overflow-hidden aspect-video bg-[#E6E1D8]">
                    <img
                      src={r.heroImage}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] block">
                    {r.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#30302F] group-hover:text-[#E97520] transition-colors line-clamp-2 leading-snug">
                    {r.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#77736D] pt-1 border-t border-[#EAE6DF]">
                  <span>{r.totalTimeMinutes} mins</span>
                  <span className="font-semibold text-[#E97520] group-hover:underline">
                    View Recipe &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
