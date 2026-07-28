import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { siteConfig } from "@/lib/data/site";
import "./globals.css";

/*
  A Bricolage é a fonte de display e o maior arquivo do site, ela gatilha o
  candidato final de LCP quando termina de baixar. Por isso carregamos só os
  eixos que o CSS realmente lê.

  `wdth` é usado: o utilitário `display-tight` (globals.css) aplica
  `font-variation-settings: "wdth" 90` nos títulos grandes, que é um efeito
  definido no design system.

  `opsz` foi removido por não ser referenciado por nenhum seletor, nem via
  `font-optical-sizing`, nem via `font-variation-settings`. Como nada consome
  esse eixo, tirá-lo não altera um pixel do que é renderizado. Antes de
  reintroduzir, confirme que existe CSS que o use.
*/
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // Middle dot separa título da página e nome do site. Vírgula faria o
    // título ler como lista de itens na aba e no resultado de busca.
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#47328E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bricolage.variable} ${onest.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
