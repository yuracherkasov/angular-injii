import { Injectable } from '@angular/core';
import { PopupService } from './ui-popup.service'

@Injectable()
export class UiService {
  public isMainMenuOpen: boolean = false;
  public isSignMenuOpen: boolean = false;

  public joinAsIcon: boolean = false;

  public userForm: boolean = false;
  public artistForm: boolean = false;
  public charityForm: boolean = false;

  public forgotPassword: boolean = false;

  constructor
    (
    public popupService: PopupService
    ) {

    popupService.contentObservable.subscribe(() => {
     this.isMainMenuOpen = false;
     this.isSignMenuOpen = false;
    })
  }

  toggleMainMenu() {
    this.isMainMenuOpen = !this.isMainMenuOpen;
    if (this.isSignMenuOpen) {
      this.isSignMenuOpen = !this.isSignMenuOpen
    }  
  }

  toggleSignMenu($event: Event) {
    $event.preventDefault();
    this.isSignMenuOpen = !this.isSignMenuOpen;
    if (this.isMainMenuOpen) {
      this.isMainMenuOpen = !this.isMainMenuOpen
    }
  }

  toggleForgotPassword($event: Event): void {
    $event.preventDefault();
    this.forgotPassword = !this.forgotPassword;
  }

  selectAs(): void {
    this.joinAsIcon = !this.joinAsIcon;
  }

  selectSignUpForm(event: any, str: string): void {
    event.preventDefault();
    if (str === "user") {
      this.userForm = true;
    } else {
      this.userForm = false;
    };
    if (str === "artist") {
      this.artistForm = true;
    } else {
      this.artistForm = false;
    };
    if (str === "charity") {
      this.charityForm = true;
    } else {
      this.charityForm = false;
    };
  }

  public isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

}
