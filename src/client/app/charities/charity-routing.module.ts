import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharitiesComponent } from './charities.component';
import { ProfileComponent } from './charity/profile.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'charities',
        canActivate: [AuthGuardService],
        component: CharitiesComponent
      },
      {
        path: 'charity/:username',
        canActivate: [AuthGuardService],
        component: ProfileComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class CharitiesRoutingModule { }

