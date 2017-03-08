import { Component, NgZone } from '@angular/core';
import { PopupService } from './../shared/services/ui-popup.service';
import { CarouselService } from "./carousel.service";

@Component({
  moduleId: module.id,
  selector: 'sd-contest',
  templateUrl: 'contest.component.html',
  styleUrls: ['contest.component.css'],
  providers: [CarouselService]
})

export class ContestComponent {

  private hidepopup: boolean = false;
  private toggleContests: boolean = true;

  constructor
    (
    private popupService: PopupService,
    private zone: NgZone
    ) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp()
      } else {
        this.hidePopUp()
      }
    })
  }

  private showPopUp() {
    this.zone.run(() => {
      this.hidepopup = false;
    })
  }

  private hidePopUp() {
    this.zone.run(() => {
      this.hidepopup = true;
    })
  }
}
