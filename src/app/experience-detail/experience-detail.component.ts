import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './experience-detail.component.html',
  styleUrl: './experience-detail.component.scss'
})
export class ExperienceDetailComponent {

  readonly highlights = [
    'Eiffel Tower – Skip-the-line access & breathtaking views from the summit.',
    'Louvre Museum – See the Mona Lisa and world-renowned masterpieces.',
    'South France – Scenic countryside, vineyards & coastal villages.',
    'Gudauri – Dramatic Caucasus mountain landscapes & ski resort area.',
  ];

  readonly details = [
    { icon: 'icons/accomodation.png',   label: 'Accomodation',  value: '5 Star Hotel' },
    { icon: 'icons/meals.png',          label: 'Meals',         value: 'Breakfast & Dinner' },
    { icon: 'icons/transportation.png', label: 'Transportation', value: 'Taxi,Car' },
    { icon: 'icons/group-size.png',     label: 'Group Size',    value: '10-20' },
    { icon: 'icons/language.png',       label: 'Language',      value: 'English, Spanish' },
    { icon: 'icons/animal.png',         label: 'Animal',        value: 'Cat, Pet only' },
    { icon: 'icons/age-range.png',      label: 'Age Range',     value: '18-45 (Year)' },
    { icon: 'icons/season.png',         label: 'Season',        value: 'Winter Season' },
    { icon: 'icons/category.png',       label: 'Category',      value: 'Adventure' },
  ];

  readonly locations = [
    { name: 'Loire Valley',    days: '(01 Days)', image: 'images/tourist-place-1.svg' },
    { name: 'Southern France', days: '(01 Days)', image: 'images/tourist-place-2.svg' },
    { name: 'Louvre Museum',   days: '(03 Days)', image: 'images/tourist-place-3.svg' },
  ];
}
