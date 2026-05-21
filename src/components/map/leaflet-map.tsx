"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { getMarkerColor, MAP_CENTER, MAP_DEFAULT_ZOOM, type MapMarker } from "@/lib/data/dummy";
import type { MapTileStyle } from "@/components/map/map-types";
import "leaflet/dist/leaflet.css";

const TILE_CONFIG: Record<
  MapTileStyle,
  { url: string; attribution: string; labels?: { url: string; attribution: string } }
> = {
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      'Tiles &copy; <a href="https://www.esri.com/">Esri</a> — Source: Esri, Maxar, Earthstar Geographics',
    labels: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
    },
  },
};

function createIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<span style="
      display:block;width:14px;height:14px;
      background:${color};border:2px solid white;
      border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.35);
    "></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

interface LeafletMapProps {
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
  zoomControl?: boolean;
}

function LeafletMap({
  markers = [],
  className = "h-full min-h-[400px] w-full",
  center = MAP_CENTER,
  zoom = MAP_DEFAULT_ZOOM,
  minZoom,
  maxZoom,
  showLegend = true,
  legendTitle = "Tingkat Dampak",
  rounded = true,
  tileStyle = "street",
  zoomControl = true,
}: LeafletMapProps) {
  const [mounted, setMounted] = useState(false);
  const tiles = TILE_CONFIG[tileStyle];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, [mounted]);

  if (!mounted) {
    return <div className={`relative ${className}`} aria-hidden />;
  }

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        className={`h-full w-full z-0 ${rounded ? "rounded-lg" : ""}`}
        scrollWheelZoom
        zoomControl={zoomControl}
      >
        <TileLayer attribution={tiles.attribution} url={tiles.url} />
        {tiles.labels && (
          <TileLayer attribution={tiles.labels.attribution} url={tiles.labels.url} opacity={0.85} />
        )}
        <MapResizer />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={createIcon(getMarkerColor(m))}>
            <Popup>
              <div className="text-sm min-w-[140px]">
                <p className="font-semibold">{m.name}</p>
                <p className="text-muted-foreground text-xs">
                  {m.kec ? `${m.kec}, ` : ""}
                  {m.kab}
                </p>
                {m.dampak && <p className="text-xs mt-1 capitalize">Dampak: {m.dampak}</p>}
                {m.status && <p className="text-xs mt-1 capitalize">Status: {m.status}</p>}
                {m.pengungsi != null && <p className="text-xs mt-1">Pengungsi: {m.pengungsi}</p>}
                {m.kapasitas != null && <p className="text-xs">Kapasitas: {m.kapasitas}</p>}
                {m.detail && <p className="text-xs mt-1">{m.detail}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {showLegend && (
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-lg p-3 text-[10px] shadow space-y-1 z-[1000] pointer-events-none">
          <div className="font-bold mb-1">{legendTitle}</div>
          {[
            ["#ef4444", "Berat / Critical"],
            ["#f97316", "Sedang"],
            ["#eab308", "Ringan / Warning"],
            ["#22c55e", "Aman / Normal"],
            ["#3b82f6", "Faskes"],
            ["#8b5cf6", "Posko"],
          ].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c }} />
              {l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeafletMap;
export { LeafletMap };
