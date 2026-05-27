import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FinalCta } from '@/components/sections/final-cta';
import { FormationContent } from '@/components/sections/formations/formation-content';
import { FormationHeader } from '@/components/sections/formations/formation-header';
import { RelatedFormations } from '@/components/sections/formations/related-formations';
import {
  getAllFormationSlugs,
  getFormationBySlug,
  formatPrice,
} from '@/lib/data/formations';
import { siteConfig } from '@/lib/site-config';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllFormationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const formation = getFormationBySlug(params.slug);
  if (!formation) {
    return { title: 'Formation introuvable' };
  }
  return {
    title: formation.title,
    description: formation.excerpt,
    openGraph: {
      title: formation.title,
      description: formation.excerpt,
      type: 'article',
    },
  };
}

export default function FormationDetailPage({ params }: PageProps) {
  const formation = getFormationBySlug(params.slug);
  if (!formation) notFound();

  // Schema.org Course structured data — improves search visibility.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: formation.title,
    description: formation.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    educationalLevel: formation.level,
    timeRequired: formation.duration,
    teaches: formation.skills,
    offers:
      formation.price !== null
        ? {
            '@type': 'Offer',
            price: formation.price,
            priceCurrency: 'MGA',
            description: formatPrice(formation.price),
          }
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FormationHeader formation={formation} />
      <FormationContent formation={formation} />
      <RelatedFormations currentSlug={formation.slug} />
      <FinalCta />
    </>
  );
}
