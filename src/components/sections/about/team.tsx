import { GraduationCap, MessagesSquare, Sparkles } from 'lucide-react';

/**
 * Team section — generic on purpose (no individual names, roles or bios yet).
 * It introduces the kind of people learners will meet without exposing
 * personal information that hasn't been finalised.
 */
const profiles = [
  {
    icon: Sparkles,
    title: 'Des formateurs praticiens',
    description:
      "Des intervenants qui utilisent l'IA au quotidien dans leur métier (data, design, dev, communication). Ils transmettent ce qui marche réellement.",
  },
  {
    icon: MessagesSquare,
    title: 'Des mentors disponibles',
    description:
      "Pendant et après la formation, vous avez un canal direct pour poser vos questions et recevoir un retour personnalisé sur vos projets.",
  },
  {
    icon: GraduationCap,
    title: 'Une équipe pédagogique dédiée',
    description:
      "Notre équipe conçoit chaque parcours pour qu'il soit progressif, motivant, et terminé par un projet dont vous êtes fier·e.",
  },
];

export function Team() {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-800">
          Notre équipe
        </p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
          Des humains, avant tout
        </h2>
        <p className="mt-3 text-muted">
          Une équipe de formateurs et de mentors qui vous accompagnent à chaque étape, du premier
          cours jusqu&apos;à votre projet final.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {profiles.map((p) => (
          <li key={p.title} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <p.icon className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
