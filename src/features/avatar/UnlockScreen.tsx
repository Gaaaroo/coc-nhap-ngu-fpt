import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
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
      eyebrow="Phần thưởng"
      title="Khung tân binh đã mở"
      footer={
        <Button onClick={() => go('avatarUpload')}>{copy.cta.makeAvatar}</Button>
      }
    >
      <div className="flex min-h-[40vh] flex-col items-center justify-center">
        <div className="relative h-40 w-40 border-2 border-brass">
          <span className="absolute inset-3 border border-brass-deep" />
          <span className="absolute inset-0 flex items-center justify-center font-oswald text-sm tracking-[0.2em] text-brass">
            TÂN BINH
          </span>
        </div>
      </div>
    </ScreenShell>
  );
}
