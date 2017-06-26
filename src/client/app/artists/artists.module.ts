import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCommentsModule } from './../profile-comments/profile-comments.module';
import { ArtistsComponent } from './artists.component';
import { ProfileComponent } from './artist/profile.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { ListComponent } from './list/list.component';


@NgModule({
  imports: [CommonModule, ProfileCommentsModule, TooltipModule.forRoot(), VirtualScrollModule, ArtistRoutingModule],
  declarations: [ArtistsComponent, ProfileComponent, ListComponent],
  exports: [ArtistsComponent, ProfileComponent],
  providers: []
})

export class ArtistsModule {}
