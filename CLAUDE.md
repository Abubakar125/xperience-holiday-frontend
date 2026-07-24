# Xperienz Holidays — Frontend

## IMPORTANT: Read ai-context/ before every task

At the start of every conversation, read the following files in order before doing any work:

1. `ai-context/overview.md` — client, brand, and business context
2. `ai-context/tech-stack.md` — Angular version, tooling, module strategy
3. `ai-context/design-system.md` — CSS tokens, shared classes, naming conventions, asset paths
4. `ai-context/project-structure.md` — folder layout, routing, component architecture
5. `ai-context/pages-sections.md` — every section on every page, current nav links, card data

Only after reading these files, proceed with the user's request. Use the context to make accurate decisions — e.g. correct class names, correct color tokens, correct file paths, correct component patterns.

## Key rules

- Always use existing CSS tokens (`--color-primary`, `--color-accent`, etc.) — never hardcode colors unless they are one-off overrides already present in the codebase.
- Follow BEM naming: `.block__element--modifier`.
- New components go in `src/app/shared/components/<name>/` (shared) or `src/app/<feature>/` (page-specific).
- New pages use lazy-loaded NgModules — follow the pattern in `app.routes.ts`.
- Tailwind utility classes are available but prefer the existing `xh-*` shared classes for headings, containers, and buttons to stay consistent.
- Asset files live in `public/icons/` and `public/images/` — reference them as `icons/<file>` or `images/<file>` (no `/public/` prefix).
- Currency is AED. Brand name is "Xperienz" (not "Xperience").
