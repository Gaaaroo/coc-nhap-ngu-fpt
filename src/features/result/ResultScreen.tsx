import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { DisclaimerWell } from '../../components/ui/DisclaimerWell';
import { DogTagCard } from '../../components/ui/DogTagCard';
import { Radar } from '../../components/ui/Radar';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { LIFESTYLE_GROUPS } from '../../domain/types';
import { useSession } from '../../store/session.store';

export function ResultScreen() {
  const result = useSession((s) => s.result);
  const go = useSession((s) => s.go);

  if (!result) return null;

  const values = Object.fromEntries(
    LIFESTYLE_GROUPS.map((g) => [g, result.groups[g].normalized]),
  ) as Record<(typeof LIFESTYLE_GROUPS)[number], number>;

  return (
    <ScreenShell
      eyebrow="Kết quả phiên"
      title="Bẻ khuyết, biết khỏe"
      footer={<Button onClick={() => go('knowledge')}>{copy.cta.readTips}</Button>}
    >
      <Radar values={values} />
      <div className="mt-2">
        <DogTagCard result={result} />
      </div>
      <p className="mt-3 text-sm text-ink-muted">
        {result.bmi.label} · {result.fitness.label} ({result.fitness.reps} lần)
      </p>
      <div className="mt-4">
        <DisclaimerWell />
      </div>
    </ScreenShell>
  );
}
