import { Component, trigger, transition, style, animate, state } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { UiService } from '../../services/ui-service.service';
import { AlertService } from '../../alert/alert.service';
import { IsLoggedInService } from './../services/islogged.service';

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'login.component.html',
  animations: [
    trigger('forgotPswAnimation', [
      state('active', style({
        opacity: 1,
        transform: 'translateX(0%)'
      })),
      state('void', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      transition('void => active', animate('.3s .35s ease-out')),
      transition('active => void', animate('.3s ease-in'))
    ]
    )
  ],
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  model: any = {};
  loading = false;
  fLoading = false;
  incorrectMessage = false;
  forgotformEmail: string;
  forgotErrorMessage: string = '';
  wrongPassError: string = 'Server error';

  constructor(private authenticationService: AuthService,
    public uiService: UiService,
    private isLoggedInService: IsLoggedInService,
    private alertService: AlertService) {

    this.model.remember = false;
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password, this.model.remember)
      .then((response: any) => {
        if (response && response.result === 'OK') {
          this.isLoggedInService.isLogin(true);
        }
        this.loading = false;
        this.alertService.clear();
      }, reject => {
        let rejectJson = reject.json();
        if (rejectJson.result === 'FAIL') {
          this.wrongPassError = rejectJson.message;
        }
        this.loading = false;
        this.incorrectMessage = true;
      });
  }

  forgotSubmit() {
    this.fLoading = true;
    this.authenticationService.requestPasswordRestore(this.forgotformEmail)
      .then((response: any) => {
        this.fLoading = false;
        console.log('restore pass: ', response);
        if (response.result === 'OK') {
          this.alertService.info(response.message);
          this.uiService.forgotPassword = false;
        } else if (response.result === 'FAIL')
          this.forgotErrorMessage = response.message;
      }, reject => {
        this.fLoading = false;
        this.forgotErrorMessage = 'Server error';
        console.log(reject);
      });
  }

}
