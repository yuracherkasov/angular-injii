import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Config } from './../shared/config/env.config';

@Injectable()

export class ConstantsService {

  subjUserSource = new Subject<string>();
  userObservable = this.subjUserSource.asObservable();

  User: any;
  homeUrl: string = 'http://opus.injii.com';
  //Wepay API Keys:
  CLIENT_ID: number = 201132;
  //facebook app ID:
  fbAppId: string;
  //google client_id:
  gClient_id: string;
  //twitter
  TwKey: string;
  TwSecret: string;

  constructor() {
    if (Config.ENV === 'DEV') {
      this.fbAppId = '208503652949540';
      this.gClient_id = '498761886009-02hqd66sdcbh9ipmug1734d6ibbk6rc4.apps.googleusercontent.com';
      this.TwKey = 'bp16wXI5xllcyQdjPWw6UuTZo';
      this.TwSecret = 'CbA8ZKoFmttFfObJpPVKA0BqxeJ02eG0uOUE7JzVJ6FlxBbcsV';
    } else {
      this.fbAppId = '789807871099676';
      this.gClient_id = '813287755154-gfkf2urck7i10mujgenaim0a29q0couf.apps.googleusercontent.com';
      this.TwKey = '0JzS8R6508XwpxEsxwiFfw';
      this.TwSecret = 'yNrYkyioDLEZGJg2QjGji0r5VSMsk6NL7NTSq5NsIY';
    }
  }

  setUser(user: any): void {
    this.User = user;
    this.subjUserSource.next(user);
  }

}
