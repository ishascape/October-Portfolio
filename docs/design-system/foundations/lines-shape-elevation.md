# Lines, shape and elevation

## Pen weights

Lines are the main structural device, borrowed from architectural drawing conventions where line weight encodes meaning.

| Token | Width | Meaning | Examples |
|---|---|---|---|
| `line.hair` | 0.5px | Schedule lines, background grids | Table row rules, case card metric divider, nav menu rows, 24px graph paper |
| `line.thin` | 1px | Structure | Nav underline, sheet edges, card edges, fact block, quote cards' siblings |
| `line.building` | 1.5px | Things you can press, and strong frames | Button borders, registration marks, quote card border, impact row top rule, title sheet frame |
| `line.cut` | 3px | Emphasis (defined, rarely used) | Reserved |
| (callout bar) | 4px | Callout left edge in marker | `.case__callout` |

## Drawing conventions in the UI

| Device | Where | Rule |
|---|---|---|
| **Registration marks** | Buttons (10px, graphite 45%, offset -6px), case cards (12px, ink, offset -7px) | Two opposite L-corners that appear on hover and focus. They say "this is the thing you're about to choose." |
| **Crop marks** | Polaroid photo, field notes photos (14px, ink, offset -6px) | Appear on hover, like a print being trimmed. Only on photographs. |
| **Dimension line** | Nav link underline | A 1px marker rule with 45 degree ticks at each end, drawn left to right with `clip-path` on hover and for the current section. |
| **Box bullets** | Case card supporting metrics, case study lists | 8px square, 1.25px ink border. Not dashes, not discs (except expertise points). |
| **Dashed frame** | Image placeholders | 1px dashed graphite on sunken paper, labelled ("Drawing 01a", "Fig. 3"). |
| **Graph paper** | Case card image well, case study header | 24px grid in `color.grid` at 40–60%, hairline. |
| **Blueprint grid** | Footer title sheet | 16px grid in white at 7%. |
| **Overshooting corners** | Line drawings (`SketchRect`) | Each edge runs a few px past the corner, by a slightly different amount, like a pencil. |

## Shape

| Token | Value | Used by |
|---|---|---|
| `radius.md` | 16px | Buttons, case cards, tags, AI principle cards, expertise cards (grid), quote cards, lightbox |
| `radius.pill` | 999px | Outcome pill |
| `radius.round` | 50% | Icon buttons (deck arrows), dots |
| `radius.none` | 0 | Polaroid, field notes prints, phone expertise deck, fact block, callout, next-study link, image placeholders |

**Rule:** UI is rounded, paper is square. Anything that reads as a physical print (polaroid, field notes, the phone deck of expertise papers) keeps sharp corners. Anything that reads as an interface control or card is 16px.

Small radii (2, 3, 4, 6, 8px) exist only inside product reproductions (prototypes and flows) and should not spread into portfolio chrome.

## Elevation

The site has almost no shadows. Elevation means "a piece of paper sitting on top of another", so it only appears on paper that has been lifted.

| Token | Use |
|---|---|
| `elevation.0` | Default. Cards at rest are outlined, not shadowed. |
| `elevation.sheet` | Paper sheet sliding over the one below (top edge only). |
| `elevation.paper` | Raised paper at rest: polaroid, field notes prints, expertise cards. |
| `elevation.paper-hover` | Raised paper under the pointer. |
| `elevation.paper-lifted` | A print picked out of the pile. |

The case card's hover state uses a 0.5px ink ring (`box-shadow: 0 0 0 0.5px ink`) to thicken its edge, not to lift it.

## Texture

| Texture | Where | How |
|---|---|---|
| Paper grain | Whole page | Fixed `body::after` SVG fractal noise, multiplied at 50%, `pointer-events: none` |
| Cold-press relief | Selected work sheet | SVG diffuse-lighting noise multiplied over `paper.400` |
| Pencil wobble | Line drawings | `filter: url(#pencil)` from `SketchDefs` |
