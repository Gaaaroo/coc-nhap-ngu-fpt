import type {
  GroupScore,
  LifestyleGroup,
  ScoreResult,
  ScoreTopic,
  ScoringConfig,
  TopicPair,
} from './types';
import { SCORE_TOPICS, TIE_BREAK_ORDER } from './types';

export function scoreOfTopic(
  result: Pick<ScoreResult, 'bmi' | 'fitness' | 'groups'>,
  topic: ScoreTopic,
): number {
  if (topic === 'bmi') return result.bmi.score;
  if (topic === 'fitness') return result.fitness.score;
  return result.groups[topic].normalized;
}

export function topicScoresOf(
  result: Pick<ScoreResult, 'bmi' | 'fitness' | 'groups'>,
): Record<ScoreTopic, number> {
  return Object.fromEntries(SCORE_TOPICS.map((t) => [t, scoreOfTopic(result, t)])) as Record<
    ScoreTopic,
    number
  >;
}

function rankTopics(scores: Record<ScoreTopic, number>): ScoreTopic[] {
  return [...TIE_BREAK_ORDER].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return TIE_BREAK_ORDER.indexOf(a) - TIE_BREAK_ORDER.indexOf(b);
  });
}

export function pickStrengthsWeaknesses(scores: Record<ScoreTopic, number>): {
  strengths: TopicPair;
  weaknesses: TopicPair;
} {
  const ranked = rankTopics(scores);
  const strengths = [ranked[0], ranked[1]] as TopicPair;
  const weaknesses = [ranked[ranked.length - 1], ranked[ranked.length - 2]] as TopicPair;

  const overlap = strengths.filter((s) => weaknesses.includes(s));
  if (overlap.length > 0) {
    throw new Error('Điểm Khỏe và Điểm Khuyết không được trùng nhóm');
  }

  return { strengths, weaknesses };
}

export function composeResult(
  bmi: ScoreResult['bmi'],
  fitness: ScoreResult['fitness'],
  groups: Record<LifestyleGroup, GroupScore>,
  cfg: ScoringConfig,
): ScoreResult {
  const lifestyle = (Object.values(groups) as GroupScore[]).reduce(
    (sum, g) => sum + g.normalized * cfg.groupWeights[g.group],
    0,
  );

  const total =
    bmi.score * cfg.componentWeights.bmi +
    fitness.score * cfg.componentWeights.fitness +
    lifestyle * cfg.componentWeights.lifestyle;

  const { strengths, weaknesses } = pickStrengthsWeaknesses(
    topicScoresOf({ bmi, fitness, groups }),
  );

  return {
    bmi,
    fitness,
    groups,
    total: Math.round(total * 10) / 10,
    strengths,
    weaknesses,
  };
}
