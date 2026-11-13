# Drawing Set: the ashnidave.com design system

The portfolio is drawn, not decorated. Every surface is a sheet of paper, every rule is a pen weight, and blue marker is the only colour that is allowed to ask for attention. This folder writes those decisions down so the site can grow (new case studies, new sections, new themes) without drifting.

It documents **what is live today**. Nothing in here redesigns an approved component. Where the code and the intent disagree, the gap is listed in [governance/findings.md](governance/findings.md) with a proposal, and nothing changes until Ashni approves it.

## Principles

1. **Paper first.** A neutral cool gray page with white cards on it, dotted like drawing paper; sunken and deep paper for wells and recessed sheets. Relief comes from texture, not gradients. In dark mode the same paper is lit by moonlight.
2. **One marker.** Blue marker (`color.accent`) is reserved for the thing that matters on a screen: the lead metric, the current nav item, the focus ring, a hand annotation. If two things are blue, one of them is wrong.
3. **Pen weights carry hierarchy.** Hairline for schedules, thin for structure, building weight for things you can press, cut weight for emphasis. Lines are drawn, so corners can overshoot in drawings. Full-width dividers are a single 1px marker-blue line.
4. **Evidence over ornament.** Metrics, screenshots and quotes are real or absent. A labelled empty frame ("Key screens to come") is better than an invented one.
5. **Pressable things pop.** Buttons and clickable cards lift into a hard, unblurred offset shadow on hover and keyboard focus, and settle back when pressed. Soft shadows are only for lifted paper.
6. **Motion settles.** Things move like paper being placed on a desk: fast start, soft landing, no bounce. Every animation has an instant fallback for reduced motion.
7. **Hand lettering is a signature, not a typeface.** Caveat is for annotations on drawings and Ashni's own touches only.

## How this compares to the systems it borrows from

| Idea | Borrowed from | How it shows up here |
|---|---|---|
| Three token tiers (reference, system, component) | Material 3 | `primitive` → `semantic` → `component` ([tokens.md](tokens.md)) |
| Role-based names such as `color.text.secondary`, `color.border.focus` | Atlassian Design System | Semantic layer, written in dot notation in docs and kebab-case in CSS |
| Themes as a swap of the semantic layer only | IBM Carbon (White / G100) | The footer's blueprint sheet already does this; [colour.md](foundations/colour.md) explains how to formalise it |
| Component pages with anatomy, states, do/don't and content rules | Polaris, Carbon | Every page in [components/](components/README.md) uses the same template |
| Tokens in W3C DTCG JSON | Design Tokens Community Group | [tokens.json](tokens.json) is the portable source for Figma or Style Dictionary |

## Contents

**Tokens**
- [tokens.md](tokens.md): architecture, naming, every token with its current CSS source
- [tokens.json](tokens.json): the same tokens in DTCG format, with dark values under `$extensions`
- [CHANGELOG.md](CHANGELOG.md): what changed in the system and when

**Foundations**
- [Colour](foundations/colour.md)
- [Typography](foundations/typography.md)
- [Spacing, layout and grid](foundations/spacing-layout.md)
- [Lines, shape and elevation](foundations/lines-shape-elevation.md)
- [Motion](foundations/motion.md), including the hero load sequences and reduced motion
- [Iconography and drawings](foundations/iconography.md)
- [Imagery](foundations/imagery.md)
- [Voice and copy](foundations/voice-and-copy.md)
- [Accessibility](foundations/accessibility.md)
- [shadcn/ui vocabulary](foundations/shadcn.md)

**Components**: [inventory and status](components/README.md)

**Governance**
- [Findings and proposals](governance/findings.md): drift found in the code and what to do about it
- [Contributing](governance/contributing.md): how to add a component or token

**Living style guide**: `/design-system` on any deploy (not linked from the site, `noindex`). Source in `src/design-system/`.

## Using it day to day

- Reach for a **semantic** token first (`--color-text-secondary`), a component token second, and a primitive never, unless you are defining a new semantic token.
- New sizes must be even pixel values. New spacing must come from the scale.
- Copy follows [voice-and-copy.md](foundations/voice-and-copy.md): no em dashes, sentence case, and no figure that is not in the CV.
- Before changing an approved component, open a discussion. "Approved" means it is live on ashnidave.com today.
