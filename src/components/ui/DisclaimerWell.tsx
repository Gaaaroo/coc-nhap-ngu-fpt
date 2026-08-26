import { copy } from '../../config/copy.config';

export function DisclaimerWell() {
  return (
    <aside className="rounded-[4px] border border-outline bg-disclaimer-bg p-3">
      <p className="font-oswald text-xs tracking-[0.14em] text-brass uppercase">
        {copy.disclaimer.title}
      </p>
      <p className="mt-2 text-[14px] leading-snug text-ink">{copy.disclaimer.body}</p>
    </aside>
  );
}
