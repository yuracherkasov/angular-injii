import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import { Artist } from './search.model';


@Injectable()

export class ASearchService {

  filter: string = '';
  order: string = 'stars';
  private searchArtistsSource = new Subject<string>();

  searchEmitter = this.searchArtistsSource.asObservable();

  changeOrderProperty(order: string) {
    this.order = order;
    this.searchArtistsSource.next(order);
  }

  constructor(private http: Http) {
  }

  search(term: string): Observable<Artist[]> {
    console.log('Request: /api/artistsFake' + term + " replace on: /api/artists" + term);
    //replase on: return this.http.get('/api/artists' + term)
    return this.http.get('/api/artistsFake' + term)
      .map((r: Response) => {
        return r.json().artists as Artist[];
      }
      );

  }

}


