'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { adminFormations } from '@/lib/admin/store';

/**
 * Server actions for the Formations CRUD.
 * Validation lives here in addition to client-side hints.
 */

const baseSchema = z.object({
  title: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Le slug doit être en kebab-case (a-z, 0-9, tirets).'),
  excerpt: z.string().trim().min(10).max(500),
  level: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
  duration: z.string().trim().min(1).max(40),
  format: z.enum(['Présentiel', 'En ligne', 'Hybride']),
  price: z
    .union([z.string(), z.undefined(), z.null()])
    .transform((v) => (v === undefined || v === null || v === '' ? null : Number(v)))
    .refine((v) => v === null || (!Number.isNaN(v) && v >= 0), {
      message: 'Le prix doit être un nombre positif (ou laissé vide pour "Sur devis").',
    }),
  published: z
    .union([z.literal('on'), z.literal('off'), z.undefined()])
    .transform((v) => v === 'on'),
});

type FormState = { ok: boolean; error?: string };

function parse(formData: FormData) {
  return baseSchema.safeParse({
    title: formData.get('title') ?? '',
    slug: formData.get('slug') ?? '',
    excerpt: formData.get('excerpt') ?? '',
    level: formData.get('level') ?? 'Débutant',
    duration: formData.get('duration') ?? '',
    format: formData.get('format') ?? 'Hybride',
    price: formData.get('price') ?? '',
    published: formData.get('published') ?? 'off',
  });
}

export async function createFormation(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  adminFormations.create(parsed.data);
  revalidatePath('/admin/formations');
  redirect('/admin/formations');
}

export async function updateFormation(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = parse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  const updated = adminFormations.update(id, parsed.data);
  if (!updated) return { ok: false, error: 'Formation introuvable.' };
  revalidatePath('/admin/formations');
  revalidatePath(`/admin/formations/${id}`);
  redirect('/admin/formations');
}

export async function deleteFormation(id: string): Promise<void> {
  adminFormations.remove(id);
  revalidatePath('/admin/formations');
  redirect('/admin/formations');
}
