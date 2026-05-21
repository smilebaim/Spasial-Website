"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function TopDock() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname !== "/") return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] px-3 pt-3 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 px-2.5 py-1.5 shadow-lg dark:bg-card/20 dark:border-white/10">
        <Link href="/" className="flex items-center gap-2 min-w-0 hover:opacity-90 transition-opacity">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-primary-foreground shadow-sm"
            style={{ background: "var(--gradient-header)" }}
          >
            <Map className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs font-bold leading-tight truncate text-foreground drop-shadow-sm">Digital Spasial Indonesia</h1>
            <p className="text-[9px] text-muted-foreground truncate font-medium drop-shadow-sm">
              Kec. Sadu · Tanjung Jabung Timur, Jambi
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-lg bg-white/40 hover:bg-white/60 border border-white/20 shadow-sm transition-colors"
            aria-label="Login"
          >
            <LogIn className="h-3.5 w-3.5 text-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
