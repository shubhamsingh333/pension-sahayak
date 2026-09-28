import { NextResponse } from "next/server";
import { trackingSchema } from "@/lib/validation";
import { findGrievance } from "@/lib/server/grievances";
import { ApiError, apiError } from "@/lib/server/http";
export const runtime = "nodejs";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  try {
    const parsed = trackingSchema.safeParse((await params).reference);
    if (!parsed.success) throw new ApiError(400, "Invalid tracking reference.");
    const record = await findGrievance(parsed.data);
    if (!record)
      throw new ApiError(404, "No demo grievance found for this reference.");
    return NextResponse.json(
      { data: record },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
