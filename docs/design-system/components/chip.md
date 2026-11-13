# Chip

**Status:** Stable · **Source:** `Work.css` (`.card__outcome`, `.card__tags`)

## Overview

Small, non-interactive labels that classify. Two variants, never clickable.

## Variants

| Variant | Spec | Use |
|---|---|---|
| **Outcome badge** | `radius.pill`, `surface.accent-subtle`, marker text, 600 weight, `type.label`, 2px 8px padding | One per case card: the lever it moves (Conversion, Supply growth, Activation) |
| **Chip (tag)** | `radius.md`, `line.thin` `border.subtle`, graphite text, `type.label`, 2px 8px padding | Three per card by default: sector, model, skill or a scan keyword from the case study |

## The badge rule

A chip never repeats the card's badge (Ashni, 13 Nov 2026). The badge already says which lever the work moved, so a chip with the same word wastes a slot. Use another skill or a keyword someone scanning for it would look for. `Work.tsx` also filters out any chip that matches the badge, as a safety net.

| Card | Badge | Chips on the card |
|---|---|---|
| Venue Finder | Conversion | Marketplace, AI recommendation engine, Lead quality |
| HostHQ | Supply growth | B2B SaaS, Information architecture, Platform consolidation |
| TreeAssist | Activation | Education, AI smart matching, Progressive disclosure, Subscription, Experimentation (all five, `cardTagCount: 5`) |

The live list is in `src/data/content.ts`; the style guide renders it from there.

## States

Static. Chips have no hover or focus because they do nothing. If a chip ever becomes a filter, it needs a full button state set first.

## Accessibility

Tags sit in a `ul` labelled "Tags". Text, not colour, carries the meaning.

## Do and don't

| Do | Don't |
|---|---|
| One outcome badge per card | Use the pill style for chips |
| Pick chips that add a new keyword | Repeat the badge in a chip |
| Keep tags to one or two words | Make chips look clickable (no hover, no pointer) |
