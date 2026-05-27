import Link from 'next/link';
import { ArrowRight, GraduationCap, Sparkles, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Step 2 — Design system preview page.
 * This page is intentionally NOT the final homepage.
 * It exists to validate the brand layout (Header + Footer)
 * and showcase the reusable UI primitives (Button, Card, Badge).
 * It will be replaced by the real homepage in Step 3.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero (placeholder for Step 3) */}
      <section className="bg-navy-800 text-white">
        <div className="container flex flex-col gap-6 py-20 md:py-28">
          <Badge variant="solid" className="w-fit bg-white text-navy-800">
            Étape 2 · Design system
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Apprenez l&apos;IA, même en partant de zéro.
          </h1>
          <p className="max-w-2xl text-lg text-navy-100 md:text-xl">
            Le centre de formation à l&apos;Intelligence Artificielle pensé pour les étudiants, les
            jeunes pros et les créatifs malgaches.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="secondary" size="lg">
              <Link href="/formations">
                Voir les formations
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Design system preview */}
      <section className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-600">
            Design system
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Composants de base prêts à l&apos;emploi
          </h2>
          <p className="mt-3 text-muted">
            Cette page est temporaire : elle valide le layout global (header sticky, footer riche)
            et présente les composants réutilisables. La vraie page d&apos;accueil arrivera à
            l&apos;étape 3.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold">Boutons</h3>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button>Action principale</Button>
            <Button variant="secondary">Action secondaire</Button>
            <Button variant="outline">Contour</Button>
            <Button variant="ghost">Discret</Button>
            <Button variant="link">Lien</Button>
            <Button size="sm">Petit</Button>
            <Button size="lg">Grand</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold">Badges</h3>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge>Débutant</Badge>
            <Badge variant="solid">Nouveau</Badge>
            <Badge variant="outline">Hybride</Badge>
            <Badge variant="gold">Populaire</Badge>
          </div>
        </div>

        {/* Cards (preview of formation cards) */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold">Cartes de formation (aperçu)</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'IA pour étudiants',
                description:
                  "Comprenez l'IA et tirez parti de ChatGPT pour vos études et vos projets.",
                icon: GraduationCap,
              },
              {
                title: 'Vibe coding avec KIRO',
                description:
                  'Créez des sites et applications en collaborant avec une IA, sans parcours dev classique.',
                icon: Sparkles,
              },
              {
                title: 'Design IA',
                description:
                  "Intégrez l'IA générative dans votre workflow créatif (visuels, identité, mockups).",
                icon: Users,
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <CardTitle className="mt-2">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge>Débutant</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Palette */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold">Palette</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: 'navy-800', cls: 'bg-navy-800 text-white', hex: '#0A1F44' },
              { label: 'navy-700', cls: 'bg-navy-700 text-white', hex: '#102A56' },
              { label: 'navy-600', cls: 'bg-navy-600 text-white', hex: '#1E3A8A' },
              { label: 'navy-500', cls: 'bg-navy-500 text-white', hex: '#2D4A8A' },
              {
                label: 'paper',
                cls: 'bg-paper text-ink border border-navy-100',
                hex: '#F7F9FC',
              },
              {
                label: 'white',
                cls: 'bg-white text-ink border border-navy-100',
                hex: '#FFFFFF',
              },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl p-4 shadow-card ${s.cls}`}>
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="mt-1 text-xs opacity-80">{s.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
