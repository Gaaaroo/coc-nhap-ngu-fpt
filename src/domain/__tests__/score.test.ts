import { describe, expect, it } from 'vitest';
import { pickStrengthsWeaknesses } from '../score';
import { scoreSession } from '../index';
import { calcGroupScores } from '../quiz';
import { questions } from '../../config/questions.config';
import { scoringConfig } from '../../config/scoring.config';
import type { QuizAnswers, ScoreTopic } from '../types';
import { LIFESTYLE_GROUPS } from '../types';

function topicsFrom(values: Partial<Record<ScoreTopic, number>> = {}): Record<ScoreTopic, number> {
  return {
    sleep: 50,
    nutrition: 50,
    hydration: 50,
    activity: 50,
    mental: 50,
    bmi: 50,
    fitness: 50,
    ...values,
  };
}

describe('pickStrengthsWeaknesses', () => {
  it('breaks ties with sleep → nutrition → hydration → activity → mental → bmi → fitness', () => {
    const { strengths, weaknesses } = pickStrengthsWeaknesses(topicsFrom());
    expect(strengths).toEqual(['sleep', 'nutrition']);
    expect(weaknesses).toEqual(['fitness', 'bmi']);
  });

  it('never overlaps strength and weakness', () => {
    const { strengths, weaknesses } = pickStrengthsWeaknesses(
      topicsFrom({
        sleep: 90,
        nutrition: 80,
        hydration: 40,
        activity: 20,
        mental: 10,
        bmi: 50,
        fitness: 50,
      }),
    );
    expect(strengths.some((s) => weaknesses.includes(s))).toBe(false);
  });

  it('can mark thể lực as a weakness when fitness is lowest', () => {
    const { weaknesses } = pickStrengthsWeaknesses(
      topicsFrom({
        sleep: 90,
        nutrition: 88,
        hydration: 86,
        activity: 75,
        mental: 84,
        bmi: 80,
        fitness: 58,
      }),
    );
    expect(weaknesses).toEqual(['fitness', 'activity']);
  });
});

describe('scoreSession', () => {
  it('is deterministic for the same answers', () => {
    const answers: QuizAnswers = {};
    for (const q of questions) answers[q.id] = q.options[2].id;
    const a = scoreSession(
      { age: 20, gender: 'female', heightCm: 160, weightKg: 52 },
      14,
      answers,
      questions,
      scoringConfig,
    );
    const b = scoreSession(
      { age: 20, gender: 'female', heightCm: 160, weightKg: 52 },
      14,
      answers,
      questions,
      scoringConfig,
    );
    expect(a).toEqual(b);
    expect(Object.keys(a.groups)).toHaveLength(5);
    expect(a.weaknesses).toHaveLength(2);
  });

  it('normalizes group scores from answers', () => {
    const answers: QuizAnswers = {};
    for (const q of questions) answers[q.id] = q.options[0].id;
    const groups = calcGroupScores(answers, questions);
    expect(groups.sleep.normalized).toBe(0);
    expect(LIFESTYLE_GROUPS.every((g) => g in groups)).toBe(true);
  });
});
