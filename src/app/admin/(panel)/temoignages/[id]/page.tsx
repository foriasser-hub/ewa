import { notFound } from 'next/navigation';
import { FormShell } from '@/components/admin/form-shell';
import { adminTestimonials } from '@/lib/admin/store';
import { deleteTestimonial, updateTestimonial } from '../actions';
import { TestimonialForm } from '../testimonial-form';
import { DeleteButton } from '@/components/admin/delete-button';

export const dynamic = 'force-dynamic';

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const t = adminTestimonials.get(params.id);
  if (!t) notFound();

  const update = updateTestimonial.bind(null, t.id);
  const remove = deleteTestimonial.bind(null, t.id);

  return (
    <FormShell
      title={`Témoignage de ${t.name}`}
      description={`Dernière modification : ${new Date(t.updatedAt).toLocaleString('fr-FR')}`}
      backHref="/admin/temoignages"
    >
      <TestimonialForm initial={t} action={update} />
      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-900">Zone de danger</h3>
        <form action={remove} className="mt-3">
          <DeleteButton label="Supprimer ce témoignage" />
        </form>
      </div>
    </FormShell>
  );
}
