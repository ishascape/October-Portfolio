# Field notes pile

**Status:** Stable · **Source:** `FieldStrip.tsx`, `About.css` (`.field-notes__*`, `.figure*`), data in `content.ts` (`fieldNotes`)

## Overview

Life outside work as a loose pile of prints on a desk. Pick one up to read it; put it back and it goes on top.

## Anatomy

```
        ╱‾‾‾‾‾‾‾╲  ╱‾‾‾‾‾╲
      ┌──────────────┐      scattered prints at 60% scale, -11° to +11°
      │  photo       │
      │              │
      │ Travel       │      group label (label, graphite)
      │ Ballooning…  │      caption (Caveat)
      └──────────────┘
   (←)   Pick a page   (→)  deck nav: icon buttons + text button
```

1. **Print**: `surface.raised`, `border.raised`, `elevation.paper`, square corners, `space.3` padding
2. **Photo**: natural ratio, crop marks on hover; or a dashed placeholder frame ("Fig. 3")
3. **Group label**: `type.label`, graphite
4. **Caption**: `type.annotation`, graphite → ink on hover
5. **Deck nav**: previous and next [icon buttons](button.md#icon-button), centre [text button](button.md#text-button)

Scatter positions come from each print's index (golden angle), so the pile never jumps on render.

## States

| State | Print |
|---|---|
| Default | Scattered, 60% scale, rotated |
| Hover | Shadow deepens (`elevation.paper-hover`), crop marks, caption to ink |
| Focus | 2px ink ring at 4px |
| Open | Straight, 100%, on top, `elevation.paper-lifted`, `aria-expanded="true"` |
| Put back | Returns to its scatter position on top of the pile |

Centre button: "Pick a page" (disabled, out of tab order) when nothing is open; "Back to the pile" when one is.

## Responsive

| Width | Layout |
|---|---|
| < 1024px | Pile max 480px, centred under the copy |
| ≥ 1024px | Copy and pile in two equal columns, 80px apart; pile at 75% of its column |

## Accessibility

- Each print is `role="button"` with a verb label ("Open Ballooning in Cappadocia", "Put back …"), `aria-expanded`, Enter and Space to toggle.
- Esc puts the open print back.
- Arrow buttons are labelled "Previous page" and "Next page".
- Reduced motion: moves are instant.

## Do and don't

| Do | Don't |
|---|---|
| Use real photos with a short, specific caption | Use the pile for work content |
| Keep prints square-cornered | Add a print without alt text |

## Tokens

| Token | Value |
|---|---|
| `print.surface / border / shadow` | `color.surface.raised` / `color.border.raised` / `elevation.paper` |
| `print.pile.scale` | 0.6 |
| `print.pile.rotate` | -11° to +11° |
| `print.move` | `motion.paper` (480ms `settle`) |
| `print.focus` | 2px ink, 4px offset |
