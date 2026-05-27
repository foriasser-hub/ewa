import { Badge } from '@/components/ui/badge';

/**
 * About page header.
 * Re-uses the navy banner treatment for visual consistency with the homepage,
 * but with a calmer composition (no chat mock).
 */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse at top, black 0%, black 40%, transparent 75%)',
        }}
      />
      <div className="container relative py-20 md:py-24">
        <Badge variant="solid" className="bg-white text-navy-800">
          À propos
        </Badge>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Démocratiser l&apos;Intelligence Artificielle à Madagascar.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-navy-100">
          AKADEMIA IA MADAGASIKARA est un centre de formation pensé pour les débutants. Notre
          conviction : tout le monde peut apprendre à utiliser l&apos;IA, à condition d&apos;être
          bien accompagné.
        </p>
      </div>
    </section>
  );
}
