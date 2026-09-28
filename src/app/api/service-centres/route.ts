import { centres } from "@/lib/centres";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const query = (new URL(request.url).searchParams.get("q") ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 80);
  return NextResponse.json({
    data: centres.filter((c) =>
      (c.city + " " + c.services.join(" ")).toLowerCase().includes(query),
    ),
    demo: true,
  });
}
