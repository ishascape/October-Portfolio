# Case study card

**Status:** Stable · **Source:** `Work.tsx`, `CardCarousel.tsx`, `Work.css`, data in `src/data/content.ts`

## Overview

The entry point to each case study. A looping clip first, outcome badge up top, one lead metric in blue, and the whole card is one target that pops on hover.

## Anatomy

```
┌──────────────────────────────┬─────────────────────────┐
│                              │ HeadBox      (Outcome)  │ 1 meta + outcome pill
│                              │ Venue Finder            │ 2 title (link)
│   6:5 looping clip           │ Summary …               │ 3 summary
│                              │ ───────────────         │
│   (or carousel)              │ +30%                    │ 4 lead metric
│                              │ qualified enquiries     │
│                              │ ▢ supporting metric     │ 5 supporting (box bullets)
│                              │ (chip) (chip) (chip)    │ 6 chips, 3 by default
│                              ├─────────────────────────┤ 1px marker-blue rule
│                              │ Read case study      →  │ 7 CTA
└──────────────────────────────┴─────────────────────────┘
```

1. **Meta**: company (label, graphite) and outcome [chip](chip.md) (marker pill)
2. **Title**: `type.heading.card`, a link whose `::after` stretches over the card
3. **Summary**: body
4. **Lead metric**: `type.metric` in marker, tabular, with a label; hairline rule above
5. **Supporting metrics**: 16px, box bullets
6. **Chips**: 3 by default, more when `cardTagCount` says so (TreeAssist shows 5). A chip never repeats the badge; `Work.tsx` filters any repeat out. See [chip](chip.md)
7. **CTA**: full-width card CTA [button](button.md#variants), `aria-hidden`
8. **Media**: a muted 6:5 looping clip (`CardVideo`) that plays while on screen, with its poster frame as fallback and a background in the clip's own colour so nothing flashes while it loads. All three cards use a clip today. The carousel (2-3 slides, dotted well, square dots) remains as the fallback when a case study has no `video`.

## Variants

| Variant | When |
|---|---|
| Video (live on all three) | `video` set in content: looping clip, poster, optional background colour |
| Carousel | No `video`: `images` as slides, `cover` from the top or `contain` on dotted paper |
| Placeholder | No images yet: each slide is a labelled drawing frame ("Drawing 01a", "Key screens to come") |

## States

| State | Edge | Pop | CTA |
|---|---|---|---|
| Default | `border.subtle` | None | Secondary, 1px marker-blue top rule |
| Hover (real pointers) | `border.strong` + 0.5px ring | Lifts 2px up-left, `elevation.pop` | Primary (ink fill), lifts with the card |
| Focus within | Same as hover, plus 2px marker ring around the card | Lifts, `elevation.pop` | Primary |
| Pressed | `border.strong` | Back in place, `elevation.pop-pressed` | Primary |
| Dark mode | Thin moonlight rim along the top edge in every state | Dimmed moonlight shadow | Pale ink fill |

The clip loops while the card is on screen regardless of hover. With the carousel variant, hover jumps to slide 2 and cycles every 1.6s.

## Responsive

| Width | Layout |
|---|---|
| < 900px | Stacked: 6:5 media on top, body below, `space.4` gap between cards |
| ≥ 900px | Horizontal row, 7fr image / 5fr body, body padding `space.4 + 16px`, `space.5` gap between cards |

## Accessibility

- `article` labelled by its title; one real link (the title) covering the card.
- The CTA and carousel are `aria-hidden` so the card is announced once.
- The focus ring moves to the card with `:has(.card__link:focus-visible)`.
- The clip never plays under reduced motion (it stays on the poster); the carousel never auto-advances.

## Content

- **Title:** the product name.
- **Outcome badge:** which of the section's three levers it solves (Conversion, Supply growth, Activation).
- **Lead metric:** one number from the CV, with a plain label. Never a match rate.
- **Supporting:** two short results, result first.
- **Chips:** other skills or scan keywords from the case study, never the badge's word. 3 by default.

## Do and don't

| Do | Don't |
|---|---|
| One lead metric per card | Two blue numbers |
| Real screens or labelled placeholders | Stock or invented screens |
| Keep cards in a single column list | Put three cards in a row; the metric gets lost |

## Tokens

| Token | Value |
|---|---|
| `case-card.surface` | `color.surface.card` |
| `case-card.border.rest / hover` | `color.border.subtle` / `color.border.strong` |
| `case-card.radius` | `radius.md` |
| `case-card.hover-shadow` | 0.5px ink ring + `elevation.pop` |
| `case-card.media.ratio` | 6 / 5 stacked |
| `case-card.media.surface` | clip colour (video), or `color.surface.sunken` + 24px dotted paper (carousel) |
| `case-card.tag-count` | 3 (`cardTagCount` to change) |
| `case-card.columns` | 7fr 5fr (≥ 900px) |
| `case-card.body.padding` | `space.4 space.3` → `space.4` (≥ 600) → `space.4 + 16px` (≥ 900) |
| `case-card.metric` | `type.metric`, `color.text.accent` |
| `case-card.cta.height` | 56px |
| `case-card.carousel.interval` | 1600ms |
| `case-card.carousel.fade` | `motion.reveal` |
