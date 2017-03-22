import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCommentsModule } from './../profile-comments/profile-comments.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ArtistsComponent} from './artists.component';
import { ProfileComponent } from './artist/profile.component';
import { ArtistRoutingModule } from './artist-routing.module';


@NgModule({
  imports: [CommonModule, ProfileCommentsModule, ArtistRoutingModule],
  declarations: [ArtistsComponent, ProfileComponent],
  exports: [ArtistsComponent, ProfileComponent],
  providers: []
})

export class ArtistsModule { }