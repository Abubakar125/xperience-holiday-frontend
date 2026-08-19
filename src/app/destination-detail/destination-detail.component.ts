import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FaqComponent } from '../shared/components/faq/faq.component';
import { DestinationService } from '../shared/services/destination.service';

@Component({
  selector: 'app-destination-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FaqComponent],
  templateUrl: './destination-detail.component.html',
  styleUrl: './destination-detail.component.scss'
})
export class DestinationDetailComponent implements OnInit, OnDestroy {

  destination: any = null;
  loading = true;
  error   = false;

  // ── Hero image slider ────────────────────────────────────────
  heroSlides: string[] = [];
  currentHeroSlide = 0;
  visibleHeroSlides = 3;

  get maxHeroSlide(): number { return Math.max(0, this.heroSlides.length - this.visibleHeroSlides); }
  get heroAtStart(): boolean { return this.currentHeroSlide === 0; }
  get heroAtEnd(): boolean   { return this.currentHeroSlide >= this.maxHeroSlide; }

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
  places: { name: string; image: string }[] = [];
  visiblePlaces = 6;
  currentPlacesSlide = 0;

  get maxPlacesSlide(): number   { return Math.max(0, this.places.length - this.visiblePlaces); }
  get placesAtStart(): boolean   { return this.currentPlacesSlide === 0; }
  get placesAtEnd(): boolean     { return this.currentPlacesSlide >= this.maxPlacesSlide; }
  get canScrollPlaces(): boolean { return this.places.length > this.visiblePlaces; }
  get effectivePlaceCount(): number { return Math.min(this.visiblePlaces, this.places.length); }

  prevPlace(): void { if (!this.placesAtStart) this.currentPlacesSlide--; }
  nextPlace(): void { if (!this.placesAtEnd)   this.currentPlacesSlide++; }

  private updateVisiblePlaces(): void {
    const w = window.innerWidth;
    const next = w < 480 ? 1 : w < 640 ? 2 : w < 900 ? 3 : 6;
    if (next !== this.visiblePlaces) {
      this.visiblePlaces = next;
      this.currentPlacesSlide = Math.min(this.currentPlacesSlide, this.maxPlacesSlide);
    }
  }

  // ── Video ────────────────────────────────────────────────────
  safeVideoUrl: SafeResourceUrl | null = null;

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleHeroSlides();
    this.updateVisiblePlaces();
  }

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.updateVisibleHeroSlides();
    this.updateVisiblePlaces();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destinationService.getDestination(+id).subscribe({
        next: (data) => {
          this.destination  = data;
          this.heroSlides   = data.heroImages   || [];
          this.places       = data.touristPlaces || [];
          if (data.videoUrl) {
            this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.toEmbedUrl(data.videoUrl)
            );
          }
          this.loading = false;
          this.updateVisibleHeroSlides();
          this.updateVisiblePlaces();
        },
        error: () => { this.error = true; this.loading = false; },
      });
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  private toEmbedUrl(url: string): string {
    // youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    // youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // Already an embed URL or non-YouTube — pass through unchanged
    return url;
  }

  ngOnDestroy(): void {}
}
