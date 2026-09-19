import { ShortClipItem, VideoChapter, VideoProductionData } from "../types";

export interface ProductionStep {
  step: number;
  title: string;
  category: "Pre-Production" | "Production" | "Post-Production" | "Publishing & SEO";
  description: string;
  deliverables: string[];
}

export const PRODUCTION_WORKFLOW_STEPS: ProductionStep[] = [
  {
    step: 1,
    title: "Research and Validate Recipe Concept",
    category: "Pre-Production",
    description: "Verify regional authenticity, culinary origins, and Halal ingredient compliance. Ensure cultural respect and exact traditional cooking methods.",
    deliverables: ["Origin validation", "Flavor profile definition", "Halal verification checklist"],
  },
  {
    step: 2,
    title: "Create Comprehensive Recipe",
    category: "Pre-Production",
    description: "Formulate exact volumetric and metric measurements, ingredient hierarchy, prep/cook timings, and nutritional balance.",
    deliverables: ["Ingredient list with notes", "Nutritional baseline", "Portion yield specs"],
  },
  {
    step: 3,
    title: "Create Step-by-Step Cooking Instructions",
    category: "Pre-Production",
    description: "Write unambiguous chronological phases with sensory benchmarks (e.g. 'oil separates along edges', 'aroma turns sweet and nutty').",
    deliverables: ["Sequential phases", "Heat levels & durations", "Sensory cues"],
  },
  {
    step: 4,
    title: "Create YouTube Script",
    category: "Pre-Production",
    description: "Script the 10-act structure: 20-second hook, intro, ingredient showcase, prep, progressive cooking, technique spotlight, plating, and calm call-to-action.",
    deliverables: ["Timed script breakdown", "Audio cues & sound effects", "Presenter talking points"],
  },
  {
    step: 5,
    title: "Create Shot List & Camera Angles",
    category: "Production",
    description: "Plan macro overheads for spices, 45-degree hero angles for simmering vessels, slow dolly moves for finished dish, and ASMR close-ups.",
    deliverables: ["Overhead camera notes", "Close-up macro markers", "Lighting temperature presets"],
  },
  {
    step: 6,
    title: "Create AI Visual Prompts & Asset Generation",
    category: "Production",
    description: "Generate photorealistic culinary imagery and video sequences adhering to strict anti-slop rules (natural hands, authentic cookware, realistic steam).",
    deliverables: ["Prompt library", "High-res hero stills", "Motion clip assets"],
  },
  {
    step: 7,
    title: "Create Narration & Voiceover Audio",
    category: "Production",
    description: "Record or synthesize calm, warm, knowledgeable, culturally respectful narration without artificial hype or rushed pacing.",
    deliverables: ["Clean narration audio track", "Phonetic pronunciation guide", "Audio normalization (-14 LUFS)"],
  },
  {
    step: 8,
    title: "Create Long-Form Video Assembly",
    category: "Post-Production",
    description: "Cut full-length episode (12-15 minutes) with natural kitchen audio (sizzles, rhythmic knife cuts, bubbling gravy) and gentle background bed.",
    deliverables: ["1080p/4K master file", "Color-graded cut", "Audio mix with ASMR layers"],
  },
  {
    step: 9,
    title: "Create 2–4 YouTube Shorts / Vertical Clips",
    category: "Post-Production",
    description: "Extract high-retention 9:16 vertical clips: Ingredient Prep ASMR, Key Technique Spotlight, Sizzling Moment, and Final Reveal.",
    deliverables: ["Vertical 1080x1920 clips", "Punchy captions", "Shorts-tailored music beds"],
  },
  {
    step: 10,
    title: "Publish Website Recipe Page",
    category: "Publishing & SEO",
    description: "Deploy the full recipe page on Noakhali Kitchen with why it's special, tips, common mistakes, scalable servings, and FAQs.",
    deliverables: ["Live recipe URL", "Interactive ingredient scaler", "Nutritional breakdown card"],
  },
  {
    step: 11,
    title: "Connect YouTube Video & Chapters",
    category: "Publishing & SEO",
    description: "Embed companion video with zero-latency facade player, timestamps, and direct 'Watch on YouTube' external linking.",
    deliverables: ["Video ID linking", "Clickable chapter timestamps", "No empty player fallback verification"],
  },
  {
    step: 12,
    title: "Add Internal Content Links",
    category: "Publishing & SEO",
    description: "Cross-link recipe with related cornerstone recipes, culinary technique guides, food culture essays, and kitchen equipment.",
    deliverables: ["2-4 related recipes", "1-3 technique guides", "1 food culture essay", "1 kitchen tool pairing"],
  },
  {
    step: 13,
    title: "Verify Structured Data & SEO",
    category: "Publishing & SEO",
    description: "Validate JSON-LD Schema (Recipe, BreadcrumbList, VideoObject), OpenGraph cards, Twitter meta, and target search intent.",
    deliverables: ["Schema.org validation", "OG preview check", "Google Rich Results pass"],
  },
  {
    step: 14,
    title: "Final Publishing & Production Archive",
    category: "Publishing & SEO",
    description: "Archive script, master assets, audio stems, and analytics baseline for repeatable editorial cycles.",
    deliverables: ["Archived production record", "Editorial status set to Published"],
  },
];

export interface CornerstoneProductionBlueprint {
  recipeSlug: string;
  recipeTitle: string;
  category: string;
  cuisine: string;
  targetDuration: string;
  productionStatus: "Editorial Planning" | "Scripted" | "In Visual Production" | "Ready for YouTube" | "Published";
  seoFocusKeywords: string[];
  seoTitle: string;
  seoMetaDescription: string;
  youtubeOptimizedTitle: string;
  youtubeDescription: string;
  chapters: VideoChapter[];
  productionData: VideoProductionData;
  relatedGuides: string[];
  relatedRecipes: string[];
  relatedCulture: string;
  kitchenToolId: string;
}

export const CORNERSTONE_BLUEPRINTS: CornerstoneProductionBlueprint[] = [
  {
    recipeSlug: "bengali-beef-tehari",
    recipeTitle: "Authentic Beef Tehari (পুরান ঢাকার বিফ তেহারি)",
    category: "Halal Beef",
    cuisine: "Old Dhaka & Bengali Heritage",
    targetDuration: "14:15",
    productionStatus: "Ready for YouTube",
    seoFocusKeywords: ["Old Dhaka beef tehari recipe", "authentic Bangladeshi beef tehari", "mustard oil chinigura rice beef"],
    seoTitle: "Authentic Old Dhaka Beef Tehari Recipe | Noakhali Kitchen",
    seoMetaDescription: "The authentic Old Dhaka Beef Tehari recipe: tender bone-in beef cubes, fragrant Chinigura rice cooked in pungent mustard oil, and whole green chilies.",
    youtubeOptimizedTitle: "Authentic Old Dhaka Beef Tehari Recipe (পুরান ঢাকার আসল গরুর তেহারি) | Step-by-Step Masterclass",
    youtubeDescription: `Master the legendary Old Dhaka Beef Tehari (পুরান ঢাকার আসল বিফ তেহারি) at home with Noakhali Kitchen. 
Made with aromatic small-grain Chinigura rice, tender braised beef cubes, and pure pungent mustard oil—never yellow turmeric or heavy biryani gravy.

Timestamps & Chapters:
00:00 - The Soul of Old Dhaka Tehari
00:22 - The 3 Secrets of Authentic Tehari
00:55 - Ingredient Showcase: Chinigura Rice & Mustard Oil
02:10 - Butchering & Marinating the Beef
04:05 - The High-Heat Mustard Oil Sear & Koshano
07:30 - Simmering Beef to Tender Perfection
10:35 - The Chinigura Rice Roasting Technique
12:15 - Assembly, Green Chili Crown & Sealed Dum
13:30 - The 15-Minute Uncovering & Fluffing
14:00 - Plating with Borhani & Cucumber Slices

Full Printable Recipe with Scalable Servings & Nutritional Breakdown:
https://noakhalikitchen.com/recipes/bengali-beef-tehari

Related Technique Guides:
- How to Build a Bangladeshi Spice Base: https://noakhalikitchen.com/guides/how-to-build-a-bangladeshi-spice-base
- How to Properly Rest Cooked Rice Dishes: https://noakhalikitchen.com/guides/how-to-properly-rest-cooked-rice-dishes

100% Halal Verified • No Artificial Additives • Traditional Heritage Cooking`,
    chapters: [
      { time: "00:00", title: "The Soul of Old Dhaka Tehari" },
      { time: "00:22", title: "The 3 Secrets of Authentic Tehari" },
      { time: "00:55", title: "Ingredient Showcase: Chinigura Rice & Mustard Oil" },
      { time: "02:10", title: "Butchering & Marinating the Beef" },
      { time: "04:05", title: "The High-Heat Mustard Oil Sear & Koshano" },
      { time: "07:30", title: "Simmering Beef to Tender Perfection" },
      { time: "10:35", title: "The Chinigura Rice Roasting Technique" },
      { time: "12:15", title: "Assembly, Green Chili Crown & Sealed Dum" },
      { time: "13:30", title: "The 15-Minute Uncovering & Fluffing" },
      { time: "14:00", title: "Plating with Borhani & Cucumber Slices" },
    ],
    productionData: {
      status: "Ready for YouTube",
      targetDuration: "14:15",
      hook: "0:00-0:20: Extreme close-up of piping hot Chinigura rice grains falling away from a tender, glistening bone-in beef cube. Fragrant steam rises into warm cinematic lighting while cold-pressed mustard oil sizzles in the background.",
      introduction: "0:20-0:50: Host explains why Tehari is distinctly different from Biryani: smaller fragrant Chinigura grain, pronounced mustard oil punch, no turmeric, and the signature fiery green chili infusion.",
      ingredientsVisual: "0:50-2:00: Overhead flat-lay of heirloom Chinigura rice, marbled beef chuck, pure Ghani mustard oil, green cardamoms, cinnamon quills, mace, and a bowl of fresh green chilies.",
      preparationVisual: "2:00-4:00: Rinsing Chinigura rice until water is crystal clear; dicing beef into 1-inch uniform cubes with a pinch of salt and ginger-garlic paste.",
      cookingVisual: "4:00-10:30: Smoking mustard oil until pale, blooming whole spices, searing beef until browned, adding yogurt and ground aromatic slurry, then slow braising until fork-tender.",
      keyTechnique: "10:30-12:00: Sautéing the soaked rice directly in the reserved spicy beef broth until translucent, then burying whole un-slit green chilies across the top for pure aroma without overpowering burn.",
      finalDishVisual: "12:00-13:00: Lifting the sealed lid after 15 minutes of dum; gentle sweeping fluff showing perfectly separated, glossy rice grains and succulent beef.",
      servingVisual: "13:00-14:00: Plating in a traditional enameled brass platter alongside cold Shahi Borhani, lemon wedges, and sliced red onions.",
      ctaOutro: "14:00-15:00: Warm wrap-up inviting viewers to print the recipe on Noakhali Kitchen, leave questions, and subscribe for the upcoming Kacchi Biryani masterclass.",
      cinematographyNotes: [
        "Warm 4200K daylight balance reflecting natural morning light.",
        "Overhead 4K macro lens during whole spice bloom to catch oil ripples.",
        "45-degree shallow depth of field (f/2.8) during beef braising.",
        "No artificial hand morphing or impossible physics; realistic utensil movements only.",
      ],
      voiceoverSample: "Welcome to Noakhali Kitchen. Today, we step into the narrow, spice-scented alleyways of Old Dhaka to cook the undisputed king of winter street food: Authentic Beef Tehari...",
      youtubeOptimizedTitle: "Authentic Old Dhaka Beef Tehari Recipe (পুরান ঢাকার আসল গরুর তেহারি) | Step-by-Step Masterclass",
      youtubeDescription: "Master the legendary Old Dhaka Beef Tehari with heirloom Chinigura rice and pure mustard oil.",
      shortsClips: [
        {
          title: "The Mustard Oil Sear (Tehari ASMR)",
          focus: "Sizzling Moment",
          description: "High-heat smoking mustard oil meeting whole spices and beef cubes with crisp sizzle audio.",
          targetSeconds: "0:45",
        },
        {
          title: "Chinigura Rice vs Basmati: The Tehari Rule",
          focus: "Key Cooking Technique",
          description: "Visual side-by-side explaining why tiny Chinigura grain is non-negotiable for true Tehari.",
          targetSeconds: "0:50",
        },
        {
          title: "The Green Chili Crown Dum Reveal",
          focus: "Final Dish Reveal",
          description: "Lifting the heavy lid revealing steam, vibrant green chilies, and glossy rice grains.",
          targetSeconds: "0:40",
        },
      ],
    },
    relatedGuides: ["how-to-build-a-bangladeshi-spice-base", "how-to-properly-rest-cooked-rice-dishes"],
    relatedRecipes: ["kacchi-biryani", "bengali-beef-bhuna"],
    relatedCulture: "role-of-rice-in-bangladeshi-cuisine",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    recipeSlug: "chicken-biryani",
    recipeTitle: "Authentic Chicken Biryani (মোরগ বিরিয়ানি)",
    category: "Halal Chicken",
    cuisine: "South Asian & Bengali Heritage",
    targetDuration: "15:00",
    productionStatus: "Scripted",
    seoFocusKeywords: ["authentic chicken biryani recipe", "step by step chicken biryani", "dum chicken biryani halal"],
    seoTitle: "Authentic Chicken Biryani Recipe (Dum Style) | Noakhali Kitchen",
    seoMetaDescription: "Flawless dum Chicken Biryani with succulent marinated chicken thighs, golden fried potatoes, 70% parboiled basmati, and fragrant saffron milk.",
    youtubeOptimizedTitle: "How to Make Perfect Chicken Biryani Every Single Time | Dum Biryani Masterclass",
    youtubeDescription: `The definitive guide to making restaurant-quality Chicken Biryani at home with Noakhali Kitchen. 
Master the exact 70% basmati parboil technique, caramelized onion beresta, and sealed dum steam cooking.

Timestamps & Chapters:
00:00 - What Makes Biryani Flawless
00:25 - Chicken Marination Essentials
01:10 - The Golden Beresta (Fried Onions)
03:00 - Par-frying Golden Potatoes
04:30 - The 70% Basmati Parboil Technique
07:15 - Cooking the Chicken Korma Base
10:40 - Architectural Layering & Saffron Milk
12:20 - Dough Sealed Dum Cooking
13:45 - The Unveiling & Delicate Grain Separation
14:30 - Serving with Cucumber Raita

Full recipe: https://noakhalikitchen.com/recipes/chicken-biryani`,
    chapters: [
      { time: "00:00", title: "What Makes Biryani Flawless" },
      { time: "00:25", title: "Chicken Marination Essentials" },
      { time: "01:10", title: "The Golden Beresta (Fried Onions)" },
      { time: "03:00", title: "Par-frying Golden Potatoes" },
      { time: "04:30", title: "The 70% Basmati Parboil Technique" },
      { time: "07:15", title: "Cooking the Chicken Korma Base" },
      { time: "10:40", title: "Architectural Layering & Saffron Milk" },
      { time: "12:20", title: "Dough Sealed Dum Cooking" },
      { time: "13:45", title: "The Unveiling & Delicate Grain Separation" },
      { time: "14:30", title: "Serving with Cucumber Raita" },
    ],
    productionData: {
      status: "Scripted",
      targetDuration: "15:00",
      hook: "0:00-0:20: A wide wooden ladle gently parts a golden mountain of saffron-tinted basmati rice, revealing a tender, juice-drenched chicken drumstick and caramelized onion strands.",
      introduction: "0:20-0:50: Explaining how to prevent dry chicken and mushy rice through the balanced two-pot parboil and dum methodology.",
      ingredientsVisual: "0:50-2:00: Bone-in chicken legs, aged extra-long grain basmati, whole spices, fried onions, golden potatoes, saffron threads in warm milk, and pure ghee.",
      preparationVisual: "2:00-4:00: Marinating chicken with ginger-garlic paste, yogurt, shahi garam masala, and frying paper-thin onions to crisp golden honey beresta.",
      cookingVisual: "4:00-10:30: Sautéing the chicken korma base until oil surfaces, boiling basmati with whole spices for exactly 4.5 minutes, and straining.",
      keyTechnique: "10:30-12:00: Layering: chicken korma on bottom, potato buffer, parboiled rice canopy, saffron milk streaks, kewra water, and dough seal.",
      finalDishVisual: "12:00-13:00: Slitting the baked dough crust, breathing in the royal aroma, and fluffing without snapping single grains.",
      servingVisual: "13:00-14:00: Plating on fine china with fresh mint raita, hard-boiled eggs, and sliced lemons.",
      ctaOutro: "14:00-15:00: Closing remarks on Halal culinary heritage, directing viewers to the written guide on rice boiling.",
      cinematographyNotes: [
        "Capture the transition of saffron strands diffusing into warm milk in macro.",
        "Overhead steam capture during the final dough seal release.",
        "Natural, warm kitchen ambient tones.",
      ],
      voiceoverSample: "Biryani is not just a dish—it is an architectural discipline where rice, meat, and steam exist in delicate balance...",
      youtubeOptimizedTitle: "How to Make Perfect Chicken Biryani Every Single Time | Dum Biryani Masterclass",
      youtubeDescription: "Step-by-step masterclass for restaurant-style Chicken Dum Biryani.",
      shortsClips: [
        {
          title: "The 70% Rice Parboil Secret",
          focus: "Key Cooking Technique",
          description: "Demonstrating the grain-break test between thumb and forefinger.",
          targetSeconds: "0:45",
        },
        {
          title: "Golden Beresta Crisping",
          focus: "Ingredient Preparation",
          description: "Slicing onions uniformly and pulling them out at honey-gold stage.",
          targetSeconds: "0:40",
        },
        {
          title: "The Dum Pot Dough Break",
          focus: "Final Dish Reveal",
          description: "Knife slicing through crispy baked dough with steam blast.",
          targetSeconds: "0:35",
        },
      ],
    },
    relatedGuides: ["how-to-cook-basmati-rice-for-biryani", "how-to-properly-brown-onions-beresta"],
    relatedRecipes: ["kacchi-biryani", "bengali-beef-tehari"],
    relatedCulture: "sacred-ethics-of-halal-food-traditions",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    recipeSlug: "kacchi-biryani",
    recipeTitle: "Dhaka Shahi Kacchi Biryani (পুরান ঢাকার আসল কাচ্চি বিরিয়ানি)",
    category: "Halal Beef",
    cuisine: "Old Dhaka Royal Mughlai",
    targetDuration: "16:00",
    productionStatus: "In Visual Production",
    seoFocusKeywords: ["Dhaka kacchi biryani recipe", "authentic kacchi mutton beef biryani", "raw meat dum biryani"],
    seoTitle: "Authentic Dhaka Shahi Kacchi Biryani Recipe | Noakhali Kitchen",
    seoMetaDescription: "The authentic Old Dhaka Kacchi Biryani: raw marinated bone-in meat, raw papaya tenderizer, parboiled basmati, fried potatoes, and slow dough dum.",
    youtubeOptimizedTitle: "Authentic Dhaka Kacchi Biryani (পুরান ঢাকার কাচ্চি বিরিয়ানি) | Raw Meat Dum Cooking Masterclass",
    youtubeDescription: `The royal jewel of Dhaka cuisine: Authentic Kacchi Biryani (কাচ্চি বিরিয়ানি).
Unlike cooked-meat biryanis, Kacchi layers raw marinated meat with parboiled rice, sealing it with wheat dough to cook entirely from rising internal steam.

Timestamps & Chapters:
00:00 - The Crown of Dhaka Food Culture
00:30 - The Magic of Raw Papaya Tenderizer
01:15 - Shahi Masala Blend: Nutmeg, Mace & White Pepper
03:00 - 4-Hour Meat Marination
05:10 - Frying Whole Saffron Potatoes
06:45 - Parboiling Basmati in Two Tiers (60% and 75%)
09:20 - The Handi Layering Architecture
11:30 - The Traditional Atta Dough Seal
13:00 - High Heat Steam Burst & Tawa Dum
14:30 - Opening the Dum & Plating the Feast
15:30 - Serving with Borhani & Alubukhara

Full recipe: https://noakhalikitchen.com/recipes/kacchi-biryani`,
    chapters: [
      { time: "00:00", title: "The Crown of Dhaka Food Culture" },
      { time: "00:30", title: "The Magic of Raw Papaya Tenderizer" },
      { time: "01:15", title: "Shahi Masala Blend: Nutmeg, Mace & White Pepper" },
      { time: "03:00", title: "4-Hour Meat Marination" },
      { time: "05:10", title: "Frying Whole Saffron Potatoes" },
      { time: "06:45", title: "Parboiling Basmati in Two Tiers (60% and 75%)" },
      { time: "09:20", title: "The Handi Layering Architecture" },
      { time: "11:30", title: "The Traditional Atta Dough Seal" },
      { time: "13:00", title: "High Heat Steam Burst & Tawa Dum" },
      { time: "14:30", title: "Opening the Dum & Plating the Feast" },
      { time: "15:30", title: "Serving with Borhani & Alubukhara" },
    ],
    productionData: {
      status: "In Visual Production",
      targetDuration: "16:00",
      hook: "0:00-0:20: Slicing the hardened dough seal off a heavy brass handi; steam erupts scented with kewra, mace, and saffron as tender meat separates cleanly from the bone.",
      introduction: "0:20-0:50: Explaining 'Kacchi' (raw)—how marinated raw meat cooks simultaneously with parboiled rice without pre-boiling.",
      ingredientsVisual: "0:50-2:00: Large cuts of bone-in mutton or beef shank, raw green papaya paste, thick curd, mace, nutmeg, alubukhara, and saffron.",
      preparationVisual: "2:00-4:00: Grinding fresh raw papaya with peel intact; coating meat in aromatic spices and resting for 4 hours.",
      cookingVisual: "4:00-10:30: Parboiling the first tier of basmati to 60%, the second tier to 75%, and layering into the heavy pot.",
      keyTechnique: "10:30-12:00: Atta dough rim sealing and the two-stage cooking temperature profile (high heat initial burst, followed by low-heat tawa buffer).",
      finalDishVisual: "12:00-13:00: Golden potatoes with crisp skin and fluffy centers, melt-in-the-mouth meat, and pristine two-tone rice grains.",
      servingVisual: "13:00-14:00: Traditional Dhaka wedding presentation with alubukhara, boiled egg, and spicy borhani.",
      ctaOutro: "14:00-15:00: Thanking home cooks for preserving Bengali royal heritage; directing to the Kacchi Layering guide.",
      cinematographyNotes: [
        "Focus on the tactile kneading and application of the wheat dough seal.",
        "Macro shots of boiling basmati grains lengthening under hot bubbles.",
        "Rich, warm golden hour palette.",
      ],
      voiceoverSample: "In Old Dhaka, Kacchi is not merely cooking; it is a sacred culinary pact made between heat, pressure, and patient time...",
      youtubeOptimizedTitle: "Authentic Dhaka Kacchi Biryani (পুরান ঢাকার কাচ্চি বিরিয়ানি) | Raw Meat Dum Masterclass",
      youtubeDescription: "Step-by-step masterclass for authentic Old Dhaka Kacchi Biryani.",
      shortsClips: [
        {
          title: "Raw Papaya: The Natural Tenderizer",
          focus: "Ingredient Preparation",
          description: "Demonstrating how green papaya paste breaks down collagen naturally.",
          targetSeconds: "0:45",
        },
        {
          title: "The Kacchi Dough Seal",
          focus: "Key Cooking Technique",
          description: "Rolling and pressing the hermetic seal around the handi rim.",
          targetSeconds: "0:40",
        },
        {
          title: "Kacchi Handi Steam Explosion",
          focus: "Final Dish Reveal",
          description: "The dramatic moment the dough seal is cut and steam billows out.",
          targetSeconds: "0:30",
        },
      ],
    },
    relatedGuides: ["how-to-layer-kacchi-biryani", "how-to-tenderize-beef-for-slow-cooking"],
    relatedRecipes: ["bengali-beef-tehari", "chicken-biryani"],
    relatedCulture: "bangladeshi-eid-food-traditions",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    recipeSlug: "bengali-beef-bhuna",
    recipeTitle: "Authentic Bengali Beef Bhuna (বাঙালি গরুর মাংস ভুনা)",
    category: "Halal Beef",
    cuisine: "Bangladeshi Heritage",
    targetDuration: "13:30",
    productionStatus: "Ready for YouTube",
    seoFocusKeywords: ["Bengali beef bhuna recipe", "Bangladeshi gorur mangsho bhuna", "traditional beef curry mustard oil"],
    seoTitle: "Authentic Bengali Beef Bhuna Recipe | Noakhali Kitchen",
    seoMetaDescription: "Rich, deeply caramelized Bengali Beef Bhuna (গরুর মাংস ভুনা) slow-braised with mustard oil, fried onions, roasted cumin, and garlic.",
    youtubeOptimizedTitle: "Authentic Bengali Beef Bhuna (আসল গরুর মাংস ভুনা) | The Art of Koshano Braising",
    youtubeDescription: `Master the quintessential Bengali Beef Bhuna (গরুর মাংস ভুna). 
Learn the secret of 'Koshano'—patient, rhythmic braising in pure mustard oil where the spices caramelize directly onto tender beef chunks without a drop of excess gravy.

Timestamps & Chapters:
00:00 - The Soul of a Bengali Beef Feast
00:20 - Choosing the Right Beef Cut (Chuck & Shank)
01:00 - The Mustard Oil & Whole Spice Tempering
02:30 - The Dual Onion Method (Sliced & Paste)
04:15 - Introducing the Beef & Initial Searing
06:30 - The Koshano Phase: Patient Braising
09:45 - The Slow Simmer for Collagen Breakdown
11:30 - Finishing with Roasted Bhuna Cumin & Green Chilies
12:30 - Texture & Color Benchmark: Dark Amber Fond
13:10 - Serving with Steamed Rice & Dal

Full recipe: https://noakhalikitchen.com/recipes/bengali-beef-bhuna`,
    chapters: [
      { time: "00:00", title: "The Soul of a Bengali Beef Feast" },
      { time: "00:20", title: "Choosing the Right Beef Cut (Chuck & Shank)" },
      { time: "01:00", title: "The Mustard Oil & Whole Spice Tempering" },
      { time: "02:30", title: "The Dual Onion Method (Sliced & Paste)" },
      { time: "04:15", title: "Introducing the Beef & Initial Searing" },
      { time: "06:30", title: "The Koshano Phase: Patient Braising" },
      { time: "09:45", title: "The Slow Simmer for Collagen Breakdown" },
      { time: "11:30", title: "Finishing with Roasted Bhuna Cumin & Green Chilies" },
      { time: "12:30", title: "Texture & Color Benchmark: Dark Amber Fond" },
      { time: "13:10", title: "Serving with Steamed Rice & Dal" },
    ],
    productionData: {
      status: "Ready for YouTube",
      targetDuration: "13:30",
      hook: "0:00-0:20: Glistening dark mahogany beef cubes bubbling in a heavy cast-iron karahi as mustard oil beads along the edges and fresh slit green chilies sizzle.",
      introduction: "0:20-0:50: Explaining 'Bhuna'—the technique of frying spices until they cling like a velvety second skin to the meat rather than floating in a watery broth.",
      ingredientsVisual: "0:50-2:00: Marbled beef chuck, mustard oil, finely sliced red onions, freshly crushed ginger and garlic, turmeric, Kashmiri chili, and roasted cumin.",
      preparationVisual: "2:00-4:00: Trimming beef into generous bite-sized cubes; slicing onions thinly and mixing ground spices into a smooth water slurry.",
      cookingVisual: "4:00-10:30: Searing onions until golden brown, adding the spice slurry, and slowly cooking down the beef in its own released juices.",
      keyTechnique: "10:30-12:00: The Koshano process: deglazing repeatedly with just 2 tablespoons of boiling water whenever the fond clings to the karahi.",
      finalDishVisual: "12:00-13:00: Dusting with freshly ground roasted cumin powder (bhuna jeera) and whole green chilies off the heat.",
      servingVisual: "13:00-14:00: Plated alongside piping hot parboiled rice, lemon slices, and thick yellow masoor dal.",
      ctaOutro: "14:00-15:00: Warm closing inviting viewers to try the slow weekend braise and share their results.",
      cinematographyNotes: [
        "Heavy focus on the changing color of the sauce from pale orange to deep mahogany.",
        "Microphone positioned close to the pan to record the rhythmic bubbling of koshano.",
        "Crisp contrast on cast iron cookware.",
      ],
      voiceoverSample: "In every Bengali home, the smell of beef bhuna simmering on a Friday afternoon is the universal language of welcome and comfort...",
      youtubeOptimizedTitle: "Authentic Bengali Beef Bhuna (আসল গরুর মাংস ভুনা) | The Art of Koshano Braising",
      youtubeDescription: "Traditional Bengali Beef Bhuna recipe with mustard oil and deep caramelization.",
      shortsClips: [
        {
          title: "The Koshano Sizzle",
          focus: "Sizzling Moment",
          description: "Deglazing the dark fond in cast iron with 2 tablespoons of hot water.",
          targetSeconds: "0:45",
        },
        {
          title: "Never Add Cold Water to Braising Beef",
          focus: "Key Cooking Technique",
          description: "Explaining thermal shock and why boiling water preserves tenderness.",
          targetSeconds: "0:40",
        },
        {
          title: "Bhuna Jeera Finishing Touch",
          focus: "Final Dish Reveal",
          description: "Sprinkling freshly ground roasted cumin powder over the bubbling curry.",
          targetSeconds: "0:35",
        },
      ],
    },
    relatedGuides: ["how-to-build-a-bangladeshi-spice-base", "technique-slow-braising-meat-bhuna"],
    relatedRecipes: ["beef-kala-bhuna", "bengali-beef-tehari"],
    relatedCulture: "chittagong-mezban-tradition-hospitality",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    recipeSlug: "bengali-chicken-roast",
    recipeTitle: "Biye Barir Shahi Chicken Roast (বিয়ে বাড়ির শাহী চিকেন রোস্ট)",
    category: "Halal Chicken",
    cuisine: "Bengali Wedding & Shahi Mughlai",
    targetDuration: "13:00",
    productionStatus: "Scripted",
    seoFocusKeywords: ["Biye barir chicken roast", "Bengali wedding chicken roast recipe", "shahi chicken roast halal"],
    seoTitle: "Biye Barir Shahi Chicken Roast Recipe | Noakhali Kitchen",
    seoMetaDescription: "Authentic Bengali wedding-style Shahi Chicken Roast (বিয়ে বাড়ির রোস্ট): tender chicken leg quarters, sweet-savory fried onion gravy, mace, kewra, and ghee.",
    youtubeOptimizedTitle: "Authentic Biye Barir Shahi Chicken Roast (বিয়ে বাড়ির রোস্ট) | Bengali Wedding Masterclass",
    youtubeDescription: `The centerpiece of every Bengali wedding feast: Shahi Chicken Roast (শাহী চিকেন রোস্ট).
Rich, sweet, savory, and aromatic with fried onions, cashew paste, yogurt, mace, raisins, and pure ghee.

Timestamps & Chapters:
00:00 - The Magic of Bengali Wedding Roasts
00:25 - Chicken Selection & Scoring
01:05 - The Gentle Ghee Sear (No Browning!)
03:00 - The Golden Beresta & Cashew Paste Puree
04:40 - Building the Shahi Yogurt Gravy
07:15 - Simmering Chicken to Velvety Tenderness
09:50 - The Delicate Balance: Sweet, Sour & Savory
11:20 - Finishing with Mace, Green Chilies & Kewra
12:15 - Plating with Ghee Polao
12:45 - Closing & Recipe Notes

Full recipe: https://noakhalikitchen.com/recipes/bengali-chicken-roast`,
    chapters: [
      { time: "00:00", title: "The Magic of Bengali Wedding Roasts" },
      { time: "00:25", title: "Chicken Selection & Scoring" },
      { time: "01:05", title: "The Gentle Ghee Sear (No Browning!)" },
      { time: "03:00", title: "The Golden Beresta & Cashew Paste Puree" },
      { time: "04:40", title: "Building the Shahi Yogurt Gravy" },
      { time: "07:15", title: "Simmering Chicken to Velvety Tenderness" },
      { time: "09:50", title: "The Delicate Balance: Sweet, Sour & Savory" },
      { time: "11:30", title: "Finishing with Mace, Green Chilies & Kewra" },
      { time: "12:15", title: "Plating with Ghee Polao" },
      { time: "12:45", title: "Closing & Recipe Notes" },
    ],
    productionData: {
      status: "Scripted",
      targetDuration: "13:00",
      hook: "0:00-0:20: A golden chicken leg quarter coated in a glossy, ivory-caramel gravy drizzled with ghee and garnished with crisp fried onions and golden raisins.",
      introduction: "0:20-0:50: Explaining how Bengali wedding roast differs from Western roasted chicken: it is lightly seared in ghee then braised in a nutty, aromatic gravy.",
      ingredientsVisual: "0:50-2:00: Bone-in chicken leg quarters, whipped plain yogurt, cashew-poppy seed paste, golden onion beresta, raisins, mace, nutmeg, and kewra water.",
      preparationVisual: "2:00-4:00: Making shallow diagonal incisions into the chicken; blending fried onions with yogurt and cashew paste into a luxurious silk sauce.",
      cookingVisual: "4:00-10:30: Sautéing the chicken in ghee for 90 seconds per side without browning the skin, sliding in the shahi gravy, and gently braising on medium-low heat.",
      keyTechnique: "10:30-12:00: Balancing the four taste notes: natural sweetness from onions, tang from yogurt, richness from ghee/cashews, and floral aroma from kewra and mace.",
      finalDishVisual: "12:00-13:00: Spooning the thick glaze over the chicken pieces as ghee floats like liquid amber to the surface.",
      servingVisual: "13:00-14:00: Served over a bed of fragrant Kalijira Shahi Polao, alongside chilled Borhani.",
      ctaOutro: "14:00-15:00: Encouraging viewers to prepare this for festive family dinners, with a link to the onion browning masterclass.",
      cinematographyNotes: [
        "Lush, warm lighting accentuating the golden ivory tones of the sauce.",
        "Fluid slider movement tracking the ladle pouring gravy over the chicken.",
        "Macro shots of golden raisins plumping in hot gravy.",
      ],
      voiceoverSample: "No Bengali celebration is complete without the sweet, buttery scent of Shahi Chicken Roast wafting through the banquet hall...",
      youtubeOptimizedTitle: "Authentic Biye Barir Shahi Chicken Roast (বিয়ে বাড়ির রোস্ট) | Bengali Wedding Masterclass",
      youtubeDescription: "How to make authentic Bengali wedding-style Shahi Chicken Roast.",
      shortsClips: [
        {
          title: "The Ghee Sear Secret",
          focus: "Key Cooking Technique",
          description: "Why you must never deeply brown chicken for traditional white/golden roast.",
          targetSeconds: "0:45",
        },
        {
          title: "The Silk Cashew & Beresta Gravy",
          focus: "Ingredient Preparation",
          description: "Blending golden fried onions, soaked cashews, and yogurt into silk.",
          targetSeconds: "0:40",
        },
        {
          title: "The Ghee Separation Finish",
          focus: "Final Dish Reveal",
          description: "Ghee glistening on top as whole green chilies and kewra are dropped in.",
          targetSeconds: "0:35",
        },
      ],
    },
    relatedGuides: ["how-to-properly-brown-onions-beresta", "how-to-balance-whole-spices"],
    relatedRecipes: ["chicken-rezala", "chicken-biryani"],
    relatedCulture: "bangladeshi-eid-food-traditions",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    recipeSlug: "beef-kala-bhuna",
    recipeTitle: "Authentic Chittagong Beef Kala Bhuna (চট্টগ্রামের ঐতিহ্যবাহী কালা ভুনা)",
    category: "Halal Beef",
    cuisine: "Chittagong Heritage",
    targetDuration: "15:30",
    productionStatus: "Ready for YouTube",
    seoFocusKeywords: ["Chittagong beef kala bhuna", "authentic kala bhuna recipe", "black beef curry radhuni"],
    seoTitle: "Authentic Chittagong Beef Kala Bhuna Recipe | Noakhali Kitchen",
    seoMetaDescription: "The authentic Chittagong Beef Kala Bhuna recipe: caramelized tender black beef cubes braised with mustard oil, radhuni spice, and crisp garlic.",
    youtubeOptimizedTitle: "Authentic Chittagong Beef Kala Bhuna (চট্টগ্রামের আসল কালা ভুনা) | Black Beef Masterclass",
    youtubeDescription: `The pride of Chittagong: Authentic Beef Kala Bhuna (কালা ভুনা). 
Deep, dark, and intensely caramelized—achieved entirely through patient, rhythmic frying in pure mustard oil and radhuni spice, NEVER burnt, food coloring, or bitter soya sauce.

Timestamps & Chapters:
00:00 - The Myth & Truth of Kala Bhuna
00:30 - Demystifying the Black Color (Caramelization, Not Burnt!)
01:10 - The Secret Spice: Radhuni (Wild Celery Seed)
02:40 - Stage 1: The Initial Meat Braise
06:15 - Stage 2: The Reductive Oil Frying
09:30 - Stage 3: The Traditional Baghar (Tempering)
12:10 - Color Transformation: Mahogany to Deep Black
13:45 - The Melt-in-the-Mouth Texture Test
14:40 - Traditional Chittagong Serving

Full recipe: https://noakhalikitchen.com/recipes/beef-kala-bhuna`,
    chapters: [
      { time: "00:00", title: "The Myth & Truth of Kala Bhuna" },
      { time: "00:30", title: "Demystifying the Black Color (Caramelization, Not Burnt!)" },
      { time: "01:10", title: "The Secret Spice: Radhuni (Wild Celery Seed)" },
      { time: "02:40", title: "Stage 1: The Initial Meat Braise" },
      { time: "06:15", title: "Stage 2: The Reductive Oil Frying" },
      { time: "09:30", title: "Stage 3: The Traditional Baghar (Tempering)" },
      { time: "12:10", title: "Color Transformation: Mahogany to Deep Black" },
      { time: "13:45", title: "The Melt-in-the-Mouth Texture Test" },
      { time: "14:40", title: "Traditional Chittagong Serving" },
    ],
    productionData: {
      status: "Ready for YouTube",
      targetDuration: "15:30",
      hook: "0:00-0:20: Glistening, intensely dark black-crusted beef cubes in a cast iron vessel. Two forks pull a piece apart effortlessly to reveal moist, pale pink, and succulent meat inside.",
      introduction: "0:20-0:50: Explaining how true Kala Bhuna gets its dark luster through multiple rounds of oil braising (bhunai) and onion sugar caramelization without a trace of char bitterness.",
      ingredientsVisual: "0:50-2:00: Beef chuck and boneless shank, pure cold-pressed mustard oil, radhuni (wild celery seed), black cardamom, fried onions, and whole garlic cloves.",
      preparationVisual: "2:00-4:00: Marinating beef with mustard oil, ginger-garlic paste, ground cumin, coriander, and freshly toasted radhuni powder.",
      cookingVisual: "4:00-10:30: Stage 1: Simmering meat in its natural juices until tender. Stage 2: Frying the concentrated meat in mustard oil over medium heat until the color turns dark chocolate.",
      keyTechnique: "10:30-12:00: Stage 3 (The Baghar): Sautéing sliced garlic and dried red chilies in mustard oil, then pouring this sizzling tempering over the dark beef.",
      finalDishVisual: "12:00-13:00: The meat glazes into a shiny obsidian black hue while staying tender and juicy.",
      servingVisual: "13:00-14:00: Served with flaky handmade parathas, onion rings, and lime wedges.",
      ctaOutro: "14:00-15:00: Final sign-off inviting cooks to respect the traditional slow-cook method and avoid artificial shortcuts.",
      cinematographyNotes: [
        "Carefully calibrate lighting to distinguish glossy black caramelized oil from shadows.",
        "Macro shots of the sizzling baghar tempering pouring over the beef.",
        "Authentic heavy cast iron cookware.",
      ],
      voiceoverSample: "True Kala Bhuna is a test of culinary patience. You cannot rush the alchemy that turns honest beef into black gold...",
      youtubeOptimizedTitle: "Authentic Chittagong Beef Kala Bhuna (চট্টগ্রামের আসল কালা ভুনা) | Black Beef Masterclass",
      youtubeDescription: "The definitive guide to authentic Chittagong Beef Kala Bhuna.",
      shortsClips: [
        {
          title: "How Kala Bhuna Gets Its Black Color",
          focus: "Key Cooking Technique",
          description: "Dispelling the myth of burnt meat; showing onion caramelization.",
          targetSeconds: "0:50",
        },
        {
          title: "The Sizzling Garlic Baghar",
          focus: "Sizzling Moment",
          description: "Pouring smoking mustard oil, garlic, and dried chilies over black beef.",
          targetSeconds: "0:40",
        },
        {
          title: "The Fork Tender Pull Test",
          focus: "Final Dish Reveal",
          description: "Two forks effortlessly pulling apart the dark beef cube.",
          targetSeconds: "0:30",
        },
      ],
    },
    relatedGuides: ["how-to-tenderize-beef-for-slow-cooking", "technique-slow-braising-meat-bhuna"],
    relatedRecipes: ["bengali-beef-bhuna", "bengali-beef-tehari"],
    relatedCulture: "chittagong-mezban-tradition-hospitality",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    recipeSlug: "chicken-rezala",
    recipeTitle: "Shahi Chicken Rezala (শাহী চিকেন রেজালা)",
    category: "Halal Chicken",
    cuisine: "Bengali Mughlai Royal",
    targetDuration: "14:00",
    productionStatus: "Scripted",
    seoFocusKeywords: ["Bengali chicken rezala recipe", "shahi white gravy chicken rezala", "Mughlai chicken curry yogurt"],
    seoTitle: "Authentic Bengali Shahi Chicken Rezala Recipe | Noakhali Kitchen",
    seoMetaDescription: "Authentic Kolkata and Dhaka style Shahi Chicken Rezala (চিকেন রেজালা): bone-in chicken simmered in a silky white yogurt, cashew, and poppy seed gravy.",
    youtubeOptimizedTitle: "Authentic Shahi Chicken Rezala (শাহী চিকেন রেজালা) | Silky White Mughlai Curry Masterclass",
    youtubeDescription: `Experience the royal elegance of Shahi Chicken Rezala (শাহী চিকেন রেজালা).
A luxurious ivory-white gravy perfumed with green cardamom, mace, kewra water, whole dried red chilies, and sweet makhana (fox nuts).

Timestamps & Chapters:
00:00 - The Grandeur of Shahi White Curries
00:30 - Why Rezala Has No Turmeric or Red Chili Powder
01:00 - Making the White Cashew & Poppy Seed Silk Paste
02:40 - Whipping the Yogurt Base with Ginger & Garlic Juice
04:30 - Tempering Whole Spices & Floating Dried Red Chilies
06:45 - Gentle Chicken Braising in Ivory Gravy
09:20 - Adding Makhana (Fox Nuts) & Ghee
11:15 - The Finishing Floral Infusion: Kewra & Meetha Attar
12:20 - Texture Benchmark: Silky, Creamy & Unbroken
13:10 - Serving with Rumali Roti or Shahi Polao

Full recipe: https://noakhalikitchen.com/recipes/chicken-rezala`,
    chapters: [
      { time: "00:00", title: "The Grandeur of Shahi White Curries" },
      { time: "00:30", title: "Why Rezala Has No Turmeric or Red Chili Powder" },
      { time: "01:00", title: "Making the White Cashew & Poppy Seed Silk Paste" },
      { time: "02:40", title: "Whipping the Yogurt Base with Ginger & Garlic Juice" },
      { time: "04:30", title: "Tempering Whole Spices & Floating Dried Red Chilies" },
      { time: "06:45", title: "Gentle Chicken Braising in Ivory Gravy" },
      { time: "09:20", title: "Adding Makhana (Fox Nuts) & Ghee" },
      { time: "11:15", title: "The Finishing Floral Infusion: Kewra & Meetha Attar" },
      { time: "12:20", title: "Texture Benchmark: Silky, Creamy & Unbroken" },
      { time: "13:10", title: "Serving with Rumali Roti or Shahi Polao" },
    ],
    productionData: {
      status: "Scripted",
      targetDuration: "14:00",
      hook: "0:00-0:20: Pure white porcelain bowl filled with silky ivory-white gravy, crowned with tender chicken pieces, bright red whole dried chilies, and floating puffed makhana.",
      introduction: "0:20-0:50: Explaining how the Awadhi Nawabs who settled in Bengal brought this pristine white curry, avoiding all yellow turmeric or colored chilies.",
      ingredientsVisual: "0:50-2:00: Bone-in chicken pieces, whipped whole milk yogurt, soaked cashews and white poppy seeds (posto), white pepper, mace, whole dry red chilies, and kewra water.",
      preparationVisual: "2:00-4:00: Grinding cashews and poppy seeds into an ultra-smooth paste; whipping yogurt with ginger extract and white pepper.",
      cookingVisual: "4:00-10:30: Sautéing whole spices in ghee, gently simmering chicken pieces until juices run clear, then incorporating the white cashew-yogurt paste.",
      keyTechnique: "10:30-12:00: Maintaining a low simmer to prevent the delicate yogurt gravy from curdling; adding puffed fox nuts (makhana) to absorb flavors.",
      finalDishVisual: "12:00-13:00: Adding a couple drops of kewra water and melted ghee; seeing clear golden butter floating gently on the white surface.",
      servingVisual: "13:00-14:00: Served with paper-thin rumali roti or fragrant Shahi Ghee Polao.",
      ctaOutro: "14:00-15:00: Closing thoughts on classical Mughlai technique, inviting comments on white curry recipes.",
      cinematographyNotes: [
        "Soft high-key lighting to preserve the pristine ivory tone of the gravy.",
        "Color contrast between the crimson whole dried chilies and the white sauce.",
        "Smooth top-down camera moves.",
      ],
      voiceoverSample: "Shahi Chicken Rezala is a masterclass in culinary restraint. It relies not on fiery heat, but on perfume, texture, and creaminess...",
      youtubeOptimizedTitle: "Authentic Shahi Chicken Rezala (শাহী চিকেন রেজালা) | Silky White Mughlai Curry Masterclass",
      youtubeDescription: "How to make authentic Bengali Shahi Chicken Rezala in silky white yogurt gravy.",
      shortsClips: [
        {
          title: "The Zero-Turmeric White Curry Secret",
          focus: "Key Cooking Technique",
          description: "Explaining why Rezala relies on white pepper and poppy seeds.",
          targetSeconds: "0:45",
        },
        {
          title: "Floating Dried Chilies in White Gravy",
          focus: "Sizzling Moment",
          description: "Whole red chilies sizzling gently in ghee without bursting.",
          targetSeconds: "0:40",
        },
        {
          title: "The Final Kewra & Ghee Infusion",
          focus: "Final Dish Reveal",
          description: "Drizzling aromatic ghee and kewra over the white surface.",
          targetSeconds: "0:35",
        },
      ],
    },
    relatedGuides: ["how-to-balance-whole-spices", "how-to-build-a-bangladeshi-spice-base"],
    relatedRecipes: ["bengali-chicken-roast", "chicken-biryani"],
    relatedCulture: "bangladeshi-spice-blends-and-aromatics",
    kitchenToolId: "tool-dekchi-biryani-pot",
  },
  {
    recipeSlug: "authentic-nihari",
    recipeTitle: "Authentic Beef Nihari (খাঁটি গরুর নিহারী)",
    category: "Halal Beef",
    cuisine: "Old Delhi & South Asian Royal",
    targetDuration: "16:00",
    productionStatus: "Ready for YouTube",
    seoFocusKeywords: ["authentic beef nihari recipe", "slow cooked beef shank nihari", "traditional nihari masala"],
    seoTitle: "Authentic Beef Nihari Recipe (Slow Cooked) | Noakhali Kitchen",
    seoMetaDescription: "Slow-cooked royal Beef Nihari: tender beef shanks, velvety bone marrow broth, aromatic Nihari masala, and fresh ginger-lemon garnish.",
    youtubeOptimizedTitle: "How to Cook Authentic Beef Nihari from Scratch | 6-Hour Slow Cooked Shank Masterclass",
    youtubeDescription: `The king of slow-cooked winter mornings: Authentic Beef Nihari (খাঁটি গরুর নিহারী).
Tender beef shank, silky bone marrow broth, aromatic fennel and ginger spices, and the signature velvety flour roux.

Timestamps & Chapters:
00:00 - The Tradition of the Dawn Feast (Nihar)
00:35 - Choosing Beef Shank & Marrow Bones (Nalli)
01:20 - Crafting the Nihari Masala (Fennel, Ginger & Pipli)
03:15 - Searing Meat & Blooming Whole Spices in Ghee
05:30 - The 6-Hour Gentle Simmer
09:15 - Skimming the Precious Aromatic Oil (Tari)
11:00 - Thickening with Toasted Wheat Flour Slurry (Atta)
12:45 - The Marrow Extraction (Nalli)
14:00 - Garnishing: Ginger Matchsticks, Green Chilies & Lemon
15:10 - Serving with Piping Hot Naan

Full recipe: https://noakhalikitchen.com/recipes/authentic-nihari`,
    chapters: [
      { time: "00:00", title: "The Tradition of the Dawn Feast (Nihar)" },
      { time: "00:35", title: "Choosing Beef Shank & Marrow Bones (Nalli)" },
      { time: "01:20", title: "Crafting the Nihari Masala (Fennel, Ginger & Pipli)" },
      { time: "03:15", title: "Searing Meat & Blooming Whole Spices in Ghee" },
      { time: "05:30", title: "The 6-Hour Gentle Simmer" },
      { time: "09:15", title: "Skimming the Precious Aromatic Oil (Tari)" },
      { time: "11:00", title: "Thickening with Toasted Wheat Flour Slurry (Atta)" },
      { time: "12:45", title: "The Marrow Extraction (Nalli)" },
      { time: "14:00", title: "Garnishing: Ginger Matchsticks, Green Chilies & Lemon" },
      { time: "15:10", title: "Serving with Piping Hot Naan" },
    ],
    productionData: {
      status: "Ready for YouTube",
      targetDuration: "16:00",
      hook: "0:00-0:20: Tilting a massive marrow bone over a steaming bowl of rich mahogany Nihari gravy; silky marrow slips into the sauce, topped with sizzling aromatic tari oil.",
      introduction: "0:20-0:50: Tracing Nihari back to Mughal Delhi and Lucknow, where it was cooked overnight and consumed after morning Fajr prayer.",
      ingredientsVisual: "0:50-2:00: Massive cross-cut beef shanks with bone marrow, whole wheat flour (atta), pure ghee, dry ginger powder (sonth), fennel seeds (saunf), and long pepper (pipli).",
      preparationVisual: "2:00-4:00: Toasting whole wheat flour in a dry pan until nutty; grinding fennel and whole spices into a fine fragrant Nihari masala.",
      cookingVisual: "4:00-10:30: Searing shanks in ghee, coating in spice paste, covering with water, and slow-cooking for 5-6 hours until meat shreds with a spoon.",
      keyTechnique: "10:30-12:00: Skimming the floating spiced ghee (tari) before adding the flour slurry (which would absorb the red oil), then pouring the tari back on top at serving.",
      finalDishVisual: "12:00-13:00: Ladling the velvety gravy and bone shank into a shallow bowl; tapping the bone to release the marrow.",
      servingVisual: "13:00-14:00: Crowned with needle-thin ginger matchsticks, fresh chopped cilantro, slit serrano chilies, and lime juice alongside tandoori naan.",
      ctaOutro: "14:00-15:00: Encouraging weekend slow-cooking traditions, directing to the collagen tenderization guide.",
      cinematographyNotes: [
        "Warm, deep amber tones reminiscent of morning dawn light.",
        "Macro shots of bone marrow slipping out of the bone.",
        "Slow-motion pour of the bright red spiced tari oil.",
      ],
      voiceoverSample: "Nihari is an exercise in surrender. You give hours of gentle warmth, and it gives back a broth that warms the deepest chill of winter...",
      youtubeOptimizedTitle: "How to Cook Authentic Beef Nihari from Scratch | 6-Hour Slow Cooked Shank Masterclass",
      youtubeDescription: "Step-by-step masterclass for authentic slow-cooked Beef Nihari.",
      shortsClips: [
        {
          title: "The Tari Skimming Secret",
          focus: "Key Cooking Technique",
          description: "Why you must remove the oil before adding the flour slurry.",
          targetSeconds: "0:45",
        },
        {
          title: "The Bone Marrow Tap",
          focus: "Sizzling Moment",
          description: "Tapping the giant beef shank bone to release the molten marrow.",
          targetSeconds: "0:35",
        },
        {
          title: "The Ginger & Lime Garnish Splash",
          focus: "Final Dish Reveal",
          description: "Arranging ginger matchsticks and squeezing fresh lime over the steaming bowl.",
          targetSeconds: "0:30",
        },
      ],
    },
    relatedGuides: ["how-to-tenderize-beef-for-slow-cooking", "how-to-balance-whole-spices"],
    relatedRecipes: ["bengali-beef-bhuna", "beef-kala-bhuna"],
    relatedCulture: "sacred-ethics-of-halal-food-traditions",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    recipeSlug: "chicken-karahi",
    recipeTitle: "Authentic Restaurant-Style Chicken Karahi (চিকেন কড়াই)",
    category: "Halal Chicken",
    cuisine: "Pakistani & Afghan Frontier",
    targetDuration: "12:45",
    productionStatus: "Ready for YouTube",
    seoFocusKeywords: ["authentic chicken karahi recipe", "restaurant style chicken karahi", "Peshawari chicken karahi no onions"],
    seoTitle: "Authentic Chicken Karahi Recipe (Restaurant Style) | Noakhali Kitchen",
    seoMetaDescription: "High-heat Pakistani roadside dhaba Chicken Karahi: bone-in chicken, fresh tomatoes, ginger matchsticks, and black pepper with zero onions.",
    youtubeOptimizedTitle: "Authentic Pakistani Chicken Karahi (চিকেন কড়াই) | Dhaba Style High-Heat Wok Masterclass",
    youtubeDescription: `The ultimate road-side Dhaba Chicken Karahi (চিকেন কড়াই).
Cooked over a roaring flame with zero onions, ripe tomatoes, ginger matchsticks, and freshly crushed black pepper in an authentic cast iron karahi.

Timestamps & Chapters:
00:00 - The Sizzle of the Highway Dhaba
00:20 - The Golden Rule: Absolutely No Onions!
00:50 - Searing Bone-In Chicken in Oil & Salt
02:15 - The Fresh Tomato Blanket & Peeling Trick
04:45 - The High-Heat Bhunai Reduction
07:30 - Ginger-Garlic Paste & Green Chilies
09:15 - Crushed Cumin, Coriander & Fenugreek (Kasuri Methi)
10:45 - Finishing with Fresh Coarse Black Pepper
11:40 - The Sizzling Karahi Table Service
12:15 - Serving with Hot Tandoori Roti

Full recipe: https://noakhalikitchen.com/recipes/chicken-karahi`,
    chapters: [
      { time: "00:00", title: "The Sizzle of the Highway Dhaba" },
      { time: "00:20", title: "The Golden Rule: Absolutely No Onions!" },
      { time: "00:50", title: "Searing Bone-In Chicken in Oil & Salt" },
      { time: "02:15", title: "The Fresh Tomato Blanket & Peeling Trick" },
      { time: "04:45", title: "The High-Heat Bhunai Reduction" },
      { time: "07:30", title: "Ginger-Garlic Paste & Green Chilies" },
      { time: "09:15", title: "Crushed Cumin, Coriander & Fenugreek (Kasuri Methi)" },
      { time: "10:45", title: "Finishing with Fresh Coarse Black Pepper" },
      { time: "11:40", title: "The Sizzling Karahi Table Service" },
      { time: "12:15", title: "Serving with Hot Tandoori Roti" },
    ],
    productionData: {
      status: "Ready for YouTube",
      targetDuration: "12:45",
      hook: "0:00-0:20: Intense roaring flame beneath a round-bottom carbon steel wok; tomatoes melt into a thick red glaze around golden bone-in chicken, spitting fragrant droplets of oil.",
      introduction: "0:20-0:50: Explaining how true Peshawar and Lahore style karahi relies entirely on fresh tomatoes and garlic—never chopped or pureed onions.",
      ingredientsVisual: "0:50-2:00: Small bone-in chicken cuts, vine-ripe red tomatoes, fresh ginger matchsticks, green chilies, ghee, cumin, coriander seeds, and whole black peppercorns.",
      preparationVisual: "2:00-4:00: Halving tomatoes crosswise; julienning fresh ginger into paper-thin strips; crushing whole black peppercorns coarsely in a mortar.",
      cookingVisual: "4:00-10:30: Searing chicken in hot oil with salt, placing halved tomatoes cut-side down, steaming until skin peels off effortlessly, then pounding tomatoes into a thick masala.",
      keyTechnique: "10:30-12:00: High heat bhunai (rapid reduction) to evaporate all watery tomato juice until the sauce clings tight to the chicken pieces and oil beads cleanly.",
      finalDishVisual: "12:00-13:00: Adding a shower of crushed black pepper, toasted kasuri methi, and julienned ginger right in the smoking pan.",
      servingVisual: "13:00-14:00: Served directly in the sizzling cast-iron karahi placed onto a wooden heat-trivet, alongside hot garlic naan.",
      ctaOutro: "14:00-15:00: Wrap-up inviting viewers to try high-heat wok cooking for family weeknights.",
      cinematographyNotes: [
        "Dynamic handheld feel capturing high-energy wok cooking.",
        "Macro shot of tomato skins sliding off with tongs.",
        "Steam and oil splatter captured with high shutter speed.",
      ],
      voiceoverSample: "Chicken Karahi is all about raw heat and speed. When the tomatoes reduce and the oil breaks, the flavor concentrates into pure intensity...",
      youtubeOptimizedTitle: "Authentic Pakistani Chicken Karahi (চিকেন কড়াই) | Dhaba Style High-Heat Wok Masterclass",
      youtubeDescription: "Restaurant-style Pakistani Chicken Karahi with fresh tomatoes and black pepper.",
      shortsClips: [
        {
          title: "The Tomato Peeling Trick",
          focus: "Key Cooking Technique",
          description: "Using steam to slide whole tomato skins off in 5 seconds.",
          targetSeconds: "0:40",
        },
        {
          title: "High Heat Karahi Sizzle",
          focus: "Sizzling Moment",
          description: "Rapidly tossing chicken in bubbling tomato reduction.",
          targetSeconds: "0:35",
        },
        {
          title: "Black Pepper & Ginger Crown",
          focus: "Final Dish Reveal",
          description: "Sprinkling freshly ground coarse black pepper into the hot wok.",
          targetSeconds: "0:30",
        },
      ],
    },
    relatedGuides: ["how-to-make-restaurant-style-chicken-karahi", "how-to-balance-whole-spices"],
    relatedRecipes: ["bengali-chicken-roast", "authentic-chicken-shawarma"],
    relatedCulture: "sacred-ethics-of-halal-food-traditions",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
  {
    recipeSlug: "authentic-chicken-shawarma",
    recipeTitle: "Authentic Street-Style Chicken Shawarma (চিকেন শাওয়ারমা)",
    category: "Halal Chicken",
    cuisine: "Middle Eastern & Levant",
    targetDuration: "13:45",
    productionStatus: "Ready for YouTube",
    seoFocusKeywords: ["authentic chicken shawarma recipe", "homemade chicken shawarma marinade", "halal street style shawarma toum"],
    seoTitle: "Authentic Chicken Shawarma Recipe (Street Style) | Noakhali Kitchen",
    seoMetaDescription: "Street-style Middle Eastern Chicken Shawarma: yogurt, lemon, and warm Levant spices marinated chicken thighs, crispy charred edges, and authentic garlic Toum.",
    youtubeOptimizedTitle: "Authentic Street-Style Chicken Shawarma at Home | Cast Iron & Toum Masterclass",
    youtubeDescription: `Recreate authentic Middle Eastern street-style Chicken Shawarma (চিকেন শাওয়ারমা) without a vertical rotisserie.
Tender marinated chicken thighs, charred caramelized edges, authentic garlic Toum, and wrapped in warm flatbread.

Timestamps & Chapters:
00:00 - The Irresistible Street Shawarma
00:30 - The Magic Marinade: Lemon, Yogurt & Levant Spices
01:15 - Building the Shawarma Spice Blend (Sumac & Allspice)
03:00 - Marinating Chicken Thighs for Maximum Juiciness
04:45 - The Stovetop Skillet Technique: Simulating the Spit Char
07:30 - Thin Slicing & Carving Technique
09:15 - Authentic Garlic Toum (4-Ingredient Emulsion)
11:00 - Flatbread Assembly: Meat, Toum, Pickles & Fries
12:30 - Toasty Press & Sandwich Crunch
13:15 - The Slice & Reveal

Full recipe: https://noakhalikitchen.com/recipes/authentic-chicken-shawarma`,
    chapters: [
      { time: "00:00", title: "The Irresistible Street Shawarma" },
      { time: "00:30", title: "The Magic Marinade: Lemon, Yogurt & Levant Spices" },
      { time: "01:15", title: "Building the Shawarma Spice Blend (Sumac & Allspice)" },
      { time: "03:00", title: "Marinating Chicken Thighs for Maximum Juiciness" },
      { time: "04:45", title: "The Stovetop Skillet Technique: Simulating the Spit Char" },
      { time: "07:30", title: "Thin Slicing & Carving Technique" },
      { time: "09:15", title: "Authentic Garlic Toum (4-Ingredient Emulsion)" },
      { time: "11:00", title: "Flatbread Assembly: Meat, Toum, Pickles & Fries" },
      { time: "12:30", title: "Toasty Press & Sandwich Crunch" },
      { time: "13:15", title: "The Slice & Reveal" },
    ],
    productionData: {
      status: "Ready for YouTube",
      targetDuration: "13:45",
      hook: "0:00-0:20: A sharp knife slices through a toasted, golden-striped flatbread roll; garlic toum and spiced chicken juices glisten under warm light as crisp pickled cucumbers peek through.",
      introduction: "0:20-0:50: Explaining how to achieve rotisserie-level caramelization at home using boneless chicken thighs pressed in a smoking-hot cast iron skillet.",
      ingredientsVisual: "0:50-2:00: Boneless skinless chicken thighs, Greek yogurt, fresh lemon juice, garlic cloves, sumac, cumin, coriander, allspice, cardamom, pickles, and pita or saj bread.",
      preparationVisual: "2:00-4:00: Mixing the Levant spice marinade with olive oil and lemon; pounding chicken thighs to uniform 1/2-inch thickness and marinating.",
      cookingVisual: "4:00-10:30: Searing chicken in a smoking hot skillet with a heavy weight placed on top to achieve deep blackened edges while keeping the core juicy.",
      keyTechnique: "10:30-12:00: Making authentic garlic Toum (fluffy white garlic emulsion) without egg whites, and carving the cooked chicken into razor-thin shaved strips.",
      finalDishVisual: "12:00-13:00: Rolling tightly inside flatbread and returning to the skillet for 90 seconds per side for a shatter-crisp exterior.",
      servingVisual: "13:00-14:00: Served with pickled wild cucumbers, crispy salted potato wedges, and extra toum for dipping.",
      ctaOutro: "14:00-15:00: Thanking viewers for joining the international Halal culinary journey, with links to the homemade shawarma spice guide.",
      cinematographyNotes: [
        "Sizzling macro shots of marinated chicken searing under cast iron weight.",
        "Silky food processor swirl during Toum garlic emulsification.",
        "Crisp sound of knife cutting through the toasted sandwich.",
      ],
      voiceoverSample: "The secret to street-style shawarma isn't an industrial vertical spit; it's the contrast between tender marinated chicken and deeply charred crispy edges...",
      youtubeOptimizedTitle: "Authentic Street-Style Chicken Shawarma at Home | Cast Iron & Toum Masterclass",
      youtubeDescription: "Authentic homemade Chicken Shawarma with crispy edges and garlic Toum.",
      shortsClips: [
        {
          title: "The Skillet Weight Trick",
          focus: "Key Cooking Technique",
          description: "Using a heavy skillet as a press to simulate vertical rotisserie char.",
          targetSeconds: "0:45",
        },
        {
          title: "4-Ingredient Fluffy Garlic Toum",
          focus: "Ingredient Preparation",
          description: "Garlic, salt, oil, and lemon juice turning into cloud-white cream.",
          targetSeconds: "0:40",
        },
        {
          title: "The Shawarma Sandwich Crunch",
          focus: "Final Dish Reveal",
          description: "Slicing diagonally through the toasted, crispy flatbread roll.",
          targetSeconds: "0:30",
        },
      ],
    },
    relatedGuides: ["how-to-build-homemade-shawarma-spice", "how-to-balance-whole-spices"],
    relatedRecipes: ["chicken-karahi", "hummus"],
    relatedCulture: "middle-eastern-shawarma-culinary-culture",
    kitchenToolId: "tool-iron-karahi-kadai",
  },
];
