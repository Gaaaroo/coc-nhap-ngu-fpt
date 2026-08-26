import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { track } from '../../lib/analytics';
import { useSession } from '../../store/session.store';
import { useEffect } from 'react';

export function DoneScreen() {
  const reset = useSession((s) => s.reset);

  useEffect(() => {
    track('step_done');
  }, []);

  return (
    <ScreenShell
      eyebrow={copy.event}
      title={copy.done.title}
      footer={<Button onClick={reset}>{copy.cta.newRound}</Button>}
    >
      <p className="text-lg leading-relaxed text-ink">{copy.done.body}</p>
    </ScreenShell>
  );
}
