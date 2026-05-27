'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminMessages, type AdminMessageStatus } from '@/lib/admin/store';

const VALID: AdminMessageStatus[] = ['unread', 'read', 'archived'];

export async function setMessageStatus(id: string, status: AdminMessageStatus) {
  if (!VALID.includes(status)) return;
  adminMessages.setStatus(id, status);
  revalidatePath('/admin/messages');
  revalidatePath(`/admin/messages/${id}`);
}

export async function deleteMessage(id: string): Promise<void> {
  adminMessages.remove(id);
  revalidatePath('/admin/messages');
  redirect('/admin/messages');
}
