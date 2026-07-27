import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/lib/data/products";

export function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <Link
      href={product.href}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 transition-colors duration-200 ease-brand hover:border-brand-accent md:p-8"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-link transition-colors duration-200 ease-brand group-hover:bg-brand-primary group-hover:text-white">
        <Icon aria-hidden="true" className="size-5" />
      </span>

      <h3 className="font-display text-xl font-medium text-ink">
        {product.name}
      </h3>

      <p className="text-sm text-ink-soft text-pretty">{product.tagline}</p>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-link">
        Saiba mais
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 ease-brand group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
