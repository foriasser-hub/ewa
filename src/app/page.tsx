/**
 * Temporary landing page for Step 1.
 * Confirms that Next.js, Tailwind, the brand palette and fonts are wired up.
 * Will be replaced by the real homepage in Step 3.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-navy-800 text-white">
        <div className="container flex flex-col gap-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-200">
            AKADEMIA IA MADAGASIKARA
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Apprenez l&apos;IA, même en partant de zéro.
          </h1>
          <p className="max-w-2xl text-lg text-navy-100 md:text-xl">
            Le centre de formation à l&apos;Intelligence Artificielle pensé pour les étudiants, les
            jeunes pros et les créatifs malgaches.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-navy-800 shadow-card transition hover:bg-paper"
            >
              Voir les formations
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Étape 1 — Initialisation du projet</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Cette page est une page de validation. Elle confirme que la stack technique est en
            place : Next.js 14 (App Router), TypeScript, Tailwind CSS, ESLint et Prettier, avec la
            palette bleu marine et blanc.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Bleu marine 800', className: 'bg-navy-800 text-white', value: '#0A1F44' },
              { label: 'Bleu marine 700', className: 'bg-navy-700 text-white', value: '#102A56' },
              { label: 'Bleu marine 600', className: 'bg-navy-600 text-white', value: '#1E3A8A' },
              { label: 'Bleu marine 500', className: 'bg-navy-500 text-white', value: '#2D4A8A' },
              {
                label: 'Blanc cassé',
                className: 'bg-paper text-ink border border-navy-100',
                value: '#F7F9FC',
              },
              { label: 'Blanc', className: 'bg-white text-ink border border-navy-100', value: '#FFFFFF' },
            ].map((swatch) => (
              <div
                key={swatch.label}
                className={`rounded-2xl p-6 shadow-card ${swatch.className}`}
              >
                <p className="font-semibold">{swatch.label}</p>
                <p className="mt-1 text-sm opacity-80">{swatch.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-navy-100 bg-white">
        <div className="container py-6 text-sm text-muted">
          AKADEMIA IA MADAGASIKARA — squelette d&apos;initialisation (Étape 1).
        </div>
      </footer>
    </main>
  );
}
