import { Component } from '@angular/core';
import { CeiboShare } from 'ng2-social-share';

import { PopupControlService } from './../../services/popup-control.service';


@Component({
  moduleId: module.id,
  selector: 'sd-sharing',
  templateUrl: 'sharing-video.component.html',
  styleUrls: ['sharing-video.component.css']
})

export class SharingVideoComponent {

  constructor(public popupControlService: PopupControlService) { }

  closePopUp() {
    this.popupControlService.sharingHide();
  }

}
