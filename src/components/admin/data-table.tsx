'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DataTableColumn<T> = {
  key: string;
  header: string;
  /** Optional: renders the cell. Defaults to String((row as any)[key]). */
  render?: (row: T) => React.ReactNode;
  /** Optional: which fields contribute to the search haystack. */
  searchable?: boolean;
  className?: string;
};

export type DataTableFilter = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
};

type Props<T extends { id: string }> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  filters?: DataTableFilter[];
  /** Pluralised name for the empty / count states (e.g. "formations"). */
  resourceName: string;
  /** When set, displays a "+ New" button linking there. */
  newHref?: string;
  /** When set, each row links to this href + row.id. */
  rowHref?: (row: T) => string;
  /** Per-page page size. Defaults to 10. */
  pageSize?: number;
};

const ALL = '__all__';

/**
 * Generic admin data table:
 *  - debounced search (diacritic-insensitive)
 *  - any number of dropdown filters
 *  - client-side pagination
 *  - row click navigates to `rowHref(row)`
 */
export function DataTable<T extends { id: string } & Record<string, unknown>>({
  rows,
  columns,
  filters = [],
  resourceName,
  newHref,
  rowHref,
  pageSize = 10,
}: Props<T>) {
  const [query, setQuery] = React.useState('');
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((f) => [f.key, ALL])),
  );
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setPage(1);
  }, [query, filterValues]);

  const norm = (s: string) =>
    s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

  const filtered = React.useMemo(() => {
    const q = norm(query.trim());
    return rows.filter((row) => {
      // Filters
      for (const f of filters) {
        const value = filterValues[f.key];
        if (value && value !== ALL && String(row[f.key] ?? '') !== value) {
          return false;
        }
      }
      // Search
      if (!q) return true;
      const haystack = columns
        .filter((c) => c.searchable)
        .map((c) => String(row[c.key] ?? ''))
        .join(' ');
      return norm(haystack).includes(q);
    });
  }, [rows, query, filterValues, columns, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-zinc-200 p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <label className="flex w-full items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 md:w-72">
            <Search className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Rechercher dans les ${resourceName}...`}
              aria-label="Rechercher"
              className="w-full bg-transparent text-sm placeholder:text-zinc-400 focus:outline-none"
            />
          </label>
          {filters.map((f) => (
            <select
              key={f.key}
              value={filterValues[f.key]}
              onChange={(e) =>
                setFilterValues((prev) => ({ ...prev, [f.key]: e.target.value }))
              }
              aria-label={f.label}
              className="rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none"
            >
              <option value={ALL}>{f.label} : Tous</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ))}
        </div>
        {newHref ? (
          <Link
            href={newHref}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Ajouter
          </Link>
        ) : null}
      </div>

      {/* Table */}
      {pageRows.length === 0 ? (
        <div className="p-12 text-center text-sm text-zinc-500">
          Aucun{['o', 'a', 'e', 'i', 'u'].includes(resourceName[0]) ? '' : ''}{' '}
          {resourceName} ne correspond.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/60 text-left text-xs uppercase tracking-wider text-zinc-500">
                {columns.map((c) => (
                  <th key={c.key} className={cn('px-4 py-2.5 font-medium', c.className)}>
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => {
                const href = rowHref?.(row);
                return (
                  <tr
                    key={row.id}
                    className={cn(
                      'border-b border-zinc-100 last:border-b-0',
                      href && 'cursor-pointer transition hover:bg-zinc-50',
                    )}
                    onClick={() => {
                      if (href) window.location.assign(href);
                    }}
                  >
                    {columns.map((c) => (
                      <td key={c.key} className={cn('px-4 py-3 text-zinc-700', c.className)}>
                        {c.render ? c.render(row) : String(row[c.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer / pagination */}
      <div className="flex items-center justify-between gap-3 border-t border-zinc-200 px-4 py-2.5 text-xs text-zinc-500">
        <p>
          {filtered.length} {resourceName}
          {filtered.length > pageSize ? (
            <>
              {' '}
              · page {safePage} sur {totalPages}
            </>
          ) : null}
        </p>
        {totalPages > 1 ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40"
              aria-label="Page précédente"
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40"
              aria-label="Page suivante"
            >
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
