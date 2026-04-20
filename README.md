# Running Pace Calculator

A mobile-first running pace calculator built with SvelteKit (Svelte 5), TypeScript, and UnoCSS.

## Features

- Distance input with km / miles toggle
- Time input split into hours, minutes, seconds
- Live pace per km and per mile (Svelte 5 `$derived`)
- Pace zone breakdown (Easy → Race / VO2 Max) with active zone highlight
- Reset button
- Responsive, touch-friendly layout (min 44px touch targets)

## Tech stack

| | |
|---|---|
| Framework | SvelteKit 2 + Svelte 5 |
| Language | TypeScript (strict) |
| Styling | UnoCSS with Tailwind preset |
| Deployment | Vercel (`@sveltejs/adapter-vercel`) |

## Local setup

Requires **Node 20+** and **pnpm**.

```bash
pnpm install
pnpm dev
```

The first run generates `.svelte-kit/` (required by `tsconfig.json`). Type checking:

```bash
pnpm typecheck
```

Build for production:

```bash
pnpm build
pnpm preview   # preview the production build locally
```

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npx vercel
```

Follow the prompts. Vercel auto-detects SvelteKit and uses `@sveltejs/adapter-vercel`.

### Option B — Git integration (recommended)

1. Push this repo to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Leave the default build settings — Vercel handles everything.
4. Every push to `main` triggers an automatic deploy.

No environment variables are required for the basic calculator.

## Project structure

```
src/
  lib/
    components/     # DistanceInput, TimeInput, PaceDisplay, PaceZones
    utils/pace.ts   # Pure pace math (calculatePace, formatPace, zones)
    types/index.ts  # Shared TypeScript interfaces
  routes/
    +layout.svelte  # UnoCSS import
    +page.svelte    # Main calculator page
```
