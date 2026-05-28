import { ChefHat, Handshake, KeyRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { images } from '@/lib/data/images';

/**
 * Partner section — Le Paradissier (restaurant + furnished apartments).
 * Now uses a real photo on the right column for warmth and credibility.
 */
export function Partner() {
  return (
    <section className="bg-paper">
      <div className="container py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-800">
            Notre partenaire
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Le Paradissier
          </h2>
          <p className="mt-3 text-muted">
            Pour accueillir nos apprenants venus d&apos;ailleurs ou prolonger les
            journées de formation autour d&apos;un bon repas, nous travaillons avec Le
            Paradissier.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
          <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
            <div className="p-7 md:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <Handshake className="h-6 w-6" aria-hidden />
                </div>
                <Badge variant="default">Partenaire officiel</Badge>
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-navy-800">
                Restaurant & appartements meublés
              </h3>
              <p className="mt-3 text-ink/85">
                Le Paradissier propose à la fois un restaurant accueillant et des
                appartements meublés, parfaits pour les apprenants qui rejoignent nos
                sessions en présentiel à Antananarivo.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <ChefHat className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">Restaurant</p>
                    <p className="text-muted">
                      Pause déjeuner conviviale entre deux modules, dans un cadre
                      chaleureux.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <KeyRound className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">Appartements meublés</p>
                    <p className="text-muted">
                      Solution d&apos;hébergement pratique pour les apprenants venus
                      d&apos;autres régions de Madagascar.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right-hand visual: real photo */}
            <div className="relative hidden min-h-[360px] md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images.paradissier}
                alt="Vue d'un restaurant accueillant — Le Paradissier"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-navy-900/40 via-transparent to-navy-900/30"
              />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-xl font-bold tracking-tight text-white">
                  Le Paradissier
                </p>
                <p className="text-sm text-white/85">Restaurant · Appartements meublés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
