import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from '../../../services/request-options.service';
import { ApiService } from '../../../services/api.service';

@Injectable()

export class SelectCharityService {
  constructor(
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService,
    private http: Http) { }

  getCharities(): Promise<any> {
    console.log("get charities call");
    // return this.apiService.get("charities")
    //   .toPromise()
    //   .then(response => response.json(), reject => reject.json())
    //   .catch((e) => this.requestOptionsService.handleError(e, 'Get charities on Add Content page'));
    return this.http.get('app/FAKE_DATA/charities.json')
      .toPromise()
      .then(response => {
        return new Promise((res, rej) => {
          setTimeout(() => res(response.json()), 1000);
        })   
      })
      .catch((e) => this.requestOptionsService.handleError(e, 'Get Artist profile on Add Content page'));

  }

}
