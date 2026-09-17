import { CookingGuide } from "../types";
import { IMAGES } from "./assets";

export const COOKING_GUIDES: CookingGuide[] = [
  {
    id: "guide-koshano-braising",
    slug: "technique-slow-braising-meat-bhuna",
    title: "The Art of Koshano: Mastering Slow-Braised Halal Meat Curries",
    category: "Cooking Techniques",
    excerpt:
      "Understand the science of 'koshano'—the traditional South Asian technique of patiently caramelizing aromatics, yogurt, and spices to render meat butter-soft.",
    content: `In Bengali and broader South Asian culinary terminology, "koshano" (or bhunai in Hindi/Urdu) refers to the rhythmic, patient process of searing and simmering aromatics, spices, and bone-in meat over medium-low heat until the liquids reduce, sugars caramelize, and the oil separates cleanly along the rim of the pan (known as 'tel chhara').

### Why Koshano Transforms Tough Cuts
Unlike rapid boiling which contracts meat muscle fibers and leaves beef or mutton rubbery, gentle braising at a low simmer allows collagen within connective tissues to dissolve slowly into rich gelatin.

1. **The Aroma Bloom:** Bloom whole spices (cardamom, cinnamon bark, bay leaves) in hot ghee or oil for 30 seconds before adding pureed onions.
2. **The Water-Deglaze Cycle:** As the onion paste turns golden hazelnut, add a splash of warm water or stock to prevent scorched edges while intensifying the fond.
3. **Adding Yogurt Gently:** Whisk yogurt with a pinch of cornstarch or roasted gram flour before folding it in over low heat to prevent curdling.
4. **The Final Simmer:** Cover with a tight-fitting lid and cook low-and-slow until the meat can be easily pulled apart with a fork.`,
    heroImage: IMAGES.beefBhuna,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 10, 2026",
    updatedDate: "September 12, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["bengali-chicken-curry-murgir-jhol", "bengali-beef-bhuna", "chittagong-mezbani-beef-curry"],
    faqs: [
      {
        question: "How do I prevent spices from scorching during koshano?",
        answer:
          "Always keep a cup of warm water or bone broth next to your stove. Add 1-2 tablespoons whenever the mixture begins catching on the bottom of your heavy skillet.",
      },
      {
        question: "Can I use an enamel Dutch oven instead of a traditional kadai?",
        answer:
          "Yes, heavy-bottomed Dutch ovens provide exceptional heat retention and even heat distribution, making them ideal for long braising.",
      },
    ],
  },
  {
    id: "guide-panch-phoron",
    slug: "art-of-bengali-panch-phoron-spice-blend",
    title: "Panch Phoron: The Five-Spice Blend That Defines Eastern Halal Flavors",
    category: "Spice Guides",
    excerpt:
      "A complete guide to measuring, blooming, and tempering the legendary five whole seeds: cumin, brown mustard, fenugreek, nigella, and fennel.",
    content: `Unlike ground garam masala which is often sprinkled at the end of cooking, Panch Phoron (পাঁচ ফোড়ন) is an unbroken whole spice blend traditionally bloomed in hot mustard oil or ghee at the very start of cooking (or added as a sizzling tempering tadka at the end).

### The Mathematical Ratio
Equal parts by volume:
- **1 part Cumin Seeds (Jeera):** Earthy, savory baseline.
- **1 part Nigella Seeds (Kalo Jeere):** Pungent, peppery, onion-like herbaceous aroma.
- **1 part Fennel Seeds (Mouri):** Sweet, refreshing anise notes that balance heat.
- **1 part Brown or Black Mustard Seeds (Rai):** Nutty crackle and sharpness.
- **1 part Fenugreek Seeds (Methi):** Bitter herbal complexity (reduce slightly to 0.75 part if sensitive to bitterness).

### How to Bloom Panch Phoron
Heat your oil until shimmering but not smoking. Drop in the whole seeds; within 5 to 7 seconds, they will begin to pop and release a fragrant herbal cloud. Immediately add your sliced aromatics or vegetables to cool down the oil and arrest over-browning.`,
    heroImage: IMAGES.vegBhunaKhichuri,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 5, 2026",
    updatedDate: "September 8, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["vegetable-bhuna-khichuri", "chingri-malai-curry", "noakhali-shorshe-ilish"],
  },
  {
    id: "guide-mustard-oil",
    slug: "mastering-mustard-oil-cooking",
    title: "Cooking with Cold-Pressed Mustard Oil: Smoking Points & Flavor",
    category: "Ingredient Guides",
    excerpt:
      "How to smoke and temper cold-pressed kacchi ghani mustard oil for signature pungent aroma without harsh bitterness in fish curries and bhortas.",
    content: `Cold-pressed mustard oil (Kacchi Ghani Sarson ka Tel) is the golden soul of Eastern Bengali cooking. It possesses a sharp, wasabi-like pungency caused by allyl isothiocyanate, which mellows into a buttery, sweet, and nutty depth once brought to its smoking point.

### The Smoking Technique
1. Pour mustard oil into a dry pan over medium-high heat.
2. Heat until gentle white wisps of smoke begin rising from the surface.
3. Turn off the heat or slide the pan off the burner for 60 seconds to cool slightly before adding delicate whole spices.
4. For raw mashed bhortas (aloo bhorta, eggplant bhorta), unheated cold-pressed oil is preferred for its fiery signature punch.`,
    heroImage: IMAGES.shorsheIlish,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist",
    },
    publishedDate: "August 28, 2026",
    updatedDate: "September 4, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["noakhali-shorshe-ilish", "chingri-malai-curry"],
  },
  {
    id: "guide-substitutions-cooking-wines",
    slug: "halal-substitutions-mirin-cooking-wines",
    title: "Halal Ingredient Substitutions: Cooking Wines, Mirin & Animal Rennet",
    category: "Ingredient Substitutions",
    excerpt:
      "Practical culinary swaps that replicate the acidity, umami, and sweetness of alcohol-based cooking liquids using 100% Halal pantry staples.",
    content: `When recreating international cuisines (such as French braises, Italian risottos, or Japanese teriyaki), recipes frequently call for white or red cooking wine, mirin, or sake. Here are chef-tested, alcohol-free replacements that achieve the exact balance of acid, sugar, and pectin:

### 1. White Wine Replacement
- **Formula:** 3 parts filtered chicken bone broth + 1 part fresh lemon juice or unfiltered white grape juice.
- **Why it works:** Delivers crisp acidity and savory glutamates without alcohol solvents.

### 2. Mirin Replacement
- **Formula:** 2 parts white grape juice or water + 1 part pure honey or cane sugar + 1/2 tsp rice vinegar.
- **Why it works:** Recreates the high-gloss shine and sweet glaze characteristic of Japanese teriyaki.

### 3. Red Wine Braising Replacement
- **Formula:** 100% pure unsweetened pomegranate juice or tart cherry juice + 1 tbsp tamarind pulp.
- **Why it works:** Provides intense natural tannins and deep burgundy color for slow-simmered beef stews.`,
    heroImage: IMAGES.beefBhuna,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "August 20, 2026",
    updatedDate: "September 1, 2026",
    readTimeMinutes: 7,
    relatedRecipeSlugs: ["bengali-beef-bhuna", "halal-chicken-biryani"],
  },
  {
    id: "guide-beginner-rice-water-ratio",
    slug: "beginner-guide-foolproof-basmati-rice",
    title: "Beginner Cooking: The Foolproof Fluffy Basmati Rice Ratio",
    category: "Beginner Cooking",
    excerpt:
      "Say goodbye to mushy or undercooked rice. Learn the 1:1.5 soaking, rinsing, and absorption method for distinct, aromatic long grains.",
    content: `Perfect, individual grains of basmati rice that stand tall without breaking are the badge of honor for home cooks. Follow these three cardinal rules:

1. **Rinse Thoroughly:** Wash aged basmati in cool water 3 to 4 times until the water runs completely clear, stripping away surface starch that causes clumping.
2. **Mandatory 30-Minute Soak:** Soaking allows the grain to absorb moisture to its core, ensuring even expansion during boiling.
3. **The 1:1.5 Absorption Ratio:** For 1 cup of soaked basmati, use exactly 1.5 cups of boiling water or stock, 1 teaspoon of ghee, and 1/2 teaspoon of fine salt. Cover tightly and cook on low heat for 12 minutes, then rest off heat for 10 minutes before fluffing with a fork.`,
    heroImage: IMAGES.heroBiryani,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "August 15, 2026",
    updatedDate: "August 25, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["halal-chicken-biryani", "vegetable-bhuna-khichuri"],
  },
  {
    id: "guide-kitchen-tips-garlic-ginger",
    slug: "kitchen-tips-freezer-prep-ginger-garlic",
    title: "Kitchen Tips: Batch Freezing Ginger-Garlic Paste for Quick Cooking",
    category: "Kitchen Tips",
    excerpt:
      "Save 20 minutes every evening with freshly blended ginger-garlic paste frozen into uniform portions with natural oil preservation.",
    content: `Ginger-garlic paste (ada-roshun bata) is the aromatic backbone of virtually all savory Halal curries. Preparing it fresh each evening is the single biggest bottleneck in weeknight cooking.

### The Preservation Formula
- 50% peeled fresh garlic cloves
- 50% fresh ginger (scraped with a spoon)
- 2 tablespoons neutral oil or mustard oil
- 1 teaspoon sea salt (natural preservative)

Blend smooth with minimal water. Spread into silicone ice-cube trays (1 tablespoon per well) and freeze solid. Once frozen, pop the cubes into a freezer-safe silicone pouch. Drop one or two frozen cubes directly into hot oil when starting any curry!`,
    heroImage: IMAGES.chickenChargha,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist",
    },
    publishedDate: "August 10, 2026",
    updatedDate: "August 18, 2026",
    readTimeMinutes: 4,
    relatedRecipeSlugs: ["authentic-lahori-chicken-chargha", "shahi-chicken-roast"],
  },
];
