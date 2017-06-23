import { Component } from '@angular/core';
import { UiService } from '../services/ui-service.service';
import { PopupService } from '../services/ui-popup.service';
import { MenuIframeService } from './menu-iframe.service';

@Component({
  moduleId: module.id,
  selector: 'sd-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.css']
})

export class MainMenuComponent {

  src: string = '';
  private showIframeCompnt: boolean = false;

  constructor
    (
      public menuService: MenuIframeService,
      public uiService: UiService,
      private popupService: PopupService
    ) {

    menuService.srcObservable.subscribe(src => {
      this.src = src;
    });


    popupService.contentObservable.subscribe(() => {
      this.closeFrame();
    });
  }

  closeFrame(): void {
    this.src = '';
    this.showIframeCompnt = false;
  }

}
