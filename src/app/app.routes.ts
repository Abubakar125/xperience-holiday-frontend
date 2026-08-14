import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'experiences',
    loadChildren: () => import('./experiences/experiences.module').then(m => m.ExperiencesModule)
  },
  {
    path: 'destinations',
    loadChildren: () => import('./destinations/destinations.module').then(m => m.DestinationsModule)
  },
  {
    path: 'destination/:id',
    loadChildren: () => import('./destination-detail/destination-detail.module').then(m => m.DestinationDetailModule)
  },
  {
    path: 'experience/:id',
    loadChildren: () => import('./experience-detail/experience-detail.module').then(m => m.ExperienceDetailModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'holidays-tour',
    loadChildren: () => import('./holidays-tour/holidays-tour.module').then(m => m.HolidaysTourModule)
  },
  {
    path: 'holidays-tour/:id',
    loadChildren: () => import('./holidays-tour-detail/holidays-tour-detail.module').then(m => m.HolidaysTourDetailModule)
  }
];
