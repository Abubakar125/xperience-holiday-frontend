import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FaqComponent } from '../shared/components/faq/faq.component';
import { HomeConfigService } from '../shared/services/home-config.service';
import { TestimonialService } from '../shared/services/testimonial.service';
import { HolidayService } from '../shared/services/holiday.service';
import { environment } from '../../environments/environment';

const IMG_BASE = environment.imgBase;

const FALLBACK_SLIDES = [
  'images/main-container.png',
  'images/luxury-holidays.png',
  'images/couples-honeymoon.png',
  'images/adventure-tours.png',
  'images/group-travel.png',
  'images/cruises.png',
  'images/mauritius-beach.png',
];

const FALLBACK_TRAVEL_STYLE = [
  { label: 'Family Holidays',      image: 'images/family-holidays.png' },
  { label: 'Couples & Honeymoon',  image: 'images/couples-honeymoon.png' },
  { label: 'Luxury Holidays',      image: 'images/luxury-holidays.png' },
  { label: 'Adventure Tours',      image: 'images/adventure-tours.png' },
  { label: 'Group Travel',         image: 'images/group-travel.png' },
  { label: 'Cruises',              image: 'images/cruises.png' },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FaqComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private homeConfigService: HomeConfigService,
    private testimonialService: TestimonialService,
    private holidayService: HolidayService,
  ) {}

  // ── Featured Holiday cards ───────────────────────────────────
  fhCards: { id: number; images: string[]; date: string; type: string; title: string; location: string; duration: string; price: string }[] = [];
  fhCardSlides: number[] = [];
  private fhCardTimer: ReturnType<typeof setInterval> | null = null;

  goToFhSlide(cardIndex: number, slideIndex: number) {
    this.fhCardSlides[cardIndex] = slideIndex;
  }

  private startFhCardTimer() {
    this.fhCardTimer = setInterval(() => {
      this.fhCardSlides = this.fhCardSlides.map((slide, i) =>
        (slide + 1) % (this.fhCards[i]?.images.length || 1)
      );
    }, 3000);
  }

  private clearFhCardTimer() {
    if (this.fhCardTimer) { clearInterval(this.fhCardTimer); this.fhCardTimer = null; }
  }

  // ── Travel Style cards ───────────────────────────────────────
  travelStyleCards = FALLBACK_TRAVEL_STYLE;

  // ── Testimonials slider ──────────────────────────────────────
  testimonials: any[] = [];
  wteSlide = 0;
  visibleWte = 3;
  private wteTimer: ReturnType<typeof setInterval> | null = null;

  starsArray(n: number): number[] { return Array.from({ length: n ?? 5 }); }

  private updateVisibleWte() {
    const w = window.innerWidth;
    this.visibleWte = w < 640 ? 1 : w < 1024 ? 2 : 3;
  }

  private startWteTimer() {
    this.wteTimer = setInterval(() => {
      const max = this.testimonials.length - this.visibleWte;
      if (max <= 0) return;
      this.wteSlide = this.wteSlide >= max ? 0 : this.wteSlide + 1;
    }, 3500);
  }

  private clearWteTimer() {
    if (this.wteTimer) { clearInterval(this.wteTimer); this.wteTimer = null; }
  }

  // ── Hero slider ──────────────────────────────────────────────
  heroSlides: string[] = FALLBACK_SLIDES;
  currentSlide = 0;
  private heroTimer: ReturnType<typeof setInterval> | null = null;

  // ── Travel Stories slider ────────────────────────────────────
  travelStoryCards = [0, 1, 2, 3, 4, 5, 6];
  visibleTsCards = 3;
  currentTsSlide = 0;
  private tsTimer: ReturnType<typeof setInterval> | null = null;

  get travelStoryDots(): number[] {
    const count = this.travelStoryCards.length - this.visibleTsCards + 1;
    return Array.from({ length: count }, (_, i) => i);
  }

  @HostListener('window:resize')
  onResize() {
    const prev = this.visibleTsCards;
    this.updateVisibleTsCards();
    if (prev !== this.visibleTsCards) {
      this.clearTsTimer();
      this.startTsTimer();
    }
    this.updateVisibleWte();
    this.wteSlide = 0;
  }

  private updateVisibleTsCards() {
    const w = window.innerWidth;
    const next = w < 640 ? 1 : w < 900 ? 2 : 3;
    if (next !== this.visibleTsCards) {
      this.visibleTsCards = next;
      this.currentTsSlide = 0;
    }
  }

  ngOnInit() {
    this.updateVisibleTsCards();
    this.updateVisibleWte();
    this.startHeroTimer();
    this.startTsTimer();
    this.startFhCardTimer();
    this.testimonialService.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data.filter((t: any) => t.isActive);
        if (this.testimonials.length > this.visibleWte) this.startWteTimer();
      },
    });
    this.holidayService.getHolidays().subscribe({
      next: (data) => {
        const recent = data
          .filter((h: any) => h.isActive)
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 4);
        this.fhCards = recent.map((h: any) => ({
          id: h.id,
          images: (h.heroImages?.length ? h.heroImages : ['images/adventure-tours.png'])
            .map((u: string) => u.startsWith('http') ? u : IMG_BASE + u),
          date:     h.date || '',
          type:     h.type || h.badge || 'Holiday',
          title:    h.title,
          location: (h.location || h.destinationTitle || '').toUpperCase(),
          duration: h.duration || h.summary || '',
          price:    `AED ${Number(h.price).toLocaleString()}`,
        }));
        this.fhCardSlides = this.fhCards.map(() => 0);
        this.clearFhCardTimer();
        this.startFhCardTimer();
      },
    });
    this.homeConfigService.getHomeConfig().subscribe({
      next: ({ heroImages, travelStyleImages }) => {
        if (heroImages?.length) {
          this.heroSlides = heroImages.map((url: string) =>
            url.startsWith('http') ? url : IMG_BASE + url
          );
          this.currentSlide = 0;
        }
        if (travelStyleImages?.length) {
          this.travelStyleCards = FALLBACK_TRAVEL_STYLE.map((card, i) => ({
            label: card.label,
            image: travelStyleImages[i]
              ? (travelStyleImages[i].startsWith('http') ? travelStyleImages[i] : IMG_BASE + travelStyleImages[i])
              : card.image,
          }));
        }
      },
    });
  }

  ngOnDestroy() {
    this.clearHeroTimer();
    this.clearTsTimer();
    this.clearFhCardTimer();
    this.clearWteTimer();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.clearHeroTimer();
    this.startHeroTimer();
  }

  goToTsSlide(index: number) {
    this.currentTsSlide = index;
    this.clearTsTimer();
    this.startTsTimer();
  }

  private startHeroTimer() {
    this.heroTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    }, 4000);
  }

  private clearHeroTimer() {
    if (this.heroTimer) { clearInterval(this.heroTimer); this.heroTimer = null; }
  }

  private startTsTimer() {
    this.tsTimer = setInterval(() => {
      const maxSlide = this.travelStoryCards.length - this.visibleTsCards;
      this.currentTsSlide = (this.currentTsSlide + 1) % (maxSlide + 1);
    }, 4000);
  }

  private clearTsTimer() {
    if (this.tsTimer) { clearInterval(this.tsTimer); this.tsTimer = null; }
  }
}
