import { Recipe } from "../types";
import { IMAGES } from "./assets";
import { CORNERSTONE_BLUEPRINTS } from "./productionEngine";

const kacchiBlueprint = CORNERSTONE_BLUEPRINTS.find((b) => b.recipeSlug === "kacchi-biryani")!;
const kalaBhunaBlueprint = CORNERSTONE_BLUEPRINTS.find((b) => b.recipeSlug === "beef-kala-bhuna")!;
const rezalaBlueprint = CORNERSTONE_BLUEPRINTS.find((b) => b.recipeSlug === "chicken-rezala")!;

export const CORNERSTONE_ADDITIONAL_RECIPES: Recipe[] = [
  {
    id: "rec-dhaka-shahi-kacchi-biryani",
    slug: "kacchi-biryani",
    title: "Dhaka Shahi Kacchi Biryani (পুরান ঢাকার আসল কাচ্চি বিরিয়ানি)",
    category: "Halal Beef",
    categorySlug: "halal-beef",
    cuisine: "Old Dhaka Royal Mughlai",
    description:
      "The undisputed crown of Old Dhaka festive dining: raw marinated Halal beef or mutton tenderized with green papaya paste, layered beneath aromatic parboiled basmati rice, saffron milk, fried potatoes, and alubukhara, sealed with wheat dough and slow-cooked in pure rising steam.",
    introStory:
      "In the culinary hierarchy of Bengal, Kacchi Biryani (কাচ্চি বিরিয়ানি) stands alone at the pinnacle. The word 'Kacchi' translates to 'raw'—referencing the profound cooking method where heavily marinated raw bone-in meat is layered at the bottom of a heavy handi, covered with two tiers of parboiled basmati rice, hermetically sealed with whole-wheat atta dough, and cooked entirely through trapped internal steam (dum).\n\nThe true alchemy of Old Dhaka Kacchi relies on raw green papaya paste, whose natural papain enzyme tenderizes the meat during marination until it melts into buttery shreds. Large halved potatoes, par-fried in ghee until golden, absorb the rich rendered juices from below, while the crown of rice is perfumed with saffron-infused milk, kewra water, sweet-and-sour alubukhara (dried prunes), and crispy fried onions (beresta). Served at weddings, Eid feasts, and historic Nazira Bazar dining halls alongside chilled Shahi Borhani, this is culinary craftsmanship at its most majestic.",
    heroImage: IMAGES.kacchiBiryani,
    prepTimeMinutes: 40,
    cookTimeMinutes: 75,
    totalTimeMinutes: 115,
    servings: 8,
    difficulty: "Advanced",
    calories: 680,
    rating: 5.0,
    reviewCount: 218,
    isTrending: true,
    isFeatured: true,
    isRegionalHeritage: true,
    whySpecial:
      "Unlike cooked-meat biryanis, authentic Kacchi layers raw marinated meat with parboiled rice, sealing the vessel with whole wheat dough so the meat and grains cook simultaneously in pressurized, rising steam.",
    halalNotes:
      "100% Halal verified. Prepared exclusively with zabiha hand-slaughtered beef cuts, pure single-origin cow ghee, and certified additive-free spices. Completely free of synthetic tenderizers or artificial colors.",
    potentialCautionNotes:
      "Green papaya paste must be fresh and made with green peel intact; its papain enzyme is essential for raw meat dum cooking. Do not substitute with chemical meat tenderizers.",
    cookingTips: [
      "Use aged extra-long grain basmati and parboil in two distinct stages: bottom half at 60% doneness, top half at 75% doneness.",
      "Always place a heavy flat cast-iron tawa under the handi after the first 10 minutes of high heat to prevent scorching.",
      "Allow a full 15-minute undisturbed rest off the heat before slicing the dough seal to let trapped moisture settle.",
      "Fluff with a flat wooden rice paddle from the edges inward; never chop downwards into the delicate grains.",
    ],
    commonMistakes: [
      "Parboiling the rice too long; rice boiled past 75% will turn to mush during 60 minutes of sealed dum.",
      "Skipping the raw papaya paste; without this natural enzyme, raw meat will remain tough and chewy.",
      "Lifting the lid during dum cooking; breaking the dough seal prematurely releases steam pressure and halts cooking.",
    ],
    seoTitle: kacchiBlueprint.seoTitle,
    seoDescription: kacchiBlueprint.seoMetaDescription,
    relatedRecipeSlugs: kacchiBlueprint.relatedRecipes,
    relatedGuideSlugs: kacchiBlueprint.relatedGuides,
    relatedCultureSlug: kacchiBlueprint.relatedCulture,
    relatedKitchenToolId: kacchiBlueprint.kitchenToolId,
    videoChapters: kacchiBlueprint.chapters,
    videoProduction: kacchiBlueprint.productionData,
    ingredients: [
      { amount: "3 lbs / 1.4 kg", unit: "bone-in cuts", name: "Halal beef or mutton shank/ribs", notes: "large wedding-style cuts with good marbling" },
      { amount: "4", unit: "tbsp", name: "Raw green papaya paste", notes: "ground with peel intact for natural papain tenderization" },
      { amount: "4", unit: "cups", name: "Aged extra-long grain Basmati rice", notes: "washed 4 times and soaked for 30 minutes" },
      { amount: "4", unit: "large", name: "Golden potatoes", notes: "peeled, halved, and tossed with pinch of saffron and salt" },
      { amount: "1", unit: "cup", name: "Whole milk plain yogurt (Tok Doi)", notes: "whisked smoothly with water strained" },
      { amount: "1/2", unit: "cup", name: "Pure cow ghee", notes: "divided for frying potatoes and dum drizzle" },
      { amount: "1.5", unit: "cups", name: "Crispy fried onions (Beresta)", notes: "golden honey crunch" },
      { amount: "2.5", unit: "tbsp", name: "Fresh ginger paste" },
      { amount: "2", unit: "tbsp", name: "Fresh garlic paste" },
      { amount: "1", unit: "tsp", name: "Ground mace (Javitri)" },
      { amount: "1/2", unit: "tsp", name: "Ground nutmeg (Jaiphal)" },
      { amount: "1", unit: "tsp", name: "White pepper powder (Shada Gol Morich)" },
      { amount: "1", unit: "tbsp", name: "Shahi garam masala powder", notes: "freshly ground green cardamom, cinnamon, cloves" },
      { amount: "8-10", unit: "whole", name: "Alubukhara (dried sour prunes)", notes: "essential for authentic Dhaka sweet-sour bursts" },
      { amount: "1/2", unit: "tsp", name: "Saffron strands", notes: "bloomed in 1/2 cup warm whole milk" },
      { amount: "2", unit: "tbsp", name: "Kewra water & rose water blend" },
      { amount: "8-10", unit: "whole", name: "Green chilies", notes: "stems intact" },
      { amount: "2", unit: "cups", name: "Atta flour (whole wheat)", notes: "kneaded with water into a pliable rope for sealing" },
    ],
    substitutions: [
      { original: "Raw papaya paste", substitute: "Unpasteurized pineapple juice (2 tbsp)", notes: "Contains bromelain; marinate max 2 hours to avoid turning meat mushy." },
      { original: "Beef cuts", substitute: "Halal goat or lamb bone-in shoulder", notes: "Traditional Old Dhaka mutton kacchi follows identical timing." },
    ],
    instructions: [
      {
        step: 1,
        title: "Marinate the Raw Meat (The Secret Foundation)",
        instruction:
          "In a large bowl, combine the beef or mutton cuts with raw green papaya paste, whisked yogurt, ginger paste, garlic paste, white pepper, ground mace, nutmeg, shahi garam masala, half the beresta, and 1.5 tablespoons of salt. Massage thoroughly into the meat for 5 minutes. Cover and refrigerate for at least 4 to 6 hours (or overnight) to allow the papain enzyme to break down tough fibers.",
      },
      {
        step: 2,
        title: "Par-Fry Golden Potatoes",
        instruction:
          "Heat 3 tablespoons of ghee in a pan. Add the halved potatoes seasoned with a pinch of saffron and salt. Fry on medium heat for 6-8 minutes until golden crust forms on the outside (the inside will finish cooking in steam). Remove and set aside.",
      },
      {
        step: 3,
        title: "Parboil Basmati Rice in Two Tiers",
        instruction:
          "In a large stockpot, bring 12 cups of water to a rolling boil with green cardamom, cinnamon, cloves, bay leaves, 2 tablespoons of salt, and 1 teaspoon of oil. Add drained basmati rice. At 4 minutes (60% cooked, firm core), scoop out half the rice with a slotted skimmer directly over the meat bed. Let remaining rice boil for 1 more minute (75% cooked), then drain completely.",
      },
      {
        step: 4,
        title: "Assemble the Handi Layers",
        instruction:
          "Press the marinated raw meat firmly into the bottom of a heavy-bottomed brass handi or Dutch oven. Wedge the golden potatoes evenly between the meat cuts. Scatter half the alubukhara. Layer the 60% parboiled rice directly over the meat. Top with the 75% parboiled rice.",
      },
      {
        step: 5,
        title: "Crown with Saffron Milk & Aromatics",
        instruction:
          "Drizzle the saffron-infused warm milk, remaining melted ghee, and kewra water over the rice in decorative streaks. Tock in whole green chilies, remaining alubukhara, and a generous canopy of golden fried onion beresta.",
      },
      {
        step: 6,
        title: "Dough Seal & The Two-Stage Dum",
        instruction:
          "Roll whole wheat dough into a 1-inch rope and press firmly along the rim of the pot. Press the lid tightly onto the dough to create a hermetic steam seal. Place over medium-high flame for 10-12 minutes until steam builds inside and the dough crust begins to firm. Immediately transfer the handi onto a heavy flat cast-iron tawa over the lowest flame setting. Cook on dum for 60 minutes undisturbed.",
      },
      {
        step: 7,
        title: "The Rest & Royal Reveal",
        instruction:
          "Turn off heat. Let the sealed handi rest undisturbed for 15 minutes. Using a chef's knife, slice through the hardened dough seal and lift the lid to release the billow of fragrant saffron steam. Using a wide flat spatula, gently turn over the rice from the bottom, bringing up glistening succulent meat and golden potatoes alongside fluffy, separate grains.",
      },
    ],
    chefNotes: [
      "The dough seal traps 100% of internal moisture, raising boiling temperature inside the handi and tenderizing raw meat without boiling it in excess water.",
      "The two-tier rice boiling technique guarantees that the rice nearest the meat gravy doesn't turn mushy while the top layer cooks fully in rising steam.",
    ],
    nutrition: {
      calories: 680,
      proteinGrams: 42,
      carbsGrams: 74,
      fatGrams: 24,
      fiberGrams: 4,
      sodiumMg: 720,
    },
    storageInstructions: "Keeps refrigerated in an airtight container for up to 3 days. Reheat by steaming over gentle boiling water.",
    freezingInstructions: "Freeze in portioned containers for up to 1 month. Thaw in the refrigerator overnight before gentle reheating.",
    servingSuggestions: [
      "Serve on a celebratory brass or porcelain platter with chilled Shahi Borhani.",
      "Accompany with fresh cucumber, red onion, and carrot kachumber salad and lime wedges.",
      "Pair with halved hard-boiled eggs and sweet Shahi Jorda dessert.",
    ],
    faqs: [
      { question: "Can I make Kacchi Biryani with beef instead of mutton?", answer: "Yes! Beef shank, chuck, or short rib cuts work magnificently when marinated with raw papaya paste for 4-6 hours." },
      { question: "Why is raw papaya paste mandatory?", answer: "The active enzyme papain breaks down collagen in raw meat while it steams, ensuring tender, melt-in-your-mouth texture." },
    ],
    author: { name: "Chef Tariq Rahman", role: "Culinary Director & Heritage Specialist" },
    updatedDate: "September 18, 2026",
    tags: ["Kacchi Biryani", "কাচ্চি বিরিয়ানি", "Dhaka Kacchi", "Raw Meat Dum", "Halal Beef", "Old Dhaka", "Mughlai"],
  },
  {
    id: "rec-chittagong-beef-kala-bhuna",
    slug: "beef-kala-bhuna",
    title: "Authentic Chittagong Beef Kala Bhuna (চট্টগ্রামের ঐতিহ্যবাহী কালা ভুনা)",
    category: "Halal Beef",
    categorySlug: "halal-beef",
    cuisine: "Chittagong Heritage",
    description:
      "The iconic black beef delicacy of Chittagong: tender bone-in beef cubes caramelized to deep obsidian luster through rhythmic, patient braising in pure mustard oil, wild celery seed (radhuni), black cardamom, and a finishing garlic-chili baghar tempering.",
    introStory:
      "Originating in the port city of Chittagong, Beef Kala Bhuna (গরুর কালা ভুনা) is one of the most celebrated meat masterworks in South Asian culinary history. The name literally translates to 'black braised beef'—yet authentic Kala Bhuna is never burnt, blackened with bitter charcoal, nor masked with artificial food coloring or soy sauce.\n\nIts dark mahogany sheen is the miraculous result of the Maillard reaction pushed to culinary perfection: hours of patient, rhythmic pan-braising ('koshano') in cold-pressed mustard oil, where meat sugars and deeply browned onion pastes caramelize onto the beef fibers like a glistening glaze. Scented with indigenous Chittagonian radhuni (wild celery seed), whole black cardamom, and toasted cumin, the dish concludes with a dramatic sizzling 'baghar'—smoking mustard oil tempered with whole roasted garlic cloves, dried red chilies, and onion rings poured over the sizzling meat. The result is a fork-tender, concentrated beef morsel with crispy caramelized edges and succulent, juicy interior.",
    heroImage: IMAGES.beefKalaBhuna,
    prepTimeMinutes: 25,
    cookTimeMinutes: 90,
    totalTimeMinutes: 115,
    servings: 6,
    difficulty: "Medium",
    calories: 540,
    rating: 4.99,
    reviewCount: 196,
    isTrending: true,
    isFeatured: true,
    isRegionalHeritage: true,
    whySpecial:
      "Its signature obsidian black luster is achieved entirely through patient, rhythmic braising in pure mustard oil and radhuni spice—never burnt, soy sauce, or artificial food colorings.",
    halalNotes:
      "100% Halal certified. Made exclusively with zabiha hand-slaughtered beef chuck and shank, pure Ghani cold-pressed mustard oil, and freshly ground whole spices.",
    potentialCautionNotes:
      "Radhuni (wild celery seed) is the signature aromatic soul of Chittagong cooking. If unavailable, use equal parts ajwain and crushed celery seeds.",
    cookingTips: [
      "Use heavy cast iron or thick-bottomed carbon steel cookware; high thermal mass prevents temperature drop during rhythmic braising.",
      "Deglaze exclusively with boiling water in small 2-tablespoon increments to prevent thermal shock and keep meat tender.",
      "Never rush heat to high; the dark color develops gradually through medium-low caramelization over 45-60 minutes.",
      "The finishing baghar (smoking garlic and dried chili tempering) must be added while sizzling hot.",
    ],
    commonMistakes: [
      "Cooking over high heat and burning the spices, which creates a bitter char rather than sweet caramelized glaze.",
      "Adding cold water during braising, which contracts the muscle fibers and makes the beef tough and stringy.",
      "Using seed oils instead of cold-pressed mustard oil, losing the sharp regional terroir of Chittagong.",
    ],
    seoTitle: kalaBhunaBlueprint.seoTitle,
    seoDescription: kalaBhunaBlueprint.seoMetaDescription,
    relatedRecipeSlugs: kalaBhunaBlueprint.relatedRecipes,
    relatedGuideSlugs: kalaBhunaBlueprint.relatedGuides,
    relatedCultureSlug: kalaBhunaBlueprint.relatedCulture,
    relatedKitchenToolId: kalaBhunaBlueprint.kitchenToolId,
    videoChapters: kalaBhunaBlueprint.chapters,
    videoProduction: kalaBhunaBlueprint.productionData,
    ingredients: [
      { amount: "2.5 lbs / 1.1 kg", unit: "cubes", name: "Halal beef chuck or shank", notes: "cut into 1.5-inch pieces with some fat for braising" },
      { amount: "1/2", unit: "cup", name: "Cold-pressed mustard oil", notes: "divided for braising and final baghar tempering" },
      { amount: "2", unit: "cups", name: "Red onions", notes: "thinly sliced into rings" },
      { amount: "1.5", unit: "tbsp", name: "Fresh ginger paste" },
      { amount: "1.5", unit: "tbsp", name: "Fresh garlic paste" },
      { amount: "1", unit: "tsp", name: "Radhuni powder (wild celery seed)", notes: "toasted and freshly ground; the Chittagong signature" },
      { amount: "1", unit: "tbsp", name: "Roasted cumin powder (Bhuna Jeera)" },
      { amount: "1", unit: "tbsp", name: "Coriander powder" },
      { amount: "1", unit: "tsp", name: "Kashmiri red chili powder" },
      { amount: "1/2", unit: "tsp", name: "Turmeric powder" },
      { amount: "4", unit: "pods", name: "Green cardamom" },
      { amount: "2", unit: "pods", name: "Black cardamom (Badi Elaichi)" },
      { amount: "2", unit: "sticks", name: "Cinnamon bark" },
      { amount: "4", unit: "whole", name: "Cloves" },
      { amount: "2", unit: "whole", name: "Bay leaves (Tejpatta)" },
      { amount: "8", unit: "cloves", name: "Whole garlic", notes: "peeled for final tempering" },
      { amount: "4-5", unit: "whole", name: "Dried red chilies", notes: "for final baghar" },
      { amount: "6", unit: "whole", name: "Fresh green chilies", notes: "slit lengthwise" },
    ],
    substitutions: [
      { original: "Radhuni", substitute: "1/2 tsp Ajwain (carom) + 1/2 tsp crushed celery seeds", notes: "Mimics the herbal, pungent wild celery note." },
      { original: "Beef chuck", substitute: "Halal bone-in goat or lamb shoulder", notes: "Mutton Kala Bhuna follows the identical braising technique." },
    ],
    instructions: [
      {
        step: 1,
        title: "Marinate the Beef",
        instruction:
          "In a bowl, combine beef cubes with half the mustard oil, ginger paste, garlic paste, turmeric, coriander, chili powder, half the radhuni, half the cumin, and 1.5 teaspoons of salt. Mix thoroughly and let rest for 30 minutes.",
      },
      {
        step: 2,
        title: "Stage 1: Slow Simmer in Natural Juices",
        instruction:
          "Transfer the marinated beef and whole spices (cardamom, cinnamon, cloves, bay leaves) to a heavy cast-iron kadai or Dutch oven. Cover and cook over medium-low heat for 35-40 minutes without adding water. The meat will release abundant juices; allow it to gently simmer until fork-tender and juices reduce.",
      },
      {
        step: 3,
        title: "Stage 2: The Reductive Oil Frying (Koshano)",
        instruction:
          "Uncover the pot and raise heat to medium. Stir continuously as the remaining gravy evaporates and the beef begins frying directly in its rendered fat and mustard oil. The color will transform from light brown to deep amber. Whenever the fond sticks to the pan, splash 2 tablespoons of boiling water and scrape the fond back onto the meat.",
      },
      {
        step: 4,
        title: "Caramelization to Obsidian Sheen",
        instruction:
          "Continue gentle stirring and braising for 20-25 minutes. Add remaining roasted cumin and radhuni. Watch as the exterior of each beef cube develops a shiny, deeply caramelized black crust while the interior stays tender.",
      },
      {
        step: 5,
        title: "Stage 3: The Sizzling Garlic Baghar",
        instruction:
          "In a separate small pan, heat 3 tablespoons of mustard oil until smoking hot. Add whole peeled garlic cloves, dried red chilies, and sliced onion rings. Fry until garlic is golden and fragrant. Pour this smoking tempering immediately over the black beef with a dramatic sizzle.",
      },
      {
        step: 6,
        title: "Green Chili Finish & Rest",
        instruction:
          "Drop in fresh slit green chilies and toss for 2 minutes to incorporate the baghar aromatics. Turn off heat, cover for 5 minutes, and serve hot.",
      },
    ],
    chefNotes: [
      "The black color is pure caramelized onion sugars, concentrated meat proteins, and roasted spices—never char or soot.",
      "Using a wooden spatula ensures you can continuously scrape the caramelized brown bits off the bottom of the iron vessel without scratching.",
    ],
    nutrition: {
      calories: 540,
      proteinGrams: 36,
      carbsGrams: 14,
      fatGrams: 38,
      fiberGrams: 3,
      sodiumMg: 640,
    },
    storageInstructions: "Keeps remarkably well in the refrigerator for up to 5 days; flavor deepens on day two. Reheat gently in a skillet.",
    freezingInstructions: "Freeze in airtight containers for up to 2 months. Thaw in the fridge and reheat in a hot skillet with 1 tbsp water.",
    servingSuggestions: [
      "Serve with hot handmade luchi, flaky porota, or steamed aromatic Chinigura rice.",
      "Pair with thinly sliced raw red onions, fresh lime wedges, and a bowl of thick masoor dal.",
    ],
    faqs: [
      { question: "Why is Kala Bhuna black?", answer: "The black color comes from prolonged pan caramelization in mustard oil and fried onions, not artificial color or burnt meat." },
      { question: "What does radhuni taste like?", answer: "Radhuni resembles parsley and celery with a sharp, pungent mustard-like edge that cuts through rich beef fats." },
    ],
    author: { name: "Chef Tariq Rahman", role: "Chittagong Culinary Heritage Specialist" },
    updatedDate: "September 18, 2026",
    tags: ["Beef Kala Bhuna", "কালা ভুনা", "Chittagong Kala Bhuna", "Black Beef", "Radhuni", "Halal Beef", "Bangladeshi Beef"],
  },
  {
    id: "rec-shahi-chicken-rezala",
    slug: "chicken-rezala",
    title: "Shahi Chicken Rezala (শাহী চিকেন রেজালা / White Mughlai Chicken)",
    category: "Halal Chicken",
    categorySlug: "halal-chicken",
    cuisine: "Bengali Mughlai Royal",
    description:
      "A pristine royal Mughlai curry: bone-in tender chicken pieces simmered in a silky, ivory-white sauce of whipped yogurt, soaked cashew and poppy seed paste, green cardamom, mace, whole dried red chilies, and puffed lotus seeds (makhana).",
    introStory:
      "When the exiled Nawab of Awadh, Wajid Ali Shah, settled in Metiabruz in Bengal in 1856, his royal khansamas introduced the Bengali palate to the ethereal world of Awadhi Mughlai curries. Chief among these aristocratic creations is Chicken Rezala (চিকেন রেজালা)—a dish defined by its pure ivory-white silk gravy and complete rejection of yellow turmeric, dark cumin, and red chili powders.\n\nAuthentic Rezala relies on culinary restraint and aromatic balance: bone-in chicken thighs and drumsticks are simmered in a velvet emulsion of whipped whole-milk yogurt, soaked cashews, and blanched white poppy seeds (posto bata). Floating across this white surface are bright red dried Kashmiri chilies that impart warm perfume without breaking the sauce, delicate green cardamoms, blades of mace, and crunchy puffed fox nuts (makhana). Finished with pure cow ghee and a subtle whisper of kewra and meetha attar, it is one of the most sophisticated curries ever composed.",
    heroImage: IMAGES.chickenRezala,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    totalTimeMinutes: 60,
    servings: 4,
    difficulty: "Medium",
    calories: 480,
    rating: 4.98,
    reviewCount: 164,
    isTrending: true,
    isFeatured: true,
    isRegionalHeritage: true,
    whySpecial:
      "An ivory-white royal Mughlai sauce crafted with whipped yogurt, cashew-poppy seed paste, and white pepper—deliberately cooked without turmeric or red chili powder.",
    halalNotes:
      "100% Halal certified. Prepared exclusively with zabiha hand-slaughtered bone-in chicken, pure cow ghee, and certified organic whole spices and nuts.",
    potentialCautionNotes:
      "Maintain a gentle simmer throughout cooking; aggressive boiling will curdle the delicate yogurt and cashew emulsion.",
    cookingTips: [
      "Strain the ginger and garlic juices through a fine sieve if you want an ultra-smooth, restaurant-grade white sauce.",
      "Soak cashews and white poppy seeds in warm water for 30 minutes before blending to achieve a mirror-smooth silk consistency.",
      "Add whole dried red chilies with stems intact; they float beautifully on top and perfume the oil without dyeing the white gravy red.",
      "Add makhana (fox nuts) in the last 10 minutes so they absorb the sauce while retaining a pleasant chewy bite.",
    ],
    commonMistakes: [
      "Adding turmeric or colored chili powder; authentic Rezala must remain pristine ivory-white.",
      "Pouring cold yogurt directly into hot ghee, which causes the dairy solids to separate and curdle.",
      "Over-reducing the sauce; Rezala should have a fluid, silky pourable consistency that coats the back of a spoon.",
    ],
    seoTitle: rezalaBlueprint.seoTitle,
    seoDescription: rezalaBlueprint.seoMetaDescription,
    relatedRecipeSlugs: rezalaBlueprint.relatedRecipes,
    relatedGuideSlugs: rezalaBlueprint.relatedGuides,
    relatedCultureSlug: rezalaBlueprint.relatedCulture,
    relatedKitchenToolId: rezalaBlueprint.kitchenToolId,
    videoChapters: rezalaBlueprint.chapters,
    videoProduction: rezalaBlueprint.productionData,
    ingredients: [
      { amount: "2 lbs / 900g", unit: "bone-in cuts", name: "Halal chicken thighs and drumsticks", notes: "scored diagonally for deep flavor penetration" },
      { amount: "1.5", unit: "cups", name: "Plain whole milk yogurt", notes: "whisked until completely smooth and room temperature" },
      { amount: "1/4", unit: "cup", name: "Raw cashews", notes: "soaked in warm water" },
      { amount: "2", unit: "tbsp", name: "White poppy seeds (Posto)", notes: "soaked and blended with cashews into a silky paste" },
      { amount: "3", unit: "tbsp", name: "Pure cow ghee", notes: "for rich royal fragrance" },
      { amount: "2", unit: "tbsp", name: "Neutral vegetable oil" },
      { amount: "1", unit: "cup", name: "White onion paste (Peyaj Bata)", notes: "boiled onions pureed smooth" },
      { amount: "1.5", unit: "tbsp", name: "Ginger juice / fine ginger paste" },
      { amount: "1.5", unit: "tbsp", name: "Garlic juice / fine garlic paste" },
      { amount: "1", unit: "tsp", name: "White pepper powder (Shada Gol Morich)", notes: "provides warmth without color" },
      { amount: "1/2", unit: "tsp", name: "Ground mace (Javitri)" },
      { amount: "1/4", unit: "tsp", name: "Ground nutmeg (Jaiphal)" },
      { amount: "6", unit: "pods", name: "Green cardamom", notes: "lightly bruised" },
      { amount: "2", unit: "sticks", name: "Ceylon cinnamon bark" },
      { amount: "4", unit: "whole", name: "Cloves" },
      { amount: "2", unit: "whole", name: "Bay leaves (Tejpatta)" },
      { amount: "6-8", unit: "whole", name: "Dried Kashmiri red chilies", notes: "whole, stems intact for visual contrast" },
      { amount: "1/2", unit: "cup", name: "Puffed lotus seeds (Makhana / Fox nuts)", notes: "lightly toasted in ghee" },
      { amount: "1", unit: "tbsp", name: "Kewra water", notes: "screwpine floral essence" },
      { amount: "1", unit: "drop", name: "Meetha Attar (sweet edible perfume)", notes: "optional royal Awadhi touch" },
    ],
    substitutions: [
      { original: "White poppy seeds (Posto)", substitute: "Blanched almond flour or melon seeds (char maghaz)", notes: "Maintains the thick ivory body of the gravy." },
      { original: "Makhana", substitute: "Omit or use blanched whole almonds", notes: "Traditional garnish for regal texture." },
    ],
    instructions: [
      {
        step: 1,
        title: "Marinate the Chicken",
        instruction:
          "In a bowl, toss the scored chicken pieces with whipped yogurt, ginger juice, garlic juice, white pepper, and 1 teaspoon of salt. Allow to marinate at room temperature for 30 minutes.",
      },
      {
        step: 2,
        title: "Prepare the Silk Cashew-Posto Paste",
        instruction:
          "Drain soaked cashews and white poppy seeds. Transfer to a high-speed grinder with 3 tablespoons of water and blend until a mirror-smooth, creamy white paste forms without graininess.",
      },
      {
        step: 3,
        title: "Temper Whole Spices & Sauté Onion Paste",
        instruction:
          "Heat ghee and oil in a deep pot over medium heat. Add green cardamoms, cinnamon bark, cloves, bay leaves, and whole dried red chilies. Let them swell and release fragrance for 30 seconds. Add the boiled white onion paste and sauté for 4-5 minutes until aromatic without letting it turn brown.",
      },
      {
        step: 4,
        title: "Simmer Chicken in Ivory Sauce",
        instruction:
          "Slide the marinated chicken and all yogurt juices into the pot. Stir gently to coat. Cover and cook over medium-low heat for 15 minutes, stirring occasionally. The chicken will release its natural moisture into the yogurt.",
      },
      {
        step: 5,
        title: "Incorporate Cashew-Posto Silk & Spices",
        instruction:
          "Stir in the cashew-poppy seed paste, ground mace, nutmeg, and 1/2 cup of warm water. Simmer on low heat for 12-15 minutes until chicken is fork-tender and delicate drops of golden ghee separate along the surface.",
      },
      {
        step: 6,
        title: "Makhana & Royal Floral Finish",
        instruction:
          "Fold in the toasted makhana (fox nuts). Sprinkle kewra water and 1 drop of meetha attar. Cover and simmer for 3 minutes so the makhana plumps up. Rest for 5 minutes off the heat and serve.",
      },
    ],
    chefNotes: [
      "Using white onion paste (boiling onions before pureeing) prevents raw onion pungency while keeping the sauce snow-white.",
      "The whole red chilies are intended for visual drama and aroma; do not tear or break them if you wish to keep heat mild.",
    ],
    nutrition: {
      calories: 480,
      proteinGrams: 38,
      carbsGrams: 16,
      fatGrams: 30,
      fiberGrams: 3,
      sodiumMg: 590,
    },
    storageInstructions: "Refrigerate in a covered container for up to 3 days. Reheat gently on low heat with 2 tablespoons of warm milk.",
    freezingInstructions: "Not recommended for freezing due to the high yogurt content which can separate upon thawing.",
    servingSuggestions: [
      "Serve with paper-thin Rumali Roti, soft Tandoori Naan, or Shahi Kalijira Ghee Polao.",
      "Garnish with a drizzle of warm ghee, whole dried red chilies, and a pinch of saffron strands.",
    ],
    faqs: [
      { question: "Why is Rezala white unlike other curries?", answer: "Rezala is an Awadhi-Bengali court dish made with yogurt, cashews, poppy seeds, and white pepper, deliberately omitting turmeric and chili powder." },
      { question: "What is Makhana?", answer: "Makhana are puffed lotus seeds that soften into chewy, spongy dumplings that soak up rich royal gravy." },
    ],
    author: { name: "Chef Tariq Rahman", role: "Awadhi & Bengali Mughlai Specialist" },
    updatedDate: "September 18, 2026",
    tags: ["Chicken Rezala", "চিকেন রেজালা", "Shahi Rezala", "White Chicken Curry", "Mughlai", "Halal Chicken", "Bengali Cuisine"],
  },
];
