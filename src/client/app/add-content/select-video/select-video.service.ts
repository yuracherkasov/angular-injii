import { Injectable } from '@angular/core';
import { IVideo } from '../models/video';

@Injectable()

export class SelectVideoService {

  selectedVideo: IVideo;

  setVideo(video: IVideo): void{
    this.selectedVideo = video;
  }


}