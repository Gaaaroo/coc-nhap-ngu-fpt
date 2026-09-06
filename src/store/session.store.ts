import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Area } from 'react-easy-crop';
import { questions } from '../config/questions.config';
import { scoringConfig } from '../config/scoring.config';
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

export interface SessionState {
  step: FlowStep;
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
  setFitness: (reps: number) => void;
  answerAndAdvance: (questionId: string, optionId: string) => void;
  go: (step: FlowStep) => void;
  goBack: () => void;
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
  knowledge: 'result',
  avatarUpload: 'avatarUnlock',
  avatarCrop: 'avatarUpload',
  avatarPreview: 'avatarCrop',
};

function empty(): Pick<
  SessionState,
  | 'step'
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
    metrics: {
      age: METRIC_LIMITS.age.default,
      heightCm: METRIC_LIMITS.heightCm.default,
      weightKg: METRIC_LIMITS.weightKg.default,
    },
    fitness: { reps: METRIC_LIMITS.reps.default },
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

export const useSession = create<SessionState>()(
  persist(
    (set, get) => ({
      ...empty(),
      setMetrics: (patch) => set({ metrics: { ...get().metrics, ...patch } }),
      setFitness: (reps) => set({ fitness: { reps } }),
      answerAndAdvance: (questionId, optionId) => {
        const answers = { ...get().answers, [questionId]: optionId };
        const nextIndex = get().quizIndex + 1;
        if (nextIndex >= questions.length) {
          set({ answers, quizIndex: nextIndex });
          get().finishQuiz();
          return;
        }
        set({ answers, quizIndex: nextIndex });
      },
      go: (step) => {
        const s = get();
        if (step === 'result' && !s.result) return;
        if (step === 'avatarUnlock' && !s.knowledgeCompleted) return;
        if (step === 'knowledge') {
          set({ step, knowledgeIndex: 0 });
        } else {
          set({ step });
        }
        track(`step_${step}`);
      },
      goBack: () => {
        const prev = BACK[get().step];
        if (prev) set({ step: prev });
      },
      start: () => {
        track('step_landing');
        set({ step: 'intake', startedAt: Date.now() });
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
        set({ result, step: 'calculating' });
        track('step_quiz_done');
      },
      completeKnowledge: () => {
        set({ knowledgeCompleted: true, step: 'avatarUnlock' });
        track('step_knowledge_done');
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
        const { sourceImageUrl, avatarBlobUrl } = get();
        revokeUrl(sourceImageUrl);
        revokeUrl(avatarBlobUrl);
        set(empty());
        track('step_reset');
      },
    }),
    {
      name: 'booth4-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({
        step: s.step,
        metrics: s.metrics,
        fitness: s.fitness,
        answers: s.answers,
        quizIndex: s.quizIndex,
        result: s.result,
        knowledgeCompleted: s.knowledgeCompleted,
        knowledgeIndex: s.knowledgeIndex,
        startedAt: s.startedAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const photoSteps: FlowStep[] = ['avatarCrop', 'avatarPreview'];
        if (photoSteps.includes(state.step)) {
          state.step = 'avatarUpload';
        }
        if (state.step === 'calculating' && state.result) {
          state.step = 'result';
        }
        if (state.step === 'avatarUnlock' && state.knowledgeCompleted) {
          state.step = 'avatarUpload';
        }
      },
    },
  ),
);
