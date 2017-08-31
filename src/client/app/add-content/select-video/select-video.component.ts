import { Component, Input } from '@angular/core';
import { VideoPreviewService } from '../preview/video-preview.service';

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
  showBar: boolean;

  constructor (private videoPreviewService: VideoPreviewService) {
  }

  selectVideo(video: IVideo, n: number): void {
    if (this.selectedVideo === n){
      this.cssClassValue = this.bigNum;
      setTimeout(() => {
        this.selectedVideo = this.bigNum;
      }, 340);
    } else if (this.selectedVideo === this.bigNum) {
      this.selectedVideo = n;
      this.cssClassValue = n;
    } else {
      this.cssClassValue = this.bigNum;
      setTimeout(() => {
        this.selectedVideo = n;
        this.cssClassValue = n;
      }, 340);
    }
    this.videoPreviewService.selectVideo(video.src);
  }

  onGetShedule(response: any): void {
    if(response.result = 'OK'){
      this.shedule = response;
      this.showBar = true;
    }
    console.log(response);
  }


}
