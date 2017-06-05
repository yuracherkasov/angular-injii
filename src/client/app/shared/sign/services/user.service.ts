import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { RequestOptionsService } from "../../../services/request-options.service";
import { ApiService } from '../../../services/api.service';

@Injectable()
export class UserService {

  constructor(private http: Http, private requestOptionsService: RequestOptionsService, private apiService: ApiService) {
  }

  signup(user: any): Promise<Object> {
    console.log("User register request url: /api/register,  User register request body: " + user)
    return this.apiService.post('/api/register', user)
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "User register catch"));
  }

  update(user: Object): Promise<any> {
    return this.apiService.put('/api/auth/update_profile', {user})
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "User update catch"));
  }

  updatePassword(old_password: any, new_password: any): Promise<any> {
    return this.apiService.post('/api/auth/updatepass', { 'old_password':old_password, 'new_password': new_password })
      .toPromise()
  }

  updateUser(user: any): Promise<any> {
    return this.apiService.post('/api/auth/update_profile', user)
      .toPromise()
  }

}
