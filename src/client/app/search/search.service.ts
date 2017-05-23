import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISitem } from './model';
import { ApiService } from '../services/api.service';

@Injectable()

export class SearchService {

  filter: string = '';

  constructor(private http: Http, private apiService: ApiService) {
  }

  search(term: string): Observable<ISitem[]> {
    console.log('/api/search/?filter=' + term);
    return this.apiService.get('/api/search/?filter=' + term)
      .map((r: Response) => {
        return r.json().items as ISitem[];
      }
      );
  }

}

