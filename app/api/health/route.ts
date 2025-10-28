import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    uptime: process.uptime(),
    ts: Date.now(),
  });
}
