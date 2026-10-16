# Ashni Dave · Portfolio 2.0

Homepage MVP for ashnidave.com, built with React, TypeScript and Vite. Direction: "The Masterplan" (see the project notes).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build
```

## Where things live

- `src/styles/tokens.css`: colour, type, spacing, pen weights and motion tokens. Change values here, not in components.
- `src/data/content.ts`: all copy, case studies and figures. Only use metrics confirmed by Ashni or stated in the CV.
- `src/components/`: one folder-free component per section, each with its own CSS file.
  - `SitePlan.tsx`: the hero drawing. Buildings are keyboard-focusable; each has existing (dashed) and proposed (solid) art.
  - `DetailSheet.tsx`: native `<dialog>`, bottom sheet on mobile, side sheet from 600px.

## Settings to fill in

`contact.linkedin` and `contact.resume` in `src/data/content.ts` are empty, so those links are hidden until set.

## Deploy

Import the repo in Vercel. `vercel.json` sets the Vite build; no environment variables are needed.
