import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharitiesComponent } from './charities.component';
import { ProfileComponent } from './charity/profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'charities',
        component: CharitiesComponent
      },
      {
        path: 'charity/:username',
        component: ProfileComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class CharitiesRoutingModule { }
