import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProfileService } from './profile.service';
import { PlayerService } from './../../shared/jw-player/player.service';
import { PopupService } from './../../shared/services/ui-popup.service';
import { PopupControlService } from './../../services/popup-control.service';
import { AlertService } from './../../shared/alert/alert.service';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  private charity: any = {};
  private hidepopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private playerService: PlayerService,
    private popupService: PopupService,
    private alertService: AlertService,
    private popupControlService: PopupControlService
  ) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp()
      } else {
        this.hidePopUp()
      }
    })
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
        if(response.result === 'OK'){
          this.charity = response.charity;
        } else if (response.result === 'FAIL'){
          this.alertService.danger(response.message);
        }         
        console.log("this.charity: ", this.charity);
      });
  }

  submitVideoOnMainPlayer(e: Event, src: string): void {
    e.preventDefault();
    this.playerService.changeVideo(src);
  }

  gotoSharing(video: any): void {
    this.popupControlService.toggleSharing(video);
  }

  gotoDonation(video: any): void {
    this.popupControlService.toggleDonation(video.charity.id, video.id, video.title)
  }

}
