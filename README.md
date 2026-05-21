# Digital Spasial Indonesia

Sistem informasi geospasial nasional — peta interaktif Indonesia dan dashboard monitoring bencana hidrometeorologi (data dummy).

## Fitur

- **Halaman utama** — peta satelit nasional dengan marker wilayah
- **Dashboard Desa** — statistik dampak, pengungsi, bantuan logistik, grafik
- **Peta Leaflet** — sebaran wilayah terdampak, faskes, posko (OpenStreetMap / Esri)
- **API Routes** — `GET /api/dashboard`, `GET /api/markers?type=&kab=`

## Prasyarat

- [Node.js](https://nodejs.org/) 20 atau lebih baru
- npm 10+

## Pengembangan lokal

```bash
npm install
cp .env.example .env.local   # opsional
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Dashboard: [http://localhost:3000/Dashboard-Desa](http://localhost:3000/Dashboard-Desa).

## Skrip

| Perintah            | Keterangan              |
| ------------------- | ----------------------- |
| `npm run dev`       | Server pengembangan     |
| `npm run build`     | Build produksi          |
| `npm run start`     | Jalankan build produksi |
| `npm run lint`      | ESLint                  |
| `npm run typecheck` | Pemeriksaan TypeScript  |
| `npm run format`    | Format Prettier         |

## Deploy ke Vercel

1. Push repositori ke GitHub (lihat di bawah).
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → impor repo `Spasial-Website`.
3. Framework terdeteksi otomatis sebagai **Next.js**; biarkan:
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
   - **Output Directory:** (default, kosong)
4. Tidak ada variabel lingkungan wajib untuk versi saat ini (data dummy).
5. Klik **Deploy**.

File `vercel.json` dan `.nvmrc` sudah disertakan untuk konsistensi build.

## Push ke GitHub

```bash
git add .
git commit -m "Siap deploy: konfigurasi Vercel dan CI"
git push origin main
```

Remote default: `https://github.com/smilebaim/Spasial-Website.git`

## Struktur proyek

```
src/
  app/                    # Next.js App Router
    api/                  # API routes
    Dashboard-Desa/       # Halaman dashboard
    page.tsx              # Halaman utama (peta)
  components/
    home/                 # UI halaman utama
    dashboard/            # UI dashboard
    map/                  # Leaflet (client-only)
  lib/data/dummy.ts       # Data dummy & koordinat
```

## Lisensi

Proyek privat — hak cipta pemilik repositori.
