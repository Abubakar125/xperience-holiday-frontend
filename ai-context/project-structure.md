# Project Structure

## Root
```
frontend/
├── ai-context/          ← project context for AI assistance
├── src/
│   ├── app/
│   │   ├── app.component.ts/.html/.scss   ← root shell (just <router-outlet>)
│   │   ├── app.routes.ts                  ← top-level routes
│   │   ├── app.config.ts                  ← Angular app config (provideRouter, etc.)
│   │   ├── home/                          ← Home feature module (lazy-loaded at '/')
│   │   │   ├── home.module.ts
│   │   │   ├── home.component.ts/.html/.scss
│   │   └── shared/
│   │       └── components/
│   │           ├── header/
│   │           │   ├── header.component.ts/.html/.scss
│   │           └── footer/
│   │               ├── footer.component.ts/.html/.scss
│   ├── styles.scss      ← global styles & design tokens
│   └── ...
├── public/              ← static assets (icons/, images/)
├── tailwind.config.js
├── angular.json
└── CLAUDE.md            ← AI instructions (read ai-context/)
```

## Routing
| Route | Module | Notes |
|---|---|---|
| `/` | `HomeModule` (lazy) | Loads `HomeComponent` |

## Component architecture
- `AppComponent` — standalone, just wraps `<router-outlet>`
- `HomeComponent` — standalone, imports `HeaderComponent` + `FooterComponent`
- `HeaderComponent` — standalone, shared
- `FooterComponent` — standalone, shared

## Adding new pages (pattern to follow)
1. Create `src/app/<page>/<page>.module.ts` + `<page>.component.ts/.html/.scss`
2. Add lazy route in `app.routes.ts`:
   ```ts
   { path: '<path>', loadChildren: () => import('./<page>/<page>.module').then(m => m.<Page>Module) }
   ```
3. The module registers `RouterModule.forChild([{ path: '', component: <Page>Component }])`
