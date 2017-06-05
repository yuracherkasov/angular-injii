import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { RequestOptionsService } from './../services/request-options.service';
import { ApiService } from '../services/api.service';

@Injectable()

export class CommentsService {
  constructor(private requestOptionsService: RequestOptionsService,
              private apiService: ApiService) { }

  getAll(username: string, term: string): Promise<any> {
    console.log("Comments request: " + '/api/get_comments/'+ username + term);
    return this.apiService.get('/api/get_comments/'+ username + term)
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Get Comments error"));
  }

  update(comment: any): Promise<any> {
    return this.apiService.put('/api/update_comment/' + comment.id, comment)
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Update Comments error"));
  }

  del(id: string): Promise<any> {
    return this.apiService.del('/api/delete_comment/' + id)
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Delete Comments error"));
  }

  add(username: string, text: any): Promise<any> {
    return this.apiService.post('/api/profile_comment',  {'user_id':username, 'message': text})
      .toPromise()
      .then(response => response.json())
      .catch((e) => this.requestOptionsService.handleError(e, "Add Comments error"));
  }

}
