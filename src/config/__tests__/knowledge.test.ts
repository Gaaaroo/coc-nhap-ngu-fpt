import { describe, expect, it } from 'vitest';
import { cardsForWeaknesses, knowledgeCards } from '../knowledge.config';
import { SCORE_GROUPS } from '../../domain/types';

describe('cardsForWeaknesses', () => {
  it('returns only the two defect groups, in weakness order', () => {
    const cards = cardsForWeaknesses(['physical', 'activity']);
    expect(cards.map((c) => c.group)).toEqual(['physical', 'activity']);
    expect(cards).toHaveLength(2);
  });

  it('skips a group that has no card', () => {
    const cards = cardsForWeaknesses(
      ['activity'],
      knowledgeCards.filter((c) => c.group !== 'activity'),
    );
    expect(cards).toEqual([]);
  });

  it('has a card for every score group so any weakness can be taught', () => {
    for (const group of SCORE_GROUPS) {
      expect(knowledgeCards.some((card) => card.group === group)).toBe(true);
    }
  });
});
