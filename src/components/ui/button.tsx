import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button — primary interactive element.
 * Variants:
 *  - primary  : navy filled (main CTA)
 *  - secondary: white on navy ghost (used on dark backgrounds)
 *  - outline  : transparent with navy border
 *  - ghost    : minimal, used in nav
 *  - link     : text-only with underline on hover
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-navy-800 text-white shadow-card hover:bg-navy-700',
        secondary: 'bg-white text-navy-800 shadow-card hover:bg-paper',
        outline:
          'border border-navy-200 bg-transparent text-navy-800 hover:bg-navy-50 hover:border-navy-300',
        ghost: 'bg-transparent text-navy-800 hover:bg-navy-50',
        link: 'text-navy-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-5',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
