import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
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
      eyebrow={copy.result.eyebrow}
      title={copy.result.title}
      footer={<Button onClick={() => go('knowledge')}>{copy.cta.readTips}</Button>}
    >
      <div className="plate px-2 pt-2">
        <Radar values={values} />
      </div>
      <div className="mt-3">
        <DogTagCard result={result} />
      </div>
    </ScreenShell>
  );
}
