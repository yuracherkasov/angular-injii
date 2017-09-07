import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharingSocialService } from '../../../services/sharing-social.service';
import { ConstantsService } from '../../../services/constants.service';

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
      <li #grender><img src="assets/svg/icons/google-plus.svg" alt="google"></li>
    </ul>
  </div>
  `,
  styleUrls: ['../sharing-video/sharing-video.component.css', 'sharing-injii.component.css']
})

export class SharingInjiiComponent implements OnInit {

  @ViewChild('grender') grender: ElementRef;
  public goptions: any;
  public textInjii: string;
  public urlInjii: string;
  private imageInjii: string;
  private headerInjii: string;

  constructor
    (
    private constantsService: ConstantsService,
    private sharingSocialService: SharingSocialService
  ) {

    this.urlInjii = this.constantsService.homeUrl;
    this.imageInjii = this.constantsService.homeUrl + '/assets/symbol_with_logo/symbol_logo_original.jpg';
    this.headerInjii = 'Join the injii';

    constantsService.userObservable.subscribe(() => {
      this.setSharingText();
    });
  }

  ngOnInit(): void {
    this.setSharingText();  
    this.sharingSocialService.shareGoogle(this.grender.nativeElement, this.textInjii)
  }

  setSharingText(): void {
    if (this.constantsService.User) {
      this.textInjii = 'Refferal code: ' + this.constantsService.User.id;
    } else {
      this.textInjii = '';
    }
  }

  shareFb(): void {
    this.sharingSocialService.shareFb(this.textInjii);
  }

}
