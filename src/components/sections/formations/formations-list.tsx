'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  formations,
  getFormationIcon,
  type Formation,
  type FormationFormat,
  type FormationLevel,
} from '@/lib/data/formations';
import { images } from '@/lib/data/images';
import { cn } from '@/lib/utils';

const levels: ('Tous' | FormationLevel)[] = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
const formats: ('Tous' | FormationFormat)[] = ['Tous', 'Présentiel', 'En ligne', 'Hybride'];

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
    <section className="container py-12 md:py-16">
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
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-700">
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
  const cover = images.formations[formation.slug] ?? images.heroPrimary;

  return (
    <Link
      href={`/formations/${formation.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={`Illustration : ${formation.title}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/15 to-transparent"
        />
        {formation.highlight ? (
          <Badge variant="solid" className="absolute left-4 top-4 bg-gold text-navy-900">
            {formation.highlight}
          </Badge>
        ) : null}
        <div className="absolute left-4 right-4 top-4 flex justify-end">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-navy-700 backdrop-blur">
            <Icon className="h-4 w-4" aria-hidden />
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 text-xs text-white/95">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden />
            {formation.duration}
          </span>
          <span aria-hidden>·</span>
          <span>{formation.format}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" aria-hidden />
            {formation.level}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight text-navy-800">
          {formation.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{formation.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-navy-700 transition group-hover:text-navy-800">
          Voir le programme
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
