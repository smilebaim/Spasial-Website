"use client";

import { Map, LogIn } from "lucide-react";
import { MapLoader } from "@/components/map/map-loader";
import {
  allMarkers,
  INDONESIA_MAP_CENTER,
  INDONESIA_MAP_MAX_ZOOM,
  INDONESIA_MAP_MIN_ZOOM,
  INDONESIA_MAP_ZOOM,
} from "@/lib/data/dummy";
import { Button } from "@/components/ui/button";

export function IndonesiaHome() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background home-map-full">
      <MapLoader
        markers={allMarkers}
        center={INDONESIA_MAP_CENTER}
        zoom={INDONESIA_MAP_ZOOM}
        minZoom={INDONESIA_MAP_MIN_ZOOM}
        maxZoom={INDONESIA_MAP_MAX_ZOOM}
        tileStyle="satellite"
        showLegend={false}
        zoomControl={false}
        rounded={false}
        className="absolute inset-0 h-full w-full"
      />

      {/* Top dock */}
      <header className="absolute top-0 left-0 right-0 z-[1000] px-3 pt-3 pointer-events-none">
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 rounded-xl bg-white/95 px-2.5 py-1.5 shadow-md dark:bg-card/95">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-primary-foreground"
              style={{ background: "var(--gradient-header)" }}
            >
              <Map className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs font-bold leading-tight truncate">
                Digital Spasial Indonesia
              </h1>
              <p className="text-[9px] text-muted-foreground truncate">
                Sistem Informasi Geospasial Nasional
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="shrink-0 h-9 w-9 rounded-xl bg-white/95 shadow-md hover:bg-white dark:bg-card/95"
            aria-label="Login"
          >
            <LogIn className="h-4 w-4" />
          </Button>
        </div>
      </header>
    </div>
  );
}
