import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { track } from '../../lib/analytics';
import { frameTitleOf } from '../../domain/frame';
import { useSession } from '../../store/session.store';
import { useEffect } from 'react';

export function DoneScreen() {
  const reset = useSession((s) => s.reset);
  const total = useSession((s) => s.result?.total ?? 0);
  const frameTitle = frameTitleOf(total, copy.frameRanks);

  useEffect(() => {
    track('step_done');
  }, []);

  return (
    <ScreenShell
      eyebrow={copy.done.eyebrow}
      title={copy.done.title}
      footer={<Button onClick={reset}>{copy.cta.newRound}</Button>}
    >
      <div className="plate-brass flex flex-col items-center px-4 py-8 text-center">
        <span
          aria-hidden
          className="mb-4 h-3.5 w-3.5 rounded-full border-2 border-brass bg-bg shadow-[inset_0_0_0_3px_var(--color-surface)]"
        />
        <p className="font-oswald text-sm tracking-[0.12em] text-brass">{frameTitle}</p>
        <p className="mt-4 text-lg leading-relaxed text-ink">{copy.done.body}</p>
      </div>
    </ScreenShell>
  );
}
