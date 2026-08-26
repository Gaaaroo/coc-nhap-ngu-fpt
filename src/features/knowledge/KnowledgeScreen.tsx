import { knowledgeCards } from '../../config/knowledge.config';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function KnowledgeScreen() {
  const index = useSession((s) => s.knowledgeIndex);
  const setKnowledgeIndex = useSession((s) => s.setKnowledgeIndex);
  const completeKnowledge = useSession((s) => s.completeKnowledge);
  const goBack = useSession((s) => s.goBack);
  const card = knowledgeCards[index];
  const last = index === knowledgeCards.length - 1;
  const next = knowledgeCards[index + 1];

  return (
    <ScreenShell
      eyebrow={copy.knowledge.eyebrow}
      title={card.title}
      onBack={index === 0 ? goBack : undefined}
      progress={{
        value: index + 1,
        max: knowledgeCards.length,
        label: copy.knowledge.counter(index + 1, knowledgeCards.length),
      }}
      footer={
        last ? (
          <Button onClick={completeKnowledge}>{copy.cta.unlockFrame}</Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={index === 0}
              onClick={() => setKnowledgeIndex(Math.max(0, index - 1))}
            >
              {copy.knowledge.prev}
            </Button>
            <Button onClick={() => setKnowledgeIndex(index + 1)}>{copy.knowledge.next}</Button>
          </div>
        )
      }
    >
      <article className="plate relative p-4">
        <p className="font-oswald text-[11px] tracking-[0.18em] text-brass uppercase">
          {copy.groups[card.group]}
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink">{card.body}</p>
      </article>
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
