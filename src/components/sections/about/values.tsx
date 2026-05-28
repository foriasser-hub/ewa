import { HeartHandshake, Lightbulb, ShieldCheck, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: HeartHandshake,
    title: 'Bienveillance',
    description:
      "Aucune question n'est bête. On crée un espace où débuter et se tromper fait partie du parcours.",
  },
  {
    icon: Lightbulb,
    title: 'Concret avant tout',
    description:
      "Pas de théorie pour la théorie. Chaque notion est immédiatement appliquée à un cas d'usage utile.",
  },
  {
    icon: Users,
    title: 'Communauté',
    description:
      "On apprend mieux ensemble. Nos apprenants restent en contact bien après la fin du parcours.",
  },
  {
    icon: ShieldCheck,
    title: "Éthique de l'IA",
    description:
      "Comprendre les limites, les biais et les risques. Utiliser l'IA, oui, mais en gardant son esprit critique.",
  },
];

export function Values() {
  return (
    <section className="bg-paper">
      <div className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-800">
            Nos valeurs
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Ce qui guide notre pédagogie
          </h2>
          <p className="mt-3 text-muted">
            Quatre principes simples qu&apos;on applique dans chaque cours, chaque échange et
            chaque projet.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="h-full">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <v.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted">{v.description}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
