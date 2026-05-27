import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/sections/contact/contact-form';
import { ContactHero } from '@/components/sections/contact/contact-hero';
import { ContactInfo } from '@/components/sections/contact/contact-info';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez AKADEMIA IA MADAGASIKARA pour vous renseigner sur nos formations IA ou demander un entretien. Réponse sous 48 heures ouvrées.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="container py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,360px)]">
          {/* The form is a client component that reads ?formation=... — wrap in Suspense
              so Next can stream around the search-params hook. */}
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
