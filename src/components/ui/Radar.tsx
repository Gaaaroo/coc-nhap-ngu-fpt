import { copy } from '../../config/copy.config';
import { LIFESTYLE_GROUPS } from '../../domain/types';
import type { LifestyleGroup } from '../../domain/types';

interface Props {
  values: Record<LifestyleGroup, number>;
}

const CX = 120;
const CY = 118;
const R = 72;
const BRASS = '#E2B34A';
const OUTLINE = '#6F6754';
const INK = '#F3EDE0';

function point(index: number, value: number, radius = R) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
  const t = Math.max(0, Math.min(100, value)) / 100;
  return {
    x: CX + Math.cos(angle) * radius * t,
    y: CY + Math.sin(angle) * radius * t,
  };
}

function axis(index: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
  return {
    x: CX + Math.cos(angle) * R,
    y: CY + Math.sin(angle) * R,
    lx: CX + Math.cos(angle) * 98,
    ly: CY + Math.sin(angle) * 98,
  };
}

function ringPoints(scale: number) {
  return LIFESTYLE_GROUPS.map((_, i) => {
    const p = point(i, 100, R * scale);
    return `${p.x},${p.y}`;
  }).join(' ');
}

export function Radar({ values }: Props) {
  const ring = LIFESTYLE_GROUPS.map((_, i) => axis(i));
  const poly = LIFESTYLE_GROUPS.map((g, i) => point(i, values[g]));
  const polyAttr = poly.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 240 248" className="w-full" role="img" aria-label={copy.result.chartLabel}>
      <polygon points={ringPoints(1)} fill="rgb(26 34 22 / 0.9)" stroke={OUTLINE} strokeWidth="1" />
      <polygon points={ringPoints(0.66)} fill="none" stroke={OUTLINE} strokeWidth="1" opacity="0.55" />
      <polygon points={ringPoints(0.33)} fill="none" stroke={OUTLINE} strokeWidth="1" opacity="0.4" />
      {ring.map((p, i) => (
        <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={OUTLINE} strokeWidth="1" />
      ))}
      <polygon points={polyAttr} fill="rgb(226 179 74 / 0.38)" stroke={BRASS} strokeWidth="2" />
      {poly.map((p, i) => (
        <circle key={LIFESTYLE_GROUPS[i]} cx={p.x} cy={p.y} r="3" fill={BRASS} />
      ))}
      {ring.map((p, i) => {
          const g = LIFESTYLE_GROUPS[i];
          return (
            <text
              key={g}
              x={p.lx}
              y={p.ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={INK}
              fontSize="11"
              fontFamily="Be Vietnam Pro, sans-serif"
            >
              <tspan x={p.lx} dy="-0.45em">
                {copy.groups[g]}
              </tspan>
              <tspan x={p.lx} dy="1.2em" fill={BRASS} fontFamily="Oswald, sans-serif" fontSize="12">
                {Math.round(values[g])}
              </tspan>
            </text>
          );
        })}
    </svg>
  );
}
