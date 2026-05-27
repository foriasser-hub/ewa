import { FeaturedFormations } from '@/components/sections/featured-formations';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { LatestPosts } from '@/components/sections/latest-posts';
import { Stats } from '@/components/sections/stats';
import { Testimonials } from '@/components/sections/testimonials';
import { WhyUs } from '@/components/sections/why-us';

/**
 * Homepage of AKADEMIA IA MADAGASIKARA.
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
