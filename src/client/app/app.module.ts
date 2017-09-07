import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ContentModule } from './content/content.module';
import { ContestModule } from './contest/contest.module';
import { ActivityModule } from './activity/activity.module';
import { AppriseModule } from './apprise/apprise.module';
import { ChatModule } from './chat/chat.module';
import { ArtistsModule } from './artists/artists.module';
import { CharitiesModule } from './charities/charities.module';
import { AddContentModule } from './add-content/add-content.module';
import { GuardModule } from './guard/guard.module';
import { SearchModule } from './search/search.module';

import { UiService } from './shared/services/ui-service.service';
import { PopupService } from './shared/services/ui-popup.service';
import { ConstantsService } from './services/constants.service';
import { PlayerService } from './shared/jw-player/player.service';
import { AlertService } from './shared/alert/alert.service';
import { RequestOptionsService } from './services/request-options.service';
import { PopupControlService } from './services/popup-control.service';
import { ScreenService } from './services/screen.service';
import { UiDonationService } from './shared/donation/ui-donation.service';
import { ASearchService } from './artists/search.service';
import { CSearchService } from './charities/search.service';
import { SearchService } from './search/search.service';
import { ApiService } from './services/api.service';
import { GuardService } from './guard/guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SharingSocialService } from './services/sharing-social.service';

//used to create fake backend, remove when production
//  import { fakeBackendProvider } from './_helpers/fake-backend';
// import { MockBackend, MockConnection } from '@angular/http/testing';
//import { MockBackend } from '@angular/http/testing/mock_backend';
 //import { BaseRequestOptions } from '@angular/http';

@NgModule({
  imports:
  [
    BrowserModule,
    HttpModule,
    AppRoutingModule,  
    HomeModule,
    ContentModule,
    ContestModule,
    ActivityModule,
    AppriseModule,
    ChatModule,
    ArtistsModule,
    CharitiesModule,
    AddContentModule,
    GuardModule,
    SearchModule,
    SharedModule.forRoot()
  ],
  declarations: [AppComponent],
  providers:
  [
    {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
    },
    UiService,
    PopupService,
    PlayerService,
    AlertService,
    RequestOptionsService,
    ConstantsService,
    PopupControlService,
    ScreenService,
    UiDonationService,
    ASearchService,
    CSearchService,
    SearchService,
    ApiService,
    GuardService,
    AuthGuardService,
    SharingSocialService
   //providers used to create fake backend, remove when production
  //   fakeBackendProvider,
  //   MockBackend,
  //  BaseRequestOptions
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
