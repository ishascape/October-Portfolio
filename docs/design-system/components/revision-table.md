# Revision table

**Status:** Stable · **Source:** `About.tsx`, `About.css` (`.revisions`)

## Overview

Work history and education laid out like the revision schedule on a drawing: rev letter, date, description, by whom. Real tables, styled as hairline schedules.

## Anatomy

| Column | Style |
|---|---|
| Rev | `type.label` |
| Date | `type.label`, graphite |
| Role (row header) | 600 weight |
| Company | Body |

Header row: `type.label`, graphite. Rows: hairline `border.subtle` rules. Subhead above each table: label on a 1px ink rule.

## Variants

| Variant | Columns |
|---|---|
| Work history | Rev, Date, Role, Company |
| Education (`--education`) | Date, Course, Institution |

## States

| State | Spec |
|---|---|
| Default | Hairline rules |
| Row hover | `surface.accent-subtle` behind the row, 120ms |

## Responsive

| Width | Layout |
|---|---|
| < 600px | Header hidden; each row becomes a grid: rev letter in a 32px column spanning the row, date, role, company stacked. Education stacks date above course. |
| ≥ 600px | Real table rows with header |

## Accessibility

Visually hidden `caption` ("Work history, most recent first"), `th scope="col"` headers, role cell is `th scope="row"`.

## Do and don't

| Do | Don't |
|---|---|
| Most recent first | Mix work and education in one table |
| Match titles and dates to the CV exactly | Round dates or upgrade titles |
