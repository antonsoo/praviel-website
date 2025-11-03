"use client";

import { useState, useTransition } from "react";
import { joinWaitlist } from "@/app/actions";

type ErrorType = "invalid_email" | "service_unavailable" | "unknown";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorType, setErrorType] = useState<ErrorType>("unknown");

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
        setErrorType("unknown");
      } else {
        setStatus("error");
        setErrorType(res.error as ErrorType);
      }
    });
  }

  const getErrorMessage = () => {
    switch (errorType) {
      case "invalid_email":
        return "Please enter a valid email address";
      case "service_unavailable":
        return "Service temporarily unavailable. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      className="mt-6 flex w-full max-w-md flex-col gap-3 text-sm sm:flex-row"
    >
      <div className="flex-1">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder="you@domain.com"
          className="w-full rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none ring-0 focus:border-violet-400/60 focus:bg-zinc-900/80 transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "waitlist-error" : undefined}
        />
      </div>
      <button
        type="submit"
        disabled={pending || status === "ok"}
        className="rounded-xl bg-violet-600 px-4 py-3 font-medium text-white shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Join waitlist"
      >
        {pending ? "…" : "Join waitlist"}
      </button>

      {status === "ok" && (
        <p className="text-xs text-emerald-400/90 flex items-center gap-1" role="status">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          You're in. We'll email you.
        </p>
      )}
      {status === "error" && (
        <p id="waitlist-error" className="text-xs text-red-400/90 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {getErrorMessage()}
        </p>
      )}
    </form>
  );
}
