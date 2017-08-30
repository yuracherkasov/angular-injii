import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { ApiService } from '../services/api.service';
import { RequestOptionsService } from '../services/request-options.service';

@Injectable()
export class VideoDurationService {

  private currentVideoDurationSource = new Subject<number>();
  changeDurationObservable = this.currentVideoDurationSource.asObservable();

  constructor(
    private apiService: ApiService,
    private requestOptionsService: RequestOptionsService) { }

  getMaxDuration(): Promise<any> {
    return this.apiService.get('/maxduration')
      .toPromise()
      .then(response => response.json(), reject => reject.json())
      .catch(this.requestOptionsService.handleError)
  }
  
  setMaxDuration(amount: number): void {
    this.currentVideoDurationSource.next(amount);
  }

}
