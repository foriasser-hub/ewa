import { BookOpen, GraduationCap, Inbox, MailOpen } from 'lucide-react';
import { KpiCard } from '@/components/admin/kpi-card';
import { MessagesTrendChart } from '@/components/admin/charts/messages-trend-chart';
import { SubjectsBarChart } from '@/components/admin/charts/subjects-bar-chart';
import { getDashboardData } from '@/lib/admin/dashboard';

export const dynamic = 'force-dynamic';

/**
 * Admin dashboard at /admin.
 * Server Component: reads from the in-memory store, then forwards
 * data to client-side Recharts components.
 */
export default function AdminDashboardPage() {
  const { kpis, trend, bySubject } = getDashboardData();

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          Vue d&apos;ensemble
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          État du site, du blog et des demandes entrantes.
        </p>
      </header>

      {/* KPI grid */}
      <section
        aria-label="Indicateurs clés"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <KpiCard
          label="Formations actives"
          value={kpis.activeFormations}
          hint="publiées sur le site"
          Icon={GraduationCap}
        />
        <KpiCard
          label="Articles publiés"
          value={kpis.publishedPosts}
          hint="visibles dans le blog"
          Icon={BookOpen}
        />
        <KpiCard
          label="Messages (30 j)"
          value={kpis.messages30d}
          hint="reçus via le formulaire"
          Icon={Inbox}
        />
        <KpiCard
          label="Taux de traitement"
          value={`${kpis.readRate}%`}
          hint={`${kpis.unreadMessages} message(s) non lu(s)`}
          trend={
            kpis.unreadMessages === 0
              ? { value: '✓ Tout traité', positive: true }
              : undefined
          }
          Icon={MailOpen}
        />
      </section>

      {/* Charts */}
      <section className="grid gap-4 lg:grid-cols-2">
        <MessagesTrendChart data={trend} />
        <SubjectsBarChart data={bySubject} />
      </section>
    </div>
  );
}
