import { describe, expect, it } from 'vitest';
import { pickStrengthsWeaknesses, overallTierOf, composeResult } from '../score';
import { scoreSession } from '../index';
import { calcGroupScores } from '../quiz';
import { calcBmi } from '../bmi';
import { calcFitness } from '../fitness';
import { questions } from '../../config/questions.config';
import { scoringConfig } from '../../config/scoring.config';
import type { GroupScore, LifestyleGroup, QuizAnswers, ScoreGroup } from '../types';
import { LIFESTYLE_GROUPS } from '../types';

function groupsFrom(values: Record<LifestyleGroup, number>): Record<LifestyleGroup, GroupScore> {
  const out = {} as Record<LifestyleGroup, GroupScore>;
  for (const g of LIFESTYLE_GROUPS) {
    out[g] = { group: g, raw: values[g], max: 100, normalized: values[g] };
  }
  return out;
}

function scoresFrom(values: Record<ScoreGroup, number>): Record<ScoreGroup, number> {
  return { ...values };
}

describe('pickStrengthsWeaknesses', () => {
  it('breaks ties with physical → sleep → nutrition → hydration → activity → mental', () => {
    const even = scoresFrom({
      physical: 50,
      sleep: 50,
      nutrition: 50,
      hydration: 50,
      activity: 50,
      mental: 50,
    });
    const { strengths, weaknesses } = pickStrengthsWeaknesses(even);
    expect(strengths).toEqual(['physical', 'sleep']);
    expect(weaknesses).toEqual(['mental', 'activity']);
  });

  it('never overlaps strength and weakness', () => {
    const { strengths, weaknesses } = pickStrengthsWeaknesses(
      scoresFrom({
        physical: 90,
        sleep: 80,
        nutrition: 70,
        hydration: 40,
        activity: 20,
        mental: 10,
      }),
    );
    expect(strengths.some((s) => weaknesses.includes(s))).toBe(false);
    expect(strengths).toEqual(['physical', 'sleep']);
    expect(weaknesses).toEqual(['mental', 'activity']);
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
    expect(a.physicalScore).toBeGreaterThan(0);
  });

  it('averages each lifestyle group and rounds to an integer', () => {
    const answers: QuizAnswers = {};
    for (const q of questions) answers[q.id] = q.options[0].id;
    const groups = calcGroupScores(answers, questions);
    expect(groups.sleep.normalized).toBe(25);
    expect(groups.nutrition.normalized).toBe(25);
  });

  it('uses FSD physical and total weights, rounded to nearest integer', () => {
    const bmi = calcBmi({ heightCm: 165, weightKg: 55 }, scoringConfig);
    const fitness = calcFitness(16, 'male', scoringConfig);
    const groups = groupsFrom({
      sleep: 100,
      nutrition: 75,
      hydration: 50,
      activity: 80,
      mental: 75,
    });
    const result = composeResult(bmi, fitness, groups, scoringConfig);
    const physical = Math.round(bmi.score * 0.4 + fitness.score * 0.6);
    const total = Math.round(
      physical * 0.2 + 100 * 0.15 + 75 * 0.15 + 50 * 0.1 + 80 * 0.2 + 75 * 0.2,
    );
    expect(result.physicalScore).toBe(physical);
    expect(result.total).toBe(total);
  });
});

describe('overallTierOf', () => {
  it('maps total score to the three FSD labels', () => {
    expect(overallTierOf(75, scoringConfig).overallTier).toBe('healthy');
    expect(overallTierOf(74, scoringConfig).overallTier).toBe('stable');
    expect(overallTierOf(50, scoringConfig).overallTier).toBe('stable');
    expect(overallTierOf(49, scoringConfig).overallTier).toBe('defect');
  });
});
