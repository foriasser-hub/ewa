import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/lib/data/testimonials';

export function Testimonials() {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-600">
          Témoignages
        </p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
          Ce que disent nos apprenants
        </h2>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-5 p-7">
                <Quote className="h-6 w-6 text-navy-200" aria-hidden />
                <blockquote className="flex-1 text-ink">
                  <p className="leading-relaxed">{t.quote}</p>
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-navy-100 pt-4">
                  <div
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 font-display text-sm font-bold text-navy-700"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.role} · <span className="text-navy-700">{t.formation}</span>
                    </p>
                  </div>
                </figcaption>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
