'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { adminNavItems } from '@/components/admin/nav-items';
import { usePathname } from 'next/navigation';

/**
 * Compact top bar — shows the active page title (derived from the URL)
 * and a logout button.
 */
export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Pick the most specific matching nav item (longest href prefix match).
  const active = [...adminNavItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find((it) =>
      it.href === '/admin' ? pathname === '/admin' : pathname.startsWith(it.href),
    );

  const title = active?.label ?? 'Admin';

  async function logout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-zinc-200 bg-white/85 px-4 backdrop-blur md:px-6">
      <h1 className="font-display text-base font-semibold text-zinc-900">{title}</h1>
      <button
        type="button"
        onClick={logout}
        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50"
      >
        <LogOut className="h-3.5 w-3.5" aria-hidden />
        Se déconnecter
      </button>
    </header>
  );
}
