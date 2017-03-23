import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()

export class ScreenService {

  screen: number;
  subjUserSource = new Subject<number>();
  screenObservable = this.subjUserSource.asObservable();

  constructor() {
    this.screen = window.innerWidth;
    window.onresize = (e) => {
      this.screen = window.innerWidth;
      this.subjUserSource.next(this.screen);
    };
  }

}
