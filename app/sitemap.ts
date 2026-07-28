import type { MetadataRoute } from "next";

import { routes } from "@/lib/data/nav";
import { siteConfig } from "@/lib/data/site";

/** Prioridade e frequência por rota. O que não está aqui usa o padrão. */
const OVERRIDES: Partial<
  Record<
    (typeof routes)[number],
    { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }
  >
> = {
  "/": { priority: 1, changeFrequency: "monthly" },
  "/sistemas-eclesiais/sgpar": { priority: 0.9, changeFrequency: "monthly" },
  "/sistemas-comerciais/erp": { priority: 0.9, changeFrequency: "monthly" },
  "/midia/missas-datashow": { priority: 0.8, changeFrequency: "weekly" },
  "/contato": { priority: 0.7, changeFrequency: "yearly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes
    // A área do App Vendas não tem conteúdo público e está marcada como
    // noindex, manter fora do sitemap evita sinal contraditório.
    .filter((route) => route !== "/sistemas-comerciais/app-vendas")
    .map((route) => ({
      url: new URL(route, siteConfig.url).toString(),
      lastModified,
      changeFrequency: OVERRIDES[route]?.changeFrequency ?? "monthly",
      priority: OVERRIDES[route]?.priority ?? 0.8,
    }));
}
