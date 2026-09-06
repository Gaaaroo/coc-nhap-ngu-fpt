import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useSession } from '../../store/session.store';

const variants = {
  primary:
    'min-h-14 w-full border border-brass-deep bg-brass text-on-brass font-oswald text-lg font-semibold tracking-[0.08em] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-2px_0_rgba(22,17,8,0.28)] enabled:active:shadow-[inset_0_2px_6px_rgba(22,17,8,0.35)]',
  secondary:
    'min-h-12 w-full border border-outline bg-surface text-ink font-oswald tracking-[0.08em] shadow-[inset_0_1px_0_var(--color-highlight)] enabled:active:border-brass',
  ghost:
    'min-h-12 px-3 text-brass font-oswald tracking-[0.08em] enabled:active:bg-surface',
  danger:
    'min-h-14 w-full border border-danger bg-danger text-on-brass font-oswald text-lg font-semibold tracking-[0.08em] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
} as const;

type Variant = keyof typeof variants;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', className = '', disabled, onClick, children, ...rest },
  ref,
) {
  const ctaLocked = useSession((s) => s.ctaLocked);
  const locked = Boolean(ctaLocked && (variant === 'primary' || variant === 'danger'));

  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      disabled={disabled || locked}
      onClick={(e) => {
        if (disabled || locked) return;
        onClick?.(e);
      }}
      className={`inline-flex items-center justify-center rounded-[4px] px-4 transition-[transform,box-shadow,border-color,background-color] duration-150 enabled:active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
});
