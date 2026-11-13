# Polaroid

**Status:** Stable · **Source:** `Hero.tsx`, `Hero.css` (`.hero__polaroid*`, `.hero__smile`, `.hero__polaroid-back`, `.hero__flip`)

## Overview

Ashni's portrait as a print, in the same paper language as the field notes. It's the human anchor of the hero: a photo, a handwritten hello, and on phones, a back you can turn over to read the role.

## Anatomy

```
   ┌────────────────────────┐   raised paper, 1px ink-55% edge, paper shadow
   │                        │
   │ │                    │ │
   │ │      photo 4:5      │ │
   │ │                    │ │
   │                        │
   │ Hi! I'm Ashni ☺        │   Caveat 28px + smile line icon
   │ Senior Product Designer │  phone only: 12px graphite role (no flip icon; tap the print to flip)
   └────────────────────────┘   rotated 2°
```

1. **Print**: `surface.raised`, `border.raised`, `elevation.paper`, 16/16/12px padding, square corners, `rotate: 2deg`
2. **Photo**: 4:5, `object-fit: cover`, eager, `fetchpriority="high"`
4. **Caption**: "Hi! I'm Ashni" in Caveat 28px (22px phone) with a smile drawn in blue line
5. **Back** (phone): same paper; role line in Caveat 26px marker, centred
6. **Flip button** (phone): invisible full-size button over the print

## States

| State | Pointer devices | Phone |
|---|---|---|
| Default | Rotated 2°, paper shadow | Rotated 2° |
| Hover | Straightens to 0°, shadow deepens, smile winks and smirks (no crop marks since 13 Nov 2026) | n/a |
| Focus | n/a (not interactive on desktop) | 2px ink ring at 4px on the flip button |
| Flipped | n/a | `rotateY(180deg)` over 600ms, back shows role line; `aria-pressed="true"` |
| Loading | Drops in at 1.1s from -24px and 8° | Drops in at 0s |

## Responsive

| Width | Behaviour |
|---|---|
| < 600px | First thing on screen, 80% width, centred. The role sits on the caption and on the back of the print. Tap the print to flip it. |
| ≥ 600px | Right column of the hero, justified to the end. Hover interactions only on `(hover: hover)` devices. |

## Accessibility

- The photo has descriptive alt text.
- The flip button's label says what will happen ("Flip the polaroid to read my role" / "… back to the photo") and exposes `aria-pressed`.
- The role line is in the DOM on both sides, so nothing is lost to screen readers.
- Reduced motion: no drop-in; flip still works but is instant.

## Content

Caption is Ashni's own: "Hi! I'm Ashni". The back repeats the role line exactly as the hero writes it.

## Do and don't

| Do | Don't |
|---|---|
| Keep it square-cornered and slightly tilted | Round the corners or straighten it at rest |
| Use one print in the hero | Add more polaroids to the hero |
| Keep the caption in Ashni's voice | Put a job title in Caveat on desktop |

## Tokens

| Token | Value |
|---|---|
| `polaroid.surface` | `color.surface.raised` |
| `polaroid.border` | `line.thin` `color.border.raised` |
| `polaroid.shadow.rest / hover` | `elevation.paper` / `elevation.paper-hover` |
| `polaroid.padding` | `space.3 space.3 12px` |
| `polaroid.rotate.rest / hover` | 2deg / 0deg |
| `polaroid.photo.ratio` | 4 / 5 |
| `polaroid.caption` | `type.annotation` at 28px |
| `polaroid.flip.duration` | 600ms `(0.3, 0.7, 0.2, 1)` |
