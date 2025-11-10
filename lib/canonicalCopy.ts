export const heroCopy = {
  eyebrow: "The Conversation Across Millennia",
  title: "Read the originals — not the translations.",
  subtitle:
    "When you read Homer in English, you're reading the translator—not Homer. Hear the ancient voices speak for themselves.",
  mission:
    "Democratize access to 5,000 years of human knowledge by making ancient language learning accessible, engaging, and effective through modern AI technology while maintaining scholarly rigor.",
  valueProps: [
    "Hear Homer's dactylic hexameter, not a prose paraphrase.",
    "Study the Torah, Mahābhārata, and Analects without translator bias.",
    "AI tutors are grounded in Perseus, LSJ, ORACC, and TLA so nuance is never hallucinated.",
  ],
};

export const whyPravielCopy = {
  problemHeading: "Translations Filter the Ancient Voices",
  problemIntro:
    "Translations give you the plot. But the soul—the rhythm, the wordplay, the cultural context—disappears.",
  problemDetail:
    "Ancient Greek has four words for \"love\" (ἔρως, φιλία, ἀγάπη, στοργή). English collapses them to one. Egyptian hieroglyphs carry meaning in their very shape. Homer's dactylic hexameter becomes prose. When you read a translation, you're reading the interpreter's choices, not the author's voice.",
  problemBullets: [
    "Ancient Greek has 4 words for \"love.\" English has 1. Which one did Homer mean?",
    "Homer's dactylic hexameter had rhythm. Translations turn it into prose.",
    "Jokes, wordplay, and cultural context vanish. You get the plot, not the soul.",
  ],
  solutionHeading: "Hear the Voices Directly",
  solutionIntro:
    "Learn the languages. Read Homer's actual words. Catch the jokes that disappeared 2,000 years ago.",
  solutionBullets: [
    "Read the author's actual words — not a translator's interpretation",
    "Catch wordplay and cultural references that vanish in translation",
    "Join millennia of readers who heard these voices firsthand",
  ],
  accuracyHeading: "Grounded in Scholarship",
  accuracyBody:
    "AI tutors explain the grammar. But the definitions come from Perseus, LSJ, and university research—not AI guessing.",
  accuracySources: [
    "Perseus Digital Library (Tufts)",
    "LSJ Lexicon (116,502 entries)",
    "TLA Berlin, ORACC UPenn",
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

export const missionPillars = [
  {
    label: "Students",
    body:
      "Read primary texts sooner with real-time morphology, adaptive drills, and guided roadmaps instead of phrasebook filler.",
  },
  {
    label: "Scholars",
    body:
      "Sync annotated corpora with Perseus, ORACC, LSJ, and TLA Berlin so research, teaching, and translation stay citation-grade.",
  },
  {
    label: "Humanity",
    body:
      "Preserve 5,000 years of linguistic memory—42 ancient languages prioritized by cultural risk, not popularity.",
  },
];

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
  {
    question: "How is PRAVIEL different from Duolingo or other language apps?",
    answer:
      "Duolingo teaches modern conversational skills (ordering coffee, making small talk). PRAVIEL teaches you to read authentic ancient texts. We focus on reading comprehension and literary analysis, not conversation. Think of it as the difference between learning Spanish to travel vs studying Don Quixote in the original. Both are valuable, but completely different goals.",
  },
  {
    question: "Why not just hire a tutor or take a university course?",
    answer:
      "Traditional instruction is excellent but expensive ($50-200/hour for tutors, thousands for semester courses) and requires scheduling. PRAVIEL provides on-demand, AI-powered tutoring grounded in the same academic sources (Perseus, LSJ) that university professors use—at a fraction of the cost. We're not replacing professors; we're making their knowledge accessible 24/7.",
  },
  {
    question: "Is PRAVIEL really free? How do you sustain this?",
    answer:
      "PRAVIEL is free for individual learners and always will be. We offer institutional licensing for universities and seminaries who want enhanced features (learning analytics, custom content, SSO integration). We also accept donations. Our goal is to be financially sustainable without gating access to knowledge.",
  },
];
