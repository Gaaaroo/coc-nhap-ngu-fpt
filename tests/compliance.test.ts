import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { scoringConfig } from '../src/config/scoring.config';
import { questions } from '../src/config/questions.config';
import { LIFESTYLE_GROUPS } from '../src/domain/types';

const BANNED = [/fertility\s*score/i, /reproductive\s*health\s*score/i];

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx|md|css|html|json)$/.test(name)) acc.push(p);
  }
  return acc;
}

describe('config integrity', () => {
  it('component and group weights sum to 1', () => {
    const { bmi, fitness, lifestyle } = scoringConfig.componentWeights;
    expect(bmi + fitness + lifestyle).toBeCloseTo(1, 8);
    const g = Object.values(scoringConfig.groupWeights).reduce((s, n) => s + n, 0);
    expect(g).toBeCloseTo(1, 8);
  });

  it('every question belongs to a known group and has scored options', () => {
    for (const q of questions) {
      expect(LIFESTYLE_GROUPS).toContain(q.group);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.options.every((o) => typeof o.score === 'number')).toBe(true);
    }
    for (const g of LIFESTYLE_GROUPS) {
      expect(questions.some((q) => q.group === g)).toBe(true);
    }
  });
});

describe('BR-11 language ban', () => {
  it('does not appear in project source', () => {
    const root = join(process.cwd(), 'src');
    const hits: string[] = [];
    for (const file of walk(root)) {
      const text = readFileSync(file, 'utf8');
      for (const re of BANNED) {
        if (re.test(text)) hits.push(`${file} ~ ${re}`);
      }
    }
    expect(hits).toEqual([]);
  });
});
