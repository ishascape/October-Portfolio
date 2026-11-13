# Motion

Things move like paper on a desk: a quick start, a soft landing, no bounce, no loops that run for their own sake. Motion explains a change of state or rewards attention. It never decorates.

## Principles

1. **Settle, don't spring.** Every easing decelerates hard into place. There is no overshoot anywhere in the system.
2. **Respond in 150ms.** Hover and focus feedback uses `motion.duration.micro`. Anything slower feels like lag.
3. **Physical things take longer.** Moving a sheet of paper (piles, decks, flips) takes 460–600ms; it has mass.
4. **Arrive once.** Load sequences play on first paint only and finish inside 2 seconds.
5. **Stop when touched.** Anything that plays on its own (carousel, auto-flip) stops the moment the user interacts.
6. **Reduced motion means no motion.** Every animation falls back to an instant change of state.

## Tokens

### Easing

| Token | Curve | Character | Used for |
|---|---|---|---|
| `motion.easing.pen` | `cubic-bezier(0.2, 0, 0, 1)` | A pen stroke: fast, then settles | Colour, opacity, clip-path state changes |
| `motion.easing.settle` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Paper sliding to rest | Piles, decks, FLIP layout moves, card fan |
| `motion.easing.enter` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Arrives and stops | Hero copy, polaroid drop |
| `motion.easing.glide` | `cubic-bezier(0.5, 0, 0.2, 1)` | Eases in and out | Hero title moving from centre into place; copy block opening |

### Duration

| Token | Value | Used for |
|---|---|---|
| `motion.duration.micro` | 150ms | Hover, focus, shadow pop lift, polaroid tilt |
| `motion.duration.state` | 280ms | Carousel cross-fade, switch thumb |
| `motion.duration.entrance` | 400ms | Each hero text element |
| `motion.duration.paper` | 480ms | Field notes pile, FLIP moves |
| `motion.duration.signature` | 700ms | Expertise cards rising into the grid |
| `motion.stagger` | 70ms | Delay between items in a fan-out |

Some of these are still hard-coded in component CSS; centralising them is in the [findings](../governance/findings.md).

## Load sequences

### Desktop and tablet (≥ 600px), about 1.7s

| Time | Element | Animation |
|---|---|---|
| 0–400ms | Headline | Fades in, held centred across the whole hero (polaroid column included) at 110% |
| 150–550ms | Role line | Blurs into focus (10px blur → sharp) |
| 600–1100ms | Headline | Glides left into place and scales to 100% (`glide`) |
| 600–1100ms | Supporting copy block | Opens from zero height under the headline (`glide`) |
| 900, 980, 1060ms | Lede paragraphs | Each blurs into focus over 400ms |
| 1100–1700ms | Polaroid | Drops in from 24px above, settling from 8° to its 2° rest (`enter`) |
| 1140–1540ms | Buttons | Blur into focus |

The polaroid's handwritten caption arrives with the print, not on its own.

### Phone (< 600px), about 1.8s: the start screen

Phones open on a start screen with only the polaroid and headline, then the site arrives.

| Time | Element | Animation |
|---|---|---|
| 0–600ms | Polaroid | Drops in and settles |
| 600–1000ms | Headline | Fades and rises 4px |
| 900–1300ms | Buttons | Blur into focus |
| 1300–1800ms | Nav, every other section, footer | Fade in (`site-in`, defined in `global.css`) |

On phones the lede is hidden and the role line moves to the back of the polaroid.

## Interaction catalogue

| Component | Trigger | What moves | Timing |
|---|---|---|---|
| Button | Hover, focus, press | Fill to marker; lifts 2px up-left into a hard 5px shadow; settles to 1px on press | 150ms `pen` |
| Nav link | Hover, current section | Dimension line draws left to right (`clip-path`) | 260ms `pen` |
| Case card | Hover, focus within, press | Edge to ink, whole card lifts into the shadow pop, CTA becomes primary | 150ms `pen` |
| Case card clip | On screen | Muted 6:5 loop plays while visible, pauses off screen; poster only under reduced motion | n/a |
| Case card carousel (fallback) | Hover or focus on the card | Slides cross-fade every 1.6s; returns to slide 1 on leave | 280ms `pen` |
| Next case study card | Hover, focus, press | Marker wash, lifts into the shadow pop | 150ms `pen` |
| Deck arrows | Hover, focus, press | Lift into the shadow pop; disabled stays flat | 150ms `pen` |
| Theme switch | Click | Knob slides between sun and moon; the page swaps to the moonlit palette | `pen` |
| Polaroid | Hover (pointer devices) | Straightens 2° → 0°, shadow deepens, smile winks | 150ms; wink 140ms |
| Polaroid | Tap (phone) | Flips over in 3D to show the role line | 600ms `(0.3, 0.7, 0.2, 1)` |
| Field notes pile | Click, Enter, Space, arrows | Print lifts out, straightens, scales up; returns on second click or Esc | 480ms `settle` |
| Expertise cards | Scroll into view (desktop) | Rise 40px from 94% and fan into the grid, 70ms apart | 700ms `settle` |
| Expertise card | Hover | Shadow deepens; one or two parts of the drawing nudge a few px and ease back on leave | 300ms; drawing 420ms |
| Expertise deck | Swipe or arrows (phone) | Top paper slides off at -10°, the next comes up from the fan | 460ms `settle` |
| About wink | Hover | Eye closes, mouth smirks, sparkle appears | 140ms / 260ms |
| Revision table | Row hover | Marker wash behind the row | 120ms |
| Mode switch | Click | Thumb slides and turns blue | 280ms `pen` |
| Copy email | Click | Label becomes "Copied ✓" for 2s | instant |
| Paper sheets | Scroll | Each sheet pins at its bottom edge and the next slides over it | scroll-linked |

## Reduced motion

`prefers-reduced-motion: reduce` is honoured at three levels:

1. **Tokens** (`tokens.css`): `--dur-micro`, `--dur-state` and `--dur-signature` become 0ms.
2. **Global override** (`tokens.css`): every `animation-duration`, `animation-delay` and `transition-duration` is forced to 0ms, and smooth scroll is turned off.
3. **Component guards**:
   - All hero entrance animations are set to `none`; the page renders in its final state.
   - Paper sheets stop being sticky and scroll normally.
   - The case card carousel never auto-advances.
   - Expertise cards skip the fan-out and the drawing nudges.
   - Piles and decks change position instantly (1ms transition so `transitionend` still fires).
   - JavaScript animations (`element.animate`, FLIP) check `matchMedia('(prefers-reduced-motion: reduce)')` before running.

Any new animation must do the same: if it's CSS, it is covered by the global override; if it's JavaScript, check the media query first.

## Do and don't

| Do | Don't |
|---|---|
| Animate `transform`, `opacity`, `clip-path`, `filter` | Animate `width`, `height`, `top` on scroll |
| Reuse a token from the tables above | Pick a new curve for one element |
| Stop autoplay on the first touch | Loop something forever |
| Let the hero finish in under 2s | Add a new entrance to anything below the fold |
| Use the blur-in for text, the drop for paper | Bounce, wobble or spin anything |
