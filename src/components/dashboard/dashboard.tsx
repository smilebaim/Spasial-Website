"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Shield,
  RefreshCw,
  AlertTriangle,
  MapPin,
  Users,
  Truck,
  Home,
  Wheat,
  Building2,
  Activity,
  Layers,
  TrendingUp,
  Pin,
  Hospital,
  Wifi,
  Tent,
  Filter,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { MapLoader } from "@/components/map/map-loader";
import type { DashboardData, MapMarker } from "@/lib/data/dummy";
import {
  dashboardData as fallbackData,
  formatNumber,
  allMarkers as fallbackMarkers,
  DESA_SADU,
  DESA_UTAMA,
  desaToFilterSlug,
  KABUPATEN,
  KECAMATAN,
  PROVINSI,
  VILLAGE_BOUNDARY,
} from "@/lib/data/dummy";

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card className="p-4 flex items-center justify-between shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
      <div>
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
        <div className="text-2xl font-bold mt-1 text-foreground">{value}</div>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </Card>
  );
}

function SectionTitle({
  icon: Icon,
  children,
  color = "text-primary",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`w-4 h-4 ${color}`} />
      <h3 className="font-semibold text-sm text-foreground">{children}</h3>
    </div>
  );
}

function statusColor(s: string) {
  if (s === "Kuning") return "bg-yellow-400 text-yellow-950";
  if (s === "Biru") return "bg-blue-500 text-white";
  if (s === "Abu-abu") return "bg-gray-400 text-white";
  return "bg-white text-gray-700 border border-gray-300";
}

const LAYER_TYPES = [
  { key: "wilayah", label: "Wilayah Terdampak" },
  { key: "faskes", label: "Faskes" },
  { key: "posko", label: "Posko" },
  { key: "jaringan", label: "Jaringan" },
] as const;

interface DashboardProps {
  initialData?: DashboardData;
  initialMarkers?: MapMarker[];
}

export function Dashboard({
  initialData = fallbackData,
  initialMarkers = fallbackMarkers,
}: DashboardProps) {
  const [tab, setTab] = useState("profil");
  const [data, setData] = useState<DashboardData>(initialData);
  const [markers, setMarkers] = useState<MapMarker[]>(initialMarkers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterKab, setFilterKab] = useState("all");
  const [layers, setLayers] = useState<Record<string, boolean>>({
    wilayah: true,
    faskes: true,
    posko: true,
    jaringan: true,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, markRes] = await Promise.all([
        fetch("/api/dashboard"),
        fetch(`/api/markers?kab=${filterKab}`),
      ]);
      if (!dashRes.ok || !markRes.ok) {
        throw new Error(`API error: ${dashRes.status} / ${markRes.status}`);
      }
      const dash = (await dashRes.json()) as DashboardData;
      const mark = (await markRes.json()) as { markers: MapMarker[] };
      if (!dash?.stats || !Array.isArray(mark?.markers)) {
        throw new Error("Format data API tidak valid");
      }
      setData(dash);
      setMarkers(mark.markers);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error
          ? e.message
          : "Gagal memuat data. Pastikan server Next.js berjalan (npm run dev).",
      );
    } finally {
      setLoading(false);
    }
  }, [filterKab]);

  useEffect(() => {
    if (filterKab === "all") {
      setMarkers(initialMarkers);
      return;
    }
    void loadData();
  }, [filterKab, loadData, initialMarkers]);

  const profilMarkers = useMemo(() => markers.filter((m) => m.type === "wilayah"), [markers]);

  const operasiMarkers = useMemo(() => {
    return markers.filter((m) => layers[m.type] !== false);
  }, [markers, layers]);

  const { stats } = data;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="px-6 py-4 flex items-center justify-between border-b bg-primary text-primary-foreground shadow-sm">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide">Dashboard Monitoring</h2>
          <p className="text-[11px] opacity-90 font-medium">
            Desa {DESA_UTAMA} · Kec. {KECAMATAN} · {KABUPATEN}, {PROVINSI}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block border-r border-primary-foreground/20 pr-4">
            <div className="text-[9px] uppercase tracking-widest opacity-80">
              Update Terakhir
            </div>
            <div className="text-xs font-bold">{data.updatedAt}</div>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={loadData} 
            disabled={loading}
            className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground h-8 w-8"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center justify-between gap-4">
          <span>{error}</span>
          <Button size="sm" variant="outline" onClick={loadData}>
            Coba lagi
          </Button>
        </div>
      )}

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="border-b bg-card">
          <TabsList className="bg-transparent h-auto p-0 px-6">
            {(
              [
                { v: "profil", l: "Profil", I: AlertTriangle },
                { v: "tata-ruang", l: "Tata Ruang", I: MapPin },
                { v: "pembangunan", l: "Pembangunan", I: Users },
                { v: "indeks", l: "Indeks", I: Truck },
              ] as const
            ).map(({ v, l, I }) => (
              <TabsTrigger
                key={v}
                value={v}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-4 gap-2 text-muted-foreground"
              >
                <I className="w-4 h-4" />
                {l}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="profil" className="p-6 space-y-6 mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard
              icon={AlertTriangle}
              label="Total Korban"
              value={stats.totalKorban.toLocaleString("id-ID")}
              color="bg-red-100 text-red-600"
            />
            <StatCard
              icon={Users}
              label="Pengungsi"
              value={stats.pengungsi.toLocaleString("id-ID")}
              color="bg-orange-100 text-orange-600"
            />
            <StatCard
              icon={Tent}
              label="Titik Pengungsian"
              value={String(stats.titikPengungsian)}
              color="bg-blue-100 text-blue-600"
            />
            <StatCard
              icon={Home}
              label="Rumah Rusak"
              value={stats.rumahRusak.toLocaleString("id-ID")}
              color="bg-rose-100 text-rose-600"
            />
            <StatCard
              icon={Wheat}
              label="Sawah (Ha)"
              value={String(stats.sawahHa)}
              color="bg-green-100 text-green-600"
            />
            <StatCard
              icon={Building2}
              label="Kab. Terdampak"
              value={String(stats.kabTerdampak)}
              color="bg-purple-100 text-purple-600"
            />
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3 space-y-4">
              <Card className="p-4">
                <SectionTitle icon={Activity}>Status Wilayah</SectionTitle>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={data.statusWilayah}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                    >
                      {data.statusWilayah.map((s, i) => (
                        <Cell key={i} fill={s.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4">
                <SectionTitle icon={TrendingUp}>Top 5 Wilayah Terdampak</SectionTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.topWilayah} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" fontSize={10} />
                    <YAxis dataKey="name" type="category" fontSize={11} width={70} />
                    <Tooltip />
                    <Bar dataKey="korban" fill="oklch(0.6 0.22 27)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card className="p-0 overflow-hidden h-full min-h-[500px] relative">
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-lg p-2 text-xs font-semibold flex items-center gap-1.5 shadow z-[1000]">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Peta Sebaran Bencana
                </div>
                <MapLoader
                  markers={profilMarkers}
                  className="h-full min-h-[500px]"
                  legendTitle="Tingkat Dampak"
                  geoJsonData={VILLAGE_BOUNDARY}
                />
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-3 space-y-4">
              <Card className="p-4">
                <SectionTitle icon={AlertTriangle}>Ringkasan Kerusakan</SectionTitle>
                <div className="space-y-3 text-sm">
                  {data.ringkasanKerusakan.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center pb-2 border-b last:border-0"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-bold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <SectionTitle icon={Layers}>Rekap Cluster</SectionTitle>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kerusakan</span>
                    <span className="font-bold">{data.rekapCluster.kerusakan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kerugian</span>
                    <span className="font-bold">{data.rekapCluster.kerugian}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">{data.rekapCluster.total}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs font-semibold mb-2">Per Sektor:</div>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={data.sektorData}>
                      <XAxis dataKey="name" fontSize={9} />
                      <Tooltip />
                      <Bar dataKey="value" fill="oklch(0.6 0.22 27)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wheat className="w-4 h-4 text-green-600" />
                <h3 className="font-semibold text-sm">Data Kerusakan Pertanian</h3>
                <Badge variant="secondary">{data.pertanianData.length}</Badge>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                  <tr>
                    {["Nama", "Kabupaten", "Kecamatan", "Volume", "Kerugian", "Kondisi"].map(
                      (h) => (
                        <th key={h} className="px-3 py-2 text-left font-semibold">
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.pertanianData.map((r, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="px-3 py-2 font-medium">{r.nama}</td>
                      <td className="px-3 py-2">{r.kab}</td>
                      <td className="px-3 py-2">{r.kec}</td>
                      <td className="px-3 py-2">{r.vol}</td>
                      <td className="px-3 py-2">{r.rugi}</td>
                      <td className="px-3 py-2">
                        <Badge
                          className={
                            r.kondisi === "Berat"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : r.kondisi === "Sedang"
                                ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                          }
                        >
                          {r.kondisi}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tata-ruang" className="p-6 mt-0">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3 space-y-4">
              <Card className="p-4">
                <SectionTitle icon={Hospital}>Faskes</SectionTitle>
                <div className="space-y-2 text-sm">
                  {data.faskes.map((f) => (
                    <div key={f.label} className="flex justify-between">
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="font-bold">{f.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4">
                <SectionTitle icon={Wifi}>Status Jaringan</SectionTitle>
                <div className="space-y-2 text-sm">
                  {data.jaringan.map((j) => (
                    <div key={j.label} className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            j.status === "critical"
                              ? "bg-red-500"
                              : j.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        {j.label}
                      </span>
                      <span className="font-bold">{j.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4">
                <SectionTitle icon={Tent}>Posko Pengungsian</SectionTitle>
                <div className="space-y-2 text-sm">
                  {data.posko.map((p) => (
                    <div key={p.label} className="flex justify-between">
                      <span className="text-muted-foreground">{p.label}</span>
                      <span className="font-bold">
                        {p.label === "Pengungsi" ? p.value.toLocaleString("id-ID") : p.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card className="overflow-hidden h-full min-h-[600px] relative p-0">
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-lg px-3 py-2 text-xs font-semibold shadow z-[1000]">
                  Peta Operasi Lapangan ({operasiMarkers.length} titik)
                </div>
                <MapLoader
                  markers={operasiMarkers}
                  className="h-full min-h-[600px]"
                  legendTitle="Legenda Peta"
                  geoJsonData={VILLAGE_BOUNDARY}
                />
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-3">
              <Card className="p-4">
                <SectionTitle icon={Filter}>Layer & Filter</SectionTitle>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">LAYER:</div>
                    <div className="space-y-1">
                      {LAYER_TYPES.map(({ key, label }) => (
                        <label key={key} className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={layers[key]}
                            onChange={(e) =>
                              setLayers((prev) => ({
                                ...prev,
                                [key]: e.target.checked,
                              }))
                            }
                            className="accent-primary"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">
                      FILTER DESA:
                    </div>
                    <Select value={filterKab} onValueChange={(v) => setFilterKab(v)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Desa (Kec. Sadu)</SelectItem>
                        {DESA_SADU.map((desa) => (
                          <SelectItem key={desa} value={desaToFilterSlug(desa)}>
                            {desa}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pembangunan" className="p-6 space-y-6 mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Total Penduduk"
              value={formatNumber(stats.totalPenduduk)}
              color="bg-blue-100 text-blue-600"
            />
            <StatCard
              icon={Home}
              label="Total KK"
              value={formatNumber(stats.totalKK)}
              color="bg-indigo-100 text-indigo-600"
            />
            <StatCard
              icon={Activity}
              label="Disabilitas"
              value={stats.disabilitas.toLocaleString("id-ID")}
              color="bg-purple-100 text-purple-600"
            />
            <StatCard
              icon={Tent}
              label="Jumlah Pengungsi"
              value={stats.pengungsi.toLocaleString("id-ID")}
              color="bg-orange-100 text-orange-600"
            />
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-12 md:col-span-4 p-4">
              <SectionTitle icon={AlertTriangle} color="text-orange-600">
                Orang Hilang
              </SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.orangHilangDicari}</div>
                  <div className="text-xs text-red-700">Dicari</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.orangHilangDitemukan}
                  </div>
                  <div className="text-xs text-green-700">Ditemukan</div>
                </div>
              </div>
            </Card>

            <Card className="col-span-12 md:col-span-4 p-4">
              <SectionTitle icon={Activity}>Data Disabilitas</SectionTitle>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={data.disabilitasChart} dataKey="v" nameKey="n" outerRadius={55}>
                    {[0, 1, 2, 3].map((i) => (
                      <Cell
                        key={i}
                        fill={
                          [
                            "oklch(0.6 0.22 27)",
                            "oklch(0.7 0.18 50)",
                            "oklch(0.65 0.18 230)",
                            "oklch(0.6 0.2 300)",
                          ][i]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="col-span-12 md:col-span-4 p-4">
              <SectionTitle icon={Home}>Data KK per Wilayah</SectionTitle>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={data.pendudukData}>
                  <XAxis dataKey="kab" fontSize={9} />
                  <Tooltip />
                  <Bar dataKey="kk" fill="oklch(0.65 0.18 230)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-4">
            <SectionTitle icon={Users}>Data Penduduk & Pengungsi</SectionTitle>
            <table className="w-full text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  {["Desa", "Penduduk", "KK", "Pengungsi"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.pendudukData.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50">
                    <td className="px-3 py-2 font-medium">{r.kab}</td>
                    <td className="px-3 py-2">{r.penduduk.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-2">{r.kk.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-2">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        {r.pengungsi.toLocaleString("id-ID")}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="indeks" className="p-6 space-y-6 mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={MapPin}
              label="Total Desa"
              value={String(stats.totalDesa)}
              color="bg-slate-100 text-slate-600"
            />
            <StatCard
              icon={Truck}
              label="Kuning (Selesai)"
              value="120"
              color="bg-yellow-100 text-yellow-700"
            />
            <StatCard
              icon={Activity}
              label="Biru (Proses)"
              value="68"
              color="bg-blue-100 text-blue-600"
            />
            <StatCard
              icon={Layers}
              label="Abu (Tertunda)"
              value="35"
              color="bg-gray-200 text-gray-700"
            />
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-12 md:col-span-5 p-4">
              <SectionTitle icon={Activity}>Status Distribusi</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={data.distribusiBantuan} dataKey="v" nameKey="n" outerRadius={80} label>
                    {["#facc15", "#3b82f6", "#9ca3af", "#e5e7eb"].map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="col-span-12 md:col-span-4 p-4">
              <SectionTitle icon={TrendingUp}>Top Desa</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={data.topWilayah.map((t) => ({
                    name: t.name,
                    bantuan: Math.round(t.korban / 4),
                  }))}
                  layout="vertical"
                >
                  <XAxis type="number" fontSize={10} />
                  <YAxis dataKey="name" type="category" fontSize={11} width={70} />
                  <Tooltip />
                  <Bar dataKey="bantuan" fill="oklch(0.7 0.18 75)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="col-span-12 md:col-span-3 p-4">
              <SectionTitle icon={Pin}>Legenda Warna</SectionTitle>
              <div className="space-y-2 text-xs">
                {[
                  ["bg-yellow-400", "Kuning", "Sudah distribusi"],
                  ["bg-blue-500", "Biru", "Dalam proses"],
                  ["bg-gray-400", "Abu-abu", "Tertunda/Gagal"],
                  ["bg-white border", "Putih", "Belum distribusi"],
                ].map(([c, l, d]) => (
                  <div key={l} className="flex items-start gap-2">
                    <span className={`w-4 h-4 rounded mt-0.5 ${c}`} />
                    <div>
                      <div className="font-semibold">{l}</div>
                      <div className="text-muted-foreground">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Data Bantuan Logistik</h3>
              <Badge variant="secondary">{data.bantuanData.length}</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                  <tr>
                    {["Desa", "Kecamatan", "Kabupaten", "Satuan", "Status"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.bantuanData.map((r, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="px-3 py-2 font-medium">{r.desa}</td>
                      <td className="px-3 py-2">{r.kec}</td>
                      <td className="px-3 py-2">{r.kab}</td>
                      <td className="px-3 py-2">{r.satuan}</td>
                      <td className="px-3 py-2">
                        <Badge className={statusColor(r.status)}>{r.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="bg-card text-muted-foreground px-6 py-6 mt-8 border-t flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
          <div className="bg-muted p-2 rounded-lg text-primary">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-sm text-foreground">
              Dashboard Monitoring Bencana Hidrometeorologi
            </div>
            <div className="text-xs">Next.js Fullstack · Leaflet · API Routes</div>
          </div>
        </div>
        <div className="text-xs md:text-right">
          <div>
            Dalam Pengembangan · <span className="font-semibold text-foreground">Tim Spatial Society</span>
          </div>
          <div>© 2026 Spatial Research</div>
        </div>
      </footer>
    </div>
  );
}
