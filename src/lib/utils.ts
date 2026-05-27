import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names safely.
 * Combines clsx (conditional class names) with tailwind-merge
 * (resolves conflicts like `px-2 px-4` -> `px-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date as a long French date, e.g. "12 mai 2026".
 */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
