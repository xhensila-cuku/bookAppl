import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // console.log('no auth, ', this.authService.getIsAuthenticated());
    if (this.authService.getIsAuthenticated()) {
      this.router.navigateByUrl(this.authService.getMainPageForUser());
      return false;
    }

    return true;
  }
}
