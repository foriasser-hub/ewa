import type { Metadata } from 'next';
import { BlogHero } from '@/components/sections/blog/blog-hero';
import { PostsGrid } from '@/components/sections/blog/posts-grid';
import { FinalCta } from '@/components/sections/final-cta';
import { getAllPosts } from '@/lib/data/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Conseils, tutoriels et tendances IA pour les débutants. Le blog d'AKADEMIA IA MADAGASIKARA.",
};

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
