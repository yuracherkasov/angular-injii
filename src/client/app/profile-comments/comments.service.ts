import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from './../services/request-options.service';
import { ApiService } from '../services/api.service';

@Injectable()

export class CommentsService {
  constructor(private http: Http,
    private requestOptionsService: RequestOptionsService, private apiService: ApiService) { }

  getAll(username: string, term: string): Promise<any> {
    //console.log('/api/comments/'+ username + term);
    return this.apiService.get('/api/get_comments/'+ username + term, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  update(comment: any): Promise<any> {
    return this.apiService.put('/api/update_comment/' + comment.id, comment, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  del(id: string): Promise<any> {
    return this.apiService.del('/api/delete_comment/' + id, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  add(username: string, text: any): Promise<any> {
    return this.apiService.post('/api/profile_comment',  {'user_id':username, 'message': text}, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

}
