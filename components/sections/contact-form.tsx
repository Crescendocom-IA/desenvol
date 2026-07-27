"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/app/(light)/contato/actions";
import { SUBJECTS, initialContactState } from "@/lib/data/contact-form";
import { ctaVariants } from "@/lib/cta";
import { cn } from "@/lib/utils";

const fieldClasses = "h-11 bg-surface";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(ctaVariants({ size: "lg" }), "w-full sm:w-auto")}
    >
      {pending ? "Enviando…" : "Enviar mensagem"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  const ids = {
    nome: useId(),
    email: useId(),
    telefone: useId(),
    assunto: useId(),
    mensagem: useId(),
  };

  const errorId = (field: keyof typeof ids) => `${ids[field]}-erro`;

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={ids.nome}>Nome</Label>
          <Input
            id={ids.nome}
            name="nome"
            autoComplete="name"
            defaultValue={state.values?.nome}
            aria-invalid={Boolean(state.fieldErrors.nome)}
            aria-describedby={
              state.fieldErrors.nome ? errorId("nome") : undefined
            }
            className={fieldClasses}
          />
          <FieldError id={errorId("nome")} message={state.fieldErrors.nome} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={ids.email}>E-mail</Label>
          <Input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.values?.email}
            aria-invalid={Boolean(state.fieldErrors.email)}
            aria-describedby={
              state.fieldErrors.email ? errorId("email") : undefined
            }
            className={fieldClasses}
          />
          <FieldError id={errorId("email")} message={state.fieldErrors.email} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={ids.telefone}>
            Telefone{" "}
            <span className="font-normal text-ink-soft">(opcional)</span>
          </Label>
          <Input
            id={ids.telefone}
            name="telefone"
            type="tel"
            autoComplete="tel"
            defaultValue={state.values?.telefone}
            className={fieldClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={ids.assunto}>Assunto</Label>
          {/*
            <select> nativo em vez do primitivo do shadcn: envia junto com a
            server action sem depender de JavaScript e usa o seletor do
            próprio sistema operacional no mobile.
          */}
          <select
            id={ids.assunto}
            name="assunto"
            defaultValue={state.values?.assunto ?? ""}
            aria-invalid={Boolean(state.fieldErrors.assunto)}
            aria-describedby={
              state.fieldErrors.assunto ? errorId("assunto") : undefined
            }
            className="h-11 w-full rounded-lg border border-input bg-surface px-2.5 text-base text-ink transition-colors outline-none md:text-sm"
          >
            <option value="" disabled>
              Selecione…
            </option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <FieldError
            id={errorId("assunto")}
            message={state.fieldErrors.assunto}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={ids.mensagem}>Mensagem</Label>
        <Textarea
          id={ids.mensagem}
          name="mensagem"
          rows={6}
          defaultValue={state.values?.mensagem}
          aria-invalid={Boolean(state.fieldErrors.mensagem)}
          aria-describedby={
            state.fieldErrors.mensagem ? errorId("mensagem") : undefined
          }
          className="min-h-36 bg-surface py-3"
        />
        <FieldError
          id={errorId("mensagem")}
          message={state.fieldErrors.mensagem}
        />
      </div>

      <div className="flex flex-col gap-4">
        <SubmitButton />

        <div aria-live="polite" className="empty:hidden">
          {state.status === "success" ? (
            <p className="flex items-start gap-2.5 rounded-xl border border-hairline bg-secondary p-4 text-sm text-ink">
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-link"
              />
              {state.message}
            </p>
          ) : null}

          {state.status === "error" ? (
            <p className="flex items-start gap-2.5 text-sm text-destructive">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {state.message}
            </p>
          ) : null}

          {state.status === "fallback" && state.mailtoHref ? (
            <div className="flex flex-col items-start gap-3 rounded-xl border border-hairline bg-secondary p-4">
              <p className="text-sm text-ink text-pretty">{state.message}</p>
              <a
                href={state.mailtoHref}
                className={cn(ctaVariants({ variant: "outline", size: "sm" }))}
              >
                <Mail aria-hidden="true" />
                Abrir no meu e-mail
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}
