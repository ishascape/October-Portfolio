# Tokens

Tokens are named decisions. A value such as `#615e58` says nothing; `color.text.secondary` says where it belongs and lets the value change in one place.

## Architecture

```
Primitive  (what we have)      color.ink.600 = #615e58
    │
Semantic   (what it is for)    color.text.secondary → {color.ink.600}
    │
Component  (where it is used)  case-card.meta.color → {color.text.secondary}
```

| Tier | Material 3 name | Who uses it | Rule |
|---|---|---|---|
| Primitive | Reference | Only semantic tokens | Never used directly in component CSS |
| Semantic | System | Component CSS, the style guide | First choice for any new rule |
| Component | Component | One component's CSS | Only when a component needs to be tuned or themed on its own |

### Naming

`{category}.{concept}.{variant}.{state}`, written in dot notation in docs and DTCG JSON, and as kebab-case custom properties in CSS.

| Docs | CSS |
|---|---|
| `color.text.secondary` | `--color-text-secondary` |
| `color.interactive.primary.bg.hover` | `--color-interactive-primary-bg-hover` |
| `space.inset.lg` | `--space-inset-lg` |
| `case-card.border.hover` | `--case-card-border-hover` |

Categories: `color`, `font`, `type`, `space`, `size`, `line`, `radius`, `elevation`, `motion`, `layout`, `breakpoint`, `z`.

### Where they live

| File | Status | Contents |
|---|---|---|
| `src/styles/tokens.css` | Live | The current tokens (`--paper`, `--ink`, `--space-3`, …). These are effectively the primitive tier today. Unchanged by this work. |
| `src/styles/semantic.css` | New, opt-in | The semantic tier, defined as aliases of `tokens.css`. Only the style guide imports it today, so the live site is untouched. |
| `docs/design-system/tokens.json` | New | All three tiers in W3C DTCG format, for Figma Variables or Style Dictionary. |

Adopting `semantic.css` across the site is a separate, approved-first step. See [governance/findings.md](governance/findings.md#p1-adopt-the-semantic-layer).

> **Theming gotcha.** A custom property that references another (`--color-text-primary: var(--ink)`) is resolved where it is declared. If the semantic layer lives on `:root`, a scope that overrides `--ink` (like the footer's blueprint sheet) will *not* change `--color-text-primary` inside it. Themes must re-declare the semantic tokens in their own scope, which is why `semantic.css` declares them on `:root, [data-theme]`, so any element with `data-theme` re-resolves them from its own primitives.

---

## 1. Primitive tokens

### Colour

| Token | Value | Current CSS | Notes |
|---|---|---|---|
| `color.paper.100` | `#ffffff` / dark `#141922` | `--paper` | Cards, bars, polaroid and print stock |
| `color.paper.200` | `#f4f5f6` / dark `#0b0e13` | `--surface` | The page, nav and paper sheets |
| `color.paper.300` | `#eceeef` / dark `#1b212b` | `--paper-shade` | Sunken: fact cells, figure frames, image wells |
| `color.paper.400` | `#e6e8ea` / dark `#0f1319` | `--paper-deep` | The Selected work sheet |
| `color.paper.500` | `#d9dcde` / dark `#2a3340` | `--rule` | Hairlines and resting card borders |
| `color.ink.900` | `#1c1b19` / dark `#e9eef6` | `--ink` | Text, structure, primary button |
| `color.ink.600` | `#615e58` / dark `#b0bac8` | `--graphite` | Secondary text |
| `color.ink.alpha.55` | `rgb(28 27 25 / 0.55)` | `rgb(var(--shadow-ink) / 0.55)` | Edge of raised paper |
| `color.graphite.alpha.45` | `rgb(97 94 88 / 0.45)` | hard-coded in `Hero.css` | Hero chips |
| `color.marker.500` | `#2f5fb3` / dark `#8fb0ea` | `--marker` | The accent and the 1px dividers |
| `color.marker.700` | `#1f4a99` | hard-coded in `TreeAssistFlow.css` | Marker text on a marker tint (light mode) |
| `color.marker.alpha.12` | `rgb(47 95 179 / 0.12)` / dark `rgb(143 176 234 / 0.16)` | `--marker-wash` | Accent tint |
| `color.pop` | ink / dark `rgb(143 176 234 / 0.55)` | `--pop-ink` | Shadow pop colour |
| `color.blueprint.600` | `#1d4e89` | `--blueprint` in `Footer.css` | Cyanotype sheet |
| `color.blueprint.050` | `#f2f6fb` | hard-coded in `Footer.css` | White linework on blueprint |
| `color.white` | `#ffffff` | `--sheet-lift`, `#fff` | Behind cut-out screenshots |
| `color.black.alpha.70` | `rgb(0 0 0 / 0.7)` | hard-coded in `Lightbox.css` | Scrim |
| `color.dot` | `165 171 176` / dark `84 98 118` (channels) | `--dot`, `--paper-dots` | Dotted paper |
| `color.grid` | `218 221 223` / dark `42 51 64` (channels) | `--grid-line` | Faint fills and grids |
| `color.shadow` | `28 27 25` / dark `0 0 0` (channels) | `--shadow-ink` | Soft shadow colour |

Dark values come from `:root[data-theme='dark']` in `tokens.css`. The site follows the device setting until the visitor picks with the nav switch.

**Product colours** (only inside reproductions of client UI, never in the portfolio chrome):

| Token | Value | Where |
|---|---|---|
| `color.product.red.600` | `#b3231c` | Venue Finder prototype and flows |
| `color.product.amber.500` | `#c98a12` | Venue flows warnings |
| `color.product.amber.800` | `#8a5a00` | Text on the amber tint |
| `color.product.headbox.*` | `#c8211b`, `#dcdcdc`, `#efefef`, `#dbeef7` … | `BookingStatusWidget.css`, a faithful copy of HeadBox UI |

These stay hard-coded on purpose: they are evidence of the client's product, not part of this system.

### Type

| Token | Value |
|---|---|
| `font.family.sans` | `'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif` (`--font-sans`) |
| `font.family.hand` | `'Caveat', 'Bradley Hand', 'Segoe Print', cursive` (`--font-hand`) |
| `font.weight.regular / medium / semibold / bold` | 400 / 500 / 600 / 700 |
| `font.size.8 … 56` | Even steps only: 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40, 44, 48, 56 |
| `font.line-height.tight / snug / normal / relaxed` | 1.1 / 1.3 / 1.5 / 1.65 |
| `font.tracking.tight / tighter` | -0.01em / -0.02em |

### Space (the 8px scale, `--space-*`)

| Token | Phone | ≥ 600px |
|---|---|---|
| `space.1` | 4px | 4px |
| `space.2` | 8px | 8px |
| `space.3` | 16px | 16px |
| `space.4` | 28px | 32px |
| `space.5` | 48px | 56px |
| `space.6` | 80px | 96px |
| `space.7` | 128px | 160px |

The top of the scale grows on larger screens so sections breathe; the small steps never change, so controls stay tight.

### Lines, radius, size

| Token | Value | Current CSS |
|---|---|---|
| `line.hair` | 0.5px | `--line-hair` |
| `line.thin` | 1px | `--line-thin` |
| `line.building` | 1.5px | `--line-building` |
| `line.cut` | 3px | `--line-cut` |
| `radius.md` | 16px | `--radius` |
| `radius.pill` | 999px | hard-coded |
| `radius.round` | 50% | hard-coded |
| `radius.none` | 0 | Polaroids and paper prints stay square |
| `size.tap` | 44px | `--tap` |
| `size.measure` | 64ch | `--measure` |

### Motion

| Token | Value | Current CSS |
|---|---|---|
| `motion.easing.pen` | `cubic-bezier(0.2, 0, 0, 1)` | `--ease-pen` |
| `motion.easing.settle` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | hard-coded (7 uses) |
| `motion.easing.enter` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | hard-coded (hero) |
| `motion.easing.glide` | `cubic-bezier(0.5, 0, 0.2, 1)` | hard-coded (hero title) |
| `motion.duration.micro` | 150ms | `--dur-micro` |
| `motion.duration.state` | 280ms | `--dur-state` |
| `motion.duration.paper` | 480ms | hard-coded (piles, FLIP) |
| `motion.duration.entrance` | 400ms | hard-coded (hero copy) |
| `motion.duration.signature` | 700ms | `--dur-signature` |
| `motion.stagger` | 70ms | hard-coded (card fan) |

### Shadow pop

| Token | Value | Current CSS |
|---|---|---|
| `pop.offset` | 5px | `--pop-offset` |
| `pop.lift` | 2px (0px with reduced motion) | `--pop-lift` |
| `pop.ink` | ink / dark: marker at 55% | `--pop-ink` |
| `shadow.pop` | `5px 5px 0 0 pop.ink` | `--shadow-pop` |
| `shadow.pop-pressed` | `1px 1px 0 0 pop.ink` | `--shadow-pop-pressed` |

### Layout and breakpoints

| Token | Value |
|---|---|
| `layout.content-max` | 1280px (`--content-max`) |
| `layout.gutter` | 24px (`--gutter`) |
| `layout.margin` | 16px / 32px ≥ 600 / 48px ≥ 1024 (`--margin`) |
| `layout.nav-height` | 56px (`.nav__inner`, `NAV_HEIGHT`) |
| `breakpoint.sm` | 600px (phone → tablet) |
| `breakpoint.md` | 900px (stacked → side-by-side) |
| `breakpoint.lg` | 1024px (wide margins, 4-up grids) |
| `breakpoint.xl` | 1200px (wide-screen tweaks) |

Off-scale breakpoints still in the code (640, 679, 700, 760, 1100) are listed in the findings.

---

## 2. Semantic tokens

Defined in `src/styles/semantic.css`. The right-hand column is what each resolves to today, so every token is a rename, not a redesign.

### Colour: surfaces

| Token | Resolves to | Use |
|---|---|---|
| `color.surface.page` | `paper.200` (`--surface`) | The page, nav and every paper sheet |
| `color.surface.card` | `paper.100` (`--paper`) | Cards, CTA bars, the theme switch track |
| `color.surface.sunken` | `paper.300` | Fact cells, image wells, placeholder frames, title sheet |
| `color.surface.deep` | `paper.400` | A sheet that needs to sit back (Selected work) |
| `color.surface.raised` | `paper.100` (white mixed into paper; lighter than cards in dark) | Paper lifted off the page: polaroid, prints, expertise cards |
| `color.surface.inverse` | `ink.900` | Primary button, dark quote, skip link |
| `color.surface.accent-subtle` | `marker.alpha.12` | Outcome pill, callout, row hover, next-study hover |
| `color.surface.media` | `white` | Only behind screenshots cut out on white |
| `color.surface.scrim` | `black.alpha.70` | Behind the lightbox |

### Colour: text and icons

| Token | Resolves to | Use |
|---|---|---|
| `color.text.primary` | `ink.900` | Body, headings |
| `color.text.secondary` | `ink.600` | Meta, captions, labels, table dates |
| `color.text.inverse` | `paper.100` | On `surface.inverse` |
| `color.text.accent` | `marker.500` | Metrics, case study Company link, current link, margin notes |
| `color.text.accent-on-subtle` | `marker.700` (dark: `marker.500`) | Accent text sitting on `surface.accent-subtle` |
| `color.icon.primary` | `ink.900` | Line drawings, list boxes |
| `color.icon.secondary` | `ink.600` | Fine linework |
| `color.icon.accent` | `marker.500` | Blue line icons, crayon, wink, axes |

### Colour: borders and lines

| Token | Resolves to | Use |
|---|---|---|
| `color.border.strong` | `ink.900` | Sheet edges, nav rule, buttons, hovered card, quotes |
| `color.border.subtle` | `paper.500` | Resting card edge, hairline schedules |
| `color.border.raised` | `ink.alpha.55` | Edge of raised paper |
| `color.border.soft` | `graphite.alpha.45` | Hero chips (was `border.registration`; the marks it drew were removed) |
| `color.border.accent` | `marker.500` | Callout bar, nav dimension line |
| `color.border.divider` | `marker.500`, 1px | Nav foot, section and case study header edges, card CTA top |
| `color.border.focus` | `marker.500` | Focus ring |
| `color.border.placeholder` | `ink.600` (dashed) | Empty image frames |

### Colour: interactive

| Token | Rest | Hover / focus | Pressed | Disabled |
|---|---|---|---|---|
| `color.interactive.primary.bg` | `ink.900` | `marker.500` + `elevation.pop` | `marker.500` + `elevation.pop-pressed` | not defined yet |
| `color.interactive.primary.text` | `paper.100` | `paper.100` | `paper.100` | |
| `color.interactive.secondary.bg` | transparent | `marker.500` | `marker.500` | |
| `color.interactive.secondary.text` | `ink.900` | `paper.100` | `paper.100` | |
| `color.interactive.secondary.border` | `ink.900` | `marker.500` | | |
| `color.interactive.icon-button.disabled-opacity` | | | | 0.3 (`.deck__button:disabled`) |

### Type roles

| Token | Size | Weight / line-height | Used by |
|---|---|---|---|
| `type.display.hero` | `clamp(32px, 4vw, 48px)`; phone `round(10vw - 8px, 2px)` | 700 / 1.1, -0.02em | Hero headline |
| `type.display` | `clamp(32px, 4vw, 48px)` | 500 / 1.15, -0.01em | `.display`: contact, field notes |
| `type.display.statement` | `clamp(28px, 3.5vw, 44px)` | 500 / 1.15 | About heading |
| `type.heading.section` | `clamp(26px, 3.2vw, 40px)` | 600 / 1.1, -0.015em | Case study section headings |
| `type.heading.card` | `clamp(22px, 2.4vw, 28px)` | 600 / 1.15, -0.01em | Case card title, next study |
| `type.heading.menu` | 32px | 600, -0.02em | Mobile menu items |
| `type.title` | 18px | 600 / 1.3 | Principle and expertise card titles |
| `type.lead` | 20px (16px phone) | 400 / 1.55 | Hero lede, Work intro line |
| `type.subtitle` | `clamp(18px, 1.8vw, 22px)` | 400 / 1.4 | Case study subtitle |
| `type.body` | `clamp(16px, 1.4vw, 18px)` | 400 / 1.65 | Default |
| `type.body.compact` | 16px | 400 / 1.5 | Cards, lists, callouts |
| `type.label` | 14px | 500 / 1.4 | `.label`, buttons on phone, role line |
| `type.caption` | 12px | 400–600 | Polaroid caption role, footer meta |
| `type.micro` | 10px | 500, uppercase, 0.08em | Footer title-sheet fields only |
| `type.metric` | `clamp(40px, 4.4vw, 56px)` | 600 / 1, -0.02em, tabular | Lead metrics |
| `type.annotation` | 22px (26–32px for Ashni's hand touches) | Caveat 500 / 1.15 | `.annotation` |

### Space roles

| Token | Resolves to | Use |
|---|---|---|
| `space.inline.xs` | `space.1` (4px) | Icon to label |
| `space.inline.sm` | `space.2` (8px) | Inside chips, between tags |
| `space.inline.md` | `space.3` (16px) | Between buttons |
| `space.stack.sm` | `space.2` | Label to value |
| `space.stack.md` | `space.3` | Paragraph to paragraph, card body gap |
| `space.stack.lg` | `space.4` | Block to block |
| `space.inset.sm` | `space.3` | Callout, small cards |
| `space.inset.md` | `space.4` | Cards |
| `space.inset.lg` | `space.4 + 16px` | Case card body ≥ 900px |
| `space.section.top` | `space.6` | `.section` top |
| `space.section.bottom` | `space.7` | `.section` bottom |

### Elevation

| Token | Value | Use |
|---|---|---|
| `elevation.0` | none | Flat paper, cards at rest (cards use a border, not a shadow) |
| `elevation.pop` | `shadow.pop`, element lifts `pop.lift` up-left | Hover (real pointers only) and keyboard focus of buttons, home case cards, next case study card, deck arrows |
| `elevation.pop-pressed` | `shadow.pop-pressed`, no lift | The same elements while pressed |
| `elevation.sheet` | `0 -1px 0 ink, 0 -12px 24px -12px shadow/0.18` | Paper sheet edge as it slides over the one below |
| `elevation.paper` | `0 1px 0 shadow/0.08, 0 14px 24px -14px shadow/0.35` | Raised paper at rest |
| `elevation.paper-hover` | `0 1px 0 shadow/0.08, 0 20px 30px -14px shadow/0.5` | Raised paper under the pointer |
| `elevation.paper-lifted` | `0 1px 0 shadow/0.08, 0 28px 40px -18px shadow/0.45` | A print picked out of the pile |

### Motion roles

| Token | Value | Use |
|---|---|---|
| `motion.state` | `micro` + `pen` | Hover colour, shadow pop lift |
| `motion.reveal` | `state` + `pen` | Carousel cross-fade, switch thumb |
| `motion.paper` | `paper` + `settle` | Piles, decks, FLIP between layouts |
| `motion.entrance` | `entrance` + `enter` | Hero copy, polaroid drop |
| `motion.signature` | `signature` + `settle` | Expertise cards fanning out |

---

## 3. Component tokens

Component tokens exist where a component is themed or tuned on its own. Each is defined next to the component in the docs; summary here.

| Component | Token | Resolves to |
|---|---|---|
| Button | `button.height` | `size.tap` |
| | `button.padding-x` | `space.4` (8px on phone hero) |
| | `button.border-width` | `line.building` |
| | `button.radius` | `radius.md` |
| | `button.hover-shadow` | `elevation.pop` |
| Case card | `case-card.border.rest` | `color.border.subtle` |
| | `case-card.border.hover` | `color.border.strong` |
| | `case-card.radius` | `radius.md` |
| | `case-card.media.ratio` | 6 / 5 (stacked; fills the 7fr column side by side) |
| | `case-card.columns` | 7fr 5fr (≥ 900px) |
| | `case-card.hover-shadow` | 0.5px ink ring + `elevation.pop` |
| | `case-card.tag-count` | 3 by default (`cardTagCount`), never repeating the badge |
| | `case-card.cta.height` | 56px |
| Polaroid | `polaroid.surface` | `color.surface.raised` |
| | `polaroid.border` | `color.border.raised` |
| | `polaroid.padding` | 16px 16px 12px |
| | `polaroid.rotate.rest / hover` | 2deg / 0deg |
| | `polaroid.photo.ratio` | 4 / 5 |
| Paper print (field notes) | `print.pile.scale` | 0.6 |
| | `print.pile.rotate` | -11deg to +11deg |
| Expertise card | `expertise.drawing.max` | 120px (150px in deck) |
| | `expertise.fan.offset` | translateY(40px) scale(0.94) |
| Principle card | `principle.icon.size` | 32px |
| | `principle.icon.stroke` | 1.75 |
| Chip | `chip.padding` | 2px 8px |
| | `chip.radius` | `radius.md` (tags), `radius.pill` (outcome) |
| Icon button | `icon-button.size` | `size.tap`, round |
| Focus ring | `focus.width / offset` | 2px / 3px (4px on paper prints) |
| Title sheet | `title-sheet.grid` | 16px blueprint grid at 7% |
