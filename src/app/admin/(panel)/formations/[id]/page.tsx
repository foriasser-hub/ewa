import { notFound } from 'next/navigation';
import { FormShell } from '@/components/admin/form-shell';
import { adminFormations } from '@/lib/admin/store';
import { deleteFormation, updateFormation } from '../actions';
import { FormationForm } from '../formation-form';
import { DeleteButton } from '@/components/admin/delete-button';

export const dynamic = 'force-dynamic';

export default function EditFormationPage({ params }: { params: { id: string } }) {
  const formation = adminFormations.get(params.id);
  if (!formation) notFound();

  // Bind the formation id into the server actions so the form can call them directly.
  const update = updateFormation.bind(null, formation.id);
  const remove = deleteFormation.bind(null, formation.id);

  return (
    <FormShell
      title={formation.title}
      description={`Dernière modification : ${new Date(formation.updatedAt).toLocaleString('fr-FR')}`}
      backHref="/admin/formations"
    >
      <FormationForm
        initial={formation}
        action={update}
        onDelete={undefined /* delete is handled via the dedicated form below */}
      />
      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-900">Zone de danger</h3>
        <p className="mt-1 text-xs text-zinc-500">
          La suppression est définitive. La formation disparaîtra du site public.
        </p>
        <form action={remove} className="mt-3">
          <DeleteButton label="Supprimer cette formation" />
        </form>
      </div>
    </FormShell>
  );
}
