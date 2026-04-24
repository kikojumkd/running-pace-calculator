# Pacen — Project Memory

## Project Overview

**Pacen** (pacen.app) — a mobile-first running pace calculator built as a personal tool and learning project.
Deployed on Vercel at pacen.app under a personal GitHub account.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit (Svelte 5) |
| Language | TypeScript |
| Styling | UnoCSS with Tailwind preset |
| Deployment | Vercel (Hobby plan, personal use) |
| CI/CD | GitHub push to main = auto-deploy |
| Package manager | pnpm |

---

## Svelte 5 Patterns — Always Use Runes

This project uses Svelte 5 Runes. Never use the old Svelte 4 reactive syntax.

```svelte
<!-- CORRECT -->
let distance = $state(10);
let pace = $derived(totalSeconds / distance);
$effect(() => { console.log(pace); });

<!-- WRONG - never use these -->
let distance = 10;
$: pace = totalSeconds / distance;
```

Always use `$state` for mutable values, `$derived` for computed values, and `$effect` for side effects.

---

## Project Structure

```
src/
  lib/
    components/       # Reusable Svelte components
    utils/            # Pure TS utility functions (pace math, conversions)
    types/            # Shared TypeScript interfaces
  routes/
    +page.svelte      # Main calculator page
    +layout.svelte    # Root layout
static/               # Static assets
```

Keep pace calculation logic in `src/lib/utils/pace.ts` as pure functions, not inside components.

---

## TypeScript Conventions

- Strict mode enabled — never use `any`
- All pace/time values stored in seconds internally, converted for display
- Use named interfaces for all data shapes, defined in `src/lib/types/`

```typescript
interface PaceResult {
  pacePerKm: number;   // seconds
  pacePerMile: number; // seconds
  totalSeconds: number;
}
```

---

## UnoCSS Conventions

Using the Tailwind preset — all Tailwind utility classes are available.
Mobile-first breakpoints: default = mobile, `md:` = tablet, `lg:` = desktop.
Touch targets must be minimum 44px height on interactive elements.

---

## Features (Current Scope)

- [x] Distance input with km/miles toggle
- [x] Time input split into hours, minutes, seconds
- [x] Pace per km output
- [x] Pace per mile output
- [x] Total time display
- [x] Pace zone breakdown (easy, aerobic, tempo, threshold, race)
- [x] Reset button
- [x] Mobile-first responsive layout

## Features (Planned)

- [ ] Race time predictor (given a pace, estimate finish time for common distances)
- [ ] Split calculator (even splits per km/mile)
- [ ] History of recent calculations (localStorage)
- [ ] PWA support for mobile install

---

## Pace Zone Reference

| Zone | Name | Pace per km |
|---|---|---|
| 1 | Easy / Recovery | > 6:30 |
| 2 | Aerobic base | 5:30 – 6:30 |
| 3 | Tempo | 4:45 – 5:30 |
| 4 | Threshold | 4:15 – 4:45 |
| 5 | Race / VO2 max | < 4:15 |

---

## Component Guidelines

- One component per file, filename matches component name in PascalCase
- Props typed explicitly, never rely on inference for public APIs
- No inline styles — use UnoCSS utility classes only
- All user-facing strings in English

---

## Git Conventions

- Branch naming: `feature/`, `fix/`, `chore/`
- Commit style: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- Main branch is `main` — direct pushes trigger Vercel deployment
- Always run `pnpm typecheck` before committing

---

## Environment

- Node 20+
- pnpm as package manager (not npm or yarn)
- Vite as dev server (via SvelteKit)
- Local dev: `pnpm dev`
- Build: `pnpm build`
- Type check: `pnpm typecheck`
