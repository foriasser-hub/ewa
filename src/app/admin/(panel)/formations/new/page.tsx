import { FormShell } from '@/components/admin/form-shell';
import { createFormation } from '../actions';
import { FormationForm } from '../formation-form';

export default function NewFormationPage() {
  return (
    <FormShell
      title="Nouvelle formation"
      description="Ajoutez une formation à votre catalogue. Vous pourrez la modifier ou la dépublier à tout moment."
      backHref="/admin/formations"
    >
      <FormationForm action={createFormation} />
    </FormShell>
  );
}
