import { copy } from '../../config/copy.config';
import { METRIC_LIMITS } from '../../domain/types';
import { Button } from '../../components/ui/Button';
import { NumberStepper } from '../../components/ui/NumberStepper';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function FitnessScreen() {
  const gender = useSession((s) => s.metrics.gender);
  const reps = useSession((s) => s.fitness.reps ?? 0);
  const setFitness = useSession((s) => s.setFitness);
  const go = useSession((s) => s.go);
  const goBack = useSession((s) => s.goBack);
  const kg = gender === 'male' ? 30 : 20;

  return (
    <ScreenShell
      eyebrow={copy.fitness.eyebrow}
      title={`${copy.fitness.title} ${kg}kg`}
      onBack={goBack}
      footer={<Button onClick={() => go('quiz')}>{copy.cta.continue}</Button>}
    >
      <div className="flex items-center justify-between gap-3 border border-outline bg-surface px-3 py-3 shadow-[inset_0_1px_0_var(--color-highlight)]">
        <p className="font-oswald text-sm tracking-[0.12em] text-brass uppercase">
          {copy.fitness.bar(kg)}
        </p>
        <p className="font-oswald text-2xl tabular-nums tracking-wide text-ink">{copy.fitness.timer}</p>
      </div>
      <p className="plate mt-3 px-3 py-3 text-base leading-relaxed text-ink">{copy.fitness.guide}</p>
      <div className="mt-4">
        <NumberStepper
          label={copy.fitness.reps}
          unit={copy.fitness.repsUnit}
          value={reps}
          min={METRIC_LIMITS.reps.min}
          max={METRIC_LIMITS.reps.max}
          onChange={setFitness}
        />
      </div>
      <p className="mt-3 text-sm text-ink-muted">{copy.referenceOnly}</p>
    </ScreenShell>
  );
}
