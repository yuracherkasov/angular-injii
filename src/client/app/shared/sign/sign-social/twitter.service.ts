import { Injectable } from '@angular/core';
import { ConstantsService } from '../../../services/constants.service';
import { AlertService } from '../../alert/alert.service';

declare const Codebird: any;

@Injectable()
export class TwitterService {

  private Cb: any;
  private authWindow: Window;

  constructor(
    private constantsService: ConstantsService,
    private alertService: AlertService
    ) { }

  getPinForTwitter(popup: any): void {
    if (this.Cb === undefined) {
      this.Cb = new Codebird();
    }
    window.open('', 'twitterAuth', 'height=585, width=770');

    this.Cb.setConsumerKey(this.constantsService.TwKey, this.constantsService.TwSecret);

    this.Cb.__call('oauth_requestToken', { oauth_callback: 'oob' }, (reply: any, rate: any, err: any) => {
      if (err) {
        this.alertService.danger('Twitter error response or timeout exceeded' + err.error);
        this.authWindow.close();
      }
      if (reply) {
        this.Cb.setToken(reply.oauth_token, reply.oauth_token_secret);
        this.Cb.__call('oauth_authorize', {}, (auth_url: string) => {
          this.authWindow = window.open(auth_url, 'twitterAuth', 'height=585, width=770');
          popup.show();
        });
      }
    });
  }

  twitterlogIn(pin: any): Promise<any> {
    const self = this;
    const result = new Promise((resolve, reject) => {

      self.Cb.__call('oauth_accessToken', { oauth_verifier: pin }, function (reply: any, rate: any, err: any) {
        if (err) {
          self.alertService.danger('Twitter error response or timeout exceeded' + err.error);
        }
        if (reply && reply.httpstatus == 200 && reply.oauth_token) {
          self.Cb.setToken(reply.oauth_token, reply.oauth_token_secret);
          self.Cb.__call(
            "account_verifyCredentials",
            {},
            (data: any) => {
              self.authWindow.close();
              resolve(Object.assign(data, {oauth_token: reply.oauth_token, oauth_token_secret: reply.oauth_token_secret}));
            }
          );
        } else {
          reject();
        }
      });
    });
    return result;
  }
}
