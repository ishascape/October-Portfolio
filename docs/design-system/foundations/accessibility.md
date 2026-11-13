# Accessibility

Target: **WCAG 2.2 AA** on every page.

## What's built in

| Area | How |
|---|---|
| Skip link | "Skip to content" is the first focusable element; it slides in on focus |
| Landmarks | `header` (nav), `main#main`, `footer`; each section is a labelled `section` |
| Headings | One `h1` per page; section `h2`s; cards and principles `h3` |
| Focus | `:focus-visible` gets a 2px marker outline at 3px offset site-wide. Paper prints use a 2px ink outline at 4px so it reads against their shadow. Whole-card links move the ring to the card (`.card:has(.card__link:focus-visible)`). |
| Non-control focus | Elements focused by in-page navigation (`tabindex="-1"`) get no ring, so sheet edges don't double up |
| Tap targets | `size.tap` (44px) minimum for buttons, menu button and deck arrows |
| Colour contrast | Text pairs pass AA; see [colour.md](colour.md#contrast-wcag-22) for the full table and the one pair to avoid |
| Motion | Full `prefers-reduced-motion` support; see [motion.md](motion.md#reduced-motion) |
| Reflow | Layouts work at 320px; the email button wraps rather than widening the page |
| Images | Descriptive alt text; decorative images are `alt=""` or `aria-hidden` |
| Tables | Work history and education are real `table`s with a visually hidden `caption`, `th scope` on columns and rows |
| Dialogs | Menu and lightbox are native `dialog` elements opened with `showModal()`, so focus is trapped and Esc closes them |
| Live regions | Copy email announces "Email address copied" |

## Patterns for custom widgets

| Widget | Pattern |
|---|---|
| Field notes pile | Each print is `role="button"`, focusable, `aria-expanded`, with a verb label ("Open …" / "Put back …"). Enter and Space toggle, Esc puts back, arrow buttons step through. |
| Expertise deck (phone) | List is focusable with `aria-roledescription="carousel"`; hidden cards are `aria-hidden`; arrow keys and buttons move |
| Polaroid flip (phone) | One full-size `button` over the print with `aria-pressed` and a label that says what will happen |
| Mode switch | `role="switch"` with `aria-checked` |
| Case card | Title link stretches over the whole card; the visual CTA is `aria-hidden` so the card isn't announced twice |
| Card carousel | `aria-hidden`; it repeats the card visually, so it isn't announced |

## Checklist for anything new

- Reachable and operable by keyboard alone, in a sensible order
- Visible focus with the system ring (don't remove outlines without a replacement)
- 44px targets for anything tappable
- Name, role and state exposed (native element first, ARIA second)
- Works with reduced motion, at 200% zoom and at 320px wide
- Contrast checked against the table in both light and dark mode, including on deep paper and tints
