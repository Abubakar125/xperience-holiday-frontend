# Tech Stack

## Framework
- **Angular 19.2** (standalone components preferred)
- **TypeScript 5.7**
- **RxJS 7.8**

## Styling
- **Tailwind CSS 3.x** — utility classes available (`text-center`, `mt-3`, etc.)
- **SCSS** — component-level `.scss` files per component
- **Global styles** at `src/styles.scss` — defines CSS custom properties and shared utility classes

## Tailwind CSS setup (important)
- Entry point: `src/tailwind.css` (plain CSS, NOT SCSS) — loaded first in `angular.json` styles array
- Uses `@tailwind base/components/utilities` directives (v3 syntax — NOT `@import "tailwindcss"`)
- `postcss.config.js` at root uses `tailwindcss: {}` and `autoprefixer: {}`
- Must stay on Tailwind v3. Reason: Angular 19's esbuild builder intercepts CSS `@import` statements before PostCSS runs, so Tailwind v4's `@import "tailwindcss"` syntax fails. The v3 `@tailwind` at-rules are unknown to esbuild and safely pass through to PostCSS.

## Dev tools
- `ng serve` → dev server (port 4200 by default)
- `ng build` → production build
- `ng test` → Karma/Jasmine unit tests

## Module strategy
- Root app uses `standalone: true` (`AppComponent`)
- Feature areas use NgModule + lazy loading (e.g. `HomeModule` loaded at `/`)
- Components inside feature modules are also `standalone: true`

## Key config files
- `tailwind.config.js` — custom colors & font
- `src/styles.scss` — global CSS tokens and utility classes
- `src/app/app.routes.ts` — top-level routes
- `angular.json` — build configuration
