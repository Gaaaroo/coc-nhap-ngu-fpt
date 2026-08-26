interface Props {
  value: number;
  max: number;
  label: string;
}

export function ProgressBelt({ value, max, label }: Props) {
  const cells = Array.from({ length: max }, (_, i) => i < value);
  return (
    <div className="w-full">
      <p className="mb-2 font-oswald text-xs tracking-[0.12em] text-ink-muted uppercase">
        {label}
      </p>
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
      >
        {cells.map((filled, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-[1px] ${filled ? 'bg-brass' : 'bg-outline'}`}
          />
        ))}
      </div>
    </div>
  );
}
