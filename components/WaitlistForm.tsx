"use client";

import { useActionState, useEffect, useRef } from "react";

import { joinWaitlist } from "@/app/actions";
import { useCookiePreferences } from "@/lib/cookieConsent";
import { sendAnalyticsEvent } from "@/lib/analytics";

type ErrorType = "invalid_email" | "service_unavailable" | "unknown";

type FormState = {
  status: "idle" | "ok" | "error";
  error?: ErrorType;
  message?: string;
};

const initialState: FormState = {
  status: "idle",
};

type WaitlistFormProps = {
  source?: string;
};

export default function WaitlistForm({ source = "hero" }: WaitlistFormProps = {}) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      const res = await joinWaitlist(formData);
      if (res.ok) {
        return { status: "ok", message: "You're in. We'll email you." };
      }
      return { status: "error", error: res.error as ErrorType };
    },
    initialState
  );
  const cookiePreferences = useCookiePreferences();
  const trackedSuccessRef = useRef(false);
  const trackedFocusRef = useRef(false);

  const getErrorMessage = (error?: ErrorType) => {
    switch (error) {
      case "invalid_email":
        return "Please enter a valid email address";
      case "service_unavailable":
        return "Service temporarily unavailable. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  useEffect(() => {
    if (
      state.status === "ok" &&
      cookiePreferences.analytics &&
      !trackedSuccessRef.current
    ) {
      sendAnalyticsEvent("waitlist_conversion", { source });
      trackedSuccessRef.current = true;
    }
  }, [cookiePreferences.analytics, source, state.status]);

  const handleInputFocus = () => {
    if (!cookiePreferences.analytics || trackedFocusRef.current) {
      return;
    }
    sendAnalyticsEvent("waitlist_focus", { source });
    trackedFocusRef.current = true;
  };

  return (
    <form
      id="waitlist"
      action={formAction}
      className="mt-4 sm:mt-6 flex w-full max-w-md flex-col gap-2 sm:gap-3 text-sm sm:flex-row"
    >
      <div className="flex-1">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          placeholder="you@domain.com"
          className="w-full rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-3 sm:px-4 py-3 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 outline-none ring-0 transition-colors duration-200 focus:border-violet-400/60 focus:bg-zinc-900/80 focus:ring-2 focus:ring-violet-400/20 disabled:cursor-not-allowed disabled:opacity-60 min-h-[44px]"
          disabled={isPending}
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? "waitlist-error" : undefined}
          onFocus={handleInputFocus}
        />
        <input type="hidden" name="source" value={source} />
      </div>
      <button
        type="submit"
        disabled={isPending || state.status === "ok"}
        className="rounded-xl bg-violet-600 px-4 py-3 font-medium text-white shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] text-sm sm:text-base whitespace-nowrap relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        aria-label="Join waitlist"
      >
        {isPending && (
          <span
            className="absolute inset-0 animate-pulse bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 opacity-80"
            aria-hidden
          />
        )}
        <span className="relative z-10">
          {isPending ? "Joining..." : state.status === "ok" ? "Joined!" : "Join waitlist"}
        </span>
      </button>

      {state.status === "ok" && (
        <p className="text-xs text-emerald-400/90 flex items-center gap-1" role="status">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {state.message}
        </p>
      )}
      {state.status === "error" && (
        <p id="waitlist-error" className="text-xs text-red-400/90 flex items-center gap-1" role="alert">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {getErrorMessage(state.error)}
        </p>
      )}
    </form>
  );
}
