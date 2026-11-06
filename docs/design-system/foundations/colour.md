# Colour

Drawing on paper with one marker. The palette is warm paper stock, ink and graphite, and a single architectural blue. There are no gradients and no second accent.

## Palette

| Swatch | Primitive | Hex | Role |
|---|---|---|---|
| Paper 100 | `color.paper.100` | `#faf8f3` | Raised paper |
| Paper 200 | `color.paper.200` | `#f5f2ea` | Page |
| Paper 300 | `color.paper.300` | `#ece7da` | Sunken |
| Paper 400 | `color.paper.400` | `#dcd9d2` | Deep sheet (Selected work) |
| Paper 500 | `color.paper.500` | `#d8d2c4` | Rule |
| Ink 900 | `color.ink.900` | `#1c1b19` | Ink |
| Ink 600 | `color.ink.600` | `#615e58` | Graphite |
| Marker 500 | `color.marker.500` | `#2f5fb3` | Accent |
| Marker 700 | `color.marker.700` | `#1f4a99` | Accent on tint |
| Blueprint 600 | `color.blueprint.600` | `#1d4e89` | Cyanotype footer sheet |

Semantic names for all of these are in [tokens.md](../tokens.md#2-semantic-tokens). Use those in code.

## How colour is used

**Paper is the hierarchy, not colour.** A section that needs to sit back goes onto deeper paper (`surface.deep`); a thing you can pick up goes onto raised paper (`surface.raised`) with a paper shadow. Wells and placeholders are sunken (`surface.sunken`).

**Ink does the work.** Text, structure lines, the primary button and every hovered edge are ink. Graphite is for anything secondary: meta, captions, dates, fine linework.

**Marker is rationed.** Blue appears on:
- the lead metric on each case card and the impact row on case studies
- the current nav item's dimension line, and link hover on case study sheet links
- the focus ring
- the outcome pill and callout tint
- blue line icons (AI principles, the crayon, the wink, the light bulb eyebrow)
- the name in the nav
- hover fill on every button

Aim for no more than two blue moments competing in one viewport. The metric and an icon is fine; a blue heading next to a blue metric is not.

**Product colours stay inside the product.** Reds, ambers and HeadBox greys appear only inside reproductions of client UI (Venue Finder prototype and flows, the booking status widget). They are evidence, not brand, and are never used for portfolio chrome. See [tokens.md](../tokens.md#colour).

## Contrast (WCAG 2.2)

Measured on the live values.

| Foreground | Background | Ratio | Small text | Large text / UI |
|---|---|---|---|---|
| Ink | Paper | 15.4 : 1 | Pass AAA | Pass |
| Ink | Paper deep | 12.2 : 1 | Pass AAA | Pass |
| Graphite | Paper | 5.8 : 1 | Pass AA | Pass |
| Graphite | Paper shade | 5.2 : 1 | Pass AA | Pass |
| Graphite | Paper deep | 4.6 : 1 | Pass AA (just) | Pass |
| Graphite | Marker wash on paper | 4.9 : 1 | Pass AA | Pass |
| Marker | Paper | 5.5 : 1 | Pass AA | Pass |
| Marker | Paper shade | 5.0 : 1 | Pass AA | Pass |
| Marker | Marker wash on paper | 4.7 : 1 | Pass AA (just) | Pass |
| **Marker** | **Paper deep** | **4.4 : 1** | **Fail** | Pass |
| Marker 700 | Marker wash | 6.3 : 1 | Pass AA | Pass |
| Paper | Ink (primary button) | 15.4 : 1 | Pass AAA | Pass |
| Paper | Marker (button hover) | 5.5 : 1 | Pass AA | Pass |
| Blueprint 050 at 75% | Blueprint | 5.1 : 1 | Pass AA | Pass |
| Rule | Paper (card edge) | 1.4 : 1 | n/a | Decorative only |

Rules that follow from this:
- **Never put small marker text straight onto `surface.deep`.** Cards on the Selected work sheet are fine because they bring their own paper.
- Marker text on the marker tint passes only just. For anything under 18px on a tint, prefer `text.accent-on-subtle` (marker 700).
- The resting card border (rule on paper) is decorative. It is acceptable because the card is identified by its title and image, not its edge. Do not rely on a rule-coloured line alone to show a control's boundary.

## Themes

The footer on the home page already proves the theming model: `.titlesheet--blueprint` swaps the primitives (`--paper`, `--ink`, `--graphite`, `--rule`, `--marker`) and every component inside picks up white linework on cyanotype blue without its own overrides.

`src/styles/semantic.css` formalises that as `[data-theme='blueprint']`. A full dark mode would be the same move at the page level. It is not proposed for now; the paper metaphor is the identity.

## Do and don't

| Do | Don't |
|---|---|
| Lift or sink paper to separate areas | Add a new background colour |
| Use one marker moment per idea | Use blue for decoration, headings or body links in bulk |
| Use graphite for secondary text | Use opacity to make secondary text (it fails contrast on textured paper) |
| Keep client colours inside reproductions of their UI | Borrow a client red for an error or warning in the portfolio chrome |
