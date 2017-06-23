import { Injectable } from '@angular/core';

import { Video } from '../models/video';
import { ApiService } from '../../services/api.service';
import { RequestOptionsService } from '../../services/request-options.service';

//import 'rxjs/add/operator/toPromise';

@Injectable()
export class ScheduleBarService {
  constructor(
    private apiService: ApiService,
    private requestOptionsService: RequestOptionsService
    ) { }

  getVideosByDate(date: string): Promise<Video[]> {
    return this.apiService.get('/api/videos/?date=' + date)
      .toPromise()
      .then(response => response.json().videos as Video[])
      .catch(this.requestOptionsService.handleError);
  }
}
