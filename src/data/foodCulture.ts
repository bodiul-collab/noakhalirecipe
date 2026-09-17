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
];
