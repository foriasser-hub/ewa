import { GraduationCap, Heart, MapPin, Users } from 'lucide-react';

/**
 * Reassurance bar shown right after the hero.
 * Compact, dense, with stronger icon-on-tile treatment.
 */
const stats = [
  { icon: Users, value: '+200', label: 'Apprenants formés' },
  { icon: Heart, value: '95%', label: 'De satisfaction' },
  { icon: GraduationCap, value: '3', label: 'Parcours phares' },
  { icon: MapPin, value: 'Tana', label: 'Présentiel & en ligne' },
];

export function Stats() {
  return (
    <section
      aria-label="Chiffres clés"
      className="relative border-y border-navy-100 bg-white"
    >
      <div className="container grid grid-cols-2 gap-x-8 gap-y-8 py-10 md:grid-cols-4 md:py-12">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 text-navy-700 ring-1 ring-inset ring-navy-100">
              <s.icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold tracking-tight text-navy-800">
                {s.value}
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
