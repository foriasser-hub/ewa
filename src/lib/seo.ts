import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Centralised SEO helpers.
 *
 * Static-export edition: no dynamic OG image. Pages can still pass an
 * explicit ogImage URL (e.g. /og.png from /public) if they want a
 * custom share preview.
 */

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  ogImage?: string;
  type?: 'website' | 'article';
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
  const image = ogImage ? absolute(ogImage) : undefined;

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
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: fullTitle }] }
        : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
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

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: PUBLIC_URL,
    inLanguage: 'fr-MG',
    publisher: { '@type': 'Organization', name: siteConfig.name },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${PUBLIC_URL}/blog?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: PUBLIC_URL,
    description: siteConfig.description,
    logo: `${PUBLIC_URL}/icon.svg`,
    inLanguage: 'fr-MG',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Antananarivo',
      addressCountry: 'MG',
      streetAddress: siteConfig.contact.address,
    },
    areaServed: { '@type': 'Country', name: 'Madagascar' },
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

export function jsonLd(payload: object) {
  return { __html: JSON.stringify(payload) };
}
