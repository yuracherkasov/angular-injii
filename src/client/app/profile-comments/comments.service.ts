import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from './../services/request-options.service';


@Injectable()

export class CommentsService {
  constructor(private http: Http,
    private requestOptionsService: RequestOptionsService) { }

  getAll(username: string, term: string): Promise<any> {
    //console.log('/api/comments/'+ username + term);
    return this.http.get('/api/comments/'+ username + term, this.requestOptionsService.jwt()) 
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  update(comment: any): Promise<any> {
    return this.http.put('/api/comments/' + comment.id, comment, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  delete(id: string): Promise<any> {
    return this.http.delete('/api/comments/' + id, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  add(username: string, text: any): Promise<any> {
    return this.http.post('/api/comments/' + username, {'text': text}, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

}
