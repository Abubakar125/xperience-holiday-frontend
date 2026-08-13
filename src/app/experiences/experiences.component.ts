import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent {

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

  tourTypes = ['Adventure Tour', 'Family Tour', 'Group Tour', 'Solo Tour'];
  activeTourTypes: string[] = [];

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

  cards = [
    {
      id: 1,
      image: 'images/tourist-place-1.svg',
      badge: 'Solo Tour', badgeColor: '',
      title: 'Cultural & Cuisine Discovery',
      location: 'KENYA', duration: '05 Days/6 Nights', price: 'AED 1,500'
    },
    {
      id: 2,
      image: 'images/tourist-place-2.svg',
      badge: 'Sale', badgeColor: 'orange',
      title: "Morocco's Landmarks Journey",
      location: 'MOROCCO', duration: '07 Days/8 Nights', price: 'AED 5,500'
    },
    {
      id: 3,
      image: 'images/tourist-place-3.svg',
      badge: 'New', badgeColor: 'green',
      title: 'Art, Music & Heritage Tour',
      location: 'FRANCE', duration: '07 Days/8 Nights', price: 'AED 1,500'
    },
    {
      id: 4,
      image: 'images/tourist-place-4.svg',
      badge: 'Family Tour', badgeColor: '',
      title: 'Eco-Friendly City Ride',
      location: 'PARIS', duration: '03 Days/4 Nights', price: 'AED 909'
    },
    {
      id: 5,
      image: 'images/tourist-place-5.svg',
      badge: 'Solo Tour', badgeColor: '',
      title: 'Exotic Adventure Retreat',
      location: 'KENYA', duration: '04 Days/5 Nights', price: 'AED 2,500'
    },
    {
      id: 6,
      image: 'images/tourist-place-6.svg',
      badge: 'Sale', badgeColor: 'orange',
      title: 'Jain Hiking & Orchid Adventure',
      location: 'GHANA', duration: '05 Days/6 Nights', price: 'AED 1,999'
    },
    {
      id: 7,
      image: 'images/tourist-place-2.svg',
      badge: 'Sale', badgeColor: 'orange',
      title: "Morocco's Landmarks Journey",
      location: 'MOROCCO', duration: '07 Days/8 Nights', price: 'AED 5,500'
    },
    {
      id: 8,
      image: 'images/tourist-place-3.svg',
      badge: 'New', badgeColor: 'green',
      title: 'Art, Music & Heritage Tour',
      location: 'FRANCE', duration: '07 Days/8 Nights', price: 'AED 1,500'
    },
  ];

  toggleRegion(key: string): void {
    this.expandedRegion = this.expandedRegion === key ? '' : key;
  }

  toggleTourType(type: string): void {
    const idx = this.activeTourTypes.indexOf(type);
    if (idx >= 0) this.activeTourTypes.splice(idx, 1);
    else this.activeTourTypes.push(type);
  }

  isTourTypeActive(type: string): boolean {
    return this.activeTourTypes.includes(type);
  }
}
