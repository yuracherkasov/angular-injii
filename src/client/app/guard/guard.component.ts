import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from './guard.service';
import { AlertService } from '../shared/alert/alert.service';


declare const sessionStorage: any;

@Component({
  moduleId: module.id,
  selector: 'sd-guard',
  templateUrl: 'guard.component.html',
  styleUrls: ['guard.component.css']
})

export class GuardComponent {

  model: any = {};
  accessModel: any = {};
  loading: boolean = false;
  activeform: string = '';

  constructor(
    public guardService: GuardService,
    private router: Router,
    private alertService: AlertService
  ) { }

  login() {
    if (this.model.email && this.model.password) {
      this.loading = true;
      this.guardService.login(this.model.email, this.model.password)
        .then(response => {
          console.log(response);
          this.loading = false;
          if (response.result === 'OK') {
            sessionStorage.setItem(this.guardService.storageKey, this.guardService.str);
            this.router.navigate(['']);
          }
        });
    } else {
      console.warn('You did not enter email or password');
    }
  }

  getAccess() {
    let user = JSON.stringify(
      {
        newuser:
        {
          firstname: this.accessModel.firstname,
          lastname: this.accessModel.lastname,
          phone: this.accessModel.phone,
          email: this.accessModel.email,
          password: this.accessModel.password,
          company: this.accessModel.company || null,
          title: this.accessModel.title || null
        }
      });
    this.loading = true;
    this.guardService.getAccess(user)
      .then(response => {
        console.log(response);
        this.loading = false;
        if (response.result === 'OK') {
          this.alertService.success(response.message);
        } else if (response.result === 'FAIL') {
          this.alertService.danger(response.message);
        }
      });
  }

  showForm(str: string) {
    this.activeform = str;
  }
}
