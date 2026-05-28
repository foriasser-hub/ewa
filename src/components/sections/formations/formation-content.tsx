import { Check, ListChecks, Target, UserCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Formation } from '@/lib/data/formations';

/**
 * Body of a formation detail page.
 * Renders: long description, audience, prerequisites, modules, skills.
 */
export function FormationContent({ formation }: { formation: Formation }) {
  return (
    <section className="container py-14 md:py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_minmax(0,300px)]">
        {/* Main column */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-800">
            Description
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">À propos de ce parcours</h2>
          <p className="mt-5 text-ink/85">{formation.description}</p>

          {/* Modules / programme */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-bold text-navy-800">Programme</h3>
            <p className="mt-2 text-sm text-muted">
              {formation.modules.length} modules progressifs, du premier cours au projet final.
            </p>

            <ol className="mt-6 space-y-4">
              {formation.modules.map((m, i) => (
                <li
                  key={m.title}
                  className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 font-display text-sm font-bold text-navy-700">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-navy-800">
                      {m.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{m.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Skills */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-bold text-navy-800">
              Compétences acquises
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {formation.skills.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-xl border border-navy-100 bg-paper p-4"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
                  <span className="text-sm text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Side column */}
        <aside className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-navy-700">
                <UserCircle2 className="h-5 w-5" aria-hidden />
                <p className="font-display text-base font-semibold">Pour qui ?</p>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/85">
                {formation.audience.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-700" />
                    {a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-navy-700">
                <ListChecks className="h-5 w-5" aria-hidden />
                <p className="font-display text-base font-semibold">Pré-requis</p>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/85">
                {formation.prerequisites.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-700" />
                    {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-navy-700">
                <Target className="h-5 w-5" aria-hidden />
                <p className="font-display text-base font-semibold">Modalités</p>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Niveau</dt>
                  <dd className="font-medium text-navy-800">{formation.level}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Durée</dt>
                  <dd className="font-medium text-navy-800">{formation.duration}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Format</dt>
                  <dd className="font-medium text-navy-800">{formation.format}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}
