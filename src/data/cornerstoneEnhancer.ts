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
  "corned-beef-reuben-sandwich": {
    whySpecial:
      "The undisputed king of classic New York deli sandwiches: generous folds of warm, thinly sliced spiced Halal corned beef brisket layered with melted Swiss cheese, crisp tangy sauerkraut, and creamy Russian dressing, griddled between thick slices of caraway rye bread to golden, buttery perfection.",
    cookingTips: [
      "Always thoroughly squeeze and drain the sauerkraut in a clean kitchen towel or fine mesh strainer before assembling; excess brine will make the toasted rye bread soggy.",
      "Warm the sliced corned beef gently in a dry skillet with a splash of beef broth or water, or steam it lightly before layering to ensure the cheese melts rapidly on the griddle.",
      "Butter the outside faces of the rye bread generously from edge to edge, and griddle over medium-low heat with gentle downward pressure so the bread turns deeply golden and crisp without scorching while the cheese fully melts.",
      "Layer cheese on both the top and bottom bread slices; the melted Swiss acts as a delicious moisture barrier protecting the crisp crust from the dressing and sauerkraut.",
    ],
    commonMistakes: [
      "Using wet, dripping sauerkraut directly from the jar without squeezing, which inevitably results in a soggy sandwich bottom.",
      "Griddling over excessively high heat, which burns the rye bread before the cold meat and cheese have warmed and melted through.",
      "Using mild white bread instead of authentic seeded Jewish rye or marble rye, which deprives the sandwich of its signature earthy caraway aroma.",
    ],
  },
  "rogan-josh": {
    whySpecial:
      "The crown jewel of Kashmiri royal Wazwan cuisine: tender lamb braised in pure ghee and spiced red oil ('rogan') infused with whole black cardamom, sweet fennel powder (saunf), and aromatic dry ginger (sonth), yielding a glorious natural crimson hue and velvety sauce without heavy onion paste.",
    cookingTips: [
      "Whisk yogurt with a tablespoon of water and Kashmiri chili powder before adding over low flame to prevent curdling.",
      "Use freshly ground fennel powder (saunf) and dry ginger (sonth); this spice duo is the authentic aromatic signature of real Kashmiri Rogan Josh.",
      "Sear the lamb pieces in ghee until richly browned before adding the spiced yogurt reduction.",
      "Allow the curry to simmer covered on the lowest possible flame until the fragrant red oil ('rogan') floats freely on the surface.",
    ],
    commonMistakes: [
      "Overpowering the dish with raw onions, heavy tomato purees, or garlic; authentic Kashmiri Rogan Josh relies on yogurt, fennel, dry ginger, and Kashmiri chili for body and color.",
      "Adding yogurt over high heat without tempering, causing it to split into unattractive curds.",
      "Using artificial red food coloring instead of generous mild Kashmiri chili powder or alkanet root (ratan jot).",
      "Using lean, boneless meat; bone-in lamb shoulder or shank pieces provide essential gelatin and unctuous richness.",
    ],
  },
  "lamb-curry": {
    whySpecial:
      "The crown jewel of traditional Bengali Sunday feasts and celebratory banquets: succulent bone-in lamb and marrow shanks slow-braised in cold-pressed mustard oil with caramelized onions, warm whole spices, golden fried potatoes (aloo), and a glistening crimson-amber broth that melts over steaming rice.",
    cookingTips: [
      "Fry the halved russet or Yukon Gold potatoes in mustard oil with a pinch of turmeric and salt until golden and blistered before adding to the curry.",
      "Sear and 'koshano' the marinated lamb pieces patiently for 15 to 20 minutes until rendered marrow and fats emulsify with the onion-ginger-garlic masala.",
      "Always use boiling hot water when adding the simmer broth; cold water shocks the meat muscle fibers and prevents melting tenderness.",
      "Cook low and slow in a heavy enameled Dutch oven or pressure cook for 6 to 7 whistles until the lamb pulls cleanly off the bone with a spoon.",
    ],
    commonMistakes: [
      "Using lean boneless meat; bone-in lamb shanks and shoulder with marrow bones are essential for collagen-rich body and savory richness.",
      "Boiling vigorously over aggressive high heat, which causes tough, chewy meat fibers and dries out the marrow.",
      "Skipping the initial mustard oil smoking step, which leaves an overly harsh raw sulfur pungency.",
      "Adding the potatoes at the very beginning of a long braise, which causes them to dissolve into starch and muddy the clear spiced broth.",
    ],
  },
  "chicken-jalfrezi": {
    whySpecial:
      "A vibrant Anglo-Indian & Bengali culinary icon: tender chicken chunks flash-fried at high heat with crunchy red and green bell peppers, chunky onion petals, and fresh green chilies in a fiery, sweet-and-tangy spiced tomato masala reduction.",
    cookingTips: [
      "Sear marinated chicken chunks over high heat in batches so they develop golden blistered edges rather than stewing in liquid.",
      "Add bell peppers and onion chunks during the final 3 to 4 minutes of cooking so they retain vibrant color, sweet crunch, and crisp texture.",
      "Balance the tomato base with a subtle hint of vinegar or fresh lime juice and a pinch of brown sugar or honey to achieve the signature Jalfrezi sweet-sour-tangy punch.",
      "Garnish with julienned fresh ginger matchsticks, slit green chilies, and fresh chopped cilantro right before serving.",
    ],
    commonMistakes: [
      "Overcooking the bell peppers and onions into a mushy pulp; Jalfrezi is fundamentally a stir-fry curry defined by crisp-tender vegetables.",
      "Drowning the dish in excess water; Jalfrezi should have a thick, glossy, clingy masala coating the meat and vegetables.",
      "Using low heat when frying the aromatics, which prevents the smoky wok-char characteristic of high-end curry houses.",
    ],
  },
  "chicken-bhuna-masala-curry-bengali-style": {
    whySpecial:
      "The quintessential triumph of Bengali 'koshano' braising: tender bone-in chicken cuts browned in pure cold-pressed mustard oil, then simmered in deeply caramelized onions, ginger-garlic paste, and roasted cumin until the oil separates into a glossy, dark, intensely aromatic masala that clings to every piece.",
    cookingTips: [
      "Caramelize the sliced onions slowly over medium-low heat until they turn deep golden-brown; this forms the sweet, savory backbone of the bhuna sauce.",
      "Deglaze only with small splashes of boiling water whenever the fond sticks to the pan bottom, releasing concentrated flavors without thinning the gravy.",
      "Use bone-in chicken thighs and drumsticks; the bones render natural collagen and marrow into the reducing onion masala.",
      "Finish with freshly dry-roasted and ground cumin powder (bhuna jeera) and whole slit green chilies 2 minutes before turning off the stove.",
    ],
    commonMistakes: [
      "Adding excess water at the start; Chicken Bhuna is defined by a thick, clingy, reduction gravy rather than a soupy broth.",
      "Pouring in cold tap water during cooking, which contracts the chicken muscle fibers and makes meat rubbery.",
      "Burning the onions on high heat, which imparts an acrid, bitter taste that ruins the masala.",
      "Skipping the resting period; resting the curry covered for 10 minutes off heat allows the spiced oil to settle and infuse deeply.",
    ],
  },
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
  "shahi-chicken-roast": {
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
  "bengali-shahi-chicken-roast": {
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
  "dhaka-shahi-chicken-roast": {
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
