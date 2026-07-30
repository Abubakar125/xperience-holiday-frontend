# Design System

## CSS Custom Properties (defined in `src/styles.scss` `:root`)

### Colors
```css
--color-primary:        #1B6CA8   /* deep travel blue — nav, buttons */
--color-primary-dark:   #145285
--color-accent:         #E8A020   /* warm amber — highlights, badges, CTA accents */
--color-accent-dark:    #C8871A
--color-dark:           #1A1A2E   /* near-black headings */
--color-text:           #4A4A6A   /* body copy */
--color-muted:          #8A8AAA   /* captions, labels */
--color-surface:        #F7F8FC   /* section backgrounds */
--color-white:          #FFFFFF
--color-border:         #E2E4EE
--color-trustbar-bg:    #0056a6   /* also used for hero and blue sections */
--color-trustbar-text:  #ffffff
```

### Typography
```css
--font-primary: 'Inter', 'Segoe UI', system-ui, sans-serif
--font-display: 'Poppins', sans-serif
```

### Layout
```css
--container-max: 1840px
--section-pad-y: 80px
```

## Tailwind Theme (tailwind.config.js)
```js
colors: {
  primary:   { DEFAULT: '#1B6CA8', dark: '#145285' },
  accent:    { DEFAULT: '#E8A020', dark: '#C8871A' },
  brand: {
    dark:    '#1A1A2E',
    text:    '#4A4A6A',
    muted:   '#8A8AAA',
    surface: '#F7F8FC',
    border:  '#E2E4EE',
  }
}
fontFamily: { sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'] }
maxWidth: { container: '1840px' }
```

## Global Shared Classes (src/styles.scss)
| Class | Purpose |
|---|---|
| `.xh-container` | Max-width constrained wrapper (1840px, 32px inline padding) |
| `.xh-section` | Section vertical padding (80px top/bottom) |
| `.xh-h2` | Responsive section heading (clamp 1.75rem–3rem, bold, dark) |
| `.xh-h3` | Sub-heading (clamp 1.1–1.5rem, semibold) |
| `.xh-h5` | Card title (1.1rem, semibold) |
| `.xh-label` | Uppercase label / eyebrow text (0.75rem, muted) |
| `.xh-body` | Body copy (1rem, line-height 1.7, text color) |
| `.xh-badge` | Pill badge (accent bg, white text) |
| `.xh-btn-primary` | Primary button (blue bg, white text) |
| `.xh-btn-secondary` | Outline button (blue border) |
| `.xh-stars` | Star rating row (amber #F5A623) |
| `.text-center` | text-align: center |
| `.mt-{2,3,4,8,10}` | margin-top utilities (8px, 12px, 16px, 32px, 40px) |
| `.mb-4` | margin-bottom: 16px |

## CSS Naming Convention
BEM-style: `.block__element--modifier`
Example: `.fh-card__img-wrap`, `.site-header__link--active`

## Additional colours used in Figma sections (not in CSS tokens — use raw hex)
| Value | Usage |
|---|---|
| `#0051a1` | Why Trust Us heading banner bg, Travel Stories section bg |
| `#f9a147` | Orange counter bar bg, card dots active, Book Now button, Wall of Travellers section bg |
| `#f5a623` | Figma amber — Mauritius CTA button, checklist icons, Travel Stories CTA |
| `#fff7ef` | Featured Holidays section bg, Strategic Partners section bg |
| `#faf8f4` | MICE Solutions section bg |
| `#132238` | Figma near-black heading (Holiday filter, Mauritius, MICE sections) |
| `#667085` | Figma subtitle / body text (Holiday filter subtitle, checklist text, MICE card descriptions) |
| `#110f0f` | Card title colour (Featured Holidays cards, Wall of Travellers card names) |
| `#525252` | Card meta text (location, duration, reviewer role, review body) |
| `#e8e8e8` | Featured Holiday card border |

## Asset paths
- Icons: `icons/<name>.png` or `icons/<name>.svg`
- Images: `images/<name>.jpg` or `images/<name>.svg` or `images/<name>.png`
- All assets served from `public/` folder (Angular 19 static assets)

## Key icon files (public/icons/)
| File | Used in |
|---|---|
| `location.png` | Featured Holiday card — map pin (14×14px) |
| `arrows-both-sides.png` | Featured Holiday card — separator between location and duration (22×8px) |
| `booking-arrow.png` | Featured Holiday card — Book Now button arrow (16×12px) |
| `tours.png` | Why Trust Us counter bar — Tour Completed stat |
| `travel-experience.png` | Why Trust Us counter bar — Travel Experience stat |
| `happy-traveler.png` | Why Trust Us counter bar — Happy Traveler stat |
| `retention-rate.png` | Why Trust Us counter bar — Retention Rate stat |
| `seperation.png` | Counter bar vertical divider between stat items |
| `tick.png` | Mauritius Made Effortless — checklist tick inside orange circle (16×16px) |
| `incentive-travel.svg` | MICE Solutions card 1 — Incentive Travel icon (48×48px) |
| `conference-event.svg` | MICE Solutions card 2 — Conferences & Events icon (48×48px) |
| `corporates-retreats.svg` | MICE Solutions card 3 — Corporate Retreats icon (48×48px) |
| `persons.svg` | MICE Solutions card 4 — Group Travel icon (48×48px) |
| `author-image.png` | Wall of Travellers cards — reviewer avatar (55×55px circle) |
| `rating-star.png` | Wall of Travellers cards — star rating (20×20px, 5 per card) |

## Key image files (public/images/)
| File | Used in |
|---|---|
| `family-holidays.png` | Holiday Type Filter card |
| `couples-honeymoon.png` | Holiday Type Filter card + Featured Holidays card 4 |
| `luxury-holidays.png` | Holiday Type Filter card + Featured Holidays card 3 |
| `adventure-tours.png` | Holiday Type Filter card + Featured Holidays card 2 |
| `group-travel.png` | Holiday Type Filter card |
| `cruises.png` | Holiday Type Filter card |
| `mauritius.jpg` | Featured Holidays card 1 |
| `mauritius-beach.png` | Mauritius Made Effortless section — right column photo |
| `main-container.png` | Hero right-side image slider |
