import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from './../services/api.service';
import { RequestOptionsService } from './../services/request-options.service';

declare const sessionStorage: any;

@Injectable()

export class GuardService {

  str: string = 'User isLogin';
  storageKey:string = 'InjiiUserStatus';
  storageValue: string;
  
  constructor (
    private apiService: ApiService,
    private requestOptionsService: RequestOptionsService
    ) { }

  checkIsLogin(): boolean {
    let storageValue = this.storageValue ? this.storageValue : sessionStorage.getItem(this.storageKey);
    if(storageValue === this.str) {
      this.storageValue = storageValue;
      return true;
    };
    return false;
  }

  login(email: string, password: string): Promise<any>  {
    return this.apiService.post('/api/newusersignin',  JSON.stringify({email, password}))
    .toPromise()
    .then(response => response.json(), regect => regect.json())
    .catch((e) => this.requestOptionsService.handleError(e, 'Guard login catch'));
  }

   getAccess(user: any): Promise<any>  {
    return this.apiService.post('/api/sendemail', user)
    .toPromise()
    .then(response => {console.log(response.json()); return response.json();}, regect => regect.json())
    .catch((e) => this.requestOptionsService.handleError(e, 'Guard service'));
  }
}

