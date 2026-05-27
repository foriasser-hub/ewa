import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getAllFormationSlugs } from '@/lib/data/formations';
import { getAllPostSlugs } from '@/lib/data/posts';

/**
 * Dynamic sitemap.xml
 * Automatically includes all static pages, formations and blog posts.
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    '',
    '/a-propos',
    '/formations',
    '/blog',
    '/faq',
    '/contact',
    '/mentions-legales',
    '/politique-confidentialite',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const formations = getAllFormationSlugs().map((slug) => ({
    url: `${baseUrl}/formations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const posts = getAllPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...formations, ...posts];
}
