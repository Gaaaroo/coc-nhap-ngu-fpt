import type { ButtonHTMLAttributes, ReactNode } from 'react';

const variants = {
  primary:
    'min-h-14 w-full bg-brass text-on-brass font-oswald tracking-wide text-lg font-semibold',
  secondary:
    'min-h-12 w-full bg-transparent text-ink border border-outline font-oswald tracking-wide',
  ghost: 'min-h-12 px-3 text-brass font-oswald tracking-wide',
  danger: 'min-h-14 w-full bg-danger text-on-brass font-oswald tracking-wide text-lg font-semibold',
} as const;

type Variant = keyof typeof variants;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-[4px] px-4 transition-colors duration-150 enabled:active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
