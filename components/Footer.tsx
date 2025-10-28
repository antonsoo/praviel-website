import { Suspense } from "react";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60 px-6 py-12 text-xs text-zinc-600 ring-1 ring-white/10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="text-zinc-300">PRAVIEL</div>
          <div className="max-w-xs text-zinc-500">
            AI-native mastery of dead languages.
          </div>
        </div>

        <div className="flex flex-col gap-2 text-zinc-500">
          <a
            href="mailto:anton@praviel.com"
            className="hover:text-zinc-300"
          >
            anton@praviel.com
          </a>
          <a
            href="https://app.praviel.com"
            className="hover:text-zinc-300"
          >
            App
          </a>
          <a
            href="https://api.praviel.com/docs"
            className="hover:text-zinc-300"
          >
            API
          </a>
          <a
            href="https://praviel.com/privacy"
            className="hover:text-zinc-300"
          >
            Privacy
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl text-zinc-700">
        ©{" "}
        <Suspense fallback={null}>
          <CurrentYear />
        </Suspense>{" "}
        PRAVIEL. All rights reserved.
      </div>
    </footer>
  );
}
