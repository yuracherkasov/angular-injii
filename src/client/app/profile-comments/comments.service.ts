import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { RequestOptionsService } from './../services/request-options.service';
import { ApiService } from '../services/api.service';

@Injectable()

export class CommentsService {
  constructor(private requestOptionsService: RequestOptionsService,
              private apiService: ApiService) { }

  getAll(username: string, term: string): Promise<any> {
    console.log("Comments request: " + '/api/comments/'+ username + term);
    return this.apiService.get('/api/comments/'+ username + term)
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Get Comments error"));
  }

  update(comment: any): Promise<any> {
    return this.apiService.put('/api/comments/' + comment.id,  {"confirmed":"active"})
      .toPromise()
      .then(response => response.json(), reject => reject.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Update Comments error"));
  }

  del(id: string): Promise<any> {
    return this.apiService.del('/api/comments/' + id)
      .toPromise()
      .then(response => response.json(), reject => reject.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Delete Comments error"));
  }

  add(username: string, text: string): Promise<any> {
    return this.apiService.post('/api/comments/' + username,  {'text': text})
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Add Comments error"));
  }

}
