import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { copy } from '../../config/copy.config';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';
import { track } from '../../lib/analytics';

export function CalculatingScreen() {
  const reduce = useReducedMotion();
  const go = useSession((s) => s.go);

  useEffect(() => {
    track('step_calculating');
    const ms = reduce ? 200 : 2000;
    const id = window.setTimeout(() => {
      if (useSession.getState().step !== 'calculating') return;
      go('result', 'replace');
      track('step_result');
    }, ms);
    return () => window.clearTimeout(id);
  }, [go, reduce]);

  return (
    <ScreenShell eyebrow={copy.calculating.eyebrow} title={copy.calculating.title}>
      <div className="flex min-h-[44vh] flex-col items-center justify-center">
        <motion.div
          initial={reduce ? false : { scale: 1.18, opacity: 0.4, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative flex h-32 w-32 items-center justify-center border-2 border-brass bg-surface shadow-[inset_0_0_0_6px_var(--color-bg),0_0_0_2px_var(--color-brass-deep)]"
        >
          <span className="absolute top-2 left-2 h-2 w-2 bg-brass" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-brass" />
          <span className="absolute bottom-2 left-2 h-2 w-2 bg-brass" />
          <span className="absolute right-2 bottom-2 h-2 w-2 bg-brass" />
          <p className="font-oswald text-sm tracking-[0.18em] text-brass">{copy.calculating.stamp}</p>
        </motion.div>
      </div>
    </ScreenShell>
  );
}
