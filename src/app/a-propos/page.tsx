import type { Metadata } from 'next';
import { AboutHero } from '@/components/sections/about/about-hero';
import { Mission } from '@/components/sections/about/mission';
import { Partner } from '@/components/sections/about/partner';
import { Team } from '@/components/sections/about/team';
import { Values } from '@/components/sections/about/values';
import { FinalCta } from '@/components/sections/final-cta';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'À propos',
  description:
    "Découvrez la mission, les valeurs et l'équipe d'Académie IA Africaine, le centre de formation à l'IA pour débutants en Afrique francophone.",
  path: '/a-propos',
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <Values />
      <Team />
      <Partner />
      <FinalCta />
    </>
  );
}
