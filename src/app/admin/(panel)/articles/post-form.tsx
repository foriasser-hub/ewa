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
import type { AdminPost } from '@/lib/admin/store';

type Props = {
  initial?: AdminPost;
  action: (s: { ok: boolean; error?: string }, fd: FormData) => Promise<{ ok: boolean; error?: string }>;
};

export function PostForm({ initial, action }: Props) {
  const [state, formAction] = useFormState(action, { ok: true });
  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Titre" name="title" required defaultValue={initial?.title} />
        <TextField
          label="Slug (URL)"
          name="slug"
          required
          defaultValue={initial?.slug}
          placeholder="le-vibe-coding-c-est-quoi"
        />
      </div>

      <TextArea
        label="Extrait"
        name="excerpt"
        required
        rows={3}
        defaultValue={initial?.excerpt}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <TextField
          label="Catégorie"
          name="category"
          required
          defaultValue={initial?.category}
          placeholder="Guide / Outils / Tendances"
        />
        <TextField
          label="Date de publication"
          name="publishedAt"
          type="date"
          required
          defaultValue={initial?.publishedAt}
        />
        <TextField
          label="Temps de lecture (min)"
          name="readingTime"
          type="number"
          required
          defaultValue={initial?.readingTime ?? 5}
        />
      </div>

      <CheckboxField
        label="Publier sur le site"
        name="published"
        defaultChecked={initial?.published ?? true}
        description="Le contenu MDX de l'article reste géré dans src/content/posts/. L'admin gère les métadonnées."
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
        <SecondaryButton href="/admin/articles">Annuler</SecondaryButton>
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
