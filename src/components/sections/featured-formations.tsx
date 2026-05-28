import Link from 'next/link';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { featuredFormations, type FormationPreview } from '@/lib/data/formations';
import { images } from '@/lib/data/images';

/**
 * Featured formations — image-led cards.
 * Each card uses a real photo as the cover (Unsplash CDN) with a navy
 * gradient that keeps the brand identity consistent.
 */
export function FeaturedFormations() {
  return (
    <section className="relative bg-paper">
      <div className="container py-14 md:py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-800">
              Nos formations phares
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              3 parcours pour démarrer dans l&apos;IA
            </h2>
            <p className="mt-3 text-muted">
              Conçus pour les débutants. Théorie minimale, pratique guidée, projet final
              concret.
            </p>
          </div>
          <Button asChild variant="outline" size="md">
            <Link href="/formations">
              Toutes les formations
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredFormations.map((f) => (
            <li key={f.slug}>
              <FormationCard formation={f} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FormationCard({ formation }: { formation: FormationPreview }) {
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
          <Badge
            variant="solid"
            className="absolute left-4 top-4 bg-gold text-navy-900"
          >
            {formation.highlight}
          </Badge>
        ) : null}
        <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 text-xs text-white/90">
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
          Découvrir le parcours
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
