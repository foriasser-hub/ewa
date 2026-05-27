'use client';

import * as React from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'akademia-cookies-accepted';

/**
 * Lightweight cookie consent banner.
 *
 * This site doesn't use tracking cookies in V1, but the banner
 * is legally required in many jurisdictions to inform users.
 * The banner only appears once; once dismissed, the choice is
 * persisted in localStorage.
 *
 * When real analytics are added (V2), this component should be
 * upgraded to support granular consent (analytics / marketing).
 */
export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // Only show if user hasn't already accepted.
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Bandeau cookies"
      className="fixed inset-x-0 bottom-0 z-50 animate-slide-up border-t border-navy-100 bg-white p-4 shadow-card md:px-6"
    >
      <div className="container flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
          <p className="text-sm text-ink/85">
            Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.
            Aucun cookie de tracking n&apos;est déposé sans votre consentement.{' '}
            <a
              href="/politique-confidentialite"
              className="font-medium text-navy-700 underline underline-offset-2 hover:text-navy-800"
            >
              En savoir plus
            </a>
            .
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" onClick={accept}>
            Compris
          </Button>
          <button
            type="button"
            aria-label="Fermer"
            onClick={accept}
            className="rounded-lg p-2 text-muted transition hover:bg-navy-50 hover:text-navy-800"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
