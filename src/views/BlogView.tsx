import React, { useState } from "react";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Share2, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "../data/blog";
import { RECIPES } from "../data/recipes";
import { BlogPost, Recipe } from "../types";

interface BlogViewProps {
  initialSlug?: string;
  onNavigate: (route: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  initialSlug,
  onNavigate,
  onSelectRecipe,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);

  React.useEffect(() => {
    setActiveSlug(initialSlug || null);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [initialSlug]);

  const currentPost = BLOG_POSTS.find((p) => p.slug === activeSlug);

  // If viewing a single post
  if (currentPost) {
    const relatedRecipes = RECIPES.filter((r) =>
      currentPost.relatedRecipeSlugs?.includes(r.slug)
    );

    return (
      <div className="w-full bg-[#FAF9F6] py-10 sm:py-14">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#77736D]">
            <button onClick={() => onNavigate("/")} className="hover:text-[#30302F]">
              Home
            </button>
            <span>/</span>
            <button onClick={() => setActiveSlug(null)} className="hover:text-[#30302F]">
              Community Guides
            </button>
            <span>/</span>
            <span className="text-[#30302F] font-bold truncate max-w-[200px]">
              {currentPost.title}
            </span>
          </nav>

          <button
            onClick={() => setActiveSlug(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#77736D] hover:text-[#30302F] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Guides
          </button>

          <article className="bg-white rounded-xl border border-[#E6E1D8] shadow-sm p-6 sm:p-10 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
                {currentPost.category} &bull; {currentPost.readTimeMinutes} Min Read
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#242423] font-serif-editorial leading-tight">
                {currentPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#77736D] border-b border-[#F3F2EE] pb-4">
                <span className="font-bold text-[#30302F]">By {currentPost.author.name}</span>
                <span>&bull;</span>
                <span>{currentPost.author.role}</span>
                <span>&bull;</span>
                <span>Published {currentPost.publishedDate}</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="aspect-[16/10] rounded-lg overflow-hidden border border-[#E6E1D8] bg-[#FAF9F6]">
              <img
                src={currentPost.heroImage}
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content body */}
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-[#3F3C38] space-y-4">
              {currentPost.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="text-lg font-bold text-[#242423] font-serif-editorial mt-6 mb-2"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
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

            {/* Author box */}
            <div className="p-5 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#30302F] block">{currentPost.author.name}</span>
                <span className="text-[#77736D]">{currentPost.author.role}</span>
              </div>
              <span className="text-[11px] text-[#8A857E]">
                Noakhali Kitchen Editorial Board
              </span>
            </div>

            {/* Related Recipes */}
            {relatedRecipes.length > 0 && (
              <div className="pt-6 border-t border-[#E6E1D8] space-y-4">
                <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                  Recommended Halal Recipes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedRecipes.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => onSelectRecipe(r)}
                      className="p-3 rounded-lg border border-[#E6E1D8] hover:border-[#E97520] transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <img
                        src={r.heroImage}
                        alt={r.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#30302F] line-clamp-1">
                          {r.title}
                        </h4>
                        <p className="text-[11px] text-[#77736D]">
                          {r.totalTimeMinutes} mins &bull; {r.difficulty}
                        </p>
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

  // Blog catalog view
  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
            EDITORIAL JOURNAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242423] font-serif-editorial">
            Halal Food Guides &amp; Culture
          </h1>
          <p className="text-sm text-[#77736D]">
            Thoroughly researched guides on pantry essentials, food additives, weeknight dinner prep, and regional culinary traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveSlug(post.slug)}
              className="group bg-white rounded-lg border border-[#E6E1D8] overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#30302F]">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] mb-1.5">
                  {post.category} &bull; {post.readTimeMinutes} min read
                </span>

                <h3 className="text-base font-bold text-[#242423] font-serif-editorial group-hover:text-[#E97520] transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-[#77736D] leading-relaxed line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-3 border-t border-[#F3F2EE] text-[11px] text-[#8A857E] flex items-center justify-between">
                  <span>By {post.author.name}</span>
                  <span className="text-[#E97520] font-bold">Read Guide &rarr;</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
