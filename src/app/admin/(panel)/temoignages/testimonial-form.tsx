'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Loader2, Save } from 'lucide-react';
import {
  CheckboxField,
  FormFooter,
  PrimaryButton,
  SecondaryButton,
  TextArea,
  TextField,
} from '@/components/admin/form-shell';
import type { AdminTestimonial } from '@/lib/admin/store';

export function TestimonialForm({
  initial,
  action,
}: {
  initial?: AdminTestimonial;
  action: (s: { ok: boolean; error?: string }, fd: FormData) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [state, formAction] = useFormState(action, { ok: true });
  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-3">
        <TextField label="Nom" name="name" required defaultValue={initial?.name} />
        <TextField label="Rôle" name="role" required defaultValue={initial?.role} />
        <TextField
          label="Initiales"
          name="initials"
          required
          defaultValue={initial?.initials}
          placeholder="TR"
        />
      </div>
      <TextField
        label="Formation suivie"
        name="formation"
        required
        defaultValue={initial?.formation}
        placeholder="IA pour étudiants"
      />
      <TextArea
        label="Citation"
        name="quote"
        required
        rows={5}
        defaultValue={initial?.quote}
        placeholder="« J'ai suivi cette formation et... »"
      />
      <CheckboxField
        label="Publier sur le site"
        name="published"
        defaultChecked={initial?.published ?? true}
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
        <SecondaryButton href="/admin/temoignages">Annuler</SecondaryButton>
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
