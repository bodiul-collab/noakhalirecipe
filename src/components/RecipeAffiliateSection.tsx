import React, { useState } from "react";
import { ExternalLink, ShoppingBag, Check, ShieldCheck, Sparkles } from "lucide-react";
import { RecipeAmazonLink } from "../data/recipeAffiliateLinks";

interface RecipeAffiliateSectionProps {
  recipeTitle: string;
  links: RecipeAmazonLink[];
}

export const RecipeAffiliateSection: React.FC<RecipeAffiliateSectionProps> = ({
  recipeTitle,
  links,
}) => {
  const [clickedUrl, setClickedUrl] = useState<string | null>(null);

  if (!links || links.length === 0) return null;

  const handleCtaClick = (url: string) => {
    setClickedUrl(url);
  };

  return (
    <section
      id="recommended-ingredients-gear"
      aria-label="Recommended Cookware and Spices"
      className="p-5 sm:p-6 bg-gradient-to-br from-[#FFFDF9] to-[#FFF8EE] rounded-2xl border-2 border-[#F8CD78]/70 shadow-sm space-y-4 print:hidden transition-all"
    >
      {/* Header with Title and Disclosure Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#F8CD78]/40">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D75D17] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
            CURATED COOKWARE &amp; SPICES
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#242423] font-serif-editorial">
            Recommended Gear &amp; Ingredients for {recipeTitle}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8A857E] bg-white px-2.5 py-1 rounded-full border border-[#E6E1D8] shrink-0 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2D7A52]" />
          <span>Verified Halal Kitchen Standard</span>
        </div>
      </div>

      <p className="text-xs text-[#57534E] leading-relaxed">
        To achieve the authentic flavor, texture, and aroma of this heritage dish, our culinary team recommends the following verified cookware, specialty spices, and kitchen tools:
      </p>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {links.map((item, idx) => {
          const isClicked = clickedUrl === item.url;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#E6E1D8] hover:border-[#E97520] transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  {item.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D75D17] bg-[#FFF9F0] border border-[#F8CD78] px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                  {item.category && (
                    <span className="text-[10px] font-medium text-[#77736D]">
                      {item.category}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#30302F] group-hover:text-[#E97520] transition-colors leading-snug">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="text-xs text-[#77736D] leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Direct CTA Button matching user link */}
              <div className="pt-2 border-t border-[#F3F2EE] space-y-1.5">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick(item.url)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#E97520] hover:bg-[#D75D17] active:bg-[#C25110] text-white text-xs font-bold rounded-lg transition-all shadow-2xs cursor-pointer group-hover:shadow-xs no-underline"
                  title={`Open link: ${item.url}`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>Check on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-80 shrink-0" />
                </a>

                <div className="flex items-center justify-between text-[10px] text-[#8A857E] px-1 font-mono">
                  <span className="truncate max-w-[170px]" title={item.url}>
                    {item.url.replace(/^https?:\/\//, "")}
                  </span>
                  {isClicked ? (
                    <span className="text-[#2D7A52] font-semibold flex items-center gap-0.5 font-sans">
                      <Check className="w-3 h-3" /> Visited
                    </span>
                  ) : (
                    <span className="text-[#77736D] font-sans">Direct link</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legal Affiliate Transparency Notice */}
      <div className="pt-2 text-[10px] text-[#8A857E] leading-relaxed border-t border-[#F8CD78]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <span>
          <strong>Affiliate Transparency:</strong> When you purchase through these verified links, Noakhali Kitchen may earn a modest commission as an Amazon Associate at no extra cost to you.
        </span>
        <span className="shrink-0 font-medium text-[#77736D]">
          Strictly hand-curated &bull; 100% Pork &amp; Alcohol Free
        </span>
      </div>
    </section>
  );
};
