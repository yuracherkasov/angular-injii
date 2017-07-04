import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Video } from './models/video';
import { ApiService } from '../services/api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AddContentService {
  constructor(private http: Http, private apiService: ApiService) { }

  getVideosByArtist(id: number): Promise<Video[]> {
    return this.apiService.get(`/api/artist/${id}/videos`)
      .toPromise()
      .then(response => response.json().videos as Video[])
      .catch(this.handleError);
  }

  getCharities(): Promise<any> {
    return this.apiService.get(`/api/charities`)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  getMaxVideoDuration(): Promise<number> {
    return this.apiService.get('/api/max-video-duration')
      .toPromise()
      .then(response => response.json().data.duration)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
