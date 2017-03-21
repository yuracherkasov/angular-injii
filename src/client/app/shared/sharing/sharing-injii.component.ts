import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CeiboShare } from 'ng2-social-share';

import { ConstantsService } from './../../services/constants.service';

declare const FB: any;
declare const gapi: any;

@Component({
  moduleId: module.id,
  selector: 'sharing-injii',
  template: `
  <div class="shared-wrapper">
    <h5 class="title">injii: social good broadcast</h5>
    <p class="description">{{textInjii}}</p>
    <h6>Shared on:</h6>
    <ul class="shared-social">
      <li (click)="shareFb()"><img src="assets/svg/icons/facebook-logo-button.svg" alt="facebook"></li>
      <li ceiboShare [twitter]="{url: urlInjii, text: textInjii, hashtags:'injii'}"><img src="assets/svg/icons/twitter-logo-button.svg" alt="twitter"></li>
      <li #grender><img src="assets/svg/icons/google-plus.svg" alt="instagram"></li>
    </ul>
  </div>
  `,
  styleUrls: ['sharing-video.component.css', 'sharing-injii.component.css']
})

export class SharingInjiiComponent implements OnInit {

  @ViewChild("grender") grender: ElementRef;
  private textInjii: string;
  private urlInjii: string;
  private imageInjii: string;
  private headerInjii: string;

  goptions: any;

  constructor(private constantsService: ConstantsService) {

    this.textInjii =
      `Here you can place any text. This can contain a referral code that the user can enter at registration.`;
    this.urlInjii = this.constantsService.homeUrl;
    this.imageInjii = this.constantsService.homeUrl + "/assets/symbol_with_logo/symbol_logo_original.jpg";
    this.headerInjii = "Join the injii";

  }

  ngOnInit(): void {
    this.goptions = {
      contenturl: this.constantsService.homeUrl,
      clientid: this.constantsService.gClient_id,
      cookiepolicy: this.constantsService.homeUrl,
      prefilltext: this.textInjii,
      calltoactionlabel: 'SIGN_IN',
      calltoactionurl: this.constantsService.homeUrl
    }
    gapi.interactivepost.render(this.grender.nativeElement, this.goptions);
  }

  shareFb(): void {
    FB.ui({
      app_id: this.constantsService.fbAppId,
      method: 'share',
      mobile_iframe: true,
      //display: 'dialog',
      href: this.urlInjii,
      caption: this.headerInjii,
      description: this.textInjii,
      picture: this.imageInjii
    }, function (response: any) { console.log(response) });
  }

}
