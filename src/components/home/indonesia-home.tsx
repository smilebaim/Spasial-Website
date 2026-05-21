"use client";

import { MapLoader } from "@/components/map/map-loader";
import {
  allMarkers,
  INDONESIA_MAP_CENTER,
  INDONESIA_MAP_MAX_ZOOM,
  INDONESIA_MAP_MIN_ZOOM,
  INDONESIA_MAP_ZOOM,
} from "@/lib/data/dummy";

export function IndonesiaHome() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background home-map-full pt-14">
      <MapLoader
        markers={allMarkers}
        center={INDONESIA_MAP_CENTER}
        zoom={INDONESIA_MAP_ZOOM}
        minZoom={INDONESIA_MAP_MIN_ZOOM}
        maxZoom={INDONESIA_MAP_MAX_ZOOM}
        showLegend={false}
        zoomControl={false}
        rounded={false}
        className="absolute inset-x-0 top-14 bottom-[4.5rem] w-full"
      />
    </div>
  );
}
