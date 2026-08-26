import { describe, expect, it } from 'vitest';
import { pickStrengthsWeaknesses } from '../score';
import { scoreSession } from '../index';
import { calcGroupScores } from '../quiz';
import { questions } from '../../config/questions.config';
import { scoringConfig } from '../../config/scoring.config';
import type { GroupScore, LifestyleGroup, QuizAnswers } from '../types';
import { LIFESTYLE_GROUPS } from '../types';

function groupsFrom(values: Record<LifestyleGroup, number>): Record<LifestyleGroup, GroupScore> {
  const out = {} as Record<LifestyleGroup, GroupScore>;
  for (const g of LIFESTYLE_GROUPS) {
    out[g] = { group: g, raw: values[g], max: 100, normalized: values[g] };
  }
  return out;
}

describe('pickStrengthsWeaknesses', () => {
  it('breaks ties with sleep → nutrition → hydration → activity → mental', () => {
    const even = groupsFrom({
      sleep: 50,
      nutrition: 50,
      hydration: 50,
      activity: 50,
      mental: 50,
    });
    const { strengths, weaknesses } = pickStrengthsWeaknesses(even);
    expect(strengths).toEqual(['sleep', 'nutrition']);
    expect(weaknesses).toEqual(['mental', 'activity']);
  });

  it('never overlaps strength and weakness', () => {
    const { strengths, weaknesses } = pickStrengthsWeaknesses(
      groupsFrom({
        sleep: 90,
        nutrition: 80,
        hydration: 40,
        activity: 20,
        mental: 10,
      }),
    );
    expect(strengths.some((s) => weaknesses.includes(s))).toBe(false);
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
  });

  it('normalizes group scores from answers', () => {
    const answers: QuizAnswers = {};
    for (const q of questions) answers[q.id] = q.options[0].id;
    const groups = calcGroupScores(answers, questions);
    expect(groups.sleep.normalized).toBe(0);
  });
});
