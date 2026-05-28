import type { Metadata } from 'next';
import { FeaturedFormations } from '@/components/sections/featured-formations';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { LatestPosts } from '@/components/sections/latest-posts';
import { Stats } from '@/components/sections/stats';
import { Testimonials } from '@/components/sections/testimonials';
import { WhyUs } from '@/components/sections/why-us';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Centre de formation IA pour débutants en Afrique',
  description:
    "Apprenez l'Intelligence Artificielle à votre rythme à Antananarivo : ChatGPT et IA pour étudiants, vibe coding avec Kiro, Design IA. Petits groupes, projets concrets, sans jargon.",
  path: '/',
});

/**
 * Homepage of Académie IA Africaine.
 * Sections are kept in dedicated files under src/components/sections/
 * for readability and reusability.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyUs />
      <FeaturedFormations />
      <Testimonials />
      <LatestPosts />
      <FinalCta />
    </>
  );
}
