import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

declare const FB: any;
declare const gapi: any;
declare const Codebird: any;
  
@Injectable()

export class SharingSocialService {

  private Cb: any;
  private authWindow: Window;

  constructor(private constantsService: ConstantsService) { }

  shareFb(quote: string): void {
    let fbParams: any = {
      appId: this.constantsService.fbAppId,
      xfbml: true,
      version: 'v2.8'
    };
    FB.init(fbParams);

    FB.ui({
      app_id: this.constantsService.fbAppId,
      method: 'share',
      mobile_iframe: true,
      quote: quote,
      href: this.constantsService.homeUrl
    }, function (response: any) { console.log(response); });
  }

  shareGoogle(element: any, text: string): void {             
    let goptions = {
      contenturl: this.constantsService.homeUrl,
      clientid: this.constantsService.gClient_id,
      cookiepolicy: 'single_host_origin',
      prefilltext: text,
      calltoactionlabel: 'INVITE',
      calltoactionurl: this.constantsService.homeUrl
    };
    gapi.interactivepost.render(element, goptions);
  }

}

