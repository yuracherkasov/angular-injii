import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiService } from '../services/api.service';

import { Charity } from './charity.model';

@Injectable()

export class CSearchService {

  filter: string = '';
  order: string = 'city';
  searchCharitiesSource = new Subject<string>();
  searchEmitter = this.searchCharitiesSource.asObservable();

  changeOrderProperty(order: string) {
    this.order = order;
    this.searchCharitiesSource.next(order);
  }

  constructor(private apiService: ApiService) {}

  search(term: string): Observable<Charity[]> {
    console.log("Charities request: " + '/api/charities' + term)
    return this.apiService.get('/api/charities' + term)
      .map(r => r.json().charities as Charity[])
      .catch(this.handleError);
  }

   handleError(error: any): Observable<Charity[]> {
    console.warn("Charities reject: ", error);
    return Observable.of<Charity[]>([]);
  }

}
