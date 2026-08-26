import { copy } from '../../config/copy.config';
import type { LifestyleGroup, ScoreResult } from '../../domain/types';

interface Props {
  result: ScoreResult;
}

function Pip({ kind }: { kind: 'healthy' | 'defect' }) {
  return (
    <span
      aria-hidden
      className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-[2px] text-xs font-oswald ${
        kind === 'healthy' ? 'bg-healthy text-on-brass' : 'bg-defect text-on-brass'
      }`}
    >
      {kind === 'healthy' ? '+' : '!'}
    </span>
  );
}

function GroupName({ id }: { id: LifestyleGroup }) {
  return <span>{copy.groups[id]}</span>;
}

export function DogTagCard({ result }: Props) {
  return (
    <article className="rounded-[4px] border-2 border-brass bg-surface p-4 shadow-[inset_0_1px_0_#ffffff14]">
      <p className="font-oswald text-xs tracking-[0.16em] text-brass uppercase">
        {copy.experienceLabel}
      </p>
      <p className="mt-1 font-oswald text-[13px] tracking-[0.2em] text-ink-muted uppercase">
        {copy.recruitScore}
      </p>
      <p className="font-oswald text-[40px] leading-none tracking-wide text-brass">
        {Math.round(result.total)}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-outline pt-3">
        <div>
          <p className="mb-2 flex items-center font-oswald text-xs tracking-wide text-healthy uppercase">
            <Pip kind="healthy" />
            {copy.healthy}
          </p>
          <ul className="space-y-1 text-sm text-ink">
            {result.strengths.map((g) => (
              <li key={g}>
                <GroupName id={g} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 flex items-center font-oswald text-xs tracking-wide text-defect uppercase">
            <Pip kind="defect" />
            {copy.defect}
          </p>
          <ul className="space-y-1 text-sm text-ink">
            {result.weaknesses.map((g) => (
              <li key={g}>
                <GroupName id={g} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
