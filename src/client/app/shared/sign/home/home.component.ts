import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { FileUploader } from 'ng2-file-upload';

import { SignComponent } from '../sign.component'
import { ConstantsService } from '../../../services/constants.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service'
import { IsLoggedInService } from './../services/islogged.service';

import { UiService } from "../../services/ui-service.service";
import { AlertService } from "../../alert/alert.service";

// change on real api
const URL = 'http://evening-anchorage-3159.herokuapp.com/api/';
declare var localStorage: any;

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})


export class HomeComponent implements OnInit {
  newPassForm: any = {};
  submitPassLoad: boolean = false;
  updateLoad: boolean = false;
  imageLoad: boolean = false;
  localStorageUser: Object;
  User: any = {};
  invalidUrlMassage: string = "Does not match the URL format."
  AuthToken: string = '';
  userAvatar: string;


  public uploader: FileUploader

  constructor(
    private authenticationService: AuthService,
    public uiService: UiService,
    private userService: UserService,
    private constantsService: ConstantsService,
    private isLoggedInService: IsLoggedInService,
    private alertService: AlertService) {

    this.localStorageUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    if (this.localStorageUser || this.constantsService.User) {
      if(!this.constantsService.User){
        this.constantsService.setUser(this.localStorageUser);
      }
      this.User = this.constantsService.User;
      this.userAvatar = this.User.avatar ? 'url('+this.User.avatar+')' : 'url(../../../assets/thumb-place.jpg)';
      //let userToken = this.User.token;
      //this.uploader = new FileUploader({authToken: userToken, url: URL});
      this.uploader = new FileUploader({ url: URL });
      this.uploader.options.removeAfterUpload = true;
      this.uploader.onSuccessItem = () => {
       this.imageLoad = false;
      }
    }
  }

  loadingImageStart(){
    this.imageLoad = true;
  }

  changeHandler($event: any): void {
    this.readThis($event.target);
    // console.log(this.uploader)
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.userAvatar = 'url('+myReader.result+')';
    }
    myReader.readAsDataURL(file);
  }

  signOut() {
    this.isLoggedInService.isLogin(false)
    this.constantsService.setUser(null);
  }

  sendNewPass() {
    this.submitPassLoad = true;
    this.userService.updatePassword(this.newPassForm.oldpassword, this.newPassForm.newpassword)
      .then(response => {
        if (response.status === 200) {
          this.alertService.info(response.json());
        } else if (response.status === 401) {
          this.alertService.danger(response.json())
        }
        this.submitPassLoad = false;
      }, (reject: any) => {
        console.log(reject);
        this.submitPassLoad = false;
      })
  }

  update() {
    this.updateLoad = true;
    console.log(this.User);
    this.userService.update(this.User)
      .then((response: any) => {
        if(localStorage.currentUser){
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
        this.updateLoad = false;
      }, (reject: any) => {
        console.log(reject);
        this.updateLoad = false;
      })
  }
}
