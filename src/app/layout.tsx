import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { CookieBanner } from '@/components/site/cookie-banner';
import { siteConfig } from '@/lib/site-config';
import { jsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const PUBLIC_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Centre de formation IA pour débutants à Madagascar`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'formation IA',
    'intelligence artificielle',
    'Madagascar',
    'Antananarivo',
    'ChatGPT',
    'vibe coding',
    'design IA',
    'apprendre IA',
    'formation débutant',
  ],
  authors: [{ name: siteConfig.name, url: PUBLIC_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(PUBLIC_URL),
  applicationName: siteConfig.name,
  category: 'education',
  alternates: {
    canonical: PUBLIC_URL,
    languages: { 'fr-MG': PUBLIC_URL },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: PUBLIC_URL,
    title: `${siteConfig.name} — Centre de formation IA pour débutants`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} — Centre de formation IA pour débutants`,
    description: siteConfig.description,
  },
  robots: {
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
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: '#0A1F44',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-MG" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Global structured data — Organization + WebSite (with SearchAction) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={jsonLd(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={jsonLd(websiteJsonLd())}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
