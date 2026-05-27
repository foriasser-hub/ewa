import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: `Politique de confidentialité et protection des données d'${siteConfig.name}.`,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section className="bg-navy-800 text-white">
        <div className="container py-16 md:py-20">
          <h1 className="text-3xl font-bold md:text-4xl">Politique de confidentialité</h1>
        </div>
      </section>
      <article className="container max-w-3xl py-14 md:py-20 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-800 [&_p]:mt-3 [&_p]:text-ink/85 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-ink/85 [&_li]:leading-relaxed">
        <p>
          Dernière mise à jour : mai 2026.
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          <strong>{siteConfig.name}</strong>
          <br />
          {siteConfig.contact.address}
          <br />
          Email :{' '}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-700 underline">
            {siteConfig.contact.email}
          </a>
        </p>

        <h2>Données collectées</h2>
        <p>
          Via le formulaire de contact, nous collectons uniquement les données que vous fournissez
          volontairement :
        </p>
        <ul>
          <li>Prénom et nom</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone (optionnel)</li>
          <li>Le contenu de votre message</li>
        </ul>
        <p>
          Nous ne collectons <strong>aucune donnée automatiquement</strong> (pas de cookies de
          tracking, pas d&apos;analytics tiers) en V1 du site. Si cela évolue, cette page sera mise
          à jour et un bandeau de consentement sera mis en place.
        </p>

        <h2>Finalités du traitement</h2>
        <ul>
          <li>Répondre à votre demande de contact ou d&apos;inscription.</li>
          <li>Vous envoyer des informations relatives à nos formations si vous l&apos;avez demandé.</li>
        </ul>

        <h2>Base légale</h2>
        <p>
          Le traitement repose sur votre <strong>consentement</strong>, recueilli via la case à
          cocher du formulaire de contact. Vous pouvez retirer votre consentement à tout moment en
          nous écrivant.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Vos données sont conservées pendant la durée nécessaire au traitement de votre demande,
          puis supprimées dans un délai maximum de 12 mois après le dernier échange.
        </p>

        <h2>Destinataires</h2>
        <p>
          Vos données sont transmises uniquement à notre équipe pédagogique interne. Elles ne sont
          jamais revendues, cédées ou partagées avec des tiers, à l&apos;exception de notre
          prestataire technique d&apos;envoi d&apos;email (Resend Inc.) qui agit en tant que
          sous-traitant.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément aux réglementations applicables en matière de protection des données, vous
          disposez des droits suivants :
        </p>
        <ul>
          <li>Droit d&apos;accès à vos données personnelles</li>
          <li>Droit de rectification</li>
          <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
          <li>Droit de retrait du consentement</li>
          <li>Droit à la portabilité des données</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à{' '}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-700 underline">
            {siteConfig.contact.email}
          </a>
          . Nous répondons sous 30 jours.
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site n&apos;utilise <strong>aucun cookie de tracking</strong> à ce jour. Seuls des
          cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés
          (session, préférences de consentement). Aucun consentement n&apos;est requis pour ces
          cookies techniques.
        </p>

        <h2>Modifications</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique à tout moment. En cas de
          changement substantiel, un avis sera publié sur le site et la date de mise à jour sera
          modifiée en conséquence.
        </p>
      </article>
    </>
  );
}
