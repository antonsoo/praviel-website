"use client";

const DEFAULT_SAMPLE_RATE = 1;
const rawSampleRate = Number(process.env.NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE);
export const ANALYTICS_SAMPLE_RATE = Number.isFinite(rawSampleRate)
  ? Math.min(Math.max(rawSampleRate, 0), 1)
  : DEFAULT_SAMPLE_RATE;

export function sendAnalyticsEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify({
    event,
    timestamp: Date.now(),
    ...payload,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    const sent = navigator.sendBeacon("/api/observability/events", blob);
    if (sent) {
      return;
    }
  }

  void fetch("/api/observability/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
    credentials: "omit",
  });
}
