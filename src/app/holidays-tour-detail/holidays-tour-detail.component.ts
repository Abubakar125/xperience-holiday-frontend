import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HolidayService } from '../shared/services/holiday.service';

@Component({
  selector: 'app-holidays-tour-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './holidays-tour-detail.component.html',
  styleUrl: './holidays-tour-detail.component.scss'
})
export class HolidaysTourDetailComponent implements OnInit, OnDestroy {

  // ── API state ─────────────────────────────────────────────────────────────
  holiday: any = null;
  loading = true;
  error   = false;

  get priceDisplay(): string {
    if (!this.holiday?.price) return '—';
    return `AED ${Number(this.holiday.price).toLocaleString()}`;
  }

  // ── Hero slider ───────────────────────────────────────────────────────────
  heroSlides: string[] = ['images/holidays-details-hero.svg'];
  currentHeroSlide = 0;

  get maxHeroSlide(): number { return this.heroSlides.length - 1; }
  get heroAtStart(): boolean { return this.currentHeroSlide === 0; }
  get heroAtEnd(): boolean   { return this.currentHeroSlide >= this.maxHeroSlide; }

  prevHero(): void { if (!this.heroAtStart) this.currentHeroSlide--; }
  nextHero(): void { if (!this.heroAtEnd)   this.currentHeroSlide++; }

  // ── About grid ────────────────────────────────────────────────────────────
  details: { icon: string; label: string; value: string }[] = [];

  // ── Explore Locations slider ──────────────────────────────────────────────
  locations: { name: string; days: string; image: string }[] = [];

  visibleLocations     = 3;
  currentLocationsSlide = 0;

  get maxLocationsSlide(): number      { return Math.max(0, this.locations.length - this.visibleLocations); }
  get locationsAtStart(): boolean      { return this.currentLocationsSlide === 0; }
  get locationsAtEnd(): boolean        { return this.currentLocationsSlide >= this.maxLocationsSlide; }
  get canScrollLocations(): boolean    { return this.locations.length > this.visibleLocations; }
  get effectiveLocationCount(): number { return Math.min(this.visibleLocations, this.locations.length); }

  prevLocation(): void { if (!this.locationsAtStart) this.currentLocationsSlide--; }
  nextLocation(): void { if (!this.locationsAtEnd)   this.currentLocationsSlide++; }

  private updateVisibleLocations(): void {
    const w = window.innerWidth;
    const next = w < 480 ? 1 : w < 768 ? 2 : 3;
    if (next !== this.visibleLocations) {
      this.visibleLocations = next;
      this.currentLocationsSlide = Math.min(this.currentLocationsSlide, this.maxLocationsSlide);
    }
  }

  // ── Highlights ───────────────────────────────────────────────────────────
  highlights: string[] = [];

  // ── Tour Itinerary ───────────────────────────────────────────────────────
  itinerary: any[] = [];
  expandAll = false;

  toggleDay(di: number, dayIdx: number): void {
    this.itinerary[di].days[dayIdx].expanded = !this.itinerary[di].days[dayIdx].expanded;
  }

  toggleExpandAll(): void {
    this.expandAll = !this.expandAll;
    this.itinerary.forEach(d => {
      d.expanded = this.expandAll;
      d.days.forEach((day: any) => day.expanded = this.expandAll);
    });
  }

  // ── Package Features ─────────────────────────────────────────────────────
  includeFeatures: string[] = [];
  excludeFeatures: string[] = [];

  // ── Additional Info ──────────────────────────────────────────────────────
  additionalInfo: string[] = [];

  // ── Reviews (static) ─────────────────────────────────────────────────────
  readonly reviewStats = [
    { label: 'Overall',     score: 5.0, pct: 100 },
    { label: 'Transport',   score: 4.0, pct: 80 },
    { label: 'Food',        score: 4.0, pct: 80 },
    { label: 'Hospitality', score: 5.0, pct: 100 },
    { label: 'Destination', score: 5.0, pct: 100 },
  ];

  readonly reviews = [
    {
      name: 'Oho, Bingooo!!!',
      date: 'December 10, 2025',
      body: 'Our packages typically include stays in 3 to 4-star hotels, offering comfortable rooms with essential amenities. Higher or boutique categories may be available upon request or in premium packages.',
      ratings: [
        { label: 'Overall', stars: 5 }, { label: 'Transport', stars: 4 },
        { label: 'Food', stars: 4 },    { label: 'Hospitality', stars: 5 },
        { label: 'Destination', stars: 5 },
      ],
    },
  ];

  range(n: number): number[] { return Array.from({ length: n }, (_, i) => i); }

  // ── Relevant Packages ─────────────────────────────────────────────────────
  relevantPackages: { title: string; badge: string; location: string; duration: string; price: string; image: string }[] = [];

  currentRelevantSlide = 0;
  visibleRelevantPackages = 3;
  private relevantTimer: ReturnType<typeof setInterval> | null = null;

  get relevantDots(): number[] {
    const count = this.relevantPackages.length - this.visibleRelevantPackages + 1;
    return Array.from({ length: Math.max(1, count) }, (_, i) => i);
  }

  goToRelevantSlide(i: number): void {
    this.currentRelevantSlide = i;
    this.restartRelevantTimer();
  }

  private updateVisibleRelevantPackages(): void {
    const w = window.innerWidth;
    const next = w < 640 ? 1 : w < 900 ? 2 : 3;
    if (next !== this.visibleRelevantPackages) {
      this.visibleRelevantPackages = next;
      this.currentRelevantSlide = 0;
    }
  }

  private startRelevantTimer(): void {
    if (this.relevantPackages.length <= this.visibleRelevantPackages) return;
    this.relevantTimer = setInterval(() => {
      const max = this.relevantPackages.length - this.visibleRelevantPackages;
      this.currentRelevantSlide = (this.currentRelevantSlide + 1) % (max + 1);
    }, 3500);
  }

  private clearRelevantTimer(): void {
    if (this.relevantTimer) { clearInterval(this.relevantTimer); this.relevantTimer = null; }
  }

  private restartRelevantTimer(): void {
    this.clearRelevantTimer();
    this.startRelevantTimer();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleLocations();
    this.updateVisibleRelevantPackages();
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  constructor(
    private route: ActivatedRoute,
    private holidayService: HolidayService,
  ) {}

  ngOnInit(): void {
    this.updateVisibleLocations();
    this.updateVisibleRelevantPackages();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.holidayService.getHoliday(+id).subscribe({
        next: (h) => {
          this.holiday = h;
          this.mapHolidayData(h);
          this.loading = false;
          this.loadRelevantPackages(h.id);
        },
        error: () => { this.error = true; this.loading = false; },
      });
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.clearRelevantTimer();
  }

  // ── Data mapping ──────────────────────────────────────────────────────────
  private mapHolidayData(h: any): void {
    // Hero images — fall back to placeholder if none uploaded
    this.heroSlides = h.heroImages?.length
      ? h.heroImages
      : ['images/holidays-details-hero.svg'];

    // About tour grid
    const join = (arr: string[] | null) => arr?.length ? arr.join(', ') : '—';
    this.details = [
      { icon: 'icons/accomodation-hotel.svg', label: 'Accomodation',  value: h.accommodation || '—' },
      { icon: 'icons/meals-hotel.svg',        label: 'Meals',         value: join(h.meals) },
      { icon: 'icons/transportation.svg',     label: 'Transportation', value: join(h.transportation) },
      { icon: 'icons/group-size.svg',         label: 'Group Size',    value: h.groupSize || '—' },
      { icon: 'icons/language.svg',           label: 'Language',      value: join(h.language) },
      { icon: 'icons/animal.svg',             label: 'Animal',        value: join(h.animal) },
      { icon: 'icons/age-range.svg',          label: 'Age Range',     value: h.ageRange || '—' },
      { icon: 'icons/season.svg',             label: 'Season',        value: h.season || '—' },
      { icon: 'icons/category.svg',           label: 'Category',      value: h.category || '—' },
    ];

    // Locations
    this.locations = h.locations || [];

    // Highlights
    this.highlights = h.highlights || [];

    // Itinerary — add expanded UI state, sequential day labels
    let dayNum = 0;
    this.itinerary = (h.itinerary || []).map((dest: any) => ({
      ...dest,
      expanded: true,
      days: (dest.days || []).map((day: any) => {
        dayNum++;
        return {
          ...day,
          day: `Day-${String(dayNum).padStart(2, '0')}`,
          expanded: false,
        };
      }),
    }));

    // Features & additional info
    this.includeFeatures = h.includeFeatures || [];
    this.excludeFeatures = h.excludeFeatures || [];
    this.additionalInfo  = h.additionalInfo  || [];
  }

  private loadRelevantPackages(currentId: number): void {
    this.holidayService.getHolidays().subscribe({
      next: (all) => {
        this.relevantPackages = all
          .filter(h => h.id !== currentId && h.isActive)
          .slice(0, 6)
          .map(h => ({
            title:    h.title,
            badge:    h.badge || h.type || 'Holiday',
            location: h.location || '',
            duration: h.summary || h.duration || '',
            price:    `AED ${Number(h.price).toLocaleString()}`,
            image:    h.heroImages?.[0] || 'images/tourist-place-1.svg',
          }));
        this.startRelevantTimer();
      },
    });
  }
}
