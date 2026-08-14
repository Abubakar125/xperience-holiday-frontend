import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-holidays-tour-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './holidays-tour-detail.component.html',
  styleUrl: './holidays-tour-detail.component.scss'
})
export class HolidaysTourDetailComponent {

   readonly highlights = [
    'Eiffel Tower – Skip-the-line access & breathtaking views from the summit.',
    'Louvre Museum – See the Mona Lisa and world-renowned masterpieces.',
    'Opéra Garnier – Visit the stunning opera house that inspired "The Phantom of the Opera".',
    'French Café & Bakery Tour – Savor croissants, macarons & espresso at historic cafés.',
    'Sunset Dinner Cruise on the Seine – Romantic fine dining on the river.',
  ];

  readonly details = [
    { icon: 'icons/accomodation-hotel.svg',   label: 'Accomodation',   value: '5 Star Hotel' },
    { icon: 'icons/meals-hotel.svg',          label: 'Meals',          value: 'Breakfast & Dinner' },
    { icon: 'icons/transportation.svg', label: 'Transportation',  value: 'Taxi,Car' },
    { icon: 'icons/group-size.svg',     label: 'Group Size',     value: '10–20' },
    { icon: 'icons/language.svg',       label: 'Language',       value: 'English, Spanish' },
    { icon: 'icons/animal.svg',         label: 'Animal',         value: 'Cat, Pet only' },
    { icon: 'icons/age-range.svg',      label: 'Age Range',      value: '18–45 (Year)' },
    { icon: 'icons/season.svg',         label: 'Season',         value: 'Winter Season' },
    { icon: 'icons/category.svg',       label: 'Category',       value: 'Adventure' },
  ];

  // ── Explore Locations slider ────────────────────────────────────────────────
  readonly locations = [
    { name: 'Loire Valley',    days: '(01 Days)', image: 'images/tourist-place-1.svg' },
    { name: 'Southern France', days: '(01 Days)', image: 'images/tourist-place-2.svg' },
    { name: 'Louvre Museum',   days: '(03 Days)', image: 'images/tourist-place-3.svg' },
    { name: 'Notre-Dame',      days: '(02 Days)', image: 'images/tourist-place-4.svg' },
    { name: 'Versailles',      days: '(01 Days)', image: 'images/tourist-place-5.svg' },
    { name: 'Carcassonne',     days: '(01 Days)', image: 'images/tourist-place-6.svg' },
  ];

  visibleLocations = 3;
  currentLocationsSlide = 0;

  get maxLocationsSlide(): number { return this.locations.length - this.visibleLocations; }
  get locationsAtStart(): boolean { return this.currentLocationsSlide === 0; }
  get locationsAtEnd(): boolean { return this.currentLocationsSlide >= this.maxLocationsSlide; }

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
  itinerary = [
    {
      destination: 'Paris, France',
      departure: 'Departure: 8:00 am – 8:30 am',
      expanded: true,
      days: [
        {
          day: 'Day-01', title: 'Eiffel Tower – The symbol of France', expanded: true,
          body: 'The Eiffel Tower is the heart of Paris and offers a variety of exciting activities. Begin with a skip-the-line guided tour to the summit for breathtaking panoramic views, followed by a walk along the Champ de Mars.',
          transport: 'Car, Flight, Boat',
          activities: 'Climb the Eiffel Tower, Sunset & night view, Bike tour.',
          meals: 'Breakfast, Lunch, Snacks',
          accommodation: 'Rajonikanto Hotel',
        },
        {
          day: 'Day-02', title: 'Louvre Museum – Home of the Mona Lisa', expanded: false,
          body: "Spend a full day exploring the world's largest art museum. See the Mona Lisa, Venus de Milo and thousands of masterpieces across stunning galleries.",
          transport: 'Metro, Walking',
          activities: 'Mona Lisa viewing, Egyptian Antiquities, Sculpture Gallery.',
          meals: 'Breakfast, Lunch',
          accommodation: 'Rajonikanto Hotel',
        },
        {
          day: 'Day-03', title: 'Notre-Dame – Iconic Gothic Cathedral', expanded: false,
          body: 'Visit the recently restored Notre-Dame Cathedral and explore the Île de la Cité. Walk along the Seine river banks and visit Saint-Chapelle.',
          transport: 'Walking, Boat Tour',
          activities: 'Cathedral tour, Île de la Cité, Saint-Chapelle visit.',
          meals: 'Breakfast',
          accommodation: 'Rajonikanto Hotel',
        },
      ],
    },
    {
      destination: 'South France',
      departure: 'Departure: 10:00 am – 10:30 am',
      expanded: false,
      days: [
        {
          day: 'Day-04', title: 'South France – Wine Country & Lavender Fields', expanded: false,
          body: 'Journey through the picturesque landscapes of Provence. Visit lavender fields, local wineries, and the charming village of Gordes.',
          transport: 'Car, Bus',
          activities: 'Wine tasting, Lavender field walk, Village tour.',
          meals: 'Breakfast, Dinner',
          accommodation: 'Provence Boutique Hotel',
        },
        {
          day: 'Day-05', title: 'Carcassonne – Walled Medieval City', expanded: false,
          body: "Explore the UNESCO-listed medieval citadel of Carcassonne, one of Europe's best-preserved fortified cities, before your evening departure.",
          transport: 'Car',
          activities: 'Medieval citadel tour, Rampart walk, City gate.',
          meals: 'Breakfast, Lunch',
          accommodation: 'Carcassonne Inn',
        },
      ],
    },
  ];

  expandAll = false;

  toggleDestination(i: number): void { this.itinerary[i].expanded = !this.itinerary[i].expanded; }

  toggleDay(di: number, dayIdx: number): void {
    this.itinerary[di].days[dayIdx].expanded = !this.itinerary[di].days[dayIdx].expanded;
  }

  toggleExpandAll(): void {
    this.expandAll = !this.expandAll;
    this.itinerary.forEach(d => {
      d.expanded = this.expandAll;
      d.days.forEach(day => day.expanded = this.expandAll);
    });
  }

  // ── Package Features ────────────────────────────────────────────────────────
  readonly includeFeatures = [
    'Accommodation (Hotel, Resort, Villa, Camping, etc.)',
    'Meals (Breakfast, Lunch, Dinner – specify type)',
    'Guided Tours & Excursions',
    'Entry Tickets to Attractions',
    'Adventure Activities & Travel Insurance.',
  ];

  readonly excludeFeatures = [
    'Visa Fees & Processing.',
    'Personal Expenses (Shopping, Souvenirs, Tips, etc.)',
    'Optional Excursions & Activities.',
    'Meals Not Mentioned in Itinerary.',
    'Travel Insurance (if not included).',
  ];

  // ── Additional Info ─────────────────────────────────────────────────────────
  readonly additionalInfo = [
    'Free Cancellation – Some tours offer free cancellation up to a certain period (e.g., 24–48 hours before departure).',
    "Health & Safety Guidelines – All travellers must adhere to the destination's local health and safety protocols.",
  ];

  // ── FAQ ─────────────────────────────────────────────────────────────────────
  faqs = [
    { q: 'What are the must-visit places in France?', a: 'Top destinations include Paris (Eiffel Tower, Louvre), Nice (French Riviera), Bordeaux (wine tours), Provence (lavender fields), and Normandy (Mont Saint-Michel).', open: true },
    { q: 'Do tour packages include entrance fees?', a: 'Yes, most packages include entry tickets to the major attractions listed in the itinerary. Any optional excursions would be at additional cost.', open: false },
    { q: 'What type of accommodation is included?', a: 'Our packages typically include stays in 3 to 4-star hotels, offering comfortable rooms with essential amenities. Higher or boutique categories may be available upon request.', open: false },
    { q: 'Will I get a full refund if I cancel my trip?', a: 'Cancellation policies vary depending on the package. Free cancellation is available up to 48 hours before departure on selected tours. Please check the specific package terms.', open: false },
    { q: 'What travel documents should I carry?', a: 'You should carry a valid passport, visa (if required), travel insurance documents, flight tickets, hotel confirmations, and any required vaccination certificates.', open: false },
  ];

  toggleFaq(i: number): void { this.faqs[i].open = !this.faqs[i].open; }

  // ── Reviews ─────────────────────────────────────────────────────────────────
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

  // ── Relevant Packages ───────────────────────────────────────────────────────
  readonly relevantPackages = [
    {
      title: 'Culture & Cuisine Discovery',
      badge: 'Solo Tour',
      location: 'Saudi Arabia',
      duration: '05 Days/6 Nights',
      price: 'AED 1,500',
      image: 'images/tourist-place-1.svg',
    },
    {
      title: 'Art, Music & Heritage Tour',
      badge: 'Family Tour',
      location: 'Arab Emirates',
      duration: '05 Days/6 Nights',
      price: 'AED 5,500',
      image: 'images/tourist-place-4.svg',
    },
    {
      title: 'Eco-Friendly City Ride',
      badge: 'Adventure Tour',
      location: 'Tokyo, Japan',
      duration: '05 Days/6 Nights',
      price: 'AED 1,500',
      image: 'images/tourist-place-5.svg',
    },
    {
      title: 'Kenya Safari Adventure',
      badge: 'Group Tour',
      location: 'Kenya, Africa',
      duration: '07 Days/8 Nights',
      price: 'AED 2,800',
      image: 'images/tourist-place-2.svg',
    },
    {
      title: 'Maldives Honeymoon Escape',
      badge: 'Honeymoon',
      location: 'Maldives',
      duration: '05 Days/6 Nights',
      price: 'AED 4,200',
      image: 'images/tourist-place-3.svg',
    },
    {
      title: 'Swiss Alpine Luxury Tour',
      badge: 'Luxury Tour',
      location: 'Switzerland',
      duration: '07 Days/8 Nights',
      price: 'AED 6,500',
      image: 'images/tourist-place-6.svg',
    },
  ];

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

  ngOnInit(): void {
    this.updateVisibleLocations();
    this.updateVisibleRelevantPackages();
    this.startRelevantTimer();
  }

  ngOnDestroy(): void {
    this.clearRelevantTimer();
  }

}
