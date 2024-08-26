
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
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.getIsAuthenticated();
    const roles = route.data['roles'] as Array<string>;

    if (isAuthenticated) {
      if (
        roles &&
        !roles.some((role) => this.authService.checkUserRole(role))
      ) {
        this.router.navigate(['/unauthorized']);
        //YOU NEED TO DISPLAY A POPUP THAT THIS IS NOT THE USER !!REMEMBER
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
