# Chip

**Status:** Stable · **Source:** `Work.css` (`.card__outcome`, `.card__tags`)

## Overview

Small, non-interactive labels that classify. Two variants, never clickable.

## Variants

| Variant | Spec | Use |
|---|---|---|
| **Outcome pill** | `radius.pill`, `surface.accent-subtle`, marker text, 600 weight, `type.label`, 2px 8px padding | One per case card: the lever it moves |
| **Tag** | `radius.md`, `line.thin` `border.subtle`, graphite text, `type.label`, 2px 8px padding | Up to three per card: sector, model, skill |

## States

Static. Chips have no hover or focus because they do nothing. If a chip ever becomes a filter, it needs a full button state set first.

## Accessibility

Tags sit in a `ul` labelled "Tags". Text, not colour, carries the meaning.

## Do and don't

| Do | Don't |
|---|---|
| One outcome pill per card | Use the pill style for tags |
| Keep tags to one or two words | Make chips look clickable (no hover, no pointer) |
