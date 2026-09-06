import { useEffect, useRef, useState } from 'react';
import { questions } from '../../config/questions.config';
import { copy } from '../../config/copy.config';
import { OptionCard } from '../../components/ui/OptionCard';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function QuizScreen() {
  const quizIndex = useSession((s) => s.quizIndex);
  const answers = useSession((s) => s.answers);
  const answerAndAdvance = useSession((s) => s.answerAndAdvance);
  const quizBack = useSession((s) => s.quizBack);
  const [pending, setPending] = useState<string | null>(null);
  const advanceTimer = useRef<number | null>(null);

  const question = questions[Math.min(quizIndex, questions.length - 1)];
  const selected = pending ?? answers[question.id];

  useEffect(() => {
    setPending(null);
    return () => {
      if (advanceTimer.current != null) window.clearTimeout(advanceTimer.current);
    };
  }, [question.id]);

  const choose = (optionId: string) => {
    if (pending) return;
    setPending(optionId);
    advanceTimer.current = window.setTimeout(() => answerAndAdvance(question.id, optionId), 250);
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
