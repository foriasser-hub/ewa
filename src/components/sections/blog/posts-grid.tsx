import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PostCover } from '@/components/sections/blog/post-cover';
import { type Post } from '@/lib/data/posts';
import { formatDate } from '@/lib/utils';

export function PostsGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <section className="container py-14 md:py-20">
        <div className="rounded-2xl border border-dashed border-navy-200 bg-paper p-10 text-center">
          <p className="font-display text-lg font-semibold text-navy-800">
            Aucun article pour le moment.
          </p>
          <p className="mt-2 text-sm text-muted">
            Les premiers articles arrivent très bientôt &mdash; revenez nous voir.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-14 md:py-20">
      <p className="text-sm text-muted">
        {posts.length} article{posts.length > 1 ? 's' : ''}
      </p>
      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col overflow-hidden transition group-hover:-translate-y-0.5 group-hover:border-navy-200">
                <PostCover theme={p.coverTheme} />
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <Badge variant="default">{p.category}</Badge>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden />
                      {p.readingTime} min
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-navy-800 group-hover:text-navy-700">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted">{p.excerpt}</p>
                  <p className="mt-auto pt-2 text-xs text-muted">
                    {formatDate(p.publishedAt)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
