import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Blog data layer.
 *
 * Posts are stored as `.mdx` files in `src/content/posts/`.
 * Each file has a frontmatter block parsed with gray-matter.
 *
 * NOTE: This module is server-only. It relies on the filesystem
 * and must not be imported from a client component.
 */

export type PostCoverTheme = 'navy' | 'gradient' | 'gradient-warm';

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  readingTime: number; // minutes
  coverTheme?: PostCoverTheme;
};

export type Post = PostFrontmatter & {
  slug: string;
};

export type PostWithBody = Post & {
  /** Raw MDX body (frontmatter stripped). */
  body: string;
};

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

function readPostFile(filename: string): PostWithBody {
  const slug = filename.replace(/\.mdx?$/, '');
  const fullPath = path.join(POSTS_DIR, filename);
  const file = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(file);

  return {
    slug,
    title: String(data.title ?? ''),
    excerpt: String(data.excerpt ?? ''),
    category: String(data.category ?? 'Article'),
    publishedAt: String(data.publishedAt ?? ''),
    readingTime: Number(data.readingTime ?? 5),
    coverTheme: (data.coverTheme as PostCoverTheme | undefined) ?? 'gradient',
    body: content,
  };
}

let cache: PostWithBody[] | null = null;

function loadAll(): PostWithBody[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) {
    cache = [];
    return cache;
  }
  const filenames = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  const posts = filenames
    .map(readPostFile)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  cache = posts;
  return posts;
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

export function getAllPosts(): Post[] {
  return loadAll().map(({ body: _body, ...rest }) => rest);
}

export function getAllPostSlugs(): string[] {
  return loadAll().map((p) => p.slug);
}

export function getPostBySlug(slug: string): PostWithBody | undefined {
  return loadAll().find((p) => p.slug === slug);
}

export function getLatestPosts(n: number): Post[] {
  return getAllPosts().slice(0, n);
}

/* -------------------------------------------------------------------------- */
/* Backward compatibility for the homepage `LatestPosts` section              */
/* -------------------------------------------------------------------------- */

export type PostPreview = Pick<
  Post,
  'slug' | 'title' | 'excerpt' | 'category' | 'publishedAt' | 'readingTime'
>;

export const latestPosts: PostPreview[] = getLatestPosts(3).map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  publishedAt: p.publishedAt,
  readingTime: p.readingTime,
}));
