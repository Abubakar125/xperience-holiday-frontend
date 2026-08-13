import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExperiencesComponent } from './experiences.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ExperiencesComponent }]),
    ExperiencesComponent
  ]
})
export class ExperiencesModule {}
