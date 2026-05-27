import Link from 'next/link';
import { Check, Database, ExternalLink, FileCode, Mail, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

/**
 * Settings page. Read-only on purpose: the site configuration lives in code
 * (src/lib/site-config.ts and .env.local) for traceability via Git.
 *
 * Once a real database is wired up, mutable settings (smtp, branding...)
 * can move here.
 */
export default function ParametresPage() {
  const env = {
    resend: Boolean(process.env.RESEND_API_KEY),
    fromEmail: process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev',
    toEmail: process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url,
    adminPasswordSet: Boolean(process.env.ADMIN_PASSWORD),
    adminSecretSet: Boolean(process.env.ADMIN_SESSION_SECRET),
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          Paramètres
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Diagnostic de la configuration côté serveur. Les valeurs sensibles ne sont jamais
          affichées.
        </p>
      </header>

      {/* Identity */}
      <section className="rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 p-5">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-zinc-500" aria-hidden />
            <h3 className="font-semibold text-zinc-900">Identité du site</h3>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Modifiable dans{' '}
            <code className="rounded bg-zinc-100 px-1 py-0.5">src/lib/site-config.ts</code>
          </p>
        </div>
        <dl className="divide-y divide-zinc-100 text-sm">
          <Row label="Nom" value={siteConfig.name} />
          <Row label="URL publique" value={env.siteUrl} mono />
          <Row label="Email de contact" value={siteConfig.contact.email} mono />
          <Row label="Téléphone" value={siteConfig.contact.phone} mono />
          <Row label="Adresse" value={siteConfig.contact.address} />
        </dl>
      </section>

      {/* Email service */}
      <section className="rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 p-5">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-zinc-500" aria-hidden />
            <h3 className="font-semibold text-zinc-900">Service email (Resend)</h3>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Variables définies dans <code className="rounded bg-zinc-100 px-1 py-0.5">.env.local</code>{' '}
            (local) ou les variables d&apos;environnement Vercel (production).
          </p>
        </div>
        <dl className="divide-y divide-zinc-100 text-sm">
          <Row
            label="Clé API Resend"
            value={env.resend ? 'Configurée' : 'Manquante (mode mock)'}
            indicator={env.resend ? 'ok' : 'warn'}
          />
          <Row label="From" value={env.fromEmail} mono />
          <Row label="To (réception)" value={env.toEmail} mono />
        </dl>
      </section>

      {/* Admin */}
      <section className="rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 p-5">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-zinc-500" aria-hidden />
            <h3 className="font-semibold text-zinc-900">Back-office</h3>
          </div>
        </div>
        <dl className="divide-y divide-zinc-100 text-sm">
          <Row
            label="Mot de passe admin (ADMIN_PASSWORD)"
            value={env.adminPasswordSet ? 'Configuré' : 'Manquant'}
            indicator={env.adminPasswordSet ? 'ok' : 'err'}
          />
          <Row
            label="Secret de session (ADMIN_SESSION_SECRET)"
            value={env.adminSecretSet ? 'Configuré' : 'Manquant'}
            indicator={env.adminSecretSet ? 'ok' : 'err'}
          />
          <Row
            label="Persistance"
            value="Mémoire (mock V1) — données réinitialisées à chaque redémarrage"
            indicator="warn"
          />
        </dl>
      </section>

      <p className="text-xs text-zinc-500">
        Pour passer à une vraie base de données, branchez Prisma dans{' '}
        <code className="rounded bg-zinc-100 px-1 py-0.5">src/lib/admin/store.ts</code>. Les
        signatures publiques restent identiques — les pages CRUD continueront de fonctionner.{' '}
        <Link
          href="https://www.prisma.io/docs"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-zinc-700 underline"
        >
          Doc Prisma <ExternalLink className="h-3 w-3" aria-hidden />
        </Link>
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  indicator,
}: {
  label: string;
  value: string;
  mono?: boolean;
  indicator?: 'ok' | 'warn' | 'err';
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3">
      <dt className="text-zinc-500">{label}</dt>
      <dd
        className={`flex items-center gap-2 text-right ${mono ? 'font-mono text-xs' : ''}`}
      >
        {indicator === 'ok' ? <Check className="h-4 w-4 text-emerald-600" aria-hidden /> : null}
        {indicator === 'warn' ? <Check className="h-4 w-4 text-amber-600" aria-hidden /> : null}
        {indicator === 'err' ? <X className="h-4 w-4 text-red-600" aria-hidden /> : null}
        <span className="text-zinc-900">{value}</span>
      </dd>
    </div>
  );
}
