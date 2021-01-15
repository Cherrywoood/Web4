import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

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
  constructor(formBuilder: FormBuilder, private httpUser: UserService, private router: Router) {
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
          if (error.status === 401){
            this.error = 'USER DOESN\'T EXIST!';
          }
        });
  }

  signUp(): void {
    this.signUpSub = this.httpUser.signUp(new User(this.form.get('login')?.value, this.form.get('password')?.value))
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 'SUCCESS') {
            this.signIn();
         } else { this.error = 'THIS LOGIN ALREADY EXISTS!'; }
        },
        error => console.log(error));
  }

  show_hide_password(): void {
    console.log(!this.form.get('check')?.value);
    if (!this.form.get('check')?.value) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  ngOnDestroy(): void {
    if (this.signInSub !== undefined) { this.signInSub?.unsubscribe(); }
    if (this.signUpSub !== undefined) { this.signUpSub?.unsubscribe(); }
  }
}
