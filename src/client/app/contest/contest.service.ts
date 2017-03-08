import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from "./../services/request-options.service";


@Injectable()

export class ContestService {

  constructor
    (
    private http: Http,
    private requestOptionsService: RequestOptionsService
    ) {}


  getContest(name: string): Promise<any> {
    return this.http.get('/api/contest/' + name, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  submitVote(vote: number, username: string): Promise<any> {
    return this.http.patch('/api/contest/' + username, { "votes": vote }, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }
}
