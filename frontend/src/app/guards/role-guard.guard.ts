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
    let isAdminData = route.data['isAdmin'];

    if (isAdminData == undefined) {
      this.router.navigate(['/login']);
      return of(false)
    }

    return this.authService.compareRole(isAdminData).pipe(
      map((sameRole) => {
        if (sameRole.ok) {
          if (!sameRole.same) {
            isAdminData = !isAdminData;
            if (isAdminData) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
            return false;
          }
          return true;
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
