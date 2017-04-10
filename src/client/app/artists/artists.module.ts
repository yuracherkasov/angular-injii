import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCommentsModule } from './../profile-comments/profile-comments.module';
import { ArtistsComponent} from './artists.component';
import { ProfileComponent } from './artist/profile.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  imports: [CommonModule, ProfileCommentsModule, ArtistRoutingModule, TooltipModule.forRoot()],
  declarations: [ArtistsComponent, ProfileComponent],
  exports: [ArtistsComponent, ProfileComponent],
  providers: []
})

export class ArtistsModule {}