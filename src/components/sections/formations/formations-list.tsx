'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  formations,
  getFormationIcon,
  type Formation,
  type FormationFormat,
  type FormationLevel,
} from '@/lib/data/formations';
import { cn } from '@/lib/utils';

const levels: ('Tous' | FormationLevel)[] = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
const formats: ('Tous' | FormationFormat)[] = ['Tous', 'Présentiel', 'En ligne', 'Hybride'];

/**
 * Client-side filterable list of formations.
 * Filters operate on the static dataset; no network calls.
 */
export function FormationsList() {
  const [level, setLevel] = React.useState<(typeof levels)[number]>('Tous');
  const [format, setFormat] = React.useState<(typeof formats)[number]>('Tous');

  const filtered = React.useMemo(() => {
    return formations.filter((f) => {
      const levelOk = level === 'Tous' || f.level === level;
      const formatOk = format === 'Tous' || f.format === format;
      return levelOk && formatOk;
    });
  }, [level, format]);

  return (
    <section className="container py-14 md:py-20">
      {/* Filters */}
      <div className="flex flex-col gap-6 border-b border-navy-100 pb-8 md:flex-row md:items-center md:justify-between">
        <FilterGroup
          label="Niveau"
          options={levels}
          value={level}
          onChange={(v) => setLevel(v as (typeof levels)[number])}
        />
        <FilterGroup
          label="Format"
          options={formats}
          value={format}
          onChange={(v) => setFormat(v as (typeof formats)[number])}
        />
      </div>

      {/* Results */}
      <div className="mt-8">
        <p className="text-sm text-muted">
          {filtered.length} formation{filtered.length > 1 ? 's' : ''} disponible
          {filtered.length > 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-paper p-10 text-center">
            <p className="font-display text-lg font-semibold text-navy-800">
              Aucune formation ne correspond à ces filtres.
            </p>
            <p className="mt-2 text-sm text-muted">
              Essayez de réinitialiser un des filtres pour voir plus de résultats.
            </p>
          </div>
        ) : (
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f) => (
              <li key={f.slug}>
                <FormationListCard formation={f} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">
        {label}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-label={`Filtre ${label}`}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-navy-800 text-white'
                  : 'bg-navy-50 text-navy-700 hover:bg-navy-100',
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FormationListCard({ formation }: { formation: Formation }) {
  const Icon = getFormationIcon(formation.iconName);

  return (
    <Link href={`/formations/${formation.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:border-navy-200">
        <CardContent className="flex flex-1 flex-col p-7">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            {formation.highlight ? (
              <Badge variant="gold">{formation.highlight}</Badge>
            ) : null}
          </div>

          <h3 className="mt-5 text-xl font-semibold text-navy-800">{formation.title}</h3>
          <p className="mt-2 text-sm text-muted">{formation.excerpt}</p>

          <ul className="mt-5 flex flex-wrap gap-2 text-xs">
            <li>
              <Badge variant="default">{formation.level}</Badge>
            </li>
            <li>
              <Badge variant="outline">
                <Clock className="mr-1 h-3 w-3" aria-hidden />
                {formation.duration}
              </Badge>
            </li>
            <li>
              <Badge variant="outline">{formation.format}</Badge>
            </li>
          </ul>

          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition group-hover:text-navy-800">
              Voir le programme
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
