import { BookOpen, HandHeart, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-600">
          Pourquoi nous
        </p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
          Une école pensée pour les vrais débutants
        </h2>
        <p className="mt-3 text-muted">
          Trois engagements simples qui font la différence quand on découvre l&apos;IA.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pillars.map((p) => (
          <Card key={p.title} className="h-full">
            <CardContent className="p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <p.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
