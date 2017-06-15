import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { UiService } from "../../services/ui-service.service";
import { IsLoggedInService } from './../services/islogged.service';
import { ConstantsService } from '../../../services/constants.service';


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
}

@Component({
  moduleId: module.id,
  selector: 'sign-social',
  templateUrl: 'sign-social.component.html',
  styleUrls: ['sign-social.component.css']
})

export class SignSocialComponent {

  private googleAuth: any;
  private User: IUser;

  constructor(
    private userService: UserService,
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

  twitterCall() {
    var newWindow = window.open('http://www.injii.com/users/tlogin', 'name', 'height=585, width=770');
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
    FB.api('/me?fields=id,first_name,last_name,picture{url},email',
      (result: any) => {
        console.log(result);
        if (result && !result.error) {
          this.User = {
            role: "user",
            auth_via: "facebook",
            social_id: result.id,
            token: null,
            access_token: accessToken,
            avatar: result.picture.data.url,
            email: result.email,
            firstname: result.first_name,
            lastname: result.last_name
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
    let profile = GoogleUser.getBasicProfile();
    this.User = {
      role: "user",
      auth_via: "google",
      social_id: profile.getId(),
      token: GoogleUser.getAuthResponse().id_token,
      access_token: GoogleUser.getAuthResponse().access_token || JSON.stringify(GoogleUser.Zi.access_token),
      avatar: profile.getImageUrl(),
      email: profile.getEmail(),
      firstname: profile.getGivenName(),
      lastname: profile.getFamilyName()
    };
    this.sign();
  }

  sign() {
    this.userService.signup(this.User)
      .then((response: any) => {
        if (response.result === "OK" && response.user) {
          this.constantsService.setUser(response.user);
          this.isLoggedInService.isLogin(true);
        }
      }, (reject) => {
        console.log(reject)
      });
  }
}
