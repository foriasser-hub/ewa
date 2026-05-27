'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type SubjectBarPoint = {
  subject: string;
  count: number;
};

/**
 * Distribution of contact messages by subject.
 * Sober single-colour bars to match the Vercel look.
 */
export function SubjectsBarChart({ data }: { data: SubjectBarPoint[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <h3 className="font-display text-sm font-semibold text-zinc-900">
        Répartition des messages par sujet
      </h3>
      <p className="text-xs text-zinc-500">Toutes périodes confondues</p>

      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="#F4F4F5" vertical={false} />
            <XAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: '#71717A' }}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: '#71717A' }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <Tooltip
              cursor={{ fill: '#FAFAFA' }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid #E4E4E7',
                background: 'white',
              }}
              labelStyle={{ color: '#27272A', fontWeight: 600 }}
            />
            <Bar dataKey="count" fill="#1E3A8A" radius={[6, 6, 0, 0]} maxBarSize={42} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
