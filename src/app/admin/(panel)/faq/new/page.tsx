import { FormShell } from '@/components/admin/form-shell';
import { createFaqItem } from '../actions';
import { FaqForm } from '../faq-form';

export default function NewFaqPage() {
  return (
    <FormShell
      title="Nouvelle question"
      description="Ajoutez une question à la FAQ. Elle apparaîtra immédiatement sur le site public."
      backHref="/admin/faq"
    >
      <FaqForm action={createFaqItem} />
    </FormShell>
  );
}
