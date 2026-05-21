import { Dashboard } from "@/components/dashboard/dashboard";
import { allMarkers, dashboardData } from "@/lib/data/dummy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Desa — Remau Baku Tuo, Jambi",
  description:
    "Dashboard monitoring hidrometeorologi Desa Remau Baku Tuo, Kecamatan Sadu, Kabupaten Tanjung Jabung Timur, Provinsi Jambi",
};

export default function DashboardDesaPage() {
  return <Dashboard initialData={dashboardData} initialMarkers={allMarkers} />;
}
