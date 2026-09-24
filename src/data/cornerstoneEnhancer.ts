import { Recipe } from "../types";
import { CORNERSTONE_METADATA_MAP } from "./cornerstoneMetadata";
import { CORNERSTONE_ADDITIONAL_RECIPES } from "./cornerstoneRecipes";

// Map of cornerstone recipe specific editorial enhancements
const RECIPE_EDITORIAL_EXTRAS: Record<
  string,
  {
    whySpecial: string;
    cookingTips: string[];
    commonMistakes: string[];
  }
> = {
  "bengali-aloo-dum": {
    whySpecial:
      "The quintessential Bengali festival and Sunday morning breakfast soul food: baby potatoes pricked all over and shallow-fried in golden mustard oil until blistered, then simmered 'dum' style (slow-cooked on low flame in their own steam) in a rich, velvety gravy of grated ginger, juicy tomatoes, whisked yogurt, and freshly ground Bengali bhaja masala (roasted cumin, coriander, dry red chili, and cardamom). Served steaming hot in a traditional iron kadai, crowned with slit green chilies and fresh cilantro alongside puffed, gossamer-thin luchis.",
    cookingTips: [
      "Prick the boiled baby potatoes all over with a fork or toothpick before shallow frying in mustard oil with a pinch of turmeric and salt; this forms a crisp golden skin and allows the spiced gravy to penetrate right to the potato's core.",
      "Always prepare fresh 'Bhaja Masala' (dry-roasted cumin seeds, coriander seeds, dry red chili, and green cardamom ground into an aromatic powder) and dust it over the dish right before turning off the heat.",
      "Whisk yogurt with a tablespoon of water and lower the heat completely before adding to the skillet; stir continuously so the yogurt integrates smoothly without curdling.",
      "The 'Dum' process is key: keep the lid sealed tight and allow the potatoes to absorb the rich gravy over the lowest possible flame for 10 to 12 minutes until the oil separates (tori/roghan float).",
    ],
    commonMistakes: [
      "Overboiling the baby potatoes beforehand so they burst and turn mushy when fried; boil until just fork-tender, not collapsing.",
      "Skipping the initial potato shallow-fry step in mustard oil; frying creates the signature golden wrinkly skin that defines authentic Bengali Alur Dom.",
      "Using cold yogurt or adding it over high heat, which causes the sauce to separate and look grainy.",
    ],
  },
  "bangladeshi-spiced-shrimp-and-green-bean-stir-fry": {
    whySpecial:
      "A beloved, vibrant everyday Bengali home-cooked classic (Chingri Borboti Bhaji): tender, sweet peeled tiger shrimp lightly seasoned with golden turmeric and sea salt, flash-seared in mustard oil, and tossed with crisp French green beans or yardlong beans (borboti), caramelized sliced red onions, pungent garlic, roasted cumin, and sliced green chilies. The shrimp remain juicy and snap-tender while the green beans retain their vibrant emerald crunch, coated in an aromatic savory dry-spice glaze.",
    cookingTips: [
      "Sear the shrimp quickly for just 60 to 90 seconds until they turn pink and opaque, then transfer to a plate; overcooking shrimp in a stir-fry makes them rubbery.",
      "Keep the green beans tender-crisp: sauté them over medium-high heat with a pinch of turmeric and salt without covering the pan, which preserves their brilliant emerald green color.",
      "Use pure cold-pressed mustard oil heated until it lightly smokes for that authentic Bangladeshi rustic village fragrance (deshi shubaash).",
      "Finish with freshly sliced green chilies and a generous scattering of torn fresh cilantro leaves just before taking off the flame to lock in fresh herbal aroma.",
    ],
    commonMistakes: [
      "Simmering the shrimp with the beans under a tight lid, which steams the shrimp into tough rubber and turns the beans dull olive green.",
      "Adding water during cooking; an authentic Bengali 'bhaji' is a dry stir-fry reliant on continuous tossing and natural vegetable moisture.",
      "Not deveining or drying the shrimp thoroughly, which releases excess moisture and makes the stir-fry watery rather than glistening and crisp.",
    ],
  },
  "moroccan-lamb-tagine": {
    whySpecial:
      "The peerless summit of royal Moroccan and Maghrebi culinary banquet artistry: bone-in lamb shanks or shoulder cuts slowly braised in a traditional clay conical tagine with golden saffron threads, ras el hanout, Ceylon cinnamon, ground ginger, and sweet grated onions. As the cone-shaped lid condenses and circulates aromatic steam back into the stew, the lamb turns melt-in-the-mouth fork-tender. Plump dried black prunes, apricots, and golden raisins poached in cinnamon and orange blossom honey are arranged around the lamb, crowned with golden-toasted slivered almonds, toasted sesame seeds, and pearl onions over a bed of fragrant steamed couscous.",
    cookingTips: [
      "Use bone-in lamb shanks or bone-in shoulder pieces; the bone marrow and gelatin melt into the braising jus, creating an unctuously rich, glossy sauce.",
      "Infuse the saffron threads in 2 tablespoons of warm water for 10 minutes before adding to the marinade to release their deep floral aroma and brilliant golden color.",
      "Poach the prunes and apricots separately in a small saucepan with a ladle of the spiced lamb broth, a cinnamon stick, and a tablespoon of honey until plump, glossy, and caramelized; folding them in at the end preserves their luscious shape without clouding the main tagine sauce.",
      "Toast whole blanched slivered almonds in olive oil or butter until golden brown just before serving; the crunch against the tender lamb and jammy prunes is the signature texture contrast of authentic Moroccan tagine.",
    ],
    commonMistakes: [
      "Boiling the prunes directly in the main pot from the start, which disintegrates the fruit and turns the savory lamb gravy overly dark and sweet.",
      "Rushing the braise over high heat instead of a gentle, patient low simmer; slow braising is essential to soften lamb shank tendons into gelatin.",
      "Using artificial food coloring instead of real saffron threads and turmeric, which misses the exquisite floral aromatics.",
    ],
  },
  "beef-nahari": {
    whySpecial:
      "The undisputed king of royal Mughal and old-city breakfast stews: thick, gelatinous cuts of beef shank (bong) and marrow-rich cross-cut bones slow-simmered for hours in an aromatic spice infusion of fennel, saunth (dry ginger), mace, nutmeg, and black cardamom. Finished with a toasted wheat flour (atta) slurry to create its signature glossy, velvety gravy that clings to warm naan, topped with a sizzling red chili-ghee roghan float and crowned with fiery green chilies, julienned fresh ginger, and sour lemon wedges.",
    cookingTips: [
      "Always use beef shank (bong/shin) with bone marrow; shank has rich intramuscular connective collagen that dissolves during slow braising into a luscious, silky stew with unmatched depth.",
      "Toast whole fennel seeds, dry ginger, cloves, cinnamon, mace, and cumin before grinding into the specialized 'Nihari Masala' for that authentic old-city royal aroma.",
      "Lightly toast the whole wheat flour (atta) in a dry pan before whisking with water; this eliminates any raw flour flavor and produces a silky, lump-free gravy.",
      "Skim off the rich red spiced oil (roghan / tori) before whisking in the flour slurry; ladle the roghan back over each serving bowl so the vibrant chili oil glistens on top.",
    ],
    commonMistakes: [
      "Adding raw untoasted flour directly to the boiling stew, which creates unpleasant doughy lumps instead of a velvety sauce.",
      "Using quick-cooking lean steak cuts instead of bone-in shank; lean beef turns dry, tough, and lacks the unctuous gelatin of true Nihari.",
      "Skipping the fresh garnishes—raw julienned ginger, crisp green chilies, and freshly squeezed lemon juice provide an indispensable acidic and aromatic counterpoint to the rich marrow broth.",
    ],
  },
  "authentic-bangladeshi-beef-curry": {
    whySpecial:
      "The undisputed centerpiece of Bengali home hospitality and Eid celebratory dining: bone-in and boneless chuck and brisket braised through patient 'koshano' (slow caramelization) with finely sliced onions, ginger-garlic paste, fragrant whole garam masala (black and green cardamom, cinnamon, cloves, bay leaves), and ground roasted cumin in golden mustard oil. As the beef simmers low and slow in its natural juices, the onions melt into a velvety, thick gravy and the spiced fat separates into a shimmering ruby-red float (tori/roghan). Garnished traditionally with fresh sweet orange slices and cooling mint to cut through the rich, savory beef depth.",
    cookingTips: [
      "Select a mix of bone-in beef chuck, brisket, and a marrow bone; the collagen from marrow and connective tissue melts during slow braising into an unctuously rich, glossy gravy.",
      "Practice patient 'koshano': sauté the beef and spices over medium heat for 20 to 25 minutes without adding extra water initially, letting the meat release and cook in its own savory juices until the oil glistens on top.",
      "Use pure pungent mustard oil heated to its smoking point and tempered with whole black cardamom and bay leaves for the authentic village aroma (deshi shubaash).",
      "Do not rush with high heat; a gentle 60 to 75-minute simmer on low heat allows muscle fibers to soften until fork-tender and melt-in-the-mouth.",
    ],
    commonMistakes: [
      "Dumping water too early into the pot before the spices and beef have properly caramelized (koshano), which makes the gravy taste raw and diluted.",
      "Using exclusively lean beef with zero fat or bones, yielding tough, dry meat and a thin, watery sauce.",
      "Boiling vigorously on high heat instead of a patient, covered slow simmer, which toughens the beef fibers.",
    ],
  },
  "chicken-lo-mein": {
    whySpecial:
      "The gold standard of Chinese wok takeout and Asian street-market noodles: springy, chewy egg noodles tossed over roaring wok heat with velveted sliced chicken breast, crisp julienned red bell pepper, shredded green cabbage, carrots, and scallions in an intensely savory, silky dark amber glaze of aged dark soy, light soy sauce, toasted sesame oil, ginger, and garlic with that prized breath-of-the-wok (wok hei) perfume.",
    cookingTips: [
      "Velvet the sliced chicken breast with a touch of cornstarch, light soy sauce, and a splash of neutral oil for 15 minutes before cooking; this seals in moisture so the lean breast meat stays tender and succulent.",
      "Boil the fresh or dried lo mein egg noodles until just al dente (about 1 minute less than package directions); rinse immediately under cold running water and toss with 1 teaspoon of sesame oil so they don't stick or get mushy in the wok.",
      "Pre-mix all the lo mein sauce ingredients (dark soy, light soy, oyster sauce, sugar, sesame oil, and chicken broth) in a small bowl beforehand; stir-frying happens in seconds and you cannot pause to measure seasonings.",
      "Use high heat and toss continuously with tongs to coat every noodle strand evenly with the glossy dark amber sauce without breaking the noodles.",
    ],
    commonMistakes: [
      "Overboiling the noodles before stir-frying, causing them to turn into broken, clumpy mush in the wok.",
      "Using non-Halal Chinese oyster sauce or cooking wine; always verify Halal certification on oyster sauce and substitute Mirin/Shaoxing with a dash of apple cider vinegar and broth.",
      "Crowding a cold skillet with wet cold noodles, which steams the ingredients instead of creating high-heat wok sizzle.",
    ],
  },
  "fish-egg-curry-ilish": {
    whySpecial:
      "The crown jewel of monsoon Bengali and Noakhali culinary heritage: whole, crescent-shaped sacs of fresh silver Hilsa (Ilish) fish roe gently seasoned with golden turmeric and sea salt, lightly seared in pungent mustard oil to set the delicate skin, and simmered in a luscious onion-mustard-cumin gravy with aromatic nigella seeds (kalo jeere) and fiery fresh slit green and red chilies. The roe retains a rich, buttery, melt-in-the-mouth granular texture, drinking in the sharp mustard heat and earthy cumin aromatics.",
    cookingTips: [
      "Handle fresh Hilsa fish egg roe sacs with extreme tenderness; keep the thin natural membrane intact when cleaning so the granular eggs do not scatter in the gravy.",
      "Gently fry the seasoned egg sacs in hot mustard oil on medium-low heat for only 1.5 to 2 minutes per side; you only want the outer membrane to firm up and turn golden, not dry out.",
      "Always cook with pure cold-pressed pungent mustard oil (shorsher tel); heat it until it reaches its smoking point and cools slightly before adding nigella seeds (kalo jeere) to mellow the raw bitterness while keeping the glorious aroma.",
      "Add the lightly seared egg sacs into the simmering onion-spice gravy during the final 6 to 8 minutes of gentle braising; cover with a tight lid and let them absorb the flavors without vigorous stirring.",
    ],
    commonMistakes: [
      "Piercing or roughly stirring the fish egg sacs with a sharp spoon, which ruptures the roe and turns the silky gravy gritty.",
      "Deep-frying the fish roe on high heat for too long, which makes the eggs rubbery, tough, and dry instead of tender and buttery.",
      "Using refined neutral oils instead of authentic Bengali mustard oil, which strips away the quintessential coastal river pungency.",
    ],
  },
  "fish-biryani": {
    whySpecial:
      "The coastal jewel of Mughlai and Bengali celebratory feasts: thick, succulent fillets of firm white-flesh fish gently marinated in Kashmiri chili, turmeric, ginger-garlic paste, and roasted cumin, lightly pan-seared in golden ghee, and layered between fragrant parboiled aged basmati rice infused with saffron milk, golden fried onions (birista), fresh mint, cilantro, and lemon wheels. Sealed and slow-steamed under gentle 'dum' so the delicate fish retains its moist, flaky tenderness without breaking, while the rice absorbs every drop of aromatic marine umami.",
    cookingTips: [
      "Select firm-fleshed fish such as cod, sea bass, kingfish (surmai), rohu, or mahi-mahi that hold their shape during layering and dum steaming without flaking apart.",
      "Quickly sear the marinated fish in ghee for only 1.5 to 2 minutes per side until light golden; do not cook it through completely, as it finishes cooking gently in the aromatic steam of the rice.",
      "Parboil the aged basmati rice to precisely 70% doneness (grains should have a slight bite in the center); drain thoroughly before layering to prevent soggy or mushy biryani.",
      "Place a heavy cast-iron tawa underneath the biryani pot during the 15-minute dum steaming to diffuse the direct flame and guarantee the fish and bottom layer never scorch.",
    ],
    commonMistakes: [
      "Stirring vigorously with a large spoon after dum cooking, which shatters the tender fish fillets and breaks the long rice grains; always gently scoop from the edges with a flat saucer or spatula.",
      "Using delicate, flaky fish like tilapia or thin sole fillets, which disintegrate into the rice during steaming.",
      "Over-cooking the fish during the initial pan sear, resulting in dry, rubbery seafood instead of moist, melt-in-the-mouth flakes.",
    ],
  },
  "carne-asada-steak-tacos": {
    whySpecial:
      "The undisputed holy grail of Mexican taquería street food: thick, juicy cuts of certified Halal flank or skirt steak marinated in freshly squeezed lime and orange juices, crushed garlic, cumin, Mexican oregano, and chipotle, seared over blistering high heat to deeply caramelized smoky char with a pink, tender medium-rare center. Sliced across the grain and piled into warm, lightly blistered tortillas, topped generously with crisp, freshly tossed pico de gallo salsa and shredded cheese.",
    cookingTips: [
      "Marinate the flank steak for at least 2 to 4 hours (and up to 8 hours), but avoid marinating past 12 hours as the citrus acidity can start breaking down meat fibers into mush.",
      "Sear on an intensely hot cast-iron skillet, plancha, or outdoor grill (at least 500°F / 260°C); flank steak needs blazing heat for 3 to 4 minutes per side so you achieve a dark, crackling crust without overcooking the juicy interior.",
      "Rest the steak for 8 to 10 minutes on a wooden cutting board before slicing; this allows the caramelized meat juices to redistribute throughout the steak instead of running onto the board.",
      "Always slice strictly across (perpendicular to) the muscle grain into thick ribbons; this shortens the long muscle fibers and guarantees melt-in-your-mouth tenderness in every bite.",
    ],
    commonMistakes: [
      "Slicing with the grain, which results in long, chewy, stringy beef that pulls out of the taco in one awkward bite.",
      "Crowding the skillet or using low heat, which causes the steak to boil in its own marinade instead of searing with a smoky caramelized crust.",
      "Skipping the resting period, dumping all the savory juices onto the board and leaving the taco filling dry.",
    ],
  },
  "plain-paratha": {
    whySpecial:
      "The undisputed golden crown of South Asian and Bengali morning breakfast: unleavened dough kneaded with a splash of milk and oil, rolled thin, brushed with pure cow ghee, folded into concentric spiral layers (lachha/spiral fold), and dry-roasted on a heavy iron tawa before shallow pan-frying with ghee into mesmerizing concentric golden rings that puff majestically and shatter into paper-thin, flaky, buttery layers.",
    cookingTips: [
      "Let the kneaded dough rest for at least 30 minutes covered with a damp cloth; resting relaxes the gluten network so the dough rolls effortlessly without springing back.",
      "For distinct flaky layers, roll the dough ball into a thin disk, brush generously with melted cow ghee, dust with a whisper of dry flour, cut a radius slit, and roll tightly into a cone, then flatten down from the tip into a spiral coil before the final rolling.",
      "First dry-toast the rolled paratha on a medium-hot iron tawa for 40 seconds per side until pale opaque spots appear before adding any ghee; this cooks the inner dough layers before frying.",
      "Once dry-toasted, spoon 1 to 2 teaspoons of pure ghee around the rim and press gently with a flat spatula or clean cloth in circular motions; this puffs the paratha into crisp, blistered golden rings.",
    ],
    commonMistakes: [
      "Frying with ghee right from the beginning without dry-toasting first; this traps raw dough inside and makes the paratha greasy and heavy rather than light and flaky.",
      "Rolling with too much dry dusting flour, which burns on the hot tawa and leaves a chalky, bitter crust.",
      "Kneading with ice-cold water; always use lukewarm water or lukewarm milk for a supple, soft dough.",
    ],
  },
  "soy-sauce-deep-fried-crispy-fish": {
    whySpecial:
      "The undisputed centerpiece of Asian coastal banquet dining: a fresh whole white-flesh fish scored in deep diamond cross-hatches, dusted lightly in cornstarch, and flash deep-fried in bubbling oil to an electric, crackling golden crunch while the interior remains moist, flaky, and tender. Plated over an aromatic shallow pool of seasoned light soy sauce, simmered with fresh ginger, garlic, cilantro roots, and pure sesame oil, then crowned with fine ginger matchsticks, curled scallions, and red chilies.",
    cookingTips: [
      "Pat the cleaned whole fish bone-dry inside and out with paper towels before scoring and frying; surface moisture is the enemy of crackling crispy skin.",
      "Score deep diagonal diamond incisions on both flanks right down to the backbone; this allows the bubbling oil to crisp the skin deeply and cooks the thick flesh evenly in minutes.",
      "Maintain the frying oil strictly at 365°F to 375°F (185°C to 190°C); baste the head and exposed top parts with hot ladles of oil for uniform golden blister.",
      "Pour the warm seasoned soy sauce around the base of the fish on the platter, never over the top; this keeps the prized top skin audibly crunchy throughout the entire meal.",
    ],
    commonMistakes: [
      "Frying a cold, wet fish straight from the refrigerator, which drops the oil temperature and produces a greasy, soggy crust.",
      "Dumping the soy sauce directly over the crispy fish skin at the table, turning crackling skin soft and limp within minutes.",
      "Using non-Halal Shaoxing wine; our chef method uses apple cider vinegar, a hint of raw honey, and rich fish broth to build identical savory depth with zero alcohol.",
    ],
  },
  "royal-hyderabadi-mutton-haleem": {
    whySpecial:
      "The undisputed GI-tagged royal crown jewel of Hyderabad and the sacred Ramadan Iftar banquet: succulent Halal mutton slow-braised for hours with broken wheat (dalia), four varieties of lentils, pure cow ghee, and Nizami royal potli masala until the bone marrow melts and the meat breaks down into rich, fibrous strands, pounded vigorously with a traditional wooden masher (ghotni) into a velvety, luscious, porridge-like texture topped with glistening ghee, crispy golden birista, roasted whole cashews, plump raisins, fresh mint, and lemon juice.",
    cookingTips: [
      "Use bone-in mutton pieces (shoulder, shanks, and marrow bones); the gelatin and marrow rendered from slow-cooking the bones are what give authentic Hyderabadi Haleem its signature stretch, body, and unctuous mouthfeel.",
      "Soak the broken wheat (dalia) and mixed lentils (chana, masoor, moong, and urad dal) for at least 4 to 6 hours or overnight so they break down effortlessly into a smooth, silky porridge.",
      "Vigorous pounding or mashing (Ghotna) with a heavy wooden masher is the authentic technique that weaves the tender meat strands into the wheat paste; avoid puréeing in a blender, which turns the texture into baby food paste rather than stringy, luscious haleem.",
      "Always reserve the aromatic spiced red ghee (roghan) floating on top of the cooked mutton korma before blending; drizzle this hot over the finished dish alongside sizzling ghee, golden fried cashews, and crispy fried onions.",
    ],
    commonMistakes: [
      "Puréeing the entire mixture in a high-speed blender into a completely smooth soup, destroying the quintessential fibrous 'reshaydar' texture of authentic haleem.",
      "Skimping on pure cow ghee; authentic Nizami haleem relies on quality ghee to carry the fragrant aromas of green cardamom, kabab chini (allspice/cubeb), and mace.",
      "Using boneless meat without marrow bones, which deprives the stew of natural collagen and gelatin.",
    ],
  },
  "beef-lo-mein": {
    whySpecial:
      "The undisputed comfort icon of Cantonese noodle houses: thick, chewy egg noodles luxuriating in a copious, glossy glaze of dark soy, Halal oyster sauce, and toasted sesame oil, tossed with thick, succulent slices of seared Halal flank steak, sweet caramelized red bell peppers, and crisp scallions in a sizzling skillet.",
    cookingTips: [
      "Use thick, round fresh egg noodles or lo mein noodles; cook them just until tender with a springy chew, then drain and immediately coat in a few drops of sesame oil to keep them separate.",
      "Velvet the thick-cut flank steak slices with baking soda, cornstarch, and dark soy sauce; this ensures thick slices stay buttery tender all the way through without tough centers.",
      "Lo Mein translates to 'stirred or tossed noodles'—unlike crispy chow mein, the noodles should swim in a generous coating of savory umami sauce; never let the skillet run dry.",
      "Sear the thick beef slices over maximum heat for 2 minutes undisturbed to get that appetizing caramelized dark mahogany crust before tossing with the saucy noodles.",
    ],
    commonMistakes: [
      "Using thin angel hair or vermicelli noodles instead of thick, hearty egg or lo mein noodles that can stand up to the robust beef sauce.",
      "Drying out the sauce by stir-frying noodles too long; lo mein is about tossing (捞) until glossy and saucy, not frying dry.",
      "Overcooking the flank steak slices beyond tender-juicy medium.",
    ],
  },
  "homemade-chili-oil": {
    whySpecial:
      "The undisputed holy grail of Asian condiments and home pantry essentials: neutral oil slowly infused with star anise, cinnamon, black cardamom, cloves, bay leaves, fresh ginger, and scallions, then carefully poured over a fragrant blend of coarse Sichuan chili flakes, toasted white sesame seeds, sea salt, and a touch of mushroom powder to create a radiant ruby-red elixir that crackles with intoxicating aroma and balanced, mouth-tingling heat.",
    cookingTips: [
      "Keep oil temperature strictly between 325°F and 350°F (165°C - 175°C) when pouring over the chili flakes; oil that is too hot will scorch the pepper flakes and turn bitter, while oil that is too cool won't extract the deep crimson color and nutty roasted fragrance.",
      "Infuse the whole aromatics (cinnamon, star anise, cardamom, bay leaves, ginger, scallions) over low heat for 20 to 25 minutes until the scallions turn golden brown; this extracts sweet spice perfumes without burning.",
      "Pour the hot oil in two separate stages over the chili flakes: pour half first to awaken the aromatics with gentle sizzle, wait 30 seconds, then pour the remainder.",
      "Allow the chili oil to steep undisturbed for at least 12 to 24 hours at room temperature; the color deepens into a mesmerizing luminescent ruby red and the flavor blooms exponentially.",
    ],
    commonMistakes: [
      "Pouring boiling oil (above 375°F / 190°C) directly onto chili flakes, which burns them black instantly and ruins the batch with an acrid bitter taste.",
      "Using olive oil or unrefined oils with low smoke points or strong competing flavors; always use neutral high-smoke-point oil such as canola, peanut, or avocado oil.",
      "Introducing moisture or wet spoons into the storage jar; always use a completely dry utensil to guarantee a shelf life of months.",
    ],
  },
  "chinese-beef-stir-fry": {
    whySpecial:
      "The pinnacle of Chinese banquet wok cookery made 100% Halal: paper-thin ribbons of Halal flank steak velveted with soy sauce and cornstarch to achieve legendary melt-in-your-mouth tenderness, flash-seared over smoking wok fire and tossed with crisp sugar snap peas, sweet yellow and red bell peppers, chewy noodles, and a rich garlic-ginger soy reduction finished with toasted white sesame seeds and scallions.",
    cookingTips: [
      "Slice the flank steak across the grain into very thin 1/8-inch ribbons; cutting across the muscle fibers breaks them down into fork-tender strips that never turn chewy.",
      "Never skip the cornstarch velveting marinade; cornstarch creates a protective barrier that seals in the beef's natural juices during high-heat searing.",
      "Sear beef in a blazing hot wok in a single flat layer for 90 seconds without moving it; this achieves mouthwatering restaurant caramelization without boiling the beef in liquid.",
      "Blanch snap peas in boiling water for 45 seconds and shock in cold water before stir-frying; they will emerge with an electric emerald color and crisp-tender crunch.",
    ],
    commonMistakes: [
      "Crowding the beef into a lukewarm skillet, which releases moisture and simmers the meat into grey, tough strips instead of searing with wok-hei char.",
      "Cutting flank steak with the grain instead of perpendicular to the grain.",
      "Using non-Halal Shaoxing wine; our chef formula uses aged Halal apple cider vinegar and rich beef bone broth to achieve identical savory depth and complexity with zero alcohol.",
    ],
  },
  "classic-wok-tossed-chicken-noodles-chow-mein": {
    whySpecial:
      "The undisputed high-heat sensation of Asian street food and Bengali-Chinese trattorias: springy egg noodles flash-tossed in a smoking wok with velvety soy-marinated chicken strips, crisp matchstick carrots, sweet red and green bell peppers, and shredded cabbage, coated in a glistening savory sauce of dark soy, toasted sesame oil, ginger, and garlic with signature 'wok hei' breath of the wok aroma.",
    cookingTips: [
      "Boil noodles 1 minute shy of al dente, drain immediately, rinse thoroughly with ice-cold water to wash away surface starch, and toss with 1 teaspoon of toasted sesame oil to keep them springy and completely separate.",
      "Velvet the sliced chicken breast with soy sauce, cornstarch, and sesame oil for 15 minutes; the cornstarch forms a protective seal that keeps the lean white meat extraordinarily silky and juicy.",
      "Preheat the wok or heavy skillet until wisps of smoke rise before adding oil; rapid stir-frying over maximum heat creates 'wok hei' caramelization without turning the vegetables limp or soggy.",
      "Premix the chow mein sauce in a small bowl beforehand; wok cooking happens in under 4 minutes, so you need everything prepped and within arm's reach.",
    ],
    commonMistakes: [
      "Overcooking the noodles during boiling, causing them to turn into a mushy, gummy clump when stir-fried.",
      "Overcrowding the wok with raw vegetables, which drops the pan temperature and causes vegetables to stew in their own moisture rather than crisp-char.",
      "Using non-Halal Chinese sauces; always check oyster sauce, soy sauce, and chili pastes to ensure zero non-halal alcohol or uncertified animal derivatives.",
    ],
  },
  "steak-fajitas": {
    whySpecial:
      "The undisputed king of sizzling Tex-Mex street dining: premium Halal flank or skirt steak marinated in fresh lime juice, crushed garlic, cumin, smoked paprika, and jalapeño, flame-seared in a white-hot cast-iron skillet to juicy medium-rare perfection, sliced thinly against the grain and served alongside blistered tri-color bell peppers, caramelized sweet onions, warm charred tortillas, fresh guacamole, and zesty pico de gallo.",
    cookingTips: [
      "Always slice the flank steak strictly against the grain (perpendicular to the long muscle fibers) at a 45-degree angle; this cuts the long fibers short, ensuring every single bite is buttery soft and tender.",
      "Get your cast-iron skillet screaming hot before adding the steak; a rapid 3 to 4 minute sear per side develops deep caramelized crust while preserving a juicy pink medium-rare center (135°F / 57°C).",
      "Rest the seared steak on a cutting board for a full 8 to 10 minutes before carving so all the internal juices redistribute into the meat instead of leaking onto the board.",
      "Cook the sliced peppers and onions in the same skillet over high heat using the flavorful beef drippings, keeping them crisp-tender with appetizing blistered black char edges.",
    ],
    commonMistakes: [
      "Over-marinating in high acid; flank steak only needs 1 to 4 hours in lime juice. Marinating overnight can break down muscle fibers into a mushy texture.",
      "Crowding the skillet with steak and vegetables at the same time; this steams the meat instead of searing it with that iconic steakhouse crust.",
      "Slicing with the grain instead of across it, which makes flank steak tough and chewy.",
    ],
  },
  "rohu-fish-curry": {
    whySpecial:
      "The undisputed soul of riverine Bengali culinary heritage (মাছে ভাতে বাঙালি): sweet, tender steaks of fresh wild Rohu carp (রুই মাছ) marinated in fragrant turmeric and sea salt, pan-fried in pure mustard oil to seal in delicate juices, then gently simmered in a luscious gravy of roasted cumin, fresh ginger, ripe tomatoes, and slit green chilies, finished with a bright squeeze of fresh lemon.",
    cookingTips: [
      "Wash the Rohu steaks thoroughly with cold water, coarse salt, and a splash of lemon juice to eliminate any freshwater siltiness before seasoning.",
      "Rub fish steaks with turmeric and salt 10 minutes prior to frying; fry in smoking mustard oil for just 2 to 3 minutes per side until light golden—never over-fry, or the fish will dry out.",
      "Bloom whole cumin seeds and fragrant bay leaves in the residual mustard oil before sautéing onions to build the quintessential Bengali aroma.",
      "Slide the seared fish steaks into the simmering tomato-cumin gravy and gently shake the pan rather than stirring aggressively with a spoon, keeping the tender steaks completely intact.",
    ],
    commonMistakes: [
      "Frying the fish in cold oil, which causes the skin to stick and tear.",
      "Over-boiling the fish in the gravy, which breaks down the delicate flaky meat.",
      "Skipping the finishing touch of fresh lemon juice, which cuts the rich spices and enhances the natural sweetness of the carp.",
    ],
  },
  "chicken-marsala": {
    whySpecial:
      "The quintessential Italian-American bistro comfort dish reimagined for 100% Halal dining: golden, flour-dredged tender chicken cutlets pan-seared in butter and olive oil, smothered in an intensely savory, caramelized reduction of earthy cremini mushrooms, minced shallots, garlic, rich Halal bone broth, and tangy white grape-balsamic reduction with zero alcohol.",
    cookingTips: [
      "Butterfly and pound chicken breasts evenly to 1/4-inch thickness; uniform cutlets sear rapidly and stay juicy without drying out.",
      "Dredge chicken lightly in seasoned flour and shake off all excess; this creates a delicate golden crust that naturally thickens the pan sauce.",
      "Do not crowd the mushrooms in the skillet; sautéing them over medium-high heat undisturbed allows them to brown deeply and develop intense umami.",
      "Craft the zero-alcohol Marsala profile by reducing 100% white grape juice with balsamic vinegar and rich chicken bone broth, finishing with cold butter for a glossy restaurant sheen.",
    ],
    commonMistakes: [
      "Using wine or cooking wine, which contains alcohol and is haram in Islamic dietary law; our scratch-made grape-balsamic broth reduction replicates the identical sweet-savory notes legally and naturally.",
      "Overcooking thin chicken cutlets; they only need 3 to 4 minutes per side in a smoking hot skillet.",
      "Salting mushrooms too early, which draws out their water and causes them to steam rather than brown.",
    ],
  },
  "saag-paneer": {
    whySpecial:
      "The quintessential jewel of South Asian vegetarian cuisine: fresh spinach leaves and mustard greens blanched in an ice bath to preserve their electric emerald color, pureed with caramelized aromatics, and simmered with pure ghee, garam masala, and golden pan-seared cubes of Halal paneer cheese.",
    cookingTips: [
      "Blanch spinach leaves in salted boiling water for exactly 90 seconds, then immediately plunge them into an ice water bath; this halts the enzymes that cause greens to oxidize into a drab olive-brown.",
      "Pan-fry paneer cubes in ghee until golden-crisp on all sides, then transfer them immediately to a bowl of warm, lightly salted water for 5 minutes; this keeps the paneer pillow-soft and spongy.",
      "Blend half the cooked greens silky smooth and keep the other half coarsely pulsed for the authentic rustic dhaba texture.",
      "Finish with a final flourish of kasoori methi (dried fenugreek leaves) crushed between your palms and a swirl of heavy cream or ghee.",
    ],
    commonMistakes: [
      "Overcooking the spinach in boiling water without an ice bath, which destroys both nutrients and the striking vibrant green color.",
      "Adding unseared, cold paneer directly from the fridge, which can turn rubbery and dilute the sauce.",
      "Forgetting to check the paneer label for Halal-friendly microbial or vegetarian rennet.",
    ],
  },
  "easy-basmati-rice-cooking": {
    whySpecial:
      "The definitive guide to restaurant-fluffy, fragrant basmati rice: aged extra-long Himalayan grains washed of excess starch, soaked for optimal elongation, and cooked using the foolproof absorption method with a hint of ghee and whole aromatics for tender, separated grains that never clump or turn mushy.",
    cookingTips: [
      "Rinse the grains gently under cold water in a fine mesh sieve until the water runs completely crystal clear; this washes away excess surface amylose that causes clumping.",
      "Always soak basmati rice for 25 to 30 minutes in room temperature water before cooking; this allows the grains to absorb water to the core so they expand lengthwise without fracturing.",
      "The golden ratio: for soaked basmati rice, use exactly 1.5 cups of boiling water or broth per 1 cup of dry rice.",
      "Keep the lid tightly sealed on low heat for 12 minutes, then let it rest off the heat undisturbed for 10 minutes before fluffing with a wide fork or paddle.",
    ],
    commonMistakes: [
      "Skipping the 30-minute pre-soak, which leads to unevenly cooked grains that snap in the middle.",
      "Stirring the rice with a spoon while it is simmering; stirring breaks the delicate starch chains and makes the rice sticky and gummy.",
      "Taking off the lid prematurely, which releases essential steam and ruins the absorption ratio.",
    ],
  },
  "peri-peri-chicken": {
    whySpecial:
      "The globally celebrated African-Portuguese flame-grilled masterpiece: succulent bone-in chicken thighs and drumsticks steeped in a fiery homemade sauce of bird's eye chilies, roasted red peppers, garlic, lemon juice, smoked paprika, and oregano, then skillet-seared to produce smoky charred blisters and juicy meat.",
    cookingTips: [
      "Score chicken drumsticks and thighs with 2 shallow diagonal slashes to allow the vibrant peri-peri marinade to penetrate deep to the bone.",
      "Reserve 1/3 of the blended peri-peri sauce before adding raw chicken; use this clean reserved sauce for basting on the skillet and as a table dipping sauce.",
      "Start searing skin-side down in a smoking hot cast-iron skillet to get deep caramelized blister marks, then transfer skillet to a 400°F (200°C) oven to cook through gently.",
      "Brush generously with melted garlic butter and warm peri-peri sauce during the final 2 minutes of roasting for an intoxicating glossy lacquer.",
    ],
    commonMistakes: [
      "Shortchanging marination time; bone-in chicken needs at least 4 hours (ideally overnight) for the lemon acid and spices to permeate the meat.",
      "Crowding a cold pan, which steams the chicken instead of building that signature flame-grilled char.",
      "Using pre-bottled vinegar sauce instead of fresh lemon juice, roasted red peppers, and garlic.",
    ],
  },
  "keema-paratha": {
    whySpecial:
      "The ultimate Mughlai street food and breakfast luxury: crisp, flaky golden-brown flatbreads stuffed to the brim with spiced, savory minced Halal beef keema, fresh mint, coriander, and green chilies, toasted in pure ghee to deliver an irresistible crunch and juicy spiced interior.",
    cookingTips: [
      "Cook the keema filling until all pan moisture is completely dry; wet meat will make the dough soggy and tear during rolling.",
      "Allow the spiced keema to cool completely to room temperature before stuffing into dough balls; warm filling weakens the gluten and causes bursts.",
      "Roll gently with light, even pressure from the center outward, dusting lightly with flour to distribute the keema evenly from edge to edge.",
      "Dry-roast the paratha on a medium-hot tawa until pale spots appear on both sides before brushing with pure cow ghee; this locks in steam and creates flaky, crisp layers.",
    ],
    commonMistakes: [
      "Stuffing hot or wet keema into the dough, which immediately tears the paratha and leaks filling during rolling.",
      "Using heavy downward pressure with the rolling pin rather than delicate, radiating strokes.",
      "Frying on excessively high heat, which scorches the exterior crust before the inner dough layers cook through.",
    ],
  },
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
    const meta = CORNERSTONE_METADATA_MAP.get(recipe.slug);
    if (!meta) {
      return recipe;
    }

    const extras = RECIPE_EDITORIAL_EXTRAS[recipe.slug];

    return {
      ...recipe,
      whySpecial: recipe.whySpecial || extras?.whySpecial,
      cookingTips: recipe.cookingTips || extras?.cookingTips || [
        "Maintain proper heat control throughout cooking.",
        "Use high-quality Halal ingredients and fresh whole spices.",
        "Allow proper resting time before serving.",
      ],
      commonMistakes: recipe.commonMistakes || extras?.commonMistakes || [
        "Rushing the cooking time over excessive heat.",
        "Skipping the initial spice blooming phase.",
      ],
      relatedRecipeSlugs: recipe.relatedRecipeSlugs || meta.relatedRecipes,
      relatedGuideSlugs: recipe.relatedGuideSlugs || meta.relatedGuides,
      relatedCultureSlug: recipe.relatedCultureSlug || meta.relatedCulture,
      relatedKitchenToolId: recipe.relatedKitchenToolId || meta.kitchenToolId,
      seoTitle: recipe.seoTitle || meta.seoTitle,
      seoDescription: recipe.seoDescription || meta.seoDescription,
    };
  });
}
