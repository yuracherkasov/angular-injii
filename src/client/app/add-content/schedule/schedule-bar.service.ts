import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Video } from '../models/video';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ScheduleBarService {
  constructor(private http: Http) { }

  getVideosByDate(date: string): Promise<Video[]> {
    return this.http.get('/api/videos/?date=' + date)
              .toPromise()
              .then(response => response.json().videos as Video[])
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
