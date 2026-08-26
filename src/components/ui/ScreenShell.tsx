import type { ReactNode } from 'react';
import { copy } from '../../config/copy.config';
import { Button } from './Button';
import { ProgressBelt } from './ProgressBelt';

interface Props {
  eyebrow?: string;
  title?: string;
  progress?: { value: number; max: number; label: string };
  onBack?: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

export function ScreenShell({ eyebrow, title, progress, onBack, footer, children }: Props) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-bg text-ink">
      <header
        className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3"
      >
        <div className="flex items-center gap-2">
          {onBack ? (
            <Button variant="ghost" className="min-h-12 min-w-12 px-0" onClick={onBack}>
              {copy.cta.back}
            </Button>
          ) : (
            <span className="font-oswald text-[11px] tracking-[0.22em] text-brass">
              {copy.event}
            </span>
          )}
        </div>
        {eyebrow ? (
          <p className="mt-2 font-oswald text-xs tracking-[0.16em] text-brass uppercase">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h1 className="mt-1 font-oswald text-2xl font-semibold tracking-wide text-ink">
            {title}
          </h1>
        ) : null}
        {progress ? (
          <div className="mt-3">
            <ProgressBelt {...progress} />
          </div>
        ) : null}
      </header>
      <main className="flex-1 overflow-y-auto px-4 pb-4">{children}</main>
      {footer ? (
        <footer className="sticky bottom-0 border-t border-outline bg-bg px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {footer}
        </footer>
      ) : null}
    </div>
  );
}
