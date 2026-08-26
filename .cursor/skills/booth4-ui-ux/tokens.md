# Design tokens

All values are named. Feature code consumes Tailwind classes or CSS variables — never raw hex except inside this file.

Sources: Material 3 color *roles* (not Material purple), WCAG 2.2 1.4.3 / 1.4.11, 8dp grid (Material), type scale inspired by Material type ramp, BRD heading colors `#1F2937` / `#B45309`.

## Color roles (dark-first, outdoor)

Booth is used in sun. Dark olive + light khaki text beats a washed-out light theme.

| Role | Token | Hex | Use |
| --- | --- | --- | --- |
| Background | `--bg` | `#141810` | App canvas |
| Surface | `--surface` | `#1F2918` | Cards, sheets |
| Surface 2 | `--surface-2` | `#2A3522` | Nested well, stepper |
| On-surface | `--ink` | `#F3EDE0` | Body text |
| On-surface muted | `--ink-muted` | `#C4BBA8` | Secondary; still ≥ 4.5:1 on `--bg` |
| Primary (brass) | `--brass` | `#E0A84A` | CTA fill, progress fill, key numbers |
| On-primary | `--on-brass` | `#1A1408` | Text/icon on brass buttons |
| Primary container | `--brass-deep` | `#B45309` | Rules, eyebrows, BRD accent |
| Outline | `--outline` | `#6B614E` | Borders; ≥ 3:1 vs `--bg` (WCAG 1.4.11) |
| Strength | `--healthy` | `#8FBF6A` | Điểm Khỏe (never rely on color alone) |
| Weakness | `--defect` | `#E08A3C` | Điểm Khuyết (never rely on color alone) |
| Danger | `--danger` | `#E25C4A` | Destructive / idle reset |
| Disclaimer | `--disclaimer-bg` | `#2B2214` | Warning well |

Pairing rules (Material 3): text on a fill always uses the matching `on-*` role. Do not put `--ink` on `--brass`. Do not put `--brass-deep` as small body text on `--bg` (fails 4.5:1) — use `--brass` for small text, `--brass-deep` for ≥ 18pt/bold or for chrome.

Semantic aliases for copy/config:

- Điểm Khỏe → `--healthy` + icon `+` / shield, not color-only
- Điểm Khuyết → `--defect` + icon `!` / wrench, not color-only

## Type

| Role | Family | Weight | Size / line | Tracking |
| --- | --- | --- | --- | --- |
| Display | Oswald | 600–700 | 32–40 / 1.1 | 0.04em |
| Title | Oswald | 600 | 24 / 1.2 | 0.03em |
| Body | Be Vietnam Pro | 400–500 | 16 / 1.5 | 0 |
| Body large | Be Vietnam Pro | 500 | 18 / 1.45 | 0 |
| Caption | Be Vietnam Pro | 500 | 13 / 1.4 | 0.02em |
| Data | Oswald | 500 | 28–36 / 1 | 0.02em |

Minimum body: 16px (Apple HIG 11pt is too small for outdoor). Captions 13px only on non-essential chrome.

Load with `font-display: swap`, Vietnamese + latin subsets, self-hosted woff2. `html { font-size: 16px }`.

Banned display faces: Inter, Roboto, Arial, system-ui, Black Ops One, Stencil, Bungee, Anton (weak Vietnamese).

## Space (8dp grid)

`--space-1` 4 · `--space-2` 8 · `--space-3` 16 · `--space-4` 24 · `--space-5` 32 · `--space-6` 48

Screen padding: 16 horizontal, 16 top + `env(safe-area-inset-top)`, 16 + CTA height + `env(safe-area-inset-bottom)` at the bottom.

Card radius: 4px (stamped plate, not 16px pill-app). CTA radius: 4px. Pill chips (gender): 999px only for mutually exclusive choices.

## Elevation

No drop-shadow soup. One inset highlight `#ffffff14` on `--surface`, 1px `--outline` border. Result dog-tag may use a 2px brass rule.

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Screen enter |
| `--dur-fast` | 150ms | Press, toggle |
| `--dur-med` | 200ms | Screen swap |
| `--dur-unlock` | 900ms | Avatar unlock only |

`prefers-reduced-motion: reduce` → all durations 1ms except opacity 200ms; skip unlock choreography.

## Layout

- Max content width: 430px, centered.
- Hit area: `min-h-12 min-w-12` (48px). Primary: `min-h-14`.
- Thumb zone: bottom 88px of the visual viewport (NN/g / Hoober): primary button lives here.
- Progress: full-width ammo-belt under the header, not a circular spinner at the top-right.

## Tailwind mapping (implement once)

```
bg → bg-bg
surface → bg-surface
ink → text-ink
brass → bg-brass text-on-brass
font-display → font-oswald
font-body → font-bevietnam
```
