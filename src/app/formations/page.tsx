import type { Metadata } from 'next';
import { FinalCta } from '@/components/sections/final-cta';
import { FormationsHero } from '@/components/sections/formations/formations-hero';
import { FormationsList } from '@/components/sections/formations/formations-list';

export const metadata: Metadata = {
  title: 'Nos formations',
  description:
    "Découvrez les parcours d'AKADEMIA IA MADAGASIKARA : IA pour étudiants, Vibe coding avec Kiro, Design IA. Tous nos parcours sont conçus pour les débutants.",
};

export default function FormationsPage() {
  return (
    <>
      <FormationsHero />
      <FormationsList />
      <FinalCta />
    </>
  );
}
