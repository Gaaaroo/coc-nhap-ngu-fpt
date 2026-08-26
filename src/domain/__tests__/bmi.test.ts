import { describe, expect, it } from 'vitest';
import { calcBmi, roundBmiDisplay } from '../bmi';
import { scoringConfig } from '../../config/scoring.config';

const cfg = scoringConfig;

describe('calcBmi', () => {
  it('uses raw value for band edges, not the displayed round', () => {
    const metrics = { heightCm: 170, weightKg: 72.1 };
    const { value, band } = calcBmi(metrics, cfg);
    expect(roundBmiDisplay(value)).toBe('24.9');
    expect(band).toBe('fit');
  });

  it('assigns fit at 18.5 inclusive and 25 exclusive', () => {
    expect(calcBmi({ heightCm: 200, weightKg: 74 }, cfg).band).toBe('fit');
    const at25 = calcBmi({ heightCm: 200, weightKg: 100 }, cfg);
    expect(at25.value).toBeCloseTo(25, 5);
    expect(at25.band).toBe('high');
  });

  it('covers under and veryHigh', () => {
    expect(calcBmi({ heightCm: 170, weightKg: 45 }, cfg).band).toBe('under');
    expect(calcBmi({ heightCm: 160, weightKg: 90 }, cfg).band).toBe('veryHigh');
  });
});
