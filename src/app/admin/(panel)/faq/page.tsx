import { DataTable, type DataTableColumn } from '@/components/admin/data-table';
import { adminFaq, type AdminFaq } from '@/lib/admin/store';

export const dynamic = 'force-dynamic';

const columns: DataTableColumn<AdminFaq>[] = [
  {
    key: 'order',
    header: '#',
    className: 'w-12',
    render: (row) => (
      <span className="font-mono text-xs text-zinc-500">{row.order}</span>
    ),
  },
  {
    key: 'category',
    header: 'Catégorie',
    render: (row) => (
      <span className="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
        {row.category}
      </span>
    ),
  },
  {
    key: 'question',
    header: 'Question',
    searchable: true,
    render: (row) => (
      <div>
        <p className="font-medium text-zinc-900">{row.question}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{row.answer}</p>
      </div>
    ),
  },
];

export default function FaqListPage() {
  const rows = adminFaq.list();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">FAQ</h2>
        <p className="text-sm text-zinc-500">Questions fréquemment posées affichées sur /faq.</p>
      </header>

      <DataTable
        rows={rows}
        columns={columns}
        resourceName="questions"
        newHref="/admin/faq/new"
        rowHref={(row) => `/admin/faq/${row.id}`}
        filters={[
          {
            key: 'category',
            label: 'Catégorie',
            options: [
              { value: 'Inscription', label: 'Inscription' },
              { value: 'Pédagogie', label: 'Pédagogie' },
              { value: 'Tarifs & financement', label: 'Tarifs & financement' },
            ],
          },
        ]}
      />
    </div>
  );
}
