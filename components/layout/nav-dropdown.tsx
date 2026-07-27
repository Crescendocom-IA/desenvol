"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import type { NavItem } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

/** Atraso na saída do hover, para o ponteiro conseguir atravessar o gap. */
const CLOSE_DELAY_MS = 150;

type NavDropdownProps = {
  item: NavItem & { children: NonNullable<NavItem["children"]> };
};

export function NavDropdown({ item }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  const isActive = pathname.startsWith(item.href);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => cancelClose, []);

  // Fecha ao trocar de rota, senão o menu fica aberto sobre a página nova.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
        }
      }}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? menuId : undefined}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm transition-colors duration-200 ease-brand",
          isActive ? "text-ink" : "text-ink-soft hover:text-ink",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-200 ease-brand",
            open && "rotate-180",
          )}
        />
      </Link>

      {open ? (
        <div
          id={menuId}
          className="absolute top-full left-0 z-50 w-80 pt-2"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <ul className="flex flex-col gap-1 rounded-2xl border border-hairline bg-surface p-2 shadow-[0_16px_48px_-16px_rgba(38,33,92,0.35)]">
            {item.children.map((product) => (
              <li key={product.slug}>
                <Link
                  href={product.href}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 ease-brand hover:bg-secondary"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-link transition-colors duration-200 ease-brand group-hover:bg-brand-primary group-hover:text-white">
                    <product.icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-display text-[0.9375rem] font-medium text-ink">
                      {product.name}
                    </span>
                    <span className="text-[0.8125rem] leading-snug text-ink-soft">
                      {product.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
