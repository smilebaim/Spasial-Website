import { NextRequest, NextResponse } from "next/server";
import { allMarkers, filterMarkers } from "@/lib/data/dummy";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "all";
  const kab = searchParams.get("kab") ?? "all";

  const markers = filterMarkers(allMarkers, { type, kab });
  return NextResponse.json({ markers, total: markers.length });
}
