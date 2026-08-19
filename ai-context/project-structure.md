# Project Structure

## Root
```
frontend/
├── ai-context/          ← project context for AI assistance
├── src/
│   ├── app/
│   │   ├── app.component.ts/.html/.scss   ← root shell (just <router-outlet>)
│   │   ├── app.routes.ts                  ← top-level routes
│   │   ├── app.config.ts                  ← Angular app config (provideRouter, provideHttpClient, etc.)
│   │   ├── home/                          ← Home feature module (lazy-loaded at '/')
│   │   │   ├── home.module.ts
│   │   │   ├── home.component.ts/.html/.scss
│   │   ├── holidays-tour/                 ← Holidays listing page (lazy-loaded at '/holidays-tour')
│   │   │   ├── holidays-tour.component.ts/.html/.scss
│   │   ├── holidays-tour-detail/          ← Holiday detail page (lazy-loaded at '/holidays-tour/:id')
│   │   │   ├── holidays-tour-detail.component.ts/.html/.scss
│   │   └── shared/
│   │       ├── components/
│   │       │   ├── header/
│   │       │   │   ├── header.component.ts/.html/.scss
│   │       │   └── footer/
│   │       │       ├── footer.component.ts/.html/.scss
│   │       └── services/
│   │           └── holiday.service.ts     ← HTTP calls to /api/holidays
│   ├── styles.scss      ← global styles & design tokens
│   └── ...
├── public/              ← static assets (icons/, images/)
├── tailwind.config.js
├── angular.json
└── CLAUDE.md            ← AI instructions (read ai-context/)
```

## Routing
| Route | Component | Notes |
|---|---|---|
| `/` | `HomeModule` (lazy) | Loads `HomeComponent` |
| `/holidays-tour` | `HolidaysTourComponent` (lazy standalone) | Listings page — client-side filter/sort/pagination |
| `/holidays-tour/:id` | `HolidaysTourDetailComponent` (lazy standalone) | Detail page — full holiday package |

## Component architecture
- `AppComponent` — standalone, just wraps `<router-outlet>`
- `HomeComponent` — standalone, imports `HeaderComponent` + `FooterComponent`
- `HolidaysTourComponent` — standalone, imports `HeaderComponent`, `FooterComponent`, `RouterLink`, `FormsModule`
- `HolidaysTourDetailComponent` — standalone, imports `HeaderComponent`, `FooterComponent`, `RouterLink`
- `HeaderComponent` — standalone, shared
- `FooterComponent` — standalone, shared

## HttpClient
`provideHttpClient()` is registered in `app.config.ts`. All HTTP services inject `HttpClient` via constructor DI.

## HolidayService (`src/app/shared/services/holiday.service.ts`)
```typescript
@Injectable({ providedIn: 'root' })
export class HolidayService {
  private readonly API = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  getHoliday(id: number)  { return this.http.get<any>(`${this.API}/holidays/${id}`); }
  getHolidays()           { return this.http.get<any[]>(`${this.API}/holidays`); }
}
```
Note: `GET /api/holidays` and `GET /api/holidays/:id` are public — no auth token needed.

### HeaderComponent state
| Property | Type | Purpose |
|---|---|---|
| `menuOpen` | `boolean` | Controls mobile drawer visibility |
| `toggleMenu()` | method | Flips `menuOpen`, locks/unlocks body scroll |
| `closeMenu()` | method | Closes drawer, restores scroll |
| `onEscape()` | `@HostListener('document:keydown.escape')` | Closes drawer on Esc |

### HomeComponent state (sliders)
| Property | Type | Purpose |
|---|---|---|
| `currentSlide` | `number` | Hero image slider current index |
| `heroSlides` | `string[]` | 7 image paths for hero slider |
| `fhCards` | object[] | 4 featured holiday cards (each with `images[]`) |
| `fhCardSlides` | `number[]` | Per-card current slide index (4 items) |
| `travelStoryCards` | `number[]` | `[0..6]` — 7 travel story card placeholders |
| `visibleTsCards` | `number` | 1 / 2 / 3 depending on `window.innerWidth` — updated by `@HostListener('window:resize')` |
| `currentTsSlide` | `number` | Travel Stories slider current position |
| `travelStoryDots` | getter → `number[]` | Length = `7 - visibleTsCards + 1`; recomputed reactively |

All sliders auto-advance on `setInterval` (4 s hero, 4 s travel stories, 3 s featured holiday cards). Timers are cleared in `ngOnDestroy`.

## Adding new pages (pattern to follow)

### Option A — NgModule (legacy, used by Home)
1. Create `src/app/<page>/<page>.module.ts` + `<page>.component.ts/.html/.scss`
2. Add lazy route in `app.routes.ts`:
   ```ts
   { path: '<path>', loadChildren: () => import('./<page>/<page>.module').then(m => m.<Page>Module) }
   ```
3. The module registers `RouterModule.forChild([{ path: '', component: <Page>Component }])`

### Option B — Standalone component (preferred for new pages)
1. Create `src/app/<page>/<page>.component.ts/.html/.scss`
2. Add lazy route in `app.routes.ts`:
   ```ts
   { path: '<path>', loadComponent: () => import('./<page>/<page>.component').then(m => m.<Page>Component) }
   ```
3. Component declares `standalone: true` and lists its own `imports` array.
4. `HolidaysTourComponent` and `HolidaysTourDetailComponent` follow this pattern.
