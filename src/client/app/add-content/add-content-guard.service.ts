import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ConstantsService } from '../services/constants.service';


@Injectable()

export class AddContentGuardService implements CanActivate {

  constructor ( private router: Router, private constantsService: ConstantsService ) { }

  canActivate(): boolean {
    if (this.constantsService.User && this.constantsService.User.role === 'artist') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}

