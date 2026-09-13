import { motion, useReducedMotion } from 'framer-motion';
import { avatarConfig } from '../../config/avatar.config';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { frameTitleOf } from '../../domain/frame';
import { useSession } from '../../store/session.store';

export function UnlockScreen() {
  const reduce = useReducedMotion();
  const go = useSession((s) => s.go);
  const total = useSession((s) => s.result?.total ?? 0);
  const frameTitle = frameTitleOf(total, copy.frameRanks);
  const frameSrc = avatarConfig.frameOverlayUrl;

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
          className="flex w-full max-w-[20rem] flex-col items-center"
        >
          {frameSrc ? (
            <img
              src={frameSrc}
              alt=""
              width={1080}
              height={1080}
              className="aspect-square w-full bg-bg"
            />
          ) : (
            <div className="relative flex min-h-44 w-full items-center justify-center border-2 border-brass bg-surface px-3 py-6 shadow-[inset_0_0_0_8px_var(--color-bg),0_0_0_2px_var(--color-brass-deep)]">
              <span className="absolute top-3 left-3 h-2 w-2 bg-brass" />
              <span className="absolute top-3 right-3 h-2 w-2 bg-brass" />
              <span className="absolute bottom-3 left-3 h-2 w-2 bg-brass" />
              <span className="absolute right-3 bottom-3 h-2 w-2 bg-brass" />
            </div>
          )}
          <span className="mt-4 px-3 text-center font-oswald text-sm leading-[1.35] tracking-[0.12em] text-brass">
            {frameTitle}
          </span>
        </motion.div>
      </div>
    </ScreenShell>
  );
}
