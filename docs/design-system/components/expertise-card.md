# Expertise card and deck

**Status:** Stable · **Source:** `Skills.tsx`, `Skills.css`, `Parti.css`, `PrinciplePartis.tsx`

## Overview

"Core Expertise": eight disciplines, each with a hand-drawn parti that explains the idea and two proof points underneath. On desktop the cards are raised papers in a grid; on phones they're a swipeable stack.

## Anatomy

```
╭─────────────────────╮
│   ┌─┐   parti       │ 1 drawing (max 120px; 150px in deck)
│   └─┘               │
│ Marketplaces        │ 2 title, 18px 600, two-line min height
│ • +30% qualified …  │ 3 points, 16px graphite, disc bullets
│ • Guests who …      │
╰─────────────────────╯
```

1. **Parti**: SVG 160×120 with pencil filter; one blue element is the idea ([partis](../foundations/iconography.md#partis-diagrams))
2. **Title**: `type.title`; `min-height: 2.6em` in the grid so points align
3. **Points**: two results, `type.body.compact` graphite, disc markers in graphite

## Variants

| Variant | When | Surface |
|---|---|---|
| **Grid card** | `(hover: hover)` and ≥ 600px | `surface.raised`, `border.raised`, `radius.md`, `elevation.paper` |
| **Deck paper** | < 600px | Same paper, square corners, stacked with a fan (0°, 1.8°, -1.6°, 1.2°), title 22px |
| **List row** | Touch devices ≥ 600px | No paper; 72px drawing beside title and points |

Toolkit sits underneath: a `dl` of tool groups, 2 columns, 5 from 760px.

## States

| State | Grid | Deck |
|---|---|---|
| Default | Paper shadow | Top card flat, three fanned behind |
| Entering (scroll) | From a pile: translateY(40px), 94%, transparent; fans out 70ms apart over 700ms | n/a |
| Hover | Shadow deepens; one or two parts of the drawing nudge and ease back on leave | n/a |
| Dragging | n/a | Top card follows the finger and tilts (`drag / 18` degrees) |
| Dismissed | n/a | Slides off at -118%, -10°; next comes up |
| Disabled nav | n/a | Prev arrow at first card, next at last: 0.3 opacity |

## Accessibility

- Deck: the list is focusable, `aria-roledescription="carousel"`, labelled "Core expertise, swipe or use the arrows". Arrow keys move. Cards not on top are `aria-hidden`. The counter ("3 of 8, swipe the sheet") is a polite live region.
- Drawings are `aria-hidden`; the title and points carry the content.
- Reduced motion: no fan, no nudges, instant deck moves.

## Content

Title is the discipline. Points are proof, result first, from the CV.

## Do and don't

| Do | Don't |
|---|---|
| Draw a new parti for a new discipline | Reuse a parti for two disciplines |
| Keep exactly two points | Add a third to one card only |

## Tokens

| Token | Value |
|---|---|
| `expertise.surface` | `color.surface.raised` |
| `expertise.border` | `line.thin` `color.border.raised` |
| `expertise.shadow.rest / hover` | `elevation.paper` / `0 20px 28px -14px` at 0.4 |
| `expertise.drawing.max` | 120px grid, 150px deck |
| `expertise.fan` | `motion.signature`, `motion.stagger` |
| `expertise.nudge` | 420ms `(0.3, 0.7, 0.2, 1)` |
| `expertise.deck.move` | 460ms `settle` |
