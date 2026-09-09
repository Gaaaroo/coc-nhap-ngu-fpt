export interface FrameRank {
  min: number;
  label: string;
}

/** Inclusive ranges via descending `min`: 0–40, 41–60, 61–70, 71–80, 81–90, 91–100. */
export function frameTitleOf(total: number, ranks: readonly FrameRank[]): string {
  const score = Math.min(100, Math.max(0, Math.round(total)));
  return ranks.find((r) => score >= r.min)?.label ?? ranks[ranks.length - 1]?.label ?? '';
}
