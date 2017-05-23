import { Injectable } from '@angular/core';
import { RequestOptionsService } from '../services/request-options.service';
import { ApiService } from '../services/api.service';
import { Http, Response } from '@angular/http';

import { IApprise } from './apprise.model';


@Injectable()

export class AppriseService {

  constructor(private http: Http, private requestOptionsService: RequestOptionsService, private apiService: ApiService) {
  }

  get(term: string): Promise<IApprise> {
     return this.apiService.get('/api/apprise', this.requestOptionsService.jwt())
      .toPromise()
      .then((response: Response) => { return response.json() as IApprise; })
      .catch(this.handleError);
  }

  sendArticle(mess: string): Promise<any> {
    return this.apiService.post('/api/apprise', mess, this.requestOptionsService.jwt())
      .toPromise()
      .then((response: Response) => { return response.json(); })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
