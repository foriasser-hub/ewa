import { FormShell } from '@/components/admin/form-shell';
import { createPost } from '../actions';
import { PostForm } from '../post-form';

export default function NewArticlePage() {
  return (
    <FormShell
      title="Nouvel article"
      description="Ajoutez les métadonnées d'un nouvel article. Pensez ensuite à créer le fichier .mdx correspondant dans src/content/posts/."
      backHref="/admin/articles"
    >
      <PostForm action={createPost} />
    </FormShell>
  );
}
