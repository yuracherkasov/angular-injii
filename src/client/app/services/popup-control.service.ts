import { Injectable } from '@angular/core';
import { PopupService } from '../shared/services/ui-popup.service';

@Injectable()

export class PopupControlService {

  isWhichTabOpen = '';
  charityID: string = '';
  videoID: string = '';
  videoTitle: string = '';
  donateParam: string = '';

  Sponsor: any = {};
  sponsorID: string = '';

  sharingVideo: any = {};
  sharingVideoID: string = '';


  constructor(private popupService: PopupService) {}

  toggleDonation(charityId: string, videoId: string, title: string): void {
    if (this.donateParam === videoId && this.isWhichTabOpen === 'donate') {
      this.donationHide();
      this.donateParam = '';
    } else {
      this.donationShow(charityId, videoId, title);
      this.donateParam = videoId;
    }
  }

  donationShow(charityId: string, videoId: string, title: string): void {
    this.charityID = charityId;
    this.videoID = videoId;
    this.videoTitle = title;
    this.isWhichTabOpen = 'donate';
  }

  donationHide(): void {
    this.isWhichTabOpen = '';
  }

  toggleSponsor(sponsor: any) {
    if (this.sponsorID === sponsor.id && this.isWhichTabOpen === 'sponsor') {
      this.sponsorHide();
      this.sponsorID = '';
    } else {
      this.sponsorShow(sponsor);
      this.sponsorID = sponsor.id;
    }
  }

  sponsorShow(sponsor: any): void {
    this.Sponsor = sponsor;
    this.isWhichTabOpen = 'sponsor';
  }

  sponsorHide(): void {
    this.isWhichTabOpen = '';
    this.Sponsor = {};
  }

  toggleSharing(video: any) {
    if (this.sharingVideoID === video.id && this.isWhichTabOpen === 'sharing') {
      this.sharingHide();
      this.sharingVideoID = '';
    } else {
      this.sharingShow(video);
      this.sharingVideoID = video.id;
    }
  }

  sharingShow(video: any): void {
    this.sharingVideo = video;
    this.isWhichTabOpen = 'sharing';
  }

  sharingHide(): void {
    this.isWhichTabOpen = '';
    this.sharingVideo = {};
  }

}
