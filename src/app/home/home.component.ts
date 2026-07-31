import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FaqComponent } from '../shared/components/faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FaqComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  // ── Featured Holiday cards ───────────────────────────────────
  fhCards = [
    {
      images: ['images/mauritius.jpg', 'images/family-holidays.png', 'images/mauritius-beach.png'],
      date: '27 July 2026', type: 'Family Tour',
      title: 'Mauritius Family Escape', location: 'Mauritius',
      duration: '05 Days/6 Nights', price: 'AED 1,500'
    },
    {
      images: ['images/adventure-tours.png', 'images/group-travel.png', 'images/luxury-holidays.png'],
      date: '15 Aug 2026', type: 'Adventure Tour',
      title: 'Kenya Safari Adventure', location: 'Kenya, Africa',
      duration: '07 Days/8 Nights', price: 'AED 5,500'
    },
    {
      images: ['images/luxury-holidays.png', 'images/cruises.png', 'images/couples-honeymoon.png'],
      date: '20 Sep 2026', type: 'Luxury Tour',
      title: 'Switzerland Scenic Holiday', location: 'Switzerland',
      duration: '07 Days/8 Nights', price: 'AED 1,500'
    },
    {
      images: ['images/couples-honeymoon.png', 'images/mauritius-beach.png', 'images/family-holidays.png'],
      date: '10 Oct 2026', type: 'Honeymoon',
      title: 'Maldives Honeymoon', location: 'Maldives',
      duration: '05 Days/6 Nights', price: 'AED 1,500'
    }
  ];
  fhCardSlides = [0, 0, 0, 0];
  private fhCardTimer: ReturnType<typeof setInterval> | null = null;

  goToFhSlide(cardIndex: number, slideIndex: number) {
    this.fhCardSlides[cardIndex] = slideIndex;
  }

  private startFhCardTimer() {
    this.fhCardTimer = setInterval(() => {
      this.fhCardSlides = this.fhCardSlides.map((slide, i) =>
        (slide + 1) % this.fhCards[i].images.length
      );
    }, 3000);
  }

  private clearFhCardTimer() {
    if (this.fhCardTimer) { clearInterval(this.fhCardTimer); this.fhCardTimer = null; }
  }

  // ── Hero slider ──────────────────────────────────────────────
  heroSlides = [
    'images/main-container.png',
    'images/luxury-holidays.png',
    'images/couples-honeymoon.png',
    'images/adventure-tours.png',
    'images/group-travel.png',
    'images/cruises.png',
    'images/mauritius-beach.png',
  ];
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
    this.startHeroTimer();
    this.startTsTimer();
    this.startFhCardTimer();
  }

  ngOnDestroy() {
    this.clearHeroTimer();
    this.clearTsTimer();
    this.clearFhCardTimer();
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
