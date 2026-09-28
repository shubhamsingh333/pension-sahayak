import { NextResponse } from "next/server";
import { centreQuerySchema } from "@/lib/service-centres";
import { centreDirectory } from "@/lib/server/service-centres";
import { apiError, parseInput } from "@/lib/server/http";
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
      // The list only changes with a deploy, and Netlify purges its CDN cache on deploy.
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=86400" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
