# Spatial Society

Dashboard monitoring bencana hidrometeorologi — fullstack **Next.js 15** dengan data dummy, API routes, dan peta **Leaflet**.

## Fitur

- **Dashboard** — statistik dampak, pengungsi, bantuan logistik
- **Peta Leaflet** — sebaran wilayah terdampak, faskes, posko, jaringan (OpenStreetMap)
- **API Routes** — `GET /api/dashboard`, `GET /api/markers?type=&kab=`
- **Filter layer** — toggle layer & filter kabupaten di tab Tata Ruang

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Struktur

```
src/
  app/              # Next.js App Router
    api/            # Backend API routes
    page.tsx        # Halaman utama
  components/
    dashboard/      # UI dashboard
    map/            # Leaflet (client-only via dynamic import)
  lib/data/dummy.ts # Data dummy & marker koordinat
```
