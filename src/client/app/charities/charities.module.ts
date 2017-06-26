import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCommentsModule } from './../profile-comments/profile-comments.module';
import { CharitiesComponent } from './charities.component';
import { ProfileComponent } from './charity/profile.component';
import { CharitiesRoutingModule } from './charity-routing.module';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { ListComponent } from './list/list.component';

@NgModule({
    imports: [CommonModule, ProfileCommentsModule, VirtualScrollModule, CharitiesRoutingModule],
    declarations: [CharitiesComponent, ProfileComponent, ListComponent],
    exports: [CharitiesComponent, ProfileComponent],
    providers: []
})

export class CharitiesModule { };
