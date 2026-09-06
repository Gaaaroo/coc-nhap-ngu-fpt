import { describe, expect, it } from 'vitest';
import { cardsForWeaknesses, knowledgeCards } from '../knowledge.config';
import { SCORE_TOPICS } from '../../domain/types';

describe('cardsForWeaknesses', () => {
  it('returns only the two defect topics, in weakness order', () => {
    const cards = cardsForWeaknesses(['fitness', 'activity']);
    expect(cards.map((c) => c.group)).toEqual(['fitness', 'activity']);
    expect(cards).toHaveLength(2);
  });

  it('skips a topic that has no card', () => {
    const cards = cardsForWeaknesses(['activity'], knowledgeCards.filter((c) => c.group !== 'activity'));
    expect(cards).toEqual([]);
  });

  it('has a card for every score topic so any weakness can be taught', () => {
    for (const topic of SCORE_TOPICS) {
      expect(knowledgeCards.some((card) => card.group === topic)).toBe(true);
    }
  });
});
