"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: Route;
  label: string;
};

/** Item simples do nav desktop, com estado ativo derivado da rota. */
export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-10 items-center rounded-lg px-3 text-sm transition-colors duration-200 ease-brand",
        isActive ? "text-ink" : "text-ink-soft hover:text-ink",
      )}
    >
      {label}
    </Link>
  );
}
