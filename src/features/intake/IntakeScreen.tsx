import { useEffect, useState } from 'react';
import { calcBmi, roundBmiDisplay } from '../../domain/bmi';
import { METRIC_LIMITS } from '../../domain/types';
import { hasIntakeErrors, validateIntake, type IntakeErrors } from '../../domain/validate';
import { scoringConfig } from '../../config/scoring.config';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { NumberStepper } from '../../components/ui/NumberStepper';
import { OptionCard } from '../../components/ui/OptionCard';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

const EMPTY_ERRORS: IntakeErrors = {
  gender: null,
  age: null,
  height: null,
  weight: null,
};

export function IntakeScreen() {
  const metrics = useSession((s) => s.metrics);
  const setMetrics = useSession((s) => s.setMetrics);
  const go = useSession((s) => s.go);
  const goBack = useSession((s) => s.goBack);
  const [errors, setErrors] = useState<IntakeErrors>(EMPTY_ERRORS);
  const [digitHint, setDigitHint] = useState<string | null>(null);

  useEffect(() => {
    const current = useSession.getState().metrics;
    if (current.age != null && current.heightCm != null && current.weightKg != null) return;
    setMetrics({
      age: current.age ?? METRIC_LIMITS.age.default,
      heightCm: current.heightCm ?? METRIC_LIMITS.heightCm.default,
      weightKg: current.weightKg ?? METRIC_LIMITS.weightKg.default,
    });
  }, [setMetrics]);

  const age = metrics.age ?? null;
  const height = metrics.heightCm ?? null;
  const weight = metrics.weightKg ?? null;
  const gender = metrics.gender;
  const canBmi = height != null && weight != null && height > 0;
  const bmi = canBmi ? calcBmi({ heightCm: height, weightKg: weight ?? 0 }, scoringConfig) : null;

  const submit = () => {
    const next = validateIntake(metrics);
    setErrors(next);
    setDigitHint(null);
    if (hasIntakeErrors(next)) return;
    go('fitness');
  };

  return (
    <ScreenShell
      eyebrow={copy.intake.eyebrow}
      title={copy.intake.title}
      onBack={goBack}
      footer={
        <>
          <Button onClick={submit}>{copy.cta.continue}</Button>
          {errors.gender ? (
            <p className="mt-2 text-center text-sm text-danger">{errors.gender}</p>
          ) : null}
        </>
      }
    >
      <div className="grid grid-cols-2 gap-2">
        <OptionCard
          invalid={Boolean(errors.gender)}
          selected={gender === 'female'}
          onSelect={() => {
            setMetrics({ gender: 'female' });
            setErrors((e) => ({ ...e, gender: null }));
          }}
        >
          <span className="block font-oswald tracking-wide">{copy.intake.female}</span>
          <span className="mt-1 block text-sm text-ink-muted">{copy.intake.femaleHint}</span>
        </OptionCard>
        <OptionCard
          invalid={Boolean(errors.gender)}
          selected={gender === 'male'}
          onSelect={() => {
            setMetrics({ gender: 'male' });
            setErrors((e) => ({ ...e, gender: null }));
          }}
        >
          <span className="block font-oswald tracking-wide">{copy.intake.male}</span>
          <span className="mt-1 block text-sm text-ink-muted">{copy.intake.maleHint}</span>
        </OptionCard>
      </div>
      <div className="mt-4 space-y-3">
        <NumberStepper
          label={copy.intake.age}
          unit="tuổi"
          value={age}
          min={METRIC_LIMITS.age.min}
          max={METRIC_LIMITS.age.max}
          error={errors.age}
          onNonNumeric={() => setDigitHint(copy.errors.digits)}
          onChange={(v) => {
            setMetrics({ age: v ?? undefined });
            setErrors((e) => ({ ...e, age: null }));
            setDigitHint(null);
          }}
        />
        <NumberStepper
          label={copy.intake.height}
          unit="cm"
          value={height}
          min={METRIC_LIMITS.heightCm.min}
          max={METRIC_LIMITS.heightCm.max}
          error={errors.height}
          onNonNumeric={() => setDigitHint(copy.errors.digits)}
          onChange={(v) => {
            setMetrics({ heightCm: v ?? undefined });
            setErrors((e) => ({ ...e, height: null }));
            setDigitHint(null);
          }}
        />
        <NumberStepper
          label={copy.intake.weight}
          unit="kg"
          value={weight}
          min={METRIC_LIMITS.weightKg.min}
          max={METRIC_LIMITS.weightKg.max}
          error={errors.weight}
          onNonNumeric={() => setDigitHint(copy.errors.digits)}
          onChange={(v) => {
            setMetrics({ weightKg: v ?? undefined });
            setErrors((e) => ({ ...e, weight: null }));
            setDigitHint(null);
          }}
        />
      </div>
      {digitHint ? <p className="mt-2 text-sm text-danger">{digitHint}</p> : null}
      {bmi ? (
        <div className="plate-accent mt-4 p-3">
          <p className="font-oswald text-[11px] tracking-[0.16em] text-accent uppercase">
            {copy.bmiLabel}
          </p>
          <p className="mt-1 font-oswald text-4xl leading-none text-accent">
            {roundBmiDisplay(bmi.value)}
          </p>
          <p className="mt-1 text-sm text-ink-muted">{bmi.label}</p>
        </div>
      ) : null}
    </ScreenShell>
  );
}
