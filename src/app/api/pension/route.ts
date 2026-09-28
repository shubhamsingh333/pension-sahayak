import { NextResponse } from "next/server";
import { ppoSchema } from "@/lib/validation";
import { DEMO_PPO, demoPensionRecord } from "@/lib/demo-pension";
import { ApiError, apiError, parseInput, readBody } from "@/lib/server/http";
export async function POST(request: Request) {
  try {
    const { ppo } = parseInput(ppoSchema, await readBody(request));
    if (ppo !== DEMO_PPO)
      throw new ApiError(
        404,
        "ppo_not_found",
        `No sample record found. Try ${DEMO_PPO}.`,
      );
    return NextResponse.json(
      { data: demoPensionRecord },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
