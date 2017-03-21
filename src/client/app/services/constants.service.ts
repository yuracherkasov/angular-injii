import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";
import { Subject } from 'rxjs/Subject';

import { Config } from './../shared/config/env.config';

@Injectable()

export class ConstantsService {

  private subjUserSource = new Subject<string>();
  userObservable = this.subjUserSource.asObservable();

  User: any;
  homeUrl: string = 'http://opus.injii.com:5555';
  //Wepay API Keys:
  CLIENT_ID: number = 201132;
  //facebook application ID:
  fbAppId: string;
  //google client_id:
  gClient_id: string;

  constructor() {
    if (Config.ENV === "DEV") {
      this.fbAppId = "208503652949540";
      this.gClient_id = '498761886009-02hqd66sdcbh9ipmug1734d6ibbk6rc4.apps.googleusercontent.com';
    } else {
      this.fbAppId = "282063345331584";
      this.gClient_id = '813287755154-gfkf2urck7i10mujgenaim0a29q0couf.apps.googleusercontent.com';
    }
  }

  setUser(user: any): void {
    this.User = user;
    this.subjUserSource.next(user)
  }


}