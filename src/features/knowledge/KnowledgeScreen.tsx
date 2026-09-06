import { cardsForWeaknesses } from '../../config/knowledge.config';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function KnowledgeScreen() {
  const result = useSession((s) => s.result);
  const index = useSession((s) => s.knowledgeIndex);
  const setKnowledgeIndex = useSession((s) => s.setKnowledgeIndex);
  const completeKnowledge = useSession((s) => s.completeKnowledge);
  const goBack = useSession((s) => s.goBack);

  if (!result) return null;

  const cards = cardsForWeaknesses(result.weaknesses);
  if (cards.length === 0) return null;

  const safeIndex = Math.min(Math.max(0, index), cards.length - 1);
  const card = cards[safeIndex];
  const last = safeIndex === cards.length - 1;
  const next = cards[safeIndex + 1];

  return (
    <ScreenShell
      eyebrow={copy.knowledge.eyebrow}
      title={card.title}
      onBack={safeIndex === 0 ? goBack : undefined}
      progress={{
        value: safeIndex + 1,
        max: cards.length,
        label: copy.knowledge.counter(safeIndex + 1, cards.length),
      }}
      footer={
        last ? (
          <Button onClick={completeKnowledge}>{copy.cta.unlockFrame}</Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={safeIndex === 0}
              onClick={() => setKnowledgeIndex(Math.max(0, safeIndex - 1))}
            >
              {copy.knowledge.prev}
            </Button>
            <Button onClick={() => setKnowledgeIndex(safeIndex + 1)}>{copy.knowledge.next}</Button>
          </div>
        )
      }
    >
      <p className="mb-3 text-sm leading-snug text-ink-muted">{copy.knowledge.forDefects}</p>
      <article className="plate relative p-4">
        <p className="font-oswald text-[11px] tracking-[0.18em] text-brass uppercase">
          {copy.groups[card.group]}
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink">{card.body}</p>
      </article>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy.knowledge.note}</p>
      {next ? (
        <p className="plate mt-3 truncate px-3 py-2 text-sm text-ink-muted">
          <span className="mr-2 font-oswald tracking-[0.12em] text-brass uppercase">
            {copy.knowledge.nextUp}
          </span>
          {next.title}
        </p>
      ) : null}
    </ScreenShell>
  );
}
