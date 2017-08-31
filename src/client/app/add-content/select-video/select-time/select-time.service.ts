import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from '../../../services/request-options.service';
import { ApiService } from '../../../services/api.service';

@Injectable()

export class SelectTimeService {
  constructor(
    private http: Http,
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService) { }

  getShedule(param: string): Promise<any> {
    console.log(param);
    // return this.apiService.get(param)
    //   .toPromise()
    //   .then(response => response.json(), reject => reject.json())
    //   .catch((e) => this.requestOptionsService.handleError(e, 'Get available time on Add Content page'));

    return this.http.get('app/FAKE_DATA/shedule.json')
      .toPromise()
      .then(response => {
        return new Promise((res, rej) => {
          setTimeout(() => res(response.json()), 1000);
        })
      })
      .catch(this.requestOptionsService.handleError);
  }



}
