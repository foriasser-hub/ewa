'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { adminNavItems } from '@/components/admin/nav-items';
import { cn } from '@/lib/utils';

/**
 * Fixed sidebar — Vercel/Linear style.
 * - 256px wide on desktop, hidden under `md`
 * - Single accent (zinc-900) on active link
 * - Compact, neutral, no shadows
 */
export function AdminSidebar({ unreadMessages = 0 }: { unreadMessages?: number }) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-zinc-200 bg-white md:flex md:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-zinc-200 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-800 text-white">
          <Sparkles className="h-4 w-4" aria-hidden />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-zinc-900">Akademia IA</p>
          <p className="text-[11px] uppercase tracking-wider text-zinc-500">
            Back-office
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="Navigation back-office">
        <ul className="space-y-0.5">
          {adminNavItems.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            const Icon = item.Icon;
            const badge = item.label === 'Messages' ? unreadMessages : 0;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                    active
                      ? 'bg-zinc-100 font-medium text-zinc-900'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  <span className="flex-1">{item.label}</span>
                  {badge > 0 ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-navy-800 px-1.5 text-[11px] font-semibold text-white">
                      {badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-zinc-200 p-3">
        <Link
          href="/"
          className="block rounded-md px-3 py-2 text-xs text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
        >
          ← Retour au site public
        </Link>
      </div>
    </aside>
  );
}
