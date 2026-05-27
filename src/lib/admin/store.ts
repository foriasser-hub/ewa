import 'server-only';
import { faqItems as seedFaq } from '@/lib/data/faq';
import { formations as seedFormations } from '@/lib/data/formations';
import { testimonials as seedTestimonials } from '@/lib/data/testimonials';
import { getAllPosts } from '@/lib/data/posts';

/**
 * In-memory admin store.
 *
 * V1 implementation: a singleton kept in `globalThis` so it survives across
 * hot-reloads and across requests within the same Node process.
 *
 * NOTE: this resets on every server restart and on every Vercel deployment.
 * To persist data across deployments, swap this module for a Prisma client
 * (or any other DB) — the rest of the admin codebase only depends on
 * the function signatures exported here.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type AdminFormation = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  format: 'Présentiel' | 'En ligne' | 'Hybride';
  price: number | null;
  published: boolean;
  updatedAt: string;
};

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  published: boolean;
  updatedAt: string;
};

export type AdminFaq = {
  id: string;
  category: 'Inscription' | 'Pédagogie' | 'Tarifs & financement';
  question: string;
  answer: string;
  order: number;
  updatedAt: string;
};

export type AdminTestimonial = {
  id: string;
  name: string;
  role: string;
  formation: string;
  initials: string;
  quote: string;
  published: boolean;
  updatedAt: string;
};

export type AdminMessageStatus = 'unread' | 'read' | 'archived';

export type AdminMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  formation: string;
  message: string;
  status: AdminMessageStatus;
  createdAt: string;
};

/* -------------------------------------------------------------------------- */
/* Singleton store                                                            */
/* -------------------------------------------------------------------------- */

type Store = {
  formations: Map<string, AdminFormation>;
  posts: Map<string, AdminPost>;
  faq: Map<string, AdminFaq>;
  testimonials: Map<string, AdminTestimonial>;
  messages: Map<string, AdminMessage>;
};

const GLOBAL_KEY = '__akademia_admin_store__';
const globalAny = globalThis as unknown as { [GLOBAL_KEY]?: Store };

function makeId(prefix: string): string {
  // 8 random hex chars is plenty for an in-memory store.
  return `${prefix}_${Math.random().toString(16).slice(2, 10)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function seedStore(): Store {
  const formations = new Map<string, AdminFormation>();
  seedFormations.forEach((f) => {
    const id = makeId('frm');
    formations.set(id, {
      id,
      slug: f.slug,
      title: f.title,
      excerpt: f.excerpt,
      level: f.level,
      duration: f.duration,
      format: f.format,
      price: f.price,
      published: true,
      updatedAt: nowIso(),
    });
  });

  const posts = new Map<string, AdminPost>();
  getAllPosts().forEach((p) => {
    const id = makeId('pst');
    posts.set(id, {
      id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      publishedAt: p.publishedAt,
      readingTime: p.readingTime,
      published: true,
      updatedAt: nowIso(),
    });
  });

  const faq = new Map<string, AdminFaq>();
  seedFaq.forEach((q, i) => {
    const id = makeId('faq');
    faq.set(id, {
      id,
      category: q.category,
      question: q.question,
      answer: q.answer,
      order: i,
      updatedAt: nowIso(),
    });
  });

  const testimonials = new Map<string, AdminTestimonial>();
  seedTestimonials.forEach((t) => {
    const id = makeId('tst');
    testimonials.set(id, {
      id,
      name: t.name,
      role: t.role,
      formation: t.formation,
      initials: t.initials,
      quote: t.quote,
      published: true,
      updatedAt: nowIso(),
    });
  });

  // Seed a few example contact messages so the dashboard charts have data.
  const messages = new Map<string, AdminMessage>();
  const seedMessages: Omit<AdminMessage, 'id'>[] = [
    {
      firstName: 'Tahina',
      lastName: 'Rakoto',
      email: 'tahina.r@example.com',
      phone: '+261 34 00 00 00',
      subject: 'info-formation',
      formation: 'ia-pour-etudiants',
      message:
        "Bonjour, je suis étudiante en deuxième année. Pourriez-vous me donner plus d'informations sur la formation IA pour étudiants ? Merci.",
      status: 'unread',
      createdAt: daysAgo(1),
    },
    {
      firstName: 'Hery',
      lastName: 'Andriam.',
      email: 'hery@example.com',
      phone: '',
      subject: 'inscription',
      formation: 'vibe-coding-avec-kiro',
      message:
        "Je voudrais m'inscrire à la prochaine session de Vibe Coding. Quelle est la procédure ?",
      status: 'read',
      createdAt: daysAgo(3),
    },
    {
      firstName: 'Mialy',
      lastName: 'Rasoa',
      email: 'mialy@example.com',
      phone: '+261 32 11 22 33',
      subject: 'entretien',
      formation: 'design-ia',
      message:
        "Bonjour, je suis designer freelance et j'aimerais discuter de la formation Design IA avant de m'engager. Auriez-vous un créneau cette semaine ?",
      status: 'unread',
      createdAt: daysAgo(5),
    },
    {
      firstName: 'Olivier',
      lastName: 'Rabe',
      email: 'olivier@example.com',
      phone: '',
      subject: 'partenariat',
      formation: '',
      message:
        "Je dirige une PME locale et je serais intéressé par une formation sur mesure pour mes équipes. Pouvons-nous échanger ?",
      status: 'read',
      createdAt: daysAgo(8),
    },
    {
      firstName: 'Noro',
      lastName: 'Voahangy',
      email: 'noro@example.com',
      phone: '',
      subject: 'autre',
      formation: '',
      message:
        "J'ai vu votre site, c'est très clair, bravo. Une simple question : avez-vous des sessions le week-end ?",
      status: 'archived',
      createdAt: daysAgo(12),
    },
  ];
  seedMessages.forEach((m) => {
    const id = makeId('msg');
    messages.set(id, { id, ...m });
  });

  return { formations, posts, faq, testimonials, messages };
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function getStore(): Store {
  if (!globalAny[GLOBAL_KEY]) {
    globalAny[GLOBAL_KEY] = seedStore();
  }
  return globalAny[GLOBAL_KEY]!;
}

/* -------------------------------------------------------------------------- */
/* Generic helpers                                                            */
/* -------------------------------------------------------------------------- */

function listMap<T extends { id: string }>(map: Map<string, T>): T[] {
  return Array.from(map.values());
}

/* -------------------------------------------------------------------------- */
/* Public API — Formations                                                    */
/* -------------------------------------------------------------------------- */

export const adminFormations = {
  list: () => listMap(getStore().formations),
  get: (id: string) => getStore().formations.get(id) ?? null,
  create(input: Omit<AdminFormation, 'id' | 'updatedAt'>): AdminFormation {
    const id = makeId('frm');
    const row: AdminFormation = { id, ...input, updatedAt: nowIso() };
    getStore().formations.set(id, row);
    return row;
  },
  update(id: string, patch: Partial<Omit<AdminFormation, 'id'>>): AdminFormation | null {
    const current = getStore().formations.get(id);
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: nowIso() };
    getStore().formations.set(id, next);
    return next;
  },
  remove(id: string) {
    return getStore().formations.delete(id);
  },
};

/* -------------------------------------------------------------------------- */
/* Public API — Posts                                                         */
/* -------------------------------------------------------------------------- */

export const adminPosts = {
  list: () => listMap(getStore().posts),
  get: (id: string) => getStore().posts.get(id) ?? null,
  create(input: Omit<AdminPost, 'id' | 'updatedAt'>): AdminPost {
    const id = makeId('pst');
    const row: AdminPost = { id, ...input, updatedAt: nowIso() };
    getStore().posts.set(id, row);
    return row;
  },
  update(id: string, patch: Partial<Omit<AdminPost, 'id'>>): AdminPost | null {
    const current = getStore().posts.get(id);
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: nowIso() };
    getStore().posts.set(id, next);
    return next;
  },
  remove(id: string) {
    return getStore().posts.delete(id);
  },
};

/* -------------------------------------------------------------------------- */
/* Public API — FAQ                                                           */
/* -------------------------------------------------------------------------- */

export const adminFaq = {
  list: () => listMap(getStore().faq).sort((a, b) => a.order - b.order),
  get: (id: string) => getStore().faq.get(id) ?? null,
  create(input: Omit<AdminFaq, 'id' | 'updatedAt'>): AdminFaq {
    const id = makeId('faq');
    const row: AdminFaq = { id, ...input, updatedAt: nowIso() };
    getStore().faq.set(id, row);
    return row;
  },
  update(id: string, patch: Partial<Omit<AdminFaq, 'id'>>): AdminFaq | null {
    const current = getStore().faq.get(id);
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: nowIso() };
    getStore().faq.set(id, next);
    return next;
  },
  remove(id: string) {
    return getStore().faq.delete(id);
  },
};

/* -------------------------------------------------------------------------- */
/* Public API — Testimonials                                                  */
/* -------------------------------------------------------------------------- */

export const adminTestimonials = {
  list: () => listMap(getStore().testimonials),
  get: (id: string) => getStore().testimonials.get(id) ?? null,
  create(input: Omit<AdminTestimonial, 'id' | 'updatedAt'>): AdminTestimonial {
    const id = makeId('tst');
    const row: AdminTestimonial = { id, ...input, updatedAt: nowIso() };
    getStore().testimonials.set(id, row);
    return row;
  },
  update(
    id: string,
    patch: Partial<Omit<AdminTestimonial, 'id'>>,
  ): AdminTestimonial | null {
    const current = getStore().testimonials.get(id);
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: nowIso() };
    getStore().testimonials.set(id, next);
    return next;
  },
  remove(id: string) {
    return getStore().testimonials.delete(id);
  },
};

/* -------------------------------------------------------------------------- */
/* Public API — Messages                                                      */
/* -------------------------------------------------------------------------- */

export const adminMessages = {
  list: () =>
    listMap(getStore().messages).sort(
      (a, b) => (a.createdAt < b.createdAt ? 1 : -1),
    ),
  get: (id: string) => getStore().messages.get(id) ?? null,
  create(input: Omit<AdminMessage, 'id' | 'createdAt' | 'status'>): AdminMessage {
    const id = makeId('msg');
    const row: AdminMessage = {
      id,
      status: 'unread',
      createdAt: nowIso(),
      ...input,
    };
    getStore().messages.set(id, row);
    return row;
  },
  setStatus(id: string, status: AdminMessageStatus): AdminMessage | null {
    const current = getStore().messages.get(id);
    if (!current) return null;
    const next = { ...current, status };
    getStore().messages.set(id, next);
    return next;
  },
  remove(id: string) {
    return getStore().messages.delete(id);
  },
};
