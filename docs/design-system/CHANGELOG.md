# Changelog

What changed in the design system, newest first. Dates are when the change reached `main`.

## 13 Nov 2026: brought in line with the live site

The docs and the `/design-system` page were written on 1 Nov, before the palette, dark mode and hover changes. This update makes them match `main` again. No live page changed.

**Colour**
- Cool gray page (`--surface` `#f4f5f6`) with white cards (`--paper`) replaces the warm paper values everywhere in the docs and `tokens.json` (from 3 Nov).
- New semantic tokens: `color.surface.card` and `color.border.divider` (1px marker blue). `color.surface.page` now points at `--surface`; it pointed at `--paper` and showed white.
- Dark mode documented: moonlit palette, values for every primitive, theme follows the device until the visitor picks (from 5 Nov). `tokens.json` carries the dark values under `$extensions`.
- `color.text.accent-on-subtle` uses the light marker in dark mode, so it stays readable on the moonlit wash.
- `color.border.registration` renamed `color.border.soft`; the only thing it still colours is the hero chips.
- Contrast table re-measured for both modes. Every text pairing passes AA.

**Elevation and interaction**
- Shadow pop documented and shown: hard 5px offset shadow on hover and keyboard focus, 1px when pressed, 2px lift, ink in light and dimmed moonlight in dark (from 13 Nov). New semantic aliases `elevation.pop`, `elevation.pop-pressed`, `elevation.pop-lift`.
- Hover registration marks and crop marks removed from every page that described them (from 13 Nov). Do not re-add.
- Buttons: new pressed state; deck arrows now pop.
- Next case study card: rounded corners, edge-to-edge image, button at the foot, pops on hover.

**Components**
- Case study card: 6:5 looping clip as the media, carousel kept as the fallback.
- Chips: the badge rule (a chip never repeats the card's badge) with the live chips for all three cards, including Education, AI smart matching, Information architecture and Progressive disclosure. TreeAssist shows five.
- Nav: marker-blue rule, solid blue mountain with the climber, theme switch.
- Case study header: Company line under the title replaces the kicker.
- Hero type specimen uses the live H1: "I design products that help people make better decisions."

**Not yet reflected:** draft PR #123 (role in the nav, hero eyebrow removed). The style guide renders the live nav and hero, so they will update on their own when it merges; `components/nav.md` notes it as pending.

## 6 Nov 2026

- `/design-system` published (noindex, unlinked). shadcn/ui token vocabulary added in `src/styles/shadcn.css`.

## 1 Nov 2026

- First version: tokens, foundations, component pages, findings.
