import { useEffect, useState } from 'react';
import { questions } from '../../config/questions.config';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { OptionCard } from '../../components/ui/OptionCard';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function QuizScreen() {
  const quizIndex = useSession((s) => s.quizIndex);
  const answers = useSession((s) => s.answers);
  const answerAndAdvance = useSession((s) => s.answerAndAdvance);
  const quizBack = useSession((s) => s.quizBack);
  const finishQuiz = useSession((s) => s.finishQuiz);
  const [pending, setPending] = useState<string | null>(null);

  const last = quizIndex >= questions.length - 1;
  const question = questions[Math.min(quizIndex, questions.length - 1)];
  const selected = pending ?? answers[question.id];

  useEffect(() => {
    setPending(null);
  }, [question.id]);

  const choose = (optionId: string) => {
    if (last) {
      setPending(optionId);
      answerAndAdvance(question.id, optionId);
      return;
    }
    if (pending) return;
    setPending(optionId);
    window.setTimeout(() => answerAndAdvance(question.id, optionId), 250);
  };

  return (
    <ScreenShell
      eyebrow={copy.groups[question.group]}
      title={copy.quiz.title}
      onBack={quizBack}
      progress={{
        value: Math.min(quizIndex + 1, questions.length),
        max: questions.length,
        label: copy.quiz.counter(Math.min(quizIndex + 1, questions.length), questions.length),
      }}
      footer={
        last ? (
          <>
            <Button disabled={!selected} onClick={finishQuiz}>
              {copy.cta.seeResult}
            </Button>
            {!selected ? (
              <p className="mt-2 text-center text-sm text-danger">{copy.quiz.needAll}</p>
            ) : null}
          </>
        ) : undefined
      }
    >
      <p className="text-lg font-medium leading-snug text-ink">{question.prompt}</p>
      <div className="mt-4 space-y-2">
        {question.options.map((opt, i) => (
          <OptionCard
            key={opt.id}
            selected={selected === opt.id}
            onSelect={() => choose(opt.id)}
          >
            <span className="mr-3 inline-block w-6 font-oswald text-brass">
              {String.fromCharCode(65 + i)}
            </span>
            {opt.label}
          </OptionCard>
        ))}
      </div>
    </ScreenShell>
  );
}
