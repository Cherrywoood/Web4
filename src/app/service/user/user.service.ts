import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../language.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private header = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private language: LanguageService) {}

  signIn(user: User): Observable<{token: string}> {
    const body = JSON.stringify(user);
    this.header = this.header.set('Accept-Language', this.language.getLanguage());
    return this.http.post<{token: string}>('http://localhost:11600/auth', body, {headers: this.header});
  }

  signUp(user: User): Observable<any> {
    const body = JSON.stringify(user);
    this.header = this.header.set('Accept-Language', this.language.getLanguage());
    return this.http.post('http://localhost:11600/register', body, {headers: this.header});
  }

  isAuth(): boolean {
    const token = this.jwtHelper.tokenGetter();
    return ( token != null && !this.jwtHelper.isTokenExpired(token));
  }

  logOut(): void {
    localStorage.removeItem('token');
  }
}
