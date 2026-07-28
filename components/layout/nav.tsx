import Link from "next/link";
import { Download } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import type { LogoMode } from "@/components/brand/logo-mark";
import { NavDesktop } from "@/components/layout/nav-desktop";
import { NavMobileSheet } from "@/components/layout/nav-mobile-sheet";
import { supportDownload } from "@/lib/data/external-links";
import { ctaVariants } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function Nav({ mode }: { mode: LogoMode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
        <Link href="/" aria-label="Desenvol Informática, página inicial">
          {/* Acima da dobra em toda página: carrega sem lazy. */}
          <Logo mode={mode} priority />
        </Link>

        <NavDesktop />

        <div className="flex items-center gap-2">
          <a
            href={supportDownload.href}
            className={cn(
              ctaVariants({ variant: "outline", size: "sm" }),
              "hidden lg:inline-flex",
            )}
          >
            <Download aria-hidden="true" />
            Suporte
          </a>
          <Link
            href="/contato"
            className={cn(
              ctaVariants({ variant: "primary", size: "sm" }),
              "hidden md:inline-flex",
            )}
          >
            Contato
          </Link>
          <NavMobileSheet mode={mode} />
        </div>
      </div>
    </header>
  );
}
