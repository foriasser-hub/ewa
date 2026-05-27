import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: `Mentions légales du site ${siteConfig.name} : éditeur, hébergeur, propriété intellectuelle.`,
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-navy-800 text-white">
        <div className="container py-16 md:py-20">
          <h1 className="text-3xl font-bold md:text-4xl">Mentions légales</h1>
        </div>
      </section>
      <article className="container max-w-3xl py-14 md:py-20 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-800 [&_p]:mt-3 [&_p]:text-ink/85 [&_p]:leading-relaxed">
        <h2>Éditeur du site</h2>
        <p>
          <strong>{siteConfig.name}</strong>
          <br />
          Centre de formation à l&apos;Intelligence Artificielle
          <br />
          Adresse : {siteConfig.contact.address}
          <br />
          Email :{' '}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-700 underline">
            {siteConfig.contact.email}
          </a>
          <br />
          Téléphone : {siteConfig.contact.phone}
        </p>

        <h2>Directeur de publication</h2>
        <p>Le directeur de publication est le représentant légal d&apos;AKADEMIA IA MADAGASIKARA.</p>

        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par <strong>Vercel Inc.</strong>
          <br />
          440 N Bashaw St, Covina, CA 91723, États-Unis
          <br />
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="text-navy-700 underline"
          >
            vercel.com
          </a>
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus du site (textes, visuels, logo, nom de marque) est la
          propriété exclusive d&apos;AKADEMIA IA MADAGASIKARA ou de ses partenaires et est protégé
          par le droit de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, distribution, modification, retransmission ou publication de ces
          contenus est strictement interdite sans l&apos;autorisation écrite préalable de
          l&apos;éditeur.
        </p>

        <h2>Limitation de responsabilité</h2>
        <p>
          AKADEMIA IA MADAGASIKARA s&apos;efforce de fournir des informations aussi précises que
          possible. Toutefois, elle ne pourra être tenue responsable des omissions, des
          inexactitudes ou des carences dans la mise à jour, qu&apos;elles soient de son fait ou
          du fait des partenaires qui lui fournissent ces informations.
        </p>

        <h2>Droit applicable</h2>
        <p>
          Tout litige en relation avec l&apos;utilisation du site est soumis au droit malgache. Il
          est fait attribution exclusive de juridiction aux tribunaux compétents d&apos;Antananarivo.
        </p>
      </article>
    </>
  );
}
