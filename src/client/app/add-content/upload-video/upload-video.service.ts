import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from '../../services/request-options.service';
import { ApiService } from '../../services/api.service';

@Injectable()

export class UploadVideoService {
  constructor(
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService,
    private http: Http) { }

  sendMessage(message: string): Promise<any> {
    // return this.apiService.post("/admin-messages", {message})
    //   .toPromise()
    //   .then(response => response.json(), reject => reject.json())
    //   .catch((e) => this.requestOptionsService.handleError(e, 'Send messagege for admin'));
    return new Promise((res, rej) => {
      setTimeout(() => res({result: 'OK', message: 'Your message has been sent'}), 1000);
    })   
  }

}
