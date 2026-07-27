import type { Metadata } from "next";

import { siteConfig } from "@/lib/data/site";

type BuildMetadataInput = {
  /** Sem o sufixo da marca — o template do layout raiz cuida disso. */
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
      title: `${title} — ${siteConfig.name}`,
      description,
      url,
      images: [
        {
          url: "/og/default.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.name}`,
      description,
      images: ["/og/default.png"],
    },
  };
}
