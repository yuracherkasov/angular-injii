import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { GuardService } from '../guard/guard.service';


declare const sessionStorage: any;

@Injectable()

export class AuthGuardService implements CanActivate {

  storageValue: string;
  isLoggedin: boolean;
  
  constructor ( private router: Router, private guardService: GuardService ) { }

  canActivate(): boolean {
    if (this.guardService.checkIsLogin()) {
      return true;
    }
    this.router.navigate(['/guard']);
    return false;
  }
}

