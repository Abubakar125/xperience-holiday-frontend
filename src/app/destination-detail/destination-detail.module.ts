import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DestinationDetailComponent } from './destination-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DestinationDetailComponent }]),
    DestinationDetailComponent
  ]
})
export class DestinationDetailModule {}
