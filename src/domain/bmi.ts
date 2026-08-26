import type { BmiBand, BodyMetrics, ScoringConfig } from './types';

export function bmiValue(metrics: Pick<BodyMetrics, 'heightCm' | 'weightKg'>): number {
  const meters = metrics.heightCm / 100;
  return metrics.weightKg / (meters * meters);
}

export function roundBmiDisplay(value: number): string {
  return (Math.round(value * 10) / 10).toFixed(1);
}

export function calcBmi(
  metrics: Pick<BodyMetrics, 'heightCm' | 'weightKg'>,
  cfg: ScoringConfig,
): { value: number; band: BmiBand; score: number; label: string } {
  const value = bmiValue(metrics);
  const rule = cfg.bmiBands.find((b) => value >= b.min && value < b.max);
  if (!rule) {
    const last = cfg.bmiBands[cfg.bmiBands.length - 1];
    return { value, band: last.band, score: last.score, label: last.label };
  }
  return { value, band: rule.band, score: rule.score, label: rule.label };
}
