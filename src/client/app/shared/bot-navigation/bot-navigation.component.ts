import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from "../jw-player/player.service";
import { PopupControlService } from './../../services/popup-control.service';
import { PopupService } from '../services/ui-popup.service';
import { UiDonationService } from './../donation/ui-donation.service';
import { ASearchService } from './../../artists/search.service';
import { CSearchService } from './../../charities/search.service';
import { ArtistRatingService } from './../../services/artist-rating.service';
import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../shared/alert/alert.service';

@Component({
  moduleId: module.id,
  selector: 'sd-botnav',
  templateUrl: 'bot-navigation.component.html',
  styleUrls: ['bot-navigation.component.css'],
  providers: [ArtistRatingService]
})

export class BotNavigationComponent {

  private liveViewers: number = 118;
  private Data: any = {};
  private artistData: any = {};
  private charityData: any = {};
  private videoObj: any = {};


  constructor
    (
    private playerService: PlayerService,
    private zone: NgZone,
    private popupControlService: PopupControlService,
    private popupService: PopupService,
    private uiDonationService: UiDonationService,
    private AsearchService: ASearchService,
    private CsearchService: CSearchService,
    private artistRatingService: ArtistRatingService,
    private alertService: AlertService,
    private router: Router,
    private constantsService: ConstantsService
    ) {

    popupService.contentObservable.subscribe(() => {
      this.closePanel()
    })

    this.playerService.videoDetailObservable
      .subscribe((data: any) => {
        this.zone.run(() => {
          this.Data = data.video;
          this.artistData = data.video.artist;
          this.charityData = data.video.charity;
        })
      })

  }

  toggleArtistsInfo() {
    if (this.popupControlService.isWhichTabOpen !== 'artist-info') {
      this.popupControlService.isWhichTabOpen = 'artist-info';
    }
    else {
      this.popupControlService.isWhichTabOpen = '';
    }
  }
  toggleCharityInfo() {
    if (this.popupControlService.isWhichTabOpen !== 'charity-info') {
      this.popupControlService.isWhichTabOpen = 'charity-info';
    }
    else {
      this.popupControlService.isWhichTabOpen = '';
    }
  }
  toggleDonate() {
    this.videoObj.id = this.Data.id;
    this.videoObj.title = this.Data.title;
    this.uiDonationService.donationShow(this.charityData, this.videoObj, this.artistData)
  }

  toggleStats() {
    if (this.popupControlService.isWhichTabOpen !== 'stats') {
      this.popupControlService.isWhichTabOpen = 'stats';
    }
    else {
      this.popupControlService.isWhichTabOpen = '';
    }
  }
  toggleAd() {
    if (this.popupControlService.isWhichTabOpen !== 'ad') {
      this.popupControlService.isWhichTabOpen = 'ad';
    }
    else {
      this.popupControlService.isWhichTabOpen = '';
    }
  }

  closePanel() {
    this.popupControlService.isWhichTabOpen = '';
  }

  gotoRoute() {
    this.closePanel();
    this.popupService.showContentPopup();
  }

  submitVote(n: number): void {
    if (this.constantsService.User) {
      this.artistRatingService.submitVote(n, this.artistData.id)
        .then(response => {
          if (response.artist.rating) {
            this.artistData.rating = response.artist.rating;
          }
          if (response.message) {
            this.alertService.info(response.message)
          }
        },
        (reject => { console.log(reject) }))
    } else {
      this.alertService.danger("You need login")
    }
  }

   gotoASearch(e: Event, order: string, filter: string) {
    e.preventDefault();
    this.AsearchService.changeOrderProperty(order); 
    this.AsearchService.filter = filter;
    this.router.navigate(['/artists']);
  }
  gotoCSearch(e: Event, order: string, filter: string) {
    e.preventDefault();
    this.CsearchService.changeOrderProperty(order); 
    this.CsearchService.filter = filter;
    this.router.navigate(['/charities']);
  }

}
