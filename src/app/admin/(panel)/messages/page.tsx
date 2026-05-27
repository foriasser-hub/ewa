import Link from 'next/link';
import { DataTable, type DataTableColumn } from '@/components/admin/data-table';
import { adminMessages, type AdminMessage } from '@/lib/admin/store';
import { getSubjectLabel, type SubjectValue } from '@/lib/contact-schema';

export const dynamic = 'force-dynamic';

function statusBadge(status: AdminMessage['status']) {
  switch (status) {
    case 'unread':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
          Non lu
        </span>
      );
    case 'read':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" aria-hidden />
          Lu
        </span>
      );
    case 'archived':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" aria-hidden />
          Archivé
        </span>
      );
  }
}

const columns: DataTableColumn<AdminMessage>[] = [
  {
    key: 'status',
    header: 'Statut',
    render: (row) => statusBadge(row.status),
  },
  {
    key: 'firstName',
    header: 'Expéditeur',
    searchable: true,
    render: (row) => (
      <div>
        <p className={row.status === 'unread' ? 'font-semibold text-zinc-900' : 'text-zinc-700'}>
          {row.firstName} {row.lastName}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">{row.email}</p>
      </div>
    ),
  },
  {
    key: 'subject',
    header: 'Sujet',
    render: (row) => {
      let label: string;
      try {
        label = getSubjectLabel(row.subject as SubjectValue);
      } catch {
        label = row.subject;
      }
      return (
        <span className="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
          {label}
        </span>
      );
    },
  },
  {
    key: 'message',
    header: 'Message',
    searchable: true,
    render: (row) => (
      <p className="line-clamp-1 max-w-md text-zinc-700">{row.message}</p>
    ),
  },
  {
    key: 'createdAt',
    header: 'Reçu',
    render: (row) => (
      <span className="text-zinc-500">
        {new Date(row.createdAt).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
        })}
      </span>
    ),
  },
];

export default function MessagesListPage() {
  const rows = adminMessages.list();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          Messages
        </h2>
        <p className="text-sm text-zinc-500">
          Demandes reçues via le formulaire de contact du site public.
        </p>
      </header>

      <DataTable
        rows={rows}
        columns={columns}
        resourceName="messages"
        rowHref={(row) => `/admin/messages/${row.id}`}
        filters={[
          {
            key: 'status',
            label: 'Statut',
            options: [
              { value: 'unread', label: 'Non lu' },
              { value: 'read', label: 'Lu' },
              { value: 'archived', label: 'Archivé' },
            ],
          },
          {
            key: 'subject',
            label: 'Sujet',
            options: [
              { value: 'info-formation', label: 'Demande d\u2019info' },
              { value: 'inscription', label: 'Inscription' },
              { value: 'entretien', label: 'Entretien' },
              { value: 'partenariat', label: 'Partenariat' },
              { value: 'autre', label: 'Autre' },
            ],
          },
        ]}
      />

      {rows.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Aucun message pour l&apos;instant. Quand un visiteur soumet le formulaire sur{' '}
          <Link href="/contact" className="underline">
            /contact
          </Link>
          , il apparaîtra ici.
        </p>
      ) : null}
    </div>
  );
}
