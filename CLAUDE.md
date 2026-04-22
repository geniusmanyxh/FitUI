# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the repo root using `pnpm`.

```bash
# Development
pnpm ui:dev          # Start component library dev server (port 8444)
pnpm docs:dev        # Start documentation site
pnpm demo:dev        # Start test/demo app (packages/fit-test)

# Build
pnpm ui:build        # Build component library (ESM + CJS into packages/fit-ui/dist/)
pnpm docs:build      # Build documentation site

# Quality
pnpm ui:test         # Run component tests (vitest run)
pnpm ui:lint         # Lint source with oxlint

# Commits
pnpm commit          # Interactive conventional commit via git-cz
```

To run a single test file:
```bash
cd packages/fit-ui && pnpm vitest run src/FButton/__tests__/button.test.ts
```

## Monorepo Structure

```
FitUI/
├── packages/
│   ├── fit-ui/       # Component library (published as @geniusmanyxh/fit-ui)
│   ├── fit-docs/     # VitePress documentation site
│   └── fit-test/     # Integration/demo app
├── docs/             # Developer specs (COMPONENT_DEVELOPMENT_SPEC.md)
└── scripts/          # preinstall guard (enforces pnpm)
```

## Component Library Architecture (`packages/fit-ui/`)

**Entry points** (all under `src/`):
- `entry.ts` — default export: installs all components + all styles. Consumer import: `import FitUI from '@geniusmanyxh/fit-ui'`
- `full.ts` — same as entry but separate bundle
- `components.ts` — named re-exports of every component; used for tree-shaking

**Path aliases** (configured in `vite.config.ts`):
- `@` → `src/`
- `@utils` → `utils/`
- `@enums` → `enums/`
- `@ftypes` → `ftypes/`
- `@fstyles` → `styles/`

**Build output** (`dist/`): dual format — `dist/es/` (ESM, preserveModules) and `dist/lib/` (CJS, preserveModules). Types emitted by `vite-plugin-dts`. `vue`, `tj-jstools`, and `shiki` are externalized.

**Tests**: Vitest with `happy-dom` environment. Each component has `__tests__/componentname.test.ts`.

## Adding or Modifying a Component

Full spec: `docs/COMPONENT_DEVELOPMENT_SPEC.md`. Key rules:

1. **Directory name**: `F` + PascalCase (e.g. `FButton`).

2. **`index.ts`** — wrap with `withInstall`, only `export default`:
   ```ts
   import comp from './index.vue'
   import { withInstall } from '@utils/install'
   export default withInstall(comp)
   ```

3. **`index.vue`** — first line inside `<script setup>` (after JSDoc):
   ```ts
   defineOptions({ name: 'FComponentName', inheritAttrs: false })
   ```
   Import styles via `@use './style/index' as *` — no inline `<style>` blocks.

4. **`style/`** — `index.scss` uses `@use './_componentname' as *`. Use `@use`, never `@import`.

5. **Registration** — add to three places in `src/`:
   - `components.ts` (named export)
   - `entry.ts` (import + style import + components array)
   - `full.ts` (same)

6. **Props**: optional props must have defaults (`withDefaults` or computed). Unique IDs must be a plain variable, not a `ref` that regenerates on each render.

## Commit Convention

Enforced by Husky + Commitlint (conventional-commits):
`feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore`

Use `pnpm commit` for the interactive prompt.
