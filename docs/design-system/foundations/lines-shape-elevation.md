# Lines, shape and elevation

## Pen weights

Lines are the main structural device, borrowed from architectural drawing conventions where line weight encodes meaning.

| Token | Width | Meaning | Examples |
|---|---|---|---|
| `line.hair` | 0.5px | Schedule lines, background grids | Table row rules, case card metric divider, nav menu rows, 24px graph paper |
| `line.thin` | 1px | Structure | Marker-blue dividers (nav foot, section and case study header edges, card CTA top), card edges, fact block |
| `line.building` | 1.5px | Things you can press, and strong frames | Button borders, quote card border, impact row top rule, title sheet frame |
| `line.cut` | 3px | Emphasis (defined, rarely used) | Reserved |
| (callout bar) | 4px | Callout left edge in marker | `.case__callout` |

## Drawing conventions in the UI

| Device | Where | Rule |
|---|---|---|
| **Divider** | Nav foot, section and case study header edges, card CTA top | One 1px marker-blue line. The thick black dividers were removed on 3 Nov 2026; where space can separate, use space. |
| **Dimension line** | Nav link underline | A 1px marker rule with 45 degree ticks at each end, drawn left to right with `clip-path` on hover and for the current section. |
| **Box bullets** | Case card supporting metrics, case study lists | 8px square, 1.25px ink border. Not dashes, not discs (except expertise points). |
| **Dashed frame** | Image placeholders | 1px dashed graphite on sunken paper, labelled ("Drawing 01a", "Fig. 3"). |
| **Dotted paper** | Page sheets, case card image well, case study header | `--paper-dots`: 1px dots in `color.dot` on a 24px pitch. Replaced the graph-paper grid. |
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

> Removed on 13 Nov 2026: the registration marks on buttons and cards and the crop marks on photographs (hero polaroid, About and field notes photos). The shadow pop replaces them as the hover signal. Do not add corner marks back.

## Elevation

The site has two kinds of shadow, and they mean different things. A **soft** shadow means "a piece of paper sitting on top of another", so it only appears on paper that has been lifted. A **hard** shadow pop means "you can press this": it appears on hover and keyboard focus of buttons, the home case cards, the next case study card and the deck arrows.

| Token | Use |
|---|---|
| `elevation.0` | Default. Cards at rest are outlined, not shadowed. |
| `elevation.sheet` | Paper sheet sliding over the one below (top edge only). |
| `elevation.paper` | Raised paper at rest: polaroid, field notes prints, expertise cards. |
| `elevation.paper-hover` | Raised paper under the pointer. |
| `elevation.paper-lifted` | A print picked out of the pile. |
| `elevation.pop` | Hover (real pointers only) and keyboard focus of things you can press: `5px 5px 0 0` in `--pop-ink`, element lifts 2px up-left. |
| `elevation.pop-pressed` | The same elements while pressed: `1px 1px 0 0`, back in place. |

**Shadow pop rules**
- Ink in light mode; dimmed moonlight (marker at 55%) in dark mode, because black disappears on blue-black.
- Hover pop only under `@media (hover: hover)`, so a tap on a phone never leaves an element stuck up. Keyboard focus always pops.
- Reduced motion keeps the shadow and drops the lift (`--pop-lift: 0px`).
- Disabled controls stay flat. The CTA bar inside a card doesn't pop on its own; the whole card does.
- The case card adds a 0.5px ink ring under the pop to thicken its edge. In dark mode a thin moonlight rim on the card's top edge stays in every state.
- Open option: if the black CTA bar merging into the black shadow bothers you on hover, a graphite pop is a one-token change (`--pop-ink`).

## Texture

| Texture | Where | How |
|---|---|---|
| Dotted paper | Page sheets | `--paper-dots` radial-gradient dots |
| Watercolour relief | Hero and case study header only | `--watercolour` SVG diffuse-lighting noise multiplied over the surface |
| Moonlight and canvas | Dark mode only | `PaintLayer.tsx`: one soft light pool follows the pointer, over a canvas texture |

The old warm paper grain (`body::after`) and the Selected work sheet's cold-press relief are switched off in `tokens.css`.
| Pencil wobble | Line drawings | `filter: url(#pencil)` from `SketchDefs` |
