import { useEffect, useRef, useState } from 'react';

const IDLE_MS = 90_000;
const COUNTDOWN_S = 10;

export function useIdleReset(onReset: () => void, enabled: boolean) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const idleTimer = useRef<number | null>(null);
  const tick = useRef<number | null>(null);
  const remaining = useRef(COUNTDOWN_S);

  const clearAll = () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    if (tick.current) window.clearInterval(tick.current);
    idleTimer.current = null;
    tick.current = null;
  };

  const arm = () => {
    if (!enabled) return;
    clearAll();
    setCountdown(null);
    remaining.current = COUNTDOWN_S;
    idleTimer.current = window.setTimeout(() => {
      setCountdown(COUNTDOWN_S);
      tick.current = window.setInterval(() => {
        remaining.current -= 1;
        if (remaining.current <= 0) {
          clearAll();
          setCountdown(null);
          onReset();
          return;
        }
        setCountdown(remaining.current);
      }, 1000);
    }, IDLE_MS);
  };

  useEffect(() => {
    if (!enabled) {
      clearAll();
      setCountdown(null);
      return;
    }
    const bump = () => arm();
    const evts = ['pointerdown', 'keydown', 'touchstart'] as const;
    evts.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    arm();
    return () => {
      evts.forEach((e) => window.removeEventListener(e, bump));
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- arm on enable only
  }, [enabled]);

  return {
    countdown,
    stay: () => arm(),
  };
}
