import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})
export class AuthenticationFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  type: string;
  error: string | undefined;
  signInSub: Subscription | undefined;
  signUpSub: Subscription | undefined;
  errorSub: Subscription | undefined;

  constructor(formBuilder: FormBuilder, private httpUser: UserService,
              private router: Router, private translate: TranslateService) {
    this.form = formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      check: [false]
    });
    this.type = 'password';
  }

  ngOnInit(): void {
  }

  signIn(): void {
    this.signInSub = this.httpUser.signIn(new User(this.form.get('login')?.value, this.form.get('password')?.value))
      .subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/main']);
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.setError('AUTHENTICATION_FORM.ERROR_AUTHENTICATION');
        }});
  }

  signUp(): void {
    this.signUpSub = this.httpUser.signUp(new User(this.form.get('login')?.value, this.form.get('password')?.value))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.signIn();
        },
        error => {
          console.log(error);
          if (error.status === 409) {
            this.setError('AUTHENTICATION_FORM.ERROR_REGISTRATION');
          }
          if (error.status === 400) {
            this.setError('AUTHENTICATION_FORM.ERROR_VALID');
          }
        });
  }

  showHidePassword(): void {
    if (!this.form.get('check')?.value) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  setError(error: string): void {
    this.errorSub = this.translate.stream(error)
      .subscribe(translation => this.error = translation);
  }

  ngOnDestroy(): void {
    if (this.signInSub !== undefined) {
      this.signInSub?.unsubscribe();
    }
    if (this.signUpSub !== undefined) {
      this.signUpSub?.unsubscribe();
    }
    if (this.errorSub !== undefined) {
      this.errorSub?.unsubscribe();
    }
  }
}
