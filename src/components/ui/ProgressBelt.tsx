interface Props {
  value: number;
  max: number;
  label: string;
}

export function ProgressBelt({ value, max, label }: Props) {
  const cells = Array.from({ length: max }, (_, i) => i < value);
  return (
    <div className="w-full">
      <p className="mb-2 font-oswald text-[11px] tracking-[0.16em] text-ink-muted uppercase">
        {label}
      </p>
      <div
        className="flex items-center gap-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
      >
        {cells.map((filled, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-full border ${
              filled
                ? 'border-accent-deep bg-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]'
                : 'border-outline/80 bg-surface-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
