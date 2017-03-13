import { Component, OnInit, NgZone } from '@angular/core';

import { PlayerService } from './../../shared/jw-player/player.service';
import { ContentService } from './../content.service';
import { PopupService } from './../../shared/services/ui-popup.service';

import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'featured-content',
  templateUrl: 'carousel-item.component.html',
  styleUrls: ['../content.component.css']
})

export class FeaturedContentComponent implements OnInit {

  private load: boolean = false;
  private Content: Array<Object> = [];
  private header: string = "Featured Content";
  private rangeContent: Array<number> = [];
  private offsetContent: number = 0;

  constructor
    (
    private contentService: ContentService,
    private playerService: PlayerService,
    private popupService: PopupService,
    private zone: NgZone
    ) {

    this.contentService.limitObservable.subscribe(() => {
      this.getfeaturedContent();
    })

  }

  ngOnInit() {
    this.getfeaturedContent();
  }

  nextContent() {
    if (this.Content.length <= this.offsetContent + this.contentService.limit) {
      this.getfeaturedContent();
    }
    else {
      this.rangeContent = _.range(this.offsetContent, this.offsetContent + this.contentService.limit)
      this.offsetContent += this.contentService.limit;
    }
  }

  prevContent() {
    if (this.offsetContent > 0) {
      this.offsetContent -= this.contentService.limit;
      if (this.offsetContent >= this.contentService.limit) {
        this.rangeContent = _.range(this.offsetContent - this.contentService.limit, this.offsetContent);
      }
    }
  }

  getfeaturedContent() {
    this.load = true;
    let query = '/?offset=' + this.offsetContent + '&limit=' + this.contentService.limit + '&order=latest';
    this.contentService.getContent(query)
      .then(videos => {
        if (videos && Array.isArray(videos)) {
          this.Content.push(...videos)
          this.zone.run(() => {
            this.rangeContent = _.range(this.offsetContent, this.offsetContent + this.contentService.limit)
            this.load = false;
          })         
          this.offsetContent += this.contentService.limit;         
        }
      })
  }

  submitVideoOnMainPlayer(id: string): void {
    this.playerService.changeVideo(id);
    this.popupService.hideContentPopup();
  }
}