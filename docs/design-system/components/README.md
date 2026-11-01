# Components

Every component that is live on ashnidave.com, documented with the same template:

**Overview · Anatomy · Variants · Sizes · States · Responsive · Accessibility · Content · Do and don't · Tokens · Source**

Status key: **Stable** (live and approved, change only after discussion) · **Needs decision** (live, but has an open question in [findings](../governance/findings.md)) · **Deprecated** (in the repo, not rendered).

## Inventory

### Actions and navigation

| Component | Doc | Source | Status |
|---|---|---|---|
| Button (primary, secondary, card CTA, copy) | [button.md](button.md) | `global.css` `.button` | Stable; no disabled or loading state defined |
| Icon button | [button.md](button.md#icon-button) | `Skills.css` `.deck__button` | Stable |
| Text link | [link.md](link.md) | `AiPrinciples.css`, `Footer.css`, `CaseStudy.css` | Stable; three styles, see findings |
| Nav | [nav.md](nav.md) | `Nav.tsx`, `Nav.css` | Stable |
| Mode switch | [mode-switch.md](mode-switch.md) | `ModeSwitch.tsx` | Stable |

### Containers and surfaces

| Component | Doc | Source | Status |
|---|---|---|---|
| Paper sheet (section) | [paper-sheet.md](paper-sheet.md) | `global.css`, `useSheetStack.ts` | Stable |
| Case study card | [case-study-card.md](case-study-card.md) | `Work.tsx`, `CardCarousel.tsx`, `Work.css` | Stable |
| Principle card | [principle-card.md](principle-card.md) | `AiPrinciples.tsx` | Stable |
| Expertise card and deck | [expertise-card.md](expertise-card.md) | `Skills.tsx`, `Skills.css`, `Parti.css` | Stable |
| Chip (tag, outcome pill) | [chip.md](chip.md) | `Work.css` | Stable |

### Signature pieces

| Component | Doc | Source | Status |
|---|---|---|---|
| Polaroid | [polaroid.md](polaroid.md) | `Hero.tsx`, `Hero.css` | Stable |
| Field notes pile | [field-notes-pile.md](field-notes-pile.md) | `FieldStrip.tsx`, `About.css` | Stable |
| Title sheet (footer) | [title-sheet.md](title-sheet.md) | `Footer.tsx`, `KeyPlan.tsx`, `Footer.css` | Needs decision (uppercase micro labels) |

### Data display

| Component | Doc | Source | Status |
|---|---|---|---|
| Revision table | [revision-table.md](revision-table.md) | `About.tsx`, `About.css` | Stable |
| Case study patterns (header, facts, impact row, section, callout, quote, experiment, decision, figure, next study) | [case-study-patterns.md](case-study-patterns.md) | `CaseStudy.tsx`, `CaseStudy.css` | Stable |
| Lightbox | [lightbox.md](lightbox.md) | `Lightbox.tsx` | Stable |

### Deprecated (in the repo, not rendered)

| Item | Where | Note |
|---|---|---|
| `HeroStack` (hero card pile and "Pick a page" puzzle) | `HeroStack.tsx`, `.hero__deck`, `.deck-sheet`, `.hero__puzzle`, `.hero__piece*` in `Hero.css` | Replaced by the polaroid hero. Safe to delete once Ashni confirms she won't bring it back. |
| `Parti` component | `Parti.tsx` | Not imported; `Parti.css` is still used by the expertise drawings. |

### Product reproductions (out of scope)

`VenueFinderPrototype`, `LegacyBriefPrototype`, `BookingStatusWidget`, `VenueCardDemo`, `VenueFlows`, `HostDayFlow`, `MvpScopeFlow`, `TreeAssistFlow`, `VenueGapsFlow`, `DecisionFork`, `SitePlan`, `KeyPlan`. These reproduce client UI or draw case-study-specific diagrams. They follow the [drawing conventions](../foundations/iconography.md#partis-diagrams) but use the client's own colours and radii, and are not part of the reusable system.

## State coverage at a glance

| Component | Default | Hover | Focus | Active / selected | Disabled | Loading |
|---|---|---|---|---|---|---|
| Button | ✓ | ✓ | ✓ | n/a | gap | gap |
| Icon button | ✓ | none | ✓ | n/a | ✓ | n/a |
| Nav link | ✓ | ✓ | ✓ | ✓ current | n/a | n/a |
| Case card | ✓ | ✓ | ✓ | n/a | n/a | n/a |
| Principle card | ✓ | link only | link only | n/a | n/a | n/a |
| Expertise card | ✓ | ✓ | n/a | ✓ top of deck | n/a | n/a |
| Polaroid | ✓ | ✓ | ✓ (phone flip) | ✓ flipped | n/a | n/a |
| Field notes print | ✓ | ✓ | ✓ | ✓ open | n/a | n/a |
| Mode switch | ✓ | none | ✓ | ✓ checked | n/a | n/a |
| Revision row | ✓ | ✓ | n/a | n/a | n/a | n/a |

"gap" means the state isn't designed yet; nothing on the live site needs it today. Proposals are in [findings](../governance/findings.md).
