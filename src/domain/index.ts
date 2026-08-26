import { calcBmi } from './bmi';
import { calcFitness } from './fitness';
import { calcGroupScores } from './quiz';
import { composeResult } from './score';
import type { BodyMetrics, Question, QuizAnswers, ScoreResult, ScoringConfig } from './types';

export function scoreSession(
  metrics: BodyMetrics,
  reps: number,
  answers: QuizAnswers,
  questions: Question[],
  cfg: ScoringConfig,
): ScoreResult {
  const bmi = calcBmi(metrics, cfg);
  const fitness = calcFitness(reps, metrics.gender, cfg);
  const groups = calcGroupScores(answers, questions);
  return composeResult(bmi, fitness, groups, cfg);
}
