import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Centralised SEO helpers.
 *
 * Why: page-level metadata is repetitive (title, description, OG, Twitter,
 * canonical, locale). This module produces a consistent shape across the site
 * so we never forget a tag and never have to update them in multiple places.
 *
 * Usage:
 *
 *   export const metadata = buildMetadata({
 *     title: 'À propos',
 *     description: 'Notre mission, nos valeurs...',
 *     path: '/a-propos',
 *   });
 */

export type SeoInput = {
  /** Page title (without site name suffix). */
  title: string;
  /** Meta description, ~155 chars max. */
  description: string;
  /** Path relative to the site root, e.g. "/a-propos". */
  path: string;
  /** ISO date for article OG metadata. */
  publishedTime?: string;
  /** Optional override for the OG image (defaults to /opengraph-image). */
  ogImage?: string;
  /** Optional override for the OG type (defaults to 'website'). */
  type?: 'website' | 'article';
  /** When set to true, asks crawlers not to index this page. */
  noindex?: boolean;
};

const PUBLIC_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  siteConfig.url.replace(/\/$/, '');

function absolute(path: string) {
  if (path.startsWith('http')) return path;
  return `${PUBLIC_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  publishedTime,
  ogImage,
  type = 'website',
  noindex,
}: SeoInput): Metadata {
  const url = absolute(path);
  const fullTitle = `${title} | ${siteConfig.name}`;
  const image = ogImage ? absolute(ogImage) : `${PUBLIC_URL}/opengraph-image`;

  return {
    title,
    description,
    metadataBase: new URL(PUBLIC_URL),
    alternates: {
      canonical: url,
      languages: { 'fr-MG': url },
    },
    openGraph: {
      type,
      locale: 'fr_FR',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}

/* -------------------------------------------------------------------------- */
/* Schema.org helpers                                                         */
/* -------------------------------------------------------------------------- */

/**
 * BreadcrumbList JSON-LD payload.
 * @example
 *   breadcrumbsJsonLd([
 *     { name: 'Accueil', path: '/' },
 *     { name: 'Formations', path: '/formations' },
 *     { name: 'IA pour étudiants', path: '/formations/ia-pour-etudiants' },
 *   ])
 */
export function breadcrumbsJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

/**
 * WebSite JSON-LD with optional SearchAction so Google can show a sitelinks
 * search box. Hooked to /blog?query=... — no actual server-side search yet,
 * but the schema is valid and forward-compatible.
 */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: PUBLIC_URL,
    inLanguage: 'fr-MG',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${PUBLIC_URL}/blog?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * EducationalOrganization JSON-LD with full contact details.
 * Replaces the simpler version that used to live in app/layout.tsx.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: PUBLIC_URL,
    description: siteConfig.description,
    logo: `${PUBLIC_URL}/icon.svg`,
    image: `${PUBLIC_URL}/opengraph-image`,
    inLanguage: 'fr-MG',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Antananarivo',
      addressCountry: 'MG',
      streetAddress: siteConfig.contact.address,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Madagascar',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      availableLanguage: ['fr', 'mg'],
    },
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.linkedin,
      siteConfig.socials.youtube,
    ],
  };
}

/**
 * Convenience for inline JSON-LD blocks.
 * Use as: <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(payload)} />
 */
export function jsonLd(payload: object) {
  return { __html: JSON.stringify(payload) };
}
