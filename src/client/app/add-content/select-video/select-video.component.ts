import { Component, Input } from '@angular/core';
import { VideoPreviewService } from '../preview/video-preview.service';
import { SelectVideoService } from './select-video.service';

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

  constructor
    (
      private videoPreviewService: VideoPreviewService,
      private selectVideoService: SelectVideoService
    ) {
  }

  selectVideo(video: IVideo, n: number): void {
    this.shedule = {};
    this.selectVideoService.setVideo(video);
    this.videoPreviewService.selectVideo(video.src);
    if (this.selectedVideo === n){
      this.cssClassValue = this.bigNum;
      setTimeout(() => {
        this.selectedVideo = this.bigNum;
        this.showShedule = false;
      }, 340);
    } else if (this.selectedVideo === this.bigNum) {
      this.selectedVideo = n;
      this.cssClassValue = n;
    } else {
      this.cssClassValue = this.bigNum;
      setTimeout(() => {
        this.selectedVideo = n;
        this.cssClassValue = n;
        this.showShedule = false;
      }, 340);
    }
  }

  onGetShedule(response: any): void {
    if(response.result = 'OK'){
      this.shedule = response;
      this.showShedule = true;
    }
  }

}
