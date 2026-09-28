import { NextResponse } from "next/server";
import { centreQuerySchema } from "@/lib/service-centres";
import { centreDirectory } from "@/lib/server/service-centres";
import { apiError, parseInput } from "@/lib/server/http";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  try {
    const query = parseInput(
      centreQuerySchema,
      Object.fromEntries(new URL(request.url).searchParams),
    );
    return NextResponse.json(
      {
        data: centreDirectory.search(query),
        source: {
          url: centreDirectory.source,
          retrievedAt: centreDirectory.retrievedAt,
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
