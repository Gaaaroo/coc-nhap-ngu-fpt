import { copy } from '../../config/copy.config';
import { roundBmiDisplay } from '../../domain/bmi';
import { SCORE_GROUPS } from '../../domain/types';
import type { ScoreGroup, ScoreResult } from '../../domain/types';

interface Props {
  result: ScoreResult;
}

function round0(n: number): number {
  return Math.round(n);
}

function Pip({ kind }: { kind: 'healthy' | 'defect' }) {
  return (
    <span
      aria-hidden
      className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-[2px] font-oswald text-xs text-on-brass ${
        kind === 'healthy' ? 'bg-healthy' : 'bg-defect'
      }`}
    >
      {kind === 'healthy' ? '✓' : '!'}
    </span>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="min-w-0">
      <p className="font-oswald text-[11px] tracking-[0.14em] text-brass uppercase">{label}</p>
      <p className="mt-1 font-oswald text-[28px] leading-none tracking-wide text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{note}</p>
    </div>
  );
}

function GroupLine({
  id,
  score,
  mark,
}: {
  id: ScoreGroup;
  score: number;
  mark: 'healthy' | 'defect' | null;
}) {
  const width = Math.max(0, Math.min(100, score));
  return (
    <li className="flex items-center gap-2">
      <span className="w-[5.5rem] shrink-0 text-sm text-ink">{copy.groups[id]}</span>
      <span className="relative h-2 min-w-0 flex-1 rounded-full bg-surface-2">
        <span
          className={`absolute inset-y-0 left-0 rounded-full ${
            mark === 'healthy' ? 'bg-healthy' : mark === 'defect' ? 'bg-defect' : 'bg-brass'
          }`}
          style={{ width: `${width}%` }}
        />
      </span>
      <span className="w-8 shrink-0 text-right font-oswald text-sm tabular-nums text-ink">
        {round0(score)}
      </span>
    </li>
  );
}

export function DogTagCard({ result }: Props) {
  const total = round0(result.total);
  const markOf = (g: ScoreGroup): 'healthy' | 'defect' | null => {
    if (result.strengths.includes(g)) return 'healthy';
    if (result.weaknesses.includes(g)) return 'defect';
    return null;
  };

  return (
    <article className="plate-brass relative p-4 pl-7">
      <span
        aria-hidden
        className="absolute top-5 left-2.5 h-3.5 w-3.5 rounded-full border-2 border-brass bg-bg shadow-[inset_0_0_0_3px_var(--color-surface)]"
      />

      <p className="font-oswald text-[11px] tracking-[0.18em] text-brass uppercase">
        {copy.referenceOnly}
      </p>
      <p className="mt-1 font-oswald text-[12px] tracking-[0.22em] text-ink-muted uppercase">
        {copy.recruitScore}
      </p>
      <p className="mt-1 flex items-baseline gap-1 font-oswald leading-none">
        <span className="text-[48px] tracking-wide text-brass">{total}</span>
        <span className="text-base tracking-wide text-ink-muted">{copy.result.of100}</span>
      </p>
      <p className="mt-2 inline-flex items-center border border-brass bg-surface px-2 py-1 font-oswald text-[12px] tracking-[0.14em] text-brass uppercase">
        {copy.result.tiers[result.overallTier]}
      </p>
      <p className="mt-1 text-[12px] text-ink-muted">{copy.result.overallHint}</p>
      <p className="mt-2 text-sm leading-snug text-ink-muted">{copy.result.mix}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink">
        {copy.result.summary(
          copy.groups[result.strengths[0]],
          copy.groups[result.strengths[1]],
          copy.groups[result.weaknesses[0]],
          copy.groups[result.weaknesses[1]],
        )}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-outline pt-3">
        <Metric
          label={copy.result.body}
          value={roundBmiDisplay(result.bmi.value).replace('.', ',')}
          note={`${copy.result.bmiUnit} · ${result.bmi.label}`}
        />
        <Metric
          label={copy.result.strength}
          value={String(result.physicalScore)}
          note={`${result.fitness.reps} ${copy.fitness.repsUnit} · ${result.fitness.label}`}
        />
      </div>
      <p className="mt-2 text-[13px] leading-snug text-ink-muted">
        {copy.result.converted(result.physicalScore)}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-outline pt-3">
        <div>
          <p className="mb-2 flex items-center font-oswald text-[11px] tracking-[0.12em] text-healthy uppercase">
            <Pip kind="healthy" />
            {copy.healthy}
          </p>
          <ul className="space-y-1 text-sm text-ink">
            {result.strengths.map((g) => (
              <li key={g} className="flex justify-between gap-2">
                <span>{copy.groups[g]}</span>
                <span className="font-oswald tabular-nums text-healthy">
                  {round0(result.scores[g])}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 flex items-center font-oswald text-[11px] tracking-[0.12em] text-defect uppercase">
            <Pip kind="defect" />
            {copy.defect}
          </p>
          <ul className="space-y-1 text-sm text-ink">
            {result.weaknesses.map((g) => (
              <li key={g} className="flex justify-between gap-2">
                <span>{copy.groups[g]}</span>
                <span className="font-oswald tabular-nums text-defect">
                  {round0(result.scores[g])}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 border-t border-outline pt-3">
        <p className="mb-2 font-oswald text-[11px] tracking-[0.14em] text-brass uppercase">
          {copy.result.allGroups}
        </p>
        <ul className="space-y-2">
          {SCORE_GROUPS.map((g) => (
            <GroupLine key={g} id={g} score={result.scores[g]} mark={markOf(g)} />
          ))}
        </ul>
      </div>
    </article>
  );
}
