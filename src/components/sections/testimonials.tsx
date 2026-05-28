import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';
import { images } from '@/lib/data/images';

/**
 * Testimonials — three magazine-style cards with circular photos.
 * Photos are pulled from the central image catalogue and resolve to
 * stock portraits. Easy to swap with real ones later.
 */
export function Testimonials() {
  return (
    <section className="container py-14 md:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-600">
          Témoignages
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
          Ils ont franchi le pas.
        </h2>
        <p className="mt-3 text-muted">
          Trois apprenants, trois parcours, une même conviction : l&apos;IA est utile,
          accessible et puissante quand on est bien guidé.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name}>
            <article className="flex h-full flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-7 shadow-card">
              <Quote className="h-7 w-7 text-navy-200" aria-hidden />
              <blockquote className="flex-1 text-ink">
                <p className="leading-relaxed">{t.quote}</p>
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-navy-100 pt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images.testimonials[t.name] ?? images.heroPrimary}
                  alt={`Portrait de ${t.name}`}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-navy-50"
                  loading="lazy"
                />
                <div>
                  <p className="font-display font-semibold text-navy-800">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.role} · <span className="text-navy-700">{t.formation}</span>
                  </p>
                </div>
              </figcaption>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
