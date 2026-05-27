'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Loader2, Save } from 'lucide-react';
import {
  FormFooter,
  PrimaryButton,
  SecondaryButton,
  SelectField,
  TextArea,
  TextField,
} from '@/components/admin/form-shell';
import type { AdminFaq } from '@/lib/admin/store';

const CATS = [
  { value: 'Inscription', label: 'Inscription' },
  { value: 'Pédagogie', label: 'Pédagogie' },
  { value: 'Tarifs & financement', label: 'Tarifs & financement' },
];

export function FaqForm({
  initial,
  action,
}: {
  initial?: AdminFaq;
  action: (s: { ok: boolean; error?: string }, fd: FormData) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [state, formAction] = useFormState(action, { ok: true });
  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
        <SelectField
          label="Catégorie"
          name="category"
          required
          defaultValue={initial?.category ?? 'Pédagogie'}
          options={CATS}
        />
        <TextField
          label="Ordre d'affichage"
          name="order"
          type="number"
          required
          defaultValue={initial?.order ?? 0}
        />
      </div>

      <TextField label="Question" name="question" required defaultValue={initial?.question} />
      <TextArea
        label="Réponse"
        name="answer"
        required
        rows={6}
        defaultValue={initial?.answer}
      />

      {state && state.ok === false && state.error ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <FormFooter>
        <SecondaryButton href="/admin/faq">Annuler</SecondaryButton>
        <SubmitBtn />
      </FormFooter>
    </form>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton disabled={pending}>
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
      ) : (
        <Save className="h-3.5 w-3.5" aria-hidden />
      )}
      {pending ? 'Enregistrement...' : 'Enregistrer'}
    </PrimaryButton>
  );
}
