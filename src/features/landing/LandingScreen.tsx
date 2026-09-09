import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { DisclaimerWell } from '../../components/ui/DisclaimerWell';
import { KeyVisualHero } from '../../components/ui/KeyVisualHero';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function LandingScreen() {
  const start = useSession((s) => s.start);
  const sessionNotice = useSession((s) => s.sessionNotice);

  return (
    <ScreenShell hideBrand hideSkip footer={<Button onClick={start}>{copy.cta.start}</Button>}>
      <div className="flex items-center justify-center gap-3">
        <span
          aria-hidden
          className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-brass bg-bg shadow-[inset_0_0_0_3px_var(--color-surface)]"
        />
        <p className="font-oswald text-[11px] tracking-[0.28em] text-brass">{copy.event}</p>
      </div>
      {sessionNotice ? (
        <p className="mt-4 border border-danger bg-disclaimer-bg px-3 py-2 text-sm leading-relaxed text-danger">
          {sessionNotice}
        </p>
      ) : null}
      <p className="mt-5 text-center font-oswald text-[13px] tracking-[0.24em] text-brass uppercase">
        {copy.landing.boothCode}
      </p>
      {/* leading >= 1.1: chữ hoa tiếng Việt có dấu chồng hai tầng, chật hơn là dấu đâm vào dòng trên */}
      <h1 className="mt-2 text-center font-oswald text-[36px] font-bold leading-[1.12] tracking-[0.04em] text-balance text-ink">
        {copy.tagline}
      </h1>
      <p className="mt-4 text-center text-base leading-relaxed text-pretty text-ink">
        {copy.landing.intro}
      </p>
      <ol className="mt-5 flex items-stretch gap-0 border border-outline bg-surface shadow-[inset_0_1px_0_var(--color-highlight)]">
        {copy.landing.beats.map((beat, i) => (
          <li
            key={beat.n}
            className={`flex min-h-12 flex-1 flex-col justify-center px-2 py-2 text-center ${
              i > 0 ? 'border-l border-outline' : ''
            }`}
          >
            <span className="font-oswald text-[11px] tracking-[0.16em] text-brass">{beat.n}</span>
            <span className="text-[13px] leading-tight text-ink">{beat.label}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <DisclaimerWell />
      </div>
      <div className="-mx-1 mt-5">
        <KeyVisualHero />
      </div>
    </ScreenShell>
  );
}
