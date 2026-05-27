import type { LucideIcon } from 'lucide-react';
import { GraduationCap, Palette, Sparkles } from 'lucide-react';

/**
 * Formation data model.
 * Kept as a typed in-file dataset for V1 — no CMS yet.
 * Replace `prices` and `nextSessions` with real values when known.
 */

export type FormationLevel = 'Débutant' | 'Intermédiaire' | 'Avancé';
export type FormationFormat = 'Présentiel' | 'En ligne' | 'Hybride';

export type FormationModule = {
  title: string;
  description: string;
};

export type Formation = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  level: FormationLevel;
  duration: string;
  /** Price in MGA (Malagasy Ariary). Null = "Sur devis". */
  price: number | null;
  format: FormationFormat;
  iconName: 'graduation-cap' | 'sparkles' | 'palette';
  highlight?: string;
  audience: string[];
  prerequisites: string[];
  skills: string[];
  modules: FormationModule[];
  /** ISO date strings for upcoming sessions. */
  nextSessions: string[];
};

export const formations: Formation[] = [
  {
    slug: 'ia-pour-etudiants',
    title: 'IA pour étudiants',
    excerpt:
      "Comprenez l'IA, maîtrisez ChatGPT et les outils génératifs pour réussir vos études et vos projets.",
    description:
      "Cette formation s'adresse aux lycéens en terminale et aux étudiants du supérieur qui veulent intégrer l'IA dans leur quotidien académique. Pas de prérequis technique : on part de zéro pour vous rendre autonome avec les outils essentiels (ChatGPT, NotebookLM, outils de recherche IA, génération d'images). À la fin du parcours, vous savez utiliser l'IA comme un véritable assistant d'études, sans tomber dans les pièges classiques.",
    level: 'Débutant',
    duration: '4 semaines',
    price: null,
    format: 'Hybride',
    iconName: 'graduation-cap',
    highlight: 'Le plus populaire',
    audience: [
      'Lycéens en terminale',
      'Étudiants du supérieur (université, école)',
      'Personnes en reprise d\u2019études',
    ],
    prerequisites: [
      'Savoir utiliser un ordinateur et un navigateur web',
      'Une adresse email valide',
      'Aucune base technique requise',
    ],
    skills: [
      'Comprendre ce qu\u2019est l\u2019IA et comment elle fonctionne (sans entrer dans le code)',
      'Maîtriser ChatGPT pour la recherche, la rédaction et la révision',
      'Utiliser NotebookLM pour analyser ses cours et documents',
      'Générer des images et schémas pour ses présentations',
      'Identifier les biais et vérifier les sources',
    ],
    modules: [
      {
        title: "Qu'est-ce que l'IA ?",
        description:
          "Vulgarisation : LLM, génération d'images, agents. On démystifie le vocabulaire.",
      },
      {
        title: 'Maîtriser ChatGPT pour étudier',
        description:
          "L'art du prompt, la conversation longue, les GPT spécialisés. Cas d'usage : dissertations, fiches de révision, explication de cours.",
      },
      {
        title: 'Outils IA pour la recherche et la rédaction',
        description:
          'NotebookLM, Perplexity, outils de citation. Comment vérifier ce que l\u2019IA produit.',
      },
      {
        title: 'IA et créativité',
        description:
          'Génération d\u2019images et de schémas pour vos exposés et projets. Présentations dynamiques.',
      },
      {
        title: 'Éthique, biais et sources fiables',
        description:
          "Reconnaître les hallucinations, les biais culturels, savoir citer correctement l'IA.",
      },
      {
        title: 'Mini-projet de fin de formation',
        description:
          'Réalisez un dossier ou une présentation complète assistée par IA, avec un coaching individuel.',
      },
    ],
    nextSessions: ['2026-06-15', '2026-07-20'],
  },
  {
    slug: 'vibe-coding-avec-kiro',
    title: 'Vibe coding avec KIRO',
    excerpt:
      "Apprenez à créer des sites et applications en collaborant avec une IA, sans parcours de développeur.",
    description:
      "Le vibe coding, c'est une nouvelle façon de coder : vous décrivez ce que vous voulez, et un assistant IA (Kiro) écrit le code avec vous. Cette formation vous apprend à dialoguer efficacement avec l'IA pour construire de vrais projets — un site vitrine, une mini-app web, un outil interne — sans avoir suivi un cursus de développement classique. Vous repartez avec un projet déployé en ligne et une méthode reproductible.",
    level: 'Débutant',
    duration: '6 semaines',
    price: null,
    format: 'En ligne',
    iconName: 'sparkles',
    highlight: 'Nouveau',
    audience: [
      'Débutants curieux de coder sans prérequis',
      'Jeunes professionnels (marketing, gestion, communication)',
      'Entrepreneurs qui veulent prototyper leurs idées',
    ],
    prerequisites: [
      'À l\u2019aise avec un ordinateur et un navigateur',
      'Avoir déjà utilisé ChatGPT au moins une fois (idéalement)',
      'Aucune expérience de programmation requise',
    ],
    skills: [
      'Décrire un projet à une IA de façon précise et efficace',
      'Comprendre la structure d\u2019un projet web (sans devenir développeur)',
      'Construire un site vitrine moderne avec Kiro',
      'Itérer, déboguer et améliorer un projet généré par IA',
      'Déployer un projet en ligne (Vercel ou équivalent)',
    ],
    modules: [
      {
        title: 'Introduction au vibe coding et à Kiro',
        description:
          "Comprendre la philosophie : vous êtes le designer, l'IA est l'exécutant. Premier projet en 30 minutes.",
      },
      {
        title: 'Décrire un projet à une IA',
        description:
          "Les bases du SPEC : objectif, fonctionnalités, contraintes. Comment écrire un brief que l'IA comprend.",
      },
      {
        title: 'Construire un site vitrine avec Kiro',
        description:
          'De la page blanche au site déployé, étape par étape. Vous construisez un vrai site vitrine.',
      },
      {
        title: 'Construire une mini-app web',
        description:
          'On passe au niveau supérieur : un outil interactif (formulaire, base de données simple, tableau de bord).',
      },
      {
        title: 'Itérer, déboguer, comprendre le code',
        description:
          'Quand l\u2019IA se trompe : comment la guider, comment lire le code généré sans paniquer.',
      },
      {
        title: 'Déployer et maintenir son projet',
        description:
          "Mise en ligne via Vercel, gestion des modifications, retours d'utilisateurs.",
      },
      {
        title: 'Projet final accompagné',
        description:
          "Vous concevez et livrez un projet personnel avec l'aide d'un mentor.",
      },
    ],
    nextSessions: ['2026-06-08', '2026-08-03'],
  },
  {
    slug: 'design-ia',
    title: 'Design IA',
    excerpt:
      "Intégrez l'IA générative dans votre workflow créatif (visuels, identité, mockups, vidéo).",
    description:
      "Cette formation est conçue pour les designers, communicants, marketeurs et freelances créatifs qui veulent intégrer l'IA générative dans leur travail au quotidien. On y aborde les principaux outils visuels (Midjourney, DALL·E, Stable Diffusion, Canva AI), l'art du prompt visuel, la création d'identités de marque assistées et les workflows pro. Vous repartez avec un projet créatif complet et une méthode pour booster votre productivité de 3 à 5×.",
    level: 'Débutant',
    duration: '5 semaines',
    price: null,
    format: 'En ligne',
    iconName: 'palette',
    audience: [
      'Designers (graphiques, UI, identité)',
      'Communicants et chargés de marketing',
      'Freelances créatifs qui veulent gagner en productivité',
    ],
    prerequisites: [
      'Avoir une sensibilité créative ou un métier visuel',
      'Savoir utiliser un outil de design (Figma, Canva, Photoshop, etc.) — niveau basique suffit',
      'Aucune expérience IA préalable requise',
    ],
    skills: [
      'Comprendre les forces et limites des principaux générateurs d\u2019images',
      'Écrire des prompts visuels précis et reproductibles',
      'Créer des identités de marque assistées par IA',
      'Produire des maquettes et mockups en quelques minutes',
      'Maîtriser les bases de la vidéo et du motion design avec l\u2019IA',
    ],
    modules: [
      {
        title: "Panorama des outils d'IA visuelle",
        description:
          'Midjourney, DALL·E, Stable Diffusion, Canva AI, Adobe Firefly. Quel outil pour quel usage.',
      },
      {
        title: "L'art du prompt visuel",
        description:
          'Structure d\u2019un prompt réussi, vocabulaire visuel, gestion du style et de la cohérence.',
      },
      {
        title: 'Identité de marque assistée par IA',
        description:
          "De la moodboard au logo : générer, sélectionner, raffiner. Cas d'étude réel.",
      },
      {
        title: 'Maquettes et UI assistées',
        description:
          "Wireframes, mockups, illustrations d'interface. Intégration dans Figma.",
      },
      {
        title: 'Vidéo et motion design',
        description:
          "Génération de courtes vidéos, transitions, voix off. Outils RunwayML, Pika, ElevenLabs.",
      },
      {
        title: 'Workflow pro et droits d\u2019usage',
        description:
          "Licences, droits commerciaux, intégration dans un studio ou en freelance.",
      },
      {
        title: 'Projet créatif final',
        description:
          'Identité complète d\u2019une marque fictive, ou refonte d\u2019un projet personnel.',
      },
    ],
    nextSessions: ['2026-06-22', '2026-09-14'],
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const iconMap: Record<Formation['iconName'], LucideIcon> = {
  'graduation-cap': GraduationCap,
  sparkles: Sparkles,
  palette: Palette,
};

export function getFormationIcon(name: Formation['iconName']): LucideIcon {
  return iconMap[name];
}

export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug);
}

export function getAllFormationSlugs(): string[] {
  return formations.map((f) => f.slug);
}

/**
 * Lightweight preview type used by homepage cards.
 * Re-derived from the full dataset so the homepage stays in sync.
 */
export type FormationPreview = Pick<
  Formation,
  'slug' | 'title' | 'excerpt' | 'level' | 'duration' | 'format' | 'iconName' | 'highlight'
>;

export const featuredFormations: FormationPreview[] = formations.map((f) => ({
  slug: f.slug,
  title: f.title,
  excerpt: f.excerpt,
  level: f.level,
  duration: f.duration,
  format: f.format,
  iconName: f.iconName,
  highlight: f.highlight,
}));

/**
 * Format an MGA price with a thin space and the "Ar" suffix
 * (e.g. 350000 -> "350 000 Ar"). Returns "Sur devis" when null.
 */
export function formatPrice(price: number | null): string {
  if (price === null) return 'Sur devis';
  return `${new Intl.NumberFormat('fr-FR').format(price)} Ar`;
}
