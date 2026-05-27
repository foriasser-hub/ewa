import Link from 'next/link';
import { ArrowRight, Clock, GraduationCap, Palette, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { featuredFormations, type FormationPreview } from '@/lib/data/formations';

const iconMap = {
  'graduation-cap': GraduationCap,
  sparkles: Sparkles,
  palette: Palette,
} as const;

export function FeaturedFormations() {
  return (
    <section className="bg-paper">
      <div className="container py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-600">
              Nos formations phares
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              3 parcours pour démarrer dans l&apos;IA
            </h2>
            <p className="mt-3 text-muted">
              Conçus pour les débutants. Chaque parcours combine théorie minimale et pratique
              guidée, du premier cours jusqu&apos;à un projet final concret.
            </p>
          </div>
          <Button asChild variant="outline" size="md">
            <Link href="/formations">
              Voir toutes les formations
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredFormations.map((f) => (
            <li key={f.slug}>
              <FormationCard formation={f} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FormationCard({ formation }: { formation: FormationPreview }) {
  const Icon = iconMap[formation.iconName];

  return (
    <Card className="group flex h-full flex-col transition hover:-translate-y-0.5 hover:shadow-card hover:border-navy-200">
      <CardContent className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
          {formation.highlight ? (
            <Badge variant="gold">{formation.highlight}</Badge>
          ) : null}
        </div>

        <h3 className="mt-5 text-xl font-semibold">{formation.title}</h3>
        <p className="mt-2 text-sm text-muted">{formation.excerpt}</p>

        <ul className="mt-5 flex flex-wrap gap-2 text-xs">
          <li>
            <Badge variant="default">{formation.level}</Badge>
          </li>
          <li>
            <Badge variant="outline">
              <Clock className="mr-1 h-3 w-3" aria-hidden />
              {formation.duration}
            </Badge>
          </li>
          <li>
            <Badge variant="outline">{formation.format}</Badge>
          </li>
        </ul>

        <div className="mt-auto pt-6">
          <Link
            href={`/formations/${formation.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition group-hover:text-navy-800"
          >
            Découvrir le parcours
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
