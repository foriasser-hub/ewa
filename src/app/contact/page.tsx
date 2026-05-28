import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { ContactHero } from '@/components/sections/contact/contact-hero';
import { ContactInfo } from '@/components/sections/contact/contact-info';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contactez Académie IA Africaine pour vous renseigner sur nos formations IA ou demander un entretien. Réponse sous 48 heures ouvrées.',
  path: '/contact',
});

/**
 * Contact page — static-export edition.
 *
 * The dynamic form (Resend + admin store) lives on the `main` branch and
 * works on a Node host (Vercel/Netlify). On GitHub Pages there is no
 * server to receive the submission, so we replace the form with a clear
 * mailto: CTA. The sidebar info is unchanged.
 */
export default function ContactPage() {
  const subject = encodeURIComponent('Demande d\u2019information — Académie IA');
  const body = encodeURIComponent(
    [
      'Bonjour,',
      '',
      "J'aimerais en savoir plus sur vos formations.",
      '',
      'Mon prénom : ',
      'Mon nom : ',
      'Téléphone (optionnel) : ',
      'Sujet : (information / inscription / entretien / partenariat / autre)',
      'Formation qui m\u2019intéresse : ',
      '',
      'Mon message :',
      '',
      'Merci !',
    ].join('\n'),
  );
  const mailto = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;

  return (
    <>
      <ContactHero />
      <section className="container py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,360px)]">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card md:p-10">
            <h2 className="font-display text-2xl font-bold text-navy-800 md:text-3xl">
              Écrivez-nous en un clic.
            </h2>
            <p className="mt-3 text-ink/85">
              Le bouton ci-dessous ouvre votre application de messagerie avec un brouillon
              pré-rempli. Complétez vos coordonnées, ajoutez votre message, et envoyez. Notre
              équipe vous répond sous 48 heures ouvrées.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={mailto}>
                  <Mail className="h-4 w-4" aria-hidden />
                  Écrire à l&apos;équipe
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/formations">
                  Voir les formations
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted">
              Vous pouvez aussi nous joindre directement :
              <br />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-navy-700 underline-offset-2 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              <span className="mx-2 text-zinc-300">·</span>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="font-semibold text-navy-700 underline-offset-2 hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>

          <ContactInfo />
        </div>
      </section>
    </>
  );
}
