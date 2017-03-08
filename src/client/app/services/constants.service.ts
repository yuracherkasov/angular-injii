import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";
import { Subject } from 'rxjs/Subject';

@Injectable()

export class ConstantsService {

  private subjUserSource = new Subject<string>();
  userObservable = this.subjUserSource.asObservable();

  User: any;
  //Wepay API Keys:
  CLIENT_ID: number = 201132;
  //facebook application ID:
  fbAppId: string = "282063345331584";
  //google client_id:
  gClient_id: string = '813287755154-gfkf2urck7i10mujgenaim0a29q0couf.apps.googleusercontent.com';

  setUser(user: any): void {
    this.User = user;
    this.subjUserSource.next(user)
  }

}