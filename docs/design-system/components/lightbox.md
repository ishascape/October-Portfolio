# Lightbox

**Status:** Stable · **Source:** `Lightbox.tsx`, `Lightbox.css`

## Overview

Click any real screenshot in a case study to see it full size. One native `dialog`, no dependencies.

## Anatomy

1. **Scrim**: `::backdrop`, black at 70% (`color.surface.scrim`)
2. **Frame**: paper, `line.thin` ink, `radius.md`, `space.2` padding, max 96vw × 96vh
3. **Image**: fitted inside the frame
4. **Close**: secondary [button](button.md), centred under the image

## Behaviour

- Any `img` inside `.case` with non-empty alt text opens it, except images inside links, buttons or the next-study block. Those images show `cursor: zoom-in`.
- Closes on Close, Esc, or a click on the scrim.

## Accessibility

Native modal dialog: focus moves in, is trapped, and returns on close. Labelled "Enlarged image"; the image keeps its alt text.

## Do and don't

| Do | Don't |
|---|---|
| Rely on it for dense product screens | Add a caption overlay or carousel inside it |
