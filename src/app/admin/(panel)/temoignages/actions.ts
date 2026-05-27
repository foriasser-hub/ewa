'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { adminTestimonials } from '@/lib/admin/store';

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  role: z.string().trim().min(2).max(80),
  formation: z.string().trim().min(2).max(80),
  initials: z.string().trim().min(1).max(3),
  quote: z.string().trim().min(20).max(600),
  published: z
    .union([z.literal('on'), z.literal('off'), z.undefined()])
    .transform((v) => v === 'on'),
});

type FormState = { ok: boolean; error?: string };

function parse(fd: FormData) {
  return schema.safeParse({
    name: fd.get('name') ?? '',
    role: fd.get('role') ?? '',
    formation: fd.get('formation') ?? '',
    initials: fd.get('initials') ?? '',
    quote: fd.get('quote') ?? '',
    published: fd.get('published') ?? 'off',
  });
}

export async function createTestimonial(_prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = parse(fd);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  adminTestimonials.create(parsed.data);
  revalidatePath('/admin/temoignages');
  redirect('/admin/temoignages');
}

export async function updateTestimonial(
  id: string,
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  const parsed = parse(fd);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  if (!adminTestimonials.update(id, parsed.data)) {
    return { ok: false, error: 'Témoignage introuvable.' };
  }
  revalidatePath('/admin/temoignages');
  revalidatePath(`/admin/temoignages/${id}`);
  redirect('/admin/temoignages');
}

export async function deleteTestimonial(id: string): Promise<void> {
  adminTestimonials.remove(id);
  revalidatePath('/admin/temoignages');
  redirect('/admin/temoignages');
}
