import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Charity } from './charity.model';

@Injectable()

export class CSearchService {

  filter: string = '';
  order: string = 'donations';

  private searchCharitiesSource = new Subject<string>();

  searchEmitter = this.searchCharitiesSource.asObservable();

  changeOrderProperty(order: string) {
    this.order = order;
    this.searchCharitiesSource.next(order);
  }

  constructor(private http: Http) {}

  search(term: string): Observable<Charity[]> {
    console.log(`/api/charitiesFake${term}`);
    return this.http
      //.get(`/api/charities${term}`) 
      .get(`/api/artistsFake${term}`)
      .map((r: Response) => {
        //return r.json().charities as Charity[]
        return r.json().artists as Charity[]
      }
      );

  }

}
