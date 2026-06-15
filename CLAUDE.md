# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm start          # dev server at localhost:4200
pnpm build          # production SSR build → dist/
pnpm test           # Vitest unit tests (watch mode)
pnpm run serve:ssr:fp-challenge-angular  # run built SSR server
```

Single test file:
```bash
npx ng test --include="src/app/shared/pipes/my.pipe.spec.ts"
```

## Architecture

Angular 21 SSR app (Express v5). **Package manager: pnpm**.

### Folder layout

```
src/app/
  core/       – DI tokens, interceptors, services, state, analytics
  layout/     – Shell components (main-layout wraps header + router-outlet + footer)
  shared/     – Components, directives, pipes, models, utils (all reusable)
  features/   – Lazy-loaded page-level features (cart, product-list, product-detail)
```

### Path aliases (tsconfig.json)

| Alias | Resolves to |
|-------|-------------|
| `@core/*` | `src/app/core/*` |
| `@shared/*` | `src/app/shared/*` |
| `@features/*` | `src/app/features/*` |
| `@layout/*` | `src/app/layout/*` |
| `@api/*` | `src/app/api/*` |

Always import via alias, never via relative `../../`.

### SSR split

Two separate `ApplicationConfig` objects:
- `app.config.ts` — browser providers (router, HTTP client with `withFetch()`, hydration)
- `app.config.server.ts` — merges browser config + `provideServerRendering()`

`src/server.ts` is the Express entry point.  
`src/app/app.routes.server.ts` defines SSR-specific rendering modes.

### Content injection pattern

Runtime data (e.g. footer content) flows through typed `InjectionToken`s defined in `core/tokens/`, provided in `app.config.ts` with `useValue`, and consumed via `inject()` in components. Add new injectable data this way — not via component inputs from the root.

### Styling

Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`). Design tokens are layered SCSS partials:

```
src/styles/tokens/
  primitives.scss  – raw values (colors, spacing, etc.)
  semantic.scss    – purpose-mapped tokens (--color-primary, etc.)
  theme.scss       – theme variants
```

Import order in `styles.scss`: `tailwindcss` → `primitives` → `semantic` → `theme`.

### Route structure

All routes are lazy-loaded. `MainLayoutComponent` is the shell (header + footer + `<router-outlet>`). Feature routes are children of that shell. Routes without layout (checkout, 404) load directly at the root level.
