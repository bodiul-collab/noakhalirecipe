export interface RecipeAmazonLink {
  title: string;
  url: string;
  badge?: string;
  description?: string;
  category?: string;
}

export const RECIPE_AFFILIATE_LINKS: Record<string, RecipeAmazonLink[]> = {
  // 1. KACCHI BIRYANI
  // Links: https://link.amazon/B0dJQFe7y, https://link.amazon/B0ctRqtlA, https://link.amazon/B0eAHJWBM
  "kacchi-biryani": [
    {
      title: "Heavy-Gauge Biryani Dum Dekchi Pot with Tight Lid",
      url: "https://link.amazon/B0dJQFe7y",
      badge: "Essential Cookware",
      description: "Thick-bottomed vessel engineered for sealed dough dum steam cooking without scorching.",
      category: "Cookware",
    },
    {
      title: "Royal Aged Long-Grain Basmati Rice & Raw Spices",
      url: "https://link.amazon/B0ctRqtlA",
      badge: "Key Ingredient",
      description: "Extra-long grain aromatic basmati that stays distinct and fluffy under dum pressure.",
      category: "Pantry & Ingredients",
    },
    {
      title: "Pure Saffron Threads & Shahi Biryani Whole Spices",
      url: "https://link.amazon/B0eAHJWBM",
      badge: "Shahi Aromatic",
      description: "Premium saffron, green cardamom, mace, and alubukhara for authentic royal fragrance.",
      category: "Spices & Pantry",
    },
  ],

  // 2. NIHARI (Beef Nahari / Authentic Nihari)
  // Links: https://link.amazon/B02PDZRqZ, https://link.amazon/B04BoEuGP, https://link.amazon/B09o6legI
  "beef-nahari": [
    {
      title: "Heavy-Bottomed Dutch Oven & Braising Stockpot",
      url: "https://link.amazon/B02PDZRqZ",
      badge: "Slow-Cooking Gear",
      description: "Heavy cast iron/tri-ply pot designed for 6+ hours of gentle bone marrow braising.",
      category: "Cookware",
    },
    {
      title: "Authentic Nihari Whole Spice Potli Blend",
      url: "https://link.amazon/B04BoEuGP",
      badge: "Mughlai Spices",
      description: "Royal combination of fennel seeds (saunf), dry ginger (sonth), pipali, and star anise.",
      category: "Spices & Seasoning",
    },
    {
      title: "Fine-Mesh Stainless Steel Broth & Spice Strainer",
      url: "https://link.amazon/B09o6legI",
      badge: "Precision Tool",
      description: "Essential for skimming tari oil and straining whole spices for a velvety, lump-free gravy.",
      category: "Kitchen Tools",
    },
  ],
  "authentic-nihari": [
    {
      title: "Heavy-Bottomed Dutch Oven & Braising Stockpot",
      url: "https://link.amazon/B02PDZRqZ",
      badge: "Slow-Cooking Gear",
      description: "Heavy cast iron/tri-ply pot designed for 6+ hours of gentle bone marrow braising.",
      category: "Cookware",
    },
    {
      title: "Authentic Nihari Whole Spice Potli Blend",
      url: "https://link.amazon/B04BoEuGP",
      badge: "Mughlai Spices",
      description: "Royal combination of fennel seeds (saunf), dry ginger (sonth), pipali, and star anise.",
      category: "Spices & Seasoning",
    },
    {
      title: "Fine-Mesh Stainless Steel Broth & Spice Strainer",
      url: "https://link.amazon/B09o6legI",
      badge: "Precision Tool",
      description: "Essential for skimming tari oil and straining whole spices for a velvety, lump-free gravy.",
      category: "Kitchen Tools",
    },
  ],

  // 3. BEEF BHUNA
  // Links: https://link.amazon/B0eXqql3i, https://link.amazon/B06cIPaBw
  "bengali-beef-bhuna": [
    {
      title: "Pre-Seasoned Heavy Cast-Iron Kadai / Karahi",
      url: "https://link.amazon/B0eXqql3i",
      badge: "Essential Bhunai Gear",
      description: "High thermal mass wok-style kadai for intense searing and deep caramelization (koshano).",
      category: "Cookware",
    },
    {
      title: "Pure Cold-Pressed Mustard Oil & Bhuna Spice Pantry",
      url: "https://link.amazon/B06cIPaBw",
      badge: "Heritage Oil & Spices",
      description: "Authentic pungent kachi ghani mustard oil, roasted cumin, and whole Bengali aromatics.",
      category: "Pantry & Ingredients",
    },
  ],

  // 4. SHAHI CHICKEN ROAST
  // Links: https://link.amazon/B02mn1COR, https://link.amazon/B0eAHJWBM, https://link.amazon/B0eXqql3i
  "bengali-chicken-roast": [
    {
      title: "Pure Cow Ghee & Shahi Wedding Roast Gravy Essentials",
      url: "https://link.amazon/B02mn1COR",
      badge: "Royal Richness",
      description: "Grass-fed golden cow ghee, cashew paste, and kewra water for signature biye bari richness.",
      category: "Pantry & Ingredients",
    },
    {
      title: "Saffron Threads, Mace (Javitri) & Whole Cardamom",
      url: "https://link.amazon/B0eAHJWBM",
      badge: "Shahi Aromatics",
      description: "Aromatic floral spices that give festive Bengali chicken roast its legendary fragrance.",
      category: "Spices & Seasoning",
    },
    {
      title: "Deep Cast-Iron Kadai & Poultry Searing Skillet",
      url: "https://link.amazon/B0eXqql3i",
      badge: "Searing Cookware",
      description: "Maintains optimal searing temperature without tearing delicate poultry skin.",
      category: "Cookware",
    },
  ],
};

// Map aliases to ensure all variations of recipe slugs point to the exact verified affiliate links
const ALIAS_MAP: Record<string, string> = {
  // Kacchi Biryani aliases
  "kacchi": "kacchi-biryani",
  "dhaka-kacchi": "kacchi-biryani",
  "authentic-dhaka-shahi-kacchi-biryani": "kacchi-biryani",
  "shahi-kacchi-biryani": "kacchi-biryani",
  "bengali-kacchi-biryani": "kacchi-biryani",
  "kacchi-biriyani": "kacchi-biryani",
  "rec-dhaka-shahi-kacchi-biryani": "kacchi-biryani",

  // Nihari aliases
  "nihari": "beef-nahari",
  "nahari": "beef-nahari",
  "beef-nihari": "beef-nahari",
  "shahi-beef-nihari": "beef-nahari",
  "gorur-nihari": "beef-nahari",
  "pakistani-beef-nihari": "beef-nahari",
  "karachi-beef-nihari": "beef-nahari",
  "delhi-nihari": "beef-nahari",
  "mughlai-shahi-noli-nihari": "beef-nahari",

  // Beef Bhuna aliases
  "beef-bhuna": "bengali-beef-bhuna",
  "gorur-bhuna": "bengali-beef-bhuna",
  "bangladeshi-beef-bhuna": "bengali-beef-bhuna",
  "beef-kala-bhuna": "bengali-beef-bhuna",
  "kala-bhuna": "bengali-beef-bhuna",

  // Shahi Chicken Roast aliases
  "shahi-chicken-roast": "bengali-chicken-roast",
  "dhaka-shahi-chicken-roast": "bengali-chicken-roast",
  "bengali-shahi-chicken-roast": "bengali-chicken-roast",
  "shahi-roast": "bengali-chicken-roast",
  "chicken-roast": "bengali-chicken-roast",
  "biye-bari-chicken-roast": "bengali-chicken-roast",
  "biye-barir-shahi-chicken-roast": "bengali-chicken-roast",
};

export const getRecipeAffiliateLinks = (slug: string): RecipeAmazonLink[] => {
  if (!slug) return [];
  const cleanSlug = slug.toLowerCase().trim();
  if (RECIPE_AFFILIATE_LINKS[cleanSlug]) {
    return RECIPE_AFFILIATE_LINKS[cleanSlug];
  }
  const targetKey = ALIAS_MAP[cleanSlug];
  if (targetKey && RECIPE_AFFILIATE_LINKS[targetKey]) {
    return RECIPE_AFFILIATE_LINKS[targetKey];
  }
  return [];
};
