import { Injectable } from '@angular/core';
import { RequestOptionsService } from '../services/request-options.service';
import { Http, Response } from '@angular/http';

import { IApprise } from './apprise.model';


@Injectable()

export class AppriseService {

  constructor(private http: Http, private requestOptionsService: RequestOptionsService) {
  }

  get(term: string): Promise<IApprise> {
    console.log('term: ' + term);
    return this.http.get('/api/apprise' + term)
      .toPromise()
      .then((response: Response) => { return response.json() as IApprise; })
      .catch(this.handleError);
  }

  sendArticle(mess: string): Promise<any> {
    return this.http.post('/api/apprise', mess, this.requestOptionsService.jwt())
      .toPromise()
      .then((response: Response) => { return response.json(); })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
