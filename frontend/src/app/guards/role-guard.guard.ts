import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root', // Added providedIn for proper dependency injection
})
export class RoleGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isadmindata = route.data['isAdmin'];
    const redirect = route.data['redirect'];
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // If token is not present, redirect to login unless already on login/register page
      if (route.url[0]?.path !== 'login' && route.url[0]?.path !== 'register') {
        this.router.navigateByUrl('/login');
      }
      console.log('hi');
      return of(true);
    }

    return this.authService.isLoggedIn().pipe(
      map((isloggedin) => {
        if (!isloggedin) {
          this.router.navigateByUrl('/');
          return false;
        }

        const decoded: any = jwtDecode(token);
        const isAdmin = decoded.isAdmin;

        if (redirect && isAdmin) {
          const routepath = isAdmin ? 'admin' : 'home';
          this.router.navigateByUrl(`/${routepath}`);
          return false; // Prevent further activation, as redirection is done
        }

        if (isAdmin && isadmindata) {
          return true;
        } else {
          this.router.navigateByUrl('/');
          return false;
        }
      }),
      catchError(() => {
        this.router.navigateByUrl('/');
        return of(false);
      }),
    );
  }
}
