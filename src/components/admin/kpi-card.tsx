import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Vercel-style KPI card: large value, small label, trend hint, neutral surface.
 */
export function KpiCard({
  label,
  value,
  hint,
  trend,
  Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  trend?: { value: string; positive?: boolean };
  Icon?: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {label}
        </p>
        {Icon ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-50 text-zinc-700">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-900">
        {value}
      </p>
      {(hint || trend) && (
        <p className="mt-1 text-xs text-zinc-500">
          {trend ? (
            <span
              className={cn(
                'mr-1.5 font-semibold',
                trend.positive ? 'text-emerald-600' : 'text-zinc-700',
              )}
            >
              {trend.value}
            </span>
          ) : null}
          {hint}
        </p>
      )}
    </div>
  );
}
