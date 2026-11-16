import React, { useRef, useState } from "react";
import { Play, ArrowRight, ArrowDown, AlertCircle, RotateCcw, Loader2 } from "lucide-react";

interface BrandIntroVideoHeroProps {
  onNavigate: (route: string) => void;
  onScrollToVideos: () => void;
}

const INTRO_VIDEO_SRC = "/videos/noakhali-kitchen-intro.mp4";
const INTRO_POSTER_SRC = "/videos/noakhali-kitchen-intro-poster.jpg";

export const BrandIntroVideoHero: React.FC<BrandIntroVideoHeroProps> = ({
  onNavigate,
  onScrollToVideos,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlayClick = () => {
    setHasError(false);
    setHasStarted(true);
    setIsLoading(true);

    const el = videoRef.current;
    if (el) {
      try {
        const playPromise = el.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            setIsLoading(false);
          });
        }
      } catch {
        setIsLoading(false);
      }
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setHasStarted(true);
    const el = videoRef.current;
    if (el) {
      el.load();
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          setIsLoading(false);
        });
      }
    }
  };

  return (
    <section
      aria-labelledby="brand-intro-heading"
      className="bg-white rounded-2xl border border-[#E6E1D8] shadow-sm overflow-hidden"
    >
      {/* Subtle traditional gold top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E7A52B] via-[#E97520] to-[#E7A52B]" aria-hidden="true" />

      <div className="p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
        {/* Centered Editorial Introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B45309] dark:text-[#F8CD78]">
            Noakhali Kitchen &middot; Brand Film
          </p>

          <h1
            id="brand-intro-heading"
            className="text-2xl sm:text-4xl lg:text-[2.75rem] font-bold font-serif-editorial text-[#242423] tracking-tight leading-[1.15] text-balance"
          >
            Welcome to Noakhali Kitchen
          </h1>

          <p className="text-base sm:text-xl font-medium font-serif-editorial italic text-[#D75D17]">
            Where Every Recipe Has a Story
          </p>

          <p className="text-sm sm:text-base text-[#55504A] leading-relaxed max-w-2xl mx-auto">
            From the beautiful villages of Bangladesh to kitchens around the world, discover authentic
            Halal recipes, traditional Noakhali dishes, family cooking traditions and the stories behind
            every meal.
          </p>
        </div>

        {/* Large Responsive 16:9 Video Player */}
        <div className="max-w-5xl mx-auto w-full">
          <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#1E1B18] border border-[#E6E1D8] shadow-md">
            <video
              ref={videoRef}
              src={INTRO_VIDEO_SRC}
              poster={INTRO_POSTER_SRC}
              preload="none"
              playsInline
              controls={hasStarted && !hasError}
              title="Welcome to Noakhali Kitchen — Where Every Recipe Has a Story"
              aria-label="Welcome to Noakhali Kitchen introduction video showcasing traditional Bengali village cooking and modern Halal kitchen heritage"
              onLoadStart={() => {
                if (hasStarted) setIsLoading(true);
              }}
              onCanPlay={() => setIsLoading(false)}
              onPlaying={() => {
                setIsLoading(false);
                setHasError(false);
              }}
              onWaiting={() => {
                if (hasStarted) setIsLoading(true);
              }}
              onError={() => {
                if (hasStarted) {
                  setIsLoading(false);
                  setHasError(true);
                }
              }}
              className="absolute inset-0 w-full h-full object-contain bg-[#1E1B18] block"
            >
              Sorry, your browser does not support embedded HTML5 videos.
            </video>

            {/* Lightweight Poster Image & Play Overlay (prevents video download & preserves avatar framing before Play) */}
            {!hasStarted && !hasError && (
              <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                <img
                  src={INTRO_POSTER_SRC}
                  alt="Noakhali Kitchen host in a traditional black and gold saree smiling in a sunlit Bangladeshi village kitchen beside a steaming earthen stove"
                  width={1280}
                  height={720}
                  className="absolute inset-0 w-full h-full object-contain bg-[#1E1B18]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/25 pointer-events-none"
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={handlePlayClick}
                  aria-label="Play Welcome to Noakhali Kitchen introduction video"
                  className="relative z-10 group flex items-center justify-center p-2 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8CD78]"
                >
                  <span className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#E97520] group-hover:bg-[#D75D17] text-white flex items-center justify-center shadow-2xl border-2 border-white/90 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                    <Play className="w-6 h-6 sm:w-9 sm:h-9 fill-white ml-0.5 sm:ml-1" />
                  </span>
                </button>
              </div>
            )}

            {/* Buffering / Loading Indicator */}
            {hasStarted && isLoading && !hasError && (
              <div
                role="status"
                aria-live="polite"
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/55 text-white pointer-events-none gap-2"
              >
                <Loader2 className="w-9 h-9 animate-spin text-[#F8CD78]" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  Loading kitchen story...
                </span>
              </div>
            )}

            {/* Graceful Error Fallback */}
            {hasError && (
              <div
                role="alert"
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#242423]/95 text-[#FAF9F6] p-6 text-center gap-3"
              >
                <AlertCircle className="w-10 h-10 text-[#F8CD78]" />
                <div className="space-y-1 max-w-md">
                  <p className="text-sm sm:text-base font-bold font-serif-editorial">
                    Unable to Load Video Playback
                  </p>
                  <p className="text-xs sm:text-sm text-[#D6CEBE] leading-relaxed">
                    Please check your connection or verify the video file at{" "}
                    <code className="text-[#F8CD78]">/videos/noakhali-kitchen-intro.mp4</code>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E97520] hover:bg-[#D75D17] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Playing Again</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero CTAs below the video */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-1">
          <a
            href="/recipes"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                onNavigate("/recipes");
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#30302F] hover:bg-black text-white text-sm font-bold transition-colors shadow-sm cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <span>Explore Recipes</span>
            <ArrowRight className="w-4 h-4 text-[#F8CD78]" />
          </a>

          <a
            href="#published-cooking-videos"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                onScrollToVideos();
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#FFF9F0] border border-[#E6E1D8] hover:border-[#E97520] text-[#30302F] hover:text-[#D75D17] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <span>Explore Cooking Videos</span>
            <ArrowDown className="w-4 h-4 text-[#E97520]" />
          </a>
        </div>
      </div>
    </section>
  );
};
