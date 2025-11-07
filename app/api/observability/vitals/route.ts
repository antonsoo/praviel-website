import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

type WebVitalPayload = {
  id: string;
  name: string;
  value: number;
  delta?: number;
  rating?: string;
  navigationType?: string;
  path?: string;
  element?: string;
  snippet?: string;
  visibilityState?: string;
  timestamp?: number;
  net?: { effectiveType?: string; saveData?: boolean };
};

export async function POST(request: Request) {
  let payload: WebVitalPayload | null = null;
  try {
    payload = (await request.json()) as WebVitalPayload;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (!payload || typeof payload.id !== "string" || typeof payload.name !== "string") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const ua = request.headers.get("user-agent") ?? "unknown";
  const logPayload = {
    name: payload.name,
    value: Number.isFinite(payload.value) ? Math.round(payload.value) : null,
    rating: payload.rating,
    path: payload.path,
    element: payload.element,
    snippet: payload.snippet,
    navigationType: payload.navigationType,
    visibilityState: payload.visibilityState,
    net: payload.net,
    ua,
  };

  console.log("[web-vitals]", logPayload);

  try {
    Sentry.withScope((scope) => {
      scope.setTag("metric", payload.name);
      scope.setLevel("info");
      scope.setContext("web-vitals", {
        value: logPayload.value,
        rating: logPayload.rating,
        path: logPayload.path,
        element: logPayload.element,
        snippet: logPayload.snippet,
        navigationType: logPayload.navigationType,
        visibilityState: logPayload.visibilityState,
        net: logPayload.net,
        ua: logPayload.ua,
      });
      Sentry.captureMessage(`[web-vitals] ${payload.name}`);
    });
  } catch (error) {
    console.debug("[web-vitals] sentry capture skipped", error);
  }

  return NextResponse.json({ ok: true });
}
