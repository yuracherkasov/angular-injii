import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FileUploadModule } from 'ng2-file-upload';
import { AddContentRoutingModule } from './add-content-routing.module';

import { AddContentComponent } from './add-content.component';
import { ScheduleBarComponent } from './schedule/schedule-bar.component';
import { VideoPreviewComponent } from './preview/video-preview.component';
import { SelectVideoComponent } from './select-video/select-video.component';
import { SelectTimeComponent } from './select-video/select-time/select-time.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SelectCharityComponent } from './upload-video/select-charity/select-charity.component';

import { ScheduleBarService } from './schedule/schedule-bar.service';
import { AddContentService } from './add-content.service';
import { AddContentGuardService } from './add-content-guard.service';
import { VideoDurationService } from './video-duration.service';
import { SelectVideoService } from './select-video.service';

@NgModule({
    imports: [
      CommonModule,
      AddContentRoutingModule,
      FileUploadModule,
      FormsModule,
      DatepickerModule.forRoot(),
      PopoverModule.forRoot()
    ],
    declarations: [
      AddContentComponent,
      VideoPreviewComponent,
      SelectVideoComponent,
      SelectTimeComponent,
      UploadVideoComponent,
      SelectCharityComponent
    ],
    exports: [AddContentComponent],
    providers: [
      ScheduleBarService,
      AddContentService,
      AddContentGuardService,
      VideoDurationService,
      SelectVideoService
    ]
})

export class AddContentModule { }
