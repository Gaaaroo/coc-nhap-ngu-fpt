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
      eyebrow="Bước 2"
      title="Thanh lò xo 20 giây"
      onBack={goBack}
      footer={
        <Button onClick={() => go('quiz')}>{copy.cta.logFitness}</Button>
      }
    >
      <p className="text-base leading-relaxed text-ink">
        Tình nguyện viên đếm số lần gập trong 20 giây. Thanh {kg}kg theo giới tính đã chọn. App
        không đo tự động — chỉ ghi nhận kết quả.
      </p>
      <div className="mt-4">
        <NumberStepper
          label="Số lần gập"
          unit="lần"
          value={reps}
          min={METRIC_LIMITS.reps.min}
          max={METRIC_LIMITS.reps.max}
          onChange={setFitness}
        />
      </div>
      <p className="mt-3 text-sm text-ink-muted">{copy.experienceLabel} — chưa phải chuẩn y khoa.</p>
    </ScreenShell>
  );
}
