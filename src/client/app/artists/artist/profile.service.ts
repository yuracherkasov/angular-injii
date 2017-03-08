import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from "../../services/request-options.service";


@Injectable()

export class ProfileService {
  constructor(private http: Http,
    private requestOptionsService: RequestOptionsService) { }

  getProfile(username: string): Promise<any> {
    console.log( '/api/artist/' + username )
    return this.http.get('/api/artist/' + username)
      .toPromise()
      .then(response => response.json().artist)
      .catch(this.requestOptionsService.handleError);
  }

}

