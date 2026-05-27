import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Web app manifest. Light PWA-readiness:
 * tells browsers and Lighthouse the site has a brand identity, an icon
 * and a preferred theme color.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F9FC',
    theme_color: '#0A1F44',
    lang: 'fr-MG',
    dir: 'ltr',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      {
        src: '/apple-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
