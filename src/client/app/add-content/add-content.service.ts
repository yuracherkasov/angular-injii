import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Video } from './models/video';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArtistProfileService {
  constructor(private http: Http) { }

  getVideosByArtist(id: number): Promise<Video[]> {
    return this.http.get(`/api/artist/${id}/videos`)
      .toPromise()
      .then(response => response.json().videos as Video[])
      .catch(this.handleError);
  }

  getCharities(): Promise<any> {
    return this.http.get(`/api/charities`)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  getMaxVideoDuration(): Promise<number> {
    return this.http.get('/api/max-video-duration')
      .toPromise()
      .then(response => response.json().data.duration)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
