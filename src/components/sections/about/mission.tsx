import { Compass, Target } from 'lucide-react';

/**
 * Mission & story section.
 * Two columns on desktop: narrative on the left, key points on the right.
 */
export function Mission() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-800">
            Notre mission
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Rendre l&apos;IA accessible, utile et concrète.
          </h2>
          <div className="mt-6 space-y-4 text-ink/80">
            <p>
              L&apos;IA n&apos;est pas réservée aux ingénieurs ni aux grandes entreprises. Elle peut
              transformer la manière dont on étudie, dont on travaille et dont on crée — à
              condition de savoir l&apos;utiliser.
            </p>
            <p>
              Nous avons fondé AKADEMIA IA MADAGASIKARA pour offrir aux étudiants, jeunes
              professionnels et créatifs malgaches des parcours pas-à-pas, en français, ancrés
              dans la réalité du terrain.
            </p>
            <p>
              Notre approche : pas de jargon, de la pratique dès le premier cours, et un projet
              concret au bout de chaque parcours.
            </p>
          </div>
        </div>

        <ul className="space-y-5">
          <li className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Target className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-navy-800">Notre objectif</p>
              <p className="mt-1 text-sm text-muted">
                Former une nouvelle génération d&apos;utilisateurs avertis de l&apos;IA, capables
                de l&apos;intégrer dans leurs études, leur métier et leurs projets personnels.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Compass className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-navy-800">Notre approche</p>
              <p className="mt-1 text-sm text-muted">
                Petits groupes, accompagnement individuel, projets réels. On apprend en faisant,
                pas en regardant des slides.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
