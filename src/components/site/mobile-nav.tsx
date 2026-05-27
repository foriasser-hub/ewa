'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mainNav } from '@/lib/site-config';
import { cn } from '@/lib/utils';

/**
 * Lightweight mobile navigation.
 * No external Dialog dependency — just a controlled fullscreen overlay.
 * Closes on route change, on Escape and on backdrop click.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open + close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 bg-white p-6 shadow-card animate-slide-down">
            <div className="flex items-center justify-end">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </Button>
            </div>
            <nav className="mt-2 flex flex-col gap-1" aria-label="Menu principal">
              {mainNav.map((item) => {
                const active =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                      active
                        ? 'bg-navy-50 text-navy-800'
                        : 'text-ink hover:bg-navy-50 hover:text-navy-800',
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button asChild size="lg" className="mt-3">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
