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

export type ScoreTopic = LifestyleGroup | 'bmi' | 'fitness';
export type TopicPair = readonly [ScoreTopic, ScoreTopic];

export interface ScoreResult {
  bmi: { value: number; band: BmiBand; score: number; label: string };
  fitness: { reps: number; band: FitnessBand; score: number; label: string };
  groups: Record<LifestyleGroup, GroupScore>;
  total: number;
  strengths: TopicPair;
  weaknesses: TopicPair;
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

export const SCORE_TOPICS: ScoreTopic[] = [
  'sleep',
  'nutrition',
  'hydration',
  'activity',
  'mental',
  'bmi',
  'fitness',
];

export const TIE_BREAK_ORDER: ScoreTopic[] = [
  'sleep',
  'nutrition',
  'hydration',
  'activity',
  'mental',
  'bmi',
  'fitness',
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
  group: ScoreTopic;
  title: string;
  body: string;
}
