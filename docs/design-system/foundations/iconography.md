# Iconography and drawings

There is no icon library. Every icon and diagram is drawn for the site as inline SVG, in the same pen as the rest of the drawing set.

## Three kinds of mark

| Kind | Purpose | Examples | Colour |
|---|---|---|---|
| **Line icons** | Small, single-idea marks next to text | Nav mountain, light bulb eyebrow, AI principle icons (human in the loop, shield, hourglass, sparkle), footer robot, smile and wink faces | Marker blue (`color.icon.accent`), or `currentColor` |
| **Filled glyph** | The one filled drawing, used as a lead-in | Crayon before the Work intro line | Marker fill, paper-coloured bands and zigzag |
| **Partis** | Diagram-sized drawings that explain an idea | Expertise card drawings (marketplace, platform, experimentation, end-to-end, design systems), case study flows and site plans | Ink, graphite and marker by line role |

## Line icon spec

| Property | Value |
|---|---|
| Fill | `none` |
| Stroke | `currentColor` or `color.icon.accent` |
| Stroke width | 1.6 at 20–28px (nav, eyebrow), 1.75 at 32px (AI principles), 2 for faces |
| Caps and joins | Round |
| Size | 20px (robot), 22×26 (bulb), 28×20 (mountain), 32 (principles) |
| Grid | Draw on a viewBox the same size as the display size, so 1 unit is 1px |
| Accessibility | `aria-hidden="true"`; the adjacent text carries the meaning |

**Style:** one continuous idea per icon, drawn the way you'd sketch it with a fineliner. Slightly loose curves are fine. No filled shapes, no duotone, no outlines-of-outlines.

## Crayon

The crayon is the only filled drawing. It sits before the Work intro line ("Designing for conversion, supply growth and activation.") like it is writing it.

| Property | Value |
|---|---|
| Size | 52×24 desktop, 36×16 phone |
| Body, cap, tip | `fill: marker`; cap at 75% opacity |
| Bands, zigzag | `stroke: paper`, 1.2px, round caps |
| Placement | Inline-flex with the text, 12px gap |

Do not reuse the crayon elsewhere. A second crayon turns a signature into a pattern.

## Partis (diagrams)

Partis follow the [pen weights](lines-shape-elevation.md) as drawing classes in `Parti.css`:

| Class | Stroke | Meaning |
|---|---|---|
| `.parti__heavy` | Ink, 2px | The main object |
| `.parti__fine` | Graphite, 0.75px | Connections, context |
| `.parti__ghost` | Graphite, 1px, dashed 3 3 | Things that existed before, or are implied |
| `.parti__axis` | Marker, 1.25px, dash-dot | Axes and organising lines |
| `.parti__key` | Marker, 2.25px | The one idea the drawing is about |
| `.parti__node` | Ink, 1.5px | Match points and junctions |

Rules:
- One blue element per drawing: the idea. Everything else is ink or graphite.
- Use `SketchRect` for boxes so corners overshoot like a pencil.
- Apply `filter: url(#pencil)` for a slight wobble. The filter is defined once by `SketchDefs` in the app shell.
- Paths that draw on scroll need `pathLength={1}` and the `.draw-on-scroll` wrapper.
- Hover nudges move one or two `[data-h]` parts a few px, using the Web Animations API (Chrome does not reliably restyle SVG children from `:hover`).

## Text glyphs as arrows

Direction arrows are text, not icons, so they inherit type size and colour:

| Glyph | Meaning |
|---|---|
| ↓ | Scrolls down this page ("Explore my work ↓") |
| → | Goes to another page on the site ("Read case study →") |
| ↗ | Opens something outside the site or a file (Resume, LinkedIn) |
| ← → | Previous and next in a pile or deck |
| ↻ | Hint that the polaroid turns over (phone) |
| ✓ | Confirmation ("Copied ✓") |

Arrows are wrapped in `aria-hidden="true"` spans so screen readers hear the label only.
