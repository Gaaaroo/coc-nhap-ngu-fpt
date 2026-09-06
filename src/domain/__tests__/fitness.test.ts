import { describe, expect, it } from 'vitest';
import { calcFitness } from '../fitness';
import { scoringConfig } from '../../config/scoring.config';

describe('calcFitness', () => {
  it('maps zero and over-cap for both genders', () => {
    expect(calcFitness(0, 'female', scoringConfig).score).toBe(30);
    expect(calcFitness(0, 'male', scoringConfig).score).toBe(30);
    expect(calcFitness(80, 'female', scoringConfig).score).toBe(100);
    expect(calcFitness(80, 'male', scoringConfig).score).toBe(100);
  });

  it('uses gender-specific FSD thresholds', () => {
    expect(calcFitness(4, 'female', scoringConfig).score).toBe(30);
    expect(calcFitness(5, 'female', scoringConfig).score).toBe(60);
    expect(calcFitness(13, 'female', scoringConfig).score).toBe(100);
    expect(calcFitness(5, 'male', scoringConfig).score).toBe(30);
    expect(calcFitness(6, 'male', scoringConfig).score).toBe(60);
    expect(calcFitness(16, 'male', scoringConfig).score).toBe(100);
  });
});
