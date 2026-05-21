"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard } from "lucide-react";

export function BottomDock() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-3 pointer-events-none">
      <div className="flex justify-center">
        <Link
          href={isHome ? "/Dashboard-Desa" : "/"}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-foreground shadow-md transition-all duration-200 hover:bg-white hover:scale-105 dark:bg-card/95"
          aria-label={isHome ? "Dashboard" : "Beranda"}
        >
          {isHome ? (
            <LayoutDashboard className="h-4 w-4" />
          ) : (
            <Home className="h-4 w-4" />
          )}
        </Link>
      </div>
    </footer>
  );
}
