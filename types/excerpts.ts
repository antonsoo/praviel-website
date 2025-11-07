export interface ExcerptToken {
  id: string;
  text: string;
  lemma: string;
  definition: string;
  morphology: string;
  notes?: string;
  color?: string;
}

export interface Excerpt {
  id: string;
  language: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  fontClass?: string;
  script: string;
  source: {
    title: string;
    context: string;
  };
  displayText: string;
  scriptioText?: string;
  translation: string;
  synopsis: string;
  tokens: ExcerptToken[];
}
