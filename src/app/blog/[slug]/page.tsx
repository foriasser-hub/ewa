import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';
import { PostCover } from '@/components/sections/blog/post-cover';
import { RelatedPosts } from '@/components/sections/blog/related-posts';
import { FinalCta } from '@/components/sections/final-cta';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { getAllPostSlugs, getAllPosts, getPostBySlug } from '@/lib/data/posts';
import { siteConfig } from '@/lib/site-config';
import { breadcrumbsJsonLd, buildMetadata, jsonLd } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Article introuvable', robots: { index: false, follow: false } };
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
  });
}

const PUBLIC_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || siteConfig.url;

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  // Schema.org Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: 'fr-MG',
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: PUBLIC_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${PUBLIC_URL}/icon.svg` },
    },
    articleSection: post.category,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${PUBLIC_URL}/blog/${post.slug}` },
  };

  const breadcrumbs = breadcrumbsJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(articleJsonLd)}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(breadcrumbs)}
      />

      {/* Header */}
      <section className="bg-navy-800 text-white">
        <div className="container py-16 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-100 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Tous les articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-navy-100">
            <Badge variant="solid" className="bg-white text-navy-800">
              {post.category}
            </Badge>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.readingTime} min de lecture
            </span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-navy-100">{post.excerpt}</p>
        </div>
      </section>

      {/* Cover */}
      <PostCover theme={post.coverTheme} size="lg" className="border-y border-navy-100" />

      {/* Body */}
      <article className="container max-w-3xl py-14 md:py-20">
        <div className="text-base">
          <MDXRemote
            source={post.body}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <footer className="mt-16 border-t border-navy-100 pt-8">
          <p className="text-sm text-muted">
            Publié le {formatDate(post.publishedAt)} par l&apos;équipe AKADEMIA IA.
          </p>
        </footer>
      </article>

      <RelatedPosts posts={related} />
      <FinalCta />
    </>
  );
}
