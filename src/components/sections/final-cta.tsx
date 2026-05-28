import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/data/images';

/**
 * Final call-to-action above the footer.
 * Now has a real photo background with a navy gradient overlay,
 * keeping the brand identity while adding warmth and humanity.
 */
export function FinalCta() {
  return (
    <section
      aria-label="Prêt à démarrer ?"
      className="relative overflow-hidden bg-navy-800 text-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images.heroPrimary}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        loading="lazy"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-800/85 to-navy-900/85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, black 50%, transparent 90%)',
        }}
      />

      <div className="container relative py-14 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Prêt·e à démarrer dans l&apos;IA ?
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-navy-100/95">
              Parlons de votre projet d&apos;apprentissage en 15 minutes. Nous vous
              orientons vers la formation la plus adaptée à votre profil — c&apos;est
              gratuit et sans engagement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">
                <Mail className="h-4 w-4" aria-hidden />
                Nous contacter
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              <Link href="/formations">
                Voir les formations
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
