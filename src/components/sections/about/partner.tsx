import { Building2, ChefHat, Handshake, KeyRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/**
 * Partner section — Le Paradissier (restaurant + furnished apartments).
 * Useful information for learners who travel from outside Antananarivo
 * to attend in-person sessions.
 */
export function Partner() {
  return (
    <section className="bg-paper">
      <div className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-600">
            Notre partenaire
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Le Paradissier</h2>
          <p className="mt-3 text-muted">
            Pour accueillir nos apprenants venus d&apos;ailleurs ou prolonger les journées de
            formation autour d&apos;un bon repas, nous travaillons avec Le Paradissier.
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

              <h3 className="mt-5 font-display text-2xl font-bold text-navy-800">
                Restaurant & appartements meublés
              </h3>
              <p className="mt-3 text-ink/80">
                Le Paradissier propose à la fois un restaurant accueillant et des appartements
                meublés, parfaits pour les apprenants qui rejoignent nos sessions en présentiel à
                Antananarivo.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <ChefHat className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">Restaurant</p>
                    <p className="text-muted">
                      Pause déjeuner conviviale entre deux modules, dans un cadre chaleureux.
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
                      Solution d&apos;hébergement pratique pour les apprenants venus d&apos;autres
                      régions de Madagascar.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right-hand visual block (no external image) */}
            <div
              aria-hidden
              className="relative hidden md:block"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 50%), linear-gradient(135deg, #102A56, #1E3A8A 60%, #2D4A8A)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <Building2 className="h-8 w-8" aria-hidden />
                </div>
                <p className="font-display text-2xl font-bold tracking-tight">
                  Le Paradissier
                </p>
                <p className="text-sm text-navy-100/90">Restaurant · Appartements meublés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
