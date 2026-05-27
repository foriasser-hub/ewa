import type { Metadata } from 'next';
import { FaqHero } from '@/components/sections/faq/faq-hero';
import { FaqList } from '@/components/sections/faq/faq-list';
import { FinalCta } from '@/components/sections/final-cta';
import { faqItems } from '@/lib/data/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    "Toutes les réponses aux questions fréquentes sur les formations IA d'AKADEMIA IA MADAGASIKARA : inscription, pédagogie, tarifs et financement.",
};

export default function FaqPage() {
  // FAQPage JSON-LD — improves visibility in Google rich results.
  const jsonLd = {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqHero />
      <FaqList />
      <FinalCta />
    </>
  );
}
