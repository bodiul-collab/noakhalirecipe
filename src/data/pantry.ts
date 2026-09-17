import { HalalPantrySection } from "../types";

export const HALAL_PANTRY_SECTIONS: HalalPantrySection[] = [
  {
    id: "pantry-staples",
    slug: "halal-pantry-staples",
    title: "Halal Pantry Staples",
    subtitle: "Foundational grains, flours, natural thickeners & vinegars",
    description:
      "Essential non-perishable pantry building blocks required for daily Halal home cooking, selected for purity, quality, and verified ingredient sourcing.",
    verificationGuidance:
      "When sourcing flours, breadcrumbs, and processed grain mixes, always check for non-halal animal dough conditioners (such as animal L-cysteine / E920) or non-halal shortening.",
    keyStaples: [
      {
        name: "Aged Sella & 1121 Basmati Rice",
        bengaliOrRegionalName: "Basmati Chal",
        purpose: "Aromatic pilafs, royal biryanis, and everyday rice bowls.",
        halalVerificationNotes: "Naturally 100% Halal; verify bulk storage does not risk rodenticide or cross-contamination.",
      },
      {
        name: "Kalijeera / Chinigura Heirloom Rice",
        bengaliOrRegionalName: "Chinigura / Kalijeera Chal",
        purpose: "Traditional Bengali wedding polao, khichuri, and sweet payesh (kheer).",
        halalVerificationNotes: "Single-origin aromatic heirloom grain, unadulterated.",
      },
      {
        name: "Roasted Gram Flour (Besan)",
        bengaliOrRegionalName: "Besan",
        purpose: "Batter for crispy pakoras, thickening gravies, and making traditional laddus.",
        halalVerificationNotes: "Naturally plant-based from milled chana dal; gluten-free and 100% Halal.",
      },
      {
        name: "Agar-Agar Flakes & Powder",
        bengaliOrRegionalName: "Kanten / Seaweed Gelatin Alternative",
        purpose: "Setting sweet jellies, puddings, fruit tarts, and mousses.",
        halalVerificationNotes: "100% plant/seaweed derived; universal Halal replacement for commercial pork/bovine gelatin.",
      },
    ],
  },
  {
    id: "pantry-dates",
    slug: "dates-and-natural-foods",
    title: "Dates & Sun-Ripened Whole Foods",
    subtitle: "Sacred fruit traditions, natural sweeteners & mineral-rich nourishment",
    description:
      "Whole dates hold an esteemed position in Islamic dietary culture for breaking the daily fast during Ramadan and nourishing everyday wellness.",
    verificationGuidance:
      "Look for whole, unglazed dates. Avoid commercial date pastes containing added glucose syrups with unverified enzymes or animal glazing agents (such as confectioner's shellac / E904).",
    keyStaples: [
      {
        name: "Medjool Dates",
        bengaliOrRegionalName: "Khejur",
        purpose: "Plump, caramel-sweet dates for Iftar, desserts, and natural milk smoothies.",
        halalVerificationNotes: "Naturally 100% pure; ensure no alcohol-based sanitizing washes.",
      },
      {
        name: "Ajwa al-Madinah Dates",
        bengaliOrRegionalName: "Ajwa Khejur",
        purpose: "Revered heirloom date from Madinah, known for fine texture and deep prune-like sweetness.",
        halalVerificationNotes: "Single-source certified authentic origin.",
      },
      {
        name: "Pure Date Molasses / Silan",
        bengaliOrRegionalName: "Khejurer Shira",
        purpose: "Unrefined mineral-rich syrup for marinades, dressings, and breakfast breads.",
        halalVerificationNotes: "Verify ingredients list consists purely of 100% dates and water.",
      },
    ],
  },
  {
    id: "pantry-honey",
    slug: "pure-raw-honey",
    title: "Raw & Unfiltered Honey",
    subtitle: "Pure floral nectars, digestive balance & ethical apiaries",
    description:
      "Pure honey is commended in traditional Islamic wellness and serves as an unrefined natural sweetener for hot teas, marinades, and festive sweets.",
    verificationGuidance:
      "Verify 100% pure honey certification. Commercial ultra-filtered honey is frequently diluted with high-fructose corn syrup or rice syrup.",
    keyStaples: [
      {
        name: "Raw Wildflower Honey",
        bengaliOrRegionalName: "Khanti Modhu",
        purpose: "Everyday sweetening, tea infusions, and balanced meat glazes.",
        halalVerificationNotes: "Cold-extracted, unheated, free from corn syrup additives.",
      },
      {
        name: "Sidr (Jujube) Honey",
        bengaliOrRegionalName: "Sidr Modhu",
        purpose: "Premium monofloral honey from wild jujube trees with rich butterscotch undertones.",
        halalVerificationNotes: "Pure unadulterated monofloral harvest.",
      },
    ],
  },
  {
    id: "pantry-spices",
    slug: "pure-whole-spices",
    title: "Whole Spices & Single-Origin Blends",
    subtitle: "Fragrant volatile oils, traditional blooming & fresh grinding",
    description:
      "Whole spices maintain their complex aromatics significantly longer than pre-ground powders, forming the flavor soul of every Halal curry and rice dish.",
    verificationGuidance:
      "Avoid commercial pre-mixed curry powders that include animal broths, anti-caking stearates, or unlisted flavor enhancers.",
    keyStaples: [
      {
        name: "Green Cardamom Pods (Elachi)",
        bengaliOrRegionalName: "Chhoto Elachi",
        purpose: "Sweet fragrance for biryani, chicken roast, and milk desserts.",
        halalVerificationNotes: "Unbleached, pesticide-tested whole green pods.",
      },
      {
        name: "Shahi Jeera (Royal Caraway Seeds)",
        bengaliOrRegionalName: "Shahi Jeere",
        purpose: "Finishing polao, korma, and Mughal banquet curries.",
        halalVerificationNotes: "100% pure dried botanical seeds.",
      },
      {
        name: "Whole Ceylon Cinnamon Quills",
        bengaliOrRegionalName: "Daruchini",
        purpose: "Delicate sweet bark for slow simmering in broths and curries.",
        halalVerificationNotes: "True Cinnamomum verum quills.",
      },
    ],
  },
  {
    id: "pantry-oils",
    slug: "pure-cooking-oils-and-ghee",
    title: "Pure Cooking Fats & Cold-Pressed Oils",
    subtitle: "High-smoke point cooking, nutty ghee & cold-pressed seeds",
    description:
      "From high-smoke point mustard oil in Eastern Bengal to cold-pressed extra virgin olive oil in the Mediterranean and pure grass-fed cow ghee.",
    verificationGuidance:
      "Ensure commercial ghee is certified 100% pure milkfat with zero animal tallow or hydrogenated vegetable fats.",
    keyStaples: [
      {
        name: "Pure Cow Ghee (Clarified Butter)",
        bengaliOrRegionalName: "Khanti Gawa Ghee",
        purpose: "Blooming spices, tempering dal, roasting chicken, and finishing biryani.",
        halalVerificationNotes: "Must be derived purely from bovine milk without animal enzymes or tallow blends.",
      },
      {
        name: "Cold-Pressed Mustard Oil",
        bengaliOrRegionalName: "Kacchi Ghani Sarson Tel",
        purpose: "Fish curries, mustard gravies, and traditional mashed bhortas.",
        halalVerificationNotes: "First cold pressing of pure mustard seeds; zero solvent extraction.",
      },
      {
        name: "Extra Virgin Olive Oil",
        bengaliOrRegionalName: "Jolpai Tel",
        purpose: "Dressings, low-heat sautéing, marinades, and Mediterranean dishes.",
        halalVerificationNotes: "Cold-extracted first pressing, naturally 100% Halal.",
      },
    ],
  },
  {
    id: "pantry-standards",
    slug: "halal-certified-food-standards",
    title: "Halal Food Standards & Verification Criteria",
    subtitle: "Understanding credible certification bodies, audit seals & label verification",
    description:
      "A structured overview of how modern food certification bodies evaluate food manufacturing facilities, slaughter procedures, cleaning sanitation, and supply chains.",
    verificationGuidance:
      "Look for established accreditation marks (such as HFSAA, HMC, ISNA, IFANCA, JAKIM, or regional Islamic councils) rather than self-proclaimed manufacturer claims.",
    keyStaples: [
      {
        name: "Third-Party Facility Audit Guidelines",
        purpose: "Verifying physical separation of Halal and non-halal processing lines.",
        halalVerificationNotes: "Ensures no cross-contamination from pork fats, alcohol cleaners, or shared equipment.",
      },
      {
        name: "E-Number Additive Screening",
        purpose: "Verifying mono- and diglycerides (E471), rennet, and emulsifiers.",
        halalVerificationNotes: "Must be derived from 100% plant sources or Halal-certified animals.",
      },
    ],
  },
  {
    id: "pantry-vitamins",
    slug: "halal-vitamins-and-nutrition",
    title: "Halal Vitamins & Dietary Supplements (Standards Guide)",
    subtitle: "Navigating capsule shells, bovine sources, vitamin carriers & third-party auditing",
    description:
      "An educational guide on verifying dietary supplements and vitamins without non-halal gelatins, stearates, or alcohol extraction carriers. Educational architecture only—no medical claims.",
    verificationGuidance:
      "Standard softgel capsules are overwhelmingly manufactured using pork gelatin unless explicitly labeled as Halal-certified bovine gelatin or vegetarian cellulose (HPMC). Always check carrier solvents for vitamin D3 and fat-soluble vitamins.",
    keyStaples: [
      {
        name: "Vegetarian Cellulose Softgel Capsules (HPMC)",
        purpose: "Plant-based capsule shell for oils, vitamins, and minerals.",
        halalVerificationNotes: "100% plant-derived; completely free from animal byproducts.",
      },
      {
        name: "Halal-Certified Bovine Gelatin Softgels",
        purpose: "Durable capsule shell derived from Halal-inspected cattle.",
        halalVerificationNotes: "Must carry accredited Halal certification verifying Zabiha slaughter.",
      },
      {
        name: "Alcohol-Free Vitamin Liquid Drops",
        purpose: "Liquid vitamin supplements formulated without ethyl alcohol solvents.",
        halalVerificationNotes: "Uses organic olive oil, MCT oil, or plant glycerin as the carrier base.",
      },
    ],
  },
];
