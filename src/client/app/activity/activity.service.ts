import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IVideo } from './activity.model';


@Injectable()

export class ActivityService {

  constructor(private http: Http) {
  }

  get(term: string): Promise<IVideo[]> {
    return this.http.get(`/api/videos${term}`)
      .toPromise()
      .then((response: Response) => { return response.json() as IVideo[]; })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}

