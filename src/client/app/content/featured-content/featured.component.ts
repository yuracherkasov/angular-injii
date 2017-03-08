import { Component, OnInit } from '@angular/core';

import { PlayerService } from './../../shared/jw-player/player.service';
import { ContentService } from './../content.service';
import { PopupService } from './../../shared/services/ui-popup.service';

import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'featured-content',
  templateUrl: 'featured.component.html',
  styleUrls: ['../content.component.css']
})

export class FeaturedContentComponent implements OnInit {

  private load: boolean = false;
  private limit: number;
  private featuredContent: Array<Object> = [];
  private rangeFeaturedContent: Array<number> = [];
  private offsetFeaturedContent: number = 0;

  constructor(private contentService: ContentService,
    public playerService: PlayerService,
    public popupService: PopupService) {

    this.limit = this.contentService.limitInstall();
  }

  onResize() {
    let Limit = this.contentService.limitInstall();
    if (Limit != this.limit) {
      this.limit = Limit;
      this.getfeaturedContent();
    }
  }

  ngOnInit() {
    this.getfeaturedContent();
  }

  nextContent() {
    if (this.featuredContent.length <= this.offsetFeaturedContent + this.limit) {
      this.getfeaturedContent();
    }
    else {
      this.rangeFeaturedContent = _.range(this.offsetFeaturedContent, this.offsetFeaturedContent + this.limit)
      this.offsetFeaturedContent += this.limit;
    }
  }

  prevContent() {
    if (this.offsetFeaturedContent > 0) {
      this.offsetFeaturedContent -= this.limit;
      if (this.offsetFeaturedContent >= this.limit) {
        this.rangeFeaturedContent = _.range(this.offsetFeaturedContent - this.limit, this.offsetFeaturedContent);
      }
    }
  }

  getfeaturedContent() {
    this.load = true;
    let query = '/?offset=' + this.offsetFeaturedContent + '&limit=' + this.limit + '&order=latest';
    this.contentService.getContent(query)
      .then(videos => {
        if ( videos && Array.isArray(videos) ) {
          this.featuredContent.push(...videos)
          this.rangeFeaturedContent = _.range(this.offsetFeaturedContent, this.offsetFeaturedContent + this.limit)
          this.offsetFeaturedContent += this.limit;
          this.load = false;
        }
      })
  }

  submitVideoOnMainPlayer(id: string): void {
    this.playerService.changeVideo(id);
    this.popupService.hideContentPopup();
  }
}