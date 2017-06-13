import { Component } from '@angular/core';
import { UiService } from "../services/ui-service.service";
import { PopupService } from "../services/ui-popup.service";
import { ConstantsService } from "../../services/constants.service"

declare var localStorage: any;

@Component({
  moduleId: module.id,
  selector: 'sd-topbar',
  templateUrl: 'topbar.component.html',
  styleUrls: ['topbar.component.css']
})

export class TopbarComponent {

  isTopMenuOpen: boolean = false;
  private AddContentShow: boolean;
  private localStorageUser: any;

  constructor
    (
    public constantsService: ConstantsService,
    private uiService: UiService,
    private popupService: PopupService
    ) {

    this.constantsService.userObservable
      .subscribe((data: any) => {
        if (data && (data.role === 'artist' || data.role === 'admin')) {
          setTimeout(()=>{
            this.AddContentShow = true;
          },0)     
        } else {
          this.AddContentShow = false;
        }
      });
  }

  toggleTopMenu($event: Event) {
    $event.preventDefault();
    this.isTopMenuOpen = !this.isTopMenuOpen;
  }

}

