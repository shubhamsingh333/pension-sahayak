import { NextResponse } from "next/server";
import { grievanceSchema } from "@/lib/validation";
import { createGrievance } from "@/lib/server/grievances";
import { apiError, parseInput, readBody } from "@/lib/server/http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const input = parseInput(grievanceSchema, await readBody(request));
    return NextResponse.json(
      { data: await createGrievance(input) },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
