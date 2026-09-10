import { BlogPost } from "../types";
import { IMAGES } from "./assets";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-to-build-a-halal-pantry",
    title: "How to Build an Authentic Halal Pantry: 15 Foundational Ingredients",
    category: "Pantry Essentials",
    excerpt:
      "A practical checklist of essential whole spices, pure cooking fats, aromatic rices, and verified seasoning staples that make Halal home cooking effortless.",
    content: `Setting up a kitchen rooted in Halal traditions is about celebrating pure, wholesome, and ethically sourced ingredients. When your pantry is stocked with foundational elements, creating a fragrant weeknight chicken curry or an aromatic pot of biryani takes less than an hour.

### 1. The Core Aromatics & Pure Fats
Authentic regional cooking begins with high-smoke point oils and rich natural fats.
- **Pure Cow Ghee:** Look for 100% clarified butter with no artificial yellow dyes or chemical preservatives. Ghee imparts an unmatched nutty richness to rice pilafs and slow braises.
- **Cold-Pressed Mustard Oil (Sarson ka Tel):** Indispensable in Bengali kitchens, raw mustard oil adds pungent depth to fish curries, bhunas, and mashed vegetable bhortas.
- **Virgin Coconut Oil:** Ideal for coastal prawn and fish dishes.

### 2. Whole Spices Over Pre-Ground Powders
Whole spices maintain their essential volatile oils for up to two years:
- **Green Cardamom (Elachi) & Black Cardamom (Boro Elachi):** Essential for sweet fragrant curries and hearty meat dishes.
- **Ceylon Cinnamon & Cassia Bark:** Thick woody bark adds deep warmth to biryanis and stocks.
- **Cloves (Lobongo) & Whole Mace (Javitri):** The aromatic pillars of shahi banquet gravies.
- **Shahi Jeera (Caraway Seeds):** Smaller and sweeter than standard cumin, giving pilafs royal flair.

### 3. Aromatic Grain Staples
- **Aged Sella or 1121 Basmati:** Aged grains cook up fluffy, separate, and fragrant without clumping.
- **Kalijeera / Chinigura Rice:** Often described as baby basmati, this tiny heirloom grain is the crown jewel of Bengali khichuri and wedding polao.

### 4. Halal Verification When Sourcing
Always scrutinize pre-mixed spice blends. Commercial mixes occasionally add beef or chicken bouillon powder that may contain non-halal animal extracts, or anti-caking agents derived from animal fatty acids. Sticking to single-origin pure spices guarantees peace of mind.`,
    heroImage: IMAGES.heroBiryani,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director, Noakhali Kitchen",
    },
    publishedDate: "August 18, 2026",
    updatedDate: "September 3, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["halal-chicken-biryani", "bengali-beef-bhuna"],
    faqs: [
      {
        question: "Does ghee need to be refrigerated?",
        answer:
          "Pure cow ghee is free from moisture and milk solids, meaning it can be safely stored at room temperature in an airtight glass jar for up to 9 months.",
      },
    ],
  },
  {
    id: "blog-2",
    slug: "understanding-gelatin-on-food-labels",
    title: "Understanding Gelatin & Hidden Enzymes on Food Labels: A Muslim Consumer Guide",
    category: "Halal Guides",
    excerpt:
      "Demystifying confusing additives, animal rennet in cheeses, emulsifiers (E471), and how to read processed food labels with confidence.",
    content: `For Muslim consumers navigating modern supermarket aisles, deciphering ingredient labels can be confusing. Processed snacks, yogurts, marshmallows, and vitamin capsules frequently utilize animal-derived additives. Here is our practical, research-backed guide to identifying and verifying key ingredients.

### What is Gelatin?
Gelatin is a water-soluble protein obtained by boiling the skin, tendons, ligaments, and bones of animals. In standard commercial products in North America and Europe, the majority of unlabeled gelatin is derived from pork skin due to lower industrial processing costs.

- **Pork Gelatin:** Strictly prohibited (Haram).
- **Non-Zabiha Beef Gelatin:** Considered impermissible or doubtful by mainstream Islamic bodies unless certified Halal.
- **Halal-Certified Bovine Gelatin:** Completely permissible and sourced from Halal-slaughtered cattle.
- **Fish Gelatin:** Permissible (Halal) and widely used in kosher/halal confectionery.

### Plant-Based Gelatin Alternatives
When developing home recipes for mousses, pannacotta, or fruit jellies, look for:
1. **Agar-Agar (Kanten):** Derived from red sea algae, agar-agar sets firmer than gelatin and is completely vegan and Halal.
2. **Pectin:** Extracted from citrus peels and apples, perfect for jams and fruit pastes.
3. **Carrageenan:** Sourced from red seaweed, frequently used in dairy puddings.

### Common Additives to Watch (E-Numbers)
- **E471 (Mono- and diglycerides of fatty acids):** Can be either plant or animal-based. Look for "suitable for vegetarians" or a Halal symbol.
- **Rennet:** Used to coagulate milk into cheese. Look for "microbial rennet" or "vegetarian enzymes" rather than traditional calf or animal stomach rennet.
- **Vanilla Extract:** Standard vanilla extract contains 35%+ ethyl alcohol. Opt for alcohol-free vanilla flavor or whole vanilla beans.

### Our Recommendation
When in doubt, prioritize products carrying recognized Halal certification marks from established inspection authorities.`,
    heroImage: IMAGES.beefBhuna,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist & Halal Standards Researcher",
    },
    publishedDate: "August 24, 2026",
    updatedDate: "September 1, 2026",
    readTimeMinutes: 7,
    relatedRecipeSlugs: ["shahi-chicken-roast"],
    faqs: [
      {
        question: "Is carmine (E120) Halal?",
        answer:
          "Carmine (also labeled cochineal extract) is a red food dye extracted from insects. Most Islamic jurisprudential councils consider insect-derived dyes impermissible (Haram), while synthetic red food colorings or beet juice extract are permissible.",
      },
    ],
  },
  {
    id: "blog-3",
    slug: "10-weeknight-halal-meals-for-busy-families",
    title: "10 Fast Weeknight Halal Meals That Bring Comfort in Under 35 Minutes",
    category: "Meal Planning",
    excerpt:
      "Nutritious, high-protein family dinners made with Halal chicken, eggs, lentils, and quick-seared seafood without spending hours at the stove.",
    content: `After a demanding workday or school run, cooking an elaborate feast is often unrealistic. Yet serving a comforting, wholesome Halal meal should never feel like a chore.

### Quick Weeknight Favorites
1. **Royal Chingri Malai Curry:** With pre-peeled prawns and canned coconut cream, this luxurious dish comes together in just 20 minutes on the stovetop.
2. **Spiced Keema Matar:** Ground Halal beef or chicken cooks in 15 minutes with sweet peas, cumin, and fresh ginger.
3. **Turmeric Ghee Fried Eggs & Kalijeera Rice:** The Bengali equivalent of cacio e pepe—simple, deeply satisfying, and ready in 12 minutes.
4. **Sheet Pan Spiced Chicken & Vegetables:** Toss Halal chicken thighs with warm cumin, smoked paprika, olive oil, and bell peppers, then roast at 400°F for 25 minutes.

### Golden Rules for Quick Dinners
- Keep frozen minced ginger and garlic cubes in the freezer.
- Par-boil lentils or freeze pre-measured portions of cooked chickpeas.
- Store homemade fried onions (beresta) in an airtight container for instant richness.`,
    heroImage: IMAGES.chingriMalai,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 2, 2026",
    updatedDate: "September 4, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["chingri-malai-curry", "vegetable-bhuna-khichuri"],
  },
];
