# Case study patterns

**Status:** Stable · **Source:** `CaseStudy.tsx`, `CaseStudy.css`, data in `src/data/caseStudyPages.ts`

Case study pages are composed from a small set of blocks. Sections choose blocks from the data they hold.

## Page order

1. **Header**: sheet bar, kicker, title, subtitle, hero visual and fact block, on graph paper
2. **TL;DR**: problem and solution side by side, impact row
3. **Sections**: rail and body, each with optional lists, callouts, quotes, experiments, decisions, moments, figures, prototypes
4. **Next study**
5. Contact sheet and sign-off bar

---

## Header

| Part | Spec |
|---|---|
| Background | 24px graph paper (hairline, `color.grid` at 40%), 1px ink bottom rule |
| Sheet bar | `type.label` row on a 1px ink rule: back link left, sheet reference right; links turn marker on hover |
| Kicker | `type.label`, marker |
| Title | `.display` (`h1`) |
| Subtitle | `type.subtitle`, capped at `size.measure` |
| Visual | Product image on white, or a native drawing in a 1px ink frame, max 640px |

## Fact block

A ruled schedule of project facts (role, team, timeline, platform…).

| Property | Spec |
|---|---|
| Structure | `dl` grid; 1px ink border; cells separated by 1px gaps showing the ink background |
| Cell | `surface.sunken`, `space.2 space.3` padding; `dt` label graphite, `dd` 16px |
| Layout | Auto-fit 240px columns; one column beside the visual ≥ 900px; HostHQ "wide" variant 3-up ≥ 900, 5-up ≥ 1200 |

## Impact row

| Property | Spec |
|---|---|
| Item | `line.building` ink top rule, marker text |
| Value | `type.metric`, tabular |
| Layout | 2 columns, 4 from 1024px |
| Note | 14px graphite footnote under the row, max 62ch, for caveats on how a number was measured |

Every value comes from the CV.

## Section

| Property | Spec |
|---|---|
| Spacing | `space.6` block padding, hairline `border.subtle` between sections, `scroll-margin-top: 72px` |
| Layout | Stacked < 1024; 3fr rail (label, graphite) / 9fr body ≥ 1024 |
| Heading | `type.heading.section` |
| Body | Max 760px; paragraphs at `size.measure` |
| Eyebrow (optional) | Marker hand note with a line-drawn light bulb, above the heading |

## List

Box bullets (8px, 1.25px ink), `space.4` indent, `space.2` gap, `strong` at 600.

## Callout

A key insight pulled out of the text.

| Property | Spec |
|---|---|
| Container | 4px marker left bar, `surface.accent-subtle`, `space.3` padding, square |
| Type | `type.body.compact`, ink; `strong` 600 |

Use at most one per section.

## Quote card

| Variant | Spec |
|---|---|
| Light | Paper, `line.building` ink, `radius.md`, `space.4` padding |
| Dark (`--dark`) | Ink background, paper text |

Name in 600, role underneath at 75% opacity. Pairs side by side from 700px. Quotes are verbatim from research or stakeholders, never paraphrased into quote marks.

## Experiment card

| Property | Spec |
|---|---|
| Container | `line.thin` `border.subtle`, `space.3` padding, square |
| Title | 400 weight on a 1px ink rule |
| Body | `dl` of intent, change, result; 3 columns from 600px |
| Verdict | `type.label`, marker |
| With screen (`--image`) | ≥ 760px: image 60% left (max 600px tall), text right |

## Decision card and product moment

The decision log: the decision is the headline, the rest is a schedule.

| Property | Spec |
|---|---|
| Container | `line.thin` `border.subtle`, `space.3` padding (decision); no frame (moment) |
| Title | 400 weight on a 1px ink rule |
| Schedule | `dl` rows with an 8rem (decision) or 6rem (moment) label column; stacked on phones |

## Figure

| Variant | Spec |
|---|---|
| Image (`--image`) | Full width, white ground only as large as the image |
| Clear (`--clear`) | Transparent cut-out on paper |
| Bordered (`--bordered`) | 1px ink edge |
| Placeholder | 16:9 dashed graphite frame on sunken paper, label bottom left |
| Caption | Graphite; `--title` variant in ink 600 |

## Next study

| Property | Spec |
|---|---|
| Container | 1px ink frame, `space.4` padding (`space.5` ≥ 1024), whole block is a link |
| Layout | Stacked; 5fr image / 7fr text ≥ 1024 |
| Hover | `surface.accent-subtle` |
| Title | `type.heading.card` |

## Do and don't

| Do | Don't |
|---|---|
| Choose blocks from what the section actually has (a decision, a quote, a screen) | Use the same rail-and-body block for every section |
| Put measurement caveats in the impact note | Show a metric you can't source |
| Label placeholders with what's coming | Leave an empty frame unlabelled |
