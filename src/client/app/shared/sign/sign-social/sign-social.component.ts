import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UiService } from '../../services/ui-service.service';
import { IsLoggedInService } from './../services/islogged.service';
import { ConstantsService } from '../../../services/constants.service';
import { TwitterService } from './twitter.service';


declare const FB: any;
declare const gapi: any;

interface IUser {
  role: string;
  auth_via: string;
  social_id: string;
  token: string;
  access_token: string;
  avatar: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  link: string;
}

@Component({
  moduleId: module.id,
  selector: 'sign-social',
  providers: [TwitterService],
  templateUrl: 'sign-social.component.html',
  styleUrls: ['sign-social.component.css']
})

export class SignSocialComponent {

  private googleAuth: any;
  private User: IUser;

  constructor(
    public twitterService: TwitterService,
    private authService: AuthService,
    private uiService: UiService,
    private constantsService: ConstantsService,
    private isLoggedInService: IsLoggedInService) {
    this.initSocial()
  }

  initSocial(): void {
    if (typeof FB === 'object' && typeof gapi === 'object') {
      gapi.load('auth2', () => {
        this.googleAuth = gapi.auth2.init({
          client_id: this.constantsService.gClient_id
        });
      });

      let fbParams: any = {
        appId: this.constantsService.fbAppId,
        xfbml: true,
        version: 'v2.8'
      };
      FB.init(fbParams);
    } else setTimeout(() => this.initSocial(), 1000)
  }

  facebookCall(): void {
    FB.getLoginStatus((response: any) => {
      console.log(response);
      if (response.status === 'connected') {
        this.facebookSignin(response.authResponse.accessToken);
      } else {
        FB.login((response: any) => {
          console.log(response)
          if (response.status === 'connected') {
            this.facebookSignin(response.authResponse.accessToken)
          }
        },
          (error: any) => console.error("error ", error)
        );
      }
    })
  }

  facebookSignin(accessToken: string) {
    FB.api('/me?fields=id,first_name,last_name,picture{url},email,link',
      (result: any) => {
        console.log(result);
        if (result && !result.error) {
          this.User = {
            role: 'user',
            auth_via: 'facebook',
            social_id: result.id,
            token: null,
            access_token: accessToken,
            avatar: result.picture.data.url,
            email: result.email,
            firstname: result.first_name,
            lastname: result.last_name,
            username: null,
            link: result.link
          }
          this.sign();
        } else {
          console.log(result.error);
        }
      });
  }

  googleCall() {
    if (this.googleAuth.isSignedIn.get()) {
      this.googleSignin(this.googleAuth.currentUser.get())
    } else {
      this.googleAuth.signIn()
        .then((response: any) => {
          this.googleSignin(response)
        })
    }
  }

  googleSignin(GoogleUser: any) {
    console.log('GoogleUser: ', GoogleUser);
    let profile = GoogleUser.getBasicProfile();
    this.User = {
      role: 'user',
      auth_via: 'google',
      social_id: profile.getId(),
      token: GoogleUser.getAuthResponse().id_token,
      access_token: GoogleUser.getAuthResponse().access_token || JSON.stringify(GoogleUser.Zi.access_token),
      avatar: profile.getImageUrl(),
      email: profile.getEmail(),
      firstname: profile.getGivenName(),
      lastname: profile.getFamilyName(),
      username: null,
      link: null
    };
    this.sign();
  }

  sign() {
    this.authService.loginWithSocial(this.User)
      .then((response: any) => {
        if (response.result === 'OK' && response.user) {
          this.constantsService.setUser(response.user);
          this.isLoggedInService.isLogin(true);
        }
      }, (reject) => {
        console.log(reject)
      });
  }

  sendPinForTwitter(val: string, element: any) {
    if (val) {
      element.hide();
      this.twitterService.twitterlogIn(val)
        .then(response => {
          console.log(response);
          let fullName = response.name.split(' ');
          this.User = {
            role: 'user',
            auth_via: 'twitter',
            social_id: response.id_str,
            token: response.oauth_token,
            access_token: response.oauth_token_secret,
            avatar: response.profile_image_url_https,
            email: null,
            firstname: fullName[0],
            lastname: fullName[1],
            username: response.screen_name,
            link: null
          };
          this.sign();
        }, reject => {
          console.warn(reject);
        })
    }
  }
}
