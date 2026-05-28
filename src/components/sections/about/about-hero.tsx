import { Badge } from '@/components/ui/badge';
import { images } from '@/lib/data/images';

/**
 * About page header with a real background photo.
 * The navy gradient overlay keeps the brand identity and ensures the
 * white text remains readable on top of any image.
 */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images.aboutHero}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="eager"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-800/85 to-navy-900/95"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at top, black 0%, black 40%, transparent 75%)',
        }}
      />

      <div className="container relative py-20 md:py-28">
        <Badge
          variant="solid"
          className="bg-white/10 text-white backdrop-blur ring-1 ring-inset ring-white/20"
        >
          À propos
        </Badge>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
          Démocratiser l&apos;Intelligence Artificielle
          <span className="block text-navy-100">à Madagascar.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-navy-100/95">
          AKADEMIA IA MADAGASIKARA est un centre de formation pensé pour les débutants.
          Notre conviction : tout le monde peut apprendre à utiliser l&apos;IA, à
          condition d&apos;être bien accompagné.
        </p>
      </div>
    </section>
  );
}
