import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ExperienceService } from '../shared/services/experience.service';

interface CardItem {
  id: number;
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  location: string;
  duration: string;
  price: string;
}

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent implements OnInit {

  expandedRegion = 'Africa';
  loading = true;
  allExperiences: any[] = [];
  cards: CardItem[] = [];
  totalItems = 0;

  readonly PAGE_SIZE = 6;
  currentPage = 1;
  sortMode = 'Default';
  activeTourTypes: string[] = [];

  get pageNums(): number[] {
    const count = Math.ceil(this.totalItems / this.PAGE_SIZE);
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  formatPage(n: number): string { return n < 10 ? `0${n}` : `${n}`; }

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

  tourTypes = ['Adventure Tour', 'Family Tour', 'Group Tour', 'Solo Tour', 'Cultural Tour', 'Luxury Tour'];

  experienceFilters = [
    { name: 'Stories in Every Step',    count: '03' },
    { name: 'Unforgettable Journeys',   count: '06' },
    { name: 'Wander & Discover',        count: '09' },
    { name: 'Zip-lining & Canopy',      count: '04' },
    { name: 'Skydiving & Paragliding',  count: '06' },
    { name: 'Surfing & Waterfalls',     count: '03' },
  ];

  offerFilters = [
    { name: 'Last Minutes Deal', count: '11' },
    { name: 'Special Offer',     count: '12' },
  ];

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.allExperiences = data.filter((e: any) => e.isActive);
        this.loading = false;
        this.updateView();
      },
      error: () => { this.loading = false; },
    });
  }

  updateView(): void {
    let filtered = [...this.allExperiences];

    if (this.activeTourTypes.length > 0) {
      filtered = filtered.filter(e => this.activeTourTypes.includes(e.type));
    }

    if (this.sortMode === 'Latest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (this.sortMode === 'Price High') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortMode === 'Price Low') {
      filtered.sort((a, b) => a.price - b.price);
    }

    this.totalItems = filtered.length;
    const start = (this.currentPage - 1) * this.PAGE_SIZE;
    this.cards = filtered.slice(start, start + this.PAGE_SIZE).map(e => this.toCard(e));
  }

  private toCard(e: any): CardItem {
    return {
      id: e.id,
      image: e.heroImages?.[0] || 'images/tourist-place-1.svg',
      badge: e.badge || e.type || 'Experience',
      badgeColor: '',
      title: e.title,
      location: (e.location || e.destinationTitle || '').toUpperCase(),
      duration: e.summary || e.duration || '',
      price: `AED ${Number(e.price).toLocaleString()}`,
    };
  }

  onSortChange(): void { this.currentPage = 1; this.updateView(); }
  goToPage(n: number): void { this.currentPage = n; this.updateView(); }

  clearAll(): void { this.activeTourTypes = []; this.currentPage = 1; this.updateView(); }

  toggleRegion(key: string): void {
    this.expandedRegion = this.expandedRegion === key ? '' : key;
  }

  toggleTourType(type: string): void {
    const idx = this.activeTourTypes.indexOf(type);
    if (idx >= 0) this.activeTourTypes.splice(idx, 1);
    else this.activeTourTypes.push(type);
    this.currentPage = 1;
    this.updateView();
  }

  isTourTypeActive(type: string): boolean {
    return this.activeTourTypes.includes(type);
  }
}
