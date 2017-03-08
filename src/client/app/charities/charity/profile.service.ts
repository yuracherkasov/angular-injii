import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()

export class ProfileService {
  constructor(private http: Http) { }

  getProfile(username: string): Promise<any> {
    //replace on: return this.http.get('/api/charity/:username')
    return this.http.get('/api/artist/' + username)
      .toPromise()
      //replace on: .then(response => response.json().charity)
      .then(response => response.json().artist)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


}