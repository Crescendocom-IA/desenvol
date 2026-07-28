/**
 * Contrato do formulário de contato.
 *
 * Vive fora de `actions.ts` porque um módulo `"use server"` só pode exportar
 * funções assíncronas, constantes e tipos precisam de outro lugar.
 */

export const SUBJECTS = [
  "SGPAR",
  "Tribunal Eclesiástico",
  "ERP",
  "NF-e",
  "Suporte",
  "Outro",
] as const;

export type ContactSubject = (typeof SUBJECTS)[number];

export type ContactField = "nome" | "email" | "assunto" | "mensagem";

export type ContactFormState = {
  status: "idle" | "success" | "error" | "fallback";
  message: string;
  fieldErrors: Partial<Record<ContactField, string>>;
  /**
   * Preenchido quando não há RESEND_API_KEY configurada: o usuário conclui o
   * envio pelo próprio cliente de e-mail, sem perder o que já escreveu.
   */
  mailtoHref?: string;
  /** Devolve o que foi digitado para o formulário não esvaziar em caso de erro. */
  values?: Record<string, string>;
};

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
