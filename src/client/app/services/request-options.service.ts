import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { ConstantsService } from './constants.service';

@Injectable()

export class RequestOptionsService {

  constructor(private constantsService: ConstantsService) { }

  jwt(): any {
    let user = this.constantsService.User;
    if (user && user.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + user.token });
      return new RequestOptions({ headers: headers });
    } else {
      return new RequestOptions({ headers: new Headers({}) });
    }
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
