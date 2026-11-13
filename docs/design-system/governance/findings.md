# Findings and proposals

What the audit found in the code on 1 Nov 2026, and what to do about it. Rechecked on 13 Nov 2026 against the cool gray palette, dark mode, the shadow pop and the removal of the corner marks: items those changes settled are marked done. **Nothing else here has been applied.** Each item changes CSS that is live, so each needs Ashni's go-ahead. All of them are refactors that should produce zero visible change, apart from P6 and P7, which are design calls.

Priority: **P1** do first, unlocks the rest · **P2** worth doing · **P3** tidy-up.

| # | Finding | Proposal | Visible change? | Effort |
|---|---|---|---|---|
| P1 | No semantic layer in use | Import `semantic.css` site-wide, migrate components | None | M |
| P2 | Seven breakpoints | Consolidate to four | Small layout shifts at a few widths, checked one by one | S |
| P2 | Hard-coded colours in chrome | Replace with semantic tokens | None | S |
| P2 | Motion values hard-coded | Use motion tokens | None | S |
| P2 | Paper print, box bullet and shadow pop rules are copy-pasted | Shared utilities | None | S |
| P2 | States not designed | Define disabled, hover and loading where missing | Only where adopted | S |
| P3 | Caveat used for a functional label | Move deck counter to Poppins | Yes, small | XS |
| P3 | Footer uses 10px uppercase labels | Keep or change | Only if changed | XS |
| P3 | Off-scale spacing values | Map to scale or name them | None, or 2px | S |
| P3 | Three link styles | Document (done), no change | None | n/a |
| P3 | No error or danger colour for shadcn's `--destructive` | Pick one when a form or alert component needs it | Only where adopted | XS |
| P3 | Dead code | Delete `HeroStack`, puzzle CSS, `Parti.tsx`, duplicate rules | None | XS |

---

## P1. Adopt the semantic layer

**Found:** components reference primitives directly (`var(--ink)`, `var(--graphite)`), and some bypass tokens entirely. The 28 Oct audit note describes semantic tokens being added to `tokens.css`, but they are not in the file today.

**Proposal:**
1. Import `src/styles/semantic.css` in `main.tsx` after `tokens.css`. No visual change: every semantic token aliases an existing value.
2. Migrate component CSS one file at a time, in this order: `global.css`, `Work.css`, `AiPrinciples.css`, `About.css`, `Skills.css`, `Hero.css`, `Contact.css`, `Nav.css`, `CaseStudy.css`, `Footer.css`.
3. Express the footer blueprint as `data-theme="blueprint"` and delete its local overrides.
4. After each file: build, screenshot the home page and three case studies at 390, 768, 1440 and 1920 wide, and diff against `main`. Merge only on a zero diff.

**Why:** one place to change a role, a working theme model, and docs that match the code.

## P2. Consolidate breakpoints

**Found:** `600` (13 uses), `900` (9), `1024` (3), `1200` (2) are the system. Also in use: `640`, `679`/`680`, `700`/`701` (4), `760` (5), `1100` (1).

| Off-scale | Where | Proposal |
|---|---|---|
| `max-width: 640px` | `BookingStatusWidget` | leave (product reproduction) |
| `max-width: 679px` | `MvpScopeFlow`, `TreeAssistFlow` diagrams | → 599 |
| `min-width: 700px` | AI principles 2-up, quote cards 2-up | → 600 |
| `max-width: 700px` | prototype height | leave (product reproduction) |
| `min-width: 760px` | toolkit 5-up, experiment with image, puzzle | → 900 |
| `min-width: 1100px` | AI principles 4-up | → 1024 or 1200 (check the titles still fit) |

Each change moves a layout switch by up to 100px, so it needs a quick visual check at the old and new widths.

## P2. Hard-coded colours in portfolio chrome

| Value | Where | Token |
|---|---|---|
| `#fff` | `CaseStudy.css` (hero image, figure ground, HQ prototype) | `--color-surface-media` |
| `rgba(0,0,0,0.12)` fallback | `CaseStudy.css:640` | `--color-border-subtle` |
| `rgb(97 94 88 / 0.45)` | `Hero.css` chips | `--color-border-soft` |
| Moonlit rim `rgb(176 200 245 / 0.14)` | `tokens.css` dark card rules (repeated 4 times) | a `--card-rim` token in the dark block |
| `#1f4a99` | `TreeAssistFlow.css` | `--color-text-accent-on-subtle` |
| `rgb(0 0 0 / 0.7)` | `Lightbox.css` | `--color-surface-scrim` |
| Blueprint values | `Footer.css` | `[data-theme='blueprint']` |

Product colours inside reproductions (`VenueFinderPrototype`, `VenueFlows`, `BookingStatusWidget`) stay as they are, on purpose.

## P2. Motion tokens

**Found:** 4 easing curves and about 20 durations hard-coded across components. The token file has only `--ease-pen` and three durations.

**Proposal:** add `--ease-settle`, `--ease-enter`, `--ease-glide`, `--dur-paper` (480ms) and `--dur-entrance` (400ms) to `tokens.css` and replace the literals. Leave one-off timings in the hero sequence as literals with comments, because they're choreography, not system values.

## P2. Shared utilities for repeated patterns

| Pattern | Copies | Proposal |
|---|---|---|
| Raised paper print (surface, border, shadow) | Polaroid, field notes print, expertise grid card, expertise deck paper, polaroid back | `.paper-print` utility or a `--elevation-paper` token in each |
| Shadow pop (hover, focus, active, `hover: hover` guard) | Button, case card, next case study card, deck arrows | `.pops` utility, so a new pressable thing gets all three states and the touch guard at once |
| Box bullet | Case card supporting, case study list | `.list-box` utility |
| Graph paper background | Case card image, case study header | `--texture-graph` token |

Also: extract `CaseCard` from `Work.tsx` into its own component so the style guide can render the real thing instead of a mirror.

## P2. States that aren't designed

| Component | Missing | Proposal |
|---|---|---|
| Button | Disabled | 0.3 opacity, `cursor: default`, no hover, no pop (matches icon button) |
| Button | Loading | Don't add until something on the site waits |
| Button | Active / pressed | **Done 13 Nov 2026:** settles into a 1px shadow (`--shadow-pop-pressed`) |
| Icon button | Hover | **Done 13 Nov 2026:** shadow pop, like buttons |
| Mode switch | Hover | Shadow pop, like buttons |

These are design decisions, so they are Ashni's call.

## P3. Caveat on a functional label

**Found:** the expertise deck counter ("3 of 8, swipe the sheet") uses `.annotation` (Caveat). The typography rule reserves Caveat for drawing annotations and Ashni's own touches.

**Proposal:** switch it to `.label`, graphite. Small visible change on phones only.

## P3. Footer uppercase micro labels

**Found:** title sheet field names are 10px, uppercase, 0.08em tracked. That contradicts the "no small all-caps labels" rule.

**Options:** (a) keep, as a deliberate title-block convention scoped to the footer only, and record the exception (recommended, it reads as a real title block); (b) change to sentence-case 12px `.label`.

## P3. Off-scale spacing

**Found:** most common off-scale values: 24px (14 uses), 12px (10), 6px (12, mostly mark offsets), 30px (3, Work heading and section top), 40px (3).

**Proposal:** 24px is `--gutter`, so use it by name. 12px and 6px are fine as component-level values (mark offsets, caption gaps) if they're named in the component. Change 30px to `--space-4` (28/32px) only if Ashni is happy with a 2px shift; otherwise name it.

## P3. Dead code

| Item | Note |
|---|---|
| `HeroStack.tsx` and `.hero__deck`, `.deck-sheet*`, `.hero__sheets`, `.hero__puzzle*`, `.hero__piece*`, `.hero__dots`, `.hero__nav` in `Hero.css` | The pre-polaroid hero, about 350 lines of CSS shipped to every visitor |
| `Parti.tsx` | Not imported |
| `Parti.css` lines 117–192 | Exact repeat of lines 32–107 |

Removing these is zero-risk visually but loses the old hero for good (it's still in git history).
