import { useEffect, useId, useRef, useState } from 'react';

interface Props {
  label: string;
  unit: string;
  value: number | null;
  min: number;
  max: number;
  step?: number;
  error?: string | null;
  onChange: (value: number | null) => void;
  onNonNumeric?: () => void;
}

function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, '');
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function NumberStepper({
  label,
  unit,
  value,
  min,
  max,
  step = 1,
  error,
  onChange,
  onNonNumeric,
}: Props) {
  const inputId = useId();
  const valueRef = useRef(value);
  valueRef.current = value;
  const hold = useRef<number | null>(null);
  const repeat = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(value == null ? '' : String(value));
  const [focused, setFocused] = useState(false);
  const maxDigits = String(max).length + 1;
  const invalid = Boolean(error);

  useEffect(() => {
    if (!focused) setDraft(value == null ? '' : String(value));
  }, [value, focused]);

  const commit = (raw: string) => {
    const cleaned = digitsOnly(raw);
    if (cleaned.length === 0) {
      valueRef.current = null;
      setDraft('');
      onChange(null);
      return;
    }
    const parsed = Number.parseInt(cleaned, 10);
    if (Number.isNaN(parsed)) {
      valueRef.current = null;
      setDraft('');
      onChange(null);
      return;
    }
    valueRef.current = parsed;
    setDraft(String(parsed));
    onChange(parsed);
  };

  const nudge = (dir: 1 | -1) => {
    if (focused) {
      inputRef.current?.blur();
    }
    const base = valueRef.current == null ? (dir === 1 ? min - step : min) : valueRef.current;
    const next = clamp(base + dir * step, min, max);
    valueRef.current = next;
    setDraft(String(next));
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

  const atMin = value != null && value <= min;
  const atMax = value != null && value >= max;

  return (
    <div
      className={`rounded-[4px] border bg-surface p-3 shadow-[inset_0_1px_0_var(--color-highlight)] ${
        invalid ? 'border-danger' : 'border-outline'
      }`}
    >
      <label
        htmlFor={inputId}
        className="font-oswald text-[11px] tracking-[0.16em] text-accent uppercase"
      >
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          aria-label={`Giảm ${label}`}
          aria-disabled={atMin}
          disabled={atMin}
          className="flex min-h-12 min-w-12 items-center justify-center rounded-[4px] border border-outline bg-surface-2 text-2xl text-ink shadow-[inset_0_1px_0_var(--color-highlight)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40"
          onPointerDown={() => startHold(-1)}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
        >
          −
        </button>
        <div
          className={`flex min-h-12 min-w-0 flex-1 items-baseline justify-center gap-1 rounded-[4px] border bg-bg px-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.28)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${
            invalid ? 'border-danger' : 'border-outline focus-within:border-accent'
          }`}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            enterKeyHint="done"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            role="spinbutton"
            aria-invalid={invalid}
            aria-live="polite"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value ?? undefined}
            value={draft}
            onFocus={(e) => {
              setFocused(true);
              e.currentTarget.select();
            }}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw.length > 0 && digitsOnly(raw) !== raw) onNonNumeric?.();
              const next = digitsOnly(raw).slice(0, maxDigits);
              setDraft(next);
              if (next.length === 0) {
                valueRef.current = null;
                onChange(null);
                return;
              }
              const parsed = Number.parseInt(next, 10);
              if (!Number.isNaN(parsed)) {
                valueRef.current = parsed;
                onChange(parsed);
              }
            }}
            onBlur={(e) => {
              setFocused(false);
              commit(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
            className="min-w-0 flex-1 bg-transparent text-center font-oswald text-[28px] leading-none tracking-wide text-accent outline-none"
          />
          <span className="pr-2 font-bevietnam text-base text-ink-muted">{unit}</span>
        </div>
        <button
          type="button"
          aria-label={`Tăng ${label}`}
          aria-disabled={atMax}
          disabled={atMax}
          className="flex min-h-12 min-w-12 items-center justify-center rounded-[4px] border border-outline bg-surface-2 text-2xl text-ink shadow-[inset_0_1px_0_var(--color-highlight)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40"
          onPointerDown={() => startHold(1)}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
        >
          +
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
