import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { ConstantsService } from './constants.service';

@Injectable()

export class RequestOptionsService {

  constructor(private constantsService: ConstantsService) {}

  jwt(): any {
    let user = this.constantsService.User;
    if (user && user.token) {
      let headers = new Headers({
         'Authorization': 'Bearer ' + user.token,
         'Content-Type': 'application/json'
         });
      return new RequestOptions({ headers: headers });
    } else {
      return new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'}) });
    }
  }


  handleError(error: any, descr?: string): Promise<any> {
    descr ?  console.warn(descr + ': ', error) : console.warn("Handler Error: ", error);
    return Promise.reject(error.message || error);
  }



}
