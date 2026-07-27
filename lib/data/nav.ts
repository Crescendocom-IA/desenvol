import type { Route } from "next";

import { comercialProducts, eclesialProducts, type Product } from "./products";

export type NavItem = {
  label: string;
  href: Route;
  /** Quando presente, o item vira um dropdown e o label continua clicável. */
  children?: Product[];
};

export const navItems: NavItem[] = [
  {
    label: "Sistemas eclesiais",
    href: "/sistemas-eclesiais",
    children: eclesialProducts,
  },
  {
    label: "Sistemas comerciais",
    href: "/sistemas-comerciais",
    children: comercialProducts,
  },
  {
    label: "Mídia",
    href: "/midia/missas-datashow",
  },
  {
    label: "Sobre",
    href: "/sobre",
  },
];

/** Todas as rotas internas do site — base do sitemap. */
export const routes = [
  "/",
  "/sobre",
  "/sistemas-eclesiais",
  "/sistemas-eclesiais/sgpar",
  "/sistemas-eclesiais/tribunal-eclesiastico",
  "/sistemas-comerciais",
  "/sistemas-comerciais/erp",
  "/sistemas-comerciais/nf-e",
  "/sistemas-comerciais/app-vendas",
  "/midia/missas-datashow",
  "/contato",
] as const satisfies readonly Route[];
