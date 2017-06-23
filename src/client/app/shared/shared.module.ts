import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { TopbarComponent } from './topbar/topbar.component';
import { PlayerComponent } from './jw-player/player.component';
import { AlertComponent } from './alert/alert.component';
import { BotNavigationComponent } from './bot-navigation/bot-navigation.component';
import { DonationComponent } from './donation/donation.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MenuIframeComponent } from './main-menu/menu-iframe.component';
import { MenuIframeService } from './main-menu/menu-iframe.service';
import { SharingVideoComponent } from './sharing/sharing-video.component';
import { SharingInjiiComponent } from './sharing/sharing-injii.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { HomeComponent, LoginComponent,  RegisterComponent, SignComponent, SignSocialComponent } from './sign/index';
import { AuthService } from './sign/services/auth.service';
import { UserService } from './sign/services/user.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { CeiboShare } from 'ng2-social-share';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports:
  [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: 
  [
    TopbarComponent,
    PlayerComponent,
    MainMenuComponent,
    MenuIframeComponent,
    BotNavigationComponent,
    SignComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    SignSocialComponent,
    AlertComponent,
    DonationComponent,
    SponsorComponent,
    SharingVideoComponent,
    SharingInjiiComponent,
    CeiboShare,
    FileSelectDirective
  ],
  exports:
  [
    CommonModule,
    FormsModule,
    RouterModule,
    TopbarComponent,
    PlayerComponent,
    MainMenuComponent,
    BotNavigationComponent,
    SignComponent,
    RegisterComponent,
    SignSocialComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    DonationComponent,
    SponsorComponent,
    SharingVideoComponent,
    SharingInjiiComponent,
    FileSelectDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:
      [
        MenuIframeService,
        UserService,
        AuthService
      ]
    };
  }
}
