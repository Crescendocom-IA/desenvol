"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, QrCode } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pix } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type PixCardProps = {
  className?: string;
  /** Variante compacta usada na coluna do footer. */
  compact?: boolean;
};

/**
 * Dados para contribuição espontânea via PIX.
 *
 * TODO(cliente): o site atual exibe uma imagem de QR code gerada pelo banco.
 * Precisamos do arquivo oficial (ou do payload BR Code emitido pelo Sicredi)
 * para reproduzi-lo — gerar um QR a partir de dados inferidos poderia
 * direcionar contribuições para um payload inválido. Até lá, exibimos a chave
 * copiável, que funciona em qualquer app bancário.
 */
export function PixCard({ className, compact = false }: PixCardProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "group flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-4 text-left transition-colors duration-200 ease-brand hover:border-brand-accent",
          compact ? "w-full" : "w-full max-w-sm",
          className,
        )}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-link">
          <QrCode aria-hidden="true" className="size-5" />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="font-display text-[0.9375rem] font-medium text-ink">
            Contribuir via PIX
          </span>
          <span className="text-[0.8125rem] leading-snug text-ink-soft">
            Chave {pix.keyType} · {pix.bank}
          </span>
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Contribuição via PIX
          </DialogTitle>
          <DialogDescription>
            Copie a chave abaixo no aplicativo do seu banco. Agradecemos pela
            sua generosidade.
          </DialogDescription>
        </DialogHeader>

        <dl className="flex flex-col gap-3">
          <PixRow label="Favorecido" value={pix.holder} />
          <PixRow label="Instituição" value={pix.bank} />
          <PixKeyRow />
        </dl>
      </DialogContent>
    </Dialog>
  );
}

function PixRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="eyebrow">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

function PixKeyRow() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pix.key);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard bloqueado (contexto inseguro ou permissão negada):
      // a chave continua visível e selecionável na tela.
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <dt className="eyebrow">Chave {pix.keyType}</dt>
      <dd className="flex items-center gap-2">
        <span className="font-mono text-sm tracking-tight text-ink select-all">
          {pix.key}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Chave PIX copiada" : "Copiar chave PIX"}
          className="inline-flex size-8 items-center justify-center rounded-lg border border-hairline text-ink-soft transition-colors duration-200 ease-brand hover:border-brand-accent hover:text-ink"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-4" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
        </button>
      </dd>
      <span aria-live="polite" className="sr-only">
        {copied ? "Chave PIX copiada para a área de transferência." : ""}
      </span>
    </div>
  );
}
