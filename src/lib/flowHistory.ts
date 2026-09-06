import type { FlowStep } from '../domain/types';

export const FLOW_ACTIVE_KEY = 'booth4-flow-active';
export const HISTORY_KEY = 'booth4';

export interface FlowHistoryState {
  [HISTORY_KEY]: true;
  step: FlowStep;
  gen: number;
}

export const FLOW_STEPS: FlowStep[] = [
  'landing',
  'intake',
  'fitness',
  'quiz',
  'calculating',
  'result',
  'knowledge',
  'avatarUnlock',
  'avatarUpload',
  'avatarCrop',
  'avatarPreview',
  'done',
];

export function isFlowStep(value: unknown): value is FlowStep {
  return typeof value === 'string' && FLOW_STEPS.includes(value as FlowStep);
}

export function isFlowHistoryState(value: unknown): value is FlowHistoryState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<FlowHistoryState>;
  return state[HISTORY_KEY] === true && isFlowStep(state.step) && typeof state.gen === 'number';
}

export function markFlowActive(): void {
  try {
    sessionStorage.setItem(FLOW_ACTIVE_KEY, '1');
  } catch {
    /* private mode */
  }
}

export function clearFlowActive(): void {
  try {
    sessionStorage.removeItem(FLOW_ACTIVE_KEY);
  } catch {
    /* private mode */
  }
}

/** True when F5 happened mid-flow (flag set, in-memory state gone). */
export function consumeInterruptedFlow(): boolean {
  try {
    if (sessionStorage.getItem(FLOW_ACTIVE_KEY) !== '1') return false;
    sessionStorage.removeItem(FLOW_ACTIVE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function writeHistory(
  step: FlowStep,
  gen: number,
  mode: 'push' | 'replace',
): void {
  const state: FlowHistoryState = { [HISTORY_KEY]: true, step, gen };
  if (mode === 'replace') history.replaceState(state, '');
  else history.pushState(state, '');
}
