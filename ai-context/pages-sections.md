# Pages & Sections

## Home Page (`/`) — `src/app/home/home.component.html`

Sections in order (top to bottom):

| # | Section | Class | Notes |
|---|---|---|---|
| 1 | Trust Bar | `.trust-bar` | Top strip, `#0056a6` bg, 4 trust items with icons — **hidden at ≤640px** |
| 2 | Header / Navigation | `.site-header` | Logo, nav links, "Plan My Holiday" CTA, hamburger — **nav collapses to hamburger at ≤1200px**; mobile drawer slides in from right |
| 3 | Hero | `.hero` | Blue bg (#0056a6), left: headline + search widget, right: image slider — **right slider has min-height at small screens** |
| 4 | Holiday Type Filter | `.holiday-filter` | 3×2 image card grid, local images, gradient overlay, white label bottom-left |
| 5 | Featured Holidays | `.featured-holidays` | `#fff7ef` bg, 4-card grid — white cards, inner image padding, dual badges, slide dots |
| 6a | Why Trust Us — heading | `.why-us-heading` | Blue bg `#0051a1`, single centered white heading, 160px tall |
| 6b | Why Trust Us — stats | `.why-us-counter` | Orange `#f9a147` bg, 4 stats with icons — identical design to `footer-counter` |
| 7 | Mauritius Made Effortless | `.air-mauritius` | White bg, left: heading + 5 checklist items + CTA, right: `mauritius-beach.png` rounded 40px |
| 8 | Corporate & MICE Solutions | `.mice` | `#faf8f4` bg, 4-card grid with SVG icons, no label/subtitle |
| 9 | Travel Stories | `.travel-stories` | `#0051a1` bg, 3 video cards with play buttons, slide dots, CTA button |
| 10 | Wall of Travellers Experience | `.wall-of-travellers` | `#f9a147` bg, 3 white review cards with avatar + stars + review text |
| 11 | Awards & Accolades | `.awards` | White bg, 4-card grid |
| 12 | Strategic Partners | `.partners` | `#fff7ef` bg, chip groups (Tourism Boards + Hotels) |
| 13 | CTA Banner | `.cta-banner` | White section, SVG image with woman overlay |
| 14 | FAQ | `.faq` | White bg, `<details>` accordion items |
| Footer | Footer | `app-footer` | Rendered by `FooterComponent` |

---

## Section 4 — Holiday Type Filter (`.holiday-filter`)

**Figma node:** 1:5247  
**Heading:** "Find Your Travel Style"  
**Subtitle:** "Curated experiences for every type of traveller."  
**Layout:** 3-column × 2-row CSS grid, 32px gap, 64px margin-top  
**Card class:** `.hf-card` — 300px height, `border-radius: 32px`, overflow hidden  
**Card anatomy:** `<img class="fh-card__photo">` + `<div class="hf-card__overlay">` (gradient) + `<span class="hf-card__label">` (bottom-left, 24px Poppins bold white)  
**Gradient:** `linear-gradient(to top, rgba(0,0,0,0.7) → rgba(0,0,0,0.2) → transparent)`

| Card | Label | Image |
|---|---|---|
| 1 | Family Holidays | `images/family-holidays.png` |
| 2 | Couples & Honeymoon | `images/couples-honeymoon.png` |
| 3 | Luxury Holidays | `images/luxury-holidays.png` |
| 4 | Adventure Tours | `images/adventure-tours.png` |
| 5 | Group Travel | `images/group-travel.png` |
| 6 | Cruises | `images/cruises.png` |

---

## Section 5 — Featured Holidays (`.featured-holidays`)

**Figma nodes:** 2:279 (section bg), 2:285 (card)  
**Section bg:** `#fff7ef`  
**Layout:** 4-column grid, 24px gap, max-width 1440px  
**Card class:** `.fh-card` — white bg, `border: 1px solid #e8e8e8`, `border-radius: 20px`

### Card anatomy
- **Image wrap** (`.fh-card__img-wrap`): 10px padding — image inside has `border-radius: 10px`, height 242px, `object-fit: cover`
- **Date badge** (`.fh-card__badge-date`): top-left inside image, white pill `border-radius: 100px`
- **Type badge** (`.fh-card__badge-type`): top-right inside image, white pill
- **Slide dots** (`.fh-card__dots`): 3 dots — gray `#f0f0f0` inactive, orange `#f9a147` active (wider pill)
- **Title** (`.fh-card__title`): 20px Poppins SemiBold `#110f0f`
- **Meta row** (`.fh-card__meta`): `icons/location.png` + uppercase location + `icons/arrows-both-sides.png` + duration text — all `#525252` 14px
- **Footer** (`.fh-card__footer`): left = orange `Book Now` button (`#f9a147`, `border-radius: 10px`, `height: 41px`, `icons/booking-arrow.png` arrow); right = per-person label + AED amount

### Card data

| Card | Title | Image | Location | Duration | Price | Date | Type |
|---|---|---|---|---|---|---|---|
| 1 | Mauritius Family Escape | `images/mauritius.jpg` | Mauritius | 05 Days/6 Nights | AED 1,500 | 27 July 2026 | Family Tour |
| 2 | Kenya Safari Adventure | `images/adventure-tours.png` | Kenya, Africa | 07 Days/8 Nights | AED 5,500 | 15 Aug 2026 | Adventure Tour |
| 3 | Switzerland Scenic Holiday | `images/luxury-holidays.png` | Switzerland | 07 Days/8 Nights | AED 1,500 | 20 Sep 2026 | Luxury Tour |
| 4 | Maldives Honeymoon | `images/couples-honeymoon.png` | Maldives | 05 Days/6 Nights | AED 1,500 | 10 Oct 2026 | Honeymoon |

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
**Layout:** 3-column grid, `gap: 24px`, `padding: 80px 80px`, max-width 1440px  
**Heading:** "Wall of Travellers Experience" — Poppins 600, `clamp(28px, 3vw, 40px)`, `#ffffff`  
**Subtitle:** 18px Inter 400, `#ffffff`  
**Card class:** `.wte-card` — white bg, `border-radius: 20px`, `padding: 35px`

### Card anatomy
- **Header** (`.wte-card__header`): flex row, `gap: 28px` — avatar + author info
- **Avatar** (`.wte-card__avatar`): `icons/author-image.png`, 55×55px circle
- **Name** (`.wte-card__name`): 20px Poppins 700, `#110f0f`
- **Role** (`.wte-card__role`): 16px Inter 400, `#525252`
- **Stars** (`.wte-card__stars`): 5× `icons/rating-star.png` (20×20px), `gap: 2px`, `margin-top: 35px`
- **Rating label** (`.wte-card__rating-label`): 18px Poppins 600, `#110f0f`, `margin-top: 16px`
- **Review** (`.wte-card__review`): 16px Poppins 500, `#525252`, `line-height: 30px`, `margin-top: 32px`

### Card data

| Card | Name | Role | Rating label | Review |
|---|---|---|---|---|
| 1 | Alia | Traveler | Average Experience | "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!" |
| 2 | Suhana | Traveler | Amazing Experience | Similar positive review |
| 3 | Ahmed | Traveler | Outstanding Experience | Similar positive review |

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
