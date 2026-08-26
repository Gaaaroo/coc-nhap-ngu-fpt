import { describe, expect, it } from 'vitest';
import { calcFitness } from '../fitness';
import { scoringConfig } from '../../config/scoring.config';

describe('calcFitness', () => {
  it('maps zero and over-cap for both genders', () => {
    expect(calcFitness(0, 'female', scoringConfig).band).toBe('low');
    expect(calcFitness(0, 'male', scoringConfig).band).toBe('low');
    expect(calcFitness(80, 'female', scoringConfig).band).toBe('peak');
    expect(calcFitness(80, 'male', scoringConfig).band).toBe('peak');
  });

  it('uses gender-specific thresholds', () => {
    expect(calcFitness(7, 'female', scoringConfig).band).toBe('fair');
    expect(calcFitness(7, 'male', scoringConfig).band).toBe('low');
  });
});
