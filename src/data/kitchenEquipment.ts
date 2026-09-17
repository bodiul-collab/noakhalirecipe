import { KitchenToolItem } from "../types";

export const KITCHEN_EQUIPMENT: KitchenToolItem[] = [
  {
    id: "tool-dekchi-biryani-pot",
    title: "Heavy-Bottom Aluminum or Copper Degchi / Biryani Pot",
    category: "Recipe-Specific Tools",
    description:
      "A wide-mouthed, narrow-necked traditional vessel designed for even heat dissipation during low-heat 'dum' sealing of biryanis and polao.",
    recommendedUse:
      "Essential for layering parboiled basmati rice and marinated chicken/meat. The curved belly creates natural steam circulation, cooking each grain uniformly.",
    practicalTips: [
      "Look for an extra-thick base (minimum 4mm to 5mm) to prevent rice from scorching at the base.",
      "Seal the rim with wheat flour dough or heavy double-foil before placing the lid on.",
      "Place a flat cast iron tawa underneath the pot for diffuse indirect flame during the final 20-minute dum stage.",
    ],
    relatedRecipeSlugs: ["halal-chicken-biryani", "vegetable-bhuna-khichuri"],
    badge: "Heritage Essential",
  },
  {
    id: "tool-sheel-pata-mortar",
    title: "Granite Sheel Pata / Heavy Stone Mortar & Pestle",
    category: "Useful Kitchen Equipment",
    description:
      "Traditional flat granite grinding slab (sheel) and cylindrical roller (pata) used across Eastern Bengal to hand-grind spices, mustard, and bhortas.",
    recommendedUse:
      "Grinding fresh yellow and brown mustard seeds into smooth, silky shorshe bata without generating blade friction heat that turns mustard bitter.",
    practicalTips: [
      "Always grind mustard seeds with a pinch of sea salt and 1 green chili to naturally arrest enzyme bitterness.",
      "A heavy unpolished granite mortar and pestle is the ideal modern countertop equivalent.",
      "Use for crushing whole roasted cumin and coriander into coarse artisanal finishing powders.",
    ],
    relatedRecipeSlugs: ["noakhali-shorshe-ilish", "chingri-malai-curry", "bengali-beef-bhuna"],
    badge: "Flavor Master",
  },
  {
    id: "tool-iron-karahi-kadai",
    title: "Pre-Seasoned Cast Iron or Carbon Steel Karahi / Kadai",
    category: "Kitchen Essentials",
    description:
      "The quintessential deep, curved South Asian wok indispensable for high-heat searing, rapid vegetable stir-fries, deep frying samosas, and slow meat bhunas.",
    recommendedUse:
      "Slow-braising beef and mutton curries ('koshano') where high thermal mass prevents temperature drops when cold ingredients are introduced.",
    practicalTips: [
      "Season regularly with a thin coat of mustard oil baked on high heat.",
      "Never soak cast iron in soapy water for extended periods; dry thoroughly over a warm burner after washing.",
    ],
    relatedRecipeSlugs: ["bengali-beef-bhuna", "chittagong-mezbani-beef-curry", "shahi-chicken-roast"],
    badge: "Daily Workhorse",
  },
  {
    id: "tool-ghutni-dal-whisk",
    title: "Wooden Dal Ghutni / Handheld Churner & Whisk",
    category: "Recipe-Specific Tools",
    description:
      "A hand-carved wooden churning stick with star-shaped prongs, spun rapidly between the palms to break down boiled lentils into a creamy soup.",
    recommendedUse:
      "Pureeing boiled masoor or moong dal without pulverizing delicate textures, and aerating curd for authentic frothy Shahi Borhani.",
    practicalTips: [
      "Natural hardwood ghutnis do not scratch non-stick or enameled cookware.",
      "Roll the handle between both open palms for 30 seconds for effortless, smooth texture.",
    ],
    relatedRecipeSlugs: ["traditional-shahi-borhani", "vegetable-bhuna-khichuri"],
    badge: "Classic Utility",
  },
  {
    id: "tool-digital-kitchen-scale",
    title: "Precision Digital Kitchen Scale (Gram & Ounce Precision)",
    category: "Useful Kitchen Equipment",
    description:
      "Essential for reliable baking, spice blending ratios, rice-to-water measurement, and scaling family recipes for larger gatherings.",
    recommendedUse:
      "Eliminating the ambiguity of 'heaped tablespoons' or variable cup sizes when preparing authentic spice blends and doughs.",
    practicalTips: [
      "Always use the 'Tare' function to zero out bowls before adding dry or liquid ingredients.",
      "Measure delicate spices like saffron, green cardamom, and fenugreek in grams for consistent outcomes.",
    ],
    relatedRecipeSlugs: ["halal-chicken-biryani", "shahi-chicken-roast"],
    badge: "Precision",
  },
  {
    id: "tool-fine-mesh-chinois-sieve",
    title: "Stainless Steel Fine Mesh Sieve & Splatter Guard",
    category: "Kitchen Essentials",
    description:
      "Durable wire mesh strainer for washing fragrant basmati rice until starch-free, straining mustard pastes, and sifting flour for delicate sweets.",
    recommendedUse:
      "Straining freshly blended mustard seed paste to remove fibrous seed hulls for silky Noakhali Shorshe Ilish gravy.",
    practicalTips: [
      "Use stainless steel to prevent acidic tamarind or lemon juices from reacting with the metal.",
      "Doubles as a stove splatter screen when blooming whole spices in hot oil.",
    ],
    relatedRecipeSlugs: ["noakhali-shorshe-ilish", "traditional-shahi-borhani"],
    badge: "Multi-Purpose",
  },
];
