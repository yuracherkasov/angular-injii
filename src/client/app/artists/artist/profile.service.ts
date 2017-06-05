import { Injectable } from '@angular/core';
import { RequestOptionsService } from "../../services/request-options.service";
import { ApiService } from '../../services/api.service';


@Injectable()

export class ProfileService {
  constructor(
    private requestOptionsService: RequestOptionsService,
    private apiService: ApiService) { }

  getProfile(username: string): Promise<any> {
    console.log( '/api/artist/' + username )
    return this.apiService.get('/api/artist/' + username)
      .toPromise()
      .then(response => response.json().artist)
      .catch(this.requestOptionsService.handleError);
  }

}

