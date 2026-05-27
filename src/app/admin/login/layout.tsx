import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion admin',
  robots: { index: false, follow: false },
};

/**
 * Login layout — intentionally bare so the public Header/Footer
 * (declared in the root layout) don't appear behind the sign-in card.
 *
 * The root layout still wraps everything; we just override the body
 * markup by rendering a fullscreen `<main>` from the page.
 */
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
