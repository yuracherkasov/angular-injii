import { Injectable } from '@angular/core';
import { RequestOptionsService } from "../services/request-options.service";
import { Http, Response } from '@angular/http';
import { IMessage } from './chat.model'


@Injectable()

export class ChatService {

  constructor(private http: Http, private requestOptionsService: RequestOptionsService) {
  }

  get(type: string): Promise<IMessage> {
    return this.http.get('/api/chat/' + type)
      .toPromise()
      .then((response: Response) => { return response.json() as IMessage })
      .catch(this.handleError);
  }

  getNewMessages(type: string, id: number): Promise<IMessage> {
    return this.http.get('/api/chat/' + type + '/' + id)
      .toPromise()
      .then((response: Response) => { return response.json() as IMessage })
      .catch(this.handleError);
  }

  post(type: string, message: IMessage): Promise<any> {
    return this.http.post('/api/chat/' + type, message/*, this.requestOptionsService.jwt()*/)
      .toPromise()
      .then((response: Response) => { return response.json() })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
