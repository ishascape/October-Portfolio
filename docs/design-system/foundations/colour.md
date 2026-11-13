# Colour

Drawing on paper with one marker. The palette is a neutral cool gray page with white cards on it, ink and graphite, and a single architectural blue. There are no gradients and no second accent. The warm cream paper was retired on 3 Nov 2026; keep surfaces neutral.

Two modes share the same token names: **light** (the default) and **dark**, a moonlit oil-painting look where only the subject is lit. The site follows the device's light or dark setting until the visitor uses the sun and moon switch in the nav; their saved choice then wins.

## Palette

| Swatch | Primitive | CSS | Light | Dark | Role |
|---|---|---|---|---|---|
| Paper 100 | `color.paper.100` | `--paper` | `#ffffff` | `#141922` | Cards, bars, raised paper |
| Paper 200 | `color.paper.200` | `--surface` | `#f4f5f6` | `#0b0e13` | Page, nav, paper sheets |
| Paper 300 | `color.paper.300` | `--paper-shade` | `#eceeef` | `#1b212b` | Sunken wells |
| Paper 400 | `color.paper.400` | `--paper-deep` | `#e6e8ea` | `#0f1319` | Deep sheet (Selected work) |
| Paper 500 | `color.paper.500` | `--rule` | `#d9dcde` | `#2a3340` | Hairlines, resting card edge |
| Ink 900 | `color.ink.900` | `--ink` | `#1c1b19` | `#e9eef6` | Ink |
| Ink 600 | `color.ink.600` | `--graphite` | `#615e58` | `#b0bac8` | Graphite |
| Marker 500 | `color.marker.500` | `--marker` | `#2f5fb3` | `#8fb0ea` | Accent, dividers |
| Marker wash | `color.marker.alpha-12` | `--marker-wash` | marker at 12% | marker at 16% | Accent tint |
| Marker 700 | `color.marker.700` | hard-coded | `#1f4a99` | uses `--marker` | Accent on tint |
| Shadow pop | `color.ink.900` / `alpha.pop-dark` | `--pop-ink` | ink | marker at 55% | Hard hover shadow |
| Blueprint 600 | `color.blueprint.600` | `--blueprint` | `#1d4e89` | same | Cyanotype footer sheet |

The page also carries a dotted paper pattern (`--paper-dots`, `--dot`) and, on the hero and case study header only, a watercolour relief (`--watercolour`). There is no paper grain over the page any more.

Semantic names for all of these are in [tokens.md](../tokens.md#2-semantic-tokens). Use those in code.

## How colour is used

**Gray page, white cards.** The page and every paper sheet are `surface.page` (cool gray). Things that sit on it, such as case study cards, the CTA bar and polaroid stock, are `surface.card` (white). A section that needs to sit back goes onto deeper paper (`surface.deep`); wells and placeholders are sunken (`surface.sunken`).

**Ink does the work.** Text, the primary button, button and card outlines, every hovered edge and the light-mode shadow pop are ink. Graphite is for anything secondary: meta, captions, dates, chips, fine linework.

**Dividers are marker blue, and thin.** The thick black dividers are gone. Where a full-width rule is needed (the nav foot, section and case study header edges, the top of a card's CTA bar) it is a 1px marker-blue line (`border.divider`). Everywhere else, space separates.

**Marker is rationed.** Blue appears on:
- the lead metric on each case card and the impact row on case studies
- the outcome badge and callout tint
- the current nav item's dimension line, and link hover on case study sheet links
- the focus ring
- 1px dividers and the theme switch outline
- solid blue icons (nav mountain, case study menu icons, AI principles, the crayon, the wink)
- the name in the nav
- hover fill on every button

Aim for no more than two blue moments competing in one viewport. The metric and an icon is fine; a blue heading next to a blue metric is not.

**Dark mode is moonlight, not inversion.** Blue-black surfaces, pale ink, a lighter marker (`#8fb0ea`), a canvas texture and one soft moonlight pool that follows the pointer (`PaintLayer.tsx`; it rests near the top on touch screens and with reduced motion). Cards get a thin rim of moonlight on their top edge. The hero polaroid is the lit object: it keeps pale paper and dark ink, with a cool glow. The shadow pop is cast in dimmed moonlight because black disappears on blue-black. Product screenshots and prototypes keep their own light screens.

**Product colours stay inside the product.** Reds, ambers and HeadBox greys appear only inside reproductions of client UI (Venue Finder prototype and flows, the booking status widget). They are evidence, not brand, and are never used for portfolio chrome. See [tokens.md](../tokens.md#colour).

## Contrast (WCAG 2.2)

Measured on the live values, both modes.

| Foreground | Background | Light | Dark | Small text |
|---|---|---|---|---|
| Ink | Page | 15.8 : 1 | 16.6 : 1 | Pass AAA |
| Ink | Card | 17.2 : 1 | 15.1 : 1 | Pass AAA |
| Ink | Paper deep | 14.0 : 1 | 16.0 : 1 | Pass AAA |
| Graphite | Page | 5.9 : 1 | 9.9 : 1 | Pass AA |
| Graphite | Card | 6.5 : 1 | 9.0 : 1 | Pass AA |
| Graphite | Paper shade | 5.6 : 1 | 8.2 : 1 | Pass AA |
| Graphite | Paper deep | 5.3 : 1 | 9.5 : 1 | Pass AA |
| Marker | Page | 5.6 : 1 | 8.8 : 1 | Pass AA |
| Marker | Card | 6.2 : 1 | 8.0 : 1 | Pass AA |
| Marker | Paper deep | 5.0 : 1 | 8.5 : 1 | Pass AA |
| Marker | Marker wash on a card (outcome badge) | 5.2 : 1 | 5.9 : 1 | Pass AA |
| Marker 700 | Marker wash on a card | 7.1 : 1 | n/a | Pass AAA |
| Card | Marker (button hover) | 6.2 : 1 | 8.0 : 1 | Pass AA |
| Card | Ink (primary button) | 17.2 : 1 | 15.1 : 1 | Pass AAA |
| Blueprint 050 at 75% | Blueprint | 5.1 : 1 | same | Pass AA |
| Rule | Card (card edge) | 1.4 : 1 | 1.4 : 1 | Decorative only |

Rules that follow from this:
- Every text pairing above passes AA in both modes. The old warning about small marker text on the deep sheet no longer applies on the cool gray palette (5.0 : 1), but keep cards on that sheet anyway: they bring their own paper.
- For accent text under 18px on a marker tint, prefer `text.accent-on-subtle`. In dark mode it resolves to the light marker.
- The resting card border (rule on card) is decorative. It is acceptable because the card is identified by its title and image, not its edge. Do not rely on a rule-coloured line alone to show a control's boundary.

## Themes

Themes swap the primitives (`--surface`, `--paper`, `--ink`, `--graphite`, `--rule`, `--marker` and friends) and every component picks them up.

| Theme | Where | How |
|---|---|---|
| Light | Default | `:root` in `tokens.css` |
| Dark (moonlit) | Whole site, from the device setting or the nav switch | `:root[data-theme='dark']` in `tokens.css`, set before first paint by an inline script in `index.html` (localStorage key `theme`) |
| Blueprint | Home page footer | `.titlesheet--blueprint` in `Footer.css`; `semantic.css` formalises it as `[data-theme='blueprint']` |

## Do and don't

| Do | Don't |
|---|---|
| Lift or sink paper to separate areas | Add a new background colour |
| Use one marker moment per idea | Use blue for decoration, headings or body links in bulk |
| Use graphite for secondary text | Use opacity to make secondary text (it fails contrast on textured paper) |
| Keep client colours inside reproductions of their UI | Borrow a client red for an error or warning in the portfolio chrome |
