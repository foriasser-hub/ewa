'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Loader2, Save, Trash2 } from 'lucide-react';
import {
  CheckboxField,
  FormFooter,
  PrimaryButton,
  SecondaryButton,
  SelectField,
  TextArea,
  TextField,
  DangerButton,
} from '@/components/admin/form-shell';
import type { AdminFormation } from '@/lib/admin/store';

type Props = {
  initial?: AdminFormation;
  action: (state: { ok: boolean; error?: string }, fd: FormData) => Promise<{ ok: boolean; error?: string }>;
  onDelete?: () => void;
};

const LEVELS = [
  { value: 'Débutant', label: 'Débutant' },
  { value: 'Intermédiaire', label: 'Intermédiaire' },
  { value: 'Avancé', label: 'Avancé' },
];
const FORMATS = [
  { value: 'Présentiel', label: 'Présentiel' },
  { value: 'En ligne', label: 'En ligne' },
  { value: 'Hybride', label: 'Hybride' },
];

export function FormationForm({ initial, action, onDelete }: Props) {
  const [state, formAction] = useFormState(action, { ok: true });

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          label="Titre"
          name="title"
          required
          defaultValue={initial?.title}
          placeholder="Ex. IA pour étudiants"
        />
        <TextField
          label="Slug (URL)"
          name="slug"
          required
          defaultValue={initial?.slug}
          placeholder="ia-pour-etudiants"
        />
      </div>

      <TextArea
        label="Description courte (carte)"
        name="excerpt"
        required
        rows={3}
        defaultValue={initial?.excerpt}
        placeholder="Une phrase d'accroche apparaîtra sur les cards."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <SelectField
          label="Niveau"
          name="level"
          required
          defaultValue={initial?.level ?? 'Débutant'}
          options={LEVELS}
        />
        <TextField
          label="Durée"
          name="duration"
          required
          defaultValue={initial?.duration}
          placeholder="6 semaines"
        />
        <SelectField
          label="Format"
          name="format"
          required
          defaultValue={initial?.format ?? 'Hybride'}
          options={FORMATS}
        />
      </div>

      <TextField
        label="Prix (Ar) — laissez vide pour « Sur devis »"
        name="price"
        type="number"
        defaultValue={initial?.price ?? ''}
        placeholder="350000"
      />

      <CheckboxField
        label="Publier sur le site"
        name="published"
        defaultChecked={initial?.published ?? true}
        description="Décochez pour cacher temporairement la formation du site public."
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
        {onDelete ? (
          <DangerButton onClick={onDelete}>
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            Supprimer
          </DangerButton>
        ) : null}
        <SecondaryButton href="/admin/formations">Annuler</SecondaryButton>
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
