import { Component } from '@angular/core';
import { PopupControlService } from './../../services/popup-control.service';

@Component({
  moduleId: module.id,
  selector: 'sd-sponsor',
  templateUrl: 'sponsor.component.html',
  styleUrls: ['sponsor.component.css']
})

export class SponsorComponent {

  constructor(public popupControlService: PopupControlService) { }

  closePopUp() {
    this.popupControlService.sponsorHide();
  }

}
