import type { Metadata } from 'next';
import { BlogHero } from '@/components/sections/blog/blog-hero';
import { PostsGrid } from '@/components/sections/blog/posts-grid';
import { FinalCta } from '@/components/sections/final-cta';
import { getAllPosts } from '@/lib/data/posts';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog IA : conseils, tutoriels, tendances',
  description:
    "Conseils, tutoriels et tendances IA pour les débutants. Le blog d'Académie IA Africaine : ChatGPT, vibe coding, design IA, outils.",
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogHero />
      <PostsGrid posts={posts} />
      <FinalCta />
    </>
  );
}
