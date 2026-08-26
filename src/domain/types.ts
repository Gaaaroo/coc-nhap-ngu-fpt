export type Gender = 'male' | 'female';

export type LifestyleGroup =
  | 'sleep'
  | 'nutrition'
  | 'hydration'
  | 'activity'
  | 'mental';

export type BmiBand = 'under' | 'fit' | 'high' | 'veryHigh';
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
  groupWeights: Record<LifestyleGroup, number>;
  componentWeights: {
    bmi: number;
    fitness: number;
    lifestyle: number;
  };
}

export interface GroupScore {
  group: LifestyleGroup;
  raw: number;
  max: number;
  normalized: number;
}

export type GroupPair = readonly [LifestyleGroup, LifestyleGroup];

export interface ScoreResult {
  bmi: { value: number; band: BmiBand; score: number; label: string };
  fitness: { reps: number; band: FitnessBand; score: number; label: string };
  groups: Record<LifestyleGroup, GroupScore>;
  total: number;
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

export const TIE_BREAK_ORDER: LifestyleGroup[] = [
  'sleep',
  'nutrition',
  'hydration',
  'activity',
  'mental',
];

export const METRIC_LIMITS = {
  age: { min: 15, max: 60, default: 20 },
  heightCm: { min: 120, max: 220, default: 165 },
  weightKg: { min: 30, max: 200, default: 55 },
  reps: { min: 0, max: 80, default: 0 },
} as const;

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
  group: LifestyleGroup;
  title: string;
  body: string;
}
