import { Injectable } from '@angular/core';
import { RequestOptionsService } from '../../../services/request-options.service';
import { ApiService } from '../../../services/api.service';

@Injectable()

export class SelectTimeService {
  constructor(
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService) { }

  getShedule(param: string): Promise<any> {
    console.log(param);
    // return this.apiService.get(param)
    //   .toPromise()
    //   .then(response => response.json(), reject => reject.json())
    //   .catch((e) => this.requestOptionsService.handleError(e, 'Get available time on Add Content page'));
    return new Promise( (resp, rej) => {
      setTimeout(() => {
        resp(param)
      }, 1500)
    }) 
  }

}
