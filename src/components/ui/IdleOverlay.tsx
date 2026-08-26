import { copy } from '../../config/copy.config';
import { Button } from './Button';

interface Props {
  seconds: number;
  onStay: () => void;
  onReset: () => void;
}

export function IdleOverlay({ seconds, onStay, onReset }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4">
      <div className="w-full max-w-[430px] rounded-[4px] border border-danger bg-disclaimer-bg p-4">
        <p className="font-oswald text-lg tracking-wide text-danger">{copy.idle.title}</p>
        <p className="mt-2 text-sm text-ink">{copy.idle.body}</p>
        <p className="mt-3 font-oswald text-4xl text-brass" aria-live="assertive">
          {seconds}s
        </p>
        <div className="mt-4 space-y-2">
          <Button onClick={onStay}>{copy.cta.stay}</Button>
          <Button variant="danger" onClick={onReset}>
            {copy.cta.reset}
          </Button>
        </div>
      </div>
    </div>
  );
}
