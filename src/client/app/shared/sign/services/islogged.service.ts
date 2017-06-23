import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()

export class IsLoggedInService {
  private isLoggedInSource = new Subject<boolean>();
  loginStatusAnnounced = this.isLoggedInSource.asObservable();
  
  isLogin(status: boolean) {
    this.isLoggedInSource.next(status);
  }
}
