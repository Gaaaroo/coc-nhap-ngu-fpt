import { copy } from '../config/copy.config';
import { METRIC_LIMITS } from './types';
import type { BodyMetrics } from './types';

export type FieldError = string | null;

export interface IntakeErrors {
  gender: FieldError;
  age: FieldError;
  height: FieldError;
  weight: FieldError;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function validateAge(age: number | undefined): FieldError {
  if (age == null) return copy.errors.required;
  if (!isInRange(age, METRIC_LIMITS.age.min, METRIC_LIMITS.age.max)) return copy.errors.ageRange;
  return null;
}

export function validateHeight(heightCm: number | undefined): FieldError {
  if (heightCm == null) return copy.errors.required;
  if (!isInRange(heightCm, METRIC_LIMITS.heightCm.min, METRIC_LIMITS.heightCm.max)) {
    return copy.errors.heightRange;
  }
  return null;
}

export function validateWeight(weightKg: number | undefined): FieldError {
  if (weightKg == null) return copy.errors.required;
  if (!isInRange(weightKg, METRIC_LIMITS.weightKg.min, METRIC_LIMITS.weightKg.max)) {
    return copy.errors.weightRange;
  }
  return null;
}

export function validateIntake(metrics: Partial<BodyMetrics>): IntakeErrors {
  return {
    gender: metrics.gender ? null : copy.intake.needGender,
    age: validateAge(metrics.age),
    height: validateHeight(metrics.heightCm),
    weight: validateWeight(metrics.weightKg),
  };
}

export function hasIntakeErrors(errors: IntakeErrors): boolean {
  return Boolean(errors.gender || errors.age || errors.height || errors.weight);
}

export function validateGrip(reps: number | undefined): FieldError {
  if (reps == null) return copy.errors.required;
  if (!isInRange(reps, METRIC_LIMITS.reps.min, METRIC_LIMITS.reps.max)) return copy.errors.required;
  return null;
}
