import { create } from 'zustand';
import type { Area } from 'react-easy-crop';
import { questions } from '../config/questions.config';
import { scoringConfig } from '../config/scoring.config';
import { copy } from '../config/copy.config';
import { scoreSession } from '../domain';
import type {
  BodyMetrics,
  FitnessResult,
  FlowStep,
  QuizAnswers,
  ScoreResult,
} from '../domain/types';
import { METRIC_LIMITS } from '../domain/types';
import { track } from '../lib/analytics';
import { revokeUrl } from '../lib/image';
import {
  clearFlowActive,
  consumeInterruptedFlow,
  isFlowHistoryState,
  markFlowActive,
  writeHistory,
} from '../lib/flowHistory';

export interface SessionState {
  step: FlowStep;
  historyGen: number;
  ctaLocked: boolean;
  sessionNotice: string | null;
  metrics: Partial<BodyMetrics>;
  fitness: Partial<FitnessResult>;
  answers: QuizAnswers;
  quizIndex: number;
  result: ScoreResult | null;
  knowledgeCompleted: boolean;
  knowledgeIndex: number;
  sourceImageUrl: string | null;
  cropPixels: Area | null;
  avatarBlobUrl: string | null;
  startedAt: number;
  setMetrics: (patch: Partial<BodyMetrics>) => void;
  setFitness: (reps: number | null) => void;
  answerAndAdvance: (questionId: string, optionId: string) => void;
  quizBack: () => void;
  go: (step: FlowStep, historyMode?: 'push' | 'replace' | 'none') => void;
  goBack: () => void;
  applyHistory: (raw: unknown) => void;
  unlockCta: () => void;
  clearSessionNotice: () => void;
  start: () => void;
  finishQuiz: () => void;
  completeKnowledge: () => void;
  setKnowledgeIndex: (index: number) => void;
  setSourceImage: (url: string | null) => void;
  setCropPixels: (area: Area | null) => void;
  setAvatarBlobUrl: (url: string | null) => void;
  reset: () => void;
}

const BACK: Partial<Record<FlowStep, FlowStep>> = {
  intake: 'landing',
  fitness: 'intake',
  quiz: 'fitness',
  calculating: 'quiz',
  result: 'quiz',
  knowledge: 'result',
  avatarUnlock: 'knowledge',
  avatarUpload: 'avatarUnlock',
  avatarCrop: 'avatarUpload',
  avatarPreview: 'avatarCrop',
  done: 'avatarPreview',
};

function empty(): Pick<
  SessionState,
  | 'step'
  | 'ctaLocked'
  | 'metrics'
  | 'fitness'
  | 'answers'
  | 'quizIndex'
  | 'result'
  | 'knowledgeCompleted'
  | 'knowledgeIndex'
  | 'sourceImageUrl'
  | 'cropPixels'
  | 'avatarBlobUrl'
  | 'startedAt'
> {
  return {
    step: 'landing',
    ctaLocked: false,
    metrics: {
      age: METRIC_LIMITS.age.default,
      heightCm: METRIC_LIMITS.heightCm.default,
      weightKg: METRIC_LIMITS.weightKg.default,
    },
    fitness: {},
    answers: {},
    quizIndex: 0,
    result: null,
    knowledgeCompleted: false,
    knowledgeIndex: 0,
    sourceImageUrl: null,
    cropPixels: null,
    avatarBlobUrl: null,
    startedAt: Date.now(),
  };
}

function resolveHistoryStep(step: FlowStep, result: ScoreResult | null): FlowStep {
  if (step === 'calculating') return result ? 'result' : 'quiz';
  return step;
}

export const useSession = create<SessionState>()((set, get) => ({
  ...empty(),
  historyGen: 0,
  sessionNotice: consumeInterruptedFlow() ? copy.sessionReset : null,
  setMetrics: (patch) => set({ metrics: { ...get().metrics, ...patch } }),
  setFitness: (reps) => set({ fitness: reps == null ? {} : { reps } }),
  answerAndAdvance: (questionId, optionId) => {
    const answers = { ...get().answers, [questionId]: optionId };
    const last = get().quizIndex >= questions.length - 1;
    if (last) {
      set({ answers });
      get().finishQuiz();
      return;
    }
    set({ answers, quizIndex: get().quizIndex + 1 });
  },
  quizBack: () => {
    const index = get().quizIndex;
    if (index <= 0) {
      get().goBack();
      return;
    }
    set({ quizIndex: index - 1 });
  },
  go: (step, historyMode = 'push') => {
    const s = get();
    if (step === 'result' && !s.result) return;
    if (step === 'avatarUnlock' && !s.knowledgeCompleted) return;
    if (s.step === step && historyMode !== 'replace') return;
    set({
      step,
      ctaLocked: true,
      ...(step === 'knowledge' ? { knowledgeIndex: 0 } : {}),
    });
    track(`step_${step}`);
    if (historyMode !== 'none') writeHistory(step, s.historyGen, historyMode);
  },
  goBack: () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
      return;
    }
    const prev = BACK[get().step];
    if (prev) set({ step: prev, ctaLocked: false });
  },
  applyHistory: (raw) => {
    const s = get();
    if (!isFlowHistoryState(raw) || raw.gen !== s.historyGen) {
      if (s.step !== 'landing') {
        writeHistory('landing', s.historyGen, 'replace');
        set({ step: 'landing', ctaLocked: false });
      }
      return;
    }
    const step = resolveHistoryStep(raw.step, s.result);
    set({ step, ctaLocked: false });
  },
  unlockCta: () => set({ ctaLocked: false }),
  clearSessionNotice: () => set({ sessionNotice: null }),
  start: () => {
    markFlowActive();
    get().clearSessionNotice();
    track('step_landing');
    const metrics = get().metrics;
    set({
      step: 'intake',
      ctaLocked: true,
      startedAt: Date.now(),
      metrics: {
        ...metrics,
        age: metrics.age ?? METRIC_LIMITS.age.default,
        heightCm: metrics.heightCm ?? METRIC_LIMITS.heightCm.default,
        weightKg: metrics.weightKg ?? METRIC_LIMITS.weightKg.default,
      },
    });
    writeHistory('intake', get().historyGen, 'push');
    track('step_intake');
  },
  finishQuiz: () => {
    const { metrics, fitness, answers } = get();
    if (
      metrics.age == null ||
      metrics.gender == null ||
      metrics.heightCm == null ||
      metrics.weightKg == null ||
      fitness.reps == null
    ) {
      return;
    }
    const result = scoreSession(
      metrics as BodyMetrics,
      fitness.reps,
      answers,
      questions,
      scoringConfig,
    );
    set({ result, step: 'calculating', ctaLocked: true });
    track('step_quiz_done');
    writeHistory('calculating', get().historyGen, 'push');
  },
  completeKnowledge: () => {
    set({ knowledgeCompleted: true, step: 'avatarUnlock', ctaLocked: true });
    track('step_knowledge_done');
    writeHistory('avatarUnlock', get().historyGen, 'push');
  },
  setKnowledgeIndex: (index) => set({ knowledgeIndex: index }),
  setSourceImage: (url) => {
    const prev = get().sourceImageUrl;
    if (prev && prev !== url) revokeUrl(prev);
    set({ sourceImageUrl: url, cropPixels: null });
  },
  setCropPixels: (area) => set({ cropPixels: area }),
  setAvatarBlobUrl: (url) => {
    const prev = get().avatarBlobUrl;
    if (prev && prev !== url) revokeUrl(prev);
    set({ avatarBlobUrl: url });
  },
  reset: () => {
    const { sourceImageUrl, avatarBlobUrl, historyGen } = get();
    revokeUrl(sourceImageUrl);
    revokeUrl(avatarBlobUrl);
    clearFlowActive();
    const nextGen = historyGen + 1;
    set({ ...empty(), historyGen: nextGen, sessionNotice: null });
    writeHistory('landing', nextGen, 'push');
    track('step_reset');
  },
}));
