# Button

**Status:** Stable · **Source:** `src/styles/global.css` (`.button`, `.button--primary`), `Work.css` (card CTA), `Contact.tsx` (copy), `Skills.css` (`.deck__button`)

## Overview

Buttons start an action or take someone somewhere they asked to go. There are two emphasis levels. On hover both turn marker blue and show registration marks, the drawing convention for "this is the one you're choosing".

## Anatomy

```
  ┌╴                         registration mark (hover/focus)
  ╭─────────────────────────╮
  │  Label   [glyph]        │  1.5px ink border, 16px radius, 44px min height
  ╰─────────────────────────╯
                          ╶┘  registration mark
```

1. **Container**: inline-flex, `button.height` 44px minimum, `space.4` horizontal padding
2. **Label**: inherits type (body size), sentence case
3. **Glyph** (optional): ↓ ↗ → in an `aria-hidden` span, `space.2` from the label
4. **Registration marks**: two 10px L-corners at -6px, `color.border.registration`, hidden at rest

## Variants

| Variant | Class | Rest | Use |
|---|---|---|---|
| **Primary** | `.button.button--primary` | Ink fill, paper text | The one action you most want on a screen: "Explore my work ↓", the email copy button |
| **Secondary** | `.button` | Transparent, ink border and text | Everything else: "View resume ↗", "Email me", "LinkedIn ↗" |
| **Card CTA** | `.card__cta .button` | Full-width foot of the card, top border only, no registration marks | Inside a case study card only. Reads as secondary at rest and becomes primary when the card is hovered or focused. |
| **Copy** | `.button--primary.contact__copy` | Primary, address on the left, "Copy" hint at 70% on the right | Contact. Becomes "Copied ✓" for 2s. Falls back to `mailto:` if the clipboard is unavailable. |

Rule: **one primary per view.** The hero has one, Contact has one.

## Sizes

| Size | Where | Spec |
|---|---|---|
| Default | Everywhere | 44px min height, `space.4` (28/32px) padding, body type |
| Compact | Hero buttons on phones | Same height, 8px padding, 14px label, two side by side at equal width, `nowrap` |
| Footer | Card CTA | 56px height, padding matches the card body |

## States

| State | Primary | Secondary | Notes |
|---|---|---|---|
| Default | Ink bg, paper text | Transparent bg, ink border and text | |
| Hover | Marker bg and border, paper text, registration marks | Same as primary hover | 150ms `pen` |
| Focus visible | 2px marker outline at 3px, plus registration marks | Same | Marks appear on `:focus-visible` too |
| Active | Same as hover | Same as hover | No pressed style today |
| Disabled | **Not defined** | **Not defined** | No live button is ever disabled. Proposal: 0.3 opacity, `cursor: default`, no hover (matches icon button) |
| Loading | **Not defined** | **Not defined** | Nothing on the site waits. Don't add one without a real wait. |
| Success (copy) | "Copied ✓" in label style | n/a | Announced in a polite live region |

## Responsive

- Phones: hero buttons sit side by side, equal width, centred. Contact buttons stack full width (grid).
- ≥ 600px: Contact buttons wrap in a row.

## Accessibility

- Use `<a class="button">` for navigation and `<button class="button">` for actions. Never a `div`.
- Glyphs are `aria-hidden`; the label must make sense alone.
- External links open in a new tab with `rel="noreferrer"` and show ↗.
- The card CTA is `aria-hidden`; the card's title link is the real target.
- 44px minimum target is guaranteed by `min-height: var(--tap)`.

## Content

Verb first, sentence case, two or three words, then the direction glyph: ↓ in-page, → another page, ↗ off-site or file. See [voice and copy](../foundations/voice-and-copy.md).

## Do and don't

| Do | Don't |
|---|---|
| One primary per view | Two primaries side by side |
| Pair a primary with a secondary | Use a text link where a button is expected (or the reverse) |
| End external links with ↗ | Put an icon before the label |
| Keep labels under 20 characters | Write "Click here" or "Learn more" |

## Tokens

| Token | Value |
|---|---|
| `button.height` | `size.tap` (44px) |
| `button.padding-x` | `space.4` |
| `button.border-width` | `line.building` (1.5px) |
| `button.radius` | `radius.md` (16px) |
| `button.registration.size` | 10px |
| `button.registration.offset` | -6px |
| `button.registration.color` | `color.border.registration` |
| `button.primary.bg` / `.hover` | `color.interactive.primary.bg` / `.bg-hover` |
| `button.secondary.border` | `color.interactive.secondary.border` |
| `button.transition` | `motion.state` |

---

## Icon button

**Source:** `Skills.css` `.deck__button`

A round 44px button holding a single arrow glyph, used to step through the expertise deck and the field notes pile.

| Property | Value |
|---|---|
| Size | `size.tap` × `size.tap`, `radius.round` |
| Border | `line.thin` ink |
| Background | `color.surface.page` |
| Glyph | 18px ← or → in an `aria-hidden` span |

| State | Spec |
|---|---|
| Default | As above |
| Hover | No change today |
| Focus | System focus ring |
| Disabled | 0.3 opacity, `cursor: default` (first and last card of the deck) |

Always give it an `aria-label` ("Previous", "Next page").

## Text button

**Source:** `About.css` `.field-notes__back`

A borderless label-style button for a secondary action inside a widget ("Pick a page" / "Back to the pile"). Graphite, `type.label`, `space.1 space.2` padding. Disabled when there is nothing to go back to; it is then also removed from the tab order.
