import { Component, Input } from '@angular/core';
import { SelectVideoService } from '../select-video.service';

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

  constructor (private selectVideoService: SelectVideoService) {
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
    this.selectVideoService.selectVideo(video.src);
  }


}
