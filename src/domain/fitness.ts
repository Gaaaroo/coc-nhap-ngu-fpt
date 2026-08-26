import type { FitnessBand, Gender, ScoringConfig } from './types';

export function calcFitness(
  reps: number,
  gender: Gender,
  cfg: ScoringConfig,
): { reps: number; band: FitnessBand; score: number; label: string } {
  const bands = cfg.fitnessBands[gender];
  const rule = bands.find((b) => reps >= b.min && reps < b.max) ?? bands[bands.length - 1];
  return { reps, band: rule.band, score: rule.score, label: rule.label };
}
