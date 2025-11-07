export const heroCopy = {
  eyebrow: "The Conversation Across Millennia",
  title: "Read the originals — not the translations.",
  subtitle:
    "Every translation is an interpretation. Learn the languages exactly as the authors wrote them.",
  mission:
    "Democratize access to 5,000 years of human knowledge by making ancient language learning accessible, engaging, and effective through modern AI technology while maintaining scholarly rigor.",
  valueProps: [
    "Hear Homer's dactylic hexameter, not a prose paraphrase.",
    "Study the Torah, Mahābhārata, and Analects without translator bias.",
    "AI tutors are grounded in Perseus, LSJ, ORACC, and TLA so nuance is never hallucinated.",
  ],
};

export const whyPravielCopy = {
  problemHeading: "Every Translation is an Interpretation",
  problemIntro:
    "Reading translations is like watching a movie described over the phone. You get the plot, but you miss the soul.",
  problemDetail:
    "Ancient Greek has four words for \"love\" (ἔρως, φιλία, ἀγάπη, στοργή). English collapses them to one. Egyptian hieroglyphs carry meaning in their very shape. Homer's dactylic hexameter becomes prose. When you read a translation, you're reading the interpreter's choices, not the author's voice.",
  problemBullets: [
    "Linguistic nuance disappears: Ancient Greek has four words for \"love\" (ἔρως, φιλία, ἀγάπη, στοργή), each with distinct meanings. English collapses them all to \"love.\"",
    "Poetic structure vanishes: Homer's dactylic hexameter becomes prose. The rhythm that ancient audiences heard is lost.",
    "Wordplay evaporates: Puns, alliteration, and rhetorical devices that worked in the original language become invisible.",
    "Cultural context requires footnotes: References and idioms that ancient readers understood intuitively need extensive annotation for modern audiences.",
    "Grammatical precision is simplified: Ancient languages had grammatical structures (like the Greek optative mood or Sanskrit's eight cases) that don't exist in modern English.",
  ],
  solutionHeading: "The Solution: Learn the Original Language",
  solutionIntro:
    "PRAVIEL is the first platform to combine research-grade philology with modern AI. We don't just teach you about these languages—we let you interact with them.",
  solutionBullets: [
    "Read texts as the authors wrote them — no intermediary, no translator's bias, no lost nuance",
    "Understand cultural context — grasp jokes, references, and subtleties that translations miss",
    "Join a scholarly tradition — connect with millennia of readers who've engaged directly with these texts",
    "Access primary sources — conduct research, verify claims, discover insights that translations obscure",
    "Transform cognition — learning ancient languages enhances linguistic awareness, analytical thinking, and creativity",
  ],
  accuracyHeading: "Zero AI Hallucinations",
  accuracyBody:
    "We use a neuro-symbolic approach: AI handles synthesis and dialogue, but hard linguistic truth comes from peer-reviewed academic sources. Result: Zero AI hallucinations on grammar.",
  accuracySources: [
    "Perseus Digital Library morphology",
    "LSJ Lexicon (116,502 Greek entries)",
    "TLA Berlin, ORACC UPenn, CDLI UCLA",
    "Transparent citations for every definition",
  ],
};

export const languageShowcaseCopy = {
  title: "From Sumerian cuneiform (3100 BCE) to medieval manuscripts (1200 CE)",
  description:
    "We're building infrastructure for preserving and transmitting humanity's full linguistic heritage. Current priority languages are driven by real user demand and scholarship.",
  topTierLabel: "Top 4 priority languages (market-driven, user-requested)",
};

export interface FaqEntry {
  question: string;
  answer: string;
}

export const faqEntries: FaqEntry[] = [
  {
    question: "Why isn't reading translations enough?",
    answer:
      "Reading translations is like watching a movie described over the phone. You get the plot, but you miss the soul. Ancient Greek has four words for \"love\" (ἔρως, φιλία, ἀγάπη, στοργή). English collapses them to one. Egyptian hieroglyphs carry meaning in their very shape. Homer's dactylic hexameter becomes prose. When you read a translation, you're reading the interpreter's choices, not the author's voice.",
  },
  {
    question: "What does PRAVIEL do differently?",
    answer:
      "PRAVIEL is the first platform to combine research-grade philology with modern AI. We don't just teach you about these languages—we let you interact with them. From Sumerian cuneiform (3100 BCE) to medieval manuscripts (1200 CE), we're building infrastructure for preserving and transmitting humanity's full linguistic heritage.",
  },
  {
    question: "How do you prevent AI hallucinations?",
    answer:
      "We use a neuro-symbolic approach: AI handles synthesis and dialogue, but hard linguistic truth comes from peer-reviewed academic sources. Result: Zero AI hallucinations on grammar. Perseus Digital Library morphology, the LSJ Lexicon, TLA Berlin, ORACC, and CDLI provide the ground truth for every definition.",
  },
  {
    question: "Which languages are prioritized right now?",
    answer:
      "Top 4 priority languages (market-driven, user-requested): Classical Latin, Koine Greek, Classical Greek, Biblical Hebrew. These four received the highest interest and get advanced features first.",
  },
  {
    question: "What does the roadmap look like next?",
    answer:
      "Phase 1 adds Classical Sanskrit, Classical Chinese, Pali, Old Church Slavonic, Ancient Aramaic, Classical Arabic, Old Norse, Middle Egyptian, Old English, Yehudit (Paleo-Hebrew), Coptic, Ancient Sumerian, Classical Tamil, Classical Syriac, Akkadian, and Vedic Sanskrit. Later phases expand to Armenian, Hittite, Nahuatl, Tibetan, Japanese, Quechua, Persian, Irish, Gothic, Geʽez, Sogdian, Ugaritic, Tocharian, and more partial courses like Old Turkic, Etruscan, Proto-Norse, and Phoenician.",
  },
  {
    question: "What sources power the linguistic data?",
    answer:
      "Every definition, grammar explanation, and morphological analysis is grounded in authoritative academic sources: Perseus Digital Library, Liddell-Scott-Jones, Smyth's Greek Grammar, TLA Berlin-Brandenburg, ORACC UPenn, and the Cuneiform Digital Library Initiative.",
  },
];
