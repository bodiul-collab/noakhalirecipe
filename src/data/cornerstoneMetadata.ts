export interface CornerstoneCulinaryMetadata {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  relatedGuides: string[];
  relatedRecipes: string[];
  relatedCulture: string;
  kitchenToolId: string;
}

export const CORNERSTONE_METADATA_LIST: CornerstoneCulinaryMetadata[] = [
  {
    slug: "bengali-beef-tehari",
    seoTitle: "Authentic Old Dhaka Beef Tehari Recipe | Noakhali Kitchen",
    seoDescription:
      "The authentic Old Dhaka Beef Tehari recipe: tender bone-in beef cubes, fragrant Chinigura rice cooked in pungent mustard oil, and whole green chilies.",
    relatedGuides: [
      "old-dhaka-beef-tehari-vs-biryani",
      "mustard-oil-bengali-cooking",
      "how-to-properly-rest-cooked-rice-dishes",
    ],
    relatedRecipes: ["kacchi-biryani", "bengali-beef-bhuna"],
    relatedCulture: "role-of-rice-in-bangladeshi-cuisine",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    slug: "chicken-biryani",
    seoTitle: "Authentic Chicken Biryani Recipe (Dum Style) | Noakhali Kitchen",
    seoDescription:
      "Flawless dum Chicken Biryani with succulent marinated chicken thighs, golden fried potatoes, 70% parboiled basmati, and fragrant saffron milk.",
    relatedGuides: [
      "how-to-make-perfect-beresta",
      "authentic-dhaka-shahi-kacchi-biryani",
      "how-to-cook-basmati-rice-for-biryani",
    ],
    relatedRecipes: ["kacchi-biryani", "bengali-beef-tehari"],
    relatedCulture: "sacred-ethics-of-halal-food-traditions",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    slug: "kacchi-biryani",
    seoTitle: "Authentic Dhaka Shahi Kacchi Biryani Recipe | Noakhali Kitchen",
    seoDescription:
      "The authentic Old Dhaka Kacchi Biryani: raw marinated bone-in meat, raw papaya tenderizer, parboiled basmati, fried potatoes, and slow dough dum.",
    relatedGuides: [
      "authentic-dhaka-shahi-kacchi-biryani",
      "how-to-make-perfect-beresta",
      "mustard-oil-bengali-cooking",
    ],
    relatedRecipes: ["bengali-beef-tehari", "chicken-biryani"],
    relatedCulture: "bangladeshi-eid-food-traditions",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    slug: "bengali-beef-bhuna",
    seoTitle: "Authentic Bengali Beef Bhuna Recipe | Noakhali Kitchen",
    seoDescription:
      "Rich, deeply caramelized Bengali Beef Bhuna (গরুর মাংস ভুনা) slow-braised with mustard oil, fried onions, roasted cumin, and garlic.",
    relatedGuides: [
      "bengali-beef-bhuna-guide",
      "mustard-oil-bengali-cooking",
      "how-to-build-a-bangladeshi-spice-base",
    ],
    relatedRecipes: ["beef-kala-bhuna", "bengali-beef-tehari"],
    relatedCulture: "chittagong-mezban-tradition-hospitality",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    slug: "bengali-chicken-roast",
    seoTitle: "Biye Barir Shahi Chicken Roast Recipe | Noakhali Kitchen",
    seoDescription:
      "Authentic Bengali wedding-style Shahi Chicken Roast (বিয়ে বাড়ির রোস্ট): tender chicken leg quarters, sweet-savory fried onion gravy, mace, kewra, and ghee.",
    relatedGuides: [
      "biye-barir-shahi-chicken-roast-guide",
      "how-to-make-perfect-beresta",
      "how-to-balance-whole-spices",
    ],
    relatedRecipes: ["chicken-rezala", "chicken-biryani"],
    relatedCulture: "bangladeshi-eid-food-traditions",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    slug: "beef-kala-bhuna",
    seoTitle: "Authentic Chittagong Beef Kala Bhuna Recipe | Noakhali Kitchen",
    seoDescription:
      "The authentic Chittagong Beef Kala Bhuna recipe: caramelized tender black beef cubes braised with mustard oil, radhuni spice, and crisp garlic.",
    relatedGuides: [
      "chittagong-beef-kala-bhuna-guide",
      "bengali-radhuni-guide",
      "mustard-oil-bengali-cooking",
    ],
    relatedRecipes: ["bengali-beef-bhuna", "bengali-beef-tehari"],
    relatedCulture: "chittagong-mezban-tradition-hospitality",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    slug: "chicken-rezala",
    seoTitle: "Authentic Bengali Shahi Chicken Rezala Recipe | Noakhali Kitchen",
    seoDescription:
      "Authentic Kolkata and Dhaka style Shahi Chicken Rezala (চিকেন রেজালা): bone-in chicken simmered in a silky white yogurt, cashew, and poppy seed gravy.",
    relatedGuides: [
      "biye-barir-shahi-chicken-roast-guide",
      "how-to-make-perfect-beresta",
      "how-to-balance-whole-spices",
    ],
    relatedRecipes: ["bengali-chicken-roast", "chicken-biryani"],
    relatedCulture: "bangladeshi-spice-blends-and-aromatics",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    slug: "authentic-nihari",
    seoTitle: "Authentic Beef Nihari Recipe (Slow Cooked) | Noakhali Kitchen",
    seoDescription:
      "Slow-cooked royal Beef Nihari: tender beef shanks, velvety bone marrow broth, aromatic Nihari masala, and fresh ginger-lemon garnish.",
    relatedGuides: [
      "authentic-royal-beef-nihari-guide",
      "bengali-beef-bhuna-guide",
      "how-to-tenderize-beef-for-slow-cooking",
    ],
    relatedRecipes: ["bengali-beef-bhuna", "beef-kala-bhuna"],
    relatedCulture: "sacred-ethics-of-halal-food-traditions",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    slug: "chicken-karahi",
    seoTitle: "Authentic Chicken Karahi Recipe (Restaurant Style) | Noakhali Kitchen",
    seoDescription:
      "High-heat Pakistani roadside dhaba Chicken Karahi: bone-in chicken, fresh tomatoes, ginger matchsticks, and black pepper with zero onions.",
    relatedGuides: [
      "how-to-make-restaurant-style-chicken-karahi",
      "how-to-balance-whole-spices",
    ],
    relatedRecipes: ["bengali-chicken-roast", "authentic-chicken-shawarma"],
    relatedCulture: "sacred-ethics-of-halal-food-traditions",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    slug: "authentic-chicken-shawarma",
    seoTitle: "Authentic Chicken Shawarma Recipe (Street Style) | Noakhali Kitchen",
    seoDescription:
      "Street-style Middle Eastern Chicken Shawarma: yogurt, lemon, and warm Levant spices marinated chicken thighs, crispy charred edges, and authentic garlic Toum.",
    relatedGuides: [
      "how-to-build-homemade-shawarma-spice",
      "how-to-balance-whole-spices",
    ],
    relatedRecipes: ["chicken-karahi", "hummus"],
    relatedCulture: "middle-eastern-shawarma-culinary-culture",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
];

export const CORNERSTONE_METADATA_MAP = new Map<string, CornerstoneCulinaryMetadata>(
  CORNERSTONE_METADATA_LIST.map((meta) => [meta.slug, meta])
);
