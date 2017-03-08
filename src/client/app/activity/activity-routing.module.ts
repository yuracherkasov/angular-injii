import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'activity', component: ActivityComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
