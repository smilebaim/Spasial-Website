"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/lib/data/dummy";
import type { MapTileStyle } from "./leaflet-map";
import { MapPin } from "lucide-react";

const LeafletMap = dynamic(() => import("./leaflet-map").then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[400px] w-full flex items-center justify-center bg-muted/30 rounded-lg">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <MapPin className="w-8 h-8 animate-pulse" />
        <span className="text-sm">Memuat peta...</span>
      </div>
    </div>
  ),
});

interface MapLoaderProps {
  markers?: MapMarker[];
  className?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  showLegend?: boolean;
  legendTitle?: string;
  rounded?: boolean;
  tileStyle?: MapTileStyle;
}

export function MapLoader(props: MapLoaderProps) {
  return <LeafletMap {...props} />;
}
