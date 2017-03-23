import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCommentsModule } from './../profile-comments/profile-comments.module';
import { CharitiesComponent } from './charities.component';
import { ProfileComponent } from './charity/profile.component';
import { CharitiesRoutingModule } from './charity-routing.module';

@NgModule({
    imports: [CommonModule, ProfileCommentsModule, CharitiesRoutingModule],
    declarations: [CharitiesComponent, ProfileComponent],
    exports: [CharitiesComponent, ProfileComponent],
    providers: []
})

export class CharitiesModule { };