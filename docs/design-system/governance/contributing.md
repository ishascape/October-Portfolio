# Contributing

## Adding or changing a component

1. **Discuss first.** Approved components (anything live) aren't redesigned without a conversation. Describe the change and why.
2. **Start from the system.** Use semantic tokens, the spacing scale, even type sizes, existing pen weights and motion tokens. If something new is genuinely needed, add a token, don't hard-code.
3. **Design every state** in the table: default, hover, focus, active, disabled, loading (or say why it doesn't apply).
4. **Check accessibility** against the [checklist](../foundations/accessibility.md#checklist-for-anything-new).
5. **Write the doc** in `components/` using the template (Overview, Anatomy, Variants, Sizes, States, Responsive, Accessibility, Content, Do and don't, Tokens, Source) and add it to the [inventory](../components/README.md).
6. **Add it to the style guide** (`src/design-system/StyleGuide.tsx`) with its states.
7. **Edit only what changed.** Never regenerate a page or a whole file to make a small change.

## Adding a token

- Primitive: only when a genuinely new raw value is needed (a new paper, a new size step). Add to `tokens.css`, `tokens.json` and the table in `tokens.md`.
- Semantic: when a new *role* appears. Add to `semantic.css`, `tokens.json`, `tokens.md`.
- Component: when one component needs to be tuned or themed alone. Document it on the component page.

Naming: `{category}.{concept}.{variant}.{state}` in docs, kebab-case in CSS. Name by purpose (`color.border.focus`), never by value (`color.blue`).

## Shipping

- Batch changes into as few pushes as possible (the Vercel free plan allows 100 deploys a day, and each push builds two previews).
- One draft PR per piece of work. Nothing merges to `main` without Ashni's approval; every merge auto-deploys to ashnidave.com.
- Run `npm run build` before pushing.

## Versioning

The design system versions with the site. Record notable changes in the PR description. If the system grows a changelog, put it here.
