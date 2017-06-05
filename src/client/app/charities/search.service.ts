import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiService } from '../services/api.service';

import { Charity } from './charity.model';

@Injectable()

export class CSearchService {

  filter: string = '';
  order: string = 'donations';
  searchCharitiesSource = new Subject<string>();
  searchEmitter = this.searchCharitiesSource.asObservable();

  changeOrderProperty(order: string) {
    this.order = order;
    this.searchCharitiesSource.next(order);
  }

  constructor(private http: Http, private apiService: ApiService) {}

  search(term: string): Observable<Charity[]> {
    console.log("Charities request: " + '/api/charities' + term)
    return this.apiService.get('/api/charities' + term)
      .map((r: Response) => {
        return r.json().charities as Charity[];
      });
  }

}
