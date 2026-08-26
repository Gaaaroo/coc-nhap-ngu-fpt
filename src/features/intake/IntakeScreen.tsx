import { calcBmi, roundBmiDisplay } from '../../domain/bmi';
import { METRIC_LIMITS } from '../../domain/types';
import { scoringConfig } from '../../config/scoring.config';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { NumberStepper } from '../../components/ui/NumberStepper';
import { OptionCard } from '../../components/ui/OptionCard';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function IntakeScreen() {
  const metrics = useSession((s) => s.metrics);
  const setMetrics = useSession((s) => s.setMetrics);
  const go = useSession((s) => s.go);
  const goBack = useSession((s) => s.goBack);

  const age = metrics.age ?? METRIC_LIMITS.age.default;
  const height = metrics.heightCm ?? METRIC_LIMITS.heightCm.default;
  const weight = metrics.weightKg ?? METRIC_LIMITS.weightKg.default;
  const gender = metrics.gender;
  const bmi = calcBmi({ heightCm: height, weightKg: weight }, scoringConfig);

  return (
    <ScreenShell
      eyebrow="Bước 1"
      title="Chỉ số hình thể"
      onBack={goBack}
      footer={
        <>
          <Button disabled={!gender} onClick={() => gender && go('fitness')}>
            {copy.cta.continue}
          </Button>
          {!gender ? (
            <p className="mt-2 text-center text-sm text-ink-muted">Chọn nam hoặc nữ để tiếp tục</p>
          ) : null}
        </>
      }
    >
      <div className="space-y-2">
        <OptionCard selected={gender === 'female'} onSelect={() => setMetrics({ gender: 'female' })}>
          Nữ — thanh 20kg
        </OptionCard>
        <OptionCard selected={gender === 'male'} onSelect={() => setMetrics({ gender: 'male' })}>
          Nam — thanh 30kg
        </OptionCard>
      </div>
      <div className="mt-4 space-y-3">
        <NumberStepper
          label="Tuổi"
          unit="tuổi"
          value={age}
          min={METRIC_LIMITS.age.min}
          max={METRIC_LIMITS.age.max}
          onChange={(v) => setMetrics({ age: v })}
        />
        <NumberStepper
          label="Chiều cao"
          unit="cm"
          value={height}
          min={METRIC_LIMITS.heightCm.min}
          max={METRIC_LIMITS.heightCm.max}
          onChange={(v) => setMetrics({ heightCm: v })}
        />
        <NumberStepper
          label="Cân nặng"
          unit="kg"
          value={weight}
          min={METRIC_LIMITS.weightKg.min}
          max={METRIC_LIMITS.weightKg.max}
          onChange={(v) => setMetrics({ weightKg: v })}
        />
      </div>
      <div className="mt-4 rounded-[4px] border-2 border-brass bg-surface p-3">
        <p className="font-oswald text-xs tracking-[0.16em] text-brass uppercase">
          {copy.bodyIndex}
        </p>
        <p className="font-oswald text-4xl text-brass">{roundBmiDisplay(bmi.value)}</p>
        <p className="text-sm text-ink-muted">{bmi.label}</p>
      </div>
    </ScreenShell>
  );
}
