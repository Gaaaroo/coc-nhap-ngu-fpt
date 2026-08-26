import type { GroupScore, LifestyleGroup, Question, QuizAnswers } from './types';
import { LIFESTYLE_GROUPS } from './types';

export function calcGroupScores(
  answers: QuizAnswers,
  questions: Question[],
): Record<LifestyleGroup, GroupScore> {
  const result = {} as Record<LifestyleGroup, GroupScore>;

  for (const group of LIFESTYLE_GROUPS) {
    const groupQuestions = questions.filter((q) => q.group === group);
    let raw = 0;
    let max = 0;
    for (const q of groupQuestions) {
      const optionMax = Math.max(...q.options.map((o) => o.score));
      max += optionMax;
      const chosen = q.options.find((o) => o.id === answers[q.id]);
      raw += chosen?.score ?? 0;
    }
    result[group] = {
      group,
      raw,
      max,
      normalized: max === 0 ? 0 : (raw / max) * 100,
    };
  }

  return result;
}
