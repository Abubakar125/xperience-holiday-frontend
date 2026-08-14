import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HolidaysTourComponent } from './holidays-tour.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: HolidaysTourComponent }]),
    HolidaysTourComponent
  ]
})
export class HolidaysTourModule {}
