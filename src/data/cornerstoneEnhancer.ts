import { Recipe } from "../types";
import { CORNERSTONE_BLUEPRINTS } from "./productionEngine";
import { CORNERSTONE_ADDITIONAL_RECIPES } from "./cornerstoneRecipes";

const BLUEPRINT_MAP = new Map(
  CORNERSTONE_BLUEPRINTS.map((b) => [b.recipeSlug, b])
);

// Map of cornerstone recipe specific editorial enhancements
const RECIPE_EDITORIAL_EXTRAS: Record<
  string,
  {
    whySpecial: string;
    cookingTips: string[];
    commonMistakes: string[];
  }
> = {
  "bengali-beef-tehari": {
    whySpecial:
      "Cooked in pungent, cold-pressed mustard oil with fragrant small-grain Chinigura rice and bite-sized marbled beef rather than ghee and basmati. The tiny grains drink in the rendered beef broth and toasted mace, while whole green chilies provide pure floral aroma without burning heat.",
    cookingTips: [
      "Smoke the mustard oil gently until a faint haze rises; this eliminates raw sulfur bite and unlocks nutty sweetness.",
      "Rinse Chinigura rice gently 4-5 times until water runs clear, and drain in a colander for 20 minutes before toasting.",
      "Do not stir the rice vigorously while boiling; use a flat paddle to turn from the edges to preserve fragile grains.",
      "Allow a 15-minute sealed rest off the flame so steam equalizes and grains firm up before fluffing.",
    ],
    commonMistakes: [
      "Using long-grain basmati without adjusting liquid—Chinigura requires less water (1:1.66 ratio).",
      "Slitting all the green chilies down the middle, which turns the entire pot violently fiery rather than aromatically spiced.",
      "Uncovering the pot immediately after cooking, which releases trapped vapor and results in wet, sticky rice.",
      "Skipping the initial high-heat mustard oil sear (koshano), leaving raw spices clinging to the meat.",
    ],
  },
  "chicken-biryani": {
    whySpecial:
      "Flawlessly balanced dum-style biryani featuring 70% parboiled aged basmati, golden ghee-fried potatoes, and bone-in chicken thighs braised in a rich korma gravy with caramelized beresta and saffron milk.",
    cookingTips: [
      "Parboil aged basmati in 5x volume of heavily salted boiling water for exactly 4.5 to 5 minutes (70% doneness).",
      "Spread strained parboiled rice onto flat trays immediately to halt carryover steam cooking.",
      "Always include golden fried whole halved potatoes—they absorb meat fond and provide moisture balance during dum.",
      "Use heavy foil or whole wheat dough to create an airtight seal on the rim of your biryani dekchi.",
    ],
    commonMistakes: [
      "Boiling the rice completely before layering, which guarantees a mushy, broken grain texture after 25 minutes of dum.",
      "Frying onions over high heat, which chars the edges black and introduces harsh bitterness to the korma gravy.",
      "Using boneless chicken breast, which dries out during long sealed dum cooking; always use bone-in thighs and drumsticks.",
    ],
  },
  "bengali-beef-bhuna": {
    whySpecial:
      "The undisputed triumph of patient 'koshano' braising: marbled beef cubes slowly pan-fried in pure mustard oil and caramelized onion paste until the spices form a thick, glistening mahogany fond that clings to every fiber.",
    cookingTips: [
      "Use heavy-bottomed cast iron or carbon steel kadai for superior heat retention during repetitive braising.",
      "Deglaze exclusively with boiling water in small 2-tablespoon splashes whenever the fond sticks to the pan.",
      "Do not rush the onion caramelization phase; 12 minutes of slow browning provides the natural sweetness and color.",
      "Finish with freshly toasted and ground roasted cumin powder (bhuna jeera) right after turning off the burner.",
    ],
    commonMistakes: [
      "Drowning the meat in excess water at the start; beef should cook down in its own released moisture.",
      "Adding cold tap water to a sizzling pot, which causes muscle contraction and makes beef tough and stringy.",
      "Skipping the resting period; the gravy thickens and oil settles during a 10-minute rest.",
    ],
  },
  "bengali-chicken-roast": {
    whySpecial:
      "The iconic centerpiece of Bengali wedding feasts: chicken leg quarters gently seared in ghee without browning, then braised in a luxurious, sweet-and-savory gravy of cashew paste, golden beresta, yogurt, mace, and kewra.",
    cookingTips: [
      "Score chicken leg quarters with shallow diagonal cuts so yogurt and aromatics penetrate to the bone.",
      "Sear chicken in pure cow ghee for only 90 seconds per side over medium heat—do not let the skin brown.",
      "Blend golden fried onions with plain yogurt and soaked cashews into a silky, lump-free paste.",
      "Balance the sweet-sour profile carefully: natural onion sweetness, yogurt tang, and a small pinch of sugar if needed.",
    ],
    commonMistakes: [
      "Browning the chicken heavily like tandoori; authentic wedding roast must maintain a golden ivory hue.",
      "Pouring cold yogurt directly into hot ghee, which breaks the emulsion and causes curdling.",
      "Omitting mace (javitri) and kewra water, which provide the quintessential Shahi banquet aroma.",
    ],
  },
  "authentic-nihari": {
    whySpecial:
      "An imperial slow-cooked masterpiece: thick bone-in beef shanks simmered for 5-6 hours until collagen dissolves into velvety gelatin, finished with toasted wheat flour roux, rich spiced tari oil, and marrow extraction.",
    cookingTips: [
      "Use cross-cut beef shank with marrow bones (nalli); connective tissue and marrow are the soul of authentic nihari broth.",
      "Skim the floating red aromatic oil (tari) from the pot BEFORE whisking in the flour slurry; pour the tari back on top at serving.",
      "Dry-toast the whole wheat flour in a pan until nutty and golden before whisking with water to prevent raw flour taste.",
      "Always serve with fresh ginger matchsticks, chopped cilantro, slit green chilies, and lots of fresh lime juice.",
    ],
    commonMistakes: [
      "Boiling vigorously on high heat; nihari requires a slow, lazy bubble to melt tough shank fibers into velvet.",
      "Adding the flour slurry without skimming the oil first; the flour will permanently absorb and dull the vibrant red tari.",
      "Serving without acid; fresh lime juice is essential to cut through the decadent richness of marrow and gelatin.",
    ],
  },
  "chicken-karahi": {
    whySpecial:
      "High-heat Pakistani roadside dhaba cooking at its finest: small bone-in chicken cuts seared over roaring flame with ripe tomatoes, ginger matchsticks, and freshly crushed black pepper—with zero onions.",
    cookingTips: [
      "Cut whole chicken into small 16-18 piece curry cuts to maximize surface contact and rapid cooking.",
      "Halve tomatoes and place cut-side down over the chicken; after 8 minutes of steaming, peel the skins off with tongs.",
      "Perform vigorous 'bhunai' on maximum heat, mashing the tomatoes until watery juice reduces into a clingy, glistening masala.",
      "Add coarse black pepper and toasted crushed fenugreek leaves (kasuri methi) in the final 60 seconds off the flame.",
    ],
    commonMistakes: [
      "Adding onions; authentic Peshawar and Lahore style karahi uses strictly tomatoes, ginger, and garlic.",
      "Leaving tomato skins in the curry, which creates unappealing rolled-up parchment textures.",
      "Cooking on low heat; karahi is a fast wok-style dish that depends on blistering heat to caramelize tomato sugars.",
    ],
  },
  "authentic-chicken-shawarma": {
    whySpecial:
      "Street-style Middle Eastern perfection recreated at home: boneless chicken thighs marinated in yogurt, lemon, and warm Levant spices (sumac, allspice, cumin), pan-seared with a heavy press for crispy charred edges, and wrapped with authentic garlic Toum.",
    cookingTips: [
      "Use boneless, skinless chicken thighs rather than chicken breast; thighs stay juicy and withstand high-heat charring.",
      "Place a heavy cast-iron skillet or foil-wrapped brick directly on top of the chicken pieces in the pan to simulate vertical rotisserie compression.",
      "Make real garlic Toum emulsion with garlic, sea salt, neutral oil, and lemon juice—never commercial mayonnaise.",
      "Wrap tightly in Saj or thin pita and toast the assembled sandwich on the skillet for 90 seconds per side for shatter-crisp crunch.",
    ],
    commonMistakes: [
      "Using chicken breast, which dries out and turns stringy under high heat.",
      "Adding wet vegetables like lettuce or watery tomatoes inside the warm sandwich, which immediately turns the bread soggy.",
      "Carving the chicken into thick chunks instead of shaving into paper-thin ribbons.",
    ],
  },
};

export function enhanceRecipesWithCornerstones(baseRecipes: Recipe[]): Recipe[] {
  // Prepend additional cornerstone recipes (Kacchi Biryani, Beef Kala Bhuna, Chicken Rezala)
  const allRawRecipes = [...CORNERSTONE_ADDITIONAL_RECIPES, ...baseRecipes];

  return allRawRecipes.map((recipe) => {
    const blueprint = BLUEPRINT_MAP.get(recipe.slug);
    if (!blueprint) {
      return recipe;
    }

    const extras = RECIPE_EDITORIAL_EXTRAS[recipe.slug];

    return {
      ...recipe,
      whySpecial: recipe.whySpecial || extras?.whySpecial || blueprint.productionData.hook,
      cookingTips: recipe.cookingTips || extras?.cookingTips || [
        "Maintain proper heat control throughout cooking.",
        "Use high-quality Halal ingredients and fresh whole spices.",
        "Allow proper resting time before serving.",
      ],
      commonMistakes: recipe.commonMistakes || extras?.commonMistakes || [
        "Rushing the cooking time over excessive heat.",
        "Skipping the initial spice blooming phase.",
      ],
      relatedRecipeSlugs: recipe.relatedRecipeSlugs || blueprint.relatedRecipes,
      relatedGuideSlugs: recipe.relatedGuideSlugs || blueprint.relatedGuides,
      relatedCultureSlug: recipe.relatedCultureSlug || blueprint.relatedCulture,
      relatedKitchenToolId: recipe.relatedKitchenToolId || blueprint.kitchenToolId,
      seoTitle: recipe.seoTitle || blueprint.seoTitle,
      seoDescription: recipe.seoDescription || blueprint.seoMetaDescription,
      videoChapters: recipe.videoChapters || blueprint.chapters,
      videoProduction: recipe.videoProduction || blueprint.productionData,
    };
  });
}
