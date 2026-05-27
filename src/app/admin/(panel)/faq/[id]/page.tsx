import { notFound } from 'next/navigation';
import { FormShell } from '@/components/admin/form-shell';
import { adminFaq } from '@/lib/admin/store';
import { deleteFaqItem, updateFaqItem } from '../actions';
import { FaqForm } from '../faq-form';
import { DeleteButton } from '@/components/admin/delete-button';

export const dynamic = 'force-dynamic';

export default function EditFaqPage({ params }: { params: { id: string } }) {
  const item = adminFaq.get(params.id);
  if (!item) notFound();

  const update = updateFaqItem.bind(null, item.id);
  const remove = deleteFaqItem.bind(null, item.id);

  return (
    <FormShell
      title="Modifier la question"
      description={`Dernière modification : ${new Date(item.updatedAt).toLocaleString('fr-FR')}`}
      backHref="/admin/faq"
    >
      <FaqForm initial={item} action={update} />
      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-900">Zone de danger</h3>
        <form action={remove} className="mt-3">
          <DeleteButton label="Supprimer cette question" />
        </form>
      </div>
    </FormShell>
  );
}
