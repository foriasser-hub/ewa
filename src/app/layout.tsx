import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
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

export const metadata: Metadata = {
  title: {
    default: 'AKADEMIA IA MADAGASIKARA — Centre de formation IA pour débutants',
    template: '%s | AKADEMIA IA MADAGASIKARA',
  },
  description:
    "Apprenez l'Intelligence Artificielle, même en partant de zéro. Formations pour étudiants, jeunes pros et créatifs à Madagascar.",
  metadataBase: new URL('https://akademia-ia.mg'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'AKADEMIA IA MADAGASIKARA',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A1F44',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
