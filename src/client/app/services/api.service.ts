import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Http, Response } from '@angular/http';
import Promise = webdriver.promise.Promise;

@Injectable()

export class ApiService {

  constructor(private http: Http) {}

  get(address: string, options:any): Promise<any> {
     return this.http.get('http://54.157.10.121:80/laravel-admin/public' + address, new RequestOptions({
      headers: new Headers({
        'Origin': 'http://localhost:5556',
        'Access-Control-Allow-Origin': '*'
      })
    }));
  }

  post(address: string, mess:any, requestOptionsService:any): Promise<any> {
    return this.http.post('http://54.157.10.121:80/laravel-admin/public' + address, mess,  requestOptionsService);
  }

  put(address: string, data:any, requestOptionsService:any): Promise<any>{
    return this.http.put('http://54.157.10.121:80/laravel-admin/public' + address, data,  requestOptionsService);
  }

  patch(address: string, data:any, requestOptionsService:any): Promise<any>{
    return this.http.patch('http://54.157.10.121:80/laravel-admin/public' + address, data,  requestOptionsService);
  }

  del(address: string, requestOptionsService:any): Promise<any>{
    return this.http.delete('http://54.157.10.121:80/laravel-admin/public' + address, requestOptionsService);
  }

}
