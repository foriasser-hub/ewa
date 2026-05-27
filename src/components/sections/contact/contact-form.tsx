'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  contactSchema,
  subjectOptions,
  type ContactInput,
  type SubjectValue,
} from '@/lib/contact-schema';
import { cn } from '@/lib/utils';

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

/**
 * Contact form — client component.
 *
 * - Reads ?formation=<slug> and ?type=entretien from the URL to pre-fill
 *   the subject and a hidden "formation" field (set by /formations/[slug] CTAs).
 * - Validates with the same Zod schema as the server (defense in depth).
 * - Submits as JSON to /api/contact and renders inline success / error states.
 * - Hidden honeypot field "website" left empty by humans.
 */
export function ContactForm() {
  const params = useSearchParams();
  const presetFormation = params.get('formation') ?? '';
  const presetType = params.get('type');

  const initialSubject: SubjectValue =
    presetType === 'entretien'
      ? 'entretien'
      : presetFormation
        ? 'inscription'
        : 'info-formation';

  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [globalError, setGlobalError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<FieldErrors>({});

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-700">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-navy-800">
          Merci, votre message est bien parti !
        </h2>
        <p className="mt-2 text-sm text-muted">
          Notre équipe revient vers vous sous 48 heures ouvrées. En attendant, vous pouvez parcourir
          nos formations.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <a href="/formations">Voir les formations</a>
          </Button>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Envoyer un autre message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setGlobalError(null);
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const raw = {
          firstName: String(formData.get('firstName') ?? ''),
          lastName: String(formData.get('lastName') ?? ''),
          email: String(formData.get('email') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          subject: String(formData.get('subject') ?? ''),
          formation: String(formData.get('formation') ?? ''),
          message: String(formData.get('message') ?? ''),
          consent: formData.get('consent') === 'on' ? true : false,
          website: String(formData.get('website') ?? ''),
        };

        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) {
          const flat = parsed.error.flatten().fieldErrors;
          const next: FieldErrors = {};
          (Object.keys(flat) as (keyof ContactInput)[]).forEach((k) => {
            const msgs = flat[k];
            if (msgs && msgs.length > 0) next[k] = msgs[0];
          });
          setErrors(next);
          setStatus('idle');
          return;
        }

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed.data),
          });
          const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
          if (!res.ok || !data.ok) {
            setGlobalError(data.error ?? 'Une erreur est survenue. Réessayez plus tard.');
            setStatus('error');
            return;
          }
          setStatus('success');
        } catch {
          setGlobalError('Connexion impossible. Vérifiez votre réseau et réessayez.');
          setStatus('error');
        }
      }}
      className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Prénom" name="firstName" required error={errors.firstName} />
        <Field label="Nom" name="lastName" required error={errors.lastName} />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required error={errors.email} />
        <Field label="Téléphone (optionnel)" name="phone" type="tel" error={errors.phone} />
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="block text-sm font-medium text-navy-800">
          Sujet <span className="text-navy-700">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={initialSubject}
          aria-invalid={Boolean(errors.subject)}
          className={cn(
            'mt-2 block w-full appearance-none rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-ink shadow-sm focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-200',
            errors.subject && 'border-red-500',
          )}
        >
          {subjectOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.subject ? (
          <p className="mt-1.5 text-xs text-red-600">{errors.subject}</p>
        ) : null}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-sm font-medium text-navy-800">
          Message <span className="text-navy-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={20}
          aria-invalid={Boolean(errors.message)}
          placeholder="Présentez-vous brièvement et expliquez votre demande..."
          className={cn(
            'mt-2 block w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-ink shadow-sm placeholder:text-muted focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-200',
            errors.message && 'border-red-500',
          )}
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
        ) : null}
      </div>

      {/* Hidden context field — pre-filled via ?formation=... */}
      <input type="hidden" name="formation" defaultValue={presetFormation} />

      {/* Honeypot — must stay empty. Hidden visually + from screen readers + from tab order. */}
      <div aria-hidden className="hidden">
        <label>
          Si vous êtes humain, laissez ce champ vide.
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(errors.consent)}
          className="mt-1 h-4 w-4 rounded border-navy-200 text-navy-700 focus:ring-navy-600"
        />
        <label htmlFor="consent" className="text-sm text-ink/85">
          J&apos;accepte qu&apos;AKADEMIA IA MADAGASIKARA traite mes données pour répondre à ma
          demande, conformément à la{' '}
          <a
            href="/politique-confidentialite"
            className="font-medium text-navy-700 underline underline-offset-2 hover:text-navy-800"
          >
            politique de confidentialité
          </a>
          .
        </label>
      </div>
      {errors.consent ? (
        <p className="mt-1.5 text-xs text-red-600">{errors.consent}</p>
      ) : null}

      {globalError ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{globalError}</p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Envoi en cours...
            </>
          ) : (
            <>Envoyer le message</>
          )}
        </Button>
        <p className="text-xs text-muted">
          Les champs marqués <span className="text-navy-700">*</span> sont obligatoires.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-navy-800">
        {label}
        {required ? <span className="text-navy-700"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoCompleteFor(name)}
        aria-invalid={Boolean(error)}
        className={cn(
          'mt-2 block w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-ink shadow-sm placeholder:text-muted focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-200',
          error && 'border-red-500',
        )}
      />
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function autoCompleteFor(name: string): string | undefined {
  switch (name) {
    case 'firstName':
      return 'given-name';
    case 'lastName':
      return 'family-name';
    case 'email':
      return 'email';
    case 'phone':
      return 'tel';
    default:
      return undefined;
  }
}
