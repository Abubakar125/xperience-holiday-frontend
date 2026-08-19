import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HolidayService } from '../shared/services/holiday.service';

interface CardItem {
  id: number;
  image: string;
  badge: string;
  badgeColor: '' | 'orange' | 'green';
  title: string;
  location: string;
  duration: string;
  price: string;
}

@Component({
  selector: 'app-holidays-tour',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './holidays-tour.component.html',
  styleUrl: './holidays-tour.component.scss'
})
export class HolidaysTourComponent implements OnInit {

  // ── API state ─────────────────────────────────────────────────────────────
  private allHolidays: any[] = [];
  cards: CardItem[] = [];
  loading = true;
  totalItems = 0;

  // ── Pagination ────────────────────────────────────────────────────────────
  readonly PAGE_SIZE = 6;
  currentPage = 1;

  get pageNums(): number[] {
    return Array.from({ length: Math.max(1, Math.ceil(this.totalItems / this.PAGE_SIZE)) }, (_, i) => i + 1);
  }

  // ── Sort ──────────────────────────────────────────────────────────────────
  sortMode = 'Default';

  // ── Filter sidebar ────────────────────────────────────────────────────────
  expandedRegion = 'Africa';

  regions = [
    {
      key: 'Africa',
      items: [
        { name: 'Senegal',      count: '01' },
        { name: 'Zimbabwe',     count: '01' },
        { name: 'Ghana',        count: '01' },
        { name: 'Morocco',      count: '01' },
        { name: 'South Africa', count: '01' },
        { name: 'Madagascar',   count: '00' },
        { name: 'Kenya',        count: '01' },
        { name: 'Egypt',        count: '00' },
      ]
    },
    { key: 'Asia',          items: [] },
    { key: 'Europe',        items: [] },
    { key: 'Middle East',   items: [] },
    { key: 'North America', items: [] },
    { key: 'Oceania',       items: [] },
  ];

  tourTypes = ['Adventure Tour', 'Family Tour', 'Group Tour', 'Solo Tour', 'Luxury Tour', 'Honeymoon', 'Cruise', 'MICE'];
  activeTourTypes: string[] = [];

  experienceFilters = [
    { name: 'Stories in Every Step',   count: '03' },
    { name: 'Unforgettable Journeys',  count: '06' },
    { name: 'Wander & Discover',       count: '09' },
    { name: 'Zip-lining & Canopy',     count: '04' },
    { name: 'Skydiving & Paragliding', count: '06' },
    { name: 'Surfing & Waterfalls',    count: '03' },
  ];

  offerFilters = [
    { name: 'Last Minutes Deal', count: '11' },
    { name: 'Special Offer',     count: '12' },
  ];

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.holidayService.getHolidays().subscribe({
      next: (data) => {
        this.allHolidays = data.filter(h => h.isActive);
        this.updateView();
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  // ── Core view update ──────────────────────────────────────────────────────
  private updateView(): void {
    let filtered = [...this.allHolidays];

    if (this.activeTourTypes.length > 0) {
      filtered = filtered.filter(h => this.activeTourTypes.includes(h.type));
    }

    switch (this.sortMode) {
      case 'Price High': filtered.sort((a, b) => b.price - a.price); break;
      case 'Price Low':  filtered.sort((a, b) => a.price - b.price); break;
      case 'Latest':     filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }

    this.totalItems = filtered.length;
    const start = (this.currentPage - 1) * this.PAGE_SIZE;
    this.cards = filtered.slice(start, start + this.PAGE_SIZE).map(h => this.toCard(h));
  }

  private toCard(h: any): CardItem {
    return {
      id:         h.id,
      image:      h.heroImages?.[0] || 'images/tourist-place-1.svg',
      badge:      h.badge || h.type || 'Holiday',
      badgeColor: '',
      title:      h.title,
      location:   (h.location || h.destinationTitle || '').toUpperCase(),
      duration:   h.summary || h.duration || '',
      price:      `AED ${Number(h.price).toLocaleString()}`,
    };
  }

  // ── Sort / filter handlers ────────────────────────────────────────────────
  onSortChange(): void {
    this.currentPage = 1;
    this.updateView();
  }

  toggleTourType(type: string): void {
    const idx = this.activeTourTypes.indexOf(type);
    if (idx >= 0) this.activeTourTypes.splice(idx, 1);
    else this.activeTourTypes.push(type);
    this.currentPage = 1;
    this.updateView();
  }

  isTourTypeActive(type: string): boolean { return this.activeTourTypes.includes(type); }

  clearAll(): void {
    this.activeTourTypes = [];
    this.sortMode = 'Default';
    this.currentPage = 1;
    this.updateView();
  }

  // ── Pagination ────────────────────────────────────────────────────────────
  goToPage(page: number): void {
    if (page < 1 || page > this.pageNums.length) return;
    this.currentPage = page;
    this.updateView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Sidebar accordion ─────────────────────────────────────────────────────
  toggleRegion(key: string): void {
    this.expandedRegion = this.expandedRegion === key ? '' : key;
  }

  formatPage(n: number): string { return n < 10 ? `0${n}` : `${n}`; }
}
