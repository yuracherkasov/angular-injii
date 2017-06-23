import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import { PopupControlService } from './services/popup-control.service';
import { UiDonationService } from './shared/donation/ui-donation.service';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor
  (
    public uiDonationService: UiDonationService,
    private popupControlService: PopupControlService
  ) {
    console.log('Environment config', Config);
  }
}
