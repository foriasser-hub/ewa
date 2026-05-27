import { DataTable, type DataTableColumn } from '@/components/admin/data-table';
import { adminFormations, type AdminFormation } from '@/lib/admin/store';
import { formatPrice } from '@/lib/data/formations';

export const dynamic = 'force-dynamic';

const columns: DataTableColumn<AdminFormation>[] = [
  {
    key: 'title',
    header: 'Titre',
    searchable: true,
    render: (row) => (
      <div>
        <p className="font-medium text-zinc-900">{row.title}</p>
        <p className="mt-0.5 text-xs text-zinc-500">/{row.slug}</p>
      </div>
    ),
  },
  {
    key: 'level',
    header: 'Niveau',
    render: (row) => (
      <span className="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
        {row.level}
      </span>
    ),
  },
  { key: 'duration', header: 'Durée', searchable: true },
  { key: 'format', header: 'Format' },
  {
    key: 'price',
    header: 'Tarif',
    render: (row) => <span className="text-zinc-700">{formatPrice(row.price)}</span>,
  },
  {
    key: 'published',
    header: 'Publié',
    render: (row) => (
      <span
        className={
          row.published
            ? 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700'
            : 'inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500'
        }
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${row.published ? 'bg-emerald-500' : 'bg-zinc-400'}`}
          aria-hidden
        />
        {row.published ? 'Publié' : 'Brouillon'}
      </span>
    ),
  },
];

export default function FormationsListPage() {
  const rows = adminFormations.list();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          Formations
        </h2>
        <p className="text-sm text-zinc-500">
          Catalogue des parcours affichés sur le site public.
        </p>
      </header>

      <DataTable
        rows={rows}
        columns={columns}
        resourceName="formations"
        newHref="/admin/formations/new"
        rowHref={(row) => `/admin/formations/${row.id}`}
        filters={[
          {
            key: 'level',
            label: 'Niveau',
            options: [
              { value: 'Débutant', label: 'Débutant' },
              { value: 'Intermédiaire', label: 'Intermédiaire' },
              { value: 'Avancé', label: 'Avancé' },
            ],
          },
          {
            key: 'format',
            label: 'Format',
            options: [
              { value: 'Présentiel', label: 'Présentiel' },
              { value: 'En ligne', label: 'En ligne' },
              { value: 'Hybride', label: 'Hybride' },
            ],
          },
        ]}
      />
    </div>
  );
}
