import { cn } from '@/lib/utils';
import type { PostCoverTheme } from '@/lib/data/posts';

/**
 * Decorative cover used in lieu of a real image.
 * The visual variant is driven by the post's `coverTheme` frontmatter
 * so different categories don't all look identical.
 */
const themeStyles: Record<PostCoverTheme, React.CSSProperties> = {
  navy: {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 50%), linear-gradient(135deg, #0A1F44, #102A56 60%, #1E3A8A)',
  },
  gradient: {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 50%), linear-gradient(135deg, #102A56, #1E3A8A 60%, #2D4A8A)',
  },
  'gradient-warm': {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(244,196,107,0.25), transparent 50%), linear-gradient(135deg, #102A56, #1E3A8A 60%, #2D4A8A)',
  },
};

export function PostCover({
  theme = 'gradient',
  className,
  size = 'md',
}: {
  theme?: PostCoverTheme;
  className?: string;
  size?: 'md' | 'lg';
}) {
  const heightCls = size === 'lg' ? 'h-64 md:h-80' : 'h-40';
  return (
    <div
      aria-hidden
      className={cn('w-full', heightCls, className)}
      style={themeStyles[theme]}
    />
  );
}
