import type { ScoreGroup } from '../../domain/types';

/**
 * Icon line-art cho sáu nhóm chỉ số. Nét vuông, đầu cắt thẳng để khớp
 * với hai icon back/skip có sẵn trong ScreenShell.
 */

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const;

const paths: Record<ScoreGroup, JSX.Element> = {
  // Tạ đôi
  physical: (
    <>
      <path d="M3 9v6M6 7v10M18 7v10M21 9v6" {...STROKE} />
      <path d="M6 12h12" {...STROKE} />
    </>
  ),
  // Trăng khuyết
  sleep: (
    <>
      <path d="M20 14.4A8.4 8.4 0 1 1 9.6 4a6.6 6.6 0 0 0 10.4 10.4Z" {...STROKE} />
      <path d="M17 4.5v2M16 5.5h2" {...STROKE} strokeWidth={1.5} />
    </>
  ),
  // Bát cơm nóng
  nutrition: (
    <>
      <path d="M3 12h18" {...STROKE} />
      <path d="M5 12v1a7 7 0 0 0 14 0v-1" {...STROKE} />
      <path d="M9 4v3M12 3v4M15 4v3" {...STROKE} strokeWidth={1.5} />
    </>
  ),
  // Giọt nước
  hydration: <path d="M12 3l6 7.6a6 6 0 1 1-12 0Z" {...STROKE} />,
  // Tia sét
  activity: <path d="M13 2 4 14h7l-1 8 9-12h-7z" {...STROKE} />,
  // Cái đầu và tia sáng bên trong
  mental: (
    <>
      <circle cx="12" cy="12" r="8.5" {...STROKE} />
      <path
        d="M12 5.5c.65 4.3 2.2 5.85 6.5 6.5-4.3.65-5.85 2.2-6.5 6.5-.65-4.3-2.2-5.85-6.5-6.5 4.3-.65 5.85-2.2 6.5-6.5Z"
        fill="currentColor"
      />
    </>
  ),
};

interface Props {
  group: ScoreGroup;
  className?: string;
}

export function GroupIcon({ group, className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {paths[group]}
    </svg>
  );
}
