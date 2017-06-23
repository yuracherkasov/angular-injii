import { Component, ViewChild, ElementRef, trigger, transition, style, animate, state } from '@angular/core';
import { ConstantsService } from '../../services/constants.service';
import { AlertService } from '../alert/alert.service';
import { DonationService } from './donation.service';
import { UiDonationService } from './ui-donation.service';

import { Config } from './../config/env.config';

declare var WePay: any;

@Component({
  moduleId: module.id,
  selector: 'sd-donate',
  templateUrl: 'donation.component.html',
  styleUrls: ['donation.component.css'],
  animations: [
    trigger('DonateAnimationTrigger', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20%)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateY(0%)'
      })),
      transition('void => active', animate('.3s ease-out'))
    ]
    ),
  ],
  providers: [DonationService]
})

export class DonationComponent {

  @ViewChild('wepayCheckout') wepay_checkout: ElementRef;

  public loading: boolean = false;
  public fullPopup: boolean = false;
  private charityId: string = '';
  private videoId: string = '';

  constructor(
    public uiDonationService: UiDonationService,
    private constantsService: ConstantsService,
    private donationService: DonationService,
    private alertService: AlertService) {

    this.uiDonationService.DonationDetailObservable
      .subscribe(() => {
        this.updateDonate();
      });

  }

  closePopup() {
    this.uiDonationService.donationHide();
  }

  donate(amount: number) {
    if (amount) {
      let iframe = this.wepay_checkout.nativeElement.children[0];
      if (iframe) this.wepay_checkout.nativeElement.removeChild(iframe);

      this.fullPopup = true;
      this.loading = true;

      let data = {
        amount: amount,
        charity_username: this.uiDonationService.charityObj.username,
        video_id: this.uiDonationService.videoObj.id,
        username: this.constantsService.User ? this.constantsService.User.username : null
      };

      this.donationService.checkout(data)
        .then(response => {
          if (response.result === 'OK' && !!response.checkout_uri) {
            WePay.iframe_checkout('wepay_checkout', 'https://stage.wepay.com/api/checkout/' + response.checkout_uri);
            this.loading = false;
          }
        });
    }
  }

  updateDonate() {
    let iframe = this.wepay_checkout.nativeElement.children[0];
    if (iframe) this.wepay_checkout.nativeElement.removeChild(iframe);
    this.fullPopup = false;
  }

}
