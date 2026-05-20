import { NextResponse } from "next/server";
import { dashboardData } from "@/lib/data/dummy";

export async function GET() {
  return NextResponse.json(dashboardData);
}
