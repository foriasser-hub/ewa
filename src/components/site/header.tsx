'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/site/logo';
import { MobileNav } from '@/components/site/mobile-nav';
import { mainNav } from '@/lib/site-config';
import { cn } from '@/lib/utils';

/**
 * Sticky site header with primary navigation.
 * - Desktop: horizontal nav + primary CTA (contact).
 * - Mobile: logo + hamburger that opens MobileNav.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-100 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 md:flex"
        >
          {mainNav.slice(1).map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-navy-800'
                    : 'text-ink/80 hover:text-navy-800',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="primary" size="sm" className="hidden md:inline-flex">
            <Link href="/contact">Nous contacter</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
