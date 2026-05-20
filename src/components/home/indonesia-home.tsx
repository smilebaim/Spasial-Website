"use client";

import Link from "next/link";
import { Map, LayoutDashboard, LogIn, FileText } from "lucide-react";
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
        showLegend={false}
        rounded={false}
        className="absolute inset-0 h-full w-full"
      />

      {/* Top dock */}
      <header className="absolute top-0 left-0 right-0 z-[1000] px-4 pt-4 pointer-events-none">
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/80 px-4 py-2.5 shadow-[var(--shadow-elevated)] backdrop-blur-xl dark:bg-card/85">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-header)" }}
            >
              <Map className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold leading-tight truncate sm:text-base">
                Digital Spasial Indonesia
              </h1>
              <p className="text-[10px] text-muted-foreground truncate sm:text-xs">
                Sistem Informasi Geospasial Nasional
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 h-10 w-10 rounded-xl hover:bg-accent"
            aria-label="Login"
          >
            <LogIn className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Legend ringkas */}
      <div className="absolute left-4 top-28 z-[1000] hidden sm:block pointer-events-none">
        <div className="pointer-events-auto rounded-xl border border-white/20 bg-white/90 p-3 text-[10px] shadow-lg backdrop-blur-xl dark:bg-card/90 space-y-1">
          <div className="font-bold mb-1.5 text-xs">Legenda</div>
          {[
            ["#ef4444", "Berat"],
            ["#f97316", "Sedang"],
            ["#eab308", "Ringan"],
            ["#22c55e", "Aman"],
            ["#3b82f6", "Faskes"],
            ["#8b5cf6", "Posko"],
          ].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c }} />
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Info strip */}
      <div className="absolute right-4 top-28 z-[1000] hidden lg:block pointer-events-none">
        <div className="pointer-events-auto rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-xl dark:bg-card/90 max-w-[200px]">
          <div className="flex items-center gap-2 text-primary mb-1">
            <FileText className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">Ringkasan Nasional</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Peta interaktif seluruh wilayah Indonesia. Ketuk marker atau buka Dashboard untuk detail
            monitoring.
          </p>
        </div>
      </div>

      {/* Bottom dock */}
      <footer className="absolute bottom-0 left-0 right-0 z-[1000] px-4 pb-5 pointer-events-none">
        <div className="pointer-events-auto mx-auto flex items-end justify-center">
          <Link
            href="/Dashboard-Desa"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 hover:bg-white/60 hover:scale-105 dark:hover:bg-white/10"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-foreground shadow-sm dark:bg-white/10">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">Dashboard</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
