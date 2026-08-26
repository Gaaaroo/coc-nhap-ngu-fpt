import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { DisclaimerWell } from '../../components/ui/DisclaimerWell';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function LandingScreen() {
  const start = useSession((s) => s.start);

  return (
    <ScreenShell
      footer={<Button onClick={start}>{copy.cta.start}</Button>}
    >
      <p className="font-oswald text-xs tracking-[0.28em] text-brass">{copy.event}</p>
      <h1 className="mt-4 font-oswald text-[40px] font-bold leading-[1.05] tracking-[0.04em] text-ink">
        {copy.codeName}
      </h1>
      <p className="mt-3 font-oswald text-lg tracking-[0.06em] text-brass">{copy.tagline}</p>
      <div className="mt-6 h-px bg-brass-deep" />
      <p className="mt-6 text-base leading-relaxed text-ink-muted">
        Nhập chỉ số, gập thanh lò xo, trả lời lối sống. Biết điểm khỏe, bẻ điểm khuyết. Mở khung
        tân binh — không tài khoản, không lưu dữ liệu.
      </p>
      <div className="mt-6">
        <DisclaimerWell />
      </div>
    </ScreenShell>
  );
}
