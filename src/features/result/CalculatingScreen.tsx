import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';
import { track } from '../../lib/analytics';

export function CalculatingScreen() {
  const reduce = useReducedMotion();
  const go = useSession((s) => s.go);

  useEffect(() => {
    track('step_calculating');
    const ms = reduce ? 200 : 1800;
    const id = window.setTimeout(() => {
      go('result');
      track('step_result');
    }, ms);
    return () => window.clearTimeout(id);
  }, [go, reduce]);

  return (
    <ScreenShell eyebrow="Đóng dấu" title="Đang chấm phiên gác">
      <div className="flex min-h-[40vh] flex-col items-center justify-center">
        <div className="h-24 w-24 rounded-[4px] border-2 border-brass shadow-[inset_0_0_0_4px_#141810,0_0_0_2px_#b45309]" />
        <p className="mt-6 font-oswald text-xl tracking-[0.2em] text-brass">ĐÓNG DẤU</p>
      </div>
    </ScreenShell>
  );
}
