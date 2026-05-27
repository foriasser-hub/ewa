import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { latestPosts } from '@/lib/data/posts';
import { formatDate } from '@/lib/utils';

export function LatestPosts() {
  return (
    <section className="bg-paper">
      <div className="container py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-600">
              Blog
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Derniers articles</h2>
            <p className="mt-3 text-muted">
              Conseils, tutoriels et tendances IA, écrits par notre équipe pédagogique.
            </p>
          </div>
          <Button asChild variant="outline" size="md">
            <Link href="/blog">
              Tous les articles
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {latestPosts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden transition group-hover:-translate-y-0.5 group-hover:border-navy-200">
                  {/* Cover placeholder (gradient) — real image arrives in Step 7 */}
                  <div
                    aria-hidden
                    className="h-40 w-full bg-gradient-to-br from-navy-700 via-navy-600 to-navy-500"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 50%), linear-gradient(135deg, #102A56, #1E3A8A 60%, #2D4A8A)',
                    }}
                  />
                  <CardContent className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <Badge variant="default">{p.category}</Badge>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden />
                        {p.readingTime} min
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug text-navy-800 group-hover:text-navy-700">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted">{p.excerpt}</p>
                    <p className="mt-auto pt-2 text-xs text-muted">{formatDate(p.publishedAt)}</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
