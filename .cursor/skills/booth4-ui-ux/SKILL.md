---
name: booth4-ui-ux
description: Applies the Booth 4 (Cóc Nhập Ngũ 2026) UI/UX system when designing, building, restyling, or reviewing any screen, component, copy, motion, or Tailwind token. Use for React/Vite/Tailwind UI, mobile-first booth flows, avatar crop, quiz, results, accessibility, and Vietnamese tân-binh voice.
---

# Booth 4 UI/UX System

Read this skill before writing or changing any UI. Tokens, components, and screens live in sibling files — load only what the task needs.

| Need | File |
| --- | --- |
| Color, type, space, motion | [tokens.md](tokens.md) |
| Buttons, stepper, cards, radar | [components.md](components.md) |
| 12-screen flow layout | [screens.md](screens.md) |
| Why these rules exist | [sources.md](sources.md) |

Product: Web App Booth 4, event kiosk on phones, 3–5 minutes, ages 18–25, outdoor light, shared devices. Concept: tân binh / nhập ngũ. Language: Vietnamese.

## Before any UI work

1. Name the screen's single job (one verb).
2. Pull tokens from [tokens.md](tokens.md) — never invent a one-off hex or font.
3. Sketch the thumb-zone: primary CTA at the bottom, content above.
4. Check the screen against the laws below.
5. If restyling, keep the same component names and states as [components.md](components.md).

## Hard laws (never violate)

1. **No software keyboard** for age, height, weight, or reps. Use `NumberStepper`.
2. **Touch target ≥ 48×48 CSS px**, 8px gap. Primary CTA ≥ 56px tall. (Material 48dp; Apple 44pt is the floor.)
3. **Contrast ≥ 4.5:1** for body text, ≥ 3:1 for large text and UI chrome (WCAG 2.2 AA). Outdoor booth → prefer 7:1 on body when cheap.
4. **Fonts:** Oswald (display) + Be Vietnam Pro (body). Self-host, Vietnamese subset. Never Black Ops One / Stencil / Bungee.
5. **Banned strings:** "Fertility Score", "Reproductive Health Score", and any medical-diagnosis voice (BR-11).
6. **One primary action** per screen, pinned to the bottom thumb zone with `env(safe-area-inset-bottom)`.
7. **Honor `prefers-reduced-motion`.** Calculating-screen theatrics become a 200ms fade.
8. **No Inter / Roboto / system-ui as display. No purple-on-white SaaS chrome. No cream+serif+terracotta AI default.**

## Aesthetic direction

Signature (spend boldness here only): **dog-tag result card** + **ammo-belt progress** + **brass-on-olive**.

Materials, not metaphors: stamped metal, webbing, stencil numbers, olive drab, khaki, aged brass. Structure should feel like a field booklet (numbered steps, ruled dividers), because the flow *is* a sequence.

Copy voice: tân binh, active, short. Buttons name the outcome: "Bắt đầu kiểm tra", "Chọn ảnh", "Tải về". Errors tell how to fix. Disclaimer is always visible on Landing and Result — not a joke, not tiny.

## Distinctiveness check (Anthropic frontend-design)

If the mock could pass for a generic fitness quiz or a generic dark dashboard, it fails. Revise until a still frame reads "booth nhập ngũ", not "Tailwind template".

## Implementation defaults

- Mobile-first at **390×844**, then `min-width` only if needed. Do not design desktop-first.
- Tailwind tokens mapped in `tailwind.config` / `@theme` from [tokens.md](tokens.md).
- Components in `src/components/ui/` — no ad-hoc buttons inside feature folders.
- Motion: Framer Motion, one orchestrated moment per screen max, 150–200ms elsewhere.
- Images: never `background-size: cover` on faces without crop control.

## Review checklist

- [ ] Uses only named tokens
- [ ] CTA in thumb zone, 56px+, Vietnamese label
- [ ] Stepper not `<input type="number">`
- [ ] Focus-visible ring 3:1 against adjacent background
- [ ] Reduced-motion path exists
- [ ] Disclaimer on Landing and Result
- [ ] No keyboard, no banned medical terms
- [ ] Contrast checked on the actual token pair
