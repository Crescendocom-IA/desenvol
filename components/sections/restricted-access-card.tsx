"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ctaVariants } from "@/lib/cta";
import { cn } from "@/lib/utils";

/**
 * Portão de acesso do App Vendas.
 *
 * O site atual protege esta página por senha. Aqui reproduzimos apenas o
 * comportamento visível: o formulário não valida nada e não envia nada a
 * lugar algum — quem precisa de acesso é encaminhado ao contato.
 *
 * TODO(cliente): definir se o acesso será migrado para autenticação real
 * (e contra qual base de usuários) ou se permanece como encaminhamento.
 */
export function RestrictedAccessCard() {
  const passwordId = useId();
  const feedbackId = useId();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border border-hairline bg-surface p-8">
      <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-link">
        <Lock aria-hidden="true" className="size-5" />
      </span>

      <h1 className="mt-5 font-display text-2xl font-medium text-ink">
        Acesso restrito
      </h1>

      <p className="mt-2 text-sm text-ink-soft text-pretty">
        O App Vendas é disponibilizado aos clientes da Desenvol. Informe a senha
        recebida da nossa equipe.
      </p>

      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor={passwordId}>Senha de acesso</Label>
          <Input
            id={passwordId}
            name="senha"
            type="password"
            autoComplete="current-password"
            aria-describedby={feedbackId}
            className="h-11"
          />
        </div>

        <button type="submit" className={cn(ctaVariants(), "w-full")}>
          Entrar
        </button>
      </form>

      <p
        id={feedbackId}
        aria-live="polite"
        className="mt-4 text-sm text-ink-soft"
      >
        {submitted
          ? "Não foi possível liberar o acesso por aqui. Solicite acesso pelo contato."
          : "Solicite acesso pelo contato."}{" "}
        <Link
          href="/contato"
          className="text-link underline underline-offset-4"
        >
          Falar com a Desenvol
        </Link>
      </p>
    </div>
  );
}
