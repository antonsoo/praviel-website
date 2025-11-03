/**
 * Language data structure with proper TypeScript typing
 * Sourced from docs/archive/imported-docs-from-main-repo/TOP_TEN_WORKS_PER_LANGUAGE.md
 */

export interface Language {
  name: string;
  nativeName: string;
  sample: string;
  translation: string;
  script: string;
  color: string;
  emoji: string;
  description: string;
  topTenWorks: string[];
  writingInfo: string;
  fontClass?: string; // CSS class for font-family
  isRTL?: boolean; // Right-to-left script
}

export const languages: Language[] = [
  {
    name: "Classical Latin",
    nativeName: "LINGVA LATINA",
    sample: "ARMA·VIRVMQVE·CANO·TROIAE·QVI·PRIMVS·AB·ORIS",
    translation: "I sing of arms and the man, who first from the shores of Troy",
    script: "Latin Alphabet",
    color: "from-red-500 to-rose-600",
    emoji: "🏛️",
    description: "The language of Virgil, Cicero, and Caesar. Foundation of Western literature, law, and philosophy.",
    topTenWorks: [
      "Aeneid by Virgil",
      "Metamorphoses by Ovid",
      "De Rerum Natura by Lucretius",
      "Commentaries on the Gallic War by Julius Caesar",
      "Annals by Tacitus",
      "Ab Urbe Condita by Livy",
      "Odes by Horace",
      "Naturalis Historia by Pliny the Elder",
      "Satires by Juvenal",
      "Vulgate (Latin Bible) by Jerome"
    ],
    writingInfo: "Roman capitals only (A-Z, no J/U/W). Interpunct (·) word dividers optional. Scriptio continua or epigraphic spacing.",
    fontClass: "font-serif",
    isRTL: false
  },
  {
    name: "Classical Greek",
    nativeName: "ΕΛΛΗΝΙΚΗ ΓΛΩΤΤΑ",
    sample: "ΜΗΝΙΝ ΑΕΙΔΕ ΘΕΑ ΠΗΛΗΙΑΔΕΩ ΑΧΙΛΗΟΣ",
    translation: "Sing, goddess, the wrath of Achilles, son of Peleus",
    script: "Greek Alphabet (Unaccented Capitals)",
    color: "from-blue-500 to-indigo-600",
    emoji: "🏺",
    description: "Homer's language. Plato's dialogues. The foundation of Western philosophy and epic poetry.",
    topTenWorks: [
      "Iliad by Homer",
      "Odyssey by Homer",
      "Theogony by Hesiod",
      "Works and Days by Hesiod",
      "Oedipus Rex by Sophocles",
      "Antigone by Sophocles",
      "Medea by Euripides",
      "Histories by Herodotus",
      "History of the Peloponnesian War by Thucydides",
      "Republic by Plato"
    ],
    writingInfo: "24 Ionian/Euclidean letters (Α–Ω) in capitals. No accents, breathings, or iota subscript. Scriptio continua or epigraphic interpuncts.",
    fontClass: "font-serif",
    isRTL: false
  },
  {
    name: "Biblical Hebrew",
    nativeName: "עברית מקראית",
    sample: "בראשית ברא אלהים את השמים ואת הארץ",
    translation: "In the beginning God created the heavens and the earth",
    script: "Hebrew (Unpointed Square Script)",
    color: "from-amber-500 to-yellow-600",
    emoji: "🕎",
    description: "The language of the Hebrew Bible. Torah, Prophets, and Writings in their original form.",
    topTenWorks: [
      "Genesis (Bereshit)",
      "Exodus (Shemot)",
      "Isaiah (Yeshayahu)",
      "Psalms (Tehillim)",
      "Deuteronomy (Devarim)",
      "Samuel (Shmuel)",
      "Kings (Melakhim)",
      "Jeremiah (Yirmeyahu)",
      "Ezekiel (Yehezkel)",
      "Job (Iyov)"
    ],
    writingInfo: "Unpointed square Hebrew (Ketav Ashuri), right-to-left. No niqqud or te'amim. Simple word spacing.",
    fontClass: "font-hebrew",
    isRTL: true
  },
  {
    name: "Classical Sanskrit",
    nativeName: "संस्कृतम्",
    sample: "धर्मक्षेत्रेकुरुक्षेत्रेसमवेतायुयुत्सवः",
    translation: "On the field of dharma, the field of Kuru, assembled for battle",
    script: "Devanagari",
    color: "from-orange-500 to-red-600",
    emoji: "🪷",
    description: "The language of the Vedas and epics. Ancient India's literary and philosophical treasure.",
    topTenWorks: [
      "Mahābhārata (incl. Bhagavad-Gītā)",
      "Rāmāyaṇa",
      "Bhagavad-Gītā",
      "Arthaśāstra (Kauṭilya)",
      "Aṣṭādhyāyī (Pāṇini)",
      "Abhijñānaśākuntalam (Kālidāsa)",
      "Meghadūta (Kālidāsa)",
      "Suśruta-saṁhitā",
      "Pañcatantra",
      "Yoga Sūtras of Patañjali"
    ],
    writingInfo: "Devanagari script with full conjunct ligatures. Scriptio continua. Ends with danda/double danda only.",
    fontClass: "font-devanagari",
    isRTL: false
  },
  {
    name: "Middle Egyptian",
    nativeName: "𓂋𓈖𓎡𓅓𓏏",
    sample: "𓇋𓈖𓂓𓅱𓈙𓅱𓏏𓈖𓇋",
    translation: "I was Sinuhe",
    script: "Egyptian Hieroglyphics",
    color: "from-yellow-600 to-amber-700",
    emoji: "👁️",
    description: "The language of ancient Egypt's Middle Kingdom. Tales, wisdom literature, and sacred texts.",
    topTenWorks: [
      "Story of Sinuhe",
      "Coffin Texts",
      "Tale of the Shipwrecked Sailor",
      "Instruction of King Merikare",
      "Instruction of Amenemope",
      "Book of the Dead",
      "Prophecy of Neferti",
      "Report of Wenamun",
      "Merneptah Stele (Israel Stele)",
      "Shabaka Stone (Memphite Theology)"
    ],
    writingInfo: "Hieroglyphs with canonical grouping. No vowels, spaces, or punctuation. Monumental forms with determinatives/logograms.",
    fontClass: "font-serif", // Fallback - hieroglyphics are complex
    isRTL: false
  },
];
