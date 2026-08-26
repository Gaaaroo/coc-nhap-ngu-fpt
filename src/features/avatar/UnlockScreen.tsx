import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function UnlockScreen() {
  const reduce = useReducedMotion();
  const go = useSession((s) => s.go);

  useEffect(() => {
    const ms = reduce ? 200 : 900;
    const id = window.setTimeout(() => go('avatarUpload'), ms);
    return () => window.clearTimeout(id);
  }, [go, reduce]);

  return (
    <ScreenShell
      eyebrow={copy.unlock.eyebrow}
      title={copy.unlock.title}
      footer={<Button onClick={() => go('avatarUpload')}>{copy.cta.makeAvatar}</Button>}
    >
      <div className="flex min-h-[44vh] flex-col items-center justify-center">
        <motion.div
          initial={reduce ? false : { scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative flex h-44 w-44 items-center justify-center border-2 border-brass bg-surface shadow-[inset_0_0_0_8px_var(--color-bg),0_0_0_2px_var(--color-brass-deep)]"
        >
          <span className="absolute top-3 left-3 h-2 w-2 bg-brass" />
          <span className="absolute top-3 right-3 h-2 w-2 bg-brass" />
          <span className="absolute bottom-3 left-3 h-2 w-2 bg-brass" />
          <span className="absolute right-3 bottom-3 h-2 w-2 bg-brass" />
          <span className="font-oswald text-base tracking-[0.22em] text-brass">
            {copy.unlock.badge}
          </span>
        </motion.div>
      </div>
    </ScreenShell>
  );
}
