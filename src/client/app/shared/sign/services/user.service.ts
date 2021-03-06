﻿import { Injectable } from '@angular/core';
import { RequestOptionsService } from '../../../services/request-options.service';
import { ApiService } from '../../../services/api.service';

@Injectable()
export class UserService {

  constructor(
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService) {
  }

  signup(user: any): Promise<Object> {
    console.log('User register request url: /api/auth/signup,  User register request body: ', user);
    return this.apiService.post('/api/auth/signup',  JSON.stringify({user}))
      .toPromise()
      .then(response => response.json(), regect => regect.json())
      .catch((e) => this.requestOptionsService.handleError(e, 'User register catch'));
  }

  update(user: any): Promise<any> {
    console.log('User update request body: ' + JSON.stringify(user), this.requestOptionsService.jwt());
    return this.apiService.put('/api/auth/update', JSON.stringify(user))
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, 'User update catch'));
  }

  updatePassword(old_password: string, new_password: string): Promise<any> {
    console.log('/api/auth/updatepass: ',  JSON.stringify([{'key':'old_password','value':old_password},{'key':'new_password','value':new_password}]), this.requestOptionsService.jwt() );
    return this.apiService.put('/api/auth/updatepass', [{'key':'old_password','value':old_password},{'key':'new_password','value':new_password}])
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, 'User change password catch'));
  }
}
