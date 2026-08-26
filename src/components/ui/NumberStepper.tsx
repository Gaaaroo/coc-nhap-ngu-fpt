import { useRef } from 'react';

interface Props {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export function NumberStepper({
  label,
  unit,
  value,
  min,
  max,
  step = 1,
  onChange,
}: Props) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const hold = useRef<number | null>(null);
  const repeat = useRef<number | null>(null);

  const nudge = (dir: 1 | -1) => {
    const next = Math.min(max, Math.max(min, valueRef.current + dir * step));
    valueRef.current = next;
    onChange(next);
  };

  const startHold = (dir: 1 | -1) => {
    nudge(dir);
    hold.current = window.setTimeout(() => {
      repeat.current = window.setInterval(() => nudge(dir), 80);
    }, 400);
  };

  const stopHold = () => {
    if (hold.current) window.clearTimeout(hold.current);
    if (repeat.current) window.clearInterval(repeat.current);
    hold.current = null;
    repeat.current = null;
  };

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className="rounded-[4px] border border-outline bg-surface-2 p-3">
      <p className="font-oswald text-xs tracking-[0.08em] text-brass uppercase">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          aria-label={`Giảm ${label}`}
          aria-disabled={atMin}
          disabled={atMin}
          className="flex min-h-12 min-w-12 items-center justify-center rounded-[4px] border border-outline bg-surface text-2xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40"
          onPointerDown={() => startHold(-1)}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
        >
          −
        </button>
        <p
          className="flex-1 text-center font-oswald text-[28px] leading-none tracking-wide text-ink"
          aria-live="polite"
        >
          {value}
          <span className="ml-1 font-bevietnam text-base text-ink-muted">{unit}</span>
        </p>
        <button
          type="button"
          aria-label={`Tăng ${label}`}
          aria-disabled={atMax}
          disabled={atMax}
          className="flex min-h-12 min-w-12 items-center justify-center rounded-[4px] border border-outline bg-surface text-2xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40"
          onPointerDown={() => startHold(1)}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
        >
          +
        </button>
      </div>
    </div>
  );
}
