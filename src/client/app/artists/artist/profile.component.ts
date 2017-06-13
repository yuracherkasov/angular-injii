import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PopupControlService } from './../../services/popup-control.service';
import { ProfileService } from './profile.service';
import { PlayerService } from './../../shared/jw-player/player.service';
import { PopupService } from './../../shared/services/ui-popup.service';
import { AlertService } from './../../shared/alert/alert.service';
import { ConstantsService } from './../../services/constants.service';
import { UiDonationService } from './../../shared/donation/ui-donation.service';
import { ArtistRatingService } from './../../services/artist-rating.service';



@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  providers: [ProfileService, ArtistRatingService]
})
export class ProfileComponent implements OnInit {

  artist: any = {};
  artistManager: any = {};
  artistAgent: any = {};
  hidepopup: boolean = false;

  constructor
  (
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private artistRatingService: ArtistRatingService,
    private playerService: PlayerService,
    private constantsService: ConstantsService,
    private popupControlService: PopupControlService,
    private alertService: AlertService,
    private popupService: PopupService,
    private uiDonationService: UiDonationService
    ) {


    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      }
    });
  }

  showPopUp() {
    this.hidepopup = false;
  }
  hidePopUp() {
    this.hidepopup = true;
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.profileService.getProfile(params['username']))
      .subscribe((response: any) => {
        console.log("Artist response: ", response);
        if(response.result === 'OK'){
          this.artist = response.artist;
          this.artistManager = response.artist.manager;
          this.artistAgent = response.artist.booking_agent;
        } else if (response.result === 'FAIL'){
          this.alertService.danger(response.message);
        }       
      });
  }

  submitVideoOnMainPlayer(e: Event, src: string): void {
    e.preventDefault();
    this.playerService.changeVideo(src);
  }

  submitVote(n: number): void {
    if (this.constantsService.User) {
      this.artistRatingService.submitVote(n, this.artist.id)
        .then(response => {
          console.log("submitVote: ", response);        
          if (response.result === 'OK') {
            this.alertService.info(response.message);
            if(response.artist.rating && typeof response.artist.rating === 'number') {
              this.artist.rating = Math.round(response.artist.rating);
            }
          } else if (response.result === 'FAIL'){
            this.alertService.danger(response.message);
          }
          else if (response.error && typeof response.error === 'string'){
            this.alertService.danger(response.error);
          }
        },
        (reject => { console.log(reject) }));
    } else {
      this.alertService.danger('You need login');
    }
  }

  gotoSharing(video: any): void {
    this.popupControlService.toggleSharing(video);
  }

  gotoDonation(video: any): void {
    let artist = {
      id:  this.artist.id,
      firstname: this.artist.firstname,
      lastname: this.artist.lastname,
      username: this.artist.username,
      avatar: this.artist.avatar
    };
    this.uiDonationService.donationShow(this.artist.charity, video, artist);
  }
}
