# Mode switch

**Status:** Stable · **Source:** `ModeSwitch.tsx`, `ModeSwitch.css`

## Overview

The architectural "existing ⇄ proposed" convention as a toggle. Used on case study site plans to switch between what was there and what shipped.

## Anatomy

```
┌───────────────────────────────────┐
│ Existing  [■─────]  Proposed       │  44px, 1px ink border, square
└───────────────────────────────────┘
```

1. **Container**: `button`, `role="switch"`, 44px min height, `line.thin` ink, paper, square corners, `type.label`
2. **Labels**: "Existing" and "Proposed"; the inactive one is graphite
3. **Track**: 40×16, 1px ink
4. **Thumb**: 16×10 ink block; slides 18px and turns marker when on

## States

| State | Spec |
|---|---|
| Off (existing) | Thumb left, ink; "Proposed" graphite |
| On (proposed) | Thumb right, marker; "Existing" graphite; `aria-checked="true"` |
| Focus | System ring |
| Hover | No change today |

Thumb moves with `motion.reveal` (280ms `pen`).

## Accessibility

`role="switch"` with `aria-checked`; label "Existing Proposed: show what shipped".

## Do and don't

| Do | Don't |
|---|---|
| Use it only for a before/after of the same drawing | Use it as a general on/off setting |
