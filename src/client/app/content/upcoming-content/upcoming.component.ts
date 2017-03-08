import { Component, OnInit } from '@angular/core';

import { PlayerService } from './../../shared/jw-player/player.service';
import { ContentService } from './../content.service';
import { PopupService } from './../../shared/services/ui-popup.service';

import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'upcoming-content',
  templateUrl: 'upcoming.component.html',
  styleUrls: ['../content.component.css']
})

export class UpcomingContentComponent implements OnInit {

  load: boolean = false;
  private limit: number;
  private upcomingContent: Array<Object> = [];
  private rangeUpcomingContent: Array<number> = [];
  private offsetUpcomingContent: number = 0;


  constructor(private contentService: ContentService,
    public playerService: PlayerService,
    public popupService: PopupService) {

    this.limit = this.contentService.limitInstall();

  }

  onResize() {
    let Limit = this.contentService.limitInstall();
    if (Limit != this.limit) {
      this.limit = Limit;
      this.getUpcomingContent();
    }
  }

  ngOnInit() {
    this.getUpcomingContent();
  }

  nextContent() {
    if (this.upcomingContent.length <= this.offsetUpcomingContent + this.limit) {
      this.getUpcomingContent();
    } else {
      this.rangeUpcomingContent = _.range(this.offsetUpcomingContent, this.offsetUpcomingContent + this.limit);
      this.offsetUpcomingContent += this.limit;
    }
  }

  prevContent() {
    if (this.offsetUpcomingContent > 0) {
      this.offsetUpcomingContent -= this.limit;
      if (this.offsetUpcomingContent >= this.limit) {
        this.rangeUpcomingContent = _.range(this.offsetUpcomingContent - this.limit, this.offsetUpcomingContent);
      }
    }
  }

  getUpcomingContent() {
    this.load = true;
    let query = '/?offset=' + this.offsetUpcomingContent + '&limit=' + this.limit + '&order=upcomin';
    this.contentService.getContent(query)
    .then(videos => {
      if (videos && Array.isArray(videos)) {
          this.upcomingContent.push(...videos)
          this.rangeUpcomingContent = _.range(this.offsetUpcomingContent, this.offsetUpcomingContent + this.limit)
        this.offsetUpcomingContent += this.limit
        this.load = false;
      }
    })
  }

  submitVideoOnMainPlayer(id: string): void {
    this.playerService.changeVideo(id);
    this.popupService.hideContentPopup();
  }
}
