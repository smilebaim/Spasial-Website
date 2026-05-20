import { Dashboard } from "@/components/dashboard/dashboard";
import { allMarkers, dashboardData } from "@/lib/data/dummy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Desa — Monitoring Hidrometeorologi",
  description:
    "Dashboard monitoring bencana hidrometeorologi tingkat desa dan kabupaten — Spatial Society",
};

export default function DashboardDesaPage() {
  return <Dashboard initialData={dashboardData} initialMarkers={allMarkers} />;
}
