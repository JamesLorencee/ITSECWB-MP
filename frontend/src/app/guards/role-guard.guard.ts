import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { AuthService } from '../auth.service';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isAdminData = route.data['isAdmin'];
    const redirect = route.data['redirect'];
    const token = localStorage.getItem('accessToken');

    return this.authService.isLoggedIn().pipe(
      (value) => {
        // true
        return value.pipe(
          () => {
            if (!token) {
              if (state.url != '/login') this.router.navigateByUrl('/login');
              return of(true);
            }
            var decode: any = jwtDecode(token!);
            var isAdmin = decode.isAdmin;

            if (isAdmin == null) {
              if (state.url != '/login') this.router.navigateByUrl('/login');
              return of(true);
            }
            const routePath = isAdmin ? 'admin' : 'home';

            if (isAdmin == isAdminData) {
              return of(true);
            } else {
              this.router.navigateByUrl(`/${routePath}`);
              return of(false);
            }

            //is Logged In
            return of(true);
          },
          catchError(() => {
            if (state.url != '/login') this.router.navigateByUrl('/login');
            return of(true);
          }),
        );
      },
      catchError((val) => {
        if (state.url != '/login') this.router.navigateByUrl('/login');
        return of(true);
      }),
    );
  }
}
