import { Injectable } from '@angular/core';
import { RequestOptionsService } from '../services/request-options.service';
import { Response } from '@angular/http';
import { IMessage } from './chat.model';
import { ApiService } from '../services/api.service';


@Injectable()

export class ChatService {

  constructor(private requestOptionsService: RequestOptionsService,  private apiService: ApiService) {
  }

  get(type: string): Promise<IMessage> {
    return this.apiService.get('/api/chat/' + type)
      .toPromise()
      .then((response: Response) => { return response.json() as IMessage; })
      .catch(this.requestOptionsService.handleError);
  }

  getNewMessages(type: string, id: number): Promise<IMessage> {
    return this.apiService.get('/api/chat/' + type + '/' + id)
      .toPromise()
      .then((response: Response) => { return response.json() as IMessage; })
      .catch(this.requestOptionsService.handleError);
  }

  post(type: string, message: IMessage): Promise<any> {
    return this.apiService.post('/api/chat/' + type, message)
      .toPromise()
      .then((response: Response) => { return response.json(); })
      .catch(this.requestOptionsService.handleError);
  }

}
