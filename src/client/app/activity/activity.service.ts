import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IVideo } from './activity.model';
import { ApiService } from '../services/api.service';


@Injectable()

export class ActivityService {

  constructor(private http: Http, private apiService: ApiService) {
  }

  get(term: string): Promise<IVideo[]> {
    //return this.apiService.get(`/api/videos${term}`)
    return this.http.get('app/FAKE_DATA/content.json')
      .toPromise()
      .then((response: Response) => { return response.json() as IVideo[]; })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}

