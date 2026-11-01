# Title sheet (footer)

**Status:** Needs decision · **Source:** `Footer.tsx`, `KeyPlan.tsx`, `Footer.css`

## Overview

The home page ends the way a drawing set starts: with a title sheet. A key plan of Sydney showing where Ashni is based, a legend, credits, contact, page index, and a sign-off box with her signature. It's printed as a blueprint.

## Anatomy

1. **Sheet**: full bleed, blueprint theme, 16px white grid at 7%
2. **Frame**: `line.building` border, kept to page margins
3. **Key plan**: map with water hatch, suburb boundaries, 20m contours, north point, scale bar, pin on Zetland; legend and data credit underneath
4. **Legend rows**: field name over value: Credits, Role, Availability, Email, LinkedIn ↗, Pages (index incl. "Hey AI, read me ↗")
5. **Sign-off**: "Signed off by" with "Ashni" in Caveat and a drawn smile; "Ashni Dave [Project Lead]"
6. **Meta strip**: Date 2026 · Rev E · Scale Responsive NTS · Sheet Title sheet

## Variants

| Variant | Where |
|---|---|
| Title sheet (blueprint) | Home page |
| Sign-off bar (plain) | Case studies: only the "Hey AI, read me ↗" link |

## Theming

The blueprint is applied by overriding the primitives inside `.titlesheet--blueprint`: `--paper` and `--paper-shade` become `#1d4e89`, `--ink` becomes `#f2f6fb`, `--graphite` and `--rule` become white at 75% and 45%, `--marker` becomes white. Every component inside inherits it. This is the reference implementation for themes ([colour](../foundations/colour.md#themes)).

## States

Links are [quiet links](link.md): inherit colour, marker (white) on hover, system focus ring.

## Accessibility

- `footer` landmark; page index is a `nav aria-label="Page index"`.
- The signature is `aria-hidden` (the typed name follows it).
- Graphite at 75% on blueprint passes AA (5.1 : 1).

## Open question

Field names are 10px, uppercase, 0.08em tracking. That contradicts the standing rule against small all-caps labels, but it is the convention on real title blocks and Ashni approved the footer as is. Recorded in [findings](../governance/findings.md); no change until she decides.

## Tokens

| Token | Value |
|---|---|
| `title-sheet.theme` | `[data-theme='blueprint']` equivalent |
| `title-sheet.grid` | 16px, white at 7% |
| `title-sheet.frame` | `line.building` |
| `title-sheet.field` | `type.micro` |
