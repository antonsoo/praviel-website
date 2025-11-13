import localFont from "next/font/local";
import {
  Noto_Naskh_Arabic,
  Noto_Sans_Armenian,
  Noto_Sans_Brahmi,
  Noto_Sans_Coptic,
  Noto_Sans_Cuneiform,
  Noto_Sans_Ethiopic,
  Noto_Sans_Glagolitic,
  Noto_Sans_Gothic,
  Noto_Sans_Imperial_Aramaic,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_Old_Turkic,
  Noto_Sans_Phoenician,
  Noto_Sans_SC,
  Noto_Sans_Syriac,
  Noto_Sans_TC,
  Noto_Serif_Armenian,
  Noto_Serif_Ethiopic,
  Noto_Serif_Tamil,
  Noto_Serif_Tibetan,
} from "next/font/google";

const notoSerifCyrillic = localFont({
  src: [
    { path: "../fonts/noto-serif-display/noto-serif-display-cyrillic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/noto-serif-display/noto-serif-display-cyrillic-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cyrillic-serif",
  display: "swap",
  preload: false,
});

const notoSansDevanagari = localFont({
  src: [
    { path: "../fonts/noto-sans-devanagari/noto-sans-devanagari-devanagari-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/noto-sans-devanagari/noto-sans-devanagari-devanagari-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cjk-sc",
  display: "swap",
  preload: false,
});

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cjk-tc",
  display: "swap",
  preload: false,
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cjk-jp",
  display: "swap",
  preload: false,
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cjk-kr",
  display: "swap",
  preload: false,
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

const notoSansSyriac = Noto_Sans_Syriac({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syriac",
  display: "swap",
  preload: false,
});

const notoSansImperialAramaic = Noto_Sans_Imperial_Aramaic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aramaic",
  display: "swap",
  preload: false,
});

const notoSansPhoenician = Noto_Sans_Phoenician({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-phoenician",
  display: "swap",
  preload: false,
});

const notoSansCoptic = Noto_Sans_Coptic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-coptic",
  display: "swap",
  preload: false,
});

const notoSansCuneiform = Noto_Sans_Cuneiform({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cuneiform",
  display: "swap",
  preload: false,
});

const notoSansBrahmi = Noto_Sans_Brahmi({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-brahmi",
  display: "swap",
  preload: false,
});

const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-tamil",
  display: "swap",
  preload: false,
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-armenian",
  display: "swap",
  preload: false,
});

const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-armenian-serif",
  display: "swap",
  preload: false,
});

const notoSerifTibetan = Noto_Serif_Tibetan({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-tibetan",
  display: "swap",
  preload: false,
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ethiopic",
  display: "swap",
  preload: false,
});

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ethiopic-serif",
  display: "swap",
  preload: false,
});

const notoSansGothic = Noto_Sans_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gothic",
  display: "swap",
  preload: false,
});

const notoSansOldTurkic = Noto_Sans_Old_Turkic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-turkic",
  display: "swap",
  preload: false,
});

const notoSansGlagolitic = Noto_Sans_Glagolitic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-glagolitic",
  display: "swap",
  preload: false,
});

export const scriptFontVariables = [
  notoSerifCyrillic.variable,
  notoSansDevanagari.variable,
  notoSansSc.variable,
  notoSansTc.variable,
  notoSansJp.variable,
  notoSansKr.variable,
  notoNaskhArabic.variable,
  notoSansSyriac.variable,
  notoSansImperialAramaic.variable,
  notoSansPhoenician.variable,
  notoSansCoptic.variable,
  notoSansCuneiform.variable,
  notoSansBrahmi.variable,
  notoSerifTamil.variable,
  notoSansArmenian.variable,
  notoSerifArmenian.variable,
  notoSerifTibetan.variable,
  notoSansEthiopic.variable,
  notoSerifEthiopic.variable,
  notoSansGothic.variable,
  notoSansOldTurkic.variable,
  notoSansGlagolitic.variable,
]
  .filter(Boolean)
  .join(" ");
