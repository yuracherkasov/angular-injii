import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { RequestOptionsService } from "../../../services/request-options.service";

@Injectable()
export class UserService {

  constructor(private http: Http, private requestOptionsService: RequestOptionsService) {
  }

  signup(user: any, password: string): Promise<Object> {
    return this.http.post('/api/auth/signup', { user, password })
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  update(user: Object): Promise<any> {
    return this.http.put('/api/auth/update', {user}, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  updatePassword(old_password: any, new_password: any): Promise<any> {
    return this.http.post('/api/auth/updatepass', { old_password, new_password }, this.requestOptionsService.jwt())
      .toPromise()
  }

  updateUser(user: any): Promise<any> {
    return this.http.post('/api/auth/update', user, this.requestOptionsService.jwt())
      .toPromise()
  }

}
