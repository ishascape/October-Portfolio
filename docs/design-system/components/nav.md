# Nav

**Status:** Stable · **Source:** `Nav.tsx`, `Nav.css`, `sheetNav.ts`

## Overview

A sticky paper bar with Ashni's name, the four places on the site and the light/dark switch. The current section is marked the way a drawing marks a dimension.

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│ ▲ Ashni Dave          Work   About   Contact  Resume ↗  (☀|☾) │  56px, page gray
└──────────────────────────────────────────────────────────────┘  1px marker-blue rule
                                  ╲───╱  dimension line under current
```

1. **Bar**: sticky at top, `z-index: 10`, `surface.page` background, 1px `border.divider` (marker blue) bottom edge, safe-area padding. Solid page colour extends above it so nothing shows behind a phone status bar.
2. **Wordmark**: solid blue mountain icon (30×24, paper-coloured snow line; a climber walks up and plants a flag on hover) and "Ashni Dave" in 600 weight, marker blue. Links to the top of the home page.
3. **Links** (≥ 600px): Work, About, Contact, Resume ↗, `space.4` apart.
4. **Dimension line**: 1px marker rule with 45° end ticks, under the hovered or current link.
5. **Theme switch**: a 52×28 pill track with a 1px marker outline on `surface.card`, a solid sun and moon, and a knob that slides over the active one. 44px target. `aria-pressed` is true in dark mode.
6. **Menu button** (< 600px): "Menu" in label style, 44px target.

Pending, not on main yet: draft PR #123 adds "Senior Product Designer" beside the name (graphite, 14px, after a short blue rule, from 900px up) and removes the hero eyebrow. Update this page when it merges.

## Variants

| Variant | When |
|---|---|
| Home | Links are in-page anchors; current section tracking is on |
| Case study | Links go back to the home page sections; no current section |

## States

| Element | Default | Hover | Focus | Current |
|---|---|---|---|---|
| Link | Ink, no line | Dimension line draws in, 260ms | System ring | Dimension line shown, `aria-current="location"` |
| Wordmark | Marker | Climber walks up the mountain and plants a flag | System ring | n/a |
| Theme switch | Knob over the sun (light) | n/a | 2px marker ring around the track | Knob over the moon, `aria-pressed="true"` |

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
| `nav.border` | `line.thin` `color.border.divider` |
| `nav.surface` | `color.surface.page` |
| `nav.wordmark.color` | `color.text.accent` |
| `nav.indicator.color` | `color.border.accent` |
| `nav.indicator.duration` | 260ms `pen` |
| `nav.menu.item` | `type.heading.menu` |
