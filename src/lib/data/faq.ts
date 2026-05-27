/**
 * FAQ data model and content.
 * Three categories aligned with our positioning:
 * a practical centre focused on personal development —
 * no certification path advertised.
 */

export type FaqCategory = 'Inscription' | 'Pédagogie' | 'Tarifs & financement';

export type FaqItem = {
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqCategories: FaqCategory[] = [
  'Inscription',
  'Pédagogie',
  'Tarifs & financement',
];

export const faqItems: FaqItem[] = [
  /* -------------------- Inscription -------------------- */
  {
    category: 'Inscription',
    question: 'Comment puis-je m\u2019inscrire à une formation ?',
    answer:
      "Rendez-vous sur la page d'une formation et cliquez sur \u00ab S'inscrire \u00bb. Vous serez redirigé vers notre formulaire de contact. Nous vous rappelons dans les 48 heures pour valider votre inscription et répondre à vos questions.",
  },
  {
    category: 'Inscription',
    question: 'Faut-il avoir des bases en informatique pour démarrer ?',
    answer:
      "Non. Tous nos parcours sont pensés pour les débutants. Si vous savez utiliser un ordinateur, un navigateur web et une boîte mail, vous avez tout ce qu'il faut pour commencer.",
  },
  {
    category: 'Inscription',
    question: 'Y a-t-il un âge minimum ou maximum ?',
    answer:
      "Nos formations sont ouvertes à toute personne motivée. Le format \u00ab IA pour étudiants \u00bb est particulièrement adapté aux lycéens en terminale et aux étudiants. Les autres parcours conviennent à tous les profils, du jeune actif au senior en reconversion.",
  },
  {
    category: 'Inscription',
    question: 'Puis-je suivre une formation depuis l\u2019étranger ?',
    answer:
      "Oui. Les parcours \u00ab Vibe coding avec KIRO \u00bb et \u00ab Design IA \u00bb sont 100 % en ligne. Vous pouvez les suivre depuis n'importe où.",
  },

  /* -------------------- Pédagogie -------------------- */
  {
    category: 'Pédagogie',
    question: 'À quoi ressemble une session de formation ?',
    answer:
      "Chaque module combine une explication courte sans jargon, une démonstration pratique, puis un exercice guidé que vous réalisez en direct avec le formateur. À la fin, vous avez produit quelque chose d'utile, pas juste pris des notes.",
  },
  {
    category: 'Pédagogie',
    question: 'Vais-je obtenir un diplôme ou une certification ?',
    answer:
      "Non, et c'est volontaire. Nous sommes un centre pratique, pensé pour les personnes qui veulent se développer personnellement et acquérir des compétences réelles, immédiatement utiles. Notre engagement, c'est qu'à la fin de chaque parcours vous ayez produit un projet concret dont vous êtes fier·e.",
  },
  {
    category: 'Pédagogie',
    question: 'Combien de temps faut-il consacrer chaque semaine ?',
    answer:
      "Comptez en moyenne 4 à 6 heures par semaine, modules et pratique inclus. Tous nos contenus restent disponibles, vous pouvez avancer à votre rythme si nécessaire.",
  },
  {
    category: 'Pédagogie',
    question: 'Que se passe-t-il si je rate une session ?',
    answer:
      "Vous gardez l'accès aux ressources du module pour rattraper. En cas de difficulté, votre mentor vous propose un créneau de rattrapage individuel pour ne pas vous laisser en arrière.",
  },
  {
    category: 'Pédagogie',
    question: 'Puis-je continuer à poser des questions après la formation ?',
    answer:
      "Oui. Nos apprenants gardent accès à un canal communautaire où ils continuent à échanger entre eux et avec nos formateurs longtemps après la fin du parcours.",
  },

  /* -------------------- Tarifs & financement -------------------- */
  {
    category: 'Tarifs & financement',
    question: 'Quel est le tarif d\u2019une formation ?',
    answer:
      "Les tarifs varient selon la formation et le format. Pour obtenir le tarif exact et les options disponibles, contactez-nous via la page Contact ou directement depuis la fiche du parcours qui vous intéresse.",
  },
  {
    category: 'Tarifs & financement',
    question: 'Le paiement en plusieurs fois est-il possible ?',
    answer:
      "Oui. Nous proposons un paiement échelonné sans frais sur la durée de la formation. Les modalités sont à voir directement avec notre équipe lors de l'inscription.",
  },
  {
    category: 'Tarifs & financement',
    question: 'Y a-t-il des tarifs préférentiels pour les étudiants ?',
    answer:
      "Oui. Nous proposons des tarifs adaptés aux lycéens et étudiants sur présentation d'un justificatif. Mentionnez-le dans votre demande de contact.",
  },
  {
    category: 'Tarifs & financement',
    question: 'Que comprend exactement le tarif ?',
    answer:
      "Le tarif inclut l'accès à toutes les sessions, les ressources pédagogiques, l'accompagnement individuel par un mentor, le projet final et l'accès à la communauté. Aucun coût caché.",
  },
];
