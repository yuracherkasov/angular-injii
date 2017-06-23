import { Injectable } from '@angular/core';
import { RequestOptionsService } from '../../services/request-options.service';
import { ApiService } from '../../services/api.service';

@Injectable()

export class ProfileService {
  constructor(private requestOptionsService: RequestOptionsService, private apiService: ApiService) { }

  getProfile(username: string): Promise<any> {
    return this.apiService.get('/api/charity/' + username)
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

}
