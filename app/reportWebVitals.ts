import type { NextWebVitalsMetric } from "next/app";

type MetricWithEntries = NextWebVitalsMetric & {
  entries?: PerformanceEntry[];
};

type ExtendedMetric = MetricWithEntries & {
  delta?: number;
  rating?: "good" | "needs-improvement" | "poor";
  navigationType?: PerformanceNavigationTiming["type"];
};

const VITALS_ENDPOINT = "/api/observability/vitals";

function describeNode(element?: Element | null) {
  if (!element) return undefined;
  const tag = element.tagName?.toLowerCase?.() ?? "unknown";
  const id = element.id ? `#${element.id}` : "";
  const className = typeof element.className === "string"
    ? element.className
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((token) => `.${token}`)
        .join("")
    : "";
  return `${tag}${id}${className}`;
}

function extractEntry(metric: MetricWithEntries) {
  if (!Array.isArray(metric.entries) || metric.entries.length === 0) {
    return undefined;
  }
  return metric.entries[metric.entries.length - 1];
}

function postVital(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(VITALS_ENDPOINT, blob)) {
        return;
      }
    }

    void fetch(VITALS_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
      credentials: "omit",
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[web-vitals] failed to post metric", error);
    }
  }
}

export default function reportWebVitals(metric: NextWebVitalsMetric) {
  if (typeof window === "undefined") return;

  const extendedMetric = metric as ExtendedMetric;
  const entry = extractEntry(extendedMetric);

  let descriptor: string | undefined;
  let snippet: string | undefined;
  let entryMeta: Record<string, unknown> | undefined;

  if (metric.name === "LCP" && entry) {
    const lcpEntry = entry as LargestContentfulPaint;
    descriptor = describeNode(lcpEntry.element ?? undefined);
    snippet = (lcpEntry.element?.textContent ?? "").trim().slice(0, 80) || undefined;
    entryMeta = {
      size: lcpEntry.size,
      startTime: lcpEntry.startTime,
      renderTime: lcpEntry.renderTime,
      loadTime: lcpEntry.loadTime,
      url: lcpEntry.url,
    };
  } else if (metric.name === "INP" && entry) {
    const inpEntry = entry as PerformanceEventTiming;
    descriptor = describeNode((inpEntry as PerformanceEventTiming & { target?: Element }).target);
    entryMeta = {
      startTime: inpEntry.startTime,
      duration: inpEntry.duration,
      processingStart: inpEntry.processingStart,
      interactionType: inpEntry.name,
    };
  }

  const debugVitals = process.env.NEXT_PUBLIC_DEBUG_VITALS === "true";

  if ((process.env.NODE_ENV !== "production" || debugVitals) && descriptor) {
    console.info("[web-vitals]", metric.name, metric.value.toFixed(0), descriptor, entryMeta);
  }

  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
  };
  const connection = nav.connection;

  postVital({
    id: extendedMetric.id,
    name: extendedMetric.name,
    value: extendedMetric.value,
    delta: typeof extendedMetric.delta === "number" ? extendedMetric.delta : undefined,
    rating: extendedMetric.rating,
    navigationType: extendedMetric.navigationType,
    path: window.location.pathname,
    element: descriptor,
    snippet,
    visibilityState: document.visibilityState,
    timestamp: Date.now(),
    net: connection ? { effectiveType: connection.effectiveType, saveData: connection.saveData } : undefined,
    entryMeta,
  });
}
