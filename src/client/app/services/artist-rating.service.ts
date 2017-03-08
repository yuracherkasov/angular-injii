import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { RequestOptionsService } from "./request-options.service";

@Injectable()

export class ArtistRatingService {

  constructor
    (
    private http: Http,
    private requestOptionsService: RequestOptionsService,
    ) { }

  submitVote(n: number, id: string): Promise<any> {
    return this.http.put('/api/artist/' + id + '/vote', { "stars": n }, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }
}

