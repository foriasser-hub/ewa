import type { Metadata } from 'next';
import { FinalCta } from '@/components/sections/final-cta';
import { FormationsHero } from '@/components/sections/formations/formations-hero';
import { FormationsList } from '@/components/sections/formations/formations-list';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Nos formations IA',
  description:
    "Découvrez les parcours d'Académie IA Africaine : IA pour étudiants, Vibe coding avec Kiro, Design IA. Tous nos parcours sont conçus pour les débutants.",
  path: '/formations',
});

export default function FormationsPage() {
  return (
    <>
      <FormationsHero />
      <FormationsList />
      <FinalCta />
    </>
  );
}
