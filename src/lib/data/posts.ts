export type PostPreview = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  readingTime: number; // minutes
};

export const latestPosts: PostPreview[] = [
  {
    slug: 'demarrer-avec-chatgpt-en-2026',
    title: 'Démarrer avec ChatGPT en 2026 : le guide pour étudiants',
    excerpt:
      "Comment utiliser ChatGPT pour vos études sans tomber dans les pièges ? Méthode, prompts, vérification des sources.",
    category: 'Guide',
    publishedAt: '2026-05-12',
    readingTime: 7,
  },
  {
    slug: 'vibe-coding-cest-quoi',
    title: 'Le vibe coding, c\u2019est quoi exactement ?',
    excerpt:
      "Une nouvelle façon de programmer en duo avec une IA. On démystifie le terme et on montre un projet concret.",
    category: 'Tendances',
    publishedAt: '2026-04-28',
    readingTime: 5,
  },
  {
    slug: 'midjourney-vs-dalle-vs-stable-diffusion',
    title: 'Midjourney, DALL·E, Stable Diffusion : lequel choisir ?',
    excerpt:
      'Comparaison honnête de 3 générateurs d\u2019images IA pour les designers et les communicants malgaches.',
    category: 'Outils',
    publishedAt: '2026-04-10',
    readingTime: 9,
  },
];
