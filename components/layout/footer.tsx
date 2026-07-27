import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import type { LogoMode } from "@/components/brand/logo-mark";
import { SuporteCta } from "@/components/layout/suporte-cta";
import { PixCard } from "@/components/sections/pix-card";
import { clientPortals } from "@/lib/data/external-links";
import { products } from "@/lib/data/products";
import { contact, siteConfig } from "@/lib/data/site";

const currentYear = new Date().getFullYear();

export function Footer({ mode }: { mode: LogoMode }) {
  return (
    <footer className="border-t border-hairline bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo mode={mode} withSubtitle />
            <p className="max-w-56 text-sm text-ink-soft">
              Desde 1994, em Londrina/PR.
            </p>
          </div>

          <nav aria-labelledby="footer-produtos" className="flex flex-col gap-4">
            <h2 id="footer-produtos" className="eyebrow">
              Produtos
            </h2>
            <ul className="flex flex-col gap-2.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={product.href}
                    className="text-sm text-ink-soft transition-colors duration-200 ease-brand hover:text-ink"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-clientes" className="flex flex-col gap-4">
            <h2 id="footer-clientes" className="eyebrow">
              Acesso a clientes
            </h2>
            <ul className="flex flex-col gap-2.5">
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
          </nav>

          <section aria-labelledby="footer-contato" className="flex flex-col gap-4">
            <h2 id="footer-contato" className="eyebrow">
              Contato
            </h2>

            <address className="flex flex-col gap-3 text-sm not-italic text-ink-soft">
              <span className="flex gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-link"
                />
                <span>
                  {contact.address.street} – {contact.address.complement}
                  <br />
                  {contact.address.district} – {contact.address.city}/
                  {contact.address.state}
                  <br />
                  {contact.address.postalCode}
                </span>
              </span>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 transition-colors duration-200 ease-brand hover:text-ink"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-link" />
                {contact.email}
              </a>

              <a
                href={contact.phone.href}
                className="flex items-center gap-2.5 transition-colors duration-200 ease-brand hover:text-ink"
              >
                <Phone
                  aria-hidden="true"
                  className="size-4 shrink-0 text-link"
                />
                {contact.phone.label}
              </a>
            </address>

            <p className="text-sm text-ink-soft">
              <span className="eyebrow block">CNPJ</span>
              <span className="font-mono text-[0.8125rem]">{contact.cnpj}</span>
            </p>

            <SuporteCta size="sm" className="w-full" />
            <PixCard compact />
          </section>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-[0.8125rem] text-ink-soft md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <Link
            href="/contato"
            className="transition-colors duration-200 ease-brand hover:text-ink"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </footer>
  );
}
