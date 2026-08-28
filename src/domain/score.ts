import type {
  GroupPair,
  OverallTier,
  ScoreGroup,
  ScoreResult,
  ScoringConfig,
} from './types';
import { LIFESTYLE_GROUPS, TIE_BREAK_ORDER } from './types';

function rankForStrengths(scores: Record<ScoreGroup, number>): ScoreGroup[] {
  return [...TIE_BREAK_ORDER].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return TIE_BREAK_ORDER.indexOf(a) - TIE_BREAK_ORDER.indexOf(b);
  });
}

function rankForWeaknesses(scores: Record<ScoreGroup, number>): ScoreGroup[] {
  return [...TIE_BREAK_ORDER].sort((a, b) => {
    const diff = scores[a] - scores[b];
    if (diff !== 0) return diff;
    return TIE_BREAK_ORDER.indexOf(b) - TIE_BREAK_ORDER.indexOf(a);
  });
}

export function pickStrengthsWeaknesses(scores: Record<ScoreGroup, number>): {
  strengths: GroupPair;
  weaknesses: GroupPair;
} {
  const byHigh = rankForStrengths(scores);
  const byLow = rankForWeaknesses(scores);
  const strengths = [byHigh[0], byHigh[1]] as GroupPair;
  const used = new Set<ScoreGroup>(strengths);
  const weaknessesList: ScoreGroup[] = [];
  for (const g of byLow) {
    if (used.has(g)) continue;
    weaknessesList.push(g);
    if (weaknessesList.length === 2) break;
  }
  const weaknesses = [weaknessesList[0], weaknessesList[1]] as GroupPair;

  const overlap = strengths.filter((s) => weaknesses.includes(s));
  if (overlap.length > 0) {
    throw new Error('Điểm Khỏe và Điểm Khuyết không được trùng nhóm');
  }

  return { strengths, weaknesses };
}

export function overallTierOf(total: number, cfg: ScoringConfig): {
  overallTier: OverallTier;
  overallLabel: string;
} {
  const rule = cfg.overallTiers.find((t) => total >= t.min) ?? cfg.overallTiers[cfg.overallTiers.length - 1];
  return { overallTier: rule.tier, overallLabel: rule.label };
}

export function composeResult(
  bmi: ScoreResult['bmi'],
  fitness: ScoreResult['fitness'],
  groups: ScoreResult['groups'],
  cfg: ScoringConfig,
): ScoreResult {
  const physicalScore = Math.round(
    bmi.score * cfg.physicalWeights.bmi + fitness.score * cfg.physicalWeights.fitness,
  );

  const scores = {
    physical: physicalScore,
    sleep: groups.sleep.normalized,
    nutrition: groups.nutrition.normalized,
    hydration: groups.hydration.normalized,
    activity: groups.activity.normalized,
    mental: groups.mental.normalized,
  } as Record<ScoreGroup, number>;

  const total = Math.round(
    scores.physical * cfg.totalWeights.physical +
      LIFESTYLE_GROUPS.reduce((sum, g) => sum + scores[g] * cfg.totalWeights[g], 0),
  );

  const { strengths, weaknesses } = pickStrengthsWeaknesses(scores);
  const { overallTier, overallLabel } = overallTierOf(total, cfg);

  return {
    bmi,
    fitness,
    physicalScore,
    groups,
    scores,
    total,
    overallTier,
    overallLabel,
    strengths,
    weaknesses,
  };
}
