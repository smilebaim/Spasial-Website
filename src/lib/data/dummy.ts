export type DampakLevel = "berat" | "sedang" | "ringan" | "aman";
export type MarkerType = "wilayah" | "faskes" | "posko" | "jaringan";
export type JaringanStatus = "critical" | "warning" | "normal";

export const PROVINSI = "Jambi";
export const KABUPATEN = "Tanjung Jabung Timur";
export const KECAMATAN = "Sadu";
export const DESA_UTAMA = "Remau Baku Tuo";

export const DESA_SADU = [
  "Remau Baku Tuo",
  "Sungai Lokan",
  "Sungai Cemara",
  "Labuhan Pering",
  "Air Hitam Laut",
  "Sungai Benuh",
  "Sungai Itik",
  "Sungai Jambat",
  "Sungai Sayang",
] as const;

export interface MapMarker {
  id: string;
  type: MarkerType;
  name: string;
  kab: string;
  kec?: string;
  lat: number;
  lng: number;
  dampak?: DampakLevel;
  status?: JaringanStatus;
  kapasitas?: number;
  pengungsi?: number;
  detail?: string;
}

export interface DashboardData {
  updatedAt: string;
  stats: {
    totalKorban: number;
    pengungsi: number;
    titikPengungsian: number;
    rumahRusak: number;
    sawahHa: number;
    kabTerdampak: number;
    totalPenduduk: number;
    totalKK: number;
    disabilitas: number;
    totalDesa: number;
    orangHilangDicari: number;
    orangHilangDitemukan: number;
  };
  statusWilayah: { name: string; value: number; color: string }[];
  topWilayah: { name: string; korban: number }[];
  pertanianData: {
    nama: string;
    kab: string;
    kec: string;
    vol: string;
    rugi: string;
    kondisi: string;
  }[];
  pendudukData: {
    kab: string;
    penduduk: number;
    kk: number;
    pengungsi: number;
  }[];
  bantuanData: {
    desa: string;
    kec: string;
    kab: string;
    satuan: string;
    status: string;
  }[];
  sektorData: { name: string; value: number }[];
  ringkasanKerusakan: { label: string; value: string }[];
  rekapCluster: {
    kerusakan: string;
    kerugian: string;
    total: string;
  };
  faskes: { label: string; value: number }[];
  jaringan: { label: string; value: number; status: JaringanStatus }[];
  posko: { label: string; value: number }[];
  disabilitasChart: { n: string; v: number }[];
  distribusiBantuan: { n: string; v: number }[];
}

/** Titik tengah Desa Remau Baku Tuo — dipakai di semua peta */
export const REMAU_BAKU_TUO_CENTER = {
  lat: -1.230550860605375,
  lng: 104.37625823808824,
};

const COORD_OFFSET = {
  lat: REMAU_BAKU_TUO_CENTER.lat - -1.485,
  lng: REMAU_BAKU_TUO_CENTER.lng - 104.855,
};

function shiftCoord(lat: number, lng: number): { lat: number; lng: number } {
  return { lat: lat + COORD_OFFSET.lat, lng: lng + COORD_OFFSET.lng };
}

/** Koordinat desa di Kecamatan Sadu, Kab. Tanjung Jabung Timur, Jambi */
const DESA_COORDS: Record<string, { lat: number; lng: number }> = {
  "Remau Baku Tuo": REMAU_BAKU_TUO_CENTER,
  "Sungai Lokan": shiftCoord(-1.472, 104.84),
  "Sungai Cemara": shiftCoord(-1.498, 104.868),
  "Labuhan Pering": shiftCoord(-1.465, 104.875),
  "Air Hitam Laut": shiftCoord(-1.505, 104.83),
  "Sungai Benuh": shiftCoord(-1.478, 104.862),
  "Sungai Itik": shiftCoord(-1.492, 104.848),
  "Sungai Jambat": shiftCoord(-1.468, 104.852),
  "Sungai Sayang": shiftCoord(-1.501, 104.845),
};

const DAMPAK_COLOR: Record<DampakLevel, string> = {
  berat: "#ef4444",
  sedang: "#f97316",
  ringan: "#eab308",
  aman: "#22c55e",
};

/** Pusat peta — Desa Remau Baku Tuo */
export const MAP_CENTER = REMAU_BAKU_TUO_CENTER;
export const MAP_DEFAULT_ZOOM = 13;

/** Tampilan peta halaman utama — wilayah Kec. Sadu */
export const INDONESIA_MAP_CENTER = REMAU_BAKU_TUO_CENTER;
export const INDONESIA_MAP_ZOOM = 12;
export const INDONESIA_MAP_MIN_ZOOM = 10;
export const INDONESIA_MAP_MAX_ZOOM = 16;

export const dashboardData: DashboardData = {
  updatedAt: "20 Mei 2026, 14:32",
  stats: {
    totalKorban: 186,
    pengungsi: 420,
    titikPengungsian: 8,
    rumahRusak: 95,
    sawahHa: 45,
    kabTerdampak: 1,
    totalPenduduk: 3480,
    totalKK: 980,
    disabilitas: 42,
    totalDesa: 9,
    orangHilangDicari: 2,
    orangHilangDitemukan: 5,
  },
  statusWilayah: [
    { name: "Aman", value: 4, color: "oklch(0.65 0.18 145)" },
    { name: "Waspada", value: 2, color: "oklch(0.75 0.18 75)" },
    { name: "Siaga", value: 2, color: "oklch(0.7 0.2 50)" },
    { name: "Awas", value: 1, color: "oklch(0.55 0.22 27)" },
  ],
  topWilayah: [
    { name: "Remau Baku Tuo", korban: 68 },
    { name: "Sungai Lokan", korban: 42 },
    { name: "Sungai Cemara", korban: 35 },
    { name: "Labuhan Pering", korban: 24 },
    { name: "Air Hitam Laut", korban: 17 },
  ],
  pertanianData: [
    {
      nama: "Sawah Remau Baku Tuo",
      kab: KABUPATEN,
      kec: KECAMATAN,
      vol: "18 Ha",
      rugi: "Rp 420 Jt",
      kondisi: "Berat",
    },
    {
      nama: "Sawah Sungai Cemara",
      kab: KABUPATEN,
      kec: KECAMATAN,
      vol: "12 Ha",
      rugi: "Rp 280 Jt",
      kondisi: "Sedang",
    },
    {
      nama: "Ladang Sungai Lokan",
      kab: KABUPATEN,
      kec: KECAMATAN,
      vol: "8 Ha",
      rugi: "Rp 195 Jt",
      kondisi: "Ringan",
    },
    {
      nama: "Kebun Labuhan Pering",
      kab: KABUPATEN,
      kec: KECAMATAN,
      vol: "5 Ha",
      rugi: "Rp 120 Jt",
      kondisi: "Sedang",
    },
    {
      nama: "Sawah Air Hitam Laut",
      kab: KABUPATEN,
      kec: KECAMATAN,
      vol: "2 Ha",
      rugi: "Rp 85 Jt",
      kondisi: "Berat",
    },
  ],
  pendudukData: [
    { kab: "Remau Baku Tuo", penduduk: 520, kk: 148, pengungsi: 145 },
    { kab: "Sungai Lokan", penduduk: 410, kk: 118, pengungsi: 82 },
    { kab: "Sungai Cemara", penduduk: 485, kk: 132, pengungsi: 68 },
    { kab: "Labuhan Pering", penduduk: 390, kk: 105, pengungsi: 54 },
    { kab: "Air Hitam Laut", penduduk: 365, kk: 98, pengungsi: 41 },
  ],
  bantuanData: [
    {
      desa: "Remau Baku Tuo",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "180 Paket",
      status: "Kuning",
    },
    {
      desa: "Sungai Lokan",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "120 Paket",
      status: "Biru",
    },
    {
      desa: "Sungai Cemara",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "95 Paket",
      status: "Abu-abu",
    },
    {
      desa: "Labuhan Pering",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "80 Paket",
      status: "Kuning",
    },
    {
      desa: "Air Hitam Laut",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "65 Paket",
      status: "Putih",
    },
    {
      desa: "Sungai Benuh",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "55 Paket",
      status: "Biru",
    },
    {
      desa: "Sungai Itik",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "48 Paket",
      status: "Kuning",
    },
    {
      desa: "Sungai Jambat",
      kec: KECAMATAN,
      kab: KABUPATEN,
      satuan: "42 Paket",
      status: "Biru",
    },
  ],
  sektorData: [
    { name: "Permukiman", value: 95 },
    { name: "Infrastruktur", value: 68 },
    { name: "Pertanian", value: 45 },
    { name: "Sosial", value: 32 },
  ],
  ringkasanKerusakan: [
    { label: "Fasum Rusak", value: "24" },
    { label: "Kebun (Ha)", value: "18" },
    { label: "Tambak (Ha)", value: "12" },
  ],
  rekapCluster: {
    kerusakan: "Rp 2.8 M",
    kerugian: "Rp 1.9 M",
    total: "Rp 4.7 M",
  },
  faskes: [
    { label: "Puskesmas", value: 2 },
    { label: "Posyandu", value: 9 },
    { label: "Polindes", value: 4 },
  ],
  jaringan: [
    { label: "Critical", value: 1, status: "critical" },
    { label: "Warning", value: 2, status: "warning" },
    { label: "Normal", value: 5, status: "normal" },
  ],
  posko: [
    { label: "Total Posko", value: 8 },
    { label: "Pengungsi", value: 420 },
    { label: "Titik", value: 8 },
  ],
  disabilitasChart: [
    { n: "Fisik", v: 18 },
    { n: "Sensorik", v: 12 },
    { n: "Mental", v: 6 },
    { n: "Lainnya", v: 6 },
  ],
  distribusiBantuan: [
    { n: "Kuning", v: 42 },
    { n: "Biru", v: 28 },
    { n: "Abu-abu", v: 15 },
    { n: "Putih", v: 10 },
  ],
};

const wilayahMarkers: MapMarker[] = (
  [
    ["Remau Baku Tuo", "berat"],
    ["Sungai Lokan", "sedang"],
    ["Sungai Cemara", "ringan"],
    ["Labuhan Pering", "sedang"],
    ["Air Hitam Laut", "berat"],
    ["Sungai Benuh", "aman"],
  ] as const
).map(([desa, dampak], i) => {
  const c = DESA_COORDS[desa];
  return {
    id: `wilayah-${i}`,
    type: "wilayah" as const,
    name: `Desa ${desa}`,
    kab: KABUPATEN,
    kec: desa,
    lat: c.lat,
    lng: c.lng,
    dampak,
    detail: `${KECAMATAN}, ${KABUPATEN}, ${PROVINSI} — Dampak: ${dampak}`,
  };
});

const faskesMarkers: MapMarker[] = [
  {
    name: "Puskesmas Sadu",
    kab: KABUPATEN,
    kec: KECAMATAN,
    ...shiftCoord(-1.472, 104.842),
    detail: "Puskesmas Kecamatan",
  },
  {
    name: "Puskesmas Pembantu Remau Baku Tuo",
    kab: KABUPATEN,
    kec: DESA_UTAMA,
    ...shiftCoord(-1.486, 104.856),
    detail: "Puskesmas Pembantu",
  },
  {
    name: "Posyandu Remau Baku Tuo",
    kab: KABUPATEN,
    kec: DESA_UTAMA,
    ...REMAU_BAKU_TUO_CENTER,
    detail: "Posyandu",
  },
  {
    name: "Polindes Sungai Lokan",
    kab: KABUPATEN,
    kec: "Sungai Lokan",
    ...shiftCoord(-1.471, 104.839),
    detail: "Polindes",
  },
  {
    name: "Posyandu Sungai Cemara",
    kab: KABUPATEN,
    kec: "Sungai Cemara",
    ...shiftCoord(-1.497, 104.867),
    detail: "Posyandu",
  },
].map((f, i) => ({
  id: `faskes-${i}`,
  type: "faskes" as const,
  ...f,
}));

const poskoMarkers: MapMarker[] = [
  {
    name: "Posko Desa Remau Baku Tuo",
    kab: KABUPATEN,
    kec: DESA_UTAMA,
    ...REMAU_BAKU_TUO_CENTER,
    kapasitas: 120,
    pengungsi: 98,
  },
  {
    name: "Posko Sungai Lokan",
    kab: KABUPATEN,
    kec: "Sungai Lokan",
    ...shiftCoord(-1.473, 104.841),
    kapasitas: 80,
    pengungsi: 72,
  },
  {
    name: "Posko Sungai Cemara",
    kab: KABUPATEN,
    kec: "Sungai Cemara",
    ...shiftCoord(-1.499, 104.869),
    kapasitas: 70,
    pengungsi: 58,
  },
  {
    name: "Posko Labuhan Pering",
    kab: KABUPATEN,
    kec: "Labuhan Pering",
    ...shiftCoord(-1.466, 104.876),
    kapasitas: 60,
    pengungsi: 48,
  },
  {
    name: "Posko Air Hitam Laut",
    kab: KABUPATEN,
    kec: "Air Hitam Laut",
    ...shiftCoord(-1.506, 104.831),
    kapasitas: 55,
    pengungsi: 42,
  },
  {
    name: "Posko Kecamatan Sadu",
    kab: KABUPATEN,
    kec: "Sungai Lokan",
    ...shiftCoord(-1.47, 104.838),
    kapasitas: 100,
    pengungsi: 65,
  },
].map((p, i) => ({
  id: `posko-${i}`,
  type: "posko" as const,
  ...p,
}));

const jaringanMarkers: MapMarker[] = [
  {
    name: "BTS Remau Baku Tuo",
    kab: KABUPATEN,
    kec: DESA_UTAMA,
    ...shiftCoord(-1.483, 104.857),
    status: "critical" as const,
  },
  {
    name: "Fiber Sungai Lokan",
    kab: KABUPATEN,
    kec: "Sungai Lokan",
    ...shiftCoord(-1.474, 104.843),
    status: "warning" as const,
  },
  {
    name: "BTS Sungai Cemara",
    kab: KABUPATEN,
    kec: "Sungai Cemara",
    ...shiftCoord(-1.496, 104.866),
    status: "warning" as const,
  },
  {
    name: "Tower Labuhan Pering",
    kab: KABUPATEN,
    kec: "Labuhan Pering",
    ...shiftCoord(-1.464, 104.874),
    status: "normal" as const,
  },
  {
    name: "BTS Air Hitam Laut",
    kab: KABUPATEN,
    kec: "Air Hitam Laut",
    ...shiftCoord(-1.504, 104.832),
    status: "normal" as const,
  },
].map((j, i) => ({
  id: `jaringan-${i}`,
  type: "jaringan" as const,
  ...j,
}));

export const allMarkers: MapMarker[] = [
  ...wilayahMarkers,
  ...faskesMarkers,
  ...poskoMarkers,
  ...jaringanMarkers,
];

export function desaToFilterSlug(desa: string): string {
  return desa.toLowerCase().replace(/\s+/g, "-");
}

export function filterMarkers(
  markers: MapMarker[],
  opts: { type?: string; kab?: string },
): MapMarker[] {
  let result = markers;
  if (opts.type && opts.type !== "all") {
    result = result.filter((m) => m.type === opts.type);
  }
  if (opts.kab && opts.kab !== "all") {
    const slug = opts.kab.toLowerCase();
    result = result.filter(
      (m) =>
        m.kec?.toLowerCase().replace(/\s+/g, "-") === slug ||
        m.kab.toLowerCase().replace(/\s+/g, "-") === slug,
    );
  }
  return result;
}

export function getMarkerColor(marker: MapMarker): string {
  if (marker.type === "wilayah" && marker.dampak) return DAMPAK_COLOR[marker.dampak];
  if (marker.type === "jaringan" && marker.status) {
    if (marker.status === "critical") return "#ef4444";
    if (marker.status === "warning") return "#eab308";
    return "#22c55e";
  }
  if (marker.type === "faskes") return "#3b82f6";
  if (marker.type === "posko") return "#8b5cf6";
  return "#64748b";
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} Jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} Rb`;
  return n.toLocaleString("id-ID");
}
