import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class PopupService {

  public contentFlag: boolean;
  private subjSource = new Subject<boolean>();

  contentObservable = this.subjSource.asObservable();
  contentViewChange(bool: boolean) {
    this.subjSource.next(bool);
  }

  toggleContentPopup(): void {
    if (this.contentFlag) {
      this.contentViewChange(true);
    } else {
      this.contentViewChange(false);
    }
    this.contentFlag = !this.contentFlag;
  }

  showContentPopup(): void {
    this.contentViewChange(true);
    this.contentFlag = false;
  }

  hideContentPopup(): void {
    this.contentViewChange(false);
    this.contentFlag = true;
  }

}
