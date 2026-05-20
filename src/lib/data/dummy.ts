export type DampakLevel = "berat" | "sedang" | "ringan" | "aman";
export type MarkerType = "wilayah" | "faskes" | "posko" | "jaringan";
export type JaringanStatus = "critical" | "warning" | "normal";

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

const KAB_COORDS: Record<string, { lat: number; lng: number }> = {
  Demak: { lat: -6.8949, lng: 110.6396 },
  Kudus: { lat: -6.8048, lng: 110.8407 },
  Pati: { lat: -6.7556, lng: 111.038 },
  Jepara: { lat: -6.5944, lng: 110.671 },
  Grobogan: { lat: -7.1542, lng: 110.9189 },
};

const DAMPAK_COLOR: Record<DampakLevel, string> = {
  berat: "#ef4444",
  sedang: "#f97316",
  ringan: "#eab308",
  aman: "#22c55e",
};

export const MAP_CENTER = { lat: -6.82, lng: 110.85 };
export const MAP_DEFAULT_ZOOM = 9;

export const dashboardData: DashboardData = {
  updatedAt: "20 Mei 2026, 14:32",
  stats: {
    totalKorban: 3940,
    pengungsi: 12450,
    titikPengungsian: 84,
    rumahRusak: 2310,
    sawahHa: 405,
    kabTerdampak: 5,
    totalPenduduk: 5990000,
    totalKK: 1685000,
    disabilitas: 3420,
    totalDesa: 248,
    orangHilangDicari: 7,
    orangHilangDitemukan: 15,
  },
  statusWilayah: [
    { name: "Aman", value: 42, color: "oklch(0.65 0.18 145)" },
    { name: "Waspada", value: 18, color: "oklch(0.75 0.18 75)" },
    { name: "Siaga", value: 9, color: "oklch(0.7 0.2 50)" },
    { name: "Awas", value: 5, color: "oklch(0.55 0.22 27)" },
  ],
  topWilayah: [
    { name: "Demak", korban: 1240 },
    { name: "Kudus", korban: 980 },
    { name: "Pati", korban: 760 },
    { name: "Jepara", korban: 540 },
    { name: "Grobogan", korban: 420 },
  ],
  pertanianData: [
    {
      nama: "Sawah Mlatiharjo",
      kab: "Demak",
      kec: "Gajah",
      vol: "120 Ha",
      rugi: "Rp 2.4 M",
      kondisi: "Berat",
    },
    {
      nama: "Sawah Karangrowo",
      kab: "Kudus",
      kec: "Undaan",
      vol: "85 Ha",
      rugi: "Rp 1.8 M",
      kondisi: "Sedang",
    },
    {
      nama: "Sawah Tlogowungu",
      kab: "Pati",
      kec: "Tlogowungu",
      vol: "60 Ha",
      rugi: "Rp 1.2 M",
      kondisi: "Ringan",
    },
    {
      nama: "Sawah Bandungrejo",
      kab: "Demak",
      kec: "Mranggen",
      vol: "95 Ha",
      rugi: "Rp 2.0 M",
      kondisi: "Berat",
    },
    {
      nama: "Sawah Margoyoso",
      kab: "Pati",
      kec: "Margoyoso",
      vol: "45 Ha",
      rugi: "Rp 950 Jt",
      kondisi: "Sedang",
    },
    {
      nama: "Sawah Bulu",
      kab: "Jepara",
      kec: "Tahunan",
      vol: "72 Ha",
      rugi: "Rp 1.5 M",
      kondisi: "Sedang",
    },
    {
      nama: "Sawah Purwodadi",
      kab: "Grobogan",
      kec: "Purwodadi",
      vol: "55 Ha",
      rugi: "Rp 1.1 M",
      kondisi: "Ringan",
    },
  ],
  pendudukData: [
    { kab: "Demak", penduduk: 1150000, kk: 320000, pengungsi: 4200 },
    { kab: "Kudus", penduduk: 870000, kk: 245000, pengungsi: 2850 },
    { kab: "Pati", penduduk: 1280000, kk: 360000, pengungsi: 2100 },
    { kab: "Jepara", penduduk: 1240000, kk: 350000, pengungsi: 1800 },
    { kab: "Grobogan", penduduk: 1450000, kk: 410000, pengungsi: 1500 },
  ],
  bantuanData: [
    { desa: "Mlatiharjo", kec: "Gajah", kab: "Demak", satuan: "500 Paket", status: "Kuning" },
    { desa: "Karangrowo", kec: "Undaan", kab: "Kudus", satuan: "350 Paket", status: "Biru" },
    { desa: "Tlogowungu", kec: "Tlogowungu", kab: "Pati", satuan: "200 Paket", status: "Abu-abu" },
    { desa: "Bandungrejo", kec: "Mranggen", kab: "Demak", satuan: "400 Paket", status: "Kuning" },
    { desa: "Margoyoso", kec: "Margoyoso", kab: "Pati", satuan: "150 Paket", status: "Putih" },
    {
      desa: "Kalinyamatan",
      kec: "Kalinyamatan",
      kab: "Jepara",
      satuan: "280 Paket",
      status: "Biru",
    },
    { desa: "Purwodadi", kec: "Purwodadi", kab: "Grobogan", satuan: "320 Paket", status: "Kuning" },
    { desa: "Bonang", kec: "Bonang", kab: "Demak", satuan: "180 Paket", status: "Biru" },
    { desa: "Gebog", kec: "Gebog", kab: "Kudus", satuan: "220 Paket", status: "Kuning" },
    { desa: "Sukolilo", kec: "Sukolilo", kab: "Pati", satuan: "160 Paket", status: "Abu-abu" },
  ],
  sektorData: [
    { name: "Permukiman", value: 4200 },
    { name: "Infrastruktur", value: 3100 },
    { name: "Pertanian", value: 2400 },
    { name: "Sosial", value: 1500 },
  ],
  ringkasanKerusakan: [
    { label: "Fasum Rusak", value: "84" },
    { label: "Kebun (Ha)", value: "215" },
    { label: "Tambak (Ha)", value: "92" },
  ],
  rekapCluster: {
    kerusakan: "Rp 18.2 M",
    kerugian: "Rp 12.5 M",
    total: "Rp 30.7 M",
  },
  faskes: [
    { label: "PKM", value: 28 },
    { label: "RSUD", value: 6 },
    { label: "RS Swasta", value: 12 },
  ],
  jaringan: [
    { label: "Critical", value: 3, status: "critical" },
    { label: "Warning", value: 8, status: "warning" },
    { label: "Normal", value: 35, status: "normal" },
  ],
  posko: [
    { label: "Total Posko", value: 84 },
    { label: "Pengungsi", value: 12450 },
    { label: "Titik", value: 84 },
  ],
  disabilitasChart: [
    { n: "Fisik", v: 1200 },
    { n: "Sensorik", v: 850 },
    { n: "Mental", v: 620 },
    { n: "Lainnya", v: 750 },
  ],
  distribusiBantuan: [
    { n: "Kuning", v: 120 },
    { n: "Biru", v: 68 },
    { n: "Abu-abu", v: 35 },
    { n: "Putih", v: 25 },
  ],
};

const wilayahMarkers: MapMarker[] = (
  [
    ["Demak", "berat"],
    ["Kudus", "sedang"],
    ["Pati", "ringan"],
    ["Jepara", "berat"],
    ["Grobogan", "aman"],
  ] as const
).map(([kab, dampak], i) => {
  const c = KAB_COORDS[kab];
  return {
    id: `wilayah-${i}`,
    type: "wilayah" as const,
    name: `Kab. ${kab}`,
    kab,
    lat: c.lat,
    lng: c.lng,
    dampak,
    detail: `Tingkat dampak: ${dampak}`,
  };
});

const faskesMarkers: MapMarker[] = [
  { name: "RSUD Kudus", kab: "Kudus", lat: -6.81, lng: 110.842, detail: "RSUD" },
  { name: "RSUD Pati", kab: "Pati", lat: -6.756, lng: 111.04, detail: "RSUD" },
  { name: "RSUD Demak", kab: "Demak", lat: -6.893, lng: 110.641, detail: "RSUD" },
  { name: "PKM Gajah", kab: "Demak", kec: "Gajah", lat: -6.92, lng: 110.61, detail: "PKM" },
  { name: "PKM Undaan", kab: "Kudus", kec: "Undaan", lat: -6.83, lng: 110.86, detail: "PKM" },
  { name: "PKM Tahunan", kab: "Jepara", kec: "Tahunan", lat: -6.6, lng: 110.68, detail: "PKM" },
  { name: "RS Mitra Jepara", kab: "Jepara", lat: -6.59, lng: 110.67, detail: "RS Swasta" },
  {
    name: "PKM Purwodadi",
    kab: "Grobogan",
    kec: "Purwodadi",
    lat: -7.15,
    lng: 110.92,
    detail: "PKM",
  },
].map((f, i) => ({
  id: `faskes-${i}`,
  type: "faskes" as const,
  ...f,
}));

const poskoMarkers: MapMarker[] = [
  {
    name: "Posko Gajah Demak",
    kab: "Demak",
    kec: "Gajah",
    lat: -6.91,
    lng: 110.62,
    kapasitas: 500,
    pengungsi: 420,
  },
  {
    name: "Posko Undaan Kudus",
    kab: "Kudus",
    kec: "Undaan",
    lat: -6.82,
    lng: 110.85,
    kapasitas: 400,
    pengungsi: 380,
  },
  {
    name: "Posko Tlogowungu",
    kab: "Pati",
    kec: "Tlogowungu",
    lat: -6.77,
    lng: 111.05,
    kapasitas: 350,
    pengungsi: 290,
  },
  {
    name: "Posko Mranggen",
    kab: "Demak",
    kec: "Mranggen",
    lat: -6.88,
    lng: 110.66,
    kapasitas: 450,
    pengungsi: 410,
  },
  {
    name: "Posko Tahunan",
    kab: "Jepara",
    kec: "Tahunan",
    lat: -6.61,
    lng: 110.69,
    kapasitas: 300,
    pengungsi: 250,
  },
  {
    name: "Posko Purwodadi",
    kab: "Grobogan",
    kec: "Purwodadi",
    lat: -7.16,
    lng: 110.93,
    kapasitas: 380,
    pengungsi: 320,
  },
  {
    name: "Posko Bonang",
    kab: "Demak",
    kec: "Bonang",
    lat: -6.93,
    lng: 110.58,
    kapasitas: 280,
    pengungsi: 210,
  },
  {
    name: "Posko Margoyoso",
    kab: "Pati",
    kec: "Margoyoso",
    lat: -6.74,
    lng: 111.02,
    kapasitas: 320,
    pengungsi: 280,
  },
].map((p, i) => ({
  id: `posko-${i}`,
  type: "posko" as const,
  ...p,
}));

const jaringanMarkers: MapMarker[] = [
  { name: "BTS Demak Utara", kab: "Demak", lat: -6.87, lng: 110.63, status: "critical" as const },
  { name: "Fiber Kudus", kab: "Kudus", lat: -6.8, lng: 110.84, status: "warning" as const },
  { name: "BTS Pati Timur", kab: "Pati", lat: -6.75, lng: 111.06, status: "warning" as const },
  { name: "Tower Jepara", kab: "Jepara", lat: -6.59, lng: 110.66, status: "normal" as const },
  { name: "BTS Grobogan", kab: "Grobogan", lat: -7.15, lng: 110.91, status: "normal" as const },
  {
    name: "Fiber Demak Selatan",
    kab: "Demak",
    lat: -6.9,
    lng: 110.65,
    status: "critical" as const,
  },
  { name: "BTS Kudus Barat", kab: "Kudus", lat: -6.81, lng: 110.82, status: "normal" as const },
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

export function filterMarkers(
  markers: MapMarker[],
  opts: { type?: string; kab?: string },
): MapMarker[] {
  let result = markers;
  if (opts.type && opts.type !== "all") {
    result = result.filter((m) => m.type === opts.type);
  }
  if (opts.kab && opts.kab !== "all") {
    const kabName = opts.kab.charAt(0).toUpperCase() + opts.kab.slice(1).toLowerCase();
    result = result.filter((m) => m.kab.toLowerCase() === kabName.toLowerCase());
  }
  return result;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} Jt`;
  return n.toLocaleString("id-ID");
}
