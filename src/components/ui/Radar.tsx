import { copy } from '../../config/copy.config';
import { LIFESTYLE_GROUPS } from '../../domain/types';
import type { LifestyleGroup } from '../../domain/types';

interface Props {
  values: Record<LifestyleGroup, number>;
}

const CX = 120;
const CY = 118;
const R = 72;

function point(index: number, value: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
  const t = Math.max(0, Math.min(100, value)) / 100;
  return {
    x: CX + Math.cos(angle) * R * t,
    y: CY + Math.sin(angle) * R * t,
  };
}

function axis(index: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
  return {
    x: CX + Math.cos(angle) * R,
    y: CY + Math.sin(angle) * R,
    lx: CX + Math.cos(angle) * 96,
    ly: CY + Math.sin(angle) * 96,
  };
}

export function Radar({ values }: Props) {
  const ring = LIFESTYLE_GROUPS.map((_, i) => axis(i));
  const poly = LIFESTYLE_GROUPS.map((g, i) => point(i, values[g]));
  const polyAttr = poly.map((p) => `${p.x},${p.y}`).join(' ');
  const outline = ring.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 240 236" className="w-full" role="img" aria-label="Biểu đồ 5 nhóm lối sống">
      <polygon points={outline} fill="none" stroke="#6B614E" strokeWidth="1" />
      {ring.map((p, i) => (
        <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#6B614E" strokeWidth="1" />
      ))}
      <polygon points={polyAttr} fill="#E0A84A59" stroke="#E0A84A" strokeWidth="2" />
      {ring.map((p, i) => (
        <text
          key={LIFESTYLE_GROUPS[i]}
          x={p.lx}
          y={p.ly}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F3EDE0"
          fontSize="11"
          fontFamily="Be Vietnam Pro, sans-serif"
        >
          {copy.groups[LIFESTYLE_GROUPS[i]]}
        </text>
      ))}
    </svg>
  );
}
