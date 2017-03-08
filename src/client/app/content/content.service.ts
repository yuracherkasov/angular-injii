import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RequestOptionsService } from "./../services/request-options.service";

import 'rxjs/add/operator/toPromise';

@Injectable()

export class ContentService {

  constructor(
    private http: Http,
    private requestOptionsService: RequestOptionsService
  ) {
    this.limitInstall();
  }

  limitInstall(){
    let windowWidth = document.documentElement.clientWidth;
    if (windowWidth > 1800) return 6
    if (windowWidth <= 1800 && windowWidth >= 1560) return 5
    else if ( (windowWidth < 1560 && windowWidth > 1320) || (windowWidth <= 991) ) return 4
    else return 3
  }

  getContent(term: string): Promise<any> {
    console.log(`/api/videos${term}`)
    return this.http.get('/api/videos' + term)
      .toPromise()
      .then(response => response.json().videos)
      .catch(this.requestOptionsService.handleError);
  }

}
