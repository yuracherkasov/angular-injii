import { Component, Input } from '@angular/core';
import { VideoPreviewService } from '../preview/video-preview.service';
import { SelectVideoService } from './select-video.service';
import { AgreementService } from '../agreement/agreement.service';
import { ScheduleBarService } from './schedule/schedule-bar.service';

import { IVideo } from '../models/video';

@Component({
  moduleId: module.id,
  selector: 'select-video',
  templateUrl: 'select-video.component.html',
  styleUrls: ['select-video.component.css']
})


export class SelectVideoComponent {

  @Input() videos: Array<IVideo> = [];

  bigNum: number = 9999;
  selectedVideo: number = this.bigNum;
  cssClassValue: number = this.bigNum;
  shedule: any = {};
  showShedule: boolean;
  showDatapicker: boolean = true;
  message: string = '';
  loading: boolean;
  private video: IVideo;

  constructor
    (
    private videoPreviewService: VideoPreviewService,
    private agreementService: AgreementService,
    private selectVideoService: SelectVideoService,
    private scheduleBarService: ScheduleBarService
    ) {
    this.agreementService.acceptedAgreementObservable
      .subscribe((val) => {
        if (val) {
          this.onConfirmAccepts()
        }
      })
  }

  selectVideo(video: IVideo, n: number): void {
    this.shedule = {};
    this.video = video;
    this.videoPreviewService.selectVideo(video.src);
    if (this.selectedVideo === n) {
      this.cssClassValue = this.bigNum;
      setTimeout(() => {
        this.selectedVideo = this.bigNum;
        this.showShedule = false;
        this.showDatapicker = false;
      }, 340);
    } else if (this.selectedVideo === this.bigNum) {
      this.selectedVideo = n;
      this.cssClassValue = n;
      this.showDatapicker = true;
    } else {
      this.cssClassValue = this.bigNum;
      setTimeout(() => {
        this.selectedVideo = n;
        this.cssClassValue = n;
        this.showShedule = false;
        this.showDatapicker = true;
      }, 340);
    }
    setTimeout(() => {
        this.message = '';
    }, 340);  
  }

  getShedule(param: any): void {
    this.showDatapicker = false;
    this.loading = true;
    this.selectVideoService.getShedule(param)
      .then(response => {
        if (response.result = 'OK') {
          this.shedule = response;
          this.showShedule = true;
        } else if ( response.result = 'FAIL' ) {
          this.message = response.message;
        }
        this.loading = false;
      })
  }

  onConfirmAccepts() {
    this.showShedule = false;
    this.loading = true;
    let data = {
      id: this.video.id,
      data: this.scheduleBarService.selectedDate,
      timezone: this.scheduleBarService.selectedTimezone,
      time: this.scheduleBarService.selectedTime
    }
    console.log("confirm data: ", data);
    this.selectVideoService.submitDate(data)
      .then(response => {
        if (response.result === 'OK') {
          
        }
        if (response.message) {
          this.message = response.message;
        }
        this.loading = false;
      })
  }

}
