# Pages & Sections

## Home Page (`/`) — `src/app/home/home.component.html`

Sections in order (top to bottom):

| # | Section | Class | Notes |
|---|---|---|---|
| 1 | Trust Bar | `.trust-bar` | Top strip, `#0056a6` bg, 4 trust items with icons — **hidden at ≤640px** |
| 2 | Header / Navigation | `.site-header` | Logo, nav links, "Plan My Holiday" CTA, hamburger — **nav collapses to hamburger at ≤1200px**; mobile drawer slides in from right |
| 3 | Hero | `.hero` | Blue bg (#0056a6), left: headline + search widget, right: image slider — **right slider has min-height at small screens** |
| 4 | Holiday Type Filter | `.holiday-filter` | 3×2 image card grid, **dynamic images from `GET /api/home-config`**, gradient overlay, white label bottom-left |
| 5 | Featured Holidays | `.featured-holidays` | `#fff7ef` bg, 4-card grid — **fully dynamic from `GET /api/holidays`**, 4 most recent active holidays, Book Now links to `/holidays-tour/:id` |
| 6a | Why Trust Us — heading | `.why-us-heading` | Blue bg `#0051a1`, single centered white heading, 160px tall |
| 6b | Why Trust Us — stats | `.why-us-counter` | Orange `#f9a147` bg, 4 stats with icons — identical design to `footer-counter` |
| 7 | Mauritius Made Effortless | `.air-mauritius` | White bg, left: heading + 5 checklist items + CTA, right: `mauritius-beach.png` rounded 40px |
| 8 | Corporate & MICE Solutions | `.mice` | `#faf8f4` bg, 4-card grid with SVG icons, no label/subtitle |
| 9 | Travel Stories | `.travel-stories` | `#0051a1` bg, 3 video cards with play buttons, slide dots, CTA button |
| 10 | Wall of Travellers Experience | `.wall-of-travellers` | `#f9a147` bg, **dynamic from `GET /api/testimonials`** — auto-sliding right-to-left, no arrows, no dots; 3 visible desktop / 2 tablet / 1 mobile |
| 11 | Awards & Accolades | `.awards` | White bg, 4-card grid |
| 12 | Strategic Partners | `.partners` | `#fff7ef` bg, chip groups (Tourism Boards + Hotels) |
| 13 | CTA Banner | `.cta-banner` | White section, SVG image with woman overlay |
| 14 | FAQ | `.faq` | White bg, `<details>` accordion — **dynamic from `GET /api/faqs`** via shared `<app-faq>` component; filters `isActive`, sorts by `order`, first item auto-opens |
| Footer | Footer | `app-footer` | Rendered by `FooterComponent` |

---

## Section 4 — Holiday Type Filter (`.holiday-filter`)

**Figma node:** 1:5247  
**Heading:** "Find Your Travel Style"  
**Subtitle:** "Curated experiences for every type of traveller."  
**Layout:** 3-column × 2-row CSS grid, 32px gap, 64px margin-top  
**Card class:** `.hf-card` — 300px height, `border-radius: 32px`, overflow hidden  
**Card anatomy:** `<img class="hf-card__img">` + `<div class="hf-card__overlay">` (gradient) + `<span class="hf-card__label">` (bottom-left, 24px Poppins bold white)  
**Gradient:** `linear-gradient(to top, rgba(0,0,0,0.7) → rgba(0,0,0,0.2) → transparent)`

**Data source:** `HomeConfigService.getHomeConfig()` → `travelStyleImages[i]` — fetched in `HomeComponent.ngOnInit()`. Images prepend `http://localhost:3000` if relative. Falls back to local image per slot if API slot is empty.

**Labels are hardcoded** (fixed order, never change):
| Index | Label | Fallback image |
|---|---|---|
| 0 | Family Holidays | `images/family-holidays.png` |
| 1 | Couples & Honeymoon | `images/couples-honeymoon.png` |
| 2 | Luxury Holidays | `images/luxury-holidays.png` |
| 3 | Adventure Tours | `images/adventure-tours.png` |
| 4 | Group Travel | `images/group-travel.png` |
| 5 | Cruises | `images/cruises.png` |

**Component property:** `travelStyleCards: { label, image }[]` — populated from API, falls back to `FALLBACK_TRAVEL_STYLE` constant.

---

## Section 5 — Featured Holidays (`.featured-holidays`)

**Figma nodes:** 2:279 (section bg), 2:285 (card)  
**Section bg:** `#fff7ef`  
**Layout:** 4-column grid, 24px gap, max-width 1440px  
**Card class:** `.fh-card` — white bg, `border: 1px solid #e8e8e8`, `border-radius: 20px`

**Data source:** `HolidayService.getHolidays()` — fetched in `HomeComponent.ngOnInit()`. Filters `isActive`, sorts by `id` descending (newest first), takes top 4. No static fallback cards — section is empty if no holidays exist.

**Card data mapping from holiday API:**
| Card field | Source |
|---|---|
| `images` | `h.heroImages` (prepend `http://localhost:3000`); fallback `['images/adventure-tours.png']` |
| `date` | `h.date` |
| `type` | `h.type \|\| h.badge \|\| 'Holiday'` |
| `title` | `h.title` |
| `location` | `(h.location \|\| h.destinationTitle \|\| '').toUpperCase()` |
| `duration` | `h.duration \|\| h.summary \|\| ''` |
| `price` | `'AED ' + Number(h.price).toLocaleString()` |

**Component property:** `fhCards` — typed array populated from API. `fhCardSlides` initialized to `[0, 0, 0, 0]` (one per card) after data loads; auto-cycles every 3s.

### Card anatomy
- **Image wrap** (`.fh-card__img-wrap`): 10px padding — image inside has `border-radius: 10px`, height 242px, `object-fit: cover`
- **Date badge** (`.fh-card__badge-date`): top-left inside image, white pill `border-radius: 100px`
- **Type badge** (`.fh-card__badge-type`): top-right inside image, white pill
- **Slide dots** (`.fh-card__dots`): one per hero image — gray `#f0f0f0` inactive, orange `#f9a147` active (wider pill)
- **Title** (`.fh-card__title`): 20px Poppins SemiBold `#110f0f`
- **Meta row** (`.fh-card__meta`): `icons/location.png` + uppercase location + `icons/arrows-both-sides.png` + duration text — all `#525252` 14px
- **Footer** (`.fh-card__footer`): left = orange `Book Now` link (`[routerLink]="['/holidays-tour', card.id]"`); right = per-person label + AED amount

### Icons used in cards
- `icons/location.png` — map pin (14×14px)
- `icons/arrows-both-sides.png` — double-headed separator arrow (22×8px)
- `icons/booking-arrow.png` — right arrow inside Book Now button (16×12px)

---

## Section 6a — Why Trust Us heading (`.why-us-heading`)

**Figma node:** 2:511  
**Background:** `#0051a1`  
**Height:** 160px (`min-height` via CSS)  
**Content:** Single centered white heading — "Why 100,000+ Travellers Trust Xperienz"  
**Font:** Poppins 700, `clamp(22px, 2.5vw, 36px)`

---

## Section 6b — Why Trust Us stats (`.why-us-counter`)

**Figma node:** 2:653 (top portion)  
**Background:** `#f9a147` (orange/amber)  
**Height:** 154px  
**Design:** Identical to `footer-counter` in `footer.component.html/.scss` — reuse same pattern  
**Layout:** 4 items centered with icon dividers (`icons/seperation.png`)

| Stat | Icon | Label |
|---|---|---|
| 30000+ | `icons/tours.png` | Tour Completed |
| 50+ | `icons/travel-experience.png` | Travel Experience |
| 17000+ | `icons/happy-traveler.png` | Happy Traveler |
| 98% | `icons/retention-rate.png` | Retention Rate |

---

## Section 7 — Mauritius Made Effortless (`.air-mauritius`)

**Figma node:** 2:691  
**Background:** `#ffffff`  
**Layout:** 50/50 grid, `gap: 64px`, `padding: 96px 80px`, max-width 1440px  
**Heading:** "Mauritius Made Effortless" — 48px Poppins 700, `#132238`  
**Checklist** (`.am-item`): orange circle `#f5a623` (24px, `border-radius: 50%`) + `icons/tick.png` (16×16px) + 18px Inter `#667085` text  
**CTA button** (`.air-mauritius__cta`): "Explore Mauritius" — amber `#f5a623`, `border-radius: 16px`, `height: 60px`  
**Right column photo:** `images/mauritius-beach.png` — `border-radius: 40px`, `height: 500px`, `box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`

### Checklist items
1. Exclusive Air Mauritius flight packages
2. Handpicked luxury resorts and hotels
3. Personalized itineraries and experiences
4. Seamless visa assistance
5. Expert local guidance

---

## Section 8 — Corporate & MICE Solutions (`.mice`)

**Figma node:** 2:750  
**Background:** `#faf8f4`  
**Layout:** 4-column grid, `gap: 24px`, `padding: 96px 80px`, max-width 1440px  
**Heading:** "Corporate & MICE Solutions" — Poppins 700, `clamp(28px, 3.3vw, 48px)`, `#132238`  
**No label or subtitle** — heading is the only text above the grid  
**Card class:** `.mice-card` — white bg, `border-radius: 32px`, `padding: 32px`, flex column

### Card anatomy
- **Icon** (`.mice-card__icon`): 48×48px SVG, `object-fit: contain`
- **Title** (`.mice-card__title`): 20px Poppins 700, `#132238`, `margin-top: 16px`
- **Description** (`.mice-card__desc`): 16px Inter 400, `#667085`, `margin-top: 8px`

### Card data

| Card | Title | Icon | Description |
|---|---|---|---|
| 1 | Incentive Travel | `icons/incentive-travel.svg` | Reward your top performers with carefully curated travel experiences |
| 2 | Conferences & Events | `icons/conference-event.svg` | End-to-end event planning for corporate conferences and summits |
| 3 | Corporate Retreats | `icons/corporates-retreats.svg` | Team-building retreats designed to inspire creativity |
| 4 | Group Travel | `icons/persons.svg` | Seamless group travel management for any size team |

---

## Section 9 — Travel Stories (`.travel-stories`)

**Figma node:** 2:1053  
**Background:** `#0051a1`  
**Layout:** overflow-hidden slider, `gap: 32px`, `padding: 96px 80px`, max-width 1440px  
**Heading:** "Travel Stories" — Poppins 700, `clamp(28px, 3.3vw, 48px)`, `#ffffff`  
**Subtitle:** 20px Inter, `rgba(255,255,255,0.8)`  
**Video cards** (`.ts-card`): `rgba(255,255,255,0.1)` bg, `border-radius: 32px`, play button (inline SVG circle+triangle, white)  
**Slide dots** (`.ts-dot`): inactive = `rgba(255,255,255,0.5)` 8px circle; active = `#f4a340` 28px pill  
**CTA heading** + **CTA button** (`.travel-stories__cta-btn`): `#f5a623` bg, `border-radius: 16px`, `height: 60px`

### Responsive slider behaviour
7 total cards, sliding 1 card at a time. `visibleTsCards` is computed in `HomeComponent` via `@HostListener('window:resize')`:

| Breakpoint | Cards visible | Card width | Card height | Dots count |
|---|---|---|---|---|
| ≥900px | 3 | `calc((100% - 64px) / 3)` | 500px | 5 |
| 640–899px | 2 | `calc((100% - 32px) / 2)` | 360px | 6 |
| ≤639px | 1 | `100%` | 280px | 7 |

Slider margin-left formula: `calc(-currentSlide * (100% + 32px) / visibleTsCards)` — always moves exactly 1 card per step regardless of visible count. Auto-advances every 4 s; timer restarts on dot click or resize.

---

## Section 10 — Wall of Travellers Experience (`.wall-of-travellers`)

**Figma node:** 201:20  
**Background:** `#f9a147`  
**Layout:** overflow-hidden slider (replaced static 3-col grid), max-width 1440px  
**Heading:** "Wall of Travellers Experience" — Poppins 600, `clamp(28px, 3vw, 40px)`, `#ffffff`  
**Subtitle:** 18px Inter 400, `#ffffff`  
**Card class:** `.wte-card` — white bg, `border-radius: 20px`, `padding: 35px`

**Data source:** `TestimonialService.getTestimonials()` — fetched in `HomeComponent.ngOnInit()`. Filters `isActive`. No dots, no arrows — auto-slides right-to-left every 3.5s, loops back to start.

**Slider state:**
| Property | Purpose |
|---|---|
| `testimonials` | Active testimonials from API |
| `wteSlide` | Current slide index |
| `visibleWte` | Responsive: 3 (≥1024px) / 2 (640–1023px) / 1 (<640px) |

**Slider track:** `.wte-slider__track` — `display: flex; gap: 24px; transition: transform 0.6s`. Transform formula: `translateX(calc(-wteSlide * (100% + 24px) / visibleWte))`. Each card width bound via `[style.flex]`.

### Card anatomy
- **Header** (`.wte-card__header`): flex row, `gap: 28px` — avatar + author info
- **Avatar** (`.wte-card__avatar`): static `icons/author-image.png`, 55×55px circle (avatar field not used)
- **Name** (`.wte-card__name`): `t.name` — 20px Poppins 700, `#110f0f`
- **Role** (`.wte-card__role`): `t.role || 'Traveler'` — 16px Inter 400, `#525252`
- **Stars** (`.wte-card__stars`): `starsArray(t.stars)` × `icons/rating-star.png` (20×20px)
- **Rating label** (`.wte-card__rating-label`): `t.ratingLabel` — 18px Poppins 600, `#110f0f`
- **Review** (`.wte-card__review`): `t.review` — 16px Poppins 500, `#525252`

---

---

## Destinations Listing Page (`/destinations`) — `src/app/destinations/destinations.component`

**Data source:** `DestinationService.getDestinations()` — `GET /api/destinations` (public, no auth). Filters to `isActive` only on the frontend.

**Service:** `src/app/shared/services/destination.service.ts` — `getDestinations()` + `getDestination(id)`.

### Sections

| Section | Class | Notes |
|---------|-------|-------|
| Hero banner | `.dest-hero` | Static `images/destination-hero.svg` bg, overlay, "Destinations" heading |
| Featured Destinations | `.featured-dest` | Region filter tabs + destination card grid — fully dynamic from API |
| Travel Inspirations | `.travel-inspiration` | Static 3-card blog-style section |
| FAQ | `app-faq` | Shared FAQ component |

### Featured Destinations section

**Filter tabs (`.featured-dest__tabs`):** Hardcoded region list — Africa, Asia, Europe, Middle East, North America, Oceania. Only tabs with at least one active destination are rendered (`availableTabs` getter). `activeRegion` auto-selects the first region that has data.

**States:** Loading spinner (`.dest-loading` + `.dest-spinner`), error (`.dest-error`), empty (`.dest-empty`).

**Card (`.dest-card`):** `<a [routerLink]="['/destinations', dest.id]">` — uses real `id` not name slug. Shows `dest.image` (fallback: `images/adventure-tours.png`) and `dest.name`.

### Component state (`DestinationsComponent`)
| Property | Type | Purpose |
|----------|------|---------|
| `allDestinations` | `any[]` | All active destinations from API |
| `activeRegion` | `string` | Currently selected region tab key |
| `loading` | `boolean` | Spinner control |
| `error` | `boolean` | Error state |
| `availableTabs` | getter → tab[] | Filters `filterTabs` to those with at least one matching destination |
| `filteredDestinations` | getter → `any[]` | `allDestinations` filtered by `activeRegion` |

---

## Destination Detail Page (`/destinations/:id`) — `src/app/destination-detail/destination-detail.component`

**Route module:** `src/app/destination-detail/destination-detail.module.ts` — lazy-loaded via `destinations/:id` in `app.routes.ts`.

**Data source:** `DestinationService.getDestination(+id)` called in `ngOnInit` with id from `ActivatedRoute`.

**States:** Loading spinner (`.dd-loading` + `.dd-spinner`) and error state (`.dd-error`). Main content wrapped in `@else` block after loading/error checks.

**Video URL handling:** Any YouTube URL format (watch, short, embed) is auto-converted to embed format via `toEmbedUrl()` before being passed to `DomSanitizer.bypassSecurityTrustResourceUrl()`.

### Sections (all dynamic from API)

| # | Section | Class | API fields | Notes |
|---|---------|-------|-----------|-------|
| 1 | Hero slider | `.dd-hero` | `heroImages[]` | Only renders if `heroImages.length > 0`; arrows hidden when ≤3 images fit |
| 2 | Destination Info | `.dd-info` | `name`, `tags[]`, `description`, `bestTimeSeasons` | Tags render as pills; "Best Time to Visit" CTA only shows if seasons exist; CTA scrolls to `#best-time` anchor |
| 3 | Popular Tourist Places | `.dd-places` | `touristPlaces[]` | Only renders if `places.length > 0`; arrows hidden when all fit in view; card width adapts to actual count (`effectivePlaceCount`) |
| 4 | Why Choose Only Us | `.dd-why` | Static | Always shown |
| 5 | Experience Gallery | `.dd-gallery` | `galleryImages[]` | Only renders when exactly 5 images present — masonry layout (sm/lg alternating heights) |
| 6 | Best Time to Visit | `.dd-visit` | `bestTimeSeasons[]` | Only renders if seasons exist; id=`"best-time"` anchor; 2-col grid; each card: image, seasonName, weather, highlights[], perfectFor pill |
| 7 | Video Banner | `.dd-video-banner` | `videoUrl` | Always rendered; if `safeVideoUrl` exists → `<iframe>` loads directly; if not → static placeholder image with play icon |
| 8 | FAQ | `.dd-faq-wrap` | Static | `<app-faq>` — always shown |

### Popular Tourist Places slider — adaptive arrows & card width
- `canScrollPlaces` getter: `places.length > visiblePlaces` — arrows only render when scrolling is needed
- `effectivePlaceCount` getter: `Math.min(visiblePlaces, places.length)` — card flex-basis bound dynamically so cards fill available width when count < visiblePlaces
- `visiblePlaces` responsive: 1 (≤480px) / 2 (≤640px) / 3 (≤900px) / 6 (desktop)

### Component state (`DestinationDetailComponent`)
| Property | Type | Purpose |
|----------|------|---------|
| `destination` | `any \| null` | Raw API response |
| `loading` | `boolean` | Spinner control |
| `error` | `boolean` | Error state |
| `heroSlides` | `string[]` | Mapped from `destination.heroImages` |
| `currentHeroSlide` | `number` | Hero slider index |
| `visibleHeroSlides` | `number` | Responsive: 1/2/3 |
| `places` | `{ name, image }[]` | Mapped from `destination.touristPlaces` |
| `currentPlacesSlide` | `number` | Tourist places slider index |
| `visiblePlaces` | `number` | Responsive: 1/2/3/6 |
| `safeVideoUrl` | `SafeResourceUrl \| null` | Sanitized embed URL (null if no video) |

---

## Experiences Listing Page (`/experiences`) — `src/app/experiences/experiences.component`

**Hero:** `.exp-hero` — uses `images/about-us-hero.svg` as background, overlay, centered heading "Experiences".

**Layout:** `.exp-listing` — two-column flex: left sidebar (`.exp-sidebar`) + right content area (`.exp-content`).

**Data flow:** `ngOnInit` → `ExperienceService.getExperiences()` → filters `isActive` → stores in `allExperiences` → `updateView()`.
`updateView()`: filter by `activeTourTypes` → sort by `sortMode` → slice by page → `toCard()` map → assign to `cards`.

**`toCard(e)` mapping:**
| CardItem field | Source |
|----------------|--------|
| `id` | `e.id` |
| `image` | `e.heroImages?.[0]` or `'images/tourist-place-1.svg'` |
| `badge` | `e.badge` or `e.type` or `'Experience'` |
| `badgeColor` | `''` |
| `title` | `e.title` |
| `location` | `(e.location \|\| e.destinationTitle \|\| '').toUpperCase()` |
| `duration` | `e.summary \|\| e.duration \|\| ''` |
| `price` | `` `AED ${Number(e.price).toLocaleString()}` `` |

**Service:** `ExperienceService` at `src/app/shared/services/experience.service.ts` — wraps `GET /api/experiences` and `GET /api/experiences/:id`.

### Component state (`ExperiencesComponent`)
| Property | Type | Purpose |
|----------|------|---------|
| `allExperiences` | `any[]` | Raw API data, filtered to `isActive` only |
| `cards` | `CardItem[]` | Current page's mapped cards |
| `loading` | `boolean` | Shows spinner |
| `totalItems` | `number` | Count after filtering (drives results label + pagination) |
| `PAGE_SIZE` | `6` | Cards per page |
| `currentPage` | `number` | Current page number |
| `pageNums` | getter → `number[]` | Array `[1..n]` based on totalItems / PAGE_SIZE |
| `sortMode` | `string` | 'Default' / 'Latest' / 'Price High' / 'Price Low' |
| `activeTourTypes` | `string[]` | Chip filter active selections |
| `expandedRegion` | `string` | Accordion state for destinations sidebar |

**Cards link to:** `[routerLink]="['/experiences', card.id]"` → Experience Detail Page.

---

## Experience Detail Page (`/experiences/:id`) — `src/app/experience-detail/experience-detail.component`

**Data source:** `ExperienceService.getExperience(id)` called in `ngOnInit` with id from `ActivatedRoute`.

**States:** Loading spinner (`.ed-state` + `.ed-spinner`) and error state shown while/if API call is pending/fails. Main content wrapped in `@if (!loading && !error && experience)`.

### Sections (mapped from API data)

| Section | Template area | API fields used |
|---------|--------------|----------------|
| Hero slider | `.ed-hero` | `heroImages[]` (fallback: `images/experice-details-hero.svg`); prev/next controls |
| Hero info overlay | `.ed-hero__content` | `destinationTitle \|\| title`, `summary \|\| duration`, `price` (formatted as `AED X,XXX`) |
| Trust bar | `.ed-trust` | Static — "No Booking Fee", "Best Price Ever" |
| About description | `.ed-about__desc` | `description` |
| Tour info grid | `.ed-about__grid` | 9 detail items (accommodation, meals, transportation, groupSize, language, animal, ageRange, season, category); arrays joined with `, `; nulls shown as `—` |
| Explore Locations | `.ed-locations` | `locations[]` → `{ image, name, days }` — arrows hidden when all fit; card width adapts via `effectiveLocationCount` |
| Highlights | `.ed-highlights` | `highlights[]` → bullet list |
| Tour Itinerary | `.ed-itinerary` | `itinerary[]` → destinations → days; day labels are sequential `Day-01`, `Day-02`… across ALL destinations |
| Package Features | `.ed-features` | `includeFeatures[]` (left column) + `excludeFeatures[]` (right column) |
| Additional Info | `.ed-additional` | `additionalInfo[]` |
| FAQ | `.faq` | Static hardcoded FAQ items |
| Customer Reviews | `.ed-reviews` | Static hardcoded review data |
| Booking card | `.ed-about__card` | `price` (formatted) |
| Relevant Packages | `.ed-relevant` | All active **holidays** from `HolidayService.getHolidays()`, mapped to card shape; cards link to `/holidays-tour/:id` |

### Component state (`ExperienceDetailComponent`)
| Property | Type | Purpose |
|----------|------|---------|
| `experience` | `any \| null` | Raw API response |
| `loading` | `boolean` | Spinner control |
| `error` | `boolean` | Error state |
| `heroSlides` | `string[]` | Mapped from `heroImages` |
| `currentHeroSlide` | `number` | Hero slider index |
| `priceDisplay` | `string` | `'AED X,XXX'` formatted |
| `details` | `{ icon, label, value }[]` | 9 tour-info items |
| `locations` | `{ image, name, days }[]` | Explore Locations |
| `highlights` | `string[]` | |
| `itinerary` | array | Each destination has `expanded` boolean + days have `day` label + `expanded` boolean |
| `includeFeatures` | `string[]` | |
| `excludeFeatures` | `string[]` | |
| `additionalInfo` | `string[]` | |
| `relevantPackages` | `any[]` | Active holidays mapped from `HolidayService` |
| `canScrollLocations` | getter → `boolean` | `locations.length > visibleLocations` — controls arrow visibility |
| `effectiveLocationCount` | getter → `number` | `Math.min(visibleLocations, locations.length)` — drives card width binding |

**Relevant Packages data flow:** `HolidayService.getHolidays()` → filter `isActive` → map to `{ id, title, badge, location, duration, price, image }` → displayed in slider → each card links to `/holidays-tour/:id`.

**Explore Locations adaptive slider:** Arrows rendered only when `canScrollLocations` is true. Each card has `[style.flex]` bound to `effectiveLocationCount` so cards fill the full width when count is less than `visibleLocations` (no empty gap, no stray right arrow).

---

## Holidays Listing Page (`/holidays-tour`) — `src/app/holidays-tour/holidays-tour.component`

**Hero:** `.exp-hero` — uses `images/about-us-hero.svg` as background, overlay, centered heading "Tours Deals".

**Layout:** `.exp-listing` — two-column flex: left sidebar (`.exp-sidebar`) + right content area (`.exp-content`).

### Left sidebar (`.exp-sidebar`)
Static/visual filter UI — not wired to API filtering yet (except Tour Type chips).

| Section | Class | Content |
|---------|-------|---------|
| Header | `.exp-sidebar__header` | "Filter" title + "Clear All" button → `clearAll()` |
| Destinations | `.exp-sidebar__section` | Accordion regions (Africa/Asia/Europe/Middle East/North America/Oceania); Africa expands by default showing 8 country sub-items with counts |
| Tour Type | `.exp-sidebar__chips` | Chip buttons for 8 types; active chip gets `.exp-sidebar__chip--active`; clicking calls `toggleTourType(type)` |
| Pricing | `.exp-sidebar__slider` | Visual range slider (decorative only — no functional filtering) |
| Experiences | `.exp-sidebar__list` | 6 experience filter items with counts + "See More +" button |
| Discount & Offer | `.exp-sidebar__list` | 2 offer items with counts |

### Right content area

**Sort/results bar (`.exp-bar`):**
- Shows `{{ totalItems }} Unforgettable Journey(s) Await!`
- Sort select: `[(ngModel)]="sortMode"` with options Default / Latest / Price High / Price Low → `onSortChange()`
- Grid/list view toggle buttons (visual only)

**States:**
- Loading: `.exp-state` with `.exp-spinner` (CSS keyframe animation)
- Empty: `.exp-state--empty` with "Clear Filters" button
- Cards: `.exp-cards` grid — shown when `!loading && totalItems > 0`

**Card (`.exp-card`):**
Each card is an `<a [routerLink]="['/holidays-tour', card.id]">`. Inner structure:
- `.exp-card__img-wrap` — image + badge (`.exp-card__badge`, `.exp-card__badge--orange`, `.exp-card__badge--green`)
- `.exp-card__body` — title, meta row (location icon + location, duration icon + duration), CTA row (Book Now link + price), divider, tags (Experience + Inclusion)

**Pagination (`.exp-pagination`):** Prev/Next buttons + numbered page buttons. Pages shown when `pageNums.length > 1`. Page numbers formatted as `01`, `02`… via `formatPage()`.

### Component state (`HolidaysTourComponent`)
| Property | Type | Purpose |
|----------|------|---------|
| `allHolidays` | `any[]` | Raw API data, filtered to `isActive` only |
| `cards` | `CardItem[]` | Current page's mapped cards |
| `loading` | `boolean` | Shows spinner |
| `totalItems` | `number` | Count after filtering (drives results label + pagination) |
| `PAGE_SIZE` | `6` | Cards per page |
| `currentPage` | `number` | Current page number |
| `pageNums` | getter → `number[]` | Array `[1..n]` based on totalItems / PAGE_SIZE |
| `sortMode` | `string` | 'Default' / 'Latest' / 'Price High' / 'Price Low' |
| `activeTourTypes` | `string[]` | Chip filter active selections |
| `expandedRegion` | `string` | Accordion state for destinations sidebar |

**Data flow:** `ngOnInit` → `HolidayService.getHolidays()` → filters `isActive` → stores in `allHolidays` → `updateView()`.
`updateView()`: filter by `activeTourTypes` → sort by `sortMode` → slice by page → `toCard()` map → assign to `cards`.

**`toCard(h)` mapping:**
| CardItem field | Source |
|----------------|--------|
| `id` | `h.id` |
| `image` | `h.heroImages?.[0]` or `'images/tourist-place-1.svg'` |
| `badge` | `h.badge` or `h.type` or `'Holiday'` |
| `badgeColor` | `''` (not set — can be extended) |
| `title` | `h.title` |
| `location` | `(h.location \|\| h.destinationTitle \|\| '').toUpperCase()` |
| `duration` | `h.summary \|\| h.duration \|\| ''` |
| `price` | `` `AED ${Number(h.price).toLocaleString()}` `` |

---

## Holiday Detail Page (`/holidays-tour/:id`) — `src/app/holidays-tour-detail/holidays-tour-detail.component`

**Data source:** `HolidayService.getHoliday(id)` called in `ngOnInit` with id from `ActivatedRoute`.

**States:** Loading spinner (`.htd-state` + `.htd-spinner`) and error state shown while/if API call is pending/fails. Main content wrapped in `@if (!loading && !error && holiday)`.

### Sections (mapped from API data)

| Section | Template area | API fields used |
|---------|--------------|----------------|
| Hero slider | `.htd-hero` | `heroImages[]` (fallback: `images/holidays-details-hero.svg`); prev/next controls |
| Hero info overlay | `.htd-hero__info` | `destinationTitle \|\| title`, `summary \|\| duration`, `price` (formatted as `AED X,XXX`) |
| About description | `.htd-about__desc` | `description` |
| Tour info grid | `.htd-details` | 9 detail items (accommodation, meals, transportation, groupSize, language, animal, ageRange, season, category); arrays joined with `, `; nulls shown as `—` |
| Explore Locations | `.htd-locations` | `locations[]` → `{ image, name, days }` |
| Highlights | `.htd-highlights` | `highlights[]` → bullet list |
| Tour Itinerary | `.htd-itinerary` | `itinerary[]` → destinations → days; day labels are sequential `Day-01`, `Day-02`… across ALL destinations |
| Package Features | `.htd-features` | `includeFeatures[]` (left column) + `excludeFeatures[]` (right column) |
| Additional Info | `.htd-addinfo` | `additionalInfo[]` |
| Booking card | `.htd-book` | `price`, `title` |
| Relevant Packages | `.htd-related` | All active holidays except current, mapped to card shape |

### Component state (`HolidaysTourDetailComponent`)
| Property | Type | Purpose |
|----------|------|---------|
| `holiday` | `any \| null` | Raw API response |
| `loading` | `boolean` | Spinner control |
| `error` | `boolean` | Error state |
| `heroSlides` | `string[]` | Mapped from `heroImages` |
| `currentSlide` | `number` | Hero slider index |
| `priceDisplay` | `string` | `'AED X,XXX'` formatted |
| `details` | `{ icon, label, value }[]` | 9 tour-info items |
| `locations` | `{ image, name, days }[]` | Explore Locations |
| `highlights` | `string[]` | |
| `itinerary` | array | Each destination has `expanded` boolean + days have `day` label + `expanded` boolean |
| `includeFeatures` | `string[]` | |
| `excludeFeatures` | `string[]` | |
| `additionalInfo` | `string[]` | |
| `relevantPackages` | `CardItem[]` | Other active holidays |
| `canScrollLocations` | getter → `boolean` | `locations.length > visibleLocations` — controls arrow visibility |
| `effectiveLocationCount` | getter → `number` | `Math.min(visibleLocations, locations.length)` — drives card width binding |

**Explore Locations adaptive slider:** Same pattern as Experience Detail — arrows hidden when all locations fit; card width adapts via `effectiveLocationCount`.

---

## Header nav links (current state — all `href="#"` placeholders)
Home (active, "New Tours" badge), Holidays, Experiences, Destinations, Cruises, MICE Travel Insurance, Offers, About Us, Contact Us

## Budget range pills (hero search)
AED 3,000–5,000 | AED 5,000–8,000 (active) | AED 8,000–12,000 | AED 12,000+

---

## Responsive breakpoint reference

### Header (`header.component.scss`)
| Breakpoint | Behaviour |
|---|---|
| ≥1201px | Full desktop nav visible, hamburger hidden |
| ≤1200px | Nav hidden, hamburger shown, mobile drawer available |
| ≤768px | "Plan My Holiday" CTA hidden |
| ≤640px | Trust bar hidden entirely |
| ≤480px | Trust bar was 2×2 grid (moot — hidden at 640px) |

### Mobile nav drawer (`header.component.html` + `.scss`)
- Triggered by hamburger button (`site-header__hamburger`)
- State managed in `HeaderComponent.menuOpen` (boolean)
- Slides in from right: `translateX(100%) → translateX(0)` with 0.35s cubic-bezier
- Backdrop: `rgba(0,0,0,0.45)`, click closes the drawer
- Closes on: backdrop click, any nav link click, Escape key (`@HostListener`)
- Body scroll locked (`document.body.style.overflow = 'hidden'`) while open
- Hamburger animates to × when open via `--open` modifier class

### Hero right-side image slider
- `min-height: 440px` at ≤1100px (when layout becomes single-column)
- `min-height: 300px` at ≤640px
- `object-fit: cover` on slide images

### Footer (`footer.component.scss`)
| Breakpoint | Behaviour |
|---|---|
| ≥1025px | Map background (`map.png`) visible; contact bar single row (4 items); footer body 4-col grid |
| ≤1024px | Map hidden; contact bar wraps to 2×2 (font 14px); footer body 2-col grid; social icons margin-top 28px |
| ≤640px | Contact bar single column; footer body single column; footer bottom bar stacked (payment label hidden) |

### Footer contact bar font sizes
- Desktop: 18px label + value
- ≤1024px: 14px label + value
- No change below (14px carries through)
