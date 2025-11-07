import type { ReactNode } from "react";

import { scriptFontVariables } from "./script-fonts";

export default function TestLayout({ children }: { children: ReactNode }) {
  return <div className={scriptFontVariables}>{children}</div>;
}
