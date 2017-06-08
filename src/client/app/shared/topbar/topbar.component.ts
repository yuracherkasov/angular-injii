import { Component, OnInit } from '@angular/core';
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

export class TopbarComponent implements OnInit {

  private AddContentShow: boolean = false;
  private localStorageUser: any;

  constructor
    (
    private uiService: UiService,
    private popupService: PopupService,
    private constantsService: ConstantsService
    ) {

    this.constantsService.userObservable
      .subscribe((data: any) => {
        if (data && (data.role === 'artist' || data.role === 'admin')) {
          this.AddContentShow = true
        } else {
          this.AddContentShow = false;
        }
      });
  }

  ngOnInit(): void {
    this.localStorageUser = localStorage.getItem('currentUser');
    if (this.localStorageUser && (this.localStorageUser.role === 'artist' || this.localStorageUser.role === 'admin')) {
      this.AddContentShow = true;
    }
  }

  isTopMenuOpen: boolean = false;

  toggleTopMenu($event: Event) {
    $event.preventDefault();
    this.isTopMenuOpen = !this.isTopMenuOpen;
  }

}

