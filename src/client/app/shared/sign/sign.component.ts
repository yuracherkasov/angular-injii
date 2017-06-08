import { Component, OnInit, NgZone, trigger, transition, style, animate, state } from "@angular/core";
import { UiService } from "../services/ui-service.service";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { UserModel } from './models/newuser.model';
import { ConstantsService } from './../../services/constants.service';
import { IsLoggedInService } from './services/islogged.service';


@Component({
  moduleId: module.id,
  selector: 'sd-sign',
  templateUrl: 'sign.component.html',
  animations: [
    trigger('loginAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateX(0%)'
      })),
      transition('void => active', animate('.3s .35s ease-out')),
      transition('active => void', animate('.3s ease-in'))
    ]
    ),
  ],
  styleUrls: ['sign.component.css'],
  providers: [IsLoggedInService]
})

export class SignComponent implements OnInit {

  private isLoggedIn: boolean = true;
  localStorageUser: any;

  constructor(private uiService: UiService,
    private authenticationService: AuthService,
    private constantsService: ConstantsService,
    private zone: NgZone,
    private isLoggedInService: IsLoggedInService) {
    isLoggedInService.loginStatusAnnounced.subscribe(
      value => {
        this.changestatus(value);
      }
    )
  }

  changestatus(e: boolean) {
    this.zone.run(() => {
        this.isLoggedIn = e;
    })
    if (e === false) {
      this.authenticationService.logout();
    }
  }

  ngOnInit() {
    this.localStorageUser = localStorage.getItem('currentUser');
    //if(this.currentUser && !this.currentUser.remember) 
    if (!this.localStorageUser) {
      this.authenticationService.logout();
      this.isLoggedIn = false;
    }
  }
}



