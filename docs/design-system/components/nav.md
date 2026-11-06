# Nav

**Status:** Stable · **Source:** `Nav.tsx`, `Nav.css`, `sheetNav.ts`

## Overview

A sticky paper bar with Ashni's name and the four places on the site. The current section is marked the way a drawing marks a dimension.

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│ ⛰ Ashni Dave                    Work   About   Contact  Resume ↗ │  56px, paper
└━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┘  1px ink rule
                                  ╲───╱  dimension line under current
```

1. **Bar**: sticky at top, `z-index: 10`, paper background, `line.thin` ink bottom edge, safe-area padding. Solid paper extends above it so nothing shows behind a phone status bar.
2. **Wordmark**: mountain line icon (28×20, 1.6 stroke) and "Ashni Dave" in 600 weight, marker blue. Links to the top of the home page.
3. **Links** (≥ 600px): Work, About, Contact, Resume ↗, `space.4` apart.
4. **Dimension line**: 1px marker rule with 45° end ticks, under the hovered or current link.
5. **Menu button** (< 600px): "Menu" in label style, 44px target.

## Variants

| Variant | When |
|---|---|
| Home | Links are in-page anchors; current section tracking is on |
| Case study | Links go back to the home page sections; no current section |

## States

| Element | Default | Hover | Focus | Current |
|---|---|---|---|---|
| Link | Ink, no line | Dimension line draws in, 260ms | System ring | Dimension line shown, `aria-current="location"` |
| Wordmark | Marker | No change | System ring | n/a |

Current section is worked out from each sheet's position in the flow, not intersection, because sticky sheets overlap. Scrolled to the bottom always marks Contact.

## Responsive

| Width | Behaviour |
|---|---|
| < 600px | Wordmark and "Menu". Menu opens a full-screen native `dialog` ("Drawing list") with a header row and 32px, 600-weight items on hairline rules, including Introduction and Resume ↗. Tapping a link closes it. |
| ≥ 600px | Inline links |

On phones the nav fades in at 1.3s as part of the start screen ([motion](../foundations/motion.md#phone--600px-about-18s-the-start-screen)).

## Accessibility

- `header` landmark containing `nav aria-label="Main"`.
- The menu is a modal `dialog` (`showModal()`), so focus is trapped and Esc closes it. It has an explicit Close button.
- `scroll-padding-top: 72px` on `html` keeps anchored headings clear of the bar.

## Do and don't

| Do | Don't |
|---|---|
| Keep to four destinations plus Resume | Add a fifth section to the bar |
| Mark the current section with the dimension line | Bold or colour the current link |

## Tokens

| Token | Value |
|---|---|
| `nav.height` | 56px (`NAV_HEIGHT` in `sheetNav.ts`) |
| `nav.border` | `line.thin` `color.border.strong` |
| `nav.wordmark.color` | `color.text.accent` |
| `nav.indicator.color` | `color.border.accent` |
| `nav.indicator.duration` | 260ms `pen` |
| `nav.menu.item` | `type.heading.menu` |
