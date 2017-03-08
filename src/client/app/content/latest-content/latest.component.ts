import { Component, OnInit } from '@angular/core';

import { PlayerService } from './../../shared/jw-player/player.service';
import { ContentService } from './../content.service';
import { PopupService } from './../../shared/services/ui-popup.service';

import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'latest-content',
  templateUrl: 'latest.component.html',
  styleUrls: ['../content.component.css']
})

export class LatestContentComponent implements OnInit {

  private load: boolean = false;
  private limit: number;
  private latestContent: Array<Object> = [];
  private rangeLatestContent: Array<number> = [];
  private offsetLatestContent: number = 0;

  constructor(public contentService: ContentService,
    public playerService: PlayerService,
    public popupService: PopupService) {

    this.limit = this.contentService.limitInstall();

  }

  onResize() {
    let Limit = this.contentService.limitInstall();
    if (Limit != this.limit) {
      this.limit = Limit;
      this.getLatestContent();
    }
  }

  ngOnInit() {
    this.getLatestContent();
  }

  nextContent() {
    if (this.latestContent.length <= this.offsetLatestContent + this.limit) {
      this.getLatestContent();
    } else {
      this.rangeLatestContent = _.range(this.offsetLatestContent, this.offsetLatestContent + this.limit)
      this.offsetLatestContent += this.limit;
    }
  }

  prevContent() {
    if (this.offsetLatestContent > 0) {
      this.offsetLatestContent -= this.limit;
      if (this.offsetLatestContent >= this.limit) {
        this.rangeLatestContent = _.range(this.offsetLatestContent - this.limit, this.offsetLatestContent);
      }
    }
  }

  getLatestContent() {
    this.load = true;
    let query = '/?offset=' + this.offsetLatestContent + '&limit=' + this.limit + '&order=latest';
    this.contentService.getContent(query)
      .then(videos => {
        if (videos && Array.isArray(videos)) {
            this.latestContent.push(...videos)
            this.rangeLatestContent = _.range(this.offsetLatestContent, this.offsetLatestContent + this.limit)
          this.offsetLatestContent += this.limit
          this.load = false;
        }
      })
  }

  submitVideoOnMainPlayer(src: string): void {
    this.playerService.changeVideo(src);
    this.popupService.hideContentPopup();
  }
}