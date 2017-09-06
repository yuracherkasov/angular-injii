import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { IVideo } from './models/video';
import { AddContentService } from './add-content.service';
import { PopupService } from './../shared/services/ui-popup.service';
import { ConstantsService } from '../services/constants.service';
import { VideoPreviewComponent } from './preview/video-preview.component';

@Component({
  moduleId: module.id,
  selector: 'add-content',
  templateUrl: 'add-content.component.html',
  styleUrls: ['add-content.component.css']
})

export class AddContentComponent implements OnInit, OnDestroy {

  ArtistProfile: any;
  ArtistVideos: Array<IVideo>;
  UpcomingVideos: Array<IVideo>;
  hidepopup: boolean = false;
  @ViewChild(VideoPreviewComponent) previewComponent: VideoPreviewComponent;

  constructor
    (
    public popupService: PopupService,
    private addContentService: AddContentService,
    private constantsService: ConstantsService
    ) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      };
    });
  }

  ngOnInit() {
    let username = this.constantsService.User.username;
    this.addContentService.getProfile(username)
    .then(response => {
      if(response.result === 'OK'){
        this.ArtistProfile = response.artist;
        this.ArtistVideos = response.artist.videos;
        this.UpcomingVideos = this.ArtistVideos.filter(this.selectUpcomingVideo);
        console.log(this.ArtistProfile, this.UpcomingVideos);
      }
    });
  }

  selectUpcomingVideo(video: IVideo): boolean {
    return video.broadcast.upcoming;
  }

  ngOnDestroy() {
    let urls = this.previewComponent.UrlsArray;
    for (let i = 0; i < urls.length; i++) {
      URL.revokeObjectURL(urls[i]);
      urls.shift();
    }
  }

  private showPopUp() {
    this.hidepopup = false;
  }

  private hidePopUp() {
    this.hidepopup = true;
  }





 }
