import { Component, NgZone } from '@angular/core';
import { PopupService } from './../shared/services/ui-popup.service';

@Component({
  moduleId: module.id,
  selector: 'sd-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css']
})

export class ContentComponent {
  hidepopup: boolean = false;

  constructor(
    public popupService: PopupService,
    private zone: NgZone) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      }
    });
  }

  showPopUp() {
    this.zone.run(() => {
      this.hidepopup = false;
    });
  }

  hidePopUp() {
    this.zone.run(() => {
      this.hidepopup = true;
    });
  }
}
