import { Component, OnInit, trigger, transition, style, animate, state } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { UiService } from "../../services/ui-service.service";
import { AlertService } from "../../alert/alert.service";
import { IsLoggedInService } from './../services/islogged.service';
import { MenuIframeService } from './../../main-menu/menu-iframe.service';


@Component({
  moduleId: module.id,
  selector: 'register-forms',
  templateUrl: 'register.component.html',
  animations: [
    trigger('registerAnimation', [
      state('active', style({
        opacity: 1,
        transform: 'translateX(0%)'
      })),
      transition('void => active', animate('300ms ease-out'))
    ]
    )
  ],
  styleUrls: ['register.component.css'],

})

export class RegisterComponent implements OnInit {

  userform: FormGroup;
  artistform: FormGroup;
  charityform: FormGroup;
  pswModel: string;
  loading = false;

  public auth2: any;
  googleLoginButtonId: string = "google-login-button";
  userAuthToken: any = '';
  userDisplayName: string = "empty";

  constructor(
    private _formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authenticationService: AuthService,
    private isLoggedInService: IsLoggedInService,
    private menuService: MenuIframeService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.userform = this._formBuilder.group({
      'role': ['user'],
      'auth_via': ['native'],
      'username': [null, [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9]*')]],
      'firstname': [null, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      'lastname': [null, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      'email': [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'repeatpsw': [null, [Validators.required]],
      'birth': [null, [Validators.required]],
      'tel': [null],
      'city': [null],
      'state': [null],
      'zip': [null],
      'refer': [null]
    }, { validator: matchingPasswords('password', 'repeatpsw') });
    this.artistform = this._formBuilder.group({
      'role': ['artist'],
      'auth_via': ['native'],
      'bandname': [null, [Validators.required]],
      'username': [null, [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9]*')]],
      'firstname': [null, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      'lastname': [null, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      'email': [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'repeatpsw': [null, [Validators.required]],
      'birth': [null, [Validators.required]],
      'tel': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'state': [null, [Validators.required]],
      'zip': [null, [Validators.required]],
      'refer': [null]
    }, { validator: matchingPasswords('password', 'repeatpsw') });

    this.charityform = this._formBuilder.group({
      'role': ['charity'],
      'auth_via': ['native'],
      'charityname': [null, [Validators.required]],
      'username': [null, [Validators.required, Validators.minLength(5), Validators.pattern('[A-Za-z0-9]*')]],
      'firstname': [null, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      'lastname': [null, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      'email': [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'repeatpsw': [null, [Validators.required]],
      'address': [null, [Validators.required]],
      'tel': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'state': [null, [Validators.required]],
      'zip': [null, [Validators.required]],
      'refer': []
    }, { validator: matchingPasswords('password', 'repeatpsw') });

    function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      return (group: FormGroup): any => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
    };

    this.userform.valueChanges
      .subscribe((data) => this.onValueChanged(data, this.userform));

    this.artistform.valueChanges
      .subscribe((data) => this.onValueChanged(data, this.artistform));

    this.charityform.valueChanges
      .subscribe((data) => this.onValueChanged(data, this.charityform));

  }

  onValueChanged(data: any, form: FormGroup) {
    if (!form) { return; }

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
          this.uniqueValue = form.value;
        }
      }
    }
  };

  uniqueValue: any;

  formErrors: any = {
    'charityname': '',
    'bandname': '',
    'username': '',
    'lastname': '',
    'firstname': '',
    'email': '',
    'password': '',
    'repeatpsw': '',
    'birth': '',
    'tel': '',
    'city': '',
    'state': '',
    'zip': '',
    'address': ''
  };

  validationMessages: any = {
    'charityname': {
      'required': 'Charity name is required.',
      'minlength': 'Username must be at least 5 characters long.',
      'pattern': 'The username must contain only letters and numbers.'
    },
    'bandname': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 5 characters long.',
      'pattern': 'The username must contain only letters and numbers.'
    },
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 5 characters long.',
      'pattern': 'The username must contain only letters and numbers.'
    },
    'lastname': {
      'required': 'Field is required.',
      'pattern': 'Enter your real name with no spaces or special characters.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'firstname': {
      'required': 'Field is required.',
      'pattern': 'Enter your real name with no spaces or special characters.'
    },
    'email': {
      'required': 'Field is required.',
      'pattern': 'Please enter correct email.'
    },
    'password': {
      'required': 'Field is required.',
      'minlength': 'Password must be at least 6 characters long.',
    },
    'repeatpsw': {
      'required': 'Field is required.',
    },
    'birth': {
      'required': 'Field is required.'
    },
    'tel': {
      'required': 'Field is required.'
    },
    'city': {
      'required': 'Field is required.'
    },
    'state': {
      'required': 'Field is required.'
    },
    'zip': {
      'required': 'Field is required.'
    },
    'address': {
      'required': 'Field is required.'
    }
  };

  register(valueform: any) {
    this.loading = true;
    let password = valueform.password
    delete valueform.password;
    delete valueform.repeatpsw;
    this.userService.signup(valueform, password)
      .then((response: any) => {
        if (response.message && response.user) {
          this.alertService.info(response.message);
          //console.log("register response email: "+response.email);
          this.authenticationService.login(response.user.username, password, false)
            .then((response: any) => {
              if (response && response.user.token) {
                this.loading = false;
                this.alertService.clear();
                this.isLoggedInService.isLogin(true)
              }
            })
        }
      }, (reject) => {
        console.log("reject: ", reject); this.loading = false;
      }

      )
  }


}
