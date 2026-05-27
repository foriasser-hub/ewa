import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FinalCta } from '@/components/sections/final-cta';
import { FormationContent } from '@/components/sections/formations/formation-content';
import { FormationHeader } from '@/components/sections/formations/formation-header';
import { RelatedFormations } from '@/components/sections/formations/related-formations';
import {
  formatPrice,
  getAllFormationSlugs,
  getFormationBySlug,
} from '@/lib/data/formations';
import { siteConfig } from '@/lib/site-config';
import { breadcrumbsJsonLd, buildMetadata, jsonLd } from '@/lib/seo';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllFormationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const formation = getFormationBySlug(params.slug);
  if (!formation) {
    return { title: 'Formation introuvable', robots: { index: false, follow: false } };
  }
  return buildMetadata({
    title: formation.title,
    description: formation.excerpt,
    path: `/formations/${formation.slug}`,
    type: 'article',
  });
}

export default function FormationDetailPage({ params }: PageProps) {
  const formation = getFormationBySlug(params.slug);
  if (!formation) notFound();

  // Schema.org Course structured data — improves search visibility.
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: formation.title,
    description: formation.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    educationalLevel: formation.level,
    timeRequired: formation.duration,
    teaches: formation.skills,
    inLanguage: 'fr-MG',
    offers:
      formation.price !== null
        ? {
            '@type': 'Offer',
            price: formation.price,
            priceCurrency: 'MGA',
            description: formatPrice(formation.price),
            availability: 'https://schema.org/InStock',
          }
        : {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            description: 'Sur devis',
          },
  };

  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: '/formations' },
    { name: formation.title, path: `/formations/${formation.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(courseJsonLd)}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(breadcrumbs)}
      />
      <FormationHeader formation={formation} />
      <FormationContent formation={formation} />
      <RelatedFormations currentSlug={formation.slug} />
      <FinalCta />
    </>
  );
}
