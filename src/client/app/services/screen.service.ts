import { Injectable, HostListener } from "@angular/core";

@Injectable()

export class ScreenService {

  screen: number;

  constructor() {
    this.screen = window.innerWidth;
    // window.onresize = (e) => {
    //   this.screen = window.innerWidth;
    //   console.log(this.screen)
    // }
  }

}