import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { ProfileComponent } from './artist/profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'artists',
        component: ArtistsComponent
      },
      {
        path: 'artists/:username',
        component: ProfileComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
