import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
import { RequestOptionsService } from './request-options.service';
import { ApiService } from '../services/api.service';

@Injectable()

export class ArtistRatingService {

  constructor
    (
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService
    ) { }

  submitVote(n: number, id: string): Promise<any> {
    let param = JSON.stringify({ "stars":n });
    console.log('/api/artist/' + id + '/vote',  param, this.requestOptionsService.jwt());
    return this.apiService.put('/api/artist/' + 117 + '/vote',  param)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  handleError(e: any){
    console.log(e)
  }
}

