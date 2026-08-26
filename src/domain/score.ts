import type {
  GroupScore,
  GroupPair,
  LifestyleGroup,
  ScoreResult,
  ScoringConfig,
} from './types';
import { TIE_BREAK_ORDER } from './types';

function rankGroups(groups: Record<LifestyleGroup, GroupScore>): LifestyleGroup[] {
  return [...TIE_BREAK_ORDER].sort((a, b) => {
    const diff = groups[b].normalized - groups[a].normalized;
    if (diff !== 0) return diff;
    return TIE_BREAK_ORDER.indexOf(a) - TIE_BREAK_ORDER.indexOf(b);
  });
}

export function pickStrengthsWeaknesses(
  groups: Record<LifestyleGroup, GroupScore>,
): {
  strengths: GroupPair;
  weaknesses: GroupPair;
} {
  const ranked = rankGroups(groups);
  const strengths = [ranked[0], ranked[1]] as GroupPair;
  const weaknesses = [ranked[ranked.length - 1], ranked[ranked.length - 2]] as GroupPair;

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
  const lifestyle =
    (Object.values(groups) as GroupScore[]).reduce(
      (sum, g) => sum + g.normalized * cfg.groupWeights[g.group],
      0,
    );

  const total =
    bmi.score * cfg.componentWeights.bmi +
    fitness.score * cfg.componentWeights.fitness +
    lifestyle * cfg.componentWeights.lifestyle;

  const { strengths, weaknesses } = pickStrengthsWeaknesses(groups);

  return {
    bmi,
    fitness,
    groups,
    total: Math.round(total * 10) / 10,
    strengths,
    weaknesses,
  };
}
