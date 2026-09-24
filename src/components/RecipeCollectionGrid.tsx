import React, { useRef, useState } from "react";
import { IMAGES } from "../data/assets";

export interface CollectionCardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  heritageTag: string;
  brandName: string;
  halalBadge: string;
  image: string;
}

interface RecipeCollectionGridProps {
  onSelectRecipeBySlug?: (slug: string) => void;
  cards?: CollectionCardItem[];
}

const DEFAULT_COLLECTION: CollectionCardItem[] = [
  {
    id: "card-shorshe-ilish",
    slug: "noakhali-shorshe-ilish",
    title: "Noakhali Shorshe Ilish (Hilsa in Golden Mustard Gravy)",
    description:
      "Steamed hilsa steaks in golden stone-ground mustard paste, nigella seeds & cold-pressed mustard oil.",
    heritageTag: "✨ Signature Heritage Dish",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.shorsheIlish,
  },
  {
    id: "card-beef-bhuna",
    slug: "bengali-beef-bhuna",
    title: "Bengali Beef Bhuna (বাঙালি স্টাইল গরুর মাংসের ভুনা)",
    description:
      "Melt-in-your-mouth Halal beef simmered in a dark, intensely caramelized onion and roasted spice gravy.",
    heritageTag: "🔥 Chef's Special",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.bengaliBeefBhuna,
  },
  {
    id: "card-chingri-malai",
    slug: "chingri-malai-curry",
    title: "Chingri Malaikari",
    description:
      "Jumbo prawns cooked in a creamy, velvety coconut milk gravy flavored with whole spices.",
    heritageTag: "✨ Traditional Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.chingriMalai,
  },
  {
    id: "card-bengali-beef-tehari",
    slug: "bengali-beef-tehari",
    title: "Bengali Beef Tehari (পুরান ঢাকার বিফ তেহারি)",
    description:
      "Fragrant Chinigura rice cooked in mustard oil with tender halal beef morsels, golden potatoes & green chilies.",
    heritageTag: "🍛 Old Dhaka Legend",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.bengaliBeefTehari,
  },
  {
    id: "card-bengali-chicken-curry",
    slug: "bengali-chicken-curry-murgir-jhol",
    title: "Bengali chicken curry (বাঙালি মুরগির মাংসের ঝোল)",
    description:
      "Tender bone-in chicken and golden fried potatoes simmered in an aromatic spiced mustard oil gravy.",
    heritageTag: "🍗 Weekend Comfort",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.bengaliChickenCurry,
  },
  {
    id: "card-bengali-chicken-roast",
    slug: "bengali-chicken-roast",
    title: "Dhaka Shahi Chicken Roast (বিয়ে বাড়ির শাহী চিকেন রোস্ট)",
    description:
      "Tender chicken quarters seared in ghee and slow-braised in a velvety yogurt, onion & cashew nut gravy.",
    heritageTag: "👑 Biye Bari Shahi Feast",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.bengaliChickenRoast,
  },
  {
    id: "card-bengali-fish-curry",
    slug: "bengali-fish-curry-macher-jhol",
    title: "Bengali fish curry (বাঙালি মাছের ঝোল)",
    description:
      "Crisp pan-fried fresh fish steaks, cauliflower florets, and potato wedges simmered in a light cumin-ginger broth.",
    heritageTag: "🐟 Maache-Bhaate Bangali",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.bengaliFishCurry,
  },
  {
    id: "card-bengali-khichuri-bhuna",
    slug: "bengali-khichuri-bhuna",
    title: "Bengali Khichuri Bhuna (বাংলা খিচুড়ি ভুনা)",
    description:
      "Aromatic Chinigura rice and roasted moong dal sautéed in pure cow ghee and mustard oil with ginger & spices.",
    heritageTag: "🌧️ Monsoon Comfort Staple",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.bengaliKhichuriBhuna,
  },
  {
    id: "card-bengali-pulao",
    slug: "bengali-pulao",
    title: "Bengali Pulao (বাঙালি পোলাও / Basanti Pulao)",
    description:
      "Aromatic Chinigura rice with saffron, ghee, whole star anise, golden cashews & raisins for festive feasts.",
    heritageTag: "👑 Biye Bari Shahi Rice",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.bengaliPulao,
  },
  {
    id: "card-chicken-biryani",
    slug: "chicken-biryani",
    title: "Chicken Biryani (চিকেন বিরিয়ানি)",
    description:
      "Royal layered dum biryani with succulent chicken drumsticks, aged basmati rice, star anise, saffron & mint.",
    heritageTag: "✨ Crown Jewel Feast",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.chickenBiryani,
  },
  {
    id: "card-authentic-nihari",
    slug: "authentic-nihari",
    title: "Authentic Nihari (মুঘলাই শাহী নলি নিহারী)",
    description:
      "Slow-simmered beef shank & marrow bones braised in pure ghee, fennel & royal spices with glistening rogan.",
    heritageTag: "🍲 Royal Mughal Stew",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.authenticNihari,
  },
  {
    id: "card-haleem",
    slug: "haleem",
    title: "Haleem (হালিম / Shahi Beef Haleem)",
    description:
      "Royal slow-braised beef pounded with five lentils, cracked wheat, barley & Chinigura rice with ghee tarka.",
    heritageTag: "🌙 Shahi Iftar Banquet",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.haleem,
  },
  {
    id: "card-chicken-karahi",
    slug: "chicken-karahi",
    title: "Chicken Karahi (চিকেন কড়াই)",
    description:
      "Sizzling bone-in Halal chicken stir-fried over roaring flame with ripe tomatoes, ginger matchsticks & green chilies.",
    heritageTag: "🔥 Sizzling Wok Karahi",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.chickenKarahi,
  },
  {
    id: "card-seekh-kebab",
    slug: "seekh-kebab",
    title: "Seekh Kebab (শিখ কাবাব)",
    description:
      "Succulent flame-charred Halal beef skewers with aromatic spices, mint raita, pickled onions & ghee baste.",
    heritageTag: "🍢 Charcoal Grill Special",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.seekhKebab,
  },
  {
    id: "card-authentic-chicken-shawarma",
    slug: "authentic-chicken-shawarma",
    title: "Chicken Shawarma (চিকেন শাওয়ার্মা)",
    description:
      "Tender yogurt-marinated spiced chicken seared crisp, wrapped in warm pita with garlic toum, pickles & veggies.",
    heritageTag: "🌯 Levantine Street Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.authenticChickenShawarma,
  },
  {
    id: "card-crispy-falafel",
    slug: "crispy-falafel",
    title: "Crispy Falafel (ক্রিস্পি ফালাফেল)",
    description:
      "Golden, shatteringly crisp chickpea fritters packed with fresh green herbs, cumin, coriander & sesame with lemon tahini.",
    heritageTag: "🌱 Plant-Based Mezze Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.crispyFalafel,
  },
  {
    id: "card-hummus",
    slug: "hummus",
    title: "Hummus (আসল হুমুস)",
    description:
      "Silky whipped chickpeas with pure sesame tahini, fresh lemon & ice water, pooled with golden extra virgin olive oil.",
    heritageTag: "🫒 Artisanal Mezze Dip",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.hummus,
  },
  {
    id: "card-black-chana",
    slug: "black-chana",
    title: "Black Chana (কালো ছোলা)",
    description:
      "Tender desi black chickpeas sautéed in mustard oil with caramelized onions, roasted cumin & clingy masala glaze.",
    heritageTag: "🌙 Ramadan Iftar Staple",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.blackChana,
  },
  {
    id: "card-chicken-patty",
    slug: "chicken-patty",
    title: "Chicken Patty crisp and flaky (চিকেন প্যাটি)",
    description:
      "Golden all-butter puff pastry turnovers stuffed with spiced minced chicken, caramelized onions & kalonji seeds.",
    heritageTag: "🥐 Bakery-Style Ramadan Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.chickenPatty,
  },
  {
    id: "card-dal-piyaju",
    slug: "dal-piyaju-pakora",
    title: "Dal piyajo Pakoda Pakora (ডালের পেঁয়াজু)",
    description:
      "Audibly crunchy red lentil and onion fritters fried to golden blistered perfection with tamarind and mint chutney.",
    heritageTag: "✨ Iconic Ramadan Iftar Fritter",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.dalPiyaju,
  },
  {
    id: "card-narkel-puli",
    slug: "narkel-puli-pitha",
    title: "Narkel Puli Pitha Coconut Dumpling (নারকেলের পুলি পিঠা)",
    description:
      "Porcelain-white pillowy steamed rice dumplings stuffed with fragrant date palm jaggery caramelized coconut & green cardamom.",
    heritageTag: "🥥 Traditional Bengali Heritage Sweet",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.narkelPuliPitha,
  },
  {
    id: "card-bengali-aloo-dum",
    slug: "bengali-aloo-dum",
    title: "Bengali Aloo Dum (বাঙালি আলুর দম / ألو دوم / بنگالی آلو دم)",
    description:
      "Golden fried baby potatoes slow-braised in a fragrant tomato-yogurt gravy with panch phoron and roasted bhaja masala, served alongside puffed hot luchis.",
    heritageTag: "🥔 Timeless Bengali Heritage Dum & Luchi",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Vegetarian",
    image: IMAGES.bengaliAlooDum,
  },
  {
    id: "card-shrimp-green-bean-stir-fry",
    slug: "bangladeshi-spiced-shrimp-and-green-bean-stir-fry",
    title: "Bangladeshi Spiced Shrimp & Green Bean Stir-Fry (চিংড়ি বরবটি ভাজি)",
    description:
      "Plump golden turmeric-seared shrimp flash-tossed with crisp green beans, caramelized onions, green chilies, and fresh cilantro.",
    heritageTag: "🍤 Homestyle Bengali Seafood & Garden Bhaji",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Wild Shrimp",
    image: IMAGES.bangladeshiSpicedShrimpGreenBeanStirFry,
  },
  {
    id: "card-moroccan-lamb-tagine",
    slug: "moroccan-lamb-tagine",
    title: "Authentic Moroccan Lamb Tagine (with Sweet Prunes & Toasted Almonds)",
    description:
      "Tender braised bone-in lamb shanks slow-simmered with Ras el Hanout, saffron, honey-glazed prunes, and toasted slivered almonds over fluffy couscous.",
    heritageTag: "🏺 Royal Moroccan & Maghrebi Heritage Tagine",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Lamb Shanks",
    image: IMAGES.moroccanLambTagine,
  },
  {
    id: "card-beef-nahari",
    slug: "beef-nahari",
    title: "Beef Nahari (بیف نہاری / গরুর মাংসের নিহারি)",
    description:
      "Royal Mughal slow-cooked beef shank and bone marrow stew in a velvety, spiced bone broth crowned with ginger juliennes, green chilies, and lemon.",
    heritageTag: "🍲 Royal Mughal & Old City Heritage Stew",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Shank & Marrow",
    image: IMAGES.beefNahari,
  },
  {
    id: "card-authentic-bangladeshi-beef-curry",
    slug: "authentic-bangladeshi-beef-curry",
    title: "Authentic Bangladeshi Beef Curry (গরুর মাংসের কারি)",
    description:
      "Tender slow-simmered beef chunks enveloped in a velvety caramelized onion gravy with whole spices and glistening ruby-red spiced tori oil.",
    heritageTag: "🥩 Iconic Bengali & Desi Celebration Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified Beef",
    image: IMAGES.bangladeshiBeefCurry,
  },
  {
    id: "card-chicken-lo-mein",
    slug: "chicken-lo-mein",
    title: "Chicken Lo Mein (চিকেন লো মেইন)",
    description:
      "Tender egg noodles tossed in a sizzling wok with sliced chicken, bell peppers, carrots, and cabbage in a luscious savory dark soy-garlic glaze.",
    heritageTag: "🥢 Chinese Wok Takeout & Street Tradition",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Chicken",
    image: IMAGES.chickenLoMein,
  },
  {
    id: "card-fish-egg-curry-ilish",
    slug: "fish-egg-curry-ilish",
    title: "Fish Egg Curry ILISH (ইলিশ মাছের ডিম ভুনা)",
    description:
      "Revered Bengali culinary delicacy: plump, crescent-shaped Hilsa fish roe sacs braised in a golden mustard oil gravy with caramelized onions and slit chilies.",
    heritageTag: "🐟 Authentic Bengali River Heritage Delicacy",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Scaled Catch",
    image: IMAGES.ilishFishEggCurry,
  },
  {
    id: "card-fish-biryani",
    slug: "fish-biryani",
    title: "Fish Biryani (মাছের বিরিয়ানি)",
    description:
      "Aromatic saffron-scented aged basmati rice layered with golden pan-seared spiced fish fillets, caramelized onions, fresh mint, and cooling herb raita.",
    heritageTag: "🐟 Coastal Mughlai & Festive Wedding Banquet",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Scaled Catch",
    image: IMAGES.fishBiryani,
  },
  {
    id: "card-carne-asada-steak-tacos",
    slug: "carne-asada-steak-tacos",
    title: "Carne Asada Steak Tacos (Beef)",
    description:
      "Charred citrus-chili marinated Halal flank steak sliced thick and juicy, piled on warm blistered tortillas with fresh vibrant pico de gallo salsa.",
    heritageTag: "🌮 Mexican Street Food & Taquería Heritage",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Beef",
    image: IMAGES.carneAsadaTacos,
  },
  {
    id: "card-plain-paratha",
    slug: "plain-paratha",
    title: "Plain Paratha (সাধারণ পরোটা)",
    description:
      "Crispy, multi-layered circular flatbread with golden-brown blistered rings, pan-toasted with pure ghee for morning breakfast with hot milk tea.",
    heritageTag: "🫓 Quintessential Bengali & Desi Breakfast",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Vegetarian",
    image: IMAGES.plainParatha,
  },
  {
    id: "card-soy-sauce-deep-fried-crispy-fish",
    slug: "soy-sauce-deep-fried-crispy-fish",
    title: "Soy Sauce Deep Fried Crispy Fish (সয়া সস দিয়ে ভাজা মুচমুচে মাছ)",
    description:
      "Diamond-scored whole fish deep-fried to golden crackling crunch, plated over a savory ginger-soy garlic glaze and crowned with fresh ginger, chilies, and scallions.",
    heritageTag: "🐟 Asian Coastal & Banquet Feast Legend",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Wild Catch",
    image: IMAGES.crispyFriedFish,
  },
  {
    id: "card-royal-hyderabadi-mutton-haleem",
    slug: "royal-hyderabadi-mutton-haleem",
    title: "Royal Hyderabadi Mutton Haleem",
    description:
      "Nizami slow-cooked stew of tender shredded Halal mutton, broken wheat, lentils, and fragrant spices, garnished with golden birista, roasted cashews, and fresh mint.",
    heritageTag: "👑 Royal Nizami Heritage & Eid Feast",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Mutton",
    image: IMAGES.hyderabadiMuttonHaleem,
  },
  {
    id: "card-beef-lo-mein",
    slug: "beef-lo-mein",
    title: "Beef Lo Mein (বিফ লো মেইন)",
    description:
      "Thick, chewy egg noodles drenched in a rich garlic-soy oyster glaze, tossed with thick caramelized Halal flank steak slices, crisp scallions, and peppers.",
    heritageTag: "🥢 Cantonese & Takeout Comfort Legend",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Beef",
    image: IMAGES.beefLoMein,
  },
  {
    id: "card-homemade-chili-oil",
    slug: "homemade-chili-oil",
    title: "Homemade Chili Oil (চীনা চিলি অয়েল)",
    description:
      "Aromatic Sichuan-style ruby chili oil infused with star anise, cinnamon, garlic, ginger, and crispy chili flakes for drizzling over noodles, rice, and dumplings.",
    heritageTag: "🌶️ Artisan Condiment & Pantry Legend",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Vegetarian",
    image: IMAGES.homemadeChiliOil,
  },
  {
    id: "card-chinese-beef-stir-fry",
    slug: "chinese-beef-stir-fry",
    title: "Chinese Beef Stir Fry (চাইনিজ বিফ স্টার-ফ্রাই)",
    description:
      "Tender velveted Halal flank steak strips tossed with crisp snap peas, sweet bell peppers, and chewy noodles in a glossy garlic-soy sesame glaze.",
    heritageTag: "🥢 Cantonese & Hawker Bistro Favorite",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Beef Flank",
    image: IMAGES.chineseBeefStirFry,
  },
  {
    id: "card-chicken-chow-mein",
    slug: "classic-wok-tossed-chicken-noodles-chow-mein",
    title: "Classic Wok-Tossed Chicken Noodles (Chow Mein)",
    description:
      "Tender chicken strips, julienned peppers, and cabbage tossed in a smoking wok with bouncy egg noodles and savory soy-garlic pan glaze.",
    heritageTag: "🥢 Indo-Chinese / Asian Wok Legend",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Chicken",
    image: IMAGES.chickenChowMein,
  },
  {
    id: "card-steak-fajitas",
    slug: "steak-fajitas",
    title: "Sizzling Skillet Steak Fajitas (স্টেক ফাহিটাস)",
    description:
      "Tender strips of lime-cumin marinated Halal flank steak seared with charred tri-color bell peppers, caramelized onions, warm tortillas, and fresh pico de gallo.",
    heritageTag: "🥩 Tex-Mex Sizzling Skillet Legend",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Beef Flank",
    image: IMAGES.steakFajitas,
  },
  {
    id: "card-rohu-fish-curry",
    slug: "rohu-fish-curry",
    title: "Classic Rohu Fish Curry (রুই মাছের কারি)",
    description:
      "Golden turmeric pan-seared river Rohu carp steaks simmered in a fragrant roasted cumin, tomato, and onion gravy with fresh green chilies and lemon.",
    heritageTag: "🐟 Riverine Bengali Fish Heritage",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Wild River Fish",
    image: IMAGES.rohuFishCurry,
  },
  {
    id: "card-chicken-marsala",
    slug: "chicken-marsala",
    title: "Skillet Chicken Marsala (চিকেন মারসালা)",
    description:
      "Golden pan-seared chicken cutlets bathed in a velvety, caramelized non-alcoholic mushroom reduction with garlic, fresh thyme, and parsley.",
    heritageTag: "🍄 Italian-American Bistro Classic (Halal)",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal (Zero-Wine)",
    image: IMAGES.chickenMarsala,
  },
  {
    id: "card-saag-paneer",
    slug: "saag-paneer",
    title: "Rich Restaurant Saag Paneer (শাক পনির)",
    description:
      "Silky spiced emerald spinach and mustard greens gravy simmered with aromatic garlic, ginger, and cumin, topped with golden-crisped cubes of Halal paneer cheese.",
    heritageTag: "🧀 Royal Vegetarian Feast Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Vegetarian",
    image: IMAGES.saagPaneer,
  },
  {
    id: "card-easy-basmati-rice",
    slug: "easy-basmati-rice-cooking",
    title: "Easy Fluffy Basmati Rice (সহজে বাসমতী চাল রান্না)",
    description:
      "Foolproof technique for fragrance-rich, non-sticky, distinct extra-long grain basmati rice with gentle soaking, steam-absorption & fresh herb finish.",
    heritageTag: "🍚 Royal Grain & Everyday Halal Essential",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.easyBasmatiRice,
  },
  {
    id: "card-peri-peri-chicken",
    slug: "peri-peri-chicken",
    title: "Fiery Flame-Grilled Peri Peri Chicken (পেরি পেরি চিকেন)",
    description:
      "Succulent bone-in chicken thighs and drumsticks marinated in bird's eye chili, garlic, lemon, and smoked paprika, flame-seared in cast iron to smoky perfection.",
    heritageTag: "🌶️ African-Portuguese Flame-Grilled Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.periPeriChicken,
  },
  {
    id: "card-moroccan-meatballs",
    slug: "moroccan-harissa-beef-meatballs-prep",
    title: "Moroccan Spiced Halal Beef Meatballs & Couscous",
    description:
      "Succulent spiced Halal beef meatballs in rich zesty tomato sauce with fluffy herb-tossed pearl couscous, fresh parsley & lemon.",
    heritageTag: "🇲🇦 Maghrebian & Moroccan Feast",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.moroccanBeefMeatballs,
  },
  {
    id: "card-keema-paratha",
    slug: "keema-paratha",
    title: "Crispy Stuffed Keema Paratha (কিমা পরোটা)",
    description:
      "Golden, flaky whole-wheat flatbread generously stuffed with spiced aromatic minced beef keema, fresh herbs & green chilies, served with zesty mint chutney.",
    heritageTag: "🫓 Royal Mughlai & Street Food Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.keemaParatha,
  },
  {
    id: "card-corned-beef-reuben",
    slug: "corned-beef-reuben-sandwich",
    title: "Corned Beef Reuben Sandwich (রুবেন স্যান্ডউইচ)",
    description:
      "Towering layers of warm cured Halal corned beef brisket, melted Swiss cheese, tangy sauerkraut & creamy Russian dressing on griddled rye bread.",
    heritageTag: "🥪 Legendary New York Deli Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.cornedBeefReuben,
  },
  {
    id: "card-rogan-josh",
    slug: "rogan-josh",
    title: "Authentic Kashmiri Rogan Josh (রোগান জোশ কারি)",
    description:
      "Tender braised lamb chunks in a royal crimson gravy infused with Kashmiri chilies, fennel powder, dry ginger, and whole aromatic spices.",
    heritageTag: "👑 Royal Kashmiri Wazwan Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.roganJosh,
  },
  {
    id: "card-lamb-curry",
    slug: "lamb-curry",
    title: "Bengali Lamb Curry / Khasir Mangsho (খাসির মাংসের কারি)",
    description:
      "Tender slow-simmered bone-in lamb and rich marrow in a fragrant golden-red spiced gravy with braised potatoes & aromatic mustard oil.",
    heritageTag: "🥘 Bengali Heritage Festive Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.lambCurry,
  },
  {
    id: "card-chicken-jalfrezi",
    slug: "chicken-jalfrezi",
    title: "Restaurant Style Chicken Jalfrezi (চিকেন জলফ্রেজি)",
    description:
      "Succulent stir-fried chicken tossed with crunchy bell peppers, chunky onions & juicy tomatoes in a fiery, tangy spiced masala reduction.",
    heritageTag: "🌶️ Iconic Anglo-Indian & Bengali Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.chickenJalfrezi,
  },
  {
    id: "card-chicken-bhuna-masala",
    slug: "chicken-bhuna-masala-curry-bengali-style",
    title: "Chicken Bhuna Masala Curry Bengali Style (চিকেন ভুনা মশলা কারি)",
    description:
      "Succulent bone-in chicken slow-braised in a dark, glossy caramelized onion & roasted spice masala with slit green chilies & fresh cilantro.",
    heritageTag: "🍗 Signature Bengali Poultry Heritage",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.chickenBhunaMasala,
  },
  {
    id: "card-bengali-sweet-doi",
    slug: "bengali-sweet-doi",
    title: "Bengali Sweet Doi (Mishti Doi/Dahi বাঙালি দই)",
    description:
      "Authentic caramelized sweet fermented yogurt set in traditional terracotta handi with cardamom, saffron threads & crushed pistachios.",
    heritageTag: "🏺 Iconic Bengali Heritage Dessert",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dessert",
    image: IMAGES.bengaliSweetDoi,
  },
  {
    id: "card-thandai",
    slug: "thandai",
    title: "Thandai (ঠান্ডাই)",
    description:
      "Chilled royal whole milk steeped with blanched almonds, pistachios, saffron, cooling sweet fennel & fragrant rose petals in clay kulhads.",
    heritageTag: "🥛 Royal Mughlai Cooling Elixir",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Drink",
    image: IMAGES.thandai,
  },
  {
    id: "card-salty-lassi",
    slug: "salty-lassi",
    title: "Salty Lassi (নোনতা লাচ্চি)",
    description:
      "Frothy chilled yogurt blended with roasted cumin (bhuna jeera), Himalayan black salt (bit lobon), lime & fresh mint in tall fluted glasses.",
    heritageTag: "🌿 Traditional Digestive Cooler",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Drink",
    image: IMAGES.saltyLassi,
  },
  {
    id: "card-borhani",
    slug: "borhani",
    title: "Borhani (বোরহানি بورہانی)",
    description:
      "Old Dhaka's royal spiced digestive yogurt drink blended with fresh mint, coriander, roasted cumin, black salt & mustard in clay kulhads.",
    heritageTag: "🏺 Royal Old Dhaka Festive Drink",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Drink",
    image: IMAGES.borhani,
  },
  {
    id: "card-buttermilk-chicken-alfredo",
    slug: "buttermilk-chicken-alfredo-spinach-pasta",
    title: "Buttermilk Chicken Alfredo Spinach Pasta",
    description:
      "Seared buttermilk-marinated chicken bites tossed with penne, charred broccoli & fresh baby spinach in rich garlic-parmesan sauce. Ready in 25 mins!",
    heritageTag: "⏱️ 25-Minute Weeknight Skillet",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.buttermilkChickenAlfredo,
  },
  {
    id: "card-spinach-sun-dried-tomato-pasta",
    slug: "spinach-sun-dried-tomato-pasta",
    title: "Spinach & Sun Dried Tomato Pasta",
    description:
      "Tuscan spaghetti twirled in a silky garlic-parmesan cream sauce with vibrant baby spinach, tangy sun-dried tomatoes & sweet shallots.",
    heritageTag: "🌿 25-Min Tuscan Vegetarian",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Vegetarian",
    image: IMAGES.spinachSunDriedTomatoPasta,
  },
  {
    id: "card-chicken-tikka-masala",
    slug: "chicken-tikka-masala",
    title: "Chicken Tikka Masala (چکن تکہ مصالحہ)",
    description:
      "Tender chunks of smoky tandoori-charred chicken simmered in a luscious spiced tomato, cream & kasuri methi gravy over fluffy basmati rice.",
    heritageTag: "🍛 Royal Anglo-Indian & Mughlai Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Certified",
    image: IMAGES.chickenTikkaMasala,
  },
];

interface SingleCollectionCardProps {
  item: CollectionCardItem;
  onOpen: (slug: string) => void;
  index?: number;
}

const SingleCollectionCard: React.FC<SingleCollectionCardProps> = ({ item, onOpen, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransformStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out, box-shadow 0.15s ease-out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTransformStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.1s ease-out, box-shadow 0.15s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease-out",
    });
  };

  return (
    <div
      className="recipe-card-container recipe-card-fade w-full flex justify-center"
      style={{
        perspective: "1200px",
        animationDelay: `${Math.min(index * 60, 600)}ms`,
      }}
    >
      <div
        ref={cardRef}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          onOpen(item.slug);
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...transformStyle,
          transformStyle: "preserve-3d",
        }}
        className={`recipe-card relative w-full max-w-[340px] h-[440px] rounded-[16px] overflow-hidden cursor-pointer bg-[#1a1a1a] transition-shadow duration-150 ${
          isHovered
            ? "shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            : "shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
        }`}
      >
        {/* Background Image Wrapper with 2x Auto-Zoom */}
        <div className="recipe-image-wrap absolute inset-0 w-full h-full z-1 overflow-hidden pointer-events-none">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover pointer-events-none transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered ? "scale-[2]" : "scale-100"
            }`}
            loading="lazy"
          />
        </div>

        {/* Dark Vignette Overlay */}
        <div
          className="card-overlay absolute inset-0 w-full h-full z-2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Recipe Content Overlay */}
        <div className="recipe-content absolute inset-0 w-full h-full z-3 p-6 flex flex-col justify-between text-white pointer-events-none">
          {/* Top Header Tags */}
          <div className="card-header-tags flex justify-between items-center">
            <span className="brand-name font-subheading text-[0.85rem] font-bold uppercase tracking-[1px] opacity-90 drop-shadow-sm">
              {item.brandName}
            </span>
            <span className="halal-badge font-tag bg-[#ff6b00] text-white text-[0.7rem] font-bold px-2 py-1 rounded-[4px] uppercase tracking-[0.5px] shadow-sm">
              {item.halalBadge}
            </span>
          </div>

          {/* Lower Recipe Details */}
          <div className="recipe-details flex flex-col gap-2">
            <span className="heritage-tag font-subheading text-[0.75rem] font-semibold text-[#ffcc00] uppercase tracking-[0.5px] drop-shadow-xs">
              {item.heritageTag}
            </span>
            <h2 className="recipe-title font-heading text-[1.15rem] sm:text-[1.25rem] font-bold m-0 leading-[1.3] text-white drop-shadow-md tracking-wider">
              {item.title}
            </h2>
            <p className="recipe-description font-description text-[0.85rem] text-white/75 my-1 mb-3 leading-[1.4] line-clamp-2">
              {item.description}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                onOpen(item.slug);
              }}
              className="view-recipe-btn font-ui self-start bg-[#ff6b00] hover:bg-[#e05e00] text-white border-0 py-2.5 px-4 text-[0.8rem] font-bold rounded-[6px] uppercase tracking-[0.5px] shadow-md cursor-pointer transition-colors pointer-events-auto"
            >
              View Recipe →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecipeCollectionGrid: React.FC<RecipeCollectionGridProps> = ({
  onSelectRecipeBySlug = () => {},
  cards = DEFAULT_COLLECTION,
}) => {
  return (
    <div
      className="recipe-grid w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] justify-items-center"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      }}
    >
      {cards.map((item, index) => (
        <SingleCollectionCard
          key={item.id}
          item={item}
          index={index}
          onOpen={onSelectRecipeBySlug}
        />
      ))}
    </div>
  );
};
