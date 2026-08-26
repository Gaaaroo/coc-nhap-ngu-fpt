const STEPS = [
  'step_landing',
  'step_intake',
  'step_fitness',
  'step_quiz_done',
  'step_result',
  'step_knowledge_done',
  'step_avatar_exported',
  'step_done',
  'step_reset',
  'step_calculating',
  'step_quiz',
  'step_knowledge',
  'step_avatarUnlock',
  'step_avatarUpload',
  'step_avatarCrop',
  'step_avatarPreview',
] as const;

export type AnalyticsStep = (typeof STEPS)[number] | `step_${string}`;

export function track(name: AnalyticsStep): void {
  const url = import.meta.env.VITE_ANALYTICS_URL as string | undefined;
  if (!url) return;
  const body = JSON.stringify({ n: name, t: Date.now() });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
      return;
    }
    void fetch(url, { method: 'POST', body, keepalive: true, mode: 'no-cors' });
  } catch {
    /* never block UI */
  }
}
