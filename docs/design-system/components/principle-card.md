# Principle card

**Status:** Stable · **Source:** `AiPrinciples.tsx`, `AiPrinciples.css`

## Overview

"How I design AI products": four short stances, each backed by evidence from a case study. The card is a container for a claim and its proof link.

## Anatomy

```
╭──────────────────────────╮
│ ◯↻  blue line icon 32px   │ 1 icon
│ Always define the         │ 2 title, 18px 600
│ guardrails.               │
│ Matches needed a 0.85 …   │ 3 body, 16px / 1.5
│                           │
│ Venue Finder matching →   │ 4 evidence link (accent link)
╰──────────────────────────╯
```

1. **Icon**: 32px line icon in marker, 1.75 stroke ([iconography](../foundations/iconography.md#line-icon-spec))
2. **Title**: `type.title`, a stance ending in a full stop
3. **Body**: `type.body.compact`; one or two paragraphs; optional bold closing line
4. **Link** (optional): [accent link](link.md) to the case study section that proves it

Container: `surface.page`, `line.thin` `border.subtle`, `radius.md`, `space.4` padding, `space.2` internal gap; the body flexes so links align at the bottom.

## Variants

| Variant | When |
|---|---|
| Evidence | Has a link to a case study anchor |
| Process | No link; ends with a bold closing line ("AI in my process") |

## States

The card is static. Only its link has hover (solid underline) and focus states.

## Responsive

| Width | Columns |
|---|---|
| < 700px | 1 |
| ≥ 700px | 2 |
| ≥ 1100px | 4 |

## Accessibility

- `section` with its own `h2`; cards are an `ol` of `h3`s.
- Icons are `aria-hidden`.
- Link text names the destination.

## Content

Every line must come from a case study page or the CV. Titles are stances, not topics. Bodies give the specific number or rule.

## Do and don't

| Do | Don't |
|---|---|
| Back each principle with a link to evidence | Write a principle you can't point to |
| Keep to four | Add a fifth to fill a row |

## Tokens

| Token | Value |
|---|---|
| `principle-card.surface` | `color.surface.page` |
| `principle-card.border` | `line.thin` `color.border.subtle` |
| `principle-card.radius` | `radius.md` |
| `principle-card.padding` | `space.inset.md` |
| `principle-card.icon.size / stroke / color` | 32px / 1.75 / `color.icon.accent` |
