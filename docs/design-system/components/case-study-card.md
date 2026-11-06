# Case study card

**Status:** Stable · **Source:** `Work.tsx`, `CardCarousel.tsx`, `Work.css`, data in `src/data/content.ts`

## Overview

The entry point to each case study. Image first, outcome up top, one lead metric in blue, and the whole card is one target.

## Anatomy

```
┌──────────────────────────────┬─────────────────────────┐
│                              │ HeadBox      (Outcome)  │ 1 meta + outcome pill
│                              │ Venue Finder            │ 2 title (link)
│     carousel (graph paper)   │ Summary …               │ 3 summary
│                              │ ───────────────         │
│                     ▪ ▫ ▫    │ +30%                    │ 4 lead metric
│                              │ qualified enquiries     │
│                              │ ▢ supporting metric     │ 5 supporting (box bullets)
│                              │ (tag) (tag) (tag)       │ 6 tags, max 3
│                              ├─────────────────────────┤
│                              │ Read case study      →  │ 7 CTA
└──────────────────────────────┴─────────────────────────┘
```

1. **Meta**: company (label, graphite) and outcome [chip](chip.md) (marker pill)
2. **Title**: `type.heading.card`, a link whose `::after` stretches over the card
3. **Summary**: body
4. **Lead metric**: `type.metric` in marker, tabular, with a label; hairline rule above
5. **Supporting metrics**: 16px, box bullets
6. **Tags**: up to 3 [chips](chip.md)
7. **CTA**: full-width card CTA [button](button.md#variants), `aria-hidden`
8. **Carousel**: 2–3 slides, graph-paper well, square dots bottom right
9. **Registration marks**: 12px ink corners at -7px on hover

## Variants

| Variant | When |
|---|---|
| With images | `images` set in content: real slides, `cover` from the top or `contain` on graph paper, optional slide background |
| Placeholder | No images yet: each slide is a labelled drawing frame ("Drawing 01a", "Key screens to come") |

## States

| State | Edge | Marks | CTA | Carousel |
|---|---|---|---|---|
| Default | `border.subtle` | Hidden | Secondary | Slide 1 |
| Hover | `border.strong` + 0.5px ring | Shown | Primary (ink) | Jumps to slide 2, then cycles every 1.6s |
| Focus within | Same as hover, plus 2px marker ring around the card | Shown | Primary | Cycles |
| Leave | Back to default | Hidden | Secondary | Returns to slide 1 |

## Responsive

| Width | Layout |
|---|---|
| < 900px | Stacked: 16:10 image on top, body below, `space.4` gap between cards |
| ≥ 900px | Horizontal row, 7fr image / 5fr body, body padding `space.4 + 16px`, `space.5` gap between cards |

## Accessibility

- `article` labelled by its title; one real link (the title) covering the card.
- The CTA and carousel are `aria-hidden` so the card is announced once.
- The focus ring moves to the card with `:has(.card__link:focus-visible)`.
- Carousel never autoplays under reduced motion.

## Content

- **Title:** the product name.
- **Outcome pill:** which of the section's three levers it solves (conversion, supply growth, activation).
- **Lead metric:** one number from the CV, with a plain label. Never a match rate.
- **Supporting:** two short results, result first.
- **Tags:** max 3 (sector, model, skill).

## Do and don't

| Do | Don't |
|---|---|
| One lead metric per card | Two blue numbers |
| Real screens or labelled placeholders | Stock or invented screens |
| Keep cards in a single column list | Put three cards in a row; the metric gets lost |

## Tokens

| Token | Value |
|---|---|
| `case-card.surface` | `color.surface.page` |
| `case-card.border.rest / hover` | `color.border.subtle` / `color.border.strong` |
| `case-card.radius` | `radius.md` |
| `case-card.registration` | 12px, `line.building`, -7px |
| `case-card.media.ratio` | 16 / 10 stacked |
| `case-card.media.surface` | `color.surface.sunken` + 24px graph paper |
| `case-card.columns` | 7fr 5fr (≥ 900px) |
| `case-card.body.padding` | `space.4 space.3` → `space.4` (≥ 600) → `space.4 + 16px` (≥ 900) |
| `case-card.metric` | `type.metric`, `color.text.accent` |
| `case-card.cta.height` | 56px |
| `case-card.carousel.interval` | 1600ms |
| `case-card.carousel.fade` | `motion.reveal` |
