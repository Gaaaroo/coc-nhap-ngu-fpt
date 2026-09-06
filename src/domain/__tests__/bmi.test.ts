import { describe, expect, it } from 'vitest';
import { calcBmi, roundBmiDisplay } from '../bmi';
import { scoringConfig } from '../../config/scoring.config';

const cfg = scoringConfig;

describe('calcBmi', () => {
  it('rounds to 1 decimal then assigns Asian BMI bands', () => {
    const metrics = { heightCm: 170, weightKg: 72.1 };
    const { value, band, score, label } = calcBmi(metrics, cfg);
    expect(roundBmiDisplay(value)).toBe('24.9');
    expect(band).toBe('high');
    expect(score).toBe(75);
    expect(label).toBe('Thừa cân');
  });

  it('assigns fit at 18.5 inclusive and high at 23 inclusive', () => {
    expect(calcBmi({ heightCm: 200, weightKg: 74 }, cfg).band).toBe('fit');
    const at23 = calcBmi({ heightCm: 200, weightKg: 92 }, cfg);
    expect(at23.value).toBeCloseTo(23, 5);
    expect(at23.band).toBe('high');
  });

  it('covers under, obese1 and obese2', () => {
    expect(calcBmi({ heightCm: 170, weightKg: 45 }, cfg).band).toBe('under');
    const obese1 = calcBmi({ heightCm: 200, weightKg: 100 }, cfg);
    expect(obese1.value).toBeCloseTo(25, 5);
    expect(obese1.band).toBe('obese1');
    expect(calcBmi({ heightCm: 160, weightKg: 90 }, cfg).band).toBe('obese2');
  });
});
