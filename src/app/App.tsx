import { useEffect } from 'react';
import type { ComponentType } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IdleOverlay } from '../components/ui/IdleOverlay';
import { LandingScreen } from '../features/landing/LandingScreen';
import { IntakeScreen } from '../features/intake/IntakeScreen';
import { FitnessScreen } from '../features/fitness/FitnessScreen';
import { QuizScreen } from '../features/quiz/QuizScreen';
import { CalculatingScreen } from '../features/result/CalculatingScreen';
import { ResultScreen } from '../features/result/ResultScreen';
import { KnowledgeScreen } from '../features/knowledge/KnowledgeScreen';
import { UnlockScreen } from '../features/avatar/UnlockScreen';
import { UploadScreen } from '../features/avatar/UploadScreen';
import { CropScreen } from '../features/avatar/CropScreen';
import { PreviewScreen } from '../features/avatar/PreviewScreen';
import { DoneScreen } from '../features/avatar/DoneScreen';
import { useIdleReset } from '../lib/idle';
import { writeHistory } from '../lib/flowHistory';
import { useSession } from '../store/session.store';
import type { FlowStep } from '../domain/types';

const screens: Record<FlowStep, ComponentType> = {
  landing: LandingScreen,
  intake: IntakeScreen,
  fitness: FitnessScreen,
  quiz: QuizScreen,
  calculating: CalculatingScreen,
  result: ResultScreen,
  knowledge: KnowledgeScreen,
  avatarUnlock: UnlockScreen,
  avatarUpload: UploadScreen,
  avatarCrop: CropScreen,
  avatarPreview: PreviewScreen,
  done: DoneScreen,
};

export default function App() {
  const step = useSession((s) => s.step);
  const reset = useSession((s) => s.reset);
  const applyHistory = useSession((s) => s.applyHistory);
  const unlockCta = useSession((s) => s.unlockCta);
  const historyGen = useSession((s) => s.historyGen);
  const reduce = useReducedMotion();
  const { countdown, stay } = useIdleReset(reset, step !== 'landing' && step !== 'done');
  const Screen = screens[step];

  useEffect(() => {
    writeHistory('landing', historyGen, 'replace');
    const onPop = (event: PopStateEvent) => applyHistory(event.state);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // Seed history once per generation; listener always reads latest applyHistory.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyGen]);

  useEffect(() => {
    unlockCta();
  }, [step, unlockCta]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -6 }}
          transition={{ duration: reduce ? 0.2 : 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Screen />
        </motion.div>
      </AnimatePresence>
      {countdown != null ? (
        <IdleOverlay seconds={countdown} onStay={stay} onReset={reset} />
      ) : null}
    </>
  );
}
