"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

import { useCookiePreferences } from "@/lib/cookieConsent";

const VercelAnalytics = dynamic(() => import("@vercel/analytics/react").then((mod) => ({ default: mod.Analytics })), {
  ssr: false,
  loading: () => null,
});

type AnalyticsProvider = "cloudflare" | "vercel";

type AnalyticsConsentGateProps = {
  provider?: AnalyticsProvider | null;
  cloudflareToken?: string;
  sampleRate?: number;
};

export default function AnalyticsConsentGate({ provider = null, cloudflareToken, sampleRate = 1 }: AnalyticsConsentGateProps) {
  const { analytics } = useCookiePreferences();
  const normalizedSampleRate = useMemo(() => {
    if (!Number.isFinite(sampleRate)) return 1;
    return Math.min(Math.max(sampleRate, 0), 1);
  }, [sampleRate]);
  const [sampledIn, setSampledIn] = useState<boolean | null>(null);

  useEffect(() => {
    setSampledIn(Math.random() <= normalizedSampleRate);
  }, [normalizedSampleRate]);

  const shouldLoad = analytics && sampledIn && provider;

  useEffect(() => {
    if (!provider) return;
    if (provider === "cloudflare" && !cloudflareToken && process.env.NODE_ENV !== "production") {
      console.warn("[analytics] Cloudflare token missing; analytics disabled until configured.");
    }
    if (provider === "vercel" && process.env.NODE_ENV !== "production") {
      console.info("[analytics] Vercel analytics gated by consent.");
    }
  }, [cloudflareToken, provider]);

  if (!shouldLoad) {
    return null;
  }

  if (provider === "vercel") {
    return <VercelAnalytics mode="production" />;
  }

  if (provider === "cloudflare" && cloudflareToken) {
    return (
      <Script
        id="cloudflare-analytics"
        strategy="afterInteractive"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={JSON.stringify({ token: cloudflareToken, spa: true })}
      />
    );
  }

  return null;
}
