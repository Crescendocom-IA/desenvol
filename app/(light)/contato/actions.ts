"use server";

import { Resend } from "resend";

import {
  SUBJECTS,
  type ContactFormState,
  type ContactSubject,
} from "@/lib/data/contact-form";
import { contact } from "@/lib/data/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const readField = (formData: FormData, name: string) =>
  (formData.get(name) ?? "").toString().trim();

function formatBody(values: Record<string, string>) {
  return [
    `Nome: ${values.nome}`,
    `E-mail: ${values.email}`,
    values.telefone ? `Telefone: ${values.telefone}` : null,
    `Assunto: ${values.assunto}`,
    "",
    values.mensagem,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildMailto(values: Record<string, string>) {
  const params = new URLSearchParams({
    subject: `[Site] ${values.assunto} — ${values.nome}`,
    body: formatBody(values),
  });

  return `mailto:${contact.email}?${params.toString()}`;
}

function mailtoFallback(
  values: Record<string, string>,
  message: string,
): ContactFormState {
  return {
    status: "fallback",
    message,
    fieldErrors: {},
    mailtoHref: buildMailto(values),
    values,
  };
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    nome: readField(formData, "nome"),
    email: readField(formData, "email"),
    telefone: readField(formData, "telefone"),
    assunto: readField(formData, "assunto"),
    mensagem: readField(formData, "mensagem"),
  };

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (values.nome.length < 2) {
    fieldErrors.nome = "Informe o seu nome.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = "Informe um e-mail válido.";
  }
  if (!SUBJECTS.includes(values.assunto as ContactSubject)) {
    fieldErrors.assunto = "Escolha um assunto.";
  }
  if (values.mensagem.length < 10) {
    fieldErrors.mensagem = "Conte um pouco mais — ao menos 10 caracteres.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Revise os campos destacados.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Sem chave configurada não bloqueamos o usuário: devolvemos um mailto já
  // preenchido com tudo o que ele escreveu.
  if (!apiKey) {
    return mailtoFallback(
      values,
      "O envio pelo site ainda não está ativo. Abrimos a mensagem no seu programa de e-mail com tudo preenchido.",
    );
  }

  try {
    const resend = new Resend(apiKey);

    // TODO(cliente): confirmar o remetente verificado no Resend antes de
    // publicar — precisa ser um domínio validado, não o e-mail de destino.
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Site Desenvol <onboarding@resend.dev>",
      to: [contact.email],
      replyTo: values.email,
      subject: `[Site] ${values.assunto} — ${values.nome}`,
      text: formatBody(values),
    });

    if (error) {
      return mailtoFallback(
        values,
        "Não conseguimos enviar a mensagem agora. Abrimos ela no seu programa de e-mail para você concluir.",
      );
    }

    return {
      status: "success",
      message: "Mensagem enviada. Retornamos em breve.",
      fieldErrors: {},
    };
  } catch {
    return mailtoFallback(
      values,
      "Não conseguimos enviar a mensagem agora. Abrimos ela no seu programa de e-mail para você concluir.",
    );
  }
}
