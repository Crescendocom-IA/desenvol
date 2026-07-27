import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureListProps = {
  items: readonly string[];
  className?: string;
};

/** Lista de recursos com marcador visual. Para textos curtos, de uma linha. */
export function FeatureList({ items, className }: FeatureListProps) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-hairline bg-surface px-4 py-3.5"
        >
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
            <Check aria-hidden="true" className="size-3" strokeWidth={3} />
          </span>
          <span className="text-sm text-ink text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}
