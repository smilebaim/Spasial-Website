import type { Metadata } from "next";
import { BottomDock } from "@/components/layout/bottom-dock";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Digital Spasial Indonesia",
    template: "%s | Digital Spasial",
  },
  description:
    "Sistem Informasi Geospasial Nasional — Pemantauan Spasial dan Bencana Hidrometeorologi — Spatial Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
        <BottomDock />
      </body>
    </html>
  );
}
