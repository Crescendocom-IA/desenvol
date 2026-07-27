"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, ExternalLink, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import type { LogoMode } from "@/components/brand/logo-mark";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/data/nav";
import { clientPortals, supportDownload } from "@/lib/data/external-links";
import { ctaVariants } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function NavMobileSheet({ mode }: { mode: LogoMode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha ao navegar — a rota muda sem desmontar o sheet.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menu de navegação"
        className="inline-flex size-10 items-center justify-center rounded-lg text-ink transition-colors duration-200 ease-brand hover:bg-secondary md:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(88vw,22rem)] overflow-y-auto bg-bg sm:max-w-none"
      >
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-left">
            <Logo mode={mode} />
            <span className="sr-only">Menu de navegação</span>
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Navegação principal" className="px-6 pb-2">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-hairline py-4">
                <Link
                  href={item.href}
                  className="font-display text-lg font-medium text-ink"
                >
                  {item.label}
                </Link>

                {item.children ? (
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {item.children.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={product.href}
                          className="flex items-center gap-2.5 text-sm text-ink-soft transition-colors duration-200 ease-brand hover:text-ink"
                        >
                          <product.icon
                            aria-hidden="true"
                            className="size-4 shrink-0 text-link"
                          />
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="mobile-portais" className="px-6 py-5">
          <h2 id="mobile-portais" className="eyebrow">
            Acesso a clientes
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {clientPortals.map((portal) => (
              <li key={portal.href}>
                <a
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors duration-200 ease-brand hover:text-ink"
                >
                  {portal.label}
                  <ExternalLink aria-hidden="true" className="size-3" />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-3 px-6 pb-8">
          <a
            href={supportDownload.href}
            className={cn(ctaVariants({ variant: "outline" }), "w-full")}
          >
            <Download aria-hidden="true" />
            Suporte
          </a>
          <Link
            href="/contato"
            className={cn(ctaVariants({ variant: "primary" }), "w-full")}
          >
            Contato
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
