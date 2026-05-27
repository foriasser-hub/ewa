import type { Metadata } from 'next';
import { FaqHero } from '@/components/sections/faq/faq-hero';
import { FaqList } from '@/components/sections/faq/faq-list';
import { FinalCta } from '@/components/sections/final-cta';
import { faqItems } from '@/lib/data/faq';
import { buildMetadata, jsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Questions fréquentes (FAQ)',
  description:
    "Toutes les réponses aux questions fréquentes sur les formations IA d'AKADEMIA IA MADAGASIKARA : inscription, pédagogie, tarifs et financement.",
  path: '/faq',
});

export default function FaqPage() {
  // FAQPage JSON-LD — improves visibility in Google rich results.
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(payload)}
      />
      <FaqHero />
      <FaqList />
      <FinalCta />
    </>
  );
}
