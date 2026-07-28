import type { Metadata } from "next";

import { siteConfig } from "@/lib/data/site";

/**
 * Rota servida por `app/opengraph-image.tsx`.
 *
 * A convenção de arquivo do Next injeta essa imagem sozinha, mas só enquanto
 * a página não declara o próprio `openGraph`, e todas as nossas declaram,
 * para ter título e descrição próprios. Por isso a referência é explícita.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}, ${siteConfig.tagline}`,
} as const;

type BuildMetadataInput = {
  /** Sem o sufixo da marca, o template do layout raiz cuida disso. */
  title: string;
  description: string;
  /** Caminho absoluto da rota, para canonical e og:url. */
  path: string;
};

export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: siteConfig.name,
      title: `${title}, ${siteConfig.name}`,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}, ${siteConfig.name}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
