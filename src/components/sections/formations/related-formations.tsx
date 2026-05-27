import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  formations,
  getFormationIcon,
  type Formation,
} from '@/lib/data/formations';

/**
 * Suggests up to 2 other formations on a detail page.
 * Simple heuristic: take the next formations in declaration order
 * (excluding the current one).
 */
export function RelatedFormations({ currentSlug }: { currentSlug: string }) {
  const others = formations.filter((f) => f.slug !== currentSlug).slice(0, 2);
  if (others.length === 0) return null;

  return (
    <section className="bg-paper">
      <div className="container py-16 md:py-20">
        <h2 className="font-display text-2xl font-bold text-navy-800 md:text-3xl">
          Vous pourriez aussi aimer
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((f) => (
            <li key={f.slug}>
              <RelatedCard formation={f} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RelatedCard({ formation }: { formation: Formation }) {
  const Icon = getFormationIcon(formation.iconName);
  return (
    <Link href={`/formations/${formation.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:border-navy-200">
        <CardContent className="flex flex-1 flex-col p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{formation.level}</Badge>
              <Badge variant="outline">
                <Clock className="mr-1 h-3 w-3" aria-hidden />
                {formation.duration}
              </Badge>
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-navy-800">{formation.title}</h3>
          <p className="mt-2 text-sm text-muted">{formation.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-navy-700 transition group-hover:text-navy-800">
            Découvrir
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
