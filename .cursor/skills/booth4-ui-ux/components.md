# Components

Build these once in `src/components/ui/`. Features compose them; they do not restyle locally.

Every interactive component documents: default, pressed, focus-visible, disabled, loading (if async), error (if input).

Focus ring: 2px `--brass` offset 2px. Must meet 3:1 vs adjacent background (WCAG 2.4.7 / 1.4.11).

## Button

| Variant | Fill | Ink | When |
| --- | --- | --- | --- |
| `primary` | `--brass` | `--on-brass` | One per screen, bottom sticky |
| `secondary` | transparent + `--outline` | `--ink` | Share vs Download pair |
| `ghost` | none | `--brass` | Back, skip-disabled (usually hidden) |
| `danger` | `--danger` | `#1A1408` | Idle-reset confirm |

Height 56 primary / 48 others. Full width in the bottom bar. Label: sentence case Vietnamese, verb-first, max ~24 characters.

Do not disable the primary without saying why underneath. Prefer preventing the state (incomplete stepper) over a greyed button.

## NumberStepper

Replaces all numeric inputs.

```
[ − ]   170 cm   [ + ]
```

- Hit areas 48×48, 8px gap.
- Press-and-hold after 400ms repeats (NN/g recognition over recall: unit visible at all times).
- Defaults: age 20, height 165, weight 55, reps 0.
- Clamp to domain ranges from Tech Spec. At bound, that side `disabled` + `aria-disabled`.
- Live region: announce value on change (`aria-live="polite"`).
- No `<input type="number">`, no native picker.

## OptionCard (quiz / gender)

Full-width row, min-height 56, 8px between cards. Selected: 2px `--brass` rule + `--surface-2`. Tap → 250ms selected state → auto-advance (quiz only). Gender stays on screen until primary CTA.

## ProgressBelt

Header slot. 5 cells = 5 lifestyle groups (quiz) or 12 ticks = flow steps (optional, quieter). Filled cells `--brass`, empty `--outline`. `role="progressbar"` with `aria-valuenow`.

Do not use a percent number in the header — it invites "this is a medical score". Use "Câu 3/12" or group names.

## DogTagCard (result)

The signature. Horizontal plate, 2px brass edge, Oswald data number, Be Vietnam Pro labels. Strengths on the left with `--healthy` pip + text; weaknesses on the right with `--defect` pip + text. Radar SVG sits above, not inside a third-party chart.

## DisclaimerWell

Always two places: Landing (before start) and Result (below scores). Icon + 14–16px body. Not a modal that can be skipped without reading; require a short scroll or a visible block above the CTA.

Copy is legal, not witty. Pull from `copy.config.ts` when it exists.

## KnowledgeSwipe

One card, one idea. Peek of next card on the right (recognition). `aria` page indicator. Complete only after last card. Fallback buttons "Trước / Tiếp" for reduced-motion and in-app browsers that eat swipe.

## CropViewport

Square, max 100vw − 32px. Handles ≥ 48px. Darken outside crop (`#00000099`). Confirm CTA "Dùng ảnh này". Never auto-upload.

## ShareBar

Primary "Chia sẻ", secondary "Tải về". If `canShare({files})` is false, hide Share and promote Download; if in-app browser (Zalo), show "Mở bằng trình duyệt" instead of a dead Share.

## IdleOverlay

After 90s idle: 10s countdown on `--danger` well, then reset. Large "Tiếp tục" (stay) and "Lượt mới". Shared-device pattern, not a punishment.

## Radar (SVG)

Pentagon, labels outside in Be Vietnam Pro 13px. Fill `--brass` at 35% opacity, stroke `--brass`. Axis lines `--outline`. Values 0–100 from `ScoreResult.groups`. No legend that says "score".
