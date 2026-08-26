import type { ScoringConfig } from '../domain/types';

/**
 * [CHỜ FSD] Benchmark vận hành — chưa phải chuẩn y khoa.
 * Đổi số tại đây, không sửa logic trong src/domain.
 */
export const scoringConfig: ScoringConfig = {
  bmiBands: [
    { band: 'under', min: 0, max: 18.5, score: 62, label: 'Hơi nhẹ cân' },
    { band: 'fit', min: 18.5, max: 25, score: 100, label: 'Cân đối' },
    { band: 'high', min: 25, max: 30, score: 72, label: 'Hơi dư cân' },
    { band: 'veryHigh', min: 30, max: 100, score: 48, label: 'Dư cân' },
  ],
  fitnessBands: {
    female: [
      { band: 'low', min: 0, max: 6, score: 40, label: 'Mới khởi động' },
      { band: 'fair', min: 6, max: 12, score: 68, label: 'Khá' },
      { band: 'solid', min: 12, max: 20, score: 88, label: 'Tốt' },
      { band: 'peak', min: 20, max: 999, score: 100, label: 'Rất tốt' },
    ],
    male: [
      { band: 'low', min: 0, max: 8, score: 40, label: 'Mới khởi động' },
      { band: 'fair', min: 8, max: 16, score: 68, label: 'Khá' },
      { band: 'solid', min: 16, max: 26, score: 88, label: 'Tốt' },
      { band: 'peak', min: 26, max: 999, score: 100, label: 'Rất tốt' },
    ],
  },
  groupWeights: {
    sleep: 0.2,
    nutrition: 0.2,
    hydration: 0.2,
    activity: 0.2,
    mental: 0.2,
  },
  componentWeights: {
    bmi: 0.2,
    fitness: 0.2,
    lifestyle: 0.6,
  },
};
