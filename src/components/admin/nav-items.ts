import {
  BookOpen,
  GraduationCap,
  HelpCircle,
  type LucideIcon,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Settings,
} from 'lucide-react';

/**
 * Sidebar navigation entries.
 * Single source of truth — sidebar uses it, topbar reads it to know
 * the active page title.
 */
export type AdminNavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
  /** Optional badge value computed at render time (e.g. unread messages). */
  badge?: number;
};

export const adminNavItems: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', Icon: LayoutDashboard },
  { label: 'Formations', href: '/admin/formations', Icon: GraduationCap },
  { label: 'Articles', href: '/admin/articles', Icon: BookOpen },
  { label: 'FAQ', href: '/admin/faq', Icon: HelpCircle },
  { label: 'Témoignages', href: '/admin/temoignages', Icon: MessageSquareQuote },
  { label: 'Messages', href: '/admin/messages', Icon: Mail },
  { label: 'Paramètres', href: '/admin/parametres', Icon: Settings },
];
