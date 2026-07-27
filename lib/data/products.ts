import type { Route } from "next";
import {
  BadgeCheck,
  Church,
  FileText,
  Gavel,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

export type ProductTrack = "eclesial" | "comercial";

export type Product = {
  slug: string;
  name: string;
  /** Uma linha. Aparece nos cards de grid e nos dropdowns do nav. */
  tagline: string;
  href: Route;
  icon: LucideIcon;
  track: ProductTrack;
};

export const products: Product[] = [
  {
    slug: "sgpar",
    name: "SGPAR",
    tagline: "Gerenciador paroquial completo, também em versão online.",
    href: "/sistemas-eclesiais/sgpar",
    icon: Church,
    track: "eclesial",
  },
  {
    slug: "tribunal-eclesiastico",
    name: "Tribunal Eclesiástico",
    tagline: "Gestão de processos canônicos do secretariado ao financeiro.",
    href: "/sistemas-eclesiais/tribunal-eclesiastico",
    icon: Gavel,
    track: "eclesial",
  },
  {
    slug: "erp",
    name: "ERP Desenvol",
    tagline: "Vendas, estoque e financeiro integrados em um só sistema.",
    href: "/sistemas-comerciais/erp",
    icon: BadgeCheck,
    track: "comercial",
  },
  {
    slug: "nf-e",
    name: "NF-e",
    tagline: "Emissão, envio e gerenciamento de notas fiscais eletrônicas.",
    href: "/sistemas-comerciais/nf-e",
    icon: FileText,
    track: "comercial",
  },
  {
    slug: "app-vendas",
    name: "App Vendas",
    tagline: "Aplicativo de vendas para a equipe em campo.",
    href: "/sistemas-comerciais/app-vendas",
    icon: ShoppingCart,
    track: "comercial",
  },
];

export const eclesialProducts = products.filter((p) => p.track === "eclesial");
export const comercialProducts = products.filter((p) => p.track === "comercial");

/** Os quatro produtos com página de conteúdo próprio, usados no grid da home. */
export const featuredProducts = products.filter(
  (p) => p.slug !== "app-vendas",
);
