'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { adminFaq } from '@/lib/admin/store';

const schema = z.object({
  category: z.enum(['Inscription', 'Pédagogie', 'Tarifs & financement']),
  question: z.string().trim().min(5).max(200),
  answer: z.string().trim().min(10).max(2000),
  order: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v) && v >= 0, { message: 'Ordre >= 0.' }),
});

type FormState = { ok: boolean; error?: string };

function parse(fd: FormData) {
  return schema.safeParse({
    category: fd.get('category') ?? 'Pédagogie',
    question: fd.get('question') ?? '',
    answer: fd.get('answer') ?? '',
    order: fd.get('order') ?? 0,
  });
}

export async function createFaqItem(_prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = parse(fd);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  adminFaq.create(parsed.data);
  revalidatePath('/admin/faq');
  redirect('/admin/faq');
}

export async function updateFaqItem(
  id: string,
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  const parsed = parse(fd);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  if (!adminFaq.update(id, parsed.data)) {
    return { ok: false, error: 'Question introuvable.' };
  }
  revalidatePath('/admin/faq');
  revalidatePath(`/admin/faq/${id}`);
  redirect('/admin/faq');
}

export async function deleteFaqItem(id: string): Promise<void> {
  adminFaq.remove(id);
  revalidatePath('/admin/faq');
  redirect('/admin/faq');
}
