import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const hasUser = localStorage.getItem('current-user') != null;

    if (hasUser) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
