import { notFound } from 'next/navigation';
import { FormShell } from '@/components/admin/form-shell';
import { adminPosts } from '@/lib/admin/store';
import { deletePost, updatePost } from '../actions';
import { PostForm } from '../post-form';
import { DeleteButton } from '@/components/admin/delete-button';

export const dynamic = 'force-dynamic';

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const post = adminPosts.get(params.id);
  if (!post) notFound();

  const update = updatePost.bind(null, post.id);
  const remove = deletePost.bind(null, post.id);

  return (
    <FormShell
      title={post.title}
      description={`Dernière modification : ${new Date(post.updatedAt).toLocaleString('fr-FR')}`}
      backHref="/admin/articles"
    >
      <PostForm initial={post} action={update} />
      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-900">Zone de danger</h3>
        <p className="mt-1 text-xs text-zinc-500">
          La suppression retire l&apos;article de la liste publique.
        </p>
        <form action={remove} className="mt-3">
          <DeleteButton label="Supprimer cet article" />
        </form>
      </div>
    </FormShell>
  );
}
