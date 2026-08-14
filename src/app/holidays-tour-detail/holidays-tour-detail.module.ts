import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HolidaysTourDetailComponent } from './holidays-tour-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: HolidaysTourDetailComponent }]),
    HolidaysTourDetailComponent
  ]
})
export class HolidaysTourDetailModule {}
