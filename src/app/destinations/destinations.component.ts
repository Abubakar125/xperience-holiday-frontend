import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FaqComponent } from '../shared/components/faq/faq.component';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FaqComponent, RouterLink],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent {

  activeRegion = 'Africa';

  filterTabs = [
    { key: 'Africa',        label: 'Africa' },
    { key: 'Asia',          label: 'Asia' },
    { key: 'Europe',        label: 'Europe' },
    { key: 'Middle East',   label: 'Middle East' },
    { key: 'North America', label: 'North America' },
    { key: 'Oceania',       label: 'Oceania' }
  ];

  allDestinations = [
    // Africa
    { image: 'images/adventure-tours.png',   name: 'Kenya',         region: 'Africa' },
    { image: 'images/group-travel.png',      name: 'Zimbabwe',      region: 'Africa' },
    { image: 'images/mauritius-beach.png',   name: 'Tunisia',       region: 'Africa' },
    { image: 'images/mauritius.jpg',         name: 'Ethiopia',      region: 'Africa' },
    { image: 'images/family-holidays.png',   name: 'Morocco',       region: 'Africa' },
    { image: 'images/cruises.png',           name: 'Tanzania',      region: 'Africa' },
    { image: 'images/adventure-tours.png',   name: 'Mauritius',     region: 'Africa' },
    { image: 'images/group-travel.png',      name: 'South Africa',  region: 'Africa' },
    { image: 'images/adventure-tours.png',   name: 'Kenya',         region: 'Africa' },
    { image: 'images/group-travel.png',      name: 'Zimbabwe',      region: 'Africa' },
    { image: 'images/mauritius-beach.png',   name: 'Tunisia',       region: 'Africa' },
    { image: 'images/mauritius.jpg',         name: 'Ethiopia',      region: 'Africa' },
    { image: 'images/family-holidays.png',   name: 'Morocco',       region: 'Africa' },
    { image: 'images/cruises.png',           name: 'Tanzania',      region: 'Africa' },
    { image: 'images/adventure-tours.png',   name: 'Mauritius',     region: 'Africa' },
    { image: 'images/group-travel.png',      name: 'South Africa',  region: 'Africa' },
    // Asia
    { image: 'images/couples-honeymoon.png', name: 'Maldives',      region: 'Asia' },
    { image: 'images/family-holidays.png',   name: 'Thailand',      region: 'Asia' },
    { image: 'images/luxury-holidays.png',   name: 'Bali',          region: 'Asia' },
    { image: 'images/mauritius-beach.png',   name: 'Japan',         region: 'Asia' },
    { image: 'images/couples-honeymoon.png', name: 'Sri Lanka',     region: 'Asia' },
    { image: 'images/family-holidays.png',   name: 'Vietnam',       region: 'Asia' },
    { image: 'images/luxury-holidays.png',   name: 'Singapore',     region: 'Asia' },
    { image: 'images/mauritius-beach.png',   name: 'Malaysia',      region: 'Asia' },
    { image: 'images/couples-honeymoon.png', name: 'Maldives',      region: 'Asia' },
    { image: 'images/family-holidays.png',   name: 'Thailand',      region: 'Asia' },
    { image: 'images/luxury-holidays.png',   name: 'Bali',          region: 'Asia' },
    { image: 'images/mauritius-beach.png',   name: 'Japan',         region: 'Asia' },
    { image: 'images/couples-honeymoon.png', name: 'Sri Lanka',     region: 'Asia' },
    { image: 'images/family-holidays.png',   name: 'Vietnam',       region: 'Asia' },
    { image: 'images/luxury-holidays.png',   name: 'Singapore',     region: 'Asia' },
    { image: 'images/mauritius-beach.png',   name: 'Malaysia',      region: 'Asia' },
    // Europe
    { image: 'images/luxury-holidays.png',   name: 'Switzerland',   region: 'Europe' },
    { image: 'images/couples-honeymoon.png', name: 'France',        region: 'Europe' },
    { image: 'images/cruises.png',           name: 'Italy',         region: 'Europe' },
    { image: 'images/family-holidays.png',   name: 'Greece',        region: 'Europe' },
    { image: 'images/luxury-holidays.png',   name: 'Austria',       region: 'Europe' },
    { image: 'images/couples-honeymoon.png', name: 'Portugal',      region: 'Europe' },
    { image: 'images/cruises.png',           name: 'Spain',         region: 'Europe' },
    { image: 'images/family-holidays.png',   name: 'Norway',        region: 'Europe' },
    { image: 'images/luxury-holidays.png',   name: 'Switzerland',   region: 'Europe' },
    { image: 'images/couples-honeymoon.png', name: 'France',        region: 'Europe' },
    { image: 'images/cruises.png',           name: 'Italy',         region: 'Europe' },
    { image: 'images/family-holidays.png',   name: 'Greece',        region: 'Europe' },
    { image: 'images/luxury-holidays.png',   name: 'Austria',       region: 'Europe' },
    { image: 'images/couples-honeymoon.png', name: 'Portugal',      region: 'Europe' },
    { image: 'images/cruises.png',           name: 'Spain',         region: 'Europe' },
    { image: 'images/family-holidays.png',   name: 'Norway',        region: 'Europe' },
    // Middle East
    { image: 'images/luxury-holidays.png',   name: 'Dubai',         region: 'Middle East' },
    { image: 'images/mauritius-beach.png',   name: 'Oman',          region: 'Middle East' },
    { image: 'images/family-holidays.png',   name: 'Jordan',        region: 'Middle East' },
    { image: 'images/cruises.png',           name: 'Egypt',         region: 'Middle East' },
    // North America
    { image: 'images/adventure-tours.png',   name: 'USA',           region: 'North America' },
    { image: 'images/family-holidays.png',   name: 'Canada',        region: 'North America' },
    { image: 'images/mauritius-beach.png',   name: 'Mexico',        region: 'North America' },
    { image: 'images/cruises.png',           name: 'Caribbean',     region: 'North America' },
    // Oceania
    { image: 'images/cruises.png',           name: 'Australia',     region: 'Oceania' },
    { image: 'images/mauritius-beach.png',   name: 'New Zealand',   region: 'Oceania' },
    { image: 'images/couples-honeymoon.png', name: 'Fiji',          region: 'Oceania' },
    { image: 'images/family-holidays.png',   name: 'Tahiti',        region: 'Oceania' }
  ];

  get filteredDestinations() {
    return this.allDestinations.filter(d => d.region === this.activeRegion);
  }

}
