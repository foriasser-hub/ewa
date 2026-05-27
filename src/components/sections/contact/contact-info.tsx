import { Clock, Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

/**
 * Contact details + social links + opening hours.
 * Sits next to the form on desktop, stacks above on mobile.
 */
export function ContactInfo() {
  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-navy-800">Nos coordonnées</h2>
        <ul className="mt-4 space-y-4 text-sm text-ink/85">
          <li className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <MapPin className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-navy-800">Adresse</p>
              <p className="mt-0.5 text-muted">{siteConfig.contact.address}</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <Mail className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-navy-800">Email</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-0.5 inline-block text-navy-700 underline-offset-2 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <Phone className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-navy-800">Téléphone</p>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="mt-0.5 inline-block text-navy-700 underline-offset-2 hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <Clock className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-navy-800">Horaires</p>
              <p className="mt-0.5 text-muted">Lundi &mdash; Vendredi, 9 h &mdash; 18 h</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-navy-800">Suivez-nous</h2>
        <div className="mt-4 flex items-center gap-2">
          <SocialLink href={siteConfig.socials.facebook} label="Facebook" Icon={Facebook} />
          <SocialLink href={siteConfig.socials.linkedin} label="LinkedIn" Icon={Linkedin} />
          <SocialLink href={siteConfig.socials.youtube} label="YouTube" Icon={Youtube} />
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-paper p-6">
        <p className="text-sm text-ink/85">
          Nous répondons généralement sous{' '}
          <span className="font-semibold text-navy-800">48 heures ouvrées</span>.
        </p>
      </div>
    </aside>
  );
}

function SocialLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition hover:bg-navy-100"
    >
      <Icon className="h-4 w-4" aria-hidden />
    </a>
  );
}
