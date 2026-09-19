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
  {
    id: "guide-bangladeshi-spice-base",
    slug: "how-to-build-a-bangladeshi-spice-base",
    title: "How to Build an Authentic Bangladeshi Spice Base",
    category: "Spice Guides",
    excerpt:
      "Master the fundamental aromatics of Bengali curries: the precise sequence of blooming whole spices, caramelizing onion paste, and tempering ginger-garlic.",
    content: `A true Bangladeshi curry does not rely on generic curry powder. Instead, it is built on a four-tier foundation of fresh whole aromatics and wet pastes:

### Tier 1: Blooming Whole Garam Masala (Khoro Moshla)
Heat your cooking fat (pure mustard oil or ghee) until shimmering. Drop in green cardamom pods (cracked open), Ceylon cinnamon sticks, whole cloves, and bay leaves (tejpatta). Sauté for 20-30 seconds until they swell and perfume the oil.

### Tier 2: The Onion Dual-Method
Bengali cuisine uses two distinct onion preparations:
1. **Thinly sliced onions** fried slowly until translucent and sweet.
2. **Finely ground onion paste (peyaj bata)** cooked until the raw sulfur compounds dissipate and the paste turns pale hazelnut.

### Tier 3: Ginger & Garlic (Ada-Roshun Bata)
Add equal parts fresh ginger and garlic paste. Sauté over medium heat for 90 seconds. To prevent scorching, keep a small bowl of warm water next to your pan and deglaze with 1 tablespoon whenever the paste begins to cling to the bottom.

### Tier 4: Ground Spices Slurry
Rather than tossing dry ground spices directly into hot oil (which burns turmeric and chili in seconds), mix your ground cumin, coriander, turmeric, and Kashmiri chili with 3 tablespoons of warm water to form a smooth paste before sliding it into the aromatics. Cook until oil cleanly beads along the perimeter ("tel chhara").`,
    heroImage: IMAGES.beefBhuna,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 15, 2026",
    updatedDate: "September 18, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["bengali-beef-bhuna", "bengali-beef-tehari", "chicken-rezala"],
  },
  {
    id: "guide-brown-onions-beresta",
    slug: "how-to-properly-brown-onions-beresta",
    title: "How to Properly Brown Onions: The Golden Beresta Masterclass",
    category: "Cooking Techniques",
    excerpt:
      "Crispy, deeply golden fried onions (beresta) are the crown jewel of biryanis, roasts, and tehari. Avoid soggy or scorched onions with this reliable method.",
    content: `Beresta (fried onions) provides sweetness, rich umami depth, and decorative elegance. Uneven slicing or rushed high-heat frying results in burnt, bitter onions that ruin an entire pot of biryani.

### The 4 Rules for Flawless Beresta
1. **Uniform Paper-Thin Slicing:** Use a sharp mandoline or chef's knife to slice onions crosswise into 1.5mm rings. If some slices are thick and others paper-thin, the thin ones will burn while thick ones stay soggy.
2. **Moisture Evaporation:** Spread sliced onions across paper towels for 15 minutes before frying to dry the exterior.
3. **Medium-Low, Consistent Heat:** Submerge the onions in ample warm oil or ghee. Fry over medium heat, stirring continuously in circular motions to ensure equal heat exposure.
4. **The Carryover Cooking Factor:** Remove the onions from the oil when they are golden honey (not dark brown!). They will continue to darken by two shades on the plate. Spread immediately onto wire racks or parchment paper so steam escapes, locking in shatter-crisp crunch.`,
    heroImage: IMAGES.chickenRoast,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 14, 2026",
    updatedDate: "September 18, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["bengali-chicken-roast", "kacchi-biryani", "chicken-biryani"],
  },
  {
    id: "guide-basmati-rice-biryani",
    slug: "how-to-cook-basmati-rice-for-biryani",
    title: "How to Cook Basmati Rice for Biryani: The 70% Parboil Rule",
    category: "Cooking Techniques",
    excerpt:
      "Achieve feather-light, elongated grains that remain distinct without breaking during sealed dum cooking.",
    content: `Biryani rice must never be fully cooked in boiling water. Because the rice will spend 25-35 minutes steaming over hot meat and gravy during the final 'dum' stage, it must be parboiled to exactly 70% to 75% doneness.

### The Step-by-Step Science
1. **Choose Aged Extra-Long Grain Basmati:** Aged basmati has reduced moisture content, allowing the grain to expand longitudinally up to twice its raw length without splitting horizontally.
2. **Wash Until Crystal Clear:** Rinse 4-5 times gently without crushing the grains to remove loose surface amylose. Soak in room temperature water for exactly 30 minutes.
3. **Abundant Rolling Boil:** Boil at least 5 times more water than rice. Add whole green cardamom, bay leaves, 1 teaspoon of oil, and generous salt (the water should taste seasoned like light soup).
4. **The 5-Minute Window:** Add soaked drained rice to the rolling boil. At 4.5 to 5 minutes, test a grain: the exterior should be pliable and translucent, but the center core should feel firm and break into three pieces when pressed between your thumb and forefinger.
5. **Rapid Strain & Fan:** Immediately dump into a wide colander and spread over a tray to release steam, preventing overcooking.`,
    heroImage: IMAGES.heroBiryani,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 12, 2026",
    updatedDate: "September 17, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["chicken-biryani", "kacchi-biryani", "bengali-beef-tehari"],
  },
  {
    id: "guide-layer-kacchi-biryani",
    slug: "how-to-layer-kacchi-biryani",
    title: "How to Layer Kacchi Biryani: Dough Sealing & Dum Mastery",
    category: "Cooking Techniques",
    excerpt:
      "Raw marinated mutton or beef, parboiled rice, fried potatoes, and saffron milk: the definitive Old Dhaka architectural layering method.",
    content: `Unlike Pakki Biryani where cooked meat and cooked rice are combined, authentic Kacchi Biryani begins with raw, marinated meat at the bottom of the pot. The meat and rice cook together entirely via trapped internal steam ('dum').

### Layering Blueprint
1. **Bottom Layer (Raw Meat Bed):** Press the heavily marinated bone-in meat flat into the bottom of a heavy copper or aluminum handi. The marinade juices provide the liquid foundation for steam.
2. **Potato Buffer:** Wedge par-fried whole halved golden potatoes between the meat pieces.
3. **First Rice Tier (60% Cooked):** Add the first half of parboiled rice directly over the raw meat. This lower layer absorbs the rich meat fond.
4. **Second Rice Tier (75% Cooked):** Add the remaining rice on top, which will finish cooking in pure rising steam.
5. **Garnish Canopy:** Drizzle warm saffron milk, kewra water, melted ghee, fried onions (beresta), and tucked alubukhara (dried sour prunes).
6. **The Dough Hermetic Seal (Dum):** Roll whole wheat dough into a snake, press along the rim of the pot, and press the lid down firmly. Cook on high heat for 10 minutes to generate internal steam, then transfer over a heavy cast-iron tawa on low heat for 50-60 minutes.`,
    heroImage: IMAGES.kacchiBiryani,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 11, 2026",
    updatedDate: "September 17, 2026",
    readTimeMinutes: 7,
    relatedRecipeSlugs: ["kacchi-biryani", "bengali-beef-tehari", "chicken-biryani"],
  },
  {
    id: "guide-prevent-rice-mushy",
    slug: "how-to-prevent-rice-from-becoming-mushy",
    title: "How to Prevent Rice from Becoming Mushy: Starch & Water Ratios",
    category: "Beginner Cooking",
    excerpt:
      "Avoid sticky, gummy, or clumpy rice dishes. Understand the critical balance of starch rinsing, boiling liquid volume, and steam dissipation.",
    content: `Mushy rice is caused by two fundamental mistakes: excess loose surface starch that gelatinizes into glue, and too much cooking water that bursts the delicate grain cells.

### The Fix Checklist
- **Never Skip the Cold Rinse:** Agitate raw rice gently in cold water until the water is transparent. Rinsing strips away amylose dust created during grain milling.
- **Respect the 1:1.5 Volumetric Rule for Basmati:** For soaked basmati, never exceed 1.5 cups of liquid per 1 cup of dry rice when using the absorption method.
- **Never Stir Boiling Rice:** Stirring vigorously breaks fragile grains and releases internal starch into the cooking broth, creating wallpaper paste.
- **The Off-Heat Rest:** When cooking time finishes, turn off the burner and leave the lid sealed for 10 minutes. This allows moisture to equalize throughout the pot. Fluff gently with a wide wooden spatula or silicone rice paddle from the outer edge inward.`,
    heroImage: IMAGES.vegBhunaKhichuri,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist",
    },
    publishedDate: "September 9, 2026",
    updatedDate: "September 15, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["bengali-beef-tehari", "chicken-biryani", "vegetable-bhuna-khichuri"],
  },
  {
    id: "guide-tenderize-beef-slow-cooking",
    slug: "how-to-tenderize-beef-for-slow-cooking",
    title: "How to Tenderize Beef for Slow Cooking: Collagen Science & Acid Cures",
    category: "Cooking Techniques",
    excerpt:
      "Transform tough stewing beef, chuck roast, and shank into melt-in-your-mouth tender curries using natural meat tenderizers and patient braising.",
    content: `Tough cuts of beef (such as chuck, shank, or brisket) are packed with intramuscular collagen. When cooked too fast over high dry heat, muscle fibers contract and turn tough like leather.

### The 3 Secrets to Velvet-Soft Halal Beef
1. **Raw Papaya Paste (The Papain Enzyme):** In dishes like Beef Kala Bhuna and Kacchi Biryani, green raw papaya paste (skin included) acts as a powerful natural proteolytic tenderizer that breaks down tough connective fibers without altering flavor. Use 1 tablespoon per pound of meat for 2 hours.
2. **Yogurt & Lime Lactic Acid:** Lactic acid in plain whole milk yogurt gently softens external muscle bundles and helps spices penetrate deeply.
3. **The 160°F–180°F Gelatin Window:** Collagen begins converting into succulent gelatin between 160°F and 180°F (71°C to 82°C). Maintain a gentle, lazy bubble rather than a violent rolling boil. Over 2 to 3 hours, tough connective tissue dissolves into rich, velvety mouthfeel.`,
    heroImage: IMAGES.beefKalaBhuna,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 8, 2026",
    updatedDate: "September 14, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["beef-kala-bhuna", "bengali-beef-bhuna", "authentic-nihari"],
  },
  {
    id: "guide-balance-whole-spices",
    slug: "how-to-balance-whole-spices",
    title: "How to Balance Whole Spices: Bloom Timing & Fragrance Layering",
    category: "Spice Guides",
    excerpt:
      "Avoid overpowering your curries with too much clove or harsh cinnamon. Learn the flavor hierarchy of whole South Asian spices.",
    content: `South Asian cooking balances spices across warm, sweet, pungent, and bitter flavor profiles:

### The Potency Hierarchy
- **Aggressive Spices (Use Sparingly):** Cloves (long) and Black Cardamom (badi elaichi). For 1 kg of meat, 3-4 cloves and 1 black cardamom pod provide ample camphor notes. Adding more overwhelms the palate.
- **Sweet & Aromatic Spices (The Harmony Makers):** Green cardamom (chhoti elaichi), Ceylon cinnamon bark (dalchini), and mace (javitri). These provide elegance and floral sweetness in wedding-style roasts and biryanis.
- **Earthy Spices (The Foundation):** Whole cumin (jeera), coriander seeds, and bay leaves (tejpatta).
- **Tempering Rule:** Add dense wood bark (cinnamon) and pods first. Add delicate seeds (cumin, fennel) 15 seconds later so they toast golden without charring black.`,
    heroImage: IMAGES.chickenRoast,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist",
    },
    publishedDate: "September 7, 2026",
    updatedDate: "September 13, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["bengali-chicken-roast", "chicken-rezala", "authentic-nihari"],
  },
  {
    id: "guide-restaurant-chicken-karahi",
    slug: "how-to-make-restaurant-style-chicken-karahi",
    title: "How to Make Restaurant-Style Chicken Karahi: High-Heat Wok Mastery",
    category: "Cooking Techniques",
    excerpt:
      "Pakistani road-side dhaba chicken karahi cooked over high roaring flame with fresh tomatoes, ginger matchsticks, and zero onion filler.",
    content: `Authentic Peshawar and Lahore-style Chicken Karahi is unique in South Asian cuisine because it uses **zero onions**. Its thick, clings-to-the-bone masala is derived entirely from fresh vine-ripened tomatoes, fresh ginger-garlic paste, and green chilies.

### Key Karahi Techniques
1. **Bone-In Small Cuts:** Cut chicken into small 16-18 piece curry cuts. Small pieces maximize surface searing in the round-bottom karahi.
2. **The High-Heat Oil Sear:** Sauté the chicken in ample neutral oil or ghee with 1 teaspoon of salt until the exterior turns golden and skin tightens.
3. **The Tomato Blanket:** Halve ripe red tomatoes and place them cut-side down directly over the sizzling chicken. Cover with a lid for 8 minutes; the steam loosens the tomato skins so they can be easily plucked off with culinary tongs.
4. **The Bhunai Sear:** Crank the heat to maximum and crush the softened tomatoes with the back of a ladle. Sauté vigorously until the tomato juices reduce into a glistening, clinging glaze and the oil separates completely.
5. **Fresh Finishing:** Finish with julienned ginger, chopped fresh cilantro, and freshly crushed coarse black pepper off the heat.`,
    heroImage: IMAGES.chickenKarahi,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 6, 2026",
    updatedDate: "September 12, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["chicken-karahi", "authentic-chicken-shawarma", "bengali-chicken-roast"],
  },
  {
    id: "guide-homemade-shawarma-spice",
    slug: "how-to-build-homemade-shawarma-spice",
    title: "How to Build Homemade Shawarma Spice: Warm Levant Aromatics",
    category: "Spice Guides",
    excerpt:
      "Craft the iconic street-style Middle Eastern shawarma seasoning blend combining cumin, coriander, allspice, sumac, and cardamom.",
    content: `Authentic street-style Middle Eastern shawarma has a distinctive, deeply warming aroma that balances savory spices with citrusy tartness:

### The Levant Ratio (Makes 1/2 Cup Blend)
- **2 tbsp Ground Cumin:** Earthy foundation.
- **2 tbsp Ground Coriander:** Herbal, citrusy background note.
- **1 tbsp Garlic Powder:** Savory baseline.
- **1 tbsp Smoked or Sweet Paprika:** Vibrant color and gentle smokiness.
- **1 tbsp Ground Allspice (Pimento):** The signature Middle Eastern secret note combining clove, nutmeg, and cinnamon warmth.
- **1 tsp Ground Cardamom:** Bright, floral punch.
- **1 tsp Ground Turmeric:** Golden hue.
- **1/2 tsp Ground Cinnamon:** Subtle warmth.
- **1 tbsp Ground Sumac:** Tart, lemony berry tang (essential for authentic flavor).

### Marination Formula
For every 1 lb of thinly sliced boneless chicken thighs: Combine 2 tablespoons of this spice blend, 3 tablespoons Greek yogurt, 2 tablespoons extra virgin olive oil, 2 tablespoons fresh lemon juice, and 4 minced garlic cloves. Marinate for at least 2 hours before roasting or pan-searing.`,
    heroImage: IMAGES.authenticChickenShawarma,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist",
    },
    publishedDate: "September 5, 2026",
    updatedDate: "September 11, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["authentic-chicken-shawarma", "chicken-karahi", "hummus"],
  },
  {
    id: "guide-properly-rest-rice-dishes",
    slug: "how-to-properly-rest-cooked-rice-dishes",
    title: "How to Properly Rest Cooked Rice Dishes: Trapping Steam & Grain Separation",
    category: "Cooking Techniques",
    excerpt:
      "Why uncovering or digging into biryani, tehari, or polao the moment the heat is turned off ruins texture, and how a 15-minute rest creates culinary perfection.",
    content: `The most common heartbreak in home cooking happens right at the finish line: lifting the lid off a hot pot of biryani or tehari and digging in immediately with a spoon. The rushing steam instantly collapses fragile starch jackets, resulting in mushy, clumping rice.

### The Physics of the 15-Minute Off-Heat Rest
1. **Internal Moisture Redistribution:** When heat is applied from below, water vapor collects in the upper chamber of the pot. When heat is turned off, resting allows this moisture to settle uniformly throughout the bottom, middle, and top rice tiers.
2. **Retrogradation & Starch Firming:** As the temperature drops slightly from boiling point, the outer amylose layer of each grain firms up ('retrogradation'), transforming from delicate gelatin into a smooth, non-sticky outer sheath.
3. **The Uncovering Technique:** After a 15-minute sealed rest, unseal the pot. Allow excess billowing steam to escape for 2 minutes.
4. **The Outer-Inward Fluff:** Use a flat, thin-edged wooden spatula or rice paddle. Slice gently into the outer circumference and turn the grains over from bottom to top in sweeping motions. Never chop or mash down into the center.`,
    heroImage: IMAGES.bengaliBeefTehari,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 4, 2026",
    updatedDate: "September 10, 2026",
    readTimeMinutes: 5,
    relatedRecipeSlugs: ["bengali-beef-tehari", "kacchi-biryani", "chicken-biryani"],
  },
];
