"use client";

import { useState, useTransition } from "react";
import { joinWaitlist } from "@/app/actions";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("email", email);
    fd.set("source", "hero");

    startTransition(async () => {
      const res = await joinWaitlist(fd);
      if (res.ok) {
        setStatus("ok");
        setEmail("");
      } else {
        setStatus("error");
      }
    });
  }

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      className="mt-6 flex w-full max-w-md flex-col gap-3 text-sm sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="you@domain.com"
        className="flex-1 rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none ring-0 focus:border-violet-400/60 focus:bg-zinc-900/80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={pending}
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-violet-600 px-4 py-3 font-medium text-white shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:bg-violet-500 disabled:opacity-50"
      >
        {pending ? "…" : "Join waitlist"}
      </button>

      {status === "ok" && (
        <p className="text-xs text-emerald-400/90">
          You're in. We'll email you.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400/90">Invalid email?</p>
      )}
    </form>
  );
}
