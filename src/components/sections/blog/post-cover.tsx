import { cn } from '@/lib/utils';
import type { PostCoverTheme } from '@/lib/data/posts';
import { images } from '@/lib/data/images';

/**
 * Post cover. Picks a real photo from `images.posts[slug]` if we have
 * one, otherwise falls back to a navy gradient driven by `coverTheme`.
 */
const themeStyles: Record<PostCoverTheme, React.CSSProperties> = {
  navy: {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2), transparent 50%), linear-gradient(135deg, #0A1F44, #102A56 60%, #1E3A8A)',
  },
  gradient: {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2), transparent 50%), linear-gradient(135deg, #102A56, #1E3A8A 60%, #2D4A8A)',
  },
  'gradient-warm': {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(244,196,107,0.25), transparent 50%), linear-gradient(135deg, #102A56, #1E3A8A 60%, #2D4A8A)',
  },
};

export function PostCover({
  slug,
  theme = 'gradient',
  className,
  size = 'md',
  alt,
}: {
  slug?: string;
  theme?: PostCoverTheme;
  className?: string;
  size?: 'md' | 'lg';
  alt?: string;
}) {
  const heightCls = size === 'lg' ? 'h-64 md:h-96' : 'h-44 md:h-52';
  const photo = slug ? images.posts[slug] : undefined;

  if (photo) {
    return (
      <div className={cn('relative w-full overflow-hidden', heightCls, className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={alt ?? ''}
          aria-hidden={!alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn('w-full', heightCls, className)}
      style={themeStyles[theme]}
    />
  );
}
