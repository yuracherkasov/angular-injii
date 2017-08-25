import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import { Video } from './models/video';
import { ApiService } from '../services/api.service';
import { RequestOptionsService } from '../services/request-options.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AddContentService {
  constructor(
    private apiService: ApiService,
    private requestOptionsService: RequestOptionsService,
    private http: Http) { }


  getProfile(username: string): Promise<any> {
    //return this.apiService.get('/api/artist/' + username)
    return this.http.get('app/FAKE_DATA/artist.json')
      .toPromise()
      .then(response => {
        return new Promise((res, rej) => {
          setTimeout(() => res(response.json()), 2000);
        })   
      })
      //.then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, 'Get Artist profile on Add Content page'));
  } 






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
