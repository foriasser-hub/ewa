import Link from 'next/link';
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Logo } from '@/components/site/logo';
import { legalNav, mainNav, siteConfig } from '@/lib/site-config';

/**
 * Site footer.
 * Three columns on desktop:
 *  - Brand block (logo + tagline + socials)
 *  - Sitemap (main nav)
 *  - Contact info
 * Bottom bar: copyright + legal links.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-navy-800 text-navy-100">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm text-navy-100/80">
            Centre de formation à l&apos;Intelligence Artificielle pour débutants. Apprenez l&apos;IA
            à votre rythme, en français — depuis Madagascar, ouvert à toute l&apos;Afrique.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={siteConfig.socials.facebook}
              aria-label="Facebook"
              className="rounded-full p-2 text-navy-100 transition hover:bg-white/10 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              aria-label="LinkedIn"
              className="rounded-full p-2 text-navy-100 transition hover:bg-white/10 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.socials.youtube}
              aria-label="YouTube"
              className="rounded-full p-2 text-navy-100 transition hover:bg-white/10 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Plan du site
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-navy-100/80 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2 text-navy-100/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-start gap-2 text-navy-100/80">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-navy-100/80">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="hover:text-white"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-5 text-xs text-navy-100/70 md:flex-row md:items-center">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
