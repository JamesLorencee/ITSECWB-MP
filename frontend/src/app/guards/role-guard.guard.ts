import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isAdminData = route.data['isAdmin'];

    return this.authService.compareRole(isAdminData).pipe(
      map((authorized) => {
        if (authorized.ok && isAdminData !== undefined) {
          if (state.url === '/login' || state.url === '/register') {
            if (isAdminData) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
            // this.router.navigate(['/login']);
            return false;
          } else {
            return true;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }
}
