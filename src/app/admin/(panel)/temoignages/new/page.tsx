import { FormShell } from '@/components/admin/form-shell';
import { createTestimonial } from '../actions';
import { TestimonialForm } from '../testimonial-form';

export default function NewTestimonialPage() {
  return (
    <FormShell
      title="Nouveau témoignage"
      description="Pensez à demander l'accord de la personne concernée avant publication."
      backHref="/admin/temoignages"
    >
      <TestimonialForm action={createTestimonial} />
    </FormShell>
  );
}
