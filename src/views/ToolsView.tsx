import React, { useState, useEffect } from "react";
import {
  Wrench,
  Scale,
  Thermometer,
  ShieldCheck,
  Search,
  Calendar,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ArrowLeftRight,
  ArrowLeft,
  CookingPot,
  ArrowRight,
  BookOpen,
  ShoppingBag,
  ExternalLink,
  Flame,
  Info,
  Layers,
  Sparkle,
  Utensils,
  PackageCheck,
  ShieldAlert,
  ChevronRight,
  Tag,
} from "lucide-react";
import { ECODES } from "../data/ecodes";
import { RECIPES } from "../data/recipes";
import { KITCHEN_EQUIPMENT } from "../data/kitchenEquipment";
import { AFFILIATE_PRODUCTS } from "../data/affiliateProducts";
import { Recipe, AffiliateProductItem } from "../types";
import { KitchenConversionTool } from "../components/KitchenConversionTool";

interface ToolsViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenAssistant: () => void;
  onNavigate?: (path: string) => void;
  initialTab?: "hub" | "equipment" | "scaler" | "converter" | "oven" | "ecodes" | "planner";
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  onSelectRecipe,
  onOpenAssistant,
  onNavigate = (_path: string) => {},
  initialTab = "hub",
}) => {
  // If the user navigates directly to a sub-utility like /tools/scaler or /equipment, honour it.
  const [activeTab, setActiveTab] = useState<
    "hub" | "equipment" | "scaler" | "converter" | "oven" | "ecodes" | "planner"
  >(initialTab === "hub" || !initialTab ? "hub" : initialTab);

  // Sync SEO meta tags and BreadcrumbList / WebPage JSON-LD
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Kitchen Tools & Pantry | Noakhali Kitchen";

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Discover practical kitchen tools, cookware, pantry essentials, and cooking equipment selected to complement authentic Halal and Bengali cooking."
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute("href") : "";
    if (canonical) {
      canonical.setAttribute("href", "https://www.noakhalikitchen.com/tools");
    }

    // Add JSON-LD BreadcrumbList and WebPage
    const scriptId = "tools-hub-schema-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.noakhalikitchen.com/tools#webpage",
          "url": "https://www.noakhalikitchen.com/tools",
          "name": "Kitchen Tools & Pantry | Noakhali Kitchen",
          "description":
            "Discover practical kitchen tools, cookware, pantry essentials, and cooking equipment selected to complement authentic Halal and Bengali cooking.",
          "isPartOf": {
            "@id": "https://www.noakhalikitchen.com/#website"
          },
          "inLanguage": "en-US"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.noakhalikitchen.com/tools#breadcrumbs",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.noakhalikitchen.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Kitchen Tools & Pantry",
              "item": "https://www.noakhalikitchen.com/tools"
            }
          ]
        }
      ]
    };
    script.text = JSON.stringify(schemaData);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) metaDesc.setAttribute("content", prevDesc);
      if (canonical && prevCanonical) canonical.setAttribute("href", prevCanonical);
      const existingScript = document.getElementById(scriptId);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  // Filter products by category
  const cookwareProducts = AFFILIATE_PRODUCTS.filter((p) => p.category === "Cookware");
  const toolProducts = AFFILIATE_PRODUCTS.filter((p) => p.category === "Kitchen Tools");
  const pantryProducts = AFFILIATE_PRODUCTS.filter((p) => p.category === "Spices & Pantry");
  const storageProducts = AFFILIATE_PRODUCTS.filter((p) => p.category === "Storage & Organization");

  // Equipment category filter (within Equipment Guide tab)
  const [equipmentCategory, setEquipmentCategory] = useState<string>("All");

  // E-Code checker state
  const [ecodeQuery, setEcodeQuery] = useState("");
  const [ecodeFilter, setEcodeFilter] = useState("all");

  // Scaler state
  const [scalerInput, setScalerInput] = useState(
    "2 cups Basmati rice\n500 g Halal chicken thighs\n1 tbsp Pure cow ghee\n0.5 tsp Turmeric powder\n1 tsp Sea salt"
  );
  const [scaleFactor, setScaleFactor] = useState<number>(2);

  // Oven Converter state
  const [ovenTempF, setOvenTempF] = useState<number>(350);

  // Meal Planner state
  const [mealPlan, setMealPlan] = useState<{ [day: string]: string }>({
    Monday: "Authentic Halal Chicken Dum Biryani",
    Tuesday: "Traditional Bengali Beef Bhuna",
    Wednesday: "Vegetable Bhuna Khichuri",
    Thursday: "Shahi Chicken Roast",
    Friday: "Royal Chingri Malai Curry",
    Saturday: "Spiced Keema Matar with Paratha",
    Sunday: "Slow-Braised Nihari with Ginger",
  });
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [tempMealName, setTempMealName] = useState<string>("");

  // E-Code filtering
  const filteredEcodes = ECODES.filter((e) => {
    const matchesSearch =
      !ecodeQuery.trim() ||
      e.code.toLowerCase().includes(ecodeQuery.toLowerCase()) ||
      e.name.toLowerCase().includes(ecodeQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(ecodeQuery.toLowerCase()) ||
      e.verificationAdvice.toLowerCase().includes(ecodeQuery.toLowerCase());

    const matchesStatus =
      ecodeFilter === "all" ||
      e.status.toLowerCase().includes(ecodeFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // Recipe Scaler logic
  const scaleRecipeText = () => {
    const lines = scalerInput.split("\n");
    return lines
      .map((line) => {
        return line.replace(/(\d+(\.\d+)?)/g, (match) => {
          const val = parseFloat(match);
          if (isNaN(val)) return match;
          const scaled = val * scaleFactor;
          return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
        });
      })
      .join("\n");
  };

  // Oven conversions
  const tempC = Math.round(((ovenTempF - 32) * 5) / 9);
  const tempFanC = Math.max(0, tempC - 20);
  const getGasMark = (f: number) => {
    if (f < 275) return "1/4";
    if (f < 300) return "1/2";
    if (f < 325) return "1";
    if (f < 350) return "2";
    if (f < 375) return "4";
    if (f < 400) return "6";
    if (f < 425) return "7";
    if (f < 450) return "8";
    return "9+";
  };

  // Smooth scroll handler for quick category navigation
  const scrollToSection = (sectionId: string) => {
    if (activeTab !== "hub") {
      setActiveTab("hub");
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Helper for recipe navigation
  const navigateToRecipe = (slug: string) => {
    const target = RECIPES.find((r) => r.slug === slug);
    if (target) {
      onSelectRecipe(target);
    } else {
      onNavigate(`/recipes/${slug}`);
    }
  };

  // Open sub-utility with router synchronization
  const handleOpenUtility = (
    tab: "equipment" | "scaler" | "converter" | "oven" | "ecodes" | "planner"
  ) => {
    setActiveTab(tab);
    onNavigate(`/tools/${tab}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Synchronize activeTab if initialTab changes from parent route
  useEffect(() => {
    if (initialTab && initialTab !== "hub") {
      setActiveTab(initialTab);
    } else if (initialTab === "hub") {
      setActiveTab("hub");
    }
  }, [initialTab]);

  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-14 min-h-screen">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-12">
        {/* SECTION A: HERO */}
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E97520]/10 border border-[#E97520]/30 text-[#E97520] text-xs font-bold tracking-widest uppercase mb-1">
            <Utensils className="w-3.5 h-3.5" />
            <span>KITCHEN TOOLS &amp; PANTRY EDITORIAL HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#242423] font-serif-editorial tracking-tight">
            Kitchen Tools &amp; Pantry
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[#E97520] pt-1">
            Cook Better. Cook With Confidence.
          </p>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-2xl mx-auto">
            Practical kitchen equipment, pantry essentials, and cooking tools selected to complement authentic Halal and Bengali cooking.
          </p>

          <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed max-w-2xl mx-auto italic">
            From the right pot for slow-cooked Nihari to the tools that make spice preparation easier, explore practical recommendations connected to the way we actually cook.
          </p>
        </header>

        {/* SECTION B: QUICK CATEGORY NAVIGATION (CARD-STYLE) */}
        <nav
          aria-label="Category Navigation"
          className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto"
        >
          {[
            { id: "section-cookware", label: "Cookware", icon: CookingPot, desc: "Dekchis & Kadais" },
            { id: "section-kitchen-tools", label: "Kitchen Tools", icon: Scale, desc: "Scales & Spoons" },
            { id: "section-spices-pantry", label: "Spices & Pantry", icon: Sparkles, desc: "Bengali Staples" },
            { id: "section-storage", label: "Storage", icon: PackageCheck, desc: "Jars & Containers" },
            { id: "section-recipe-picks", label: "Recipe Picks", icon: BookOpen, desc: "Matched to Dishes" },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToSection(cat.id)}
                className="group p-3.5 sm:p-4 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520] hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] group-hover:bg-[#E97520]/10 text-[#E97520] flex items-center justify-center mb-2 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#242423] group-hover:text-[#E97520] transition-colors">
                    {cat.label}
                  </span>
                  <span className="block text-[11px] text-[#8A857E] mt-0.5">
                    {cat.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* SECTION I: AFFILIATE DISCLOSURE (VISIBLE NEAR SHOPPING/RECOMMENDATIONS) */}
        <section
          aria-label="Affiliate Disclosure"
          className="p-4 sm:p-5 rounded-xl bg-[#FFF9F0] border border-[#F8CD78]/60 text-xs text-[#57534E] leading-relaxed flex items-start gap-3 shadow-xs"
        >
          <Info className="w-4 h-4 text-[#E97520] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-[#30302F] block font-bold uppercase tracking-wider text-[11px]">
              Affiliate Disclosure:
            </strong>
            <p>
              Some links on Noakhali Kitchen may be affiliate links. If you purchase through one of these links, we may earn a small commission at no additional cost to you. Our recommendations are based on relevance and usefulness to the recipes and cooking techniques featured on this site.
            </p>
          </div>
        </section>

        {/* TAB TOGGLE: HUB VS INTERACTIVE UTILITIES */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-lg border border-[#E6E1D8] shadow-xs">
          {[
            { id: "hub", label: "Pantry & Equipment Hub", icon: ShoppingBag },
            { id: "equipment", label: "Equipment Guide", icon: CookingPot },
            { id: "scaler", label: "Recipe Scaler", icon: Scale },
            { id: "converter", label: "Kitchen Converter", icon: ArrowLeftRight },
            { id: "oven", label: "Oven Temp Guide", icon: Thermometer },
            { id: "ecodes", label: "Halal E-Code Checker", icon: ShieldCheck },
            { id: "planner", label: "Meal Planner", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#30302F] text-white"
                    : "text-[#3F3C38] hover:bg-[#FAF9F6]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#E7A52B]" : "text-[#77736D]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* PRIMARY EDITORIAL HUB VIEW */}
        {activeTab === "hub" && (
          <div className="space-y-16">
            {/* SECTION C: COOKWARE FOR BENGALI & HALAL COOKING */}
            <section id="section-cookware" className="space-y-6 scroll-mt-20">
              <div className="border-b border-[#E6E1D8] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] block">
                  CATEGORY 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial mt-1">
                  Cookware for Bengali &amp; Halal Cooking
                </h2>
                <p className="text-sm text-[#77736D] mt-2 max-w-3xl leading-relaxed">
                  The right cookware makes a noticeable difference when working with dum cooking, slow braises, spice tempering, and high-heat techniques.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cookwareProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* SECTION D: KITCHEN TOOLS */}
            <section id="section-kitchen-tools" className="space-y-6 scroll-mt-20">
              <div className="border-b border-[#E6E1D8] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] block">
                  CATEGORY 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial mt-1">
                  Tools That Make Cooking Easier
                </h2>
                <p className="text-sm text-[#77736D] mt-2 max-w-3xl leading-relaxed">
                  Precision tools, durable grinding stones, and ergonomic kitchen implements that bring consistency, safety, and joy to daily Halal meal preparation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {toolProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* SECTION E: SPICES & PANTRY */}
            <section id="section-spices-pantry" className="space-y-6 scroll-mt-20">
              <div className="border-b border-[#E6E1D8] pb-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] block">
                      CATEGORY 03
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial mt-1">
                      Bengali Pantry Essentials
                    </h2>
                    <p className="text-sm text-[#77736D] mt-2 max-w-3xl leading-relaxed">
                      Hand-selected foundational spices and cold-pressed botanical oils that define the aromatic soul of authentic Eastern Bengal cooking.
                    </p>
                  </div>
                </div>

                {/* Important certification guidance banner */}
                <div className="mt-4 p-3 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg text-xs text-[#57534E] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D7A52] shrink-0" />
                  <span>
                    <strong>Certification Notice:</strong> Check the package labeling and manufacturer information for current certification and ingredients.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {pantryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* SECTION F: STORAGE & ORGANIZATION */}
            <section id="section-storage" className="space-y-6 scroll-mt-20">
              <div className="border-b border-[#E6E1D8] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] block">
                  CATEGORY 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial mt-1">
                  Keep Your Pantry Organized
                </h2>
                <p className="text-sm text-[#77736D] mt-2 max-w-3xl leading-relaxed">
                  Protecting volatile essential oils from sunlight, air exposure, and kitchen moisture is crucial for preserving the pungent fragrance of raw spices and rice grains.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {storageProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* SECTION G: RECIPE-SPECIFIC PICKS (KEY SECTION) */}
            <section id="section-recipe-picks" className="space-y-6 scroll-mt-20">
              <div className="border-b border-[#E6E1D8] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] block">
                  CATEGORY 05 &bull; THE CULINARY CONNECTION
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial mt-1">
                  Tools Matched to Our Recipes
                </h2>
                <p className="text-sm text-[#77736D] mt-2 max-w-3xl leading-relaxed">
                  Connect each cooking technique with the exact tools and cookware required to reproduce authentic flavors reliably at home.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. DHAKA SHAHI KACCHI BIRYANI */}
                <div className="p-6 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520]/50 transition-all shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] bg-[#FAF9F6] px-2.5 py-1 rounded border border-[#E6E1D8]">
                      FESTIVE RICE MASTERPIECE
                    </span>
                    <h3 className="text-xl font-bold text-[#242423] font-serif-editorial">
                      Dhaka Shahi Kacchi Biryani
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      Cooking raw bone-in mutton simultaneously with parboiled Basmati or Chinigura rice under tightly sealed steam pressure requires superior heat distribution.
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#30302F] block mb-2">
                        Recommended tools:
                      </span>
                      <ul className="text-xs text-[#57534E] space-y-1.5 list-disc list-inside">
                        <li>Heavy-bottomed biryani pot</li>
                        <li>Digital kitchen scale</li>
                        <li>Spice grinder</li>
                        <li>Measuring spoons</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigateToRecipe("kacchi-biryani")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer"
                    >
                      <span>Explore the Recipe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate("/guides/authentic-dhaka-shahi-kacchi-biryani")}
                      className="text-xs text-[#77736D] hover:text-[#30302F] underline cursor-pointer"
                    >
                      Read Technique Guide →
                    </button>
                  </div>
                </div>

                {/* 2. BENGALI BEEF NIHARI */}
                <div className="p-6 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520]/50 transition-all shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D7A52] bg-[#EBF5F0] px-2.5 py-1 rounded">
                      SLOW-SIMMERED SHANK STEW
                    </span>
                    <h3 className="text-xl font-bold text-[#242423] font-serif-editorial">
                      Bengali Beef Nihari
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      Extracting rich bone marrow collagen across 6 to 8 hours of gentle stewing demands exceptional moisture retention and gentle simmering control.
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#30302F] block mb-2">
                        Recommended tools:
                      </span>
                      <ul className="text-xs text-[#57534E] space-y-1.5 list-disc list-inside">
                        <li>Heavy braising pot</li>
                        <li>Fine-mesh strainer</li>
                        <li>Spice grinder</li>
                        <li>Measuring spoons</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigateToRecipe("beef-nahari")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer"
                    >
                      <span>Explore the Recipe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate("/guides/authentic-bengali-beef-nihari-guide")}
                      className="text-xs text-[#77736D] hover:text-[#30302F] underline cursor-pointer"
                    >
                      Read Nihari Guide →
                    </button>
                  </div>
                </div>

                {/* 3. BENGALI BEEF BHUNA */}
                <div className="p-6 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520]/50 transition-all shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] bg-[#FAF9F6] px-2.5 py-1 rounded border border-[#E6E1D8]">
                      CARAMELIZED ONION BRAISE
                    </span>
                    <h3 className="text-xl font-bold text-[#242423] font-serif-editorial">
                      Bengali Beef Bhuna
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      The slow frying of spices and meat in their own rendered juices ('koshano') requires high thermal mass so the pan never cools when liquids are introduced.
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#30302F] block mb-2">
                        Recommended tools:
                      </span>
                      <ul className="text-xs text-[#57534E] space-y-1.5 list-disc list-inside">
                        <li>Cast-iron kadai</li>
                        <li>Wooden spatula</li>
                        <li>Spice grinder</li>
                        <li>Heavy-bottomed pan</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigateToRecipe("bengali-beef-bhuna")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer"
                    >
                      <span>Explore the Recipe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate("/guides/bengali-beef-bhuna-guide")}
                      className="text-xs text-[#77736D] hover:text-[#30302F] underline cursor-pointer"
                    >
                      Read Bhuna Guide →
                    </button>
                  </div>
                </div>

                {/* 4. PANCH PHORON COOKING */}
                <div className="p-6 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520]/50 transition-all shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D7A52] bg-[#EBF5F0] px-2.5 py-1 rounded">
                      AROMATIC TEMPERING
                    </span>
                    <h3 className="text-xl font-bold text-[#242423] font-serif-editorial">
                      Panch Phoron Cooking
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      Sputtering whole seeds in smoking mustard oil requires instantaneous temperature monitoring to release fragrance without burning fenugreek into bitterness.
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#30302F] block mb-2">
                        Recommended tools:
                      </span>
                      <ul className="text-xs text-[#57534E] space-y-1.5 list-disc list-inside">
                        <li>Heavy-bottomed skillet</li>
                        <li>Spice storage jars</li>
                        <li>Measuring spoons</li>
                        <li>Mortar &amp; pestle</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate("/guides/bengali-panch-phoron-guide")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer"
                    >
                      <span>Read the Panch Phoron Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToRecipe("bengali-khichuri-bhuna")}
                      className="text-xs text-[#77736D] hover:text-[#30302F] underline cursor-pointer"
                    >
                      Try with Khichuri →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION H: EXISTING KITCHEN UTILITIES (PRESERVED PRECISELY) */}
            <section className="space-y-6 pt-4 border-t border-[#E6E1D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] block">
                  INTERACTIVE CALCULATORS &amp; TOOLS
                </span>
                <h2 className="text-2xl font-bold text-[#242423] font-serif-editorial mt-1">
                  More Kitchen Tools
                </h2>
                <p className="text-sm text-[#77736D] mt-1 leading-relaxed">
                  Fast, client-side culinary utilities designed for everyday kitchen accuracy and Halal diet verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenUtility("scaler")}
                  className="p-5 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520] hover:shadow-sm transition-all text-left space-y-2 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E97520]/10 text-[#E97520] flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#242423] group-hover:text-[#E97520] transition-colors">
                    Recipe Serving Scaler
                  </h3>
                  <p className="text-xs text-[#77736D] leading-relaxed">
                    Multiply or divide any ingredient list instantaneously to adapt for intimate dinners or large family feasts.
                  </p>
                  <span className="text-xs font-bold text-[#E97520] inline-flex items-center gap-1 pt-1">
                    Open Scaler <ArrowRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenUtility("ecodes")}
                  className="p-5 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520] hover:shadow-sm transition-all text-left space-y-2 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#2D7A52]/10 text-[#2D7A52] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#242423] group-hover:text-[#2D7A52] transition-colors">
                    Halal E-Code Checker
                  </h3>
                  <p className="text-xs text-[#77736D] leading-relaxed">
                    Search hundreds of European and global food additive numbers for Halal, Mushbooh, and animal-derived statuses.
                  </p>
                  <span className="text-xs font-bold text-[#2D7A52] inline-flex items-center gap-1 pt-1">
                    Check E-Codes <ArrowRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenUtility("converter")}
                  className="p-5 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520] hover:shadow-sm transition-all text-left space-y-2 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#30302F]/10 text-[#30302F] flex items-center justify-center">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#242423] group-hover:text-[#30302F] transition-colors">
                    Unit Converter
                  </h3>
                  <p className="text-xs text-[#77736D] leading-relaxed">
                    Convert between metric and imperial volume and weight units effortlessly for international recipes.
                  </p>
                  <span className="text-xs font-bold text-[#30302F] inline-flex items-center gap-1 pt-1">
                    Open Converter <ArrowRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenUtility("equipment")}
                  className="p-5 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520] hover:shadow-sm transition-all text-left space-y-2 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F8CD78]/20 text-[#D97706] flex items-center justify-center">
                    <CookingPot className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#242423] group-hover:text-[#D97706] transition-colors">
                    Kitchen Equipment Guide
                  </h3>
                  <p className="text-xs text-[#77736D] leading-relaxed">
                    Explore detailed care, seasoning, and traditional uses of degchis, sheel pata grinding stones, and dal ghutnis.
                  </p>
                  <span className="text-xs font-bold text-[#D97706] inline-flex items-center gap-1 pt-1">
                    View Equipment <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </div>
            </section>

            {/* SECTION I: AFFILIATE DISCLOSURE & EDITORIAL POLICY */}
            <section className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border border-[#F8CD78]/60 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#E97520]">
                <Info className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-[#30302F] uppercase tracking-wider font-serif-editorial">
                  Affiliate Disclosure &amp; Editorial Standards
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                <strong>Affiliate Disclosure:</strong> Some links on Noakhali Kitchen may be affiliate links. If you purchase through one of these links, we may earn a small commission at no additional cost to you. Our recommendations are based on relevance and usefulness to the recipes and cooking techniques featured on this site.
              </p>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Our culinary testing focuses exclusively on practical utility: how pots handle dum steam trapping, how stones release whole seed aromatics, and how heavy steel distributes prolonged searing heat without scorching delicate spices.
              </p>
            </section>

            {/* SECTION J: RELATED RECIPES & GUIDES (EDITORIAL CROSS-LINKING) */}
            <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E6E1D8] space-y-6 shadow-xs">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E97520] block">
                  CULINARY KNOWLEDGE BASE
                </span>
                <h2 className="text-2xl font-bold text-[#242423] font-serif-editorial mt-1">
                  Connect Equipment to Our Culinary Guides
                </h2>
                <p className="text-xs sm:text-sm text-[#77736D] mt-1.5 leading-relaxed">
                  Deepen your understanding of food science, whole spice chemistry, and traditional cooking physics with our researched culinary guides.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  {
                    title: "Authentic Dhaka Shahi Kacchi Biryani",
                    path: "/guides/authentic-dhaka-shahi-kacchi-biryani",
                    badge: "Biryani Science",
                  },
                  {
                    title: "Bengali Beef Bhuna Master Guide",
                    path: "/guides/bengali-beef-bhuna-guide",
                    badge: "Bhunai & Searing",
                  },
                  {
                    title: "Mustard Oil in Bengali Cooking",
                    path: "/guides/mustard-oil-bengali-cooking",
                    badge: "Cold-Pressed Oil",
                  },
                  {
                    title: "How to Make Perfect Beresta (Crispy Fried Onions)",
                    path: "/guides/how-to-make-perfect-beresta",
                    badge: "Heat Control",
                  },
                  {
                    title: "Bengali Radhuni Spice Guide",
                    path: "/guides/bengali-radhuni-guide",
                    badge: "Rare Botanicals",
                  },
                  {
                    title: "Bengali Panch Phoron Guide",
                    path: "/guides/bengali-panch-phoron-guide",
                    badge: "Five-Spice Chemistry",
                  },
                  {
                    title: "Authentic Bengali Beef Nihari Guide",
                    path: "/guides/authentic-bengali-beef-nihari-guide",
                    badge: "Slow Braising",
                  },
                ].map((guide) => (
                  <button
                    key={guide.path}
                    type="button"
                    onClick={() => onNavigate(guide.path)}
                    className="p-3.5 rounded-lg border border-[#E6E1D8] bg-[#FAF9F6]/50 hover:border-[#E97520] hover:bg-white transition-all text-left flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#E97520] uppercase block">
                        {guide.badge}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#242423] group-hover:text-[#E97520] transition-colors mt-0.5 line-clamp-1">
                        {guide.title}
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#77736D] group-hover:text-[#30302F] inline-flex items-center gap-1 mt-2 font-medium">
                      Read guide <ChevronRight className="w-3 h-3 text-[#E97520]" />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 1: KITCHEN EQUIPMENT GUIDE */}
        {activeTab === "equipment" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("hub");
                  onNavigate("/tools");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Kitchen Tools &amp; Pantry Hub</span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3F2EE] pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#242423] font-serif-editorial">
                  Kitchen Equipment &amp; Culinary Tools
                </h2>
                <p className="text-xs text-[#77736D] mt-1">
                  Practical guide to traditional heavy-bottom pots, granite grinding stones, cast iron, and precision kitchen essentials.
                </p>
              </div>

              {/* Equipment Category Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {["All", "Useful Kitchen Equipment", "Recipe-Specific Tools", "Kitchen Essentials"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setEquipmentCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        equipmentCategory === cat
                          ? "bg-[#E97520] text-white"
                          : "bg-[#FAF9F6] text-[#77736D] hover:bg-[#F3F2EE]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KITCHEN_EQUIPMENT.filter(
                (item) => equipmentCategory === "All" || item.category === equipmentCategory
              ).map((tool) => {
                const relatedRecipes = RECIPES.filter((r) =>
                  tool.relatedRecipeSlugs.includes(r.slug)
                );

                return (
                  <div
                    key={tool.id}
                    className="p-5 rounded-xl border border-[#E6E1D8] bg-[#FAF9F6]/60 hover:border-[#E97520]/50 transition-colors flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] bg-white px-2 py-0.5 rounded border border-[#E6E1D8]">
                          {tool.category}
                        </span>
                        {tool.badge && (
                          <span className="text-[10px] font-bold text-[#2D7A52] bg-[#EBF5F0] px-2 py-0.5 rounded">
                            {tool.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                        {tool.title}
                      </h3>

                      <p className="text-xs text-[#77736D] leading-relaxed">
                        {tool.description}
                      </p>

                      <div className="pt-2 text-xs text-[#3F3C38] leading-relaxed">
                        <strong className="text-[#30302F]">Recommended Use: </strong>
                        {tool.recommendedUse}
                      </div>

                      {tool.practicalTips.length > 0 && (
                        <ul className="text-xs text-[#77736D] space-y-1 list-disc list-inside pl-1 pt-1">
                          {tool.practicalTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Related Recipes internal links */}
                    {relatedRecipes.length > 0 && (
                      <div className="pt-3 border-t border-[#E6E1D8]/60 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A857E] block">
                          Recipes using this equipment:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {relatedRecipes.map((r) => (
                            <button
                              key={r.id}
                              onClick={() => onSelectRecipe(r)}
                              className="text-[11px] text-[#E97520] hover:text-[#d36615] bg-white px-2.5 py-1 rounded border border-[#E6E1D8] transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <span>{r.title.split("(")[0].trim()}</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: RECIPE SCALER */}
        {activeTab === "scaler" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("hub");
                  onNavigate("/tools");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Kitchen Tools &amp; Pantry Hub</span>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                Recipe Quantity Scaler
              </h2>
              <p className="text-xs text-[#77736D]">
                Multiply or divide any recipe ingredient list. Paste your ingredients below and select a multiplier.
              </p>
            </div>

            {/* Scaler Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#77736D] font-bold">Select Scale:</span>
              {[0.5, 1, 1.5, 2, 3, 4].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setScaleFactor(mult)}
                  className={`px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                    scaleFactor === mult
                      ? "bg-[#E97520] text-white"
                      : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE]"
                  }`}
                >
                  {mult}x
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#30302F] mb-1.5 uppercase tracking-wider">
                  Original Ingredients (Editable)
                </label>
                <textarea
                  rows={8}
                  value={scalerInput}
                  onChange={(e) => setScalerInput(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm font-mono bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E97520] mb-1.5 uppercase tracking-wider">
                  Scaled Result ({scaleFactor}x)
                </label>
                <textarea
                  readOnly
                  rows={8}
                  value={scaleRecipeText()}
                  className="w-full p-3 text-xs sm:text-sm font-mono bg-[#FFF9F0] border border-[#F8CD78] rounded focus:outline-none leading-relaxed text-[#30302F]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KITCHEN CONVERSION TOOL */}
        {activeTab === "converter" && (
          <div className="space-y-4">
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("hub");
                  onNavigate("/tools");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Kitchen Tools &amp; Pantry Hub</span>
              </button>
            </div>
            <KitchenConversionTool />
          </div>
        )}

        {/* TAB 4: OVEN TEMPERATURE GUIDE */}
        {activeTab === "oven" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("hub");
                  onNavigate("/tools");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Kitchen Tools &amp; Pantry Hub</span>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                Oven Temperature Converter &amp; Gas Marks
              </h2>
              <p className="text-xs text-[#77736D]">
                Convert oven settings for standard baking, fan-forced/convection, and UK Gas Marks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8]">
              <label className="text-xs font-bold text-[#30302F]">
                Slide Temperature (°F):
              </label>
              <input
                type="range"
                min="200"
                max="500"
                step="25"
                value={ovenTempF}
                onChange={(e) => setOvenTempF(parseInt(e.target.value))}
                className="flex-1 accent-[#E97520]"
              />
              <span className="text-sm font-bold text-[#30302F] w-16 text-right">
                {ovenTempF}°F
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  FAHRENHEIT
                </span>
                <span className="text-2xl font-bold text-[#30302F] font-serif-editorial">
                  {ovenTempF}°F
                </span>
              </div>
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  CELSIUS (CONVENTIONAL)
                </span>
                <span className="text-2xl font-bold text-[#30302F] font-serif-editorial">
                  {tempC}°C
                </span>
              </div>
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  FAN FORCED / CONVECTION
                </span>
                <span className="text-2xl font-bold text-[#E97520] font-serif-editorial">
                  {tempFanC}°C
                </span>
              </div>
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  GAS MARK
                </span>
                <span className="text-2xl font-bold text-[#2D7A52] font-serif-editorial">
                  Gas {getGasMark(ovenTempF)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HALAL E-CODE CHECKER */}
        {activeTab === "ecodes" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("hub");
                  onNavigate("/tools");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Kitchen Tools &amp; Pantry Hub</span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3F2EE] pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#242423] font-serif-editorial">
                  Halal Food Additive (E-Code) Directory
                </h2>
                <p className="text-xs text-[#77736D] mt-1">
                  Search food additive numbers (E-numbers) for European and global packaged foods.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {["all", "Halal", "Mushbooh", "Haram", "Check Source"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setEcodeFilter(status)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors capitalize whitespace-nowrap cursor-pointer ${
                      ecodeFilter === status
                        ? "bg-[#30302F] text-white"
                        : "bg-[#FAF9F6] text-[#77736D] hover:bg-[#F3F2EE]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#77736D] absolute left-3 top-3" />
              <input
                type="text"
                value={ecodeQuery}
                onChange={(e) => setEcodeQuery(e.target.value)}
                placeholder="Search by code (e.g. E120, E441, E471) or name (e.g. Carmine, Gelatin, Lecithin)..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none focus:border-[#30302F]"
              />
            </div>

            {/* E-Code Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEcodes.map((item) => {
                const isHalal = item.status === "Halal";
                const isHaram = item.status === "Haram";
                const isDoubtful = item.status.includes("Mushbooh");

                return (
                  <div
                    key={item.code}
                    className="p-4 rounded-lg border border-[#E6E1D8] bg-[#FAF9F6]/40 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-sm font-bold font-mono text-[#242423]">
                          {item.code}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isHalal
                              ? "bg-[#EBF5F0] text-[#2D7A52]"
                              : isHaram
                              ? "bg-[#FDE8E8] text-[#9B1C1C]"
                              : isDoubtful
                              ? "bg-[#FEF08A] text-[#854D0E]"
                              : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-[#30302F] mb-1">
                        {item.name}
                      </h4>

                      <p className="text-xs text-[#77736D] mb-2">
                        <strong>Source:</strong> {item.source}
                      </p>

                      <p className="text-xs text-[#3F3C38] leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/5 text-[11px] text-[#3F3C38]">
                      <strong>Verification Advice:</strong> {item.verificationAdvice}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: WEEKLY HALAL MEAL PLANNER */}
        {activeTab === "planner" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("hub");
                  onNavigate("/tools");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#d36615] transition-colors cursor-pointer mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Kitchen Tools &amp; Pantry Hub</span>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                Weekly Halal Family Meal Planner
              </h2>
              <p className="text-xs text-[#77736D]">
                Organize balanced dinners across the week, reduce food waste, and coordinate your shopping checklist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mealPlan).map(([day, dish]) => (
                <div
                  key={day}
                  className="p-3.5 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] flex items-center justify-between gap-2"
                >
                  {editingDay === day ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={tempMealName}
                        onChange={(e) => setTempMealName(e.target.value)}
                        className="flex-1 px-2.5 py-1 text-xs bg-white border border-[#30302F] rounded focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          if (tempMealName.trim()) {
                            setMealPlan((prev) => ({ ...prev, [day]: tempMealName.trim() }));
                          }
                          setEditingDay(null);
                        }}
                        className="px-2.5 py-1 bg-[#2D7A52] text-white text-[11px] font-bold rounded cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingDay(null)}
                        className="px-2 py-1 text-[11px] text-[#77736D] hover:text-[#30302F] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] block">
                          {day}
                        </span>
                        <h4 className="text-xs font-bold text-[#30302F] truncate">{dish}</h4>
                      </div>
                      <button
                        onClick={() => {
                          setEditingDay(day);
                          setTempMealName(dish);
                        }}
                        className="text-xs text-[#77736D] hover:text-[#30302F] underline cursor-pointer shrink-0 ml-2"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#FFF9F0] rounded-lg border border-[#F8CD78]/60 flex items-center justify-between text-xs">
              <span className="text-[#3F3C38]">
                💡 Tip: Cook once, eat twice! Batch cook Beef Bhuna or Biryani on weekends for effortless weeknight meals.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Editorial Product Card component
const ProductCard: React.FC<{ product: AffiliateProductItem }> = ({ product }) => {
  return (
    <article className="p-5 rounded-xl border border-[#E6E1D8] bg-white hover:border-[#E97520]/50 hover:shadow-sm transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E6E1D8]">
            {product.category}
          </span>
          <span className="text-[10px] text-[#8A857E] font-medium">
            Editorial Recommendation
          </span>
        </div>

        <h3 className="text-base font-bold text-[#242423] font-serif-editorial leading-snug">
          {product.name}
        </h3>

        <div className="text-xs text-[#57534E] leading-relaxed">
          <strong className="text-[#30302F] font-semibold block mb-0.5">Why it is useful:</strong>
          {product.description}
        </div>

        <div className="pt-2 text-xs text-[#3F3C38] leading-relaxed border-t border-[#F3F2EE]">
          <strong className="text-[#30302F] font-semibold">Best used for: </strong>
          <span className="text-[#57534E]">{product.bestFor}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E6E1D8]/60">
        {product.affiliateUrl ? (
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#E97520] hover:bg-[#d36615] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <span>View Product</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <div className="w-full py-2 px-3 bg-[#FAF9F6] border border-[#E6E1D8] text-[#8A857E] text-[11px] font-medium text-center rounded-lg">
            Affiliate link coming soon
          </div>
        )}
      </div>
    </article>
  );
};
