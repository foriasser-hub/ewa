import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminTopbar } from '@/components/admin/topbar';
import { adminMessages } from '@/lib/admin/store';

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

/**
 * Authenticated admin shell:
 *  - Fixed sidebar on the left (desktop)
 *  - Sticky topbar with page title + logout
 *  - Neutral zinc-50 background (Vercel/Linear feel)
 *
 * Auth itself is enforced by middleware.ts; if we got here, we're admin.
 */
export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const unread = adminMessages.list().filter((m) => m.status === 'unread').length;

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar unreadMessages={unread} />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
