import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

import { SharedModule } from "../shared/shared.module";

import { AddContentComponent } from './add-content.component';
import { ScheduleBarComponent } from "./schedule/schedule-bar.component";
import { VideoPreviewComponent } from "./preview/video-preview.component"

import { ScheduleBarService } from "./schedule/schedule-bar.service";
import { ArtistProfileService } from "./add-content.service";
import { DateHelperService } from '../services/date-helper.service';
import { AddContentRoutingModule } from "./add-content-routing.module";


@NgModule({
    imports: [
      CommonModule,
      MyDatePickerModule,
      AddContentRoutingModule,
      SharedModule
    ],
    declarations: [
      AddContentComponent,
      ScheduleBarComponent,
      VideoPreviewComponent
    ],
    exports: [AddContentComponent],
    providers: [
      ScheduleBarService,
      ArtistProfileService,
      DateHelperService
    ]
})

export class AddContentModule { }
