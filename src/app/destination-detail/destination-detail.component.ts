import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FaqComponent } from '../shared/components/faq/faq.component';

@Component({
  selector: 'app-destination-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FaqComponent],
  templateUrl: './destination-detail.component.html',
  styleUrl: './destination-detail.component.scss'
})
export class DestinationDetailComponent implements OnInit, OnDestroy {

  // ── Hero image slider ────────────────────────────────────────
  readonly slides = [
    'images/destination-details-1.svg',
    'images/destination-details-2.svg',
    'images/destination-details-3.svg',
    'images/tourist-place-4.svg',
    'images/tourist-place-5.svg',
  ];

  currentHeroSlide = 0;
  visibleHeroSlides = 3;

  get maxHeroSlide(): number { return this.slides.length - this.visibleHeroSlides; }
  get heroAtStart(): boolean { return this.currentHeroSlide === 0; }
  get heroAtEnd(): boolean { return this.currentHeroSlide >= this.maxHeroSlide; }

  prevHero(): void { if (!this.heroAtStart) this.currentHeroSlide--; }
  nextHero(): void { if (!this.heroAtEnd) this.currentHeroSlide++; }

  private updateVisibleHeroSlides(): void {
    const w = window.innerWidth;
    const next = w < 480 ? 1 : w < 900 ? 2 : 3;
    if (next !== this.visibleHeroSlides) {
      this.visibleHeroSlides = next;
      this.currentHeroSlide = Math.min(this.currentHeroSlide, this.maxHeroSlide);
    }
  }

  // ── Popular Tourist Places slider ────────────────────────────
  readonly places = [
    { name: 'Loire Valley',          image: 'images/tourist-place-1.svg' },
    { name: 'Southern France',       image: 'images/tourist-place-2.svg' },
    { name: 'Louvre Museum',         image: 'images/tourist-place-3.svg' },
    { name: 'Notre-Dame Cathedral',  image: 'images/tourist-place-4.svg' },
    { name: 'Palace of Versailles',  image: 'images/tourist-place-5.svg' },
    { name: 'Carcassonne',           image: 'images/tourist-place-6.svg' },
  ];

  visiblePlaces = 6;
  currentPlacesSlide = 0;

  get maxPlacesSlide(): number {
    return this.places.length - this.visiblePlaces;
  }

  get placesAtStart(): boolean {
    return this.currentPlacesSlide === 0;
  }

  get placesAtEnd(): boolean {
    return this.currentPlacesSlide >= this.maxPlacesSlide;
  }

  prevPlace(): void {
    if (!this.placesAtStart) this.currentPlacesSlide--;
  }

  nextPlace(): void {
    if (!this.placesAtEnd) this.currentPlacesSlide++;
  }

  private updateVisiblePlaces(): void {
    const w = window.innerWidth;
    const next = w < 480 ? 1 : w < 640 ? 2 : w < 900 ? 3 : 6;
    if (next !== this.visiblePlaces) {
      this.visiblePlaces = next;
      this.currentPlacesSlide = Math.min(this.currentPlacesSlide, this.maxPlacesSlide);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleHeroSlides();
    this.updateVisiblePlaces();
  }

  ngOnInit(): void {
    this.updateVisibleHeroSlides();
    this.updateVisiblePlaces();
  }

  ngOnDestroy(): void {}
}
