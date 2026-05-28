import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Wordmark logo for Académie IA Africaine.
 * The square mark uses a stylised "A.IA" inside a navy tile,
 * which works on both light and dark backgrounds.
 */
export function Logo({ variant = 'dark', className }: LogoProps) {
  const isLight = variant === 'light';
  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn('inline-flex items-center gap-3', className)}
    >
      <span
        aria-hidden
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold tracking-tight',
          isLight ? 'bg-white text-navy-800' : 'bg-navy-800 text-white',
        )}
      >
        A·IA
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            'font-display text-base font-bold tracking-tight',
            isLight ? 'text-white' : 'text-navy-800',
          )}
        >
          ACADÉMIE IA
        </span>
        <span
          className={cn(
            'text-[11px] font-medium uppercase tracking-[0.2em]',
            isLight ? 'text-navy-100' : 'text-muted',
          )}
        >
          Africaine
        </span>
      </span>
    </Link>
  );
}
