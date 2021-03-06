import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UiDonationService {

  charityObj: any;
  videoObj: any;
  artistObj: any;
  showPopup: boolean = false;

  subjDonationSource = new Subject();
  DonationDetailObservable = this.subjDonationSource.asObservable();

  constructor() { }

  donationDetailChange() {
    this.subjDonationSource.next();
  }

  donationHide() {
    this.showPopup = false;
  }

  donationShow(charityObj: any, videoObj: any, artistObj: any): void {
    if(this.charityObj != charityObj) {
      this.donationDetailChange();
    }
    this.charityObj = charityObj;
    this.videoObj = videoObj;
    this.artistObj = artistObj;
    this.showPopup = true;
  }

}
