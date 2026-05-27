import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PostCover } from '@/components/sections/blog/post-cover';
import { type Post } from '@/lib/data/posts';
import { formatDate } from '@/lib/utils';

/**
 * Up to 2 other posts shown at the bottom of an article.
 * Selection is intentionally simple: take the most recent posts
 * other than the current one.
 */
export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-paper">
      <div className="container py-16 md:py-20">
        <h2 className="font-display text-2xl font-bold text-navy-800 md:text-3xl">
          Continuez à lire
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
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
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-navy-700 transition group-hover:text-navy-800">
                      Lire l&apos;article
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <p className="text-xs text-muted">{formatDate(p.publishedAt)}</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
