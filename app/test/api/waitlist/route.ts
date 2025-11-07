import { NextResponse } from "next/server";
import { joinWaitlist } from "@/app/actions";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const headerOverride = request.headers.get("x-enable-test-routes") === "1";
  const queryOverride = url.searchParams.get("enable-test-routes") === "1";
  const envAllow =
    process.env.ENABLE_TEST_ROUTES === "true" || process.env.NODE_ENV !== "production";
  const allowHarness = envAllow || headerOverride || queryOverride;

  if (!allowHarness) {
    return NextResponse.json({ error: "disabled" }, { status: 404 });
  }

  const body = await request.json();
  const formData = new FormData();
  formData.append("email", body.email ?? "");
  if (body.source) {
    formData.append("source", body.source);
  }

  const result = await joinWaitlist(formData);
  return NextResponse.json(result);
}
