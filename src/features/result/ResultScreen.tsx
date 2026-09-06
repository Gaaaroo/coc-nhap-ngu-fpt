import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { DogTagCard } from '../../components/ui/DogTagCard';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function ResultScreen() {
  const result = useSession((s) => s.result);
  const go = useSession((s) => s.go);

  if (!result) return null;

  return (
    <ScreenShell
      eyebrow={copy.result.eyebrow}
      title={copy.result.title}
      footer={<Button onClick={() => go('knowledge')}>{copy.cta.readTips}</Button>}
    >
      <div className="mt-1">
        <DogTagCard result={result} />
      </div>
    </ScreenShell>
  );
}
