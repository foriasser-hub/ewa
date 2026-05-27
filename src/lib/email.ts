import 'server-only';
import { Resend } from 'resend';
import { siteConfig } from '@/lib/site-config';
import { getSubjectLabel, type ContactInput, type SubjectValue } from '@/lib/contact-schema';

/**
 * Resend client wrapper.
 *
 * Behaviour:
 *  - If RESEND_API_KEY is set, the email is actually sent.
 *  - Otherwise the call is a no-op that logs the payload to the server console.
 *    This keeps local development frictionless and avoids leaking a missing key
 *    error to the user.
 */

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;

const resend = apiKey ? new Resend(apiKey) : null;

function escape(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function buildHtml(input: ContactInput) {
  const rows: [string, string][] = [
    ['Prénom', input.firstName],
    ['Nom', input.lastName],
    ['Email', input.email],
    ['Téléphone', input.phone || '—'],
    ['Sujet', getSubjectLabel(input.subject as SubjectValue)],
    ['Formation concernée', input.formation || '—'],
  ];

  return `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #1F2937; max-width: 560px; margin: 0 auto;">
      <h1 style="font-size: 18px; color: #0A1F44; margin: 0 0 16px;">Nouveau message via le formulaire de contact</h1>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        ${rows
          .map(
            ([k, v]) => `
              <tr>
                <td style="padding: 8px 12px; background: #F7F9FC; border: 1px solid #E5E7EB; width: 160px; font-weight: 600; color: #0A1F44;">${escape(k)}</td>
                <td style="padding: 8px 12px; border: 1px solid #E5E7EB;">${escape(v)}</td>
              </tr>`,
          )
          .join('')}
      </table>
      <h2 style="font-size: 16px; color: #0A1F44; margin: 24px 0 8px;">Message</h2>
      <div style="white-space: pre-wrap; padding: 16px; background: #F7F9FC; border-radius: 12px; border: 1px solid #E5E7EB; font-size: 14px; line-height: 1.55;">${escape(input.message)}</div>
      <p style="margin-top: 24px; font-size: 12px; color: #6B7280;">
        Envoyé depuis ${escape(siteConfig.url)}
      </p>
    </div>
  `;
}

function buildText(input: ContactInput) {
  return [
    `Nouveau message via le formulaire de contact`,
    ``,
    `Prénom : ${input.firstName}`,
    `Nom : ${input.lastName}`,
    `Email : ${input.email}`,
    `Téléphone : ${input.phone || '—'}`,
    `Sujet : ${getSubjectLabel(input.subject as SubjectValue)}`,
    `Formation : ${input.formation || '—'}`,
    ``,
    `Message :`,
    input.message,
    ``,
    `--`,
    `Envoyé depuis ${siteConfig.url}`,
  ].join('\n');
}

export async function sendContactEmail(input: ContactInput) {
  const subjectLine = `[Site] ${getSubjectLabel(
    input.subject as SubjectValue,
  )} — ${input.firstName} ${input.lastName}`;

  if (!resend) {
    // Mock mode: log instead of sending. Still returns a successful result
    // so the user sees the confirmation page.
    // eslint-disable-next-line no-console
    console.warn(
      '[contact] RESEND_API_KEY is not set — running in mock mode. Email NOT sent.',
    );
    // eslint-disable-next-line no-console
    console.info('[contact] Subject:', subjectLine);
    // eslint-disable-next-line no-console
    console.info('[contact] Payload:', input);
    return { ok: true as const, mocked: true };
  }

  const { error } = await resend.emails.send({
    from: `AKADEMIA IA <${from}>`,
    to: [to],
    replyTo: input.email,
    subject: subjectLine,
    html: buildHtml(input),
    text: buildText(input),
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[contact] Resend error:', error);
    return { ok: false as const, error: error.message ?? 'Resend error' };
  }

  return { ok: true as const, mocked: false };
}
