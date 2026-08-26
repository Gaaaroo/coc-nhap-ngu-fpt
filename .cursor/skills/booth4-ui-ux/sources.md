# Sources

Only standards and studios that are cited in industry practice. Community "AI skill packs" were scanned then **not** copied as authority — they remix these same sources, often without the constraints of this booth.

## Canonical (must follow)

| Source | What we took | Link |
| --- | --- | --- |
| **W3C WCAG 2.2** (Recommendation, 2023) | Contrast 4.5:1 / 3:1 (1.4.3), non-text 3:1 (1.4.11), target 24px min (2.5.8 AA) — we exceed with 48px; visible focus (2.4.7); reduced motion (2.3.3) | https://www.w3.org/TR/WCAG22/ |
| **Apple Human Interface Guidelines** | 44×44 pt hit target (iOS default 44, min 28); 11pt type floor (we use 16px body); contrast & spacing; buttons | https://developer.apple.com/design/human-interface-guidelines/ |
| **Google Material Design 3** | 48×48 dp touch target, 8dp spacing, color *roles* (primary / on-primary / surface), 8dp grid | https://m3.material.io/ · https://support.google.com/accessibility/android/answer/7101858 |
| **Nielsen Norman Group — 10 Usability Heuristics** | Visibility of status, match real world, error prevention, recognition not recall, aesthetic minimalism, consistency | https://www.nngroup.com/articles/ten-usability-heuristics/ |

## Implementation references (widely deployed)

| Source | What we took | Link |
| --- | --- | --- |
| **Anthropic `frontend-design` skill** (claude-code plugin) | Distinctive identity, anti-template pass, one signature element, copy as design material | https://github.com/anthropics/claude-code |
| **Google Fonts — Oswald** | Condensed display, Vietnamese subset, SIL OFL, very high adoption | https://fonts.google.com/specimen/Oswald |
| **Google Fonts — Be Vietnam Pro** (Lâm Bảo / Tony Le / ViệtAnh Nguyễn) | Body face engineered for Vietnamese diacritics | https://fonts.google.com/specimen/Be+Vietnam+Pro |
| **Web Share API** (W3C / MDN) | File share on mobile; user-gesture requirement | https://developer.mozilla.org/docs/Web/API/Web_Share_API |
| **PWA / Workbox** | Precache for booth wifi | https://developer.chrome.com/docs/workbox |

## Deliberately not used as law

- Random GitHub "designer-skills" packs (julianoczkowski, notque, etc.) — useful prompts, not standards.
- Dribbble / awwwards trends — not research.
- Material **purple** / Google blue as brand — we only reuse the *role* model.
- Stencil display fonts without a Vietnamese table.

## How this maps to Booth 4

| Booth constraint (BRD / Tech Spec) | Standard that justifies the UI rule |
| --- | --- |
| 3–5 min, no account, outdoor | NN/g aesthetic-minimal + error prevention; no keyboard |
| Shared phone at booth | Apple HIG large controls; idle reset |
| iPhone + Android mix | Meet **both** 44pt and 48dp → ship 48px |
| Vietnamese mission title | Be Vietnam Pro + Oswald, not stencil |
| Not a medical device | NN/g match-real-world + BR-11 copy ban |
| Weak booth wifi | PWA precache, self-hosted fonts |
