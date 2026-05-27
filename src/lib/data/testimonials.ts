export type Testimonial = {
  name: string;
  role: string;
  formation: string;
  quote: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Tahina R.',
    role: 'Étudiante en gestion',
    formation: 'IA pour étudiants',
    initials: 'TR',
    quote:
      "Je pensais que l'IA, ce n'était pas pour moi. En 4 semaines j'ai gagné un temps fou sur mes recherches et mes mémoires. Les formateurs prennent vraiment le temps d'expliquer.",
  },
  {
    name: 'Hery A.',
    role: 'Chargé de communication',
    formation: 'Vibe coding avec KIRO',
    initials: 'HA',
    quote:
      "J'ai construit le site interne de mon équipe sans écrire une ligne seul. Apprendre à dialoguer avec Kiro a changé ma façon de travailler.",
  },
  {
    name: 'Mialy N.',
    role: 'Designer freelance',
    formation: 'Design IA',
    initials: 'MN',
    quote:
      "Mes propositions clients sont passées au niveau supérieur. Je conçois mes moodboards en une matinée au lieu d'une semaine.",
  },
];
