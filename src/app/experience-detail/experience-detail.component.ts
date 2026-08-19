import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ExperienceService } from '../shared/services/experience.service';
import { HolidayService } from '../shared/services/holiday.service';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './experience-detail.component.html',
  styleUrl: './experience-detail.component.scss'
})
export class ExperienceDetailComponent implements OnInit, OnDestroy {

  experience: any | null = null;
  loading = true;
  error = false;

  // ── Hero slider ──────────────────────────────────────────────────────────────
  heroSlides: string[] = ['images/experice-details-hero.svg'];
  currentHeroSlide = 0;

  get maxHeroSlide(): number { return this.heroSlides.length - 1; }
  get heroAtStart(): boolean { return this.currentHeroSlide === 0; }
  get heroAtEnd(): boolean { return this.currentHeroSlide >= this.maxHeroSlide; }

  prevHero(): void { if (!this.heroAtStart) this.currentHeroSlide--; }
  nextHero(): void { if (!this.heroAtEnd) this.currentHeroSlide++; }

  // ── Mapped fields ─────────────────────────────────────────────────────────────
  priceDisplay = 'AED 0';
  highlights: string[] = [];
  details: { icon: string; label: string; value: string }[] = [];
  locations: { image: string; name: string; days: string }[] = [];
  itinerary: any[] = [];
  includeFeatures: string[] = [];
  excludeFeatures: string[] = [];
  additionalInfo: string[] = [];

  // ── Explore Locations slider ────────────────────────────────────────────────
  visibleLocations = 3;
  currentLocationsSlide = 0;

  get maxLocationsSlide(): number      { return Math.max(0, this.locations.length - this.visibleLocations); }
  get locationsAtStart(): boolean      { return this.currentLocationsSlide === 0; }
  get locationsAtEnd(): boolean        { return this.currentLocationsSlide >= this.maxLocationsSlide; }
  get canScrollLocations(): boolean    { return this.locations.length > this.visibleLocations; }
  get effectiveLocationCount(): number { return Math.min(this.visibleLocations, this.locations.length); }

  prevLocation(): void { if (!this.locationsAtStart) this.currentLocationsSlide--; }
  nextLocation(): void { if (!this.locationsAtEnd) this.currentLocationsSlide++; }

  private updateVisibleLocations(): void {
    const w = window.innerWidth;
    const next = w < 480 ? 1 : w < 768 ? 2 : 3;
    if (next !== this.visibleLocations) {
      this.visibleLocations = next;
      this.currentLocationsSlide = Math.min(this.currentLocationsSlide, this.maxLocationsSlide);
    }
  }

  // ── Tour Itinerary ──────────────────────────────────────────────────────────
  expandAll = false;

  toggleDestination(i: number): void { this.itinerary[i].expanded = !this.itinerary[i].expanded; }

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

  // ── Reviews (static) ────────────────────────────────────────────────────────
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

  // ── Relevant Packages (from holidays) ──────────────────────────────────────
  relevantPackages: any[] = [];
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

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private holidayService: HolidayService,
  ) {}

  ngOnInit(): void {
    this.updateVisibleLocations();
    this.updateVisibleRelevantPackages();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.experienceService.getExperience(id).subscribe({
      next: (data) => {
        this.experience = data;
        this.mapData(data);
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; },
    });

    this.holidayService.getHolidays().subscribe({
      next: (holidays) => {
        this.relevantPackages = holidays
          .filter((h: any) => h.isActive)
          .map((h: any) => ({
            id: h.id,
            title: h.title,
            badge: h.badge || h.type || 'Holiday',
            location: (h.location || h.destinationTitle || '').toUpperCase(),
            duration: h.summary || h.duration || '',
            price: `AED ${Number(h.price).toLocaleString()}`,
            image: h.heroImages?.[0] || 'images/tourist-place-1.svg',
          }));
        this.startRelevantTimer();
      },
      error: () => { this.startRelevantTimer(); },
    });
  }

  private mapData(data: any): void {
    this.heroSlides = data.heroImages?.length
      ? data.heroImages
      : ['images/experice-details-hero.svg'];

    this.priceDisplay = `AED ${Number(data.price).toLocaleString()}`;
    this.highlights = data.highlights || [];
    this.locations = data.locations || [];
    this.includeFeatures = data.includeFeatures || [];
    this.excludeFeatures = data.excludeFeatures || [];
    this.additionalInfo = data.additionalInfo || [];

    this.details = [
      { icon: 'icons/accomodation-hotel.svg', label: 'Accomodation', value: data.accommodation || '—' },
      { icon: 'icons/meals-hotel.svg',        label: 'Meals',        value: (data.meals || []).join(', ') || '—' },
      { icon: 'icons/transportation.svg',     label: 'Transportation', value: (data.transportation || []).join(', ') || '—' },
      { icon: 'icons/group-size.svg',         label: 'Group Size',   value: data.groupSize || '—' },
      { icon: 'icons/language.svg',           label: 'Language',     value: (data.language || []).join(', ') || '—' },
      { icon: 'icons/animal.svg',             label: 'Animal',       value: (data.animal || []).join(', ') || '—' },
      { icon: 'icons/age-range.svg',          label: 'Age Range',    value: data.ageRange || '—' },
      { icon: 'icons/season.svg',             label: 'Season',       value: data.season || '—' },
      { icon: 'icons/category.svg',           label: 'Category',     value: data.category || '—' },
    ];

    let globalDay = 0;
    this.itinerary = (data.itinerary || []).map((dest: any, di: number) => ({
      ...dest,
      expanded: di === 0,
      days: (dest.days || []).map((day: any, dayIdx: number) => {
        const label = `Day-${String(++globalDay).padStart(2, '0')}`;
        return { ...day, day: label, expanded: di === 0 && dayIdx === 0 };
      }),
    }));
  }

  ngOnDestroy(): void {
    this.clearRelevantTimer();
  }
}
