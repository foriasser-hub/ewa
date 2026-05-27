import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Custom 404 page.
 * Mirrors the brand treatment of other pages (navy banner, bleu marine palette)
 * and offers helpful next-step links instead of a dead end.
 */
export default function NotFound() {
  return (
    <section className="bg-navy-800 text-white">
      <div className="container py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Compass className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-6 font-display text-7xl font-bold tracking-tight md:text-8xl">404</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            Cette page est introuvable.
          </h1>
          <p className="mt-4 text-lg text-navy-100">
            Le lien est peut-être ancien, ou la page a été déplacée. Pas de panique, voici quelques
            pistes pour rebondir.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              <Link href="/formations">Voir nos formations</Link>
            </Button>
          </div>

          <p className="mt-10 text-sm text-navy-100/80">
            Toujours perdu·e ?{' '}
            <Link
              href="/contact"
              className="font-medium underline underline-offset-4 hover:text-white"
            >
              Écrivez-nous
            </Link>
            , on vous oriente.
          </p>
        </div>
      </div>
    </section>
  );
}
