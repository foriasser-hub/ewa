import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Final call-to-action banner above the footer.
 * Reuses the dark navy treatment of the hero to bookend the page.
 */
export function FinalCta() {
  return (
    <section aria-label="Prêt à démarrer ?" className="bg-navy-800 text-white">
      <div className="container py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Prêt·e à démarrer dans l&apos;IA ?
            </h2>
            <p className="mt-3 max-w-2xl text-navy-100">
              Parlons de votre projet d&apos;apprentissage en 15 minutes. Nous vous orientons vers
              la formation la plus adaptée à votre profil — c&apos;est gratuit et sans engagement.
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
