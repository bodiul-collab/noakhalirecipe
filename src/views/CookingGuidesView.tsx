import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  ArrowLeft,
  Wrench,
  HelpCircle,
  Tag,
  Share2,
  Check,
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
  "Guides",
  "Spice Guides",
  "Cooking Techniques",
  "Ingredient Guides",
  "Ingredient Substitutions",
  "Beginner Cooking",
  "Kitchen Tips",
] as const;

// Helper to render bold (**text**), italic (*text*), and markdown links ([label](url))
const renderFormattedText = (text: string, onNavigate?: (route: string) => void) => {
  // First split by markdown links [label](url)
  const linkRegex = /(\[[^\]]+\]\([^)]+\))/g;
  const linkParts = text.split(linkRegex);

  return linkParts.map((linkPart, li) => {
    const linkMatch = linkPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const href = linkMatch[2];
      const isInternal = href.startsWith("/");

      return (
        <a
          key={`link-${li}`}
          href={href}
          onClick={(e) => {
            if (isInternal && onNavigate) {
              e.preventDefault();
              onNavigate(href);
            }
          }}
          className="text-[#E97520] hover:text-[#C85D10] underline font-medium cursor-pointer transition-colors"
        >
          {label}
        </a>
      );
    }

    // Split by **bold**
    const boldParts = linkPart.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((bPart, bi) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        return (
          <strong key={`b-${li}-${bi}`} className="font-bold text-[#242423] dark:text-white">
            {bPart.slice(2, -2)}
          </strong>
        );
      }

      // Split by *italic*
      const italicParts = bPart.split(/(\*.*?\*)/g);
      return italicParts.map((iPart, ii) => {
        if (iPart.startsWith("*") && iPart.endsWith("*") && !iPart.startsWith("**")) {
          return (
            <em key={`i-${li}-${bi}-${ii}`} className="italic">
              {iPart.slice(1, -1)}
            </em>
          );
        }
        return iPart;
      });
    });
  });
};

export const CookingGuidesView: React.FC<CookingGuidesViewProps> = ({
  initialSlug,
  onNavigate,
  onSelectRecipe,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setActiveSlug(initialSlug || null);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [initialSlug]);

  // Handle redirect if accessed with legacy slug
  useEffect(() => {
    if (activeSlug === "bengali-radhuni-spice-guide") {
      try {
        window.history.replaceState({}, "", "/guides/bengali-radhuni-guide");
      } catch {}
      setActiveSlug("bengali-radhuni-guide");
      onNavigate("/guides/bengali-radhuni-guide");
    }
  }, [activeSlug, onNavigate]);

  const currentGuide = COOKING_GUIDES.find((g) => g.slug === activeSlug);

  // Set canonical, title, and meta tags dynamically for SEO
  useEffect(() => {
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const originalHref = canonical.getAttribute("href") || "https://www.noakhalikitchen.com/";
    const originalTitle = document.title;
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") || "" : "";
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');

    if (currentGuide) {
      const pageTitle = currentGuide.seoTitle || `${currentGuide.title} | Noakhali Kitchen`;
      document.title = pageTitle;
      const desc = currentGuide.seoDescription || currentGuide.excerpt;
      if (metaDesc) metaDesc.setAttribute("content", desc);
      if (ogTitle) ogTitle.setAttribute("content", pageTitle);
      if (ogDesc) ogDesc.setAttribute("content", desc);
      if (ogUrl) ogUrl.setAttribute("content", `https://www.noakhalikitchen.com/guides/${currentGuide.slug}`);
      canonical.setAttribute(
        "href",
        `https://www.noakhalikitchen.com/guides/${currentGuide.slug}`
      );
    } else {
      document.title = "Cooking Guides & Techniques | Noakhali Kitchen";
      canonical.setAttribute("href", "https://www.noakhalikitchen.com/guides");
    }
    return () => {
      if (canonical) {
        canonical.setAttribute("href", originalHref);
      }
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute("content", originalDesc);
      }
    };
  }, [currentGuide]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

    const relatedGuides = COOKING_GUIDES.filter(
      (g) =>
        g.slug !== currentGuide.slug &&
        currentGuide.relatedGuideSlugs?.includes(g.slug)
    );

    const jsonLdData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `https://www.noakhalikitchen.com/guides/${currentGuide.slug}#article`,
          headline: currentGuide.title,
          description: currentGuide.excerpt,
          url: `https://www.noakhalikitchen.com/guides/${currentGuide.slug}`,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.noakhalikitchen.com/guides/${currentGuide.slug}`,
          },
          author: {
            "@type": "Person",
            name: currentGuide.author.name,
            jobTitle: currentGuide.author.role,
          },
          publisher: {
            "@type": "Organization",
            name: "Noakhali Kitchen",
            url: "https://www.noakhalikitchen.com/",
          },
          image: currentGuide.heroImage,
          datePublished: currentGuide.publishedDate,
          dateModified: currentGuide.updatedDate,
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://www.noakhalikitchen.com/guides/${currentGuide.slug}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.noakhalikitchen.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Cooking Guides",
              item: "https://www.noakhalikitchen.com/guides",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: currentGuide.title,
              item: `https://www.noakhalikitchen.com/guides/${currentGuide.slug}`,
            },
          ],
        },
      ],
    };

    return (
      <div className="w-full bg-[#FAF9F6] dark:bg-[#141413] py-8 sm:py-12">
        {/* Inject Article & Breadcrumbs Schema with canonical URL */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />

        <div className="max-w-[880px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#77736D] dark:text-[#A8A49E]">
            <button
              onClick={() => onNavigate("/")}
              className="hover:text-[#30302F] dark:hover:text-white cursor-pointer"
            >
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
            <span className="text-[#30302F] dark:text-white font-bold truncate max-w-[240px]">
              {currentGuide.title}
            </span>
          </nav>

          <div className="flex items-center justify-between">
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

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#77736D] dark:text-[#A8A49E] hover:text-[#E97520] cursor-pointer transition-colors"
              title="Share Guide Link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Guide</span>
                </>
              )}
            </button>
          </div>

          <article className="bg-white dark:bg-[#1E1E1C] rounded-xl border border-[#E6E1D8] dark:border-[#33322E] shadow-sm p-6 sm:p-10 space-y-7">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
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
                <span className="font-bold text-[#30302F] dark:text-white">
                  By {currentGuide.author.name}
                </span>
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

            {/* Content Body with Markdown Rendering */}
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-[#3F3C38] dark:text-[#EDE8DF] space-y-4">
              {currentGuide.content.split("\n\n").map((paragraph, idx) => {
                const trimmed = paragraph.trim();

                // H3
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="text-lg sm:text-xl font-bold text-[#242423] dark:text-white font-serif-editorial mt-6 mb-2 border-b border-[#F3F2EE] dark:border-[#2D2D2A] pb-1.5"
                    >
                      {renderFormattedText(trimmed.replace("### ", ""))}
                    </h3>
                  );
                }

                // H4
                if (trimmed.startsWith("#### ")) {
                  return (
                    <h4
                      key={idx}
                      className="text-base sm:text-lg font-bold text-[#30302F] dark:text-white font-heading mt-4 mb-1.5"
                    >
                      {renderFormattedText(trimmed.replace("#### ", ""))}
                    </h4>
                  );
                }

                // Markdown Table Parsing
                if (trimmed.includes("|") && trimmed.includes("\n")) {
                  const lines = trimmed
                    .split("\n")
                    .map((l) => l.trim())
                    .filter((l) => l.length > 0);

                  if (lines.length >= 2 && lines[0].startsWith("|")) {
                    const headerCells = lines[0]
                      .split("|")
                      .map((c) => c.trim())
                      .filter((_, i, arr) => i > 0 && i < arr.length - 1);

                    const dataRows = lines
                      .slice(2)
                      .map((line) =>
                        line
                          .split("|")
                          .map((c) => c.trim())
                          .filter((_, i, arr) => i > 0 && i < arr.length - 1)
                      )
                      .filter((row) => row.length > 0);

                    return (
                      <div
                        key={idx}
                        className="overflow-x-auto my-5 rounded-lg border border-[#E6E1D8] dark:border-[#33322E]"
                      >
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead className="bg-[#FAF9F6] dark:bg-[#2A2926] border-b border-[#E6E1D8] dark:border-[#33322E]">
                            <tr>
                              {headerCells.map((h, hi) => (
                                <th
                                  key={hi}
                                  className="px-4 py-2.5 font-bold text-[#242423] dark:text-white uppercase text-[11px] tracking-wider"
                                >
                                  {renderFormattedText(h, onNavigate)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E6E1D8] dark:divide-[#33322E] bg-white dark:bg-[#1E1E1C]">
                            {dataRows.map((row, ri) => (
                              <tr
                                key={ri}
                                className="hover:bg-[#FAF9F6]/60 dark:hover:bg-[#252422]/60"
                              >
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className="px-4 py-2.5 text-[#3F3C38] dark:text-[#EDE8DF] align-top"
                                  >
                                    {renderFormattedText(cell, onNavigate)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                }

                // Numbered List
                if (/^\d+\.\s/.test(trimmed)) {
                  return (
                    <div key={idx} className="space-y-1.5 pl-2 my-2">
                      {trimmed.split("\n").map((line, i) => (
                        <p key={i} className="pl-1">
                          {renderFormattedText(line, onNavigate)}
                        </p>
                      ))}
                    </div>
                  );
                }

                // Bullet List
                if (trimmed.startsWith("- ")) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2 my-2">
                      {trimmed.split("\n").map((li, i) => (
                        <li key={i}>{renderFormattedText(li.replace("- ", ""), onNavigate)}</li>
                      ))}
                    </ul>
                  );
                }

                // Horizontal Rule
                if (trimmed === "---") {
                  return (
                    <hr
                      key={idx}
                      className="border-[#E6E1D8] dark:border-[#33322E] my-6"
                    />
                  );
                }

                // Blockquote / Editorial Callout Box
                if (trimmed.startsWith("> ") || trimmed.startsWith(">")) {
                  const quoteLines = trimmed
                    .split("\n")
                    .map((l) => l.replace(/^>\s*/, ""))
                    .join("\n");

                  return (
                    <div
                      key={idx}
                      className="my-5 p-5 sm:p-6 rounded-xl bg-[#FFF9F0] dark:bg-[#252018] border-l-4 border-[#E97520] border-y border-r border-[#F8CD78]/40 dark:border-[#E7A52B]/30 shadow-xs space-y-2"
                    >
                      {quoteLines.split("\n\n").map((qPara, qi) => (
                        <p key={qi} className="text-xs sm:text-sm leading-relaxed text-[#3F3C38] dark:text-[#EDE8DF]">
                          {renderFormattedText(qPara, onNavigate)}
                        </p>
                      ))}
                    </div>
                  );
                }

                // Regular Paragraph
                return <p key={idx}>{renderFormattedText(trimmed, onNavigate)}</p>;
              })}
            </div>

            {/* Structured Troubleshooting Guide */}
            {currentGuide.troubleshooting && currentGuide.troubleshooting.length > 0 && (
              <div className="pt-6 border-t border-[#E6E1D8] dark:border-[#33322E] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#242423] dark:text-white font-heading">
                  <Wrench className="w-4 h-4 text-[#E97520]" />
                  Culinary Troubleshooting Guide
                </div>
                <div className="overflow-x-auto rounded-lg border border-[#E6E1D8] dark:border-[#33322E]">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead className="bg-[#FFF9F0] dark:bg-[#2A241A] border-b border-[#E6E1D8] dark:border-[#33322E]">
                      <tr>
                        <th className="px-4 py-3 font-bold text-[#D96B1A] uppercase text-[11px] tracking-wider w-1/4">
                          Problem
                        </th>
                        <th className="px-4 py-3 font-bold text-[#242423] dark:text-white uppercase text-[11px] tracking-wider w-1/3">
                          Likely Cause
                        </th>
                        <th className="px-4 py-3 font-bold text-[#242423] dark:text-white uppercase text-[11px] tracking-wider">
                          Solution
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E1D8] dark:divide-[#33322E] bg-white dark:bg-[#1E1E1C]">
                      {currentGuide.troubleshooting.map((t, ti) => (
                        <tr
                          key={ti}
                          className="hover:bg-[#FAF9F6]/70 dark:hover:bg-[#252422]/70"
                        >
                          <td className="px-4 py-3 font-bold text-[#30302F] dark:text-white align-top">
                            {t.problem}
                          </td>
                          <td className="px-4 py-3 text-[#77736D] dark:text-[#A8A49E] align-top">
                            {t.cause}
                          </td>
                          <td className="px-4 py-3 text-[#3F3C38] dark:text-[#EDE8DF] font-medium align-top">
                            {t.solution}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

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

            {/* Related Culinary Guides & Techniques */}
            {relatedGuides.length > 0 && (
              <div className="pt-6 border-t border-[#E6E1D8] dark:border-[#33322E] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#242423] dark:text-white font-serif-editorial">
                    Related Culinary Guides & Techniques
                  </h3>
                  <span className="text-xs text-[#E97520] font-bold">Kitchen Mastery</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedGuides.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        setActiveSlug(g.slug);
                        onNavigate(`/guides/${g.slug}`);
                      }}
                      className="group p-3 rounded-lg border border-[#E6E1D8] dark:border-[#33322E] hover:border-[#E97520] dark:hover:border-[#E97520] bg-[#FAF9F6] dark:bg-[#242423] transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={g.heroImage}
                          alt={g.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] block truncate">
                            {g.category}
                          </span>
                          <h4 className="text-xs font-bold text-[#30302F] dark:text-[#EDE8DF] group-hover:text-[#E97520] transition-colors line-clamp-2">
                            {g.title}
                          </h4>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#E6E1D8]/60 dark:border-[#33322E] flex items-center justify-between text-[10px] text-[#77736D] dark:text-[#A8A49E]">
                        <span>{g.readTimeMinutes} min read</span>
                        <span className="font-bold text-[#E97520] group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                          Read <ArrowRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </div>
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

            {/* Tags footer */}
            {currentGuide.tags && currentGuide.tags.length > 0 && (
              <div className="pt-4 border-t border-[#E6E1D8] dark:border-[#33322E] flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#77736D] dark:text-[#A8A49E] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#E97520]" />
                  Tags:
                </span>
                {currentGuide.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF9F6] dark:bg-[#252422] border border-[#E6E1D8] dark:border-[#33322E] text-[#55524E] dark:text-[#BBB6AE]"
                  >
                    #{tag}
                  </span>
                ))}
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
            Halal Cooking Guides & Techniques
          </h1>
          <p className="text-sm sm:text-base text-[#77736D] dark:text-[#A8A49E] font-description italic">
            Authoritative culinary guides, spice ratios, food science principles, and chef techniques to elevate your cooking with complete confidence.
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
