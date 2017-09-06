import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ApiService } from '../services/api.service';
import { RequestOptionsService } from '../services/request-options.service';

@Injectable()
export class AddContentService {
  constructor(
    private apiService: ApiService,
    private requestOptionsService: RequestOptionsService,
    private http: Http
  ) { }


  getProfile(username: string): Promise<any> {
    //return this.apiService.get('/api/artist/' + username)
    return this.http.get('app/FAKE_DATA/artist.json')
      .toPromise()
      .then(response => {
        return new Promise((res, rej) => {
          setTimeout(() => res(response.json()), 500);
        })   
      })
      //.then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, 'Get Artist profile on Add Content page'));
  } 

  
}
