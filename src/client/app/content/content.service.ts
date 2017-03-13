import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ScreenService } from './../services/screen.service';
import { RequestOptionsService } from "./../services/request-options.service";
import { Subject } from "rxjs/Subject"

import 'rxjs/add/operator/toPromise';

@Injectable()

export class ContentService {

  limit: number;

  private subjLimitSource = new Subject();
  limitObservable = this.subjLimitSource.asObservable();

  constructor(
    private http: Http,
    private requestOptionsService: RequestOptionsService,
    private screenService: ScreenService
  ) {
    this.setLimit(this.screenService.screen);

    this.screenService.screenObservable.subscribe((val) => {
      this.setLimit(val)
    })
  }

  setLimit(val: number) {
    let lim: number;
    switch (true) {
      case (val > 1800):
        lim = 6;
        break;
      case (val <= 1800 && val >= 1560):
        lim = 5;
        break;
      case ((val < 1560 && val > 1320) || (val <= 991)):
        lim = 4;
        break;
      default:
        lim = 3;
        break;
    }
    if (lim != this.limit) {
      this.limit = lim;
      this.subjLimitSource.next()
    }
  }

  getContent(term: string): Promise<any> {
    console.log(`/api/videos${term}`)
    return this.http.get('/api/videos' + term)
      .toPromise()
      .then(response => response.json().videos)
      .catch(this.requestOptionsService.handleError);
  }

}
