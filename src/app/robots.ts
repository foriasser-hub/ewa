import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * robots.txt
 * Allows all crawlers, references the sitemap.
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
