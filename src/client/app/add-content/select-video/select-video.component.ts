import { Component, OnInit } from '@angular/core';
import { SelectVideoService } from './select-video.service';

import { IVideo } from '../models/video';

@Component({
  moduleId: module.id,
  selector: 'select-video',
  templateUrl: 'select-video.component.html',
  styleUrls: ['select-video.component.css']
})


export class SelectVideoComponent implements OnInit{

  videos: Array<IVideo> = [];
  bigNum: number = 9999;
  selectedVideo: number = this.bigNum;
  cssClassValue: number = this.bigNum;

  constructor (private selectVideoService: SelectVideoService) {
  }

  ngOnInit(): void {
    this.videos = [
      {
        date: "Nov 16 2016 4:37:24 pm",
        title: "First video",
        viewers: null,
        preview: null,
        src: "https://s3.amazonaws.com/chronoadvertisement/2016/579b9a6b5f303_1469815403.mp4",
        donations: 0,
        id: "65rewr45",
        charity: {
          id: null,
          charityname: "bestname",
          firstname: "Sam",
          lastname: "Jonson",
          username: "bestusername"
        }
      },
      {
        date: "June 29 2017 6:56:54 pm",
        title: "Second video",
        viewers: null,
        preview: null,
        src: "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
        donations: 0,
        id: "56yhrt67",
        charity: {
          id: null,
          charityname: "bestname",
          firstname: "Sam",
          lastname: "Jonson",
          username: "bestusername"
        }
      },
      {
        date: "June 29 2017 6:56:54 pm",
        title: "Third video",
        viewers: null,
        preview: null,
        src: "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
        donations: 0,
        id: "hrtw7wr45",
        charity: {
          id: null,
          charityname: "bestname",
          firstname: "Sam",
          lastname: "Jonson",
          username: "bestusername"
        }
      }
    ]
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
