type PixelLanguageDefinition = {
  code: string;
  name: string;
  /** Optional override used when the language search prefers a different token than the code. */
  search?: string;
};

export const pixelLanguages: readonly PixelLanguageDefinition[] = [
  { code: "lat", name: "Classical Latin", search: "Latin" },
  { code: "grc-koi", name: "Koine Greek", search: "Koine" },
  { code: "hbo", name: "Biblical Hebrew", search: "Hebrew" },
  { code: "san", name: "Classical Sanskrit", search: "Sanskrit" },
  { code: "lzh", name: "Classical Chinese", search: "Chinese" },
  { code: "cop", name: "Coptic" },
  { code: "akk", name: "Akkadian" },
  { code: "syc", name: "Classical Syriac", search: "Syriac" },
  { code: "grc-cls", name: "Classical Greek", search: "Greek" },
  { code: "pli", name: "Pali" }
] as const;
export type PixelLanguage = (typeof pixelLanguages)[number];
