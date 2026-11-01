# Spacing, layout and grid

## Spacing scale

An 8px-based scale with one deliberate oddity: step 4 is 28px on phones and 32px from 600px. The small steps (4, 8, 16) never change so controls stay tight; the large steps grow so sections breathe on bigger screens.

| Token | CSS | Phone | ≥ 600px | Typical use |
|---|---|---|---|---|
| `space.1` | `--space-1` | 4 | 4 | Icon to label, metric value to label |
| `space.2` | `--space-2` | 8 | 8 | Chip padding, tag gaps, label to value |
| `space.3` | `--space-3` | 16 | 16 | Paragraph gap, card body gap, button gap |
| `space.4` | `--space-4` | 28 | 32 | Card padding, list of cards gap |
| `space.5` | `--space-5` | 48 | 56 | Between major blocks; case cards ≥ 900px |
| `space.6` | `--space-6` | 80 | 96 | Section top, between About blocks |
| `space.7` | `--space-7` | 128 | 160 | Section bottom |

Semantic aliases (`space.inline.*`, `space.stack.*`, `space.inset.*`, `space.section.*`) are in [tokens.md](../tokens.md#space-roles).

**Rule:** new spacing comes from the scale. If a design needs "16px more room", write it as `calc(var(--space-4) + 16px)` (the pattern already used on case cards) so the intent is visible.

## Page structure

```
┌ nav (sticky, 56px, ink rule underneath) ───────────────┐
│ ┌ paper sheet: hero ─────────────────────────────────┐ │
│ └────────────────────────────────────────────────────┘ │
│ ┌ paper sheet: work (deep paper, watercolour relief) ┐ │  each sheet pins when its bottom
│ └────────────────────────────────────────────────────┘ │  reaches the viewport; the next
│ ┌ paper sheet: about ────────────────────────────────┐ │  slides over it
│ └────────────────────────────────────────────────────┘ │
│ ┌ paper sheet: contact ──────────────────────────────┐ │
│ └────────────────────────────────────────────────────┘ │
└ footer: blueprint title sheet + sign-off bar ──────────┘
```

## Container

| Token | Value |
|---|---|
| `layout.content-max` | 1280px |
| `layout.margin` | 16px phone, 32px ≥ 600, 48px ≥ 1024 |
| `layout.gutter` | 24px |

`.container` centres content at `content-max` plus margins on both sides.

## Grid

The site uses CSS grid with named fractional splits rather than a strict 12-column overlay. Every split is a 12-column fraction:

| Pattern | Columns | Where |
|---|---|---|
| Rail and body | 3fr / 9fr | Case study sections ≥ 1024 |
| Media-led card | 7fr / 5fr | Case card ≥ 900, About intro ≥ 1024 |
| Next study | 5fr / 7fr | Case study footer link ≥ 1024 |
| Halves | 1fr / 1fr | Field notes ≥ 1024 (80px column gap), problem/solution ≥ 600, quote cards ≥ 700 |
| Quarters | 4 × 1fr | Expertise cards ≥ 1024, AI principles ≥ 1100, impact row ≥ 1024 |
| Experiment | 60% / 1fr | Experiment with a screen ≥ 760 |

## Breakpoints

| Token | Width | What changes |
|---|---|---|
| `breakpoint.sm` | 600px | Phone layouts end. Nav links replace the Menu button, hero goes two-column, spacing scale steps up, tables show headers, expertise deck becomes a grid |
| `breakpoint.md` | 900px | Case cards go horizontal, case study visual and facts sit side by side, hero spacing adapts to window height |
| `breakpoint.lg` | 1024px | Page margin 48px, 4-up grids, rail and body sections |
| `breakpoint.xl` | 1200px | Hero headline forced break, HostHQ facts 5-up |

Use `min-width` queries, mobile first. Phone-only rules use `max-width: 599px`. Also in use: `(hover: hover)` to keep hover-only layouts (expertise grid) off touch screens.

Off-scale values still in the code (640, 679, 700, 760, 1100) are listed in the [findings](../governance/findings.md#p2-consolidate-breakpoints).

## Sections

`.section` gives `space.6` on top and `space.7` at the bottom. Sheets are separated by a 1px ink edge and a soft upward shadow (`elevation.sheet`). The Work sheet trims its top padding to 30px so the cards show above the fold.
