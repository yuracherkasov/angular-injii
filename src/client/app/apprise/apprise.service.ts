import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Response } from '@angular/http';

import { IApprise } from './apprise.model';
import { RequestOptionsService } from '../services/request-options.service';

@Injectable()

export class AppriseService {

  constructor(private requestOptionsService: RequestOptionsService,  private apiService: ApiService) {
  }

  get(term: string): Promise<IApprise> {
    console.log('Apprise request: ' + '/api/apprise' + term);
    return this.apiService.get('/api/apprise' + term)
    .toPromise()
    .then((response: Response) => { return response.json() as IApprise; })
    .catch(this.requestOptionsService.handleError);
  }

  sendArticle(mess: string): Promise<any> {
    return this.apiService.post('/api/apprise', mess)
      .toPromise()
      .then((response: Response) => { return response.json(); })
      .catch(this.requestOptionsService.handleError);
  }

}
