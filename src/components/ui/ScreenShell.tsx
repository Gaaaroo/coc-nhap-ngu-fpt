import { useState, type ReactNode } from 'react';
import { copy } from '../../config/copy.config';
import { useSession } from '../../store/session.store';
import { ProgressBelt } from './ProgressBelt';
import { SkipConfirm } from './SkipConfirm';

interface Props {
  eyebrow?: string;
  title?: string;
  progress?: { value: number; max: number; label: string };
  onBack?: () => void;
  /** Screens that print the wordmark in their own body opt out of the header one. */
  hideBrand?: boolean;
  /** Landing is already the first screen. */
  hideSkip?: boolean;
  footer?: ReactNode;
  children: ReactNode;
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3 w-3 border-brass ${className}`}
    />
  );
}

export function ScreenShell({
  eyebrow,
  title,
  progress,
  onBack,
  hideBrand,
  hideSkip,
  footer,
  children,
}: Props) {
  const brand = !onBack && !hideBrand;
  const showSkip = !hideSkip;
  const showTop = Boolean(onBack || brand || showSkip);
  const reset = useSession((s) => s.reset);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-bg/65 text-ink shadow-[0_0_60px_rgba(4,3,12,0.55)]">
      <Corner className="top-[max(0.5rem,env(safe-area-inset-top))] left-2 border-t-2 border-l-2" />
      <Corner className="top-[max(0.5rem,env(safe-area-inset-top))] right-2 border-t-2 border-r-2" />
      <Corner className="bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-2 border-b-2 border-l-2" />
      <Corner className="bottom-[max(0.5rem,env(safe-area-inset-bottom))] right-2 border-b-2 border-r-2" />

      <header className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        {showTop ? (
          <div className="flex min-h-12 items-center gap-2">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label={copy.cta.back}
                className="flex min-h-12 min-w-12 items-center justify-center rounded-[4px] border border-outline bg-surface text-brass shadow-[inset_0_1px_0_var(--color-highlight)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path
                    d="M11.5 3.5 5.5 9l6 5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            ) : brand ? (
              <span className="font-oswald text-[11px] tracking-[0.28em] text-brass">
                {copy.event}
              </span>
            ) : (
              <span className="flex-1" />
            )}
            {showSkip ? (
              <button
                type="button"
                onClick={() => setConfirm(true)}
                aria-label={copy.cta.skip}
                className="ml-auto flex min-h-12 min-w-12 items-center justify-center rounded-[4px] border border-outline bg-surface text-brass shadow-[inset_0_1px_0_var(--color-highlight)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                  <path
                    d="M3.5 9.5 10 3.5l6.5 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M5.5 8.5v8h3.5v-4h2v4H14.5v-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        ) : null}
        {eyebrow ? (
          <p
            className={`${showTop ? 'mt-3' : 'mt-2'} font-oswald text-[11px] tracking-[0.2em] text-brass uppercase`}
          >
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h1 className="mt-1 font-oswald text-[26px] font-semibold leading-[1.2] tracking-[0.03em] text-balance text-ink">
            {title}
          </h1>
        ) : null}
        {progress ? (
          <div className="mt-3">
            <ProgressBelt {...progress} />
          </div>
        ) : null}
        <div className="mt-3 h-px bg-brass-deep/55" />
      </header>
      <main className="flex-1 overflow-y-auto px-4 pb-4">{children}</main>
      {footer ? (
        <footer className="sticky bottom-0 border-t border-brass-deep/70 bg-bg/88 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-[6px]">
          {footer}
        </footer>
      ) : null}
      <SkipConfirm
        open={confirm}
        onStay={() => setConfirm(false)}
        onLeave={() => {
          setConfirm(false);
          reset();
        }}
      />
    </div>
  );
}
