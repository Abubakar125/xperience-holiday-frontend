import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DestinationsComponent } from './destinations.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DestinationsComponent }]),
    DestinationsComponent
  ]
})
export class DestinationsModule {}
