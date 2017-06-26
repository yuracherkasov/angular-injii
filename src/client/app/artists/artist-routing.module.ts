import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { ProfileComponent } from './artist/profile.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'artists',
        canActivate: [AuthGuardService],
        component: ArtistsComponent
      },
      {
        path: 'artists/:username',
        canActivate: [AuthGuardService],
        component: ProfileComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }

// export const ArtistsRoutes: Routes = [
//   {
//     path: 'artists',
//     canActivate: [AuthGuardService],
//     component: ArtistsComponent   
//   },
//   {
//     path: 'artists/:username',
//     canActivate: [AuthGuardService],
//     component: ProfileComponent
//   }
// ]

