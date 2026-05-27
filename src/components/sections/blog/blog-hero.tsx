import { Badge } from '@/components/ui/badge';

export function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse at top, black 0%, black 40%, transparent 75%)',
        }}
      />
      <div className="container relative py-20 md:py-24">
        <Badge variant="solid" className="bg-white text-navy-800">
          Blog
        </Badge>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Conseils, tutoriels et tendances IA.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-navy-100">
          Notre équipe pédagogique partage régulièrement des contenus pour vous aider à
          apprivoiser l&apos;IA, à votre rythme.
        </p>
      </div>
    </section>
  );
}
