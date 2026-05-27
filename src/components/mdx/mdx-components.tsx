import * as React from 'react';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

/**
 * Custom rendering for MDX content in blog posts.
 * Keeps long-form articles readable and on-brand.
 */
export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mt-12 scroll-mt-24 font-display text-3xl font-bold text-navy-800 md:text-4xl',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'mt-12 scroll-mt-24 font-display text-2xl font-bold text-navy-800 md:text-3xl',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'mt-10 scroll-mt-24 font-display text-xl font-semibold text-navy-800',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('mt-5 leading-relaxed text-ink/85', className)} {...props} />
  ),
  a: ({ href, className, ...props }) => {
    const isInternal = typeof href === 'string' && href.startsWith('/');
    const classes = cn(
      'font-medium text-navy-700 underline underline-offset-4 transition hover:text-navy-800',
      className,
    );
    if (isInternal && href) {
      return <Link href={href} className={classes} {...props} />;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }) => (
    <ul
      className={cn('mt-5 list-disc space-y-2 pl-6 text-ink/85 marker:text-navy-400', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'mt-5 list-decimal space-y-2 pl-6 text-ink/85 marker:text-navy-700',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('leading-relaxed', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'mt-8 border-l-4 border-navy-700 bg-navy-50/60 px-5 py-4 italic text-navy-800',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'rounded bg-navy-50 px-1.5 py-0.5 font-mono text-[0.9em] text-navy-800',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mt-6 overflow-x-auto rounded-2xl bg-navy-900 p-5 text-sm text-navy-50 shadow-card',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn('my-12 border-navy-100', className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="mt-6 overflow-x-auto">
      <table
        className={cn(
          'w-full border-collapse text-sm [&_th]:bg-navy-50 [&_th]:text-left [&_th]:p-3 [&_td]:border-t [&_td]:border-navy-100 [&_td]:p-3',
          className,
        )}
        {...props}
      />
    </div>
  ),
};
