import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ContestService } from "./../contest.service";
import { CarouselService } from "./../carousel.service";
import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../shared/alert/alert.service';

@Component({
  moduleId: module.id,
  selector: 'current-contest',
  templateUrl: 'current-contest.component.html',
  styleUrls: ['current-contest.component.css'],
  providers: [CarouselService]
})

export class CurrentContestComponent implements OnInit {

  @ViewChild('carousel') carousel: ElementRef;
  private artists: any = [];
  private leaderArtist: any = {};
  private favoriteArtist: any = {};
  private carouselItemWidth: number = 250;

  private contest: any = {};
  private toggleContests: boolean = true;
  private count: number = 0;
  private descriptionLength: number;
  private readmore: string;
  private makeDisabled: boolean = false;

  constructor
    (
    private router: Router,
    private contestService: ContestService,
    private constantsService: ConstantsService,
    private alertService: AlertService,
    private carouselService: CarouselService
    ) {

  }

  ngOnInit() {
    this.contestService.getContest("current")
      .then(response => {
        this.render(response);
        this.toggleReadMore();
      })
  }

  appendButtonText(status: string): string {
    return (status !== 'favorite') ? 'Vote!' : 'Unvote!';
  }

  private vote(artist: any) {
    if (this.constantsService.User) {
      artist.votes++;
      this.makeDisabled = true;
      let votes = artist.votes;
      let username = artist.username;
      this.contestService.submitVote(votes, username)
        .then(response => {
          this.render(response);
          this.makeDisabled = false;
          if (response.message) {
            this.alertService.info(response.message)
          }
        })
    } else {
      this.alertService.danger("You need to login")
    }
  }

  private render(response: any) {
    this.contest = response;
    if (response.artists && Array.isArray(response.artists)) {
      this.artists = response.artists;
      this.carouselService.getPagination(this.artists.length, this.carouselItemWidth, this.carousel.nativeElement.clientWidth);
      this.favoriteArtist = {};
      this.leaderArtist = {};
      this.artists.forEach((artist: any) => {
        if (!artist.status) return
        else if (artist.status === 'favorite') {
          this.favoriteArtist = artist
        } else if (artist.status === 'leader') {
          this.leaderArtist = artist
        };
      })
    }
  }

  toggleReadMore() {
    if (this.count % 2 === 0) {
      this.descriptionLength = 100;
      this.readmore = "more...";
    } else if (this.count % 2 === 1) {
      this.descriptionLength = this.contest.description.length;
      this.readmore = "hide";
    }
    this.count++;
  }
}
