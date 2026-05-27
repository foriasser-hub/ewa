'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, LockKeyhole, Sparkles } from 'lucide-react';

/**
 * /admin/login — single-password sign-in page.
 *
 * Lives outside the (panel) route group, so it does NOT render the sidebar.
 * On success: redirects to the `next` query parameter, or /admin by default.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const nextPath = params.get('next') || '/admin';

  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Erreur d\u2019authentification.');
        setStatus('error');
        return;
      }
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau.');
      setStatus('error');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-800 text-white">
            <Sparkles className="h-4 w-4" aria-hidden />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-zinc-900">Akademia IA</p>
            <p className="text-[11px] uppercase tracking-wider text-zinc-500">
              Back-office
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="font-display text-xl font-bold text-zinc-900">Connexion</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Entrez le mot de passe administrateur pour accéder au back-office.
          </p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-zinc-700">
                Mot de passe
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 focus-within:border-zinc-400">
                <LockKeyhole className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'submitting' || !password}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          Accès réservé aux administrateurs d&apos;AKADEMIA IA MADAGASIKARA.
        </p>
      </div>
    </main>
  );
}
