# shadcn/ui vocabulary

**Decision (Ashni, 6 Nov 2026):** use shadcn/ui as a loose foundation, not wholesale. We take its token names and, where behaviour is hard to get right, Radix primitives. We do not take Tailwind or its default styling, because the site's look (paper, marker blue, hand lettering, the moonlit dark mode) comes from our own CSS.

## What is in place

`src/styles/shadcn.css` aliases shadcn's names to the existing primitives in `tokens.css`. It changes nothing visually and, like `semantic.css`, is only imported by the `/design-system` style guide for now.

| shadcn name | Aliases | Notes |
|---|---|---|
| `--background` / `--foreground` | `--surface` / `--ink` | Page canvas and body text |
| `--card` / `--card-foreground` | `--paper` / `--ink` | White card in light, raised blue-black in dark |
| `--popover` / `--popover-foreground` | `--paper` / `--ink` | |
| `--primary` / `--primary-foreground` | `--ink` / `--paper` | Matches the solid button |
| `--secondary` / `--secondary-foreground` | `--paper-shade` / `--ink` | |
| `--muted` / `--muted-foreground` | `--paper-shade` / `--graphite` | |
| `--accent` / `--accent-foreground` | `--marker-wash` / `--marker` | |
| `--border`, `--input` | `--rule` | Hairline, decorative |
| `--ring` | `--marker` | Focus ring |
| `--radius` | `--radius` (16px) | Same name already |
| `--destructive` | not mapped | The site has no error colour; add one when a component needs it |

Because these are aliases, light, dark (system or toggle) and the blueprint footer all work with no extra rules.

## Contrast check (6 Nov 2026)

Computed from the token values in both themes.

| Pair | Light | Dark | Needs |
|---|---|---|---|
| foreground on background | 15.8 | 16.6 | 4.5 |
| foreground on card | 17.2 | 15.1 | 4.5 |
| primary-foreground on primary | 17.2 | 15.1 | 4.5 |
| muted-foreground on muted | 5.6 | 8.2 | 4.5 |
| muted-foreground on background | 5.9 | 9.9 | 4.5 |
| accent-foreground on accent | 5.2 | 6.0 | 4.5 |
| ring on background | 5.6 | 8.8 | 3 |
| border on background | 1.3 | 1.5 | decorative only |

Every text pair passes AA. Borders are quiet hairlines as on the live site; anything that relies on a border alone to show a control (an input) should also change fill or add the focus ring.

## Rules for adding components

1. Check the component does not already exist in `components/`. Extend ours first.
2. If it needs real behaviour (dialog, tabs, tooltip, popover, select), use the Radix primitive unstyled and style it with our CSS and these tokens. Do not add Tailwind, `tailwind-merge`, `class-variance-authority` or the shadcn CLI.
3. Take colours only from these names or from `semantic.css`. No hard-coded values.
4. Only even font sizes, no em dashes in copy, focus ring from `--focus-ring`.
5. Add the component's doc page to `components/` and a section to the style guide.

## Not adopted, and why

- **Tailwind and the shadcn CLI:** would restyle the whole site and add a build step for little gain on a portfolio.
- **shadcn default look:** neutral grey and sharp type would erase the paper and marker character.
- **Its full component set:** the site uses a handful of components; copying unused ones adds weight.
