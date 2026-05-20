import { IndonesiaHome } from "@/components/home/indonesia-home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Indonesia — Digital Spasial",
  description:
    "Peta interaktif nasional Indonesia dengan sistem informasi geospasial — Spatial Society",
};

export default function HomePage() {
  return <IndonesiaHome />;
}
