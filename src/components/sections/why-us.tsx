import { BookOpen, HandHeart, Wrench } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'Pédagogie sans jargon',
    description:
      "Nos formateurs vulgarisent l'IA avec des exemples concrets, dans un français clair. Aucune base technique requise pour démarrer.",
  },
  {
    icon: HandHeart,
    title: 'Accompagnement humain',
    description:
      'Petits groupes, mentorat individuel, suivi après la formation. Vous avancez à votre rythme, jamais seul·e face à votre écran.',
  },
  {
    icon: Wrench,
    title: 'Projets concrets',
    description:
      "Chaque module se termine par un mini-projet exploitable au travail ou en portfolio. On apprend en faisant, pas en regardant.",
  },
];

export function WhyUs() {
  return (
    <section className="relative bg-white">
      {/* Subtle dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(10, 31, 68, 0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)',
        }}
      />

      <div className="container relative py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-800">
            Pourquoi nous
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Une école pensée pour les vrais débutants
          </h2>
          <p className="mt-3 text-muted">
            Trois engagements simples qui font la différence quand on découvre
            l&apos;IA.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
            >
              <span
                aria-hidden
                className="absolute right-5 top-4 font-display text-7xl font-extrabold text-navy-200/70"
              >
                0{i + 1}
              </span>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-800 text-white shadow-card">
                <p.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold tracking-tight text-navy-800">
                {p.title}
              </h3>
              <p className="relative mt-2 text-sm text-muted">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
