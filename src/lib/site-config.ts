/**
 * Site-wide configuration: brand info and primary navigation.
 * Centralised so Header, Footer and metadata stay in sync.
 */
export const siteConfig = {
  name: 'Académie IA Africaine',
  shortName: 'Académie IA',
  description:
    "Centre de formation à l'Intelligence Artificielle pour débutants en Afrique francophone. Basé à Antananarivo, ouvert à toute l'Afrique.",
  url: 'https://academie-ia-africaine.com',
  contact: {
    email: 'contact@academie-ia-africaine.com',
    phone: '+261 00 000 00 00',
    address: 'Antananarivo, Madagascar',
  },
  socials: {
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Formations', href: '/formations' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const legalNav: NavItem[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
];
