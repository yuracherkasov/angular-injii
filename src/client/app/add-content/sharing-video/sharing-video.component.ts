import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SharingSocialService } from '../../services/sharing-social.service';
import { ConstantsService } from '../../services/constants.service';
import { IVideo } from '../models/video';

@Component({
  moduleId: module.id,
  selector: 'sharing-video',
  templateUrl: 'sharing-video.component.html',
  styleUrls: ['sharing-video.component.css']
})


export class SharingVideoComponent implements AfterViewInit {


  @Input() videos: any;
  @ViewChild('sharegoogle') sharegoogle: ElementRef;
  message: string;
  TwitterURL: string;

  constructor
    (
      private sharingSocialService: SharingSocialService,
      private constantsService: ConstantsService
    ) {
  }

  ngAfterViewInit(): void {
      this.sharingSocialService.shareGoogle(this.sharegoogle.nativeElement, this.message)
  }

  fbShare(video: IVideo) {
    this.createMessage(video);
    this.sharingSocialService.shareFb(this.message);
  }

  createTwitterMessage(video: IVideo) {
    this.createMessage(video);
    let message = encodeURIComponent(this.message);
    let url = encodeURIComponent(this.constantsService.homeUrl);
    this.TwitterURL = 'https://twitter.com/intent/tweet?text='+message+'&url='+url
  }

  createMessage(video: IVideo){
    this.message = 'Go to the Injii and watch broadcast my video which is called "' + 
    video.title + '" to be held ' + video.broadcast.date + '.';
  }

}
