/**
 * Lightweight formation previews used on the homepage.
 * The full formation data model will live elsewhere when we wire up
 * the formations list & detail pages (Step 5).
 */
export type FormationPreview = {
  slug: string;
  title: string;
  excerpt: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  format: 'Présentiel' | 'En ligne' | 'Hybride';
  iconName: 'graduation-cap' | 'sparkles' | 'palette';
  highlight?: string;
};

export const featuredFormations: FormationPreview[] = [
  {
    slug: 'ia-pour-etudiants',
    title: 'IA pour étudiants',
    excerpt:
      "Comprenez l'IA, maîtrisez ChatGPT et les outils génératifs pour réussir vos études et vos projets.",
    level: 'Débutant',
    duration: '4 semaines',
    format: 'Hybride',
    iconName: 'graduation-cap',
    highlight: 'Le plus populaire',
  },
  {
    slug: 'vibe-coding-avec-kiro',
    title: 'Vibe coding avec KIRO',
    excerpt:
      "Apprenez à créer des sites et applications en collaborant avec une IA, sans parcours de développeur.",
    level: 'Débutant',
    duration: '6 semaines',
    format: 'En ligne',
    iconName: 'sparkles',
    highlight: 'Nouveau',
  },
  {
    slug: 'design-ia',
    title: 'Design IA',
    excerpt:
      "Intégrez l'IA générative dans votre workflow créatif (visuels, identité, mockups, vidéo).",
    level: 'Débutant',
    duration: '5 semaines',
    format: 'En ligne',
    iconName: 'palette',
  },
];
