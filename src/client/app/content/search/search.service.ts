import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from 'underscore';

import { Video } from './search.model';

@Injectable()

export class SearchService {
  private SubjectSource = new Subject<Object>();
  paginationObservable = this.SubjectSource.asObservable();

  paginationViewChange(argumentObj: Object) {
    this.SubjectSource.next(argumentObj);
  }

  constructor(private http: Http) {

  }

  search(term: string): Observable<Video[]> {

    console.log('/api/videos' + term)
    return this.http
      .get(`/api/videos${term}`)
      .map((r: Response) => {
        let data = r.json();
        let totalItems = data.totalItems;
        let offset = data.offset;
        this.getPager(totalItems, offset);
        return r.json().videos as Video[];
      });
  }


  getPager(totalItems: number, offset: number) {
    let itemsSize: number = 7;

    let currentPage = Math.ceil((offset + 1) / 10);
    let totalPages = Math.ceil(totalItems / 10);

    let itemsSizeHalfMin = Math.floor(itemsSize / 2);
    let itemsSizeHalfMax = Math.ceil(itemsSize / 2);

    if (currentPage >= 1 || currentPage <= totalPages) {

      let startPage: number, endPage: number;
      if (totalPages <= itemsSize) {

        startPage = 1;
        endPage = totalPages + 1;
      } else {

        if (currentPage <= (itemsSize - itemsSizeHalfMin)) {
          startPage = 1;
          endPage = itemsSize;
        } else if (currentPage + itemsSizeHalfMin >= totalPages) {
          startPage = totalPages - (itemsSize - 1);
          endPage = totalPages;
        } else {
          startPage = currentPage - itemsSizeHalfMax;
          endPage = currentPage + itemsSizeHalfMin;
        }
      }

      let pages = _.range(startPage, endPage);

      let argumentObj = {
        pages: pages,
        currentPage: currentPage,
        totalPages: totalPages
      };
      this.paginationViewChange(argumentObj);
    }
  }
}
