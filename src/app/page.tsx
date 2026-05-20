import { Dashboard } from "@/components/dashboard/dashboard";
import { allMarkers, dashboardData } from "@/lib/data/dummy";

export default function HomePage() {
  return <Dashboard initialData={dashboardData} initialMarkers={allMarkers} />;
}
