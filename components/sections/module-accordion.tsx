"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SgparDetail } from "@/lib/data/sgpar-modules";

/**
 * Características detalhadas por módulo.
 *
 * As listas são longas (o módulo Sacramentos sozinho tem 10 subseções), por
 * isso vivem fechadas por padrão. Cada painel preserva a numeração e o
 * agrupamento originais do material do cliente.
 */
export function ModuleAccordion({ details }: { details: SgparDetail[] }) {
  return (
    <Accordion
      multiple
      className="divide-y divide-hairline border-y border-hairline"
    >
      {details.map((detail) => (
        <AccordionItem
          key={detail.id}
          value={detail.id}
          className="border-b-0 py-2"
        >
          <AccordionTrigger className="items-center gap-6 py-5 hover:no-underline">
            <span className="flex flex-col gap-1 text-left">
              <span className="font-display text-lg font-medium text-ink md:text-xl">
                {detail.title}
              </span>
              <span className="text-sm text-ink-soft">{detail.summary}</span>
            </span>
          </AccordionTrigger>

          <AccordionContent className="pb-6">
            <div className="flex flex-col gap-7 pr-2 md:pr-10">
              {detail.groups.map((group) => (
                <div key={group.heading} className="flex flex-col gap-3">
                  <h4 className="font-display text-[0.9375rem] font-medium text-ink">
                    {group.heading}
                  </h4>
                  <ul className="flex flex-col gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                      >
                        <span aria-hidden="true" className="text-link">
                          –
                        </span>
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
