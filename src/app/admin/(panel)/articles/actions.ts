'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { adminPosts } from '@/lib/admin/store';

const schema = z.object({
  title: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Le slug doit être en kebab-case (a-z, 0-9, tirets).'),
  excerpt: z.string().trim().min(10).max(500),
  category: z.string().trim().min(2).max(40),
  publishedAt: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date au format AAAA-MM-JJ.'),
  readingTime: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v) && v > 0 && v <= 60, {
      message: 'Temps de lecture entre 1 et 60 minutes.',
    }),
  published: z
    .union([z.literal('on'), z.literal('off'), z.undefined()])
    .transform((v) => v === 'on'),
});

type FormState = { ok: boolean; error?: string };

function parse(fd: FormData) {
  return schema.safeParse({
    title: fd.get('title') ?? '',
    slug: fd.get('slug') ?? '',
    excerpt: fd.get('excerpt') ?? '',
    category: fd.get('category') ?? '',
    publishedAt: fd.get('publishedAt') ?? '',
    readingTime: fd.get('readingTime') ?? '',
    published: fd.get('published') ?? 'off',
  });
}

export async function createPost(_prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = parse(fd);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  adminPosts.create(parsed.data);
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}

export async function updatePost(
  id: string,
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  const parsed = parse(fd);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }
  const updated = adminPosts.update(id, parsed.data);
  if (!updated) return { ok: false, error: 'Article introuvable.' };
  revalidatePath('/admin/articles');
  revalidatePath(`/admin/articles/${id}`);
  redirect('/admin/articles');
}

export async function deletePost(id: string): Promise<void> {
  adminPosts.remove(id);
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}
