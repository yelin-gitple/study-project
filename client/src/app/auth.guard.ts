import { USER } from './content';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalDataService } from 'src/service/global-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private globalData: GlobalDataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.checkLoggedIn();
  }

  checkLoggedIn(): true | UrlTree {
    const lsUser = localStorage.getItem(USER);

    let currentUser;
    this.globalData.getUserData().subscribe((user) => (currentUser = user));

    if (currentUser || lsUser !== 'undefined') return true;

    alert('Please Sign In first!');

    return this.router.parseUrl('/signIn');
  }
}
