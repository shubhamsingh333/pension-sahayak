import { NextResponse } from "next/server";
import { grievanceSchema } from "@/lib/validation";
import { createGrievance } from "@/lib/server/grievances";
import { ApiError, apiError, readBody } from "@/lib/server/http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const input = grievanceSchema.safeParse(await readBody(request));
    if (!input.success) throw new ApiError(400, input.error.issues[0].message);
    return NextResponse.json(
      { data: await createGrievance(input.data) },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
