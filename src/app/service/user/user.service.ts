import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private header = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  signIn(user: User): Observable<{token: string}> {
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<{token: string}>('http://localhost:8080/auth', body, {headers: this.header});
  }

  signUp(user: User): Observable<any> {
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post('http://localhost:8080/register', body, {headers: this.header});
  }

  isAuth(): boolean {
    const token = this.jwtHelper.tokenGetter();
    return ( token != null && !this.jwtHelper.isTokenExpired(token));
  }

  logOut(): void {
    localStorage.removeItem('token');
  }
}
