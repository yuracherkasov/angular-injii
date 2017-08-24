import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

import { DatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../shared/shared.module';

import { AddContentComponent } from './add-content.component';
import { ScheduleBarComponent } from './schedule/schedule-bar.component';
import { VideoPreviewComponent } from './preview/video-preview.component';
import { SelectVideoComponent } from './select-video/select-video.component';
import { SelectTimeComponent } from './select-video/select-time/select-time.component';

import { ScheduleBarService } from './schedule/schedule-bar.service';
import { AddContentService } from './add-content.service';
import { AddContentGuardService } from './add-content-guard.service';
import { DateHelperService } from './date-helper.service';
import { SelectVideoService } from './select-video/select-video.service';
import { AddContentRoutingModule } from './add-content-routing.module';


@NgModule({
    imports: [
      CommonModule,
      // MyDatePickerModule,
      AddContentRoutingModule,
      SharedModule,
      DatepickerModule.forRoot()
    ],
    declarations: [
      AddContentComponent,
      ScheduleBarComponent,
      VideoPreviewComponent,
      SelectVideoComponent,
      SelectTimeComponent
    ],
    exports: [AddContentComponent],
    providers: [
      ScheduleBarService,
      AddContentService,
      AddContentGuardService,
      DateHelperService,
      SelectVideoService
    ]
})

export class AddContentModule { }
