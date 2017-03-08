import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/Subject';
import { PopupService } from "../services/ui-popup.service";


interface MyEventTarget extends EventTarget {
  href: string;
  tagName: string;
}

interface MyEvent extends Event {
  target: MyEventTarget;
}

@Injectable()

export class MenuIframeService {

  public showIframeCompnt: boolean = false;

  private subjSource = new Subject<string>();
  srcObservable = this.subjSource.asObservable();

  constructor(private popupService: PopupService){

    popupService.contentObservable.subscribe(() => {
      this.showIframeCompnt = false;
    })

  }

  gotoPage(event: MyEvent): void {
    event.preventDefault()
    this.showIframeCompnt = true;
    if (event.target.tagName === "A") {
      let src = event.target.href;
      this.subjSource.next(src)
    }
  }

}