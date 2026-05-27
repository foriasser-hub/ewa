import Link from 'next/link';
import { ArrowRight, Sparkles, Bot, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * Homepage hero.
 * Two-column layout on desktop, stacked on mobile.
 * Right column shows a stylised "AI chat" mock to evoke the topic
 * without relying on photographic assets.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      {/* Decorative background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse at top right, black 0%, black 40%, transparent 75%)',
        }}
      />
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[460px] w-[460px] rounded-full bg-navy-500/30 blur-3xl"
      />

      <div className="container relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col gap-6">
          <Badge variant="solid" className="w-fit gap-1.5 bg-white text-navy-800">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Nouveau · Promo de lancement
          </Badge>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Apprenez l&apos;IA à Madagascar,
            <br />
            <span className="text-navy-100">même en partant de zéro.</span>
          </h1>
          <p className="max-w-xl text-lg text-navy-100 md:text-xl">
            AKADEMIA IA MADAGASIKARA forme les étudiants, les jeunes professionnels et les
            créatifs à utiliser concrètement l&apos;Intelligence Artificielle. Sans jargon, avec
            des projets pratiques.
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

          {/* Inline reassurance */}
          <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm text-navy-100/90">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              Présentiel à Antananarivo
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              Cours en ligne accessibles partout
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              Petits groupes
            </li>
          </ul>
        </div>

        {/* Right: stylised AI conversation mock */}
        <div className="relative hidden md:block">
          <ChatMock />
        </div>
      </div>
    </section>
  );
}

function ChatMock() {
  return (
    <div className="relative">
      {/* Floating decorative card */}
      <div
        aria-hidden
        className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-2xl bg-gradient-to-br from-navy-500/40 to-navy-700/40 blur-md md:block"
      />
      <div
        role="img"
        aria-label="Aperçu d'une conversation avec une IA"
        className="relative rounded-2xl border border-white/10 bg-navy-900/60 p-6 shadow-card backdrop-blur"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-navy-100">
            <Bot className="h-4 w-4" aria-hidden />
            Assistant IA
          </div>
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/60" />
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-white text-navy-800 px-4 py-2.5 font-medium">
              Comment je commence à apprendre l&apos;IA ?
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-600 text-white">
              <Sparkles className="h-4 w-4" aria-hidden />
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-navy-700 text-white px-4 py-2.5">
              <p>
                Avec une formation pas-à-pas pensée pour les débutants. Choisissez un parcours
                adapté à votre profil :
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="solid" className="bg-white/15 text-white">
                  IA pour étudiants
                </Badge>
                <Badge variant="solid" className="bg-white/15 text-white">
                  Vibe coding avec Kiro
                </Badge>
                <Badge variant="solid" className="bg-white/15 text-white">
                  Design IA
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1 text-xs text-navy-100/70">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden />
            <span>L&apos;assistant rédige une réponse...</span>
            <span className="ml-1 inline-flex gap-0.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50"
                style={{ animationDelay: '120ms' }}
              />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50"
                style={{ animationDelay: '240ms' }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
