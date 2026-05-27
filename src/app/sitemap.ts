import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { formations } from '@/lib/data/formations';
import { getAllPosts } from '@/lib/data/posts';

const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || siteConfig.url
).replace(/\/$/, '');

/**
 * Dynamic sitemap.xml
 * Includes:
 *  - all static public pages with sensible priorities
 *  - every formation under /formations/[slug]
 *  - every blog post with the real publishedAt as lastModified
 *
 * /admin/* and /api/* are intentionally excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { path: '', priority: 1, freq: 'weekly' as const },
    { path: '/a-propos', priority: 0.8, freq: 'monthly' as const },
    { path: '/formations', priority: 0.9, freq: 'weekly' as const },
    { path: '/blog', priority: 0.8, freq: 'weekly' as const },
    { path: '/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/contact', priority: 0.7, freq: 'yearly' as const },
    { path: '/mentions-legales', priority: 0.2, freq: 'yearly' as const },
    { path: '/politique-confidentialite', priority: 0.2, freq: 'yearly' as const },
  ].map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  const formationsEntries: MetadataRoute.Sitemap = formations.map((f) => ({
    url: `${BASE}/formations/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const postsEntries: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    // Use the article's publishedAt — search engines like accurate timestamps.
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...formationsEntries, ...postsEntries];
}
