import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.user.isAuth()) {
      return of(true);
    } else {
      this.router.navigate(['/login']);
      console.log('Ну куда полез...');
      return of(false);
    }
  }
}
