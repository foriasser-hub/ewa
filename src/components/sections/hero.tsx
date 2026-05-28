import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { images } from '@/lib/data/images';

/**
 * Homepage hero — editorial split layout.
 * Left:  pre-title, big headline, support copy, CTAs, micro-credentials
 * Right: a real photo with a layered card that recalls the AI subject
 *        without going overboard on illustration.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at top right, black 0%, black 35%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[460px] w-[460px] rounded-full bg-navy-500/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[360px] w-[360px] rounded-full bg-navy-700/60 blur-3xl"
      />

      <div className="container relative grid items-center gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:gap-14 md:py-24 lg:gap-20">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <Badge
            variant="solid"
            className="w-fit gap-1.5 bg-white/10 text-white backdrop-blur ring-1 ring-inset ring-white/20"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Centre de formation IA · Afrique francophone
          </Badge>

          <h1 className="font-display text-balance text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Apprenez l&apos;IA,
            <span className="block text-navy-100">
              <span className="italic">même</span> en partant de zéro.
            </span>
          </h1>

          <p className="max-w-xl text-lg text-navy-100/90 md:text-xl">
            Trois parcours conçus pour les étudiants, les jeunes professionnels et les
            créatifs d&apos;Afrique francophone. Petits groupes, projets concrets, sans
            jargon.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild variant="secondary" size="lg">
              <Link href="/formations">
                Voir les formations
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              <Link href="/contact">Nous écrire</Link>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-sm text-navy-100/90">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-white" aria-hidden />
              <span>
                <strong className="text-white">+200</strong> apprenants formés
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-gold" aria-hidden />
              <span>
                <strong className="text-white">95 %</strong> de satisfaction
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              Hub à Antananarivo · ouvert à toute l&apos;Afrique
            </div>
          </div>
        </div>

        {/* Right column: photo + floating card */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          {/* Soft shadow plate behind the picture */}
          <div
            aria-hidden
            className="absolute -bottom-6 -left-6 h-[88%] w-[88%] rounded-3xl bg-navy-500/30 blur-md"
          />
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.heroPrimary}
              alt="Apprenants en formation IA, autour d'un ordinateur portable"
              className="aspect-[5/6] w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent"
            />
          </div>

          {/* Floating chip card */}
          <div className="absolute -bottom-4 left-4 right-4 hidden rounded-2xl border border-white/10 bg-navy-900/85 p-4 shadow-card backdrop-blur sm:block md:left-auto md:right-[-1.25rem] md:max-w-[260px]">
            <p className="text-xs uppercase tracking-[0.18em] text-navy-100">
              Nos parcours phares
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                />
                IA pour étudiants
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                />
                Vibe coding avec Kiro
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                />
                Design IA
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
