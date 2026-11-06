# Typography

One family does all the reading: **Poppins**. A second, **Caveat**, is a hand that signs the drawing. That's it.

## Families

| Token | Family | Weights loaded | Role |
|---|---|---|---|
| `font.family.sans` | Poppins | 400, 500, 600, 700 | Everything: headings, body, labels, nav, buttons, numerals |
| `font.family.hand` | Caveat | 400–600 | Annotations on drawings and figures; Ashni's own touches ("Hi! I'm Ashni" on the polaroid, the polaroid's back, the footer signature, field notes captions) |

Loaded from Google Fonts with `display=swap` in `index.html`.

### Rules for the hand

- Caveat is never used for labels, nav, buttons, margin notes or anything functional.
- A traced version of Ashni's handwriting was tried and rejected (15 Oct 2026). Do not propose it again.
- No Anton or other display face anywhere (decided 31 Oct 2026).
- No small all-caps or monospace labels: they read as template-made. (The footer title sheet's 10px uppercase field labels are a known exception, see [findings](../governance/findings.md).)

## Sizes: even pixels only

Every fixed size is an even pixel value: 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40, 44, 48, 56. This was set by Ashni on 20 Oct 2026 and applies to every new rule.

Fluid sizes use `clamp()` with even end points. In between they scale with the viewport. On phones the hero headline uses `round(calc(10vw - 8px), 2px)` so even the fluid value snaps to an even number; use that pattern for any new fluid size that must stay even.

## Type roles

| Role | Token | Size | Weight / leading / tracking | Where |
|---|---|---|---|---|
| Hero display | `type.display.hero` | 48 max (fluid from 32); phone `10vw - 8px` rounded to 2px | 700 / 1.1 / -0.02em | Hero headline only |
| Display | `type.display` | 32–48 | 500 / 1.15 / -0.01em | Contact heading, Field notes |
| Statement | `type.display.statement` | 28–44 | 500 / 1.15 | About heading (one sentence per line) |
| Section heading | `type.heading.section` | 26–40 | 600 / 1.1 / -0.015em | Case study section headings |
| Card heading | `type.heading.card` | 22–28 | 600 / 1.15 / -0.01em | Case card title, next study title |
| Menu | `type.heading.menu` | 32 | 600 / -0.02em | Phone menu items |
| Title | `type.title` | 18 (22 in phone deck) | 600 / 1.3 | Principle and expertise card titles |
| Lead | `type.lead` | 20, phone 16 | 400 / 1.55 | Hero lede, Work intro line |
| Subtitle | `type.subtitle` | 18–22 | 400 / 1.4 | Case study subtitle |
| Body | `type.body` | 16–18 | 400 / 1.65 | Default for `body` |
| Body compact | `type.body.compact` | 16 | 400 / 1.5 | Cards, lists, callouts, tables |
| Label | `type.label` | 14 | 500 / 1.4 | `.label`: meta, tags, role line, table heads |
| Caption | `type.caption` | 12 | 400–600 | Polaroid role caption, footer meta |
| Micro | `type.micro` | 10 | 500 / uppercase / 0.08em | Footer title-sheet field names only |
| Metric | `type.metric` | 40–56 | 600 / 1 / -0.02em, tabular numerals | Lead metric, impact row |
| Annotation | `type.annotation` | 22 (26–32 for hand touches) | Caveat 500 / 1.15 | `.annotation` |

## Hierarchy in practice

- One `h1` per page. On the home page it's the hero headline; on case studies it's the study title.
- Headings get `text-wrap: balance`, body gets `text-wrap: pretty`.
- Body copy is capped at `size.measure` (64ch).
- Weight carries emphasis inside copy (`strong` at 600). Italic is not used.
- Numerals in metrics use `font-variant-numeric: tabular-nums` so values align in rows.
- Headline letter-spacing tightens as size grows (-0.01em at display, -0.02em at hero and metric). Body is never tracked.

## Do and don't

| Do | Don't |
|---|---|
| Pick a role from the table and use its token | Introduce a new size for one element |
| Use 600 for headings inside cards, 500 for large statements | Use 700 anywhere except the hero headline |
| Use Caveat to annotate a drawing or sign something | Use Caveat for a heading, button or label |
| Keep metric numerals blue and tabular | Animate or count up metrics |
