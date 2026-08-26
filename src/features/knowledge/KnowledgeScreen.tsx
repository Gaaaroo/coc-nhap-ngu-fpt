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
      eyebrow="Bí kíp tân binh"
      title={card.title}
      onBack={index === 0 ? goBack : undefined}
      progress={{
        value: index + 1,
        max: knowledgeCards.length,
        label: `Thẻ ${index + 1}/${knowledgeCards.length}`,
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
              Trước
            </Button>
            <Button onClick={() => setKnowledgeIndex(index + 1)}>Tiếp</Button>
          </div>
        )
      }
    >
      <article className="relative rounded-[4px] border border-outline bg-surface p-4">
        <p className="font-oswald text-xs tracking-[0.16em] text-brass uppercase">
          {copy.groups[card.group]}
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink">{card.body}</p>
        {next ? (
          <p className="mt-6 truncate text-sm text-ink-muted">Tiếp: {next.title}</p>
        ) : null}
      </article>
    </ScreenShell>
  );
}
