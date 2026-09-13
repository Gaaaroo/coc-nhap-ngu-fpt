import { copy } from '../../config/copy.config';

export function DisclaimerWell() {
  return (
    <aside className="relative overflow-hidden rounded-[4px] border border-outline bg-disclaimer-bg p-3 pl-4 shadow-[inset_0_1px_0_var(--color-highlight)]">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-accent" />
      <p className="font-oswald text-[11px] tracking-[0.16em] text-accent uppercase">
        {copy.disclaimer.title}
      </p>
      <p className="mt-2 text-[14px] leading-relaxed text-ink">{copy.disclaimer.body}</p>
    </aside>
  );
}
