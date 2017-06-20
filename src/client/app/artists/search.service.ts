import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiService } from '../services/api.service';

import { Artist } from './search.model';


@Injectable()

export class ASearchService {

  filter: string = '';
  order: string = 'rating';
  searchArtistsSource = new Subject<string>();

  searchEmitter = this.searchArtistsSource.asObservable();

  changeOrderProperty(order: string) {
    this.order = order;
    this.searchArtistsSource.next(order);
  }

  constructor(private http: Http, private apiService: ApiService) {
  }

  search(term: string): Observable<Artist[]> {
    console.log('Artists request: ' + '/api/artists' + term);
    return this.apiService.get('/api/artists' + term)
      .map(r => r.json().artists as Artist[])
      .catch(this.handleError);
  }

  handleError(error: any): Observable<Artist[]> {
    console.warn('Artists reject: ', error);
    return Observable.of<Artist[]>([]);
  }

}


