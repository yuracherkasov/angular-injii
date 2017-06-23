import { Injectable } from '@angular/core';
//import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { RequestOptionsService } from './request-options.service';
import { Http, Response } from '@angular/http';

@Injectable()

export class ApiService {

  url: string = 'http://54.157.10.121:80/laravel-admin/public';

  constructor(private http: Http, private requestOptionsService: RequestOptionsService) {}

  get(address: string) {
     return this.http.get(this.url + address, this.requestOptionsService.jwt());
  };

  post(address: string, mess:any) {
    return this.http.post(this.url + address, mess,  this.requestOptionsService.jwt());
  };

  put(address: string, data:any) {
    return this.http.put(this.url + address, data,  this.requestOptionsService.jwt());
  };

  patch(address: string, data:any) {
    return this.http.patch(this.url + address, data,  this.requestOptionsService.jwt());
  };

  del(address: string) {
    return this.http.delete(this.url + address, this.requestOptionsService.jwt());
  };

}
