import { GraduationCap, Heart, MapPin, Users } from 'lucide-react';

/**
 * Reassurance bar shown right after the hero.
 * Numbers are placeholders to be replaced with the real ones once
 * the centre has solid figures to communicate.
 */
const stats = [
  { icon: Users, value: '+200', label: 'Apprenants formés' },
  { icon: Heart, value: '95%', label: 'De satisfaction' },
  { icon: GraduationCap, value: '3', label: 'Parcours phares' },
  { icon: MapPin, value: 'Tana', label: 'Présentiel & en ligne' },
];

export function Stats() {
  return (
    <section aria-label="Chiffres clés" className="border-b border-navy-100 bg-white">
      <div className="container grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12">
        {stats.map((s) => (
          <div key={s.label} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <s.icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-navy-800">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
