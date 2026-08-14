import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FaqComponent } from '../shared/components/faq/faq.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FaqComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  activeJourneyTab = '1980';

  journeyTabs = [
    {
      year: '1980',
      icon: 'icons/exciting-holidays-1980.svg',
      title: '1980 – The Birth of Exciting Holidays',
      desc: 'Founded in 1980 under the name Exciting Holidays, the brand was created as the dedicated leisure travel division of Nasser Air Travel & Shipping Agencies LLC. With a vision to make holiday experiences more accessible, memorable, and personalized, Exciting Holidays quickly became a trusted name for family vacations, international tours, and curated travel experiences across the UAE.'
    },
    {
      year: '2005',
      icon: 'icons/xperienz-travel-2005.svg',
      title: '2005 – A New Identity: Xperienz Travel',
      desc: 'Building on 25 years of trust, the brand evolved into Xperienz Travel — reflecting a broader vision and a more dynamic approach to crafting journeys. The rebrand signalled our commitment to innovation, wider destination coverage, and a deeper focus on personalized travel experiences for every kind of traveller.'
    },
    {
      year: '2016',
      icon: 'icons/xperience-2016.svg',
      title: '2016 – Xperienz Holidays is Born',
      desc: 'The brand took its defining evolution into Xperienz Holidays — a modern, vibrant identity built for today\'s traveller. Combining the heritage of nearly four decades with fresh digital capabilities, Xperienz Holidays expanded its offerings across luxury escapes, group tours, cruises, MICE solutions, and bespoke holiday packages for destinations around the world.'
    }
  ];

  whyCards = [
    { bg: '#37a0c7', icon: 'icons/expertly-tours.png',    label: 'Expertly Curated Tours.' },
    { bg: '#f9a147', icon: 'icons/affordable-package.png', label: 'Affordable & Flexible Packages.' },
    { bg: '#00589c', icon: 'icons/customer-support.png',   label: '24/7 Customer Support.' },
    { bg: '#37a0c7', icon: 'icons/certified.png',          label: 'Certified & Experienced Guides.' }
  ];

  milestones = [
    { year: '1974', title: 'Founded in UAE', desc: 'Xperienz Holidays was established, becoming one of the UAE\'s earliest travel specialists.' },
    { year: '1995', title: 'GSA Partnership', desc: 'Appointed as General Sales Agent (GSA) for Air Mauritius in the UAE, a relationship we proudly carry to this day.' },
    { year: '2005', title: 'MICE Division Launch', desc: 'Expanded into corporate travel with a dedicated MICE division serving businesses across the region.' },
    { year: '2024', title: '100K+ Happy Travellers', desc: 'Crossed the milestone of 100,000 satisfied travellers and 30,000+ holidays planned.' }
  ];

  values = [
    {
      icon: 'icons/happy-traveler.png',
      title: 'Client First',
      desc: 'Every itinerary is crafted around your preferences, budget, and travel dreams — nothing generic, ever.'
    },
    {
      icon: 'icons/travel-experience.png',
      title: '50+ Years of Expertise',
      desc: 'Decades of industry knowledge mean we know the destinations, the airlines, and the hidden gems.'
    },
    {
      icon: 'icons/retention-rate.png',
      title: '98% Satisfaction Rate',
      desc: 'Our travellers come back — and they bring their families. That loyalty is our greatest achievement.'
    },
    {
      icon: 'icons/tours.png',
      title: 'End-to-End Service',
      desc: 'Flights, hotels, visas, transfers, insurance — we handle every detail so you travel stress-free.'
    }
  ];
}
