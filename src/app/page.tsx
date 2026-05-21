import { IndonesiaHome } from "@/components/home/indonesia-home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Desa Remau Baku Tuo — Jambi",
  description:
    "Peta interaktif Desa Remau Baku Tuo, Kecamatan Sadu, Kabupaten Tanjung Jabung Timur, Provinsi Jambi — Digital Spasial",
};

export default function HomePage() {
  return <IndonesiaHome />;
}
