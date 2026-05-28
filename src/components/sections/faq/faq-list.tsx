'use client';

import * as React from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { faqCategories, faqItems, type FaqCategory } from '@/lib/data/faq';
import { cn } from '@/lib/utils';

const ALL: 'Toutes' = 'Toutes';
type Tab = typeof ALL | FaqCategory;

/**
 * Interactive FAQ:
 * - Category tabs (or "Toutes")
 * - Search box (matches question + answer)
 * - Native accessible accordion using <details>/<summary>
 */
export function FaqList() {
  const [tab, setTab] = React.useState<Tab>(ALL);
  const [query, setQuery] = React.useState('');

  const normalised = (s: string) =>
    s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

  const filtered = React.useMemo(() => {
    const q = normalised(query.trim());
    return faqItems.filter((item) => {
      const inTab = tab === ALL || item.category === tab;
      if (!inTab) return false;
      if (!q) return true;
      const haystack = normalised(`${item.question} ${item.answer}`);
      return haystack.includes(q);
    });
  }, [tab, query]);

  return (
    <section className="container py-14 md:py-20">
      {/* Filters */}
      <div className="flex flex-col gap-5 border-b border-navy-100 pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Catégories de la FAQ">
          {[ALL, ...faqCategories].map((c) => {
            const active = tab === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(c)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-navy-800 text-white'
                    : 'bg-navy-50 text-navy-700 hover:bg-navy-100',
                )}
              >
                {c}
              </button>
            );
          })}
        </div>

        <label className="flex w-full items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 md:w-72">
          <Search className="h-4 w-4 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une question..."
            aria-label="Rechercher dans la FAQ"
            className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
          />
        </label>
      </div>

      {/* Results */}
      <div className="mt-8">
        <p className="text-sm text-muted">
          {filtered.length} question{filtered.length > 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-paper p-10 text-center">
            <p className="font-display text-lg font-semibold text-navy-800">
              Aucune question ne correspond à votre recherche.
            </p>
            <p className="mt-2 text-sm text-muted">
              Essayez un autre mot-clé, ou{' '}
              <a href="/contact" className="font-medium text-navy-700 underline">
                posez-nous votre question directement
              </a>
              .
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {filtered.map((item, i) => (
              <li key={`${item.category}-${i}`}>
                <FaqAccordion item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FaqAccordion({ item }: { item: (typeof faqItems)[number] }) {
  return (
    <details className="group rounded-2xl border border-navy-100 bg-white shadow-card open:border-navy-200">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left focus-visible:rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy-600">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-800">
            {item.category}
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-navy-800">
            {item.question}
          </p>
        </div>
        <ChevronDown
          aria-hidden
          className="mt-1 h-5 w-5 shrink-0 text-navy-700 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="px-5 pb-5 text-ink/85">
        <p className="leading-relaxed">{item.answer}</p>
      </div>
    </details>
  );
}
