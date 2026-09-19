import { FoodCultureArticle } from "../types";
import { IMAGES } from "./assets";

export const FOOD_CULTURE_ARTICLES: FoodCultureArticle[] = [
  {
    id: "culture-noakhali-heritage",
    slug: "heritage-of-noakhali-coastal-cooking",
    title: "The Coastal Heritage of Noakhali: Coconut, Mustard & River Catch",
    category: "Bangladeshi Food Culture",
    excerpt:
      "A deep culinary exploration into Noakhali's historic coastal foodways, where fresh grating coconuts, pungent mustard paste, and fresh river Hilsa converge.",
    content: `Situated on the fertile delta where the mighty Meghna River empties into the Bay of Bengal, the historic district of Noakhali has developed a distinctive regional food philosophy. While central Bengal relies heavily on mustard oil and onion pastes, Noakhali cooking marries the coastal sweetness of freshly grated coconut with the fiery bite of green chilies and pungent mustard.

### The Sacred Silver Hilsa
In Noakhali households, the silver Hilsa (Tenualosa ilisha) is revered as both a culinary masterpiece and a cultural emblem. During monsoon migrations, whole fish are brought fresh from river estuaries and cooked simply with freshly ground mustard seeds (shorshe bata), nigella seeds (kalo jeere), and green chili slits in cold-pressed mustard oil.

### The Sweet and Savory Coconut Balance
In dishes like Chingri Malai Curry and regional mutton braises, freshly squeezed thick coconut milk (narkeler doodh) mellows intense spices into a velvety, fragrant sauce, illustrating the coastal maritime geography of the region.`,
    heroImage: IMAGES.shorsheIlish,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 8, 2026",
    updatedDate: "September 11, 2026",
    readTimeMinutes: 7,
    relatedRecipeSlugs: ["noakhali-shorshe-ilish", "chingri-malai-curry"],
  },
  {
    id: "culture-ramadan-eid-dawat",
    slug: "ramadan-and-eid-food-traditions-bengali-table",
    title: "From Iftar to Eid Day: The Living Traditions of the Bengali Halal Table",
    category: "Ramadan & Eid Food Culture",
    excerpt:
      "How family recipes, spiced Borhani, fragrant polao, and sweet Sheer Khurma weave togetherness from the sunset Maghrib adhan to Eid celebrations.",
    content: `Ramadan and Eid-ul-Fitr transform Muslim households into sanctuaries of hospitality and generosity. The daily transition from spiritual fasting to communal Iftar is anchored by time-honored dishes that restore energy while bringing family generations to the same tablecloth.

### The Sunset Iftar Spread
Traditional Iftar begins with sun-ripened dates (Medjool or Ajwa) and chilled water in adherence to the Sunnah, followed immediately by savory lentil fritters (piyaju), spiced chickpea chaat (chotpoti or ghugni), and refreshing puffed rice mixtures (muri makha).

### Eid Morning: Sweetness and Fellowship
On Eid morning, before departure for communal prayer (Salat al-Eid), it is customary to taste a sweet preparation. In Bengali homes, delicate vermicelli cooked in sweetened whole milk with green cardamom, golden raisins, and sliced almonds (Sheer Khurma or Semai) signals the arrival of celebration. Later in the afternoon, the main banquet commences with royal Shahi Chicken Roast, fragrant Kalijeera Polao, and digestive Borhani.`,
    heroImage: IMAGES.gulabJamun,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Halal Cultural Anthropologist",
    },
    publishedDate: "August 30, 2026",
    updatedDate: "September 2, 2026",
    readTimeMinutes: 8,
    relatedRecipeSlugs: ["shahi-chicken-roast", "traditional-shahi-borhani", "halal-chicken-biryani"],
  },
  {
    id: "culture-mezban-feasts",
    slug: "chittagong-mezban-tradition-hospitality",
    title: "Chittagong Mezbani: The Grand Tradition of Community Hospitality",
    category: "Regional Foods",
    excerpt:
      "The historic tradition of Mezbani feasts in southeastern Bangladesh, where thousands are served fiery black-spice beef curry in massive copper cauldrons.",
    content: `The word 'Mezban' derives from Persian, signifying a gracious host. In the port city of Chittagong and across southeastern Bangladesh, a Mezban is a grand feast organized to honor auspicious occasions, memorial services, or community milestones.

### Cooking on Wood Fires in Giant Degchis
Mezbani beef (Mezbani Gosht) is cooked over roaring wood fires in massive copper and brass cauldrons known as 'deg'. What distinguishes authentic Mezbani beef is the complex blend of over 20 whole spices, including black stone flower (dagad phool), dried red chilies, freshly cracked mustard, and pure mustard oil, creating a dark, fiery, deeply aromatic gravy.

### The Sacred Principle of Universal Welcome
Anyone who walks through the gates of a Mezban—regardless of social standing, wealth, or background—is seated at long banqueting cloths and served generous steaming ladles of rice, beef, and spicy split-pea dal.`,
    heroImage: IMAGES.beefBhuna,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "August 22, 2026",
    updatedDate: "September 1, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["bengali-beef-bhuna", "chittagong-mezbani-beef-curry"],
  },
  {
    id: "culture-halal-ethics-table",
    slug: "sacred-ethics-of-halal-food-traditions",
    title: "Tayyib & Halal: The Ancient Ethics of Wholesome, Mindful Eating",
    category: "Halal Food Traditions",
    excerpt:
      "Moving beyond simple checklists: exploring the Quranic concept of 'Halalan Tayyiban'—food that is lawful, ethically raised, wholesome, and pure.",
    content: `In Islamic dietary jurisprudence, the Quran couples the mandate for Halal (permissible) with 'Tayyib'—meaning good, pure, wholesome, nutritious, and ethically sourced.

### The Spirit of Tayyib
A truly Tayyib culinary philosophy encompasses:
1. **Ethical Animal Stewardship:** Animals raised with humane treatment, natural forage, and free from cruelty.
2. **Environmental Stewardship (Mizan):** Reducing food waste, using sustainable cooking fats, and honoring seasonal river harvests.
3. **Gratitude at the Table:** Beginning meals with Bismillah and ending with Alhamdulillah, transforming cooking and dining into acts of mindfulness and connection.`,
    heroImage: IMAGES.heroBiryani,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist & Researcher",
    },
    publishedDate: "August 12, 2026",
    updatedDate: "August 20, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["halal-chicken-biryani", "vegetable-bhuna-khichuri"],
  },
  {
    id: "culture-role-of-rice",
    slug: "role-of-rice-in-bangladeshi-cuisine",
    title: "The Sacred Grain: The Cultural & Culinary Role of Rice in Bangladesh",
    category: "Bangladeshi Food Culture",
    excerpt:
      "From aromatic heirloom Chinigura and Kalijira to everyday parboiled Balam: why 'Machhe-Bhate Bangali' (Fish and Rice makes a Bengali) is the bedrock of civilization.",
    content: `For over two millennia, the deltaic floodplains of the Ganges, Brahmaputra, and Meghna have nurtured the world's most intricate rice culture. In Bengali, the word for meal and boiled rice is synonymous: 'Bhat'.

### The Spectrum of Bengali Rice
1. **Chinigura & Kalijira (The Fragrant Heritage Cultivars):** Tiny, pearl-like aromatic grains celebrated for their floral pandan-like aroma. These are the exclusive vehicle for Old Dhaka Beef Tehari, Shahi Polao, and Eid Morog Polao.
2. **Parboiled Rice (Siddha Chal):** Steamed before husking, retaining water-soluble B vitamins in the endosperm. This constitutes the firm, digestive everyday grain eaten alongside dal and spicy bhuna.
3. **Kacchi Basmati Integration:** Basmati gained prestige during Mughal governance in Bengal, becoming the gold standard for celebratory dum biryanis.`,
    heroImage: IMAGES.bengaliBeefTehari,
    author: {
      name: "Tariq Rahman",
      role: "Culinary Historian & Director",
    },
    publishedDate: "September 14, 2026",
    updatedDate: "September 18, 2026",
    readTimeMinutes: 7,
    relatedRecipeSlugs: ["bengali-beef-tehari", "kacchi-biryani", "chicken-biryani"],
  },
  {
    id: "culture-eid-food-traditions",
    slug: "bangladeshi-eid-food-traditions",
    title: "From Morning Shemai to Evening Biryani: Bangladeshi Eid Food Traditions",
    category: "Ramadan & Eid Food Culture",
    excerpt:
      "A complete chronicle of Eid-ul-Fitr and Eid-ul-Adha culinary rituals across Bengali households—from vermicelli milk puddings to whole-spiced meat feasts.",
    content: `Eid in Bangladesh is an all-day sensory celebration shaped by hospitality and sacred charity.

### Eid-ul-Fitr: The Morning Sweet Awakening
The post-prayer table begins with sweet preparations before any savory dish is touched:
- **Doodh Shemai:** Fine roasted vermicelli simmered slowly in whole milk reduced to rabri consistency, scented with green cardamom, golden raisins, and sliced almonds.
- **Jorda Shemai:** Dry-cooked ghee-roasted vermicelli tossed with grated coconut, kewra water, and saffron.
- **Morog Polao & Shahi Roast:** Afternoon family gatherings feature rich Shahi Chicken Roast accompanied by fragrant ghee-kissed Kalijira polao and chilled Borhani.

### Eid-ul-Adha: The Great Meat Festival
Eid-ul-Adha honors the sacrificial offering. Freshly distributed meat is cooked in colossal brass dekchis throughout the neighborhood:
- **Morning Kolija Bhuna:** Spiced liver fry served with piping-hot handmade luchi or parathas.
- **Evening Beef Bhuna & Mezban:** Thick, deeply caramelized beef curries simmered for hours with mustard oil, radhuni, and garlic.`,
    heroImage: IMAGES.kacchiBiryani,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 12, 2026",
    updatedDate: "September 17, 2026",
    readTimeMinutes: 7,
    relatedRecipeSlugs: ["kacchi-biryani", "bengali-chicken-roast", "bengali-beef-bhuna"],
  },
  {
    id: "culture-ramadan-traditions",
    slug: "ramadan-cooking-traditions-iftar-to-sehri",
    title: "Chola, Piyaju & Shahi Haleem: Ramadan Traditions Across Bangladesh",
    category: "Ramadan & Eid Food Culture",
    excerpt:
      "Explore the vibrant dusk gatherings of Chawkbazar and home kitchens: from crisp lentil fritters to slow-simmered spiced mutton haleem and wholesome Sehri.",
    content: `During the holy month of Ramadan, Bengali street corners and family tables transform into aromatic communal feasts as the Maghrib adhan approaches.

### The Iconic Dhaka Iftar Platter
An authentic Bengali Iftar brings together distinct hot, savory, and cooling components:
- **Bhut Chola:** Brown Bengal chickpeas braised with finely diced ginger, green chilies, and roasted cumin.
- **Piyaju & Beguni:** Shatter-crisp red lentil fritters studded with onions and thin eggplant slices dipped in seasoned gram flour batter.
- **Old Dhaka Shahi Haleem:** A velvety, twelve-hour slow-cooked stew of seven lentils, cracked wheat, and tender shredded bone-in mutton, finished with ginger slivers and lime juice.
- **Nutritious Sehri:** Pre-dawn meals focus on sustained slow energy—plain parboiled rice, fresh river fish curry (jhol), and wholesome masoor dal.`,
    heroImage: IMAGES.chickenBiryani,
    author: {
      name: "Dr. Aaminah Siddiqui",
      role: "Food Scientist",
    },
    publishedDate: "September 10, 2026",
    updatedDate: "September 16, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["chicken-biryani", "bengali-beef-bhuna", "authentic-nihari"],
  },
  {
    id: "culture-bangladeshi-spices",
    slug: "bangladeshi-spice-blends-and-aromatics",
    title: "Radhuni, Mustard & Panch Phoron: The Indigenous Spices of Bangladesh",
    category: "Bangladeshi Food Culture",
    excerpt:
      "Beyond standard garam masala: why wild celery seed (radhuni), pungent brassica seeds, and the legendary five-spice blend define Eastern Bengali terroir.",
    content: `While North Indian cooking relies heavily on heavy creams and dried mango powder, Bangladeshi cuisine is anchored in maritime river humidity, indigenous seed crops, and pungent cold-pressed mustard oil.

### The 3 Indigenous Flavor Anchors
1. **Radhuni (Wild Celery / Trachyspermum roxburghianum):** Extremely aromatic seeds resembling ajwain but carrying a pungent parsley-like herbal sharpness. It is the irreplaceable soul of Chittagong Mezban beef and traditional fish curries.
2. **Pure Ghani Mustard Oil (Shorsher Tel):** Cold-pressed from black and yellow brassica seeds, releasing sinus-clearing allyl isothiocyanate when heated.
3. **Panch Phoron (The Bengali Five-Spice):** An equal-weight whole seed blend of fenugreek, nigella, cumin, black mustard, and fennel seeds tempered whole in hot oil to create an instantaneous savory release.`,
    heroImage: IMAGES.beefKalaBhuna,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 8, 2026",
    updatedDate: "September 15, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["beef-kala-bhuna", "bengali-beef-bhuna", "chicken-rezala"],
  },
  {
    id: "culture-shawarma-history",
    slug: "middle-eastern-shawarma-culinary-culture",
    title: "The Rotating Spit: The Culinary Evolution of Levant Shawarma",
    category: "Halal Food Traditions",
    excerpt:
      "Tracing the vertical rotisserie from Ottoman Bursa to the lively street stalls of Damascus, Beirut, and Jerusalem.",
    content: `The term 'Shawarma' stems from the Turkish word 'çevirme', meaning 'turning'—referencing meat roasted on a vertical rotisserie.

### The Architecture of Levant Street Shawarma
1. **The Inverted Cone:** Thinly sliced, deeply marinated chicken thighs or lamb flank are layered tightly into an inverted conical stack on a vertical spit, topped with sheep's tail fat that bastes the meat continuously as it turns against gas or wood flames.
2. **The Shaving Technique:** A razor-sharp long knife shears paper-thin caramelized ribbons from the rotating exterior, capturing both tender meat and charred edges.
3. **The Authentic Wrap:** Wrapped tightly inside paper-thin Saj or Markook flatbread, dressed strictly with authentic garlic Toum (emulsified garlic, oil, lemon juice, and salt), pickled cucumbers, and french fries. In Levant tradition, lettuce, cabbage, and processed mayo are considered culinary deviations.`,
    heroImage: IMAGES.authenticChickenShawarma,
    author: {
      name: "Chef Tariq Rahman",
      role: "Culinary Director",
    },
    publishedDate: "September 6, 2026",
    updatedDate: "September 14, 2026",
    readTimeMinutes: 6,
    relatedRecipeSlugs: ["authentic-chicken-shawarma", "chicken-karahi", "hummus"],
  },
];
