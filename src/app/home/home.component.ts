import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

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
  // 7 cards total, 3 visible at once → 5 nav positions
  travelStoryCards = [0, 1, 2, 3, 4, 5, 6];
  travelStoryDots  = [0, 1, 2, 3, 4];
  currentTsSlide = 0;
  private tsTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.startHeroTimer();
    this.startTsTimer();
  }

  ngOnDestroy() {
    this.clearHeroTimer();
    this.clearTsTimer();
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
      this.currentTsSlide = (this.currentTsSlide + 1) % this.travelStoryDots.length;
    }, 4000);
  }

  private clearTsTimer() {
    if (this.tsTimer) { clearInterval(this.tsTimer); this.tsTimer = null; }
  }
}
