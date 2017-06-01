import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { RequestOptionsService } from './request-options.service';
import { ApiService } from '../services/api.service';

@Injectable()

export class ArtistRatingService {

  constructor
    (
    private http: Http,
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService
    ) { }

  submitVote(n: number, id: string): Promise<any> {
    return this.apiService.put('/api/artist/' + id + '/vote', { 'stars': n }, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }
}

