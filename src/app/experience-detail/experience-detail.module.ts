import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExperienceDetailComponent } from './experience-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ExperienceDetailComponent }]),
    ExperienceDetailComponent
  ]
})
export class ExperienceDetailModule {}
