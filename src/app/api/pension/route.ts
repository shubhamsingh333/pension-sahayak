import { NextResponse } from "next/server";
import { ppoSchema } from "@/lib/validation";
import { ApiError, apiError, readBody } from "@/lib/server/http";
export async function POST(request: Request) {
  try {
    const input = ppoSchema.safeParse(await readBody(request));
    if (!input.success) throw new ApiError(400, input.error.issues[0].message);
    if (input.data.ppo !== "DEMO-PPO-12345")
      throw new ApiError(404, "No sample record found. Try DEMO-PPO-12345.");
    return NextResponse.json(
      {
        data: {
          ppo: input.data.ppo,
          name: "Sample Pensioner",
          branch: "Army",
          status: "Active · demo record",
          lifeCertificate: "Acknowledged · illustrative",
          demo: true,
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
