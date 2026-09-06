import type { ReactNode } from 'react';

interface Props {
  selected?: boolean;
  invalid?: boolean;
  onSelect: () => void;
  children: ReactNode;
}

export function OptionCard({ selected = false, invalid = false, onSelect, children }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative min-h-14 w-full overflow-hidden rounded-[4px] border-2 py-3 pr-4 pl-4 text-left font-bevietnam text-base leading-snug text-ink transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
        selected
          ? 'border-brass bg-surface-2 shadow-[inset_0_1px_0_var(--color-highlight)]'
          : invalid
            ? 'border-danger bg-surface shadow-[inset_0_1px_0_var(--color-highlight)]'
            : 'border-outline bg-surface shadow-[inset_0_1px_0_var(--color-highlight)]'
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 ${selected ? 'bg-brass' : 'bg-transparent'}`}
      />
      {children}
    </button>
  );
}
