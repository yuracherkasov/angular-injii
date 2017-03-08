import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import { ConstantsService } from '../../../services/constants.service';

@Injectable()
export class AuthService {
  constructor(private http: Http, private constantsService: ConstantsService) { }

  login(username: string, password: string, remember: boolean): Promise<Object> {
    return this.http.post('/api/auth/signin', JSON.stringify({username, password, remember}))
      .toPromise()
      .then((response) => {
        let result = response.json();
        if(remember){
          localStorage.setItem('currentUser', JSON.stringify(result.user));
        }
        this.constantsService.setUser(result.user);
        console.log("loginservice ", result)
        return result
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  requestPasswordRestore(email: string): Promise<Object> {
    return this.http.post('/api/auth/restore', JSON.stringify({email}))
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
