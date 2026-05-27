'use client';

import { useFormStatus } from 'react-dom';
import { Loader2, Trash2 } from 'lucide-react';

/**
 * Submit button for a delete server action.
 * Wraps a native confirm dialog and a pending state.
 */
export function DeleteButton({
  label = 'Supprimer définitivement',
  confirmMessage = 'Supprimer définitivement cet élément ?',
}: {
  label?: string;
  confirmMessage?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-2 text-sm text-red-700 transition hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
      ) : (
        <Trash2 className="h-3.5 w-3.5" aria-hidden />
      )}
      {pending ? 'Suppression...' : label}
    </button>
  );
}
