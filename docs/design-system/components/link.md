# Text link

**Status:** Stable · **Source:** `global.css` (`a { color: inherit }`), `AiPrinciples.css`, `CaseStudy.css`, `Footer.css`, `Nav.css`

## Overview

Links inherit their colour by default. There is no single "link blue". Each context picks one of three styles.

## Variants

| Variant | Where | Rest | Hover |
|---|---|---|---|
| **Accent link** | AI principles ("Venue Finder edge cases →") | 14px, marker, underline in marker wash, 3px offset | Underline turns solid marker |
| **Quiet link** | Case study sheet bar, footer title sheet, footer AI link | Inherits colour, no underline | Marker colour |
| **Dimension link** | Main nav | No underline | Marker dimension line draws in under it (see [nav](nav.md)) |
| **Stretched link** | Case card title | No underline; `::after` covers the card | Card hover state |

## States

| State | Accent | Quiet |
|---|---|---|
| Default | Marker text, wash underline | Inherited |
| Hover | Solid underline | Marker |
| Focus visible | System ring | System ring |
| Visited | Same as default (intentional: it's a portfolio, not a document) | Same |

## Accessibility

- Link text must make sense on its own. Name the destination: "TreeAssist descope dungeon →".
- Quiet links rely on context (they sit in nav-like lists). Don't use the quiet style inside running body text, where a link must be distinguishable by more than colour.
- Direction glyphs follow the [arrow rules](../foundations/iconography.md#text-glyphs-as-arrows).

## Do and don't

| Do | Don't |
|---|---|
| Use the accent link to point from a claim to its evidence | Put several accent links in one paragraph |
| Keep body copy free of links where possible | Use a quiet link inside a paragraph |
