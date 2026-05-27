import { DataTable, type DataTableColumn } from '@/components/admin/data-table';
import { adminTestimonials, type AdminTestimonial } from '@/lib/admin/store';

export const dynamic = 'force-dynamic';

const columns: DataTableColumn<AdminTestimonial>[] = [
  {
    key: 'name',
    header: 'Auteur',
    searchable: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
          {row.initials}
        </div>
        <div>
          <p className="font-medium text-zinc-900">{row.name}</p>
          <p className="mt-0.5 text-xs text-zinc-500">{row.role}</p>
        </div>
      </div>
    ),
  },
  { key: 'formation', header: 'Formation', searchable: true },
  {
    key: 'quote',
    header: 'Citation',
    searchable: true,
    render: (row) => (
      <p className="line-clamp-2 max-w-md text-zinc-700">« {row.quote} »</p>
    ),
  },
  {
    key: 'published',
    header: 'Statut',
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
        {row.published ? 'Publié' : 'Caché'}
      </span>
    ),
  },
];

export default function TestimonialsListPage() {
  const rows = adminTestimonials.list();
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          Témoignages
        </h2>
        <p className="text-sm text-zinc-500">
          Avis d&apos;apprenants affichés sur la page d&apos;accueil.
        </p>
      </header>
      <DataTable
        rows={rows}
        columns={columns}
        resourceName="témoignages"
        newHref="/admin/temoignages/new"
        rowHref={(row) => `/admin/temoignages/${row.id}`}
      />
    </div>
  );
}
