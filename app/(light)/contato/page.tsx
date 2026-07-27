import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SuporteCta } from "@/components/layout/suporte-cta";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { HeroLight } from "@/components/sections/hero-light";
import { CtaLink } from "@/components/ui/cta-link";
import { contact } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fale com a Desenvol",
  description:
    "Entre em contato com a Desenvol Informática: Rua Pernambuco, 269 – Sala 1402, Centro, Londrina/PR. Telefone (43) 3323-4641 e desenvol@desenvol.com.br.",
  path: "/contato",
});

const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  contact.mapsEmbedQuery,
)}&output=embed`;

export default function ContatoPage() {
  return (
    <>
      <HeroLight
        eyebrow="Contato"
        title="Fale com a Desenvol"
        titleAccentPart="a Desenvol"
        subtitle="Conte o seu cenário e a nossa equipe indica o caminho. Respondemos a todas as mensagens."
      />

      <section
        aria-labelledby="contato-titulo"
        className="border-b border-hairline"
      >
        <Container className="py-16 md:py-20">
          <h2 id="contato-titulo" className="sr-only">
            Formulário e informações de contato
          </h2>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-8">
              <address className="flex flex-col gap-5 not-italic">
                <ContactRow icon={MapPin} label="Endereço">
                  {contact.address.street} – {contact.address.complement}
                  <br />
                  {contact.address.district} – {contact.address.city}/
                  {contact.address.state} – {contact.address.postalCode}
                </ContactRow>

                <ContactRow icon={Phone} label="Telefone">
                  <a
                    href={contact.phone.href}
                    className="transition-colors duration-200 ease-brand hover:text-link"
                  >
                    {contact.phone.label}
                  </a>
                </ContactRow>

                <ContactRow icon={Mail} label="E-mail">
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors duration-200 ease-brand hover:text-link"
                  >
                    {contact.email}
                  </a>
                </ContactRow>

                <ContactRow icon={MessageCircle} label="CNPJ">
                  <span className="font-mono text-sm">{contact.cnpj}</span>
                </ContactRow>
              </address>

              {/* TODO(cliente): confirmar o horário de atendimento para
                  publicarmos aqui. */}

              <SuporteCta className="w-full sm:w-auto" />

              <div className="overflow-hidden rounded-2xl border border-hairline">
                <iframe
                  title="Mapa com a localização da Desenvol Informática em Londrina"
                  src={mapsSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-72 w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="whatsapp-titulo">
        <Container className="py-14 md:py-16">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-hairline bg-bg-subtle p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-1.5">
              <h2
                id="whatsapp-titulo"
                className="font-display text-2xl font-medium text-ink"
              >
                Prefere WhatsApp? Fale agora
              </h2>
              <p className="text-ink-soft">
                Atendimento pelo mesmo número comercial: {contact.phone.label}.
              </p>
            </div>

            <CtaLink
              label="Abrir o WhatsApp"
              href={contact.whatsapp}
              variant="primary"
              size="lg"
              className="shrink-0"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-link">
        <Icon aria-hidden className="size-4" />
      </span>
      <div className="flex flex-col gap-1">
        <span className="eyebrow">{label}</span>
        <span className="text-ink">{children}</span>
      </div>
    </div>
  );
}
