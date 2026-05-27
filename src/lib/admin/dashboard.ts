import 'server-only';
import { adminFormations, adminMessages, adminPosts } from '@/lib/admin/store';
import { getSubjectLabel, type SubjectValue } from '@/lib/contact-schema';

/**
 * Dashboard KPIs and chart series, computed from the in-memory store.
 * Pure functions; safe to call multiple times.
 */

export type DashboardData = {
  kpis: {
    activeFormations: number;
    publishedPosts: number;
    messages30d: number;
    unreadMessages: number;
    readRate: number;
  };
  trend: { date: string; count: number }[];
  bySubject: { subject: string; count: number }[];
};

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatShortDay(d: Date): string {
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function getDashboardData(): DashboardData {
  const formations = adminFormations.list();
  const posts = adminPosts.list();
  const messages = adminMessages.list();

  // ── KPIs ──
  const activeFormations = formations.filter((f) => f.published).length;
  const publishedPosts = posts.filter((p) => p.published).length;

  const now = startOfDay(new Date());
  const thirtyDaysAgo = new Date(now.getTime() - 29 * DAY_MS);

  const messages30d = messages.filter((m) => new Date(m.createdAt) >= thirtyDaysAgo).length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;
  const totalMessages = messages.length;
  const readMessages = messages.filter(
    (m) => m.status === 'read' || m.status === 'archived',
  ).length;
  const readRate =
    totalMessages === 0 ? 0 : Math.round((readMessages / totalMessages) * 100);

  // ── Trend (30 days) ──
  // Bucket count of messages per day, filling missing days with 0.
  const buckets = new Map<string, number>();
  for (let i = 0; i < 30; i++) {
    const d = new Date(thirtyDaysAgo.getTime() + i * DAY_MS);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const m of messages) {
    const key = m.createdAt.slice(0, 10);
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  const trend = Array.from(buckets.entries()).map(([iso, count]) => ({
    date: formatShortDay(new Date(iso)),
    count,
  }));

  // ── Distribution by subject ──
  const subjectCounts = new Map<string, number>();
  for (const m of messages) {
    const key = m.subject;
    subjectCounts.set(key, (subjectCounts.get(key) ?? 0) + 1);
  }
  // Stable order: declaration order from contact-schema if recognised, then any extras.
  const knownOrder: SubjectValue[] = [
    'info-formation',
    'inscription',
    'entretien',
    'partenariat',
    'autre',
  ];
  const ordered = [
    ...knownOrder.filter((k) => subjectCounts.has(k)),
    ...Array.from(subjectCounts.keys()).filter(
      (k) => !knownOrder.includes(k as SubjectValue),
    ),
  ];
  const bySubject = ordered.map((key) => ({
    subject: shortSubjectLabel(key),
    count: subjectCounts.get(key) ?? 0,
  }));

  return {
    kpis: {
      activeFormations,
      publishedPosts,
      messages30d,
      unreadMessages,
      readRate,
    },
    trend,
    bySubject,
  };
}

/**
 * Bar chart axis labels need to be short. We use the long label only as fallback.
 */
function shortSubjectLabel(key: string): string {
  switch (key) {
    case 'info-formation':
      return 'Info';
    case 'inscription':
      return 'Inscription';
    case 'entretien':
      return 'Entretien';
    case 'partenariat':
      return 'Partenariat';
    case 'autre':
      return 'Autre';
    default:
      try {
        return getSubjectLabel(key as SubjectValue);
      } catch {
        return key;
      }
  }
}
