import { useEffect, useRef } from 'react';
import { copy } from '../../config/copy.config';
import { Button } from './Button';

interface Props {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
}

export function SkipConfirm({ open, onStay, onLeave }: Props) {
  const stayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    stayRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onStay();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onStay]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4"
      role="presentation"
      onClick={onStay}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skip-title"
        aria-describedby="skip-body"
        className="relative w-full max-w-[430px] overflow-hidden rounded-[4px] border border-outline bg-disclaimer-bg p-4 shadow-[inset_0_1px_0_var(--color-highlight)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-brass" />
        <p id="skip-title" className="font-oswald text-lg tracking-wide text-brass">
          {copy.skip.title}
        </p>
        <p id="skip-body" className="mt-2 text-sm leading-relaxed text-ink">
          {copy.skip.body}
        </p>
        <div className="mt-4 space-y-2">
          <Button ref={stayRef} onClick={onStay}>
            {copy.skip.stay}
          </Button>
          <Button variant="danger" onClick={onLeave}>
            {copy.skip.leave}
          </Button>
        </div>
      </div>
    </div>
  );
}
