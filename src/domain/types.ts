export type Gender = 'male' | 'female';

export type LifestyleGroup =
  | 'sleep'
  | 'nutrition'
  | 'hydration'
  | 'activity'
  | 'mental';

export type ScoreGroup = 'physical' | LifestyleGroup;

export type OverallTier = 'healthy' | 'stable' | 'defect';

export type BmiBand = 'under' | 'fit' | 'high' | 'obese1' | 'obese2';
export type FitnessBand = 'low' | 'fair' | 'solid' | 'peak';

export interface BodyMetrics {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
}

export interface FitnessResult {
  reps: number;
}

export type QuizAnswers = Record<string, string>;

export interface BandRule<T extends string> {
  band: T;
  min: number;
  max: number;
  score: number;
  label: string;
}

export interface ScoringConfig {
  bmiBands: Array<BandRule<BmiBand>>;
  fitnessBands: Record<Gender, Array<BandRule<FitnessBand>>>;
  physicalWeights: {
    bmi: number;
    fitness: number;
  };
  totalWeights: Record<ScoreGroup, number>;
  overallTiers: Array<{ tier: OverallTier; min: number; label: string }>;
}

export interface GroupScore {
  group: LifestyleGroup;
  raw: number;
  max: number;
  normalized: number;
}

export type GroupPair = readonly [ScoreGroup, ScoreGroup];

export interface ScoreResult {
  bmi: { value: number; band: BmiBand; score: number; label: string };
  fitness: { reps: number; band: FitnessBand; score: number; label: string };
  physicalScore: number;
  groups: Record<LifestyleGroup, GroupScore>;
  scores: Record<ScoreGroup, number>;
  total: number;
  overallTier: OverallTier;
  overallLabel: string;
  strengths: GroupPair;
  weaknesses: GroupPair;
}

export type FlowStep =
  | 'landing'
  | 'intake'
  | 'fitness'
  | 'quiz'
  | 'calculating'
  | 'result'
  | 'knowledge'
  | 'avatarUnlock'
  | 'avatarUpload'
  | 'avatarCrop'
  | 'avatarPreview'
  | 'done';

export const LIFESTYLE_GROUPS: LifestyleGroup[] = [
  'sleep',
  'nutrition',
  'hydration',
  'activity',
  'mental',
];

export const SCORE_GROUPS: ScoreGroup[] = [
  'physical',
  'sleep',
  'nutrition',
  'hydration',
  'activity',
  'mental',
];

/** Tie-break order from FSD §8: Physical → Sleep → Nutrition → Hydration → Exercise → Mental. */
export const TIE_BREAK_ORDER: ScoreGroup[] = SCORE_GROUPS;

export const METRIC_LIMITS = {
  age: { min: 15, max: 60, default: 20 },
  heightCm: { min: 100, max: 230, default: 165 },
  weightKg: { min: 30, max: 200, default: 55 },
  reps: { min: 0, max: 100, default: 0 },
} as const;

export const IMAGE_LIMITS = {
  maxBytes: 10 * 1024 * 1024,
  mime: ['image/jpeg', 'image/png', 'image/webp'] as const,
  extensions: ['.jpg', '.jpeg', '.png', '.webp'] as const,
};

export interface QuestionOption {
  id: string;
  label: string;
  score: number;
}

export interface Question {
  id: string;
  group: LifestyleGroup;
  prompt: string;
  options: QuestionOption[];
}

export interface KnowledgeCard {
  id: string;
  group: ScoreGroup;
  title: string;
  body: string;
}
