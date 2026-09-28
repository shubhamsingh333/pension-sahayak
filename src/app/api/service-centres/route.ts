import { NextResponse } from "next/server";
import { en } from "@/i18n/messages/en";
import { filterCentres, localizeCentres } from "@/lib/centres";
const directory = localizeCentres(en);
export function GET(request: Request) {
  const query = (new URL(request.url).searchParams.get("q") ?? "").slice(0, 80);
  return NextResponse.json({
    data: filterCentres(directory, query).map(
      ({ searchText, ...centre }) => centre,
    ),
    demo: true,
  });
}
