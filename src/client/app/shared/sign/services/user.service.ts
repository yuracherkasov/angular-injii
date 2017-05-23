import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { RequestOptionsService } from "../../../services/request-options.service";
import { ApiService } from '../../../services/api.service';

@Injectable()
export class UserService {

  constructor(private http: Http, private requestOptionsService: RequestOptionsService, private apiService: ApiService) {
  }

  signup(user: any): Promise<Object> {
    return this.apiService.post('/api/register', user, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  update(user: Object): Promise<any> {
    return this.apiService.put('/api/auth/update_profile', {user}, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  updatePassword(old_password: any, new_password: any): Promise<any> {
    return this.apiService.post('/api/auth/updatepass', { 'old_password':old_password, 'new_password': new_password }, this.requestOptionsService.jwt())
      .toPromise()
  }

  updateUser(user: any): Promise<any> {
    return this.apiService.post('/api/auth/update_profile', user, this.requestOptionsService.jwt())
      .toPromise()
  }

}
