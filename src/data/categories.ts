import { CategoryHub } from "../types";
import { IMAGES } from "./assets";

export const CATEGORIES: CategoryHub[] = [
  {
    id: "cat-chicken",
    slug: "halal-chicken",
    title: "Halal Chicken",
    shortDescription: "Juicy curries, aromatic biryanis, crispy roast chicken, and easy family weeknight meals.",
    fullDescription:
      "Explore comforting Halal poultry recipes from across Bengal, South Asia, and the Mediterranean. Every recipe utilizes hand-slaughtered or certified Halal chicken cuts, cooked with authentic aromatics, rich natural stocks, and balanced spices.",
    image: IMAGES.heroBiryani,
    featuredRecipeSlugs: ["authentic-arabian-chicken-mandi", "authentic-saudi-chicken-kabsa", "classic-deli-halal-chicken-salad", "tom-zaab-chicken-soup-tom-zaab-gai", "thai-chicken-red-curry-gaeng-phed-gai", "halal-chicken-biryani", "chicken-satay-satay-gai", "shahi-chicken-roast", "chicken-massaman-curry"],
    faqs: [
      {
        question: "How do I verify chicken is Halal when shopping?",
        answer:
          "Always look for reputable Halal certification marks on commercial packaging (such as HFSAA, HMC, ISNA, or local Islamic councils). When shopping at local butcher shops, confirm they source hand-slaughtered zabiha meat.",
      },
      {
        question: "What chicken cuts work best for slow curries?",
        answer:
          "Bone-in thigh and drumstick cuts retain superior moisture and flavor during long simmering compared to boneless breasts, which tend to dry out.",
      },
    ],
    halalPointers: [
      "Confirm processing plants use no mechanical stunning or non-halal water scalding tanks.",
      "Verify marinades containing yogurt or sauces use alcohol-free flavorings.",
    ],
  },
  {
    id: "cat-beef",
    slug: "halal-beef",
    title: "Halal Beef",
    shortDescription: "Slow-braised beef bhuna, fragrant tehari, tender kebabs, and hearty stews.",
    fullDescription:
      "From melt-in-your-mouth slow-braised Bengali beef bhuna to Dhaka-style beef tehari and rich bone marrow curries, our Halal beef collection celebrates deep caramelized flavors and patient cooking techniques.",
    image: IMAGES.beefBhuna,
    featuredRecipeSlugs: ["birria-tacos-beef-quesabirria-consome", "kofta-tagine-with-eggs-middle-eastern-flavors", "chittagong-mezbani-beef-curry", "kibbeh-lebanese-fried-bulgur-stuffed-shells", "classic-baked-beef-lasagna-bolognese", "patlican-kebabi-turkish-eggplant-kebab", "turkish-lamb-chops-kuzu-pirzola", "turkish-izgara-kofte-kebab", "bengali-beef-bhuna", "adana-kebab-hand-minced-lamb", "yogurt-kebab-yogurtlu-kebap"],
    faqs: [
      {
        question: "Which beef cuts are best for Bengali bhuna?",
        answer:
          "Beef chuck roast, shank, and brisket with a small amount of marbled fat produce the most luscious, fork-tender results when cooked low and slow.",
      },
    ],
    halalPointers: [
      "Ensure all gelatin in commercial stocks is pure Halal-certified beef gelatin or cook with real bones.",
      "Never use red wine or alcohol reductions—substitute with pomegranate molasses, tamarind, or balsamic glaze.",
    ],
  },
  {
    id: "cat-seafood",
    slug: "halal-seafood",
    title: "Halal Fish & Seafood",
    shortDescription: "Signature Noakhali Shorshe Ilish, mustard fish steaks, and jumbo prawn coconut curries.",
    fullDescription:
      "Fresh river fish and coastal seafood hold an esteemed place in regional Halal heritage dining. Our collection features revered silver Hilsa (Ilish) in golden mustard gravy, tender tiger prawns in coconut cream, and crisp pan-fried seasonal catch seasoned with five-spice panch phoron.",
    image: IMAGES.shorsheIlish,
    featuredRecipeSlugs: ["green-goddess-wild-salmon-asparagus-bowl", "noakhali-shorshe-ilish", "chingri-malai-curry", "tom-yum-soup-goong-gai"],
    faqs: [
      {
        question: "Are all types of fish and seafood Halal?",
        answer:
          "In the mainstream Islamic juristic schools, all fish with scales (such as Hilsa / Ilish, Salmon, Cod, Trout) are universally Halal. Prawns/shrimp are permitted by the vast majority of scholars. For other shellfish or marine animals, consult your personal school of thought (madhab).",
      },
    ],
    halalPointers: [
      "Hilsa (Ilish) is naturally scaled and 100% Halal; verify cooking oils and mustard pastes are free from cross-contamination.",
      "Verify that batters and frying oils are free from cross-contamination with non-halal ingredients.",
    ],
  },
  {
    id: "cat-kids-meal",
    slug: "halal-kids-meal",
    title: "Halal Kids Meal",
    shortDescription: "Crispy baked chicken tenders, mild cheesy pasta, lunchbox bites, and wholesome family favorites.",
    fullDescription:
      "Nutritious, fun, and 100% Halal kid-friendly meals designed to delight picky eaters while giving parents complete peace of mind. Every recipe features balanced seasonings, hidden veggies, verified Halal proteins, and zero synthetic additives.",
    image: IMAGES.kidsMeal,
    featuredRecipeSlugs: [
      "crispy-halal-chicken-tenders",
      "cheesy-halal-beef-sliders",
      "kids-chicken-corn-fried-rice",
      "baked-turkey-mac-cheese-cups",
      "mini-chicken-kofta-skewers",
      "crunchy-halal-fish-nuggets",
    ],
    faqs: [
      {
        question: "How do you make Halal kids meals appealing to picky eaters?",
        answer:
          "Keep spices mild and familiar (like sweet paprika, garlic, mild turmeric, and yogurt marinades). Interactive dipping sauces and crispy textures are always a hit with little ones.",
      },
      {
        question: "Are store-bought frozen nuggets always Halal?",
        answer:
          "Not unless explicitly certified Halal. Conventional commercial nuggets often contain non-halal animal fats, broth powders, or cross-contaminated fryer oils. Homemade baked tenders are 100% transparent and healthier.",
      },
    ],
    halalPointers: [
      "Check commercial breadcrumbs for non-halal shortening or animal L-cysteine (E920).",
      "Ensure dipping sauces (like honey mustard or BBQ) contain no wine vinegars or alcohol extracts.",
    ],
  },
  {
    id: "cat-vegetarian",
    slug: "halal-vegetarian",
    title: "Halal Vegetarian",
    shortDescription: "Vibrant lentil dals, spiced cauliflower, rich paneer curries, and comforting khichuri.",
    fullDescription:
      "Pure, nourishing plant-based dishes made with wholesome legumes, cold-pressed mustard oil, whole spices, and garden-fresh vegetables. Completely free from animal byproducts and naturally pork-free.",
    image: IMAGES.vegBhunaKhichuri,
    featuredRecipeSlugs: ["crispy-garlic-herb-roasted-potatoes", "pillowy-restaurant-style-garlic-butter-naan", "rainbow-roasted-beet-whipped-goat-cheese-salad", "panera-style-halal-broccoli-cheddar-soup", "crispy-zaatar-chickpea-halloumi-glow-salad", "vegetable-bhuna-khichuri"],
    faqs: [
      {
        question: "Do vegetarian dishes ever contain non-halal ingredients?",
        answer:
          "Yes! Certain commercial cheeses use animal rennet derived from non-halal slaughter, and confectionery items may contain non-halal gelatin or carmine (E120). We ensure all dairy and ingredients used are vegetarian-rennet and Halal verified.",
      },
    ],
    halalPointers: [
      "Look for microbial or vegetarian rennet when buying paneer or melting cheeses.",
    ],
  },
  {
    id: "cat-rice-curry",
    slug: "halal-rice-curry",
    title: "Halal Rice & Curry",
    shortDescription: "Aromatic pilafs, festive biryanis, khichuri, and foundational savory curries.",
    fullDescription:
      "The staple combination that anchors Bengali and South Asian hospitality. Learn the fine art of blooming whole spices in pure ghee, parboiling basmati rice, and creating layered gravies that bring families together.",
    image: IMAGES.chickenRoast,
    featuredRecipeSlugs: ["authentic-arabian-chicken-mandi", "authentic-saudi-chicken-kabsa", "pillowy-restaurant-style-garlic-butter-naan", "halal-chicken-biryani", "vegetable-bhuna-khichuri"],
    faqs: [
      {
        question: "What rice variety gives the most authentic aroma?",
        answer:
          "Kalijeera (also known as baby basmati or Gobindobhog) gives an intoxicating natural aroma, while aged 1121 sella basmati yields the longest individual grains.",
      },
    ],
    halalPointers: [
      "Use pure cow ghee verified without animal tallow adulteration.",
    ],
  },
  {
    id: "cat-snacks",
    slug: "halal-snacks",
    title: "Halal Snacks",
    shortDescription: "Crispy samosas, spiced shingaras, vegetable pakoras, and afternoon tea snacks.",
    fullDescription:
      "Snack time in Muslim households is a lively affair of spiced pastry triangles, hot fried fritters, and sweet chutneys served alongside cardamom milk tea (chai).",
    image: IMAGES.streetFood,
    featuredRecipeSlugs: ["birria-tacos-beef-quesabirria-consome", "kibbeh-lebanese-fried-bulgur-stuffed-shells", "traditional-teler-pitha-gur-pitha", "crispy-halal-samosas"],
    faqs: [
      {
        question: "Can samosas be prepared in advance?",
        answer: "Yes! Fold and fill samosas, freeze them on a flat sheet pan until solid, then fry straight from frozen.",
      },
    ],
    halalPointers: [
      "Commercial pastry sheets may contain animal L-cysteine (dough conditioner E920); verify vegetarian or synthetic origin.",
    ],
  },
  {
    id: "cat-desserts",
    slug: "halal-desserts",
    title: "Halal Desserts",
    shortDescription: "Fragrant sheer khurma, saffron kheer, cardamom firni, and rose sweets.",
    fullDescription:
      "Celebrate sweet milestones with luxurious Eid desserts perfumed with green cardamom, saffron threads, pistachios, and thickened whole milk. All made without non-halal gelatin or alcohol-based vanilla extracts.",
    image: IMAGES.gulabJamun,
    featuredRecipeSlugs: ["traditional-teler-pitha-gur-pitha", "traditional-vapa-pitha-steamed-coconut-jaggery", "milk-powder-burfi-quick-mawa-fudge", "shahi-besan-laddu", "basbousa-semolina-cake", "mango-coconut-burfi", "crispy-saffron-jalebi", "shahi-gulab-jamun", "kheer-shahi-rice-kheer-payesh", "royal-gajar-ka-halwa", "bengali-roshogolla"],
    faqs: [
      {
        question: "Is vanilla extract Halal?",
        answer:
          "Standard vanilla extract in grocery stores is extracted in alcohol (at least 35% ethyl alcohol). Use alcohol-free vanilla flavor, whole vanilla bean pods, or vanilla powder.",
      },
    ],
    halalPointers: [
      "Substitute gelatin with agar-agar (seaweed extract) in mousses and jellies.",
    ],
  },
  {
    id: "cat-street-food",
    slug: "halal-street-food",
    title: "Halal Street Food",
    shortDescription: "Fuchka, chotpoti, spicy beef rolls, authentic pad thai, and sizzling seekh kebabs.",
    fullDescription:
      "Transport your kitchen to the bustling night markets of Bangkok, Dhaka, Chittagong, and Old Delhi with street foods bursting with tangy tamarind, roasted cumin, and fiery green chilies.",
    image: IMAGES.padThai,
    featuredRecipeSlugs: ["thai-style-papaya-salad-som-tum", "authentic-halal-pad-thai", "chicken-satay-satay-gai", "crispy-halal-samosas"],
    faqs: [
      {
        question: "What is the key spice in street food?",
        answer: "Black salt (bit lobon) and roasted cumin give street chaats their signature umami and pungent zing.",
      },
    ],
    halalPointers: [
      "Street meat must be sourced from certified Halal butcheries.",
    ],
  },
  {
    id: "cat-meal-prep",
    slug: "halal-meal-prep",
    title: "Halal Meal Prep",
    shortDescription: "High-protein Halal bowls, batch-cooked curries, freezer-friendly stews, and grab-and-go workweek lunches.",
    fullDescription:
      "Save hours during busy workweeks, university semesters, and family routines with smart Halal batch-cooking strategies. From spiced sheet-pan chicken shawarma bowls with golden turmeric rice to Moroccan harissa beef meatballs and slow-simmered stews, our meal prep guides ensure healthy, flavorful, 100% Halal lunches and dinners every single day.",
    image: IMAGES.mealPrep,
    featuredRecipeSlugs: [
      "halal-sheet-pan-shawarma-bowls",
      "moroccan-harissa-beef-meatballs-prep",
      "bengali-beef-bhuna",
      "halal-chicken-biryani",
    ],
    faqs: [
      {
        question: "How long do cooked Halal meat curries and prep bowls last in the fridge?",
        answer:
          "Cooked beef, chicken, and lamb dishes safely stay fresh for 4 to 5 days when cooled promptly and stored in airtight glass containers below 40°F (4°C).",
      },
      {
        question: "What is the best way to reheat meal prep without drying out the meat?",
        answer:
          "Cover the container loosely with a damp paper towel or silicone lid, sprinkle 1 teaspoon of water over the rice, and microwave in 60-second bursts at medium-high power (70-80%). Alternatively, reheat in a covered skillet over medium-low heat.",
      },
      {
        question: "Can I freeze cooked Halal rice and meats together?",
        answer:
          "Yes! Spiced basmati rice, beef bhuna, and grilled chicken freeze beautifully for up to 3 months. Portion into freezer-safe glass or BPA-free containers with 1/2 inch headspace.",
      },
    ],
    halalPointers: [
      "Ensure all pre-made marinades, harissa pastes, and commercial sauces are certified free from cooking wines and non-halal animal thickeners.",
      "Ask your Halal butcher for lean cuts and vacuum-seal portions for bulk freezer storage.",
      "Store fresh sauces (like garlic toum or herb tahini) in separate 1-oz condiment cups to prevent sogginess.",
    ],
  },
  {
    id: "cat-drinks",
    slug: "halal-drinks",
    title: "Halal Drinks & Beverages",
    shortDescription: "Refreshing Borhani, velvety mango lassi, royal Rooh Afza sharbat, Karak chai, and mint lemonades.",
    fullDescription:
      "Discover revitalizing, traditional, and celebratory 100% Halal drinks from across the Islamic world. From the iconic spiced yogurt Borhani served at royal weddings and Eid feasts, to luscious Alphonso mango lassi, aromatic rose-infused Rooh Afza sharbat with bloomed basil seeds, spiced Gulf Karak chai, and chilled Levantine mint limonana. Prepared with wholesome fresh herbs, real fruit, pure honey, and certified alcohol-free flavors.",
    image: IMAGES.halalDrinks,
    featuredRecipeSlugs: [
      "traditional-shahi-borhani",
      "royal-mango-lassi",
      "royal-rooh-afza-sharbat",
      "karak-chai-spiced-milk-tea",
      "mint-limonana-lemonade",
    ],
    faqs: [
      {
        question: "Are all commercial mocktails and syrups automatically Halal?",
        answer:
          "Not always. Many commercial syrups, cocktail mixes, and fruit concentrates use ethyl alcohol as a flavor carrier solvent, or contain carmine (E120, derived from cochineal insects) for red color. Our recipes rely on 100% natural, alcohol-free ingredients and verified Halal syrups.",
      },
      {
        question: "What makes traditional Borhani the ultimate accompaniment to biryani?",
        answer:
          "Borhani combines creamy whole milk yogurt with digestive spices—roasted cumin, black salt (bit lobon), fresh mint, coriander, and yellow mustard—creating a tangy, probiotic-rich drink that naturally balances heavy festive meats and ghee-laden rice.",
      },
      {
        question: "Can I make dairy-free Halal drinks?",
        answer:
          "Yes! For Borhani and lassis, unsweetened coconut yogurt or oat yogurt works wonderfully with the same spice and herb ratios.",
      },
    ],
    halalPointers: [
      "Avoid vanilla or flavor extracts dissolved in alcohol; use alcohol-free extracts, whole vanilla beans, or fragrant rose water.",
      "Check that yogurts, kefirs, and dairy bases use microbial cultures without non-halal gelatin thickeners.",
      "Verify that bottled fruit juices do not use animal-derived gelatin or isinglass clarifying agents.",
    ],
  },
];
