import type { ReactNode } from 'react';

interface Props {
  selected?: boolean;
  onSelect: () => void;
  children: ReactNode;
}

export function OptionCard({ selected = false, onSelect, children }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`min-h-14 w-full rounded-[4px] border px-4 py-3 text-left font-bevietnam text-base leading-snug text-ink transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
        selected
          ? 'border-2 border-brass bg-surface-2'
          : 'border-outline bg-surface'
      }`}
    >
      {children}
    </button>
  );
}
