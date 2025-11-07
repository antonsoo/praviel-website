import { NextResponse } from "next/server";
// import * as Sentry from "@sentry/nextjs";

type AnalyticsEventPayload = {
  event: string;
  source?: string;
  meta?: Record<string, unknown>;
};

export async function POST(request: Request) {
  let payload: AnalyticsEventPayload | null = null;
  try {
    payload = (await request.json()) as AnalyticsEventPayload;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (!payload?.event) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const ua = request.headers.get("user-agent") ?? "unknown";
  const logPayload = {
    event: payload.event,
    source: payload.source ?? "unspecified",
    meta: payload.meta,
    ua,
  };

  console.log("[analytics-event]", logPayload);

  // try {
  //   Sentry.withScope((scope) => {
  //     scope.setTag("analytics_event", payload?.event ?? "unknown");
  //     scope.setContext("analytics", {
  //       source: logPayload.source,
  //       meta: logPayload.meta,
  //       ua,
  //     });
  //     Sentry.captureMessage(`[analytics] ${payload.event}`);
  //   });
  // } catch (error) {
  //   console.debug("[analytics-event] sentry capture skipped", error);
  // }

  return NextResponse.json({ ok: true });
}
