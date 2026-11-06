# Paper sheet (section)

**Status:** Stable · **Source:** `global.css` (`.paper-sheet`, `.section`), `useSheetStack.ts`, `Work.css`

## Overview

Each home page section is a sheet of paper. It scrolls normally until its bottom reaches the viewport, then pins, and the next sheet slides up over it, like turning through a drawing set.

## Anatomy

1. **Sheet**: `position: sticky`, `top: var(--stick-top)`, paper background
2. **Edge**: 1px ink line on top plus a soft upward shadow (`elevation.sheet`); the first sheet has none
3. **Container**: `.container` inside, max 1280px
4. **Section padding**: `.section` gives `space.6` top and `space.7` bottom

`useSheetStack` sets `--stick-top` per sheet so a sheet taller than the viewport is read in full before it pins.

## Variants

| Variant | Background | Where |
|---|---|---|
| Page | `surface.page` with grain | Hero, About, Contact |
| Deep | `surface.deep` with cold-press watercolour relief | Selected work |
| Blueprint | `color.blueprint.600` with a 16px white grid | Footer title sheet (not sticky) |

## Responsive

The same on every width. The Work sheet trims its top padding to 30px so the cards peek above the fold.

## Accessibility

- Each sheet is a `section` with `aria-labelledby` pointing at its heading.
- **Reduced motion:** sheets become `position: relative` and scroll normally.
- In-page navigation focuses sections with `tabindex="-1"`, which are excluded from the focus ring.

## Do and don't

| Do | Don't |
|---|---|
| Use a deep sheet to separate the work from the story | Give every section a different paper |
| Let tall sheets scroll fully before pinning | Nest a sticky sheet inside another |
