import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FaqComponent } from '../shared/components/faq/faq.component';
import { DestinationService } from '../shared/services/destination.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FaqComponent, RouterLink],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements OnInit {

  loading = true;
  error   = false;

  allDestinations: any[] = [];
  activeRegion = '';

  filterTabs = [
    { key: 'Africa',        label: 'Africa' },
    { key: 'Asia',          label: 'Asia' },
    { key: 'Europe',        label: 'Europe' },
    { key: 'Middle East',   label: 'Middle East' },
    { key: 'North America', label: 'North America' },
    { key: 'Oceania',       label: 'Oceania' },
  ];

  get availableTabs() {
    const regionsWithData = new Set(this.allDestinations.map(d => d.region).filter(Boolean));
    return this.filterTabs.filter(t => regionsWithData.has(t.key));
  }

  get filteredDestinations() {
    if (!this.activeRegion) return this.allDestinations;
    return this.allDestinations.filter(d => d.region === this.activeRegion);
  }

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe({
      next: (data) => {
        this.allDestinations = data.filter(d => d.isActive);
        const firstRegion = this.filterTabs.find(t =>
          this.allDestinations.some(d => d.region === t.key)
        );
        this.activeRegion = firstRegion?.key ?? '';
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; },
    });
  }
}
