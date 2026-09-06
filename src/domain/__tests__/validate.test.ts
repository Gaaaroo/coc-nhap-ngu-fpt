import { describe, expect, it } from 'vitest';
import { copy } from '../../config/copy.config';
import { validateGrip, validateIntake } from '../validate';

describe('validateIntake', () => {
  it('asks for every empty field and gender', () => {
    const errors = validateIntake({});
    expect(errors.gender).toBe(copy.intake.needGender);
    expect(errors.age).toBe(copy.errors.required);
    expect(errors.height).toBe(copy.errors.required);
    expect(errors.weight).toBe(copy.errors.required);
  });

  it('uses spec range messages', () => {
    const errors = validateIntake({
      gender: 'male',
      age: 14,
      heightCm: 99,
      weightKg: 201,
    });
    expect(errors.age).toBe(copy.errors.ageRange);
    expect(errors.height).toBe(copy.errors.heightRange);
    expect(errors.weight).toBe(copy.errors.weightRange);
  });
});

describe('validateGrip', () => {
  it('rejects empty and accepts zero', () => {
    expect(validateGrip(undefined)).toBe(copy.errors.required);
    expect(validateGrip(0)).toBeNull();
    expect(validateGrip(40)).toBeNull();
  });
});
