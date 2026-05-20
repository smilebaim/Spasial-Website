"use client";

import Link from "next/link";
import { useState, type ComponentType } from "react";
import {
  Map,
  LayoutDashboard,
  Layers,
  Search,
  Bell,
  Settings,
  Info,
  Filter,
  Globe,
  FileText,
  ChevronDown,
} from "lucide-react";
import { MapLoader } from "@/components/map/map-loader";
import {
  allMarkers,
  INDONESIA_MAP_CENTER,
  INDONESIA_MAP_MAX_ZOOM,
  INDONESIA_MAP_MIN_ZOOM,
  INDONESIA_MAP_ZOOM,
} from "@/lib/data/dummy";
import { cn } from "@/lib/utils";

const TOP_NAV = [
  { label: "Peta Nasional", href: "/", active: true },
  { label: "Dashboard Desa", href: "/Dashboard-Desa", active: false },
  { label: "Laporan", href: "#", active: false },
] as const;

const BOTTOM_DOCK = [
  { label: "Beranda", icon: Globe, href: "/", active: true },
  { label: "Dashboard", icon: LayoutDashboard, href: "/Dashboard-Desa", active: false },
  { label: "Layer", icon: Layers, href: "#", active: false },
  { label: "Filter", icon: Filter, href: "#", active: false },
  { label: "Cari", icon: Search, href: "#", active: false },
  { label: "Notifikasi", icon: Bell, href: "#", active: false },
  { label: "Info", icon: Info, href: "#", active: false },
  { label: "Pengaturan", icon: Settings, href: "#", active: false },
] as const;

function DockButton({
  label,
  icon: Icon,
  href,
  active,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "group flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200",
        active
          ? "bg-primary/15 scale-110"
          : "hover:bg-white/60 hover:scale-105 dark:hover:bg-white/10",
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-colors",
          active
            ? "bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]"
            : "bg-white/90 text-foreground dark:bg-white/10",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span
        className={cn(
          "text-[10px] font-medium max-w-[72px] truncate",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );

  if (href === "#") {
    return (
      <button type="button" className="cursor-pointer">
        {inner}
      </button>
    );
  }

  return (
    <Link href={href} className="cursor-pointer">
      {inner}
    </Link>
  );
}

export function IndonesiaHome() {
  const [layersOpen, setLayersOpen] = useState(false);

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

          <nav className="hidden md:flex items-center gap-1">
            {TOP_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setLayersOpen((v) => !v)}
              className={cn(
                "hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                layersOpen
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-background/60 hover:bg-accent",
              )}
            >
              <Layers className="h-3.5 w-3.5" />
              Layer
              <ChevronDown
                className={cn("h-3 w-3 transition-transform", layersOpen && "rotate-180")}
              />
            </button>
            <Link
              href="/Dashboard-Desa"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard Desa
            </Link>
          </div>
        </div>

        {layersOpen && (
          <div className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-xl dark:bg-card/90">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Layer Peta</p>
            <div className="flex flex-wrap gap-2">
              {["Wilayah Terdampak", "Faskes", "Posko", "Jaringan", "Batas Administrasi"].map(
                (layer) => (
                  <label
                    key={layer}
                    className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs cursor-pointer hover:bg-accent"
                  >
                    <input type="checkbox" defaultChecked className="accent-primary" />
                    {layer}
                  </label>
                ),
              )}
            </div>
          </div>
        )}
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
            Peta interaktif seluruh wilayah Indonesia. Ketuk marker atau buka Dashboard Desa untuk
            detail monitoring.
          </p>
        </div>
      </div>

      {/* Bottom dock */}
      <footer className="absolute bottom-0 left-0 right-0 z-[1000] px-4 pb-5 pointer-events-none">
        <div className="pointer-events-auto mx-auto flex max-w-3xl items-end justify-center">
          <div className="flex items-end gap-0.5 sm:gap-1 rounded-[2rem] border border-white/25 bg-white/75 px-3 py-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:bg-card/80">
            {BOTTOM_DOCK.map((item) => (
              <DockButton key={item.label} {...item} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
