import type { ScoringConfig } from '../domain/types';

/**
 * Benchmark vận hành theo FUNCTIONAL_SPECIFICATION.md — chưa phải chuẩn y khoa.
 * Đổi số tại đây, không sửa logic trong src/domain.
 */
export const scoringConfig: ScoringConfig = {
  bmiBands: [
    { band: 'under', min: 0, max: 18.5, score: 50, label: 'Thiếu cân' },
    { band: 'fit', min: 18.5, max: 23, score: 100, label: 'Bình thường' },
    { band: 'high', min: 23, max: 25, score: 75, label: 'Thừa cân' },
    { band: 'obese1', min: 25, max: 30, score: 50, label: 'Béo phì độ I' },
    { band: 'obese2', min: 30, max: 100, score: 30, label: 'Béo phì độ II' },
  ],
  fitnessBands: {
    female: [
      { band: 'low', min: 0, max: 5, score: 30, label: '0–4 lần' },
      { band: 'fair', min: 5, max: 9, score: 60, label: '5–8 lần' },
      { band: 'solid', min: 9, max: 13, score: 80, label: '9–12 lần' },
      { band: 'peak', min: 13, max: 999, score: 100, label: '13 lần trở lên' },
    ],
    male: [
      { band: 'low', min: 0, max: 6, score: 30, label: '0–5 lần' },
      { band: 'fair', min: 6, max: 11, score: 60, label: '6–10 lần' },
      { band: 'solid', min: 11, max: 16, score: 80, label: '11–15 lần' },
      { band: 'peak', min: 16, max: 999, score: 100, label: '16 lần trở lên' },
    ],
  },
  physicalWeights: {
    bmi: 0.4,
    fitness: 0.6,
  },
  totalWeights: {
    physical: 0.2,
    sleep: 0.15,
    nutrition: 0.15,
    hydration: 0.1,
    activity: 0.2,
    mental: 0.2,
  },
  overallTiers: [
    { tier: 'healthy', min: 75, label: 'Điểm Khỏe' },
    { tier: 'stable', min: 50, label: 'Ổn định' },
    { tier: 'defect', min: 0, label: 'Điểm Khuyết' },
  ],
};
