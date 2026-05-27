import { DataTable, type DataTableColumn } from '@/components/admin/data-table';
import { adminPosts, type AdminPost } from '@/lib/admin/store';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const columns: DataTableColumn<AdminPost>[] = [
  {
    key: 'title',
    header: 'Titre',
    searchable: true,
    render: (row) => (
      <div>
        <p className="font-medium text-zinc-900">{row.title}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{row.excerpt}</p>
      </div>
    ),
  },
  {
    key: 'category',
    header: 'Catégorie',
    searchable: true,
    render: (row) => (
      <span className="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
        {row.category}
      </span>
    ),
  },
  {
    key: 'publishedAt',
    header: 'Publié le',
    render: (row) => <span className="text-zinc-700">{formatDate(row.publishedAt)}</span>,
  },
  {
    key: 'readingTime',
    header: 'Lecture',
    render: (row) => <span className="text-zinc-700">{row.readingTime} min</span>,
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
        {row.published ? 'Publié' : 'Brouillon'}
      </span>
    ),
  },
];

export default function ArticlesListPage() {
  const rows = adminPosts.list().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  // Distinct categories for the filter.
  const cats = Array.from(new Set(rows.map((r) => r.category))).sort();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          Articles
        </h2>
        <p className="text-sm text-zinc-500">
          Métadonnées des articles du blog. Le contenu MDX reste dans le repo.
        </p>
      </header>

      <DataTable
        rows={rows}
        columns={columns}
        resourceName="articles"
        newHref="/admin/articles/new"
        rowHref={(row) => `/admin/articles/${row.id}`}
        filters={[
          {
            key: 'category',
            label: 'Catégorie',
            options: cats.map((c) => ({ value: c, label: c })),
          },
        ]}
      />
    </div>
  );
}
