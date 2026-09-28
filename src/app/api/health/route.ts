import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/server/db";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await (await getDatabase()).command({ ping: 1 });
    return NextResponse.json(
      { app: "ok", database: "connected", mode: "demo" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { app: "ok", database: "unavailable", mode: "demo" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
