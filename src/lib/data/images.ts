/**
 * Image catalogue.
 *
 * V1 uses Unsplash hot-linking via the official CDN (free, royalty-free,
 * no attribution required when used inline like this). Replace with your
 * own photos by dropping files in /public/images/ and pointing to them.
 *
 * The `?w=...&q=80&fit=crop&auto=format` query string is part of Unsplash's
 * public CDN and lets us request the exact size and format we need.
 */

const UNSPLASH = 'https://images.unsplash.com';

function unsplash(id: string, w = 1200, h?: number) {
  const size = h ? `&h=${h}` : '';
  return `${UNSPLASH}/${id}?w=${w}${size}&q=80&fit=crop&auto=format`;
}

/* -------------------------------------------------------------------------- */
/* Hero & generic                                                             */
/* -------------------------------------------------------------------------- */

export const images = {
  // Diverse young learners around a laptop — fits "AI for everyone".
  heroPrimary: unsplash('photo-1522071820081-009f0129c71c', 1400, 1100),
  // Backup / about: a single focused student/young pro.
  aboutHero: unsplash('photo-1523240795612-9a054b0db644', 1600, 900),
  // Restaurant / hospitality (Le Paradissier).
  paradissier: unsplash('photo-1517248135467-4c7edcad34c4', 1200, 900),

  /* ------------------------------ Formations ----------------------------- */
  formations: {
    'ia-pour-etudiants': unsplash('photo-1523240795612-9a054b0db644', 800, 600),
    'vibe-coding-avec-kiro': unsplash('photo-1517694712202-14dd9538aa97', 800, 600),
    'design-ia': unsplash('photo-1561070791-2526d30994b8', 800, 600),
  } as Record<string, string>,

  /* ------------------------------ Blog covers ---------------------------- */
  posts: {
    'demarrer-avec-chatgpt-en-2026': unsplash('photo-1620712943543-bcc4688e7485', 800, 500),
    'vibe-coding-cest-quoi': unsplash('photo-1555066931-4365d14bab8c', 800, 500),
    'midjourney-vs-dalle-vs-stable-diffusion': unsplash('photo-1547658719-da2b51169166', 800, 500),
  } as Record<string, string>,

  /* ------------------------------ Testimonials --------------------------- */
  // Headshots, square crop, 240px is enough for a 96px circle on screen.
  testimonials: {
    'Tahina R.': unsplash('photo-1573497019940-1c28c88b4f3e', 240, 240),
    'Hery A.': unsplash('photo-1500648767791-00dcc994a43e', 240, 240),
    'Mialy N.': unsplash('photo-1531123897727-8f129e1688ce', 240, 240),
  } as Record<string, string>,
};

/** Safe lookup that falls back to a generic illustration. */
export function imageFor(category: 'formations' | 'posts' | 'testimonials', key: string) {
  return images[category][key] ?? images.heroPrimary;
}
