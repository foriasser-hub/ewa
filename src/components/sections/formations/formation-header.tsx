import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  type Formation,
  formatPrice,
  getFormationIcon,
} from '@/lib/data/formations';
import { formatDate } from '@/lib/utils';

/**
 * Detail page header for a formation.
 * Navy banner with title, key facts, sessions and primary CTAs.
 */
export function FormationHeader({ formation }: { formation: Formation }) {
  const Icon = getFormationIcon(formation.iconName);

  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse at top right, black 0%, black 40%, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-navy-500/30 blur-3xl"
      />

      <div className="container relative py-16 md:py-20">
        <Link
          href="/formations"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-100 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Toutes les formations
        </Link>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-[1fr_minmax(0,420px)]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              {formation.highlight ? (
                <Badge variant="gold">{formation.highlight}</Badge>
              ) : (
                <Badge variant="solid" className="bg-white/15 text-white">
                  Formation
                </Badge>
              )}
            </div>

            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              {formation.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-navy-100">{formation.excerpt}</p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-navy-100/90">
              <li className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" aria-hidden />
                Niveau {formation.level.toLowerCase()}
              </li>
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden />
                {formation.duration}
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                {formation.format}
              </li>
            </ul>
          </div>

          {/* Sticky info card */}
          <aside className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 shadow-card backdrop-blur">
            <p className="text-sm uppercase tracking-[0.16em] text-navy-100">Tarif</p>
            <p className="mt-1 font-display text-3xl font-bold">
              {formatPrice(formation.price)}
            </p>

            {formation.nextSessions.length > 0 ? (
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-100">
                  Prochaines sessions
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-white/90">
                  {formation.nextSessions.map((iso) => (
                    <li key={iso} className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-navy-100" aria-hidden />
                      {formatDate(iso)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-2.5">
              <Button asChild variant="secondary" size="lg">
                <Link href={`/contact?formation=${formation.slug}`}>S&apos;inscrire</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
              >
                <Link href={`/contact?formation=${formation.slug}&type=entretien`}>
                  Demander un entretien
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
