import React, { useState, useEffect } from "react";
import {
  Star,
  Check,
  Edit3,
  Trash2,
  MessageSquare,
  Sparkles,
  Heart,
  Calendar,
} from "lucide-react";
import { Recipe } from "../types";
import { UserRecipeRating } from "../utils/ratingsStorage";

interface RecipeRatingCardProps {
  recipe: Recipe;
  userRating: UserRecipeRating | null;
  onSaveRating: (rating: number, reviewText?: string) => void;
  onDeleteRating: () => void;
}

const RATING_LABELS: Record<number, { title: string; desc: string }> = {
  1: { title: "Needs Improvement", desc: "Did not work well or lacked balanced flavor." },
  2: { title: "Fair / Okay", desc: "Acceptable, but needed personal substitutions or seasoning adjustments." },
  3: { title: "Good / Solid Recipe", desc: "A reliable, satisfying dish that turned out nicely." },
  4: { title: "Very Good / Delicious", desc: "Flavorful and balanced; would definitely cook again." },
  5: { title: "Exceptional / Authentic Perfection!", desc: "Outstanding culinary standard; restaurant-quality Halal dish." },
};

export const RecipeRatingCard: React.FC<RecipeRatingCardProps> = ({
  recipe,
  userRating,
  onSaveRating,
  onDeleteRating,
}) => {
  const [selectedStars, setSelectedStars] = useState<number>(userRating?.rating || 5);
  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [reviewNotes, setReviewNotes] = useState<string>(userRating?.reviewText || "");
  const [isEditing, setIsEditing] = useState<boolean>(!userRating);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Sync state if userRating changes externally (e.g. when changing recipes)
  useEffect(() => {
    if (userRating) {
      setSelectedStars(userRating.rating);
      setReviewNotes(userRating.reviewText || "");
      setIsEditing(false);
    } else {
      setSelectedStars(5);
      setReviewNotes("");
      setIsEditing(true);
    }
  }, [userRating, recipe.id]);

  const activeStarCount = hoveredStars || selectedStars;
  const currentLabel = RATING_LABELS[activeStarCount] || RATING_LABELS[5];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStars < 1) return;
    onSaveRating(selectedStars, reviewNotes);
    setIsEditing(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    setSelectedStars(userRating?.rating || 5);
    setReviewNotes(userRating?.reviewText || "");
  };

  const formatRatingDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <section
      id="recipe-rating-section"
      className="bg-white rounded-xl border border-[#E6E1D8] p-5 sm:p-7 space-y-5 shadow-xs transition-all"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F3F2EE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E97520] flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#E7A52B] text-[#E7A52B]" />
              Community &bull; User Reviews
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#242423] font-serif-editorial">
            Rate &amp; Review this Recipe
          </h2>
          <p className="text-xs text-[#77736D]">
            Have you made {recipe.title}? Your rating is saved directly to your browser's local storage so you can easily track your family favorites.
          </p>
        </div>

        {/* Existing rating badge if user already rated */}
        {userRating && !isEditing && (
          <div className="flex items-center gap-2 self-start sm:self-auto bg-[#FFF9F0] border border-[#F8CD78] px-3.5 py-1.5 rounded-lg text-xs">
            <span className="text-[#D75D17] font-bold">Your Saved Score:</span>
            <div className="flex items-center text-[#E7A52B]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= userRating.rating
                      ? "fill-[#E7A52B] text-[#E7A52B]"
                      : "text-[#D1CBC3]"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-[#30302F]">({userRating.rating}/5)</span>
          </div>
        )}
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between gap-2 text-xs text-emerald-900 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-medium">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span>
              Your <strong>{selectedStars}-star rating</strong> has been stored in local storage and will persist across visits!
            </span>
          </div>
          <button
            onClick={() => setShowSuccessToast(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* VIEW MODE: If rating already exists and not actively editing */}
      {!isEditing && userRating ? (
        <div className="p-5 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#77736D]">
                  Your Rating
                </span>
                <span className="text-[11px] text-[#8A857E] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatRatingDate(userRating.ratedAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-[#E7A52B]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= userRating.rating
                          ? "fill-[#E7A52B] text-[#E7A52B]"
                          : "text-[#D1CBC3]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base font-bold text-[#242423]">
                  {RATING_LABELS[userRating.rating]?.title || `${userRating.rating} Stars`}
                </span>
              </div>
            </div>

            {/* Edit / Remove Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleStartEditing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#E6E1D8] hover:border-[#30302F] text-xs font-bold text-[#30302F] transition-colors cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E97520]" />
                <span>Edit Rating</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Are you sure you want to remove your rating for this recipe?")) {
                    onDeleteRating();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-red-200 hover:bg-red-50 text-xs font-bold text-red-700 transition-colors cursor-pointer shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* User Review / Cooking Notes if provided */}
          {userRating.reviewText && (
            <div className="p-3.5 bg-white rounded-lg border border-[#E6E1D8] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A857E] flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-[#E97520]" />
                Your Kitchen Cooking Notes:
              </span>
              <p className="text-xs text-[#30302F] italic leading-relaxed">
                &ldquo;{userRating.reviewText}&rdquo;
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-[#E6E1D8] flex items-center justify-between text-[11px] text-[#77736D]">
            <span>
              💡 Stored securely in your browser's persistent storage (never expires).
            </span>
            <span className="font-medium text-[#E97520]">
              Halal Culinary Community
            </span>
          </div>
        </div>
      ) : (
        /* EDIT / RATE MODE: Interactive 5-star selector */
        <form onSubmit={handleSave} className="space-y-5">
          <div className="p-5 sm:p-6 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#30302F]">
                Tap a star to score this recipe:
              </label>

              {/* 5 Interactive Stars */}
              <div
                className="flex items-center gap-2 sm:gap-3 py-2"
                onMouseLeave={() => setHoveredStars(0)}
              >
                {[1, 2, 3, 4, 5].map((starNumber) => {
                  const isFilled = starNumber <= activeStarCount;
                  return (
                    <button
                      key={starNumber}
                      type="button"
                      onClick={() => setSelectedStars(starNumber)}
                      onMouseEnter={() => setHoveredStars(starNumber)}
                      aria-label={`Rate ${starNumber} out of 5 stars`}
                      className="p-1 rounded-md transition-transform hover:scale-115 focus:outline-none focus:ring-2 focus:ring-[#E97520]/20 cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                          isFilled
                            ? "fill-[#E7A52B] text-[#E7A52B] drop-shadow-xs"
                            : "text-[#D1CBC3] fill-transparent hover:text-[#E7A52B]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Verbal Score Description */}
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2.5 py-0.5 rounded bg-white border border-[#E6E1D8] text-xs font-bold text-[#D75D17] font-mono">
                  {activeStarCount} / 5 Stars
                </span>
                <span className="text-xs font-bold text-[#242423]">
                  {currentLabel.title}
                </span>
                <span className="hidden sm:inline text-xs text-[#77736D]">
                  &mdash; {currentLabel.desc}
                </span>
              </div>
            </div>

            {/* Optional Personal Notes / Review Input */}
            <div className="space-y-1.5 pt-2">
              <label
                htmlFor="recipe-review-notes"
                className="block text-xs font-bold uppercase tracking-wider text-[#30302F]"
              >
                Optional Kitchen Cooking Notes &amp; Tips
              </label>
              <textarea
                id="recipe-review-notes"
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="How did it turn out? Any seasoning tweaks or cook-time adjustments for next time? (e.g. 'Loved the depth of whole spices; used 1 cup Basmati rice')..."
                className="w-full p-3 bg-white border border-[#E6E1D8] rounded-lg text-xs sm:text-sm text-[#30302F] placeholder-[#8A857E] focus:outline-none focus:border-[#30302F] shadow-2xs leading-relaxed"
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#E97520] hover:bg-[#D75D17] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{userRating ? "Update Rating" : "Save Star Rating"}</span>
                </button>

                {userRating && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2.5 rounded-lg bg-white border border-[#E6E1D8] hover:bg-[#F3F2EE] text-xs font-bold text-[#77736D] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <span className="text-[11px] text-[#8A857E]">
                Saves to your browser's persistent LocalStorage
              </span>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};
