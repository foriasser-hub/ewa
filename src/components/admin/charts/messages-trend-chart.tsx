'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type MessagesTrendPoint = {
  /** Short label (e.g. "12 mai"). */
  date: string;
  count: number;
};

/**
 * 30-day trend of incoming contact messages.
 * Vercel-style: subtle area, single colour, sober grid.
 */
export function MessagesTrendChart({ data }: { data: MessagesTrendPoint[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-sm font-semibold text-zinc-900">
          Messages reçus (30 derniers jours)
        </h3>
        <p className="text-xs text-zinc-500">
          Total : {data.reduce((sum, d) => sum + d.count, 0)}
        </p>
      </div>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A1F44" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0A1F44" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F4F4F5" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#71717A' }}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: '#71717A' }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <Tooltip
              cursor={{ stroke: '#D4D4D8', strokeWidth: 1 }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid #E4E4E7',
                background: 'white',
              }}
              labelStyle={{ color: '#27272A', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#0A1F44"
              strokeWidth={2}
              fill="url(#messagesGradient)"
              dot={false}
              name="Messages"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
