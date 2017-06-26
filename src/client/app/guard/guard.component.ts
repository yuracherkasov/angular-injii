import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from './guard.service';

declare const sessionStorage: any;

@Component({
  moduleId: module.id,
  selector: 'sd-guard',
  templateUrl: 'guard.component.html',
  styleUrls: ['guard.component.css']
})
export class GuardComponent {
  constructor(
    public guardService: GuardService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    if (!!email && !!password) {
      this.guardService.login(email, password)
        .then(response => {
          console.log(response);
          if (response.result === 'OK') {
            sessionStorage.setItem(this.guardService.storageKey, this.guardService.str)
            this.router.navigate(['']);
          }
        })
    } else {
      console.warn('You did not enter email or password')
    }
  }

  signup(firstname: string, lastname: string, phone: string, email: string, password: string, company: string, title: string) {
    let user = JSON.stringify({newuser: {firstname, lastname, phone, email, password, company, title}});
    console.log(user)
    this.guardService.signup(user)
      .then(response => {
        console.log(response);
        if (response.result === 'OK') {
          console.log(response.message);
        };
      });
  }
}
