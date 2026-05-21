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
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-xl bg-white/95 px-2.5 py-1.5 shadow-md dark:bg-card/95">
        <Link href="/" className="flex items-center gap-2 min-w-0 hover:opacity-90 transition-opacity">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-primary-foreground"
            style={{ background: "var(--gradient-header)" }}
          >
            <Map className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs font-bold leading-tight truncate">Digital Spasial Indonesia</h1>
            <p className="text-[9px] text-muted-foreground truncate">
              Kec. Sadu · Tanjung Jabung Timur, Jambi
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-xl bg-background/80 shadow-sm hover:bg-background"
            aria-label="Login"
          >
            <LogIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
